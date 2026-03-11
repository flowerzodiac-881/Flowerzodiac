const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { supabase } = require('../config/supabase');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// GET /api/journal
router.get('/', authenticate, async (req, res) => {
  try {
    if (!supabase) {
      return res.json([]);
    }

    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('user_id', req.userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    console.error('Get journal error:', err);
    res.status(500).json({ error: 'Failed to fetch journal entries' });
  }
});

// POST /api/journal
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, body, mood } = req.body;

    if (!supabase) {
      return res.status(201).json({
        id: uuidv4(),
        user_id: req.userId,
        title: title || null,
        body: body || null,
        mood: mood || null,
        created_at: new Date().toISOString(),
      });
    }

    const { data, error } = await supabase
      .from('journal_entries')
      .insert({
        user_id: req.userId,
        title: title || null,
        body: body || null,
        mood: mood || null,
      })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    console.error('Create journal error:', err);
    res.status(500).json({ error: 'Failed to create journal entry' });
  }
});

// PUT /api/journal/:id
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { title, body, mood } = req.body;

    if (!supabase) {
      return res.json({ id: req.params.id, ...req.body });
    }

    const updateData = { updated_at: new Date().toISOString() };
    if (title !== undefined) updateData.title = title;
    if (body !== undefined) updateData.body = body;
    if (mood !== undefined) updateData.mood = mood;

    const { data, error } = await supabase
      .from('journal_entries')
      .update(updateData)
      .eq('id', req.params.id)
      .eq('user_id', req.userId)
      .select()
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Journal entry not found' });
    res.json(data);
  } catch (err) {
    console.error('Update journal error:', err);
    res.status(500).json({ error: 'Failed to update journal entry' });
  }
});

// DELETE /api/journal/:id
router.delete('/:id', authenticate, async (req, res) => {
  try {
    if (!supabase) {
      return res.json({ deleted: true });
    }

    const { error } = await supabase
      .from('journal_entries')
      .delete()
      .eq('id', req.params.id)
      .eq('user_id', req.userId);

    if (error) throw error;
    res.json({ deleted: true });
  } catch (err) {
    console.error('Delete journal error:', err);
    res.status(500).json({ error: 'Failed to delete journal entry' });
  }
});

module.exports = router;
