const express = require('express');
const { supabase } = require('../config/supabase');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Default profile values returned in dev mode (no Supabase)
const DEFAULT_PROFILE = {
  pure_dark_mode: false,
  motion_reduced: false,
  color_palette: 'default',
  reduce_transparency: false,
  dyslexic_font_enabled: false,
  font_size_multiplier: 1.0,
  tts_enabled: false,
  stt_enabled: false,
  visual_numbers: false,
  macro_gestures_enabled: false,
  large_tap_targets: false,
  voice_navigation: false,
  undo_confirmation: true,
  safe_mode_enabled: false,
  confirm_actions: true,
  hide_streaks: false,
  hide_notifications: false,
  pomodoro_work_minutes: 25,
  pomodoro_break_minutes: 5,
  gamification_enabled: false,
};

// Fields that are allowed to be set by the client, with their expected types
const FIELD_TYPES = {
  pure_dark_mode: 'boolean',
  motion_reduced: 'boolean',
  color_palette: 'string',
  reduce_transparency: 'boolean',
  dyslexic_font_enabled: 'boolean',
  font_size_multiplier: 'number',
  tts_enabled: 'boolean',
  stt_enabled: 'boolean',
  visual_numbers: 'boolean',
  macro_gestures_enabled: 'boolean',
  large_tap_targets: 'boolean',
  voice_navigation: 'boolean',
  undo_confirmation: 'boolean',
  safe_mode_enabled: 'boolean',
  confirm_actions: 'boolean',
  hide_streaks: 'boolean',
  hide_notifications: 'boolean',
  pomodoro_work_minutes: 'number',
  pomodoro_break_minutes: 'number',
  gamification_enabled: 'boolean',
};

// GET /api/accessibility-profile
router.get('/', authenticate, async (req, res) => {
  try {
    if (!supabase) {
      return res.json({ user_id: req.userId, ...DEFAULT_PROFILE });
    }

    const { data, error } = await supabase
      .from('accessibility_profiles')
      .select('*')
      .eq('user_id', req.userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    res.json(data || { user_id: req.userId, ...DEFAULT_PROFILE });
  } catch (err) {
    console.error('Get accessibility profile error:', err);
    res.status(500).json({ error: 'Failed to fetch accessibility profile' });
  }
});

// PUT /api/accessibility-profile
router.put('/', authenticate, async (req, res) => {
  try {
    // Filter and validate fields
    const updateData = { user_id: req.userId, updated_at: new Date().toISOString() };
    for (const [key, value] of Object.entries(req.body)) {
      if (key in FIELD_TYPES && typeof value === FIELD_TYPES[key]) {
        updateData[key] = value;
      }
    }

    if (!supabase) {
      return res.json({ ...DEFAULT_PROFILE, ...updateData });
    }

    const { data, error } = await supabase
      .from('accessibility_profiles')
      .upsert(updateData, { onConflict: 'user_id' })
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('Update accessibility profile error:', err);
    res.status(500).json({ error: 'Failed to update accessibility profile' });
  }
});

module.exports = router;
