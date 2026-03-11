const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { supabase } = require('../config/supabase');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

const VALID_STATUSES = ['todo', 'in_progress', 'done'];

// GET /api/tasks
router.get('/', authenticate, async (req, res) => {
  try {
    const { status } = req.query;

    if (!supabase) {
      return res.json([]);
    }

    let query = supabase
      .from('tasks')
      .select('*')
      .eq('user_id', req.userId)
      .order('created_at', { ascending: false });

    if (status && VALID_STATUSES.includes(status)) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;
    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    console.error('Get tasks error:', err);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// POST /api/tasks
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, description, status, priority, parentTaskId, dueDate } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    if (status && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` });
    }

    if (!supabase) {
      return res.status(201).json({
        id: uuidv4(),
        user_id: req.userId,
        title,
        description: description || null,
        status: status || 'todo',
        priority: priority || 0,
        parent_task_id: parentTaskId || null,
        due_date: dueDate || null,
        created_at: new Date().toISOString(),
      });
    }

    const { data, error } = await supabase
      .from('tasks')
      .insert({
        user_id: req.userId,
        title,
        description: description || null,
        status: status || 'todo',
        priority: priority || 0,
        parent_task_id: parentTaskId || null,
        due_date: dueDate || null,
      })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    console.error('Create task error:', err);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// PUT /api/tasks/:id
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { title, description, status, priority, parentTaskId, dueDate } = req.body;

    if (status && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` });
    }

    if (!supabase) {
      return res.json({ id: req.params.id, ...req.body });
    }

    const updateData = { updated_at: new Date().toISOString() };
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status;
    if (priority !== undefined) updateData.priority = priority;
    if (parentTaskId !== undefined) updateData.parent_task_id = parentTaskId;
    if (dueDate !== undefined) updateData.due_date = dueDate;

    const { data, error } = await supabase
      .from('tasks')
      .update(updateData)
      .eq('id', req.params.id)
      .eq('user_id', req.userId)
      .select()
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Task not found' });
    res.json(data);
  } catch (err) {
    console.error('Update task error:', err);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// DELETE /api/tasks/:id
router.delete('/:id', authenticate, async (req, res) => {
  try {
    if (!supabase) {
      return res.json({ deleted: true });
    }

    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', req.params.id)
      .eq('user_id', req.userId);

    if (error) throw error;
    res.json({ deleted: true });
  } catch (err) {
    console.error('Delete task error:', err);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;
