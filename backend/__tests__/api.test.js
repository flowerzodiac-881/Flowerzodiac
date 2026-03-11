const request = require('supertest');
const app = require('../src/index');

describe('NeuroFlow API', () => {
  describe('GET /api/health', () => {
    it('returns status ok', async () => {
      const res = await request(app).get('/api/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
      expect(res.body.timestamp).toBeDefined();
    });
  });

  describe('POST /api/auth/register', () => {
    it('returns 400 when email is missing', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ password: 'test123' });
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Email and password are required');
    });

    it('returns 400 when password is missing', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'test@example.com' });
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Email and password are required');
    });

    it('registers a user in dev mode (no supabase)', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'test@example.com', password: 'Test123!', displayName: 'Test' });
      expect(res.status).toBe(201);
      expect(res.body.user).toBeDefined();
      expect(res.body.user.email).toBe('test@example.com');
      expect(res.body.token).toBeDefined();
    });
  });

  describe('POST /api/auth/login', () => {
    it('returns 400 when credentials are missing', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({});
      expect(res.status).toBe(400);
    });

    it('returns a token in dev mode', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@example.com', password: 'Test123!' });
      expect(res.status).toBe(200);
      expect(res.body.token).toBeDefined();
    });
  });

  describe('Authenticated routes', () => {
    let token;

    beforeAll(async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'auth@example.com', password: 'Auth123!' });
      token = res.body.token;
    });

    it('GET /api/auth/me returns user info', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.id).toBeDefined();
    });

    it('GET /api/auth/me rejects missing token', async () => {
      const res = await request(app).get('/api/auth/me');
      expect(res.status).toBe(401);
    });

    it('GET /api/preferences/modules returns module list', async () => {
      const res = await request(app)
        .get('/api/preferences/modules')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(6);
    });

    it('PUT /api/preferences/modules updates modules', async () => {
      const res = await request(app)
        .put('/api/preferences/modules')
        .set('Authorization', `Bearer ${token}`)
        .send({ modules: [{ module_key: 'sensory', enabled: true }] });
      expect(res.status).toBe(200);
    });

    it('PUT /api/preferences/modules rejects invalid module', async () => {
      const res = await request(app)
        .put('/api/preferences/modules')
        .set('Authorization', `Bearer ${token}`)
        .send({ modules: [{ module_key: 'invalid', enabled: true }] });
      expect(res.status).toBe(400);
    });

    it('GET /api/preferences/sensory returns preferences', async () => {
      const res = await request(app)
        .get('/api/preferences/sensory')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });

    it('GET /api/preferences/invalid returns 400', async () => {
      const res = await request(app)
        .get('/api/preferences/invalid')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(400);
    });

    it('GET /api/tasks returns empty array', async () => {
      const res = await request(app)
        .get('/api/tasks')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('POST /api/tasks creates a task', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Test task', description: 'A test task' });
      expect(res.status).toBe(201);
      expect(res.body.title).toBe('Test task');
    });

    it('POST /api/tasks creates a micro-step task', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Step 1', isMicroStep: true, stepOrder: 1 });
      expect(res.status).toBe(201);
      expect(res.body.is_micro_step).toBe(true);
      expect(res.body.step_order).toBe(1);
    });

    it('POST /api/tasks rejects missing title', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({ description: 'No title' });
      expect(res.status).toBe(400);
    });

    it('POST /api/tasks rejects invalid status', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Test', status: 'invalid_status' });
      expect(res.status).toBe(400);
    });

    it('GET /api/journal returns empty array', async () => {
      const res = await request(app)
        .get('/api/journal')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('POST /api/journal creates an entry', async () => {
      const res = await request(app)
        .post('/api/journal')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'My day', body: 'Today was good', mood: 'happy' });
      expect(res.status).toBe(201);
      expect(res.body.title).toBe('My day');
    });

    // --- Accessibility Profile ---

    it('GET /api/accessibility-profile returns default profile', async () => {
      const res = await request(app)
        .get('/api/accessibility-profile')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.pure_dark_mode).toBe(false);
      expect(res.body.motion_reduced).toBe(false);
      expect(res.body.dyslexic_font_enabled).toBe(false);
      expect(res.body.macro_gestures_enabled).toBe(false);
      expect(res.body.safe_mode_enabled).toBe(false);
    });

    it('GET /api/accessibility-profile rejects unauthenticated', async () => {
      const res = await request(app)
        .get('/api/accessibility-profile');
      expect(res.status).toBe(401);
    });

    it('PUT /api/accessibility-profile updates profile', async () => {
      const res = await request(app)
        .put('/api/accessibility-profile')
        .set('Authorization', `Bearer ${token}`)
        .send({ pure_dark_mode: true, dyslexic_font_enabled: true });
      expect(res.status).toBe(200);
      expect(res.body.pure_dark_mode).toBe(true);
      expect(res.body.dyslexic_font_enabled).toBe(true);
      // Unchanged defaults remain
      expect(res.body.motion_reduced).toBe(false);
    });

    it('PUT /api/accessibility-profile ignores unknown fields', async () => {
      const res = await request(app)
        .put('/api/accessibility-profile')
        .set('Authorization', `Bearer ${token}`)
        .send({ pure_dark_mode: true, hackerField: 'evil' });
      expect(res.status).toBe(200);
      expect(res.body.hackerField).toBeUndefined();
    });
  });
});
