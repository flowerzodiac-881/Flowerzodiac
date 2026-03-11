# Flowerzodiac

Just about me

---

## NeuroFlow — Neurodivergent Support Application

A cross-platform mobile application (React Native / Expo) with a Node.js/Express backend
designed to support a wide spectrum of neurodivergent users through **Profile-Driven Modularity**.

### Architecture

```
.
├── backend/           # Node.js / Express API
│   ├── sql/           #   PostgreSQL schema (Supabase)
│   ├── src/
│   │   ├── config/    #   Supabase client
│   │   ├── middleware/ #  JWT auth middleware
│   │   └── routes/    #   auth · preferences · tasks · journal
│   └── __tests__/     #   API integration tests
├── frontend/          # React Native / Expo
│   ├── src/
│   │   ├── constants/ #   Module definitions & colour palettes
│   │   ├── context/   #   ProfileContext (profile-driven modularity)
│   │   ├── components/ #  AccessibleButton · ToggleRow · ModuleCard
│   │   ├── screens/   #   Onboarding · Home · Tasks · Journal · Settings
│   │   └── services/  #   API client
│   └── __tests__/     #   Context unit tests
├── index.html         # Original personal resume website
├── styles.css
└── animations.js
```

### Feature Modules

| Module | Condition | Key Features |
|--------|-----------|--------------|
| Sensory Controls | ASD / SPD | Dark mode, muted palettes, reduce-motion toggle |
| Executive Function | ADHD | Kanban micro-tasks, Pomodoro timer, gamification layer |
| Learning Support | Dyslexia / Dyscalculia / Dysgraphia | OpenDyslexic font, TTS/STT, visual number representations |
| Motor & Coordination | Dyspraxia / DCD / Tourette | Large tap targets (56 px), gesture nav, voice nav, robust undo |
| Anxiety & OCD | Anxiety / OCD | Safe mode, confirmation dialogs, hidden streaks/notifications |
| Synesthesia | Synesthesia | Custom colour/sound/icon tag mappings |

### Quick Start

#### Backend

```bash
cd backend
cp .env.example .env        # fill in Supabase credentials
npm install
npm run dev                  # starts on http://localhost:3000
```

Run the SQL schema against your Supabase project:

```bash
# Via Supabase SQL editor: paste the contents of backend/sql/schema.sql
```

#### Frontend

```bash
cd frontend
npm install
npx expo start               # opens Expo DevTools
```

#### Running Tests

```bash
# Backend
cd backend && npm test

# Frontend
cd frontend && npx jest --forceExit
```

### Deployment

#### Backend → Render / Heroku

1. Push the `backend/` directory to a Git repository (or use a monorepo).
2. On **Render**: create a new Web Service, set root directory to `backend/`, build command `npm install`, start command `npm start`.
3. On **Heroku**: the `Procfile` is already included. Set config vars from `.env.example`.
4. Set environment variables: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `JWT_SECRET`, `PORT`, `CORS_ORIGIN`.

#### Frontend → Expo EAS

```bash
cd frontend
npx eas-cli login
npx eas build --platform all --profile production
npx eas submit --platform all
```

The `eas.json` configuration is already provided with development, preview, and production profiles.

### Database Schema

The full PostgreSQL schema is in `backend/sql/schema.sql` and includes tables for:

- `users` — authentication
- `module_preferences` — which modules each user has toggled on/off
- `sensory_preferences` / `adhd_preferences` / `learning_preferences` / `motor_preferences` / `anxiety_preferences` — per-module settings
- `synesthesia_mappings` — custom colour/sound/icon associations
- `tasks` — micro-task kanban board
- `journal_entries` — reflective journaling

### API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Log in |
| GET | `/api/auth/me` | Get current user |
| GET | `/api/preferences/modules` | List module toggles |
| PUT | `/api/preferences/modules` | Update module toggles |
| GET/PUT | `/api/preferences/:moduleKey` | Module-specific settings |
| GET/POST/PUT/DELETE | `/api/tasks` | Micro-task CRUD |
| GET/POST/PUT/DELETE | `/api/journal` | Journal entry CRUD |
| GET/POST/DELETE | `/api/preferences/synesthesia/mappings` | Synesthesia CRUD |
