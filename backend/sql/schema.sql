-- =============================================
-- NeuroFlow Database Schema
-- PostgreSQL / Supabase
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -------------------------------------------
-- 1. Users table
-- Links to Supabase auth.users for authentication.
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  display_name VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------
-- 2. Module preferences per user
-- Each row represents a toggleable module.
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS module_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  module_key VARCHAR(50) NOT NULL,
  enabled BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, module_key)
);

-- -------------------------------------------
-- 3. Accessibility Profiles (consolidated)
-- A single deeply-granular row per user that
-- aggregates the key accessibility booleans
-- from every module category.
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS accessibility_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Sensory (ASD / SPD)
  pure_dark_mode BOOLEAN DEFAULT FALSE,
  motion_reduced BOOLEAN DEFAULT FALSE,
  color_palette VARCHAR(20) DEFAULT 'default',
  reduce_transparency BOOLEAN DEFAULT FALSE,

  -- Learning (Dyslexia / Dyscalculia / Dysgraphia)
  dyslexic_font_enabled BOOLEAN DEFAULT FALSE,
  font_size_multiplier NUMERIC(3,2) DEFAULT 1.00 CHECK (font_size_multiplier BETWEEN 0.50 AND 3.00),
  tts_enabled BOOLEAN DEFAULT FALSE,
  stt_enabled BOOLEAN DEFAULT FALSE,
  visual_numbers BOOLEAN DEFAULT FALSE,

  -- Motor & Coordination (Dyspraxia / DCD / Tourette)
  macro_gestures_enabled BOOLEAN DEFAULT FALSE,
  large_tap_targets BOOLEAN DEFAULT FALSE,
  voice_navigation BOOLEAN DEFAULT FALSE,
  undo_confirmation BOOLEAN DEFAULT TRUE,

  -- Anxiety & OCD
  safe_mode_enabled BOOLEAN DEFAULT FALSE,
  confirm_actions BOOLEAN DEFAULT TRUE,
  hide_streaks BOOLEAN DEFAULT FALSE,
  hide_notifications BOOLEAN DEFAULT FALSE,

  -- ADHD / Executive Function
  pomodoro_work_minutes INT DEFAULT 25,
  pomodoro_break_minutes INT DEFAULT 5,
  gamification_enabled BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------
-- 4. Sensory preferences (ASD / SPD module)
-- (Retained for backward compatibility)
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS sensory_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  dark_mode BOOLEAN DEFAULT FALSE,
  color_palette VARCHAR(20) DEFAULT 'default',
  reduce_motion BOOLEAN DEFAULT FALSE,
  reduce_transparency BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------
-- 5. ADHD / Executive Function preferences
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS adhd_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  pomodoro_work_minutes INT DEFAULT 25,
  pomodoro_break_minutes INT DEFAULT 5,
  gamification_enabled BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------
-- 6. Learning differences preferences
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS learning_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  font_family VARCHAR(30) DEFAULT 'system',
  font_size_multiplier NUMERIC(3,2) DEFAULT 1.00 CHECK (font_size_multiplier BETWEEN 0.50 AND 3.00),
  tts_enabled BOOLEAN DEFAULT FALSE,
  stt_enabled BOOLEAN DEFAULT FALSE,
  visual_numbers BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------
-- 7. Motor & Coordination preferences
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS motor_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  large_tap_targets BOOLEAN DEFAULT FALSE,
  gesture_navigation BOOLEAN DEFAULT FALSE,
  voice_navigation BOOLEAN DEFAULT FALSE,
  undo_confirmation BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------
-- 8. Anxiety & OCD preferences
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS anxiety_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  safe_mode BOOLEAN DEFAULT FALSE,
  confirm_actions BOOLEAN DEFAULT TRUE,
  hide_streaks BOOLEAN DEFAULT FALSE,
  hide_notifications BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------
-- 9. Synesthesia Mappings
-- A relational table allowing users to map
-- string categories (e.g. "Monday", "Work")
-- to hex color codes or icon identifiers.
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS synesthesia_mappings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  label VARCHAR(100) NOT NULL,
  mapped_color VARCHAR(7),
  mapped_icon VARCHAR(50),
  mapped_sound VARCHAR(100),
  category VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------
-- 10. Tasks (micro-task / kanban)
-- The is_micro_step flag and step_order allow
-- the frontend to render tasks as ADHD-friendly
-- micro-steps or as standard lists, driven by
-- the user's accessibility_profiles settings.
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(20) DEFAULT 'todo',
  priority INT DEFAULT 0,
  parent_task_id UUID REFERENCES tasks(id) ON DELETE SET NULL,
  is_micro_step BOOLEAN DEFAULT FALSE,
  step_order INT DEFAULT 0,
  due_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------
-- 11. Journal entries
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS journal_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  body TEXT,
  mood VARCHAR(30),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- Indexes for performance
-- =============================================
CREATE INDEX IF NOT EXISTS idx_module_prefs_user ON module_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_accessibility_profiles_user ON accessibility_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_user ON tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(user_id, status);
CREATE INDEX IF NOT EXISTS idx_tasks_parent ON tasks(parent_task_id);
CREATE INDEX IF NOT EXISTS idx_journal_user ON journal_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_synesthesia_user ON synesthesia_mappings(user_id);

-- =============================================
-- Row Level Security (RLS) Policies
-- Ensures each user can only access their own
-- data across every table.
-- =============================================

-- Helper: resolve the app-level user id from the
-- Supabase JWT (auth.uid() → users.auth_id → users.id).
-- Tables reference users.id as the foreign key, so every
-- policy filters on user_id = the matching users row.

-- 1. users
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY users_select_own ON users
  FOR SELECT USING (auth_id = auth.uid());

CREATE POLICY users_update_own ON users
  FOR UPDATE USING (auth_id = auth.uid());

-- 2. module_preferences
ALTER TABLE module_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY module_preferences_select_own ON module_preferences
  FOR SELECT USING (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

CREATE POLICY module_preferences_insert_own ON module_preferences
  FOR INSERT WITH CHECK (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

CREATE POLICY module_preferences_update_own ON module_preferences
  FOR UPDATE USING (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

CREATE POLICY module_preferences_delete_own ON module_preferences
  FOR DELETE USING (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

-- 3. accessibility_profiles
ALTER TABLE accessibility_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY accessibility_profiles_select_own ON accessibility_profiles
  FOR SELECT USING (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

CREATE POLICY accessibility_profiles_insert_own ON accessibility_profiles
  FOR INSERT WITH CHECK (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

CREATE POLICY accessibility_profiles_update_own ON accessibility_profiles
  FOR UPDATE USING (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

CREATE POLICY accessibility_profiles_delete_own ON accessibility_profiles
  FOR DELETE USING (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

-- 4. sensory_preferences
ALTER TABLE sensory_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY sensory_preferences_select_own ON sensory_preferences
  FOR SELECT USING (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

CREATE POLICY sensory_preferences_insert_own ON sensory_preferences
  FOR INSERT WITH CHECK (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

CREATE POLICY sensory_preferences_update_own ON sensory_preferences
  FOR UPDATE USING (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

CREATE POLICY sensory_preferences_delete_own ON sensory_preferences
  FOR DELETE USING (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

-- 5. adhd_preferences
ALTER TABLE adhd_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY adhd_preferences_select_own ON adhd_preferences
  FOR SELECT USING (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

CREATE POLICY adhd_preferences_insert_own ON adhd_preferences
  FOR INSERT WITH CHECK (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

CREATE POLICY adhd_preferences_update_own ON adhd_preferences
  FOR UPDATE USING (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

CREATE POLICY adhd_preferences_delete_own ON adhd_preferences
  FOR DELETE USING (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

-- 6. learning_preferences
ALTER TABLE learning_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY learning_preferences_select_own ON learning_preferences
  FOR SELECT USING (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

CREATE POLICY learning_preferences_insert_own ON learning_preferences
  FOR INSERT WITH CHECK (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

CREATE POLICY learning_preferences_update_own ON learning_preferences
  FOR UPDATE USING (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

CREATE POLICY learning_preferences_delete_own ON learning_preferences
  FOR DELETE USING (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

-- 7. motor_preferences
ALTER TABLE motor_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY motor_preferences_select_own ON motor_preferences
  FOR SELECT USING (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

CREATE POLICY motor_preferences_insert_own ON motor_preferences
  FOR INSERT WITH CHECK (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

CREATE POLICY motor_preferences_update_own ON motor_preferences
  FOR UPDATE USING (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

CREATE POLICY motor_preferences_delete_own ON motor_preferences
  FOR DELETE USING (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

-- 8. anxiety_preferences
ALTER TABLE anxiety_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY anxiety_preferences_select_own ON anxiety_preferences
  FOR SELECT USING (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

CREATE POLICY anxiety_preferences_insert_own ON anxiety_preferences
  FOR INSERT WITH CHECK (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

CREATE POLICY anxiety_preferences_update_own ON anxiety_preferences
  FOR UPDATE USING (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

CREATE POLICY anxiety_preferences_delete_own ON anxiety_preferences
  FOR DELETE USING (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

-- 9. synesthesia_mappings
ALTER TABLE synesthesia_mappings ENABLE ROW LEVEL SECURITY;

CREATE POLICY synesthesia_mappings_select_own ON synesthesia_mappings
  FOR SELECT USING (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

CREATE POLICY synesthesia_mappings_insert_own ON synesthesia_mappings
  FOR INSERT WITH CHECK (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

CREATE POLICY synesthesia_mappings_update_own ON synesthesia_mappings
  FOR UPDATE USING (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

CREATE POLICY synesthesia_mappings_delete_own ON synesthesia_mappings
  FOR DELETE USING (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

-- 10. tasks
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY tasks_select_own ON tasks
  FOR SELECT USING (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

CREATE POLICY tasks_insert_own ON tasks
  FOR INSERT WITH CHECK (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

CREATE POLICY tasks_update_own ON tasks
  FOR UPDATE USING (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

CREATE POLICY tasks_delete_own ON tasks
  FOR DELETE USING (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

-- 11. journal_entries
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY journal_entries_select_own ON journal_entries
  FOR SELECT USING (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

CREATE POLICY journal_entries_insert_own ON journal_entries
  FOR INSERT WITH CHECK (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

CREATE POLICY journal_entries_update_own ON journal_entries
  FOR UPDATE USING (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );

CREATE POLICY journal_entries_delete_own ON journal_entries
  FOR DELETE USING (
    user_id IN (SELECT id FROM users WHERE auth_id = auth.uid())
  );
