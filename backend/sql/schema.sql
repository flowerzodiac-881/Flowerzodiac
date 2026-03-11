-- =============================================
-- NeuroFlow Database Schema
-- PostgreSQL / Supabase
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -------------------------------------------
-- 1. Users table
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
-- 3. Sensory preferences (ASD / SPD module)
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
-- 4. ADHD / Executive Function preferences
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
-- 5. Learning differences preferences
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS learning_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  font_family VARCHAR(30) DEFAULT 'system',
  font_size_multiplier NUMERIC(3,2) DEFAULT 1.00,
  tts_enabled BOOLEAN DEFAULT FALSE,
  stt_enabled BOOLEAN DEFAULT FALSE,
  visual_numbers BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------
-- 6. Motor & Coordination preferences
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
-- 7. Anxiety & OCD preferences
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
-- 8. Synesthesia tag mappings
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
-- 9. Tasks (micro-task / kanban)
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(20) DEFAULT 'todo',
  priority INT DEFAULT 0,
  parent_task_id UUID REFERENCES tasks(id) ON DELETE SET NULL,
  due_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------
-- 10. Journal entries
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

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_module_prefs_user ON module_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_user ON tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(user_id, status);
CREATE INDEX IF NOT EXISTS idx_journal_user ON journal_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_synesthesia_user ON synesthesia_mappings(user_id);
