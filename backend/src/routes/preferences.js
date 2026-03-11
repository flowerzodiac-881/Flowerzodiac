const express = require('express');
const { supabase } = require('../config/supabase');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

const VALID_MODULES = [
  'sensory',
  'adhd',
  'learning',
  'motor',
  'anxiety',
  'synesthesia',
];

// Preference table mapping for module-specific settings
const PREF_TABLES = {
  sensory: 'sensory_preferences',
  adhd: 'adhd_preferences',
  learning: 'learning_preferences',
  motor: 'motor_preferences',
  anxiety: 'anxiety_preferences',
};

// GET /api/preferences/modules
router.get('/modules', authenticate, async (req, res) => {
  try {
    if (!supabase) {
      return res.json(
        VALID_MODULES.map((key) => ({ module_key: key, enabled: false }))
      );
    }

    const { data, error } = await supabase
      .from('module_preferences')
      .select('module_key, enabled')
      .eq('user_id', req.userId);

    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    console.error('Get modules error:', err);
    res.status(500).json({ error: 'Failed to fetch module preferences' });
  }
});

// PUT /api/preferences/modules
router.put('/modules', authenticate, async (req, res) => {
  try {
    const { modules } = req.body;
    if (!Array.isArray(modules)) {
      return res.status(400).json({ error: 'modules must be an array of {module_key, enabled}' });
    }

    for (const mod of modules) {
      if (!VALID_MODULES.includes(mod.module_key)) {
        return res.status(400).json({ error: `Invalid module: ${mod.module_key}` });
      }
    }

    if (!supabase) {
      return res.json(modules);
    }

    for (const mod of modules) {
      const { error } = await supabase
        .from('module_preferences')
        .upsert(
          { user_id: req.userId, module_key: mod.module_key, enabled: !!mod.enabled, updated_at: new Date().toISOString() },
          { onConflict: 'user_id,module_key' }
        );
      if (error) throw error;
    }

    const { data } = await supabase
      .from('module_preferences')
      .select('module_key, enabled')
      .eq('user_id', req.userId);

    res.json(data);
  } catch (err) {
    console.error('Update modules error:', err);
    res.status(500).json({ error: 'Failed to update module preferences' });
  }
});

// GET /api/preferences/:moduleKey
router.get('/:moduleKey', authenticate, async (req, res) => {
  try {
    const { moduleKey } = req.params;
    const table = PREF_TABLES[moduleKey];
    if (!table) {
      return res.status(400).json({ error: `Invalid module key: ${moduleKey}` });
    }

    if (!supabase) {
      return res.json({});
    }

    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('user_id', req.userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    res.json(data || {});
  } catch (err) {
    console.error('Get preference error:', err);
    res.status(500).json({ error: 'Failed to fetch preferences' });
  }
});

// PUT /api/preferences/:moduleKey
router.put('/:moduleKey', authenticate, async (req, res) => {
  try {
    const { moduleKey } = req.params;
    const table = PREF_TABLES[moduleKey];
    if (!table) {
      return res.status(400).json({ error: `Invalid module key: ${moduleKey}` });
    }

    if (!supabase) {
      return res.json(req.body);
    }

    const updateData = { ...req.body, user_id: req.userId, updated_at: new Date().toISOString() };
    delete updateData.id;
    delete updateData.created_at;

    const { data, error } = await supabase
      .from(table)
      .upsert(updateData, { onConflict: 'user_id' })
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('Update preference error:', err);
    res.status(500).json({ error: 'Failed to update preferences' });
  }
});

// --- Synesthesia mappings ---

// GET /api/preferences/synesthesia/mappings
router.get('/synesthesia/mappings', authenticate, async (req, res) => {
  try {
    if (!supabase) {
      return res.json([]);
    }

    const { data, error } = await supabase
      .from('synesthesia_mappings')
      .select('*')
      .eq('user_id', req.userId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    console.error('Get synesthesia error:', err);
    res.status(500).json({ error: 'Failed to fetch synesthesia mappings' });
  }
});

// POST /api/preferences/synesthesia/mappings
router.post('/synesthesia/mappings', authenticate, async (req, res) => {
  try {
    const { label, mappedColor, mappedIcon, mappedSound, category } = req.body;
    if (!label) {
      return res.status(400).json({ error: 'Label is required' });
    }

    if (!supabase) {
      return res.status(201).json({ label, mappedColor, mappedIcon, mappedSound, category });
    }

    const { data, error } = await supabase
      .from('synesthesia_mappings')
      .insert({
        user_id: req.userId,
        label,
        mapped_color: mappedColor || null,
        mapped_icon: mappedIcon || null,
        mapped_sound: mappedSound || null,
        category: category || null,
      })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    console.error('Create synesthesia error:', err);
    res.status(500).json({ error: 'Failed to create synesthesia mapping' });
  }
});

// DELETE /api/preferences/synesthesia/mappings/:id
router.delete('/synesthesia/mappings/:id', authenticate, async (req, res) => {
  try {
    if (!supabase) {
      return res.json({ deleted: true });
    }

    const { error } = await supabase
      .from('synesthesia_mappings')
      .delete()
      .eq('id', req.params.id)
      .eq('user_id', req.userId);

    if (error) throw error;
    res.json({ deleted: true });
  } catch (err) {
    console.error('Delete synesthesia error:', err);
    res.status(500).json({ error: 'Failed to delete synesthesia mapping' });
  }
});

module.exports = router;
