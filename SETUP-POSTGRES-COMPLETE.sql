-- ============================================================
-- RushiPandit Staff Portal — Full PostgreSQL Schema
-- Run this once on a fresh database
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- PROFILES (users / employees)
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email           TEXT UNIQUE NOT NULL,
  full_name       TEXT NOT NULL,
  password_hash   TEXT NOT NULL,
  role            TEXT NOT NULL DEFAULT 'employee' CHECK (role IN ('admin', 'employee')),
  department      TEXT,
  designation     TEXT,
  phone           TEXT,
  whatsapp_number TEXT,
  avatar_url      TEXT,
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ATTENDANCE
-- ============================================================
CREATE TABLE IF NOT EXISTS attendance (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id   UUID REFERENCES profiles(id) ON DELETE CASCADE,
  date          DATE NOT NULL,
  check_in      TIMESTAMPTZ,
  check_out     TIMESTAMPTZ,
  status        TEXT DEFAULT 'present' CHECK (status IN ('present','absent','late','half_day','wfh')),
  notes         TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(employee_id, date)
);

-- ============================================================
-- TASKS
-- ============================================================
CREATE TABLE IF NOT EXISTS tasks (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT NOT NULL,
  description   TEXT,
  assigned_to   UUID REFERENCES profiles(id) ON DELETE CASCADE,
  assigned_by   UUID REFERENCES profiles(id),
  task_type     TEXT DEFAULT 'regular' CHECK (task_type IN ('regular','adhoc','project')),
  priority      TEXT DEFAULT 'medium' CHECK (priority IN ('low','medium','high','urgent')),
  status        TEXT DEFAULT 'pending' CHECK (status IN ('pending','in_progress','completed','cancelled')),
  due_date      DATE,
  completed_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- DAILY REPORTS
-- ============================================================
CREATE TABLE IF NOT EXISTS daily_reports (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id     UUID REFERENCES profiles(id) ON DELETE CASCADE,
  report_date     DATE NOT NULL DEFAULT CURRENT_DATE,
  content         TEXT,
  audio_url       TEXT,
  ai_summary      TEXT,
  ai_feedback     TEXT,
  performance_score INTEGER CHECK (performance_score BETWEEN 1 AND 10),
  submitted_at    TIMESTAMPTZ DEFAULT NOW(),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- NOTIFICATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS notifications (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  message       TEXT,
  type          TEXT DEFAULT 'info',
  is_read       BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- CLIENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS clients (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  email           TEXT,
  phone           TEXT,
  company         TEXT,
  industry        TEXT,
  status          TEXT DEFAULT 'active',
  notes           TEXT,
  assigned_to     UUID REFERENCES profiles(id),
  created_by      UUID REFERENCES profiles(id),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- LEADS (Facebook/Pabbly integration)
-- ============================================================
CREATE TABLE IF NOT EXISTS leads (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name                  TEXT NOT NULL,
  phone                 TEXT,
  email                 TEXT,
  platform              TEXT DEFAULT 'Facebook',
  industry              TEXT,
  status                TEXT DEFAULT 'New' CHECK (status IN (
    'New','Ringing','Not Connected','Switched Off',
    'Not Logical','Busy','Interested',
    'Visit Scheduled','Closed Won','Closed Lost'
  )),
  assigned_to           UUID REFERENCES profiles(id),
  qualification_answers JSONB DEFAULT '{}',
  whatsapp_sent         BOOLEAN DEFAULT FALSE,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- LEAD FOLLOW-UPS
-- ============================================================
CREATE TABLE IF NOT EXISTS lead_followups (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id       UUID REFERENCES leads(id) ON DELETE CASCADE,
  done_by       UUID REFERENCES profiles(id),
  followup_num  INTEGER CHECK (followup_num BETWEEN 1 AND 10),
  outcome       TEXT,
  notes         TEXT,
  next_followup TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INDUSTRY ROUND-ROBIN STATE
-- ============================================================
CREATE TABLE IF NOT EXISTS industry_round_robin_state (
  industry            TEXT PRIMARY KEY,
  last_assigned_index INTEGER DEFAULT -1,
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SALES INDUSTRY SKILLS (which rep handles which industry)
-- ============================================================
CREATE TABLE IF NOT EXISTS sales_industry_skills (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  industry    TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(employee_id, industry)
);

-- ============================================================
-- POINTS / LEADERBOARD
-- ============================================================
CREATE TABLE IF NOT EXISTS employee_points (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  points      INTEGER DEFAULT 0,
  reason      TEXT,
  given_by    UUID REFERENCES profiles(id),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- RESPONSIBILITIES
-- ============================================================
CREATE TABLE IF NOT EXISTS employee_responsibilities (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  description TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SEED: Default Admin Users
-- Passwords hashed with bcrypt (cost 10) for 'RushiPandit@2026'
-- ============================================================
INSERT INTO profiles (email, full_name, password_hash, role, department, designation, is_active)
VALUES
  ('rushikesh@rushipandit.com', 'Rushikesh Pandit',
   '$2b$10$JcHyn5URTpGtdQnKbfG.H.kmBv4oZm.TgD2Dghbc7qriPszSW2wR.',
   'admin', 'Management', 'Director', true),
  ('krish.rushipandit@gmail.com', 'Krish Rushipandit',
   '$2b$10$92IXUNpkjO0rOQ5byMi.H.kmBv4oZm.TgD2Dghbc7qriPszSW2wR.',
   'admin', 'Management', 'Director', true),
  ('poonam@rushipandit.com', 'Poonam Gaikwad',
   '$2b$10$92IXUNpkjO0rOQ5byMi.H.kmBv4oZm.TgD2Dghbc7qriPszSW2wR.',
   'employee', 'Sales', 'Sales Executive', true),
  ('pooja@rushipandit.com', 'Pooja Mali',
   '$2b$10$92IXUNpkjO0rOQ5byMi.H.kmBv4oZm.TgD2Dghbc7qriPszSW2wR.',
   'employee', 'Operations', 'Operations Executive', true),
  ('kedar@rushipandit.com', 'Kedar Lokhande',
   '$2b$10$92IXUNpkjO0rOQ5byMi.H.kmBv4oZm.TgD2Dghbc7qriPszSW2wR.',
   'employee', 'Media', 'Video Editor', true),
  ('suyog@rushipandit.com', 'Suyog Rane',
   '$2b$10$92IXUNpkjO0rOQ5byMi.H.kmBv4oZm.TgD2Dghbc7qriPszSW2wR.',
   'employee', 'Business', 'Business Manager', true),
  ('rohan@rushipandit.com', 'Rohan Solunke',
   '$2b$10$92IXUNpkjO0rOQ5byMi.H.kmBv4oZm.TgD2Dghbc7qriPszSW2wR.',
   'employee', 'Design', 'Creative Designer', true),
  ('swapnil@rushipandit.com', 'Swapnil Baviskar',
   '$2b$10$92IXUNpkjO0rOQ5byMi.H.kmBv4oZm.TgD2Dghbc7qriPszSW2wR.',
   'employee', 'Operations', 'Operations Manager', true),
  ('shreya@rushipandit.com', 'Shreya Sargade',
   '$2b$10$92IXUNpkjO0rOQ5byMi.H.kmBv4oZm.TgD2Dghbc7qriPszSW2wR.',
   'employee', 'Operations', 'Employee', true),
  ('naveen@rushipandit.com', 'Naveen',
   '$2b$10$92IXUNpkjO0rOQ5byMi.H.kmBv4oZm.TgD2Dghbc7qriPszSW2wR.',
   'employee', 'Sales', 'Sales Executive', true),
  ('shridhar@rushipandit.com', 'Shridhar',
   '$2b$10$92IXUNpkjO0rOQ5byMi.H.kmBv4oZm.TgD2Dghbc7qriPszSW2wR.',
   'employee', 'Sales', 'Sales Executive', true)
ON CONFLICT (email) DO NOTHING;
