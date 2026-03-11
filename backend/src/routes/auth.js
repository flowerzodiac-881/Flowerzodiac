const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { supabase } = require('../config/supabase');
const { authenticate, JWT_SECRET } = require('../middleware/auth');

const router = express.Router();

const VALID_MODULES = [
  'sensory',
  'adhd',
  'learning',
  'motor',
  'anxiety',
  'synesthesia',
];

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { email, password, displayName } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    if (!supabase) {
      // Local dev fallback: return a mocked user
      const userId = uuidv4();
      const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
      return res.status(201).json({
        user: { id: userId, email, displayName: displayName || null },
        token,
      });
    }

    // Check existing
    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const { data: user, error } = await supabase
      .from('users')
      .insert({
        email,
        password_hash: passwordHash,
        display_name: displayName || null,
      })
      .select('id, email, display_name')
      .single();

    if (error) throw error;

    // Create default module preferences
    const moduleInserts = VALID_MODULES.map((key) => ({
      user_id: user.id,
      module_key: key,
      enabled: false,
    }));
    await supabase.from('module_preferences').insert(moduleInserts);

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      user: { id: user.id, email: user.email, displayName: user.display_name },
      token,
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    if (!supabase) {
      const userId = uuidv4();
      const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({
        user: { id: userId, email, displayName: null },
        token,
      });
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      user: { id: user.id, email: user.email, displayName: user.display_name },
      token,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// GET /api/auth/me
router.get('/me', authenticate, async (req, res) => {
  try {
    if (!supabase) {
      return res.json({ id: req.userId, email: 'dev@local', displayName: 'Dev User' });
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, display_name')
      .eq('id', req.userId)
      .single();

    if (error || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ id: user.id, email: user.email, displayName: user.display_name });
  } catch (err) {
    console.error('Me error:', err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

module.exports = router;
