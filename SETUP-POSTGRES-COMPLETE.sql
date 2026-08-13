-- ============================================================
-- RushiPandit Staff Portal — Master Self-Hosted PostgreSQL Schema
-- Run this EVERY time to safely migrate / create all tables
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- PROFILES (users / employees)
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
  bio             TEXT,
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS whatsapp_number TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- ATTENDANCE & EMPLOYEE_ATTENDANCE
CREATE TABLE IF NOT EXISTS attendance (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id   UUID REFERENCES profiles(id) ON DELETE CASCADE,
  date          DATE NOT NULL,
  check_in      TIMESTAMPTZ,
  check_out     TIMESTAMPTZ,
  status        TEXT DEFAULT 'present',
  notes         TEXT,
  updated_at    TIMESTAMPTZ DEFAULT NOW(),
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(employee_id, date)
);

CREATE TABLE IF NOT EXISTS employee_attendance (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id   UUID REFERENCES profiles(id) ON DELETE CASCADE,
  date          DATE NOT NULL,
  check_in      TIMESTAMPTZ,
  check_out     TIMESTAMPTZ,
  status        TEXT DEFAULT 'present',
  notes         TEXT,
  updated_at    TIMESTAMPTZ DEFAULT NOW(),
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(employee_id, date)
);

-- TASKS
CREATE TABLE IF NOT EXISTS tasks (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT NOT NULL,
  description   TEXT,
  assigned_to   UUID REFERENCES profiles(id) ON DELETE CASCADE,
  assigned_by   UUID REFERENCES profiles(id),
  task_type     TEXT DEFAULT 'assigned',
  priority      TEXT DEFAULT 'medium',
  status        TEXT DEFAULT 'pending',
  due_date      DATE,
  deadline      TIMESTAMPTZ,
  reminder_sent BOOLEAN DEFAULT FALSE,
  completed_at  TIMESTAMPTZ,
  notes         TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE tasks DROP CONSTRAINT IF EXISTS tasks_task_type_check;
ALTER TABLE tasks DROP CONSTRAINT IF EXISTS tasks_priority_check;
ALTER TABLE tasks DROP CONSTRAINT IF EXISTS tasks_status_check;
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS deadline TIMESTAMPTZ;
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS reminder_sent BOOLEAN DEFAULT FALSE;
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS completed_at TIMESTAMPTZ;
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- TASK UPDATES
CREATE TABLE IF NOT EXISTS task_updates (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id          UUID REFERENCES tasks(id) ON DELETE CASCADE,
  updated_by       UUID REFERENCES profiles(id),
  progress_percent INTEGER DEFAULT 0,
  comment          TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- TASK REMINDER LOG
CREATE TABLE IF NOT EXISTS task_reminder_log (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id       UUID REFERENCES tasks(id) ON DELETE CASCADE,
  reminder_type TEXT DEFAULT 'deadline',
  sent_at       TIMESTAMPTZ DEFAULT NOW()
);

-- DAILY REPORTS
-- Column reference: entries (JSONB), note (TEXT), check_in_time, check_out_time, updated_by_admin
CREATE TABLE IF NOT EXISTS daily_reports (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id       UUID REFERENCES profiles(id) ON DELETE CASCADE,
  report_date       DATE NOT NULL DEFAULT CURRENT_DATE,
  entries           JSONB DEFAULT '[]',
  note              TEXT DEFAULT '',
  check_in_time     TIME,
  check_out_time    TIME,
  content           TEXT,
  audio_url         TEXT,
  ai_summary        TEXT,
  ai_feedback       TEXT,
  admin_comment     TEXT,
  performance_score INTEGER,
  updated_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_by_admin  BOOLEAN DEFAULT FALSE,
  submitted_at      TIMESTAMPTZ DEFAULT NOW(),
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(employee_id, report_date)
);

ALTER TABLE daily_reports ADD COLUMN IF NOT EXISTS entries JSONB DEFAULT '[]';
ALTER TABLE daily_reports ADD COLUMN IF NOT EXISTS note TEXT DEFAULT '';
ALTER TABLE daily_reports ADD COLUMN IF NOT EXISTS check_in_time TIME;
ALTER TABLE daily_reports ADD COLUMN IF NOT EXISTS check_out_time TIME;
ALTER TABLE daily_reports ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE daily_reports ADD COLUMN IF NOT EXISTS updated_by_admin BOOLEAN DEFAULT FALSE;
ALTER TABLE daily_reports ADD COLUMN IF NOT EXISTS admin_comment TEXT;
ALTER TABLE daily_reports ADD COLUMN IF NOT EXISTS content TEXT;
ALTER TABLE daily_reports ADD COLUMN IF NOT EXISTS ai_summary TEXT;
ALTER TABLE daily_reports ADD COLUMN IF NOT EXISTS ai_feedback TEXT;
ALTER TABLE daily_reports ADD COLUMN IF NOT EXISTS performance_score INTEGER;

-- Safe UNIQUE constraint for daily_reports (skip if already exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'daily_reports_employee_id_report_date_key'
  ) THEN
    ALTER TABLE daily_reports ADD CONSTRAINT daily_reports_employee_id_report_date_key UNIQUE (employee_id, report_date);
  END IF;
END $$;

-- NOTIFICATIONS
CREATE TABLE IF NOT EXISTS notifications (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  message       TEXT,
  type          TEXT DEFAULT 'info',
  task_id       UUID REFERENCES tasks(id) ON DELETE CASCADE,
  is_read       BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE notifications ADD COLUMN IF NOT EXISTS task_id UUID REFERENCES tasks(id) ON DELETE CASCADE;

-- CLIENTS
CREATE TABLE IF NOT EXISTS clients (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  slug            TEXT,
  color           TEXT DEFAULT '#6366f1',
  logo_url        TEXT,
  email           TEXT,
  phone           TEXT,
  company         TEXT,
  industry        TEXT,
  status          TEXT DEFAULT 'active',
  is_active       BOOLEAN DEFAULT TRUE,
  notes           TEXT,
  assigned_to     UUID REFERENCES profiles(id),
  created_by      UUID REFERENCES profiles(id),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE clients ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS color TEXT DEFAULT '#6366f1';
ALTER TABLE clients ADD COLUMN IF NOT EXISTS logo_url TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;

-- CLIENT DELIVERABLES
CREATE TABLE IF NOT EXISTS client_deliverables (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id      UUID REFERENCES clients(id) ON DELETE CASCADE,
  content_type   TEXT NOT NULL,
  monthly_target INTEGER DEFAULT 0,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- CLIENT LOGS & CLIENT_PROGRESS_LOG
CREATE TABLE IF NOT EXISTS client_logs (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id      UUID REFERENCES clients(id) ON DELETE CASCADE,
  deliverable_id UUID REFERENCES client_deliverables(id) ON DELETE CASCADE,
  employee_id    UUID REFERENCES profiles(id),
  log_date       DATE NOT NULL DEFAULT CURRENT_DATE,
  count          INTEGER DEFAULT 1,
  notes          TEXT,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS client_progress_log (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id      UUID REFERENCES clients(id) ON DELETE CASCADE,
  deliverable_id UUID REFERENCES client_deliverables(id) ON DELETE CASCADE,
  employee_id    UUID REFERENCES profiles(id),
  log_date       DATE NOT NULL DEFAULT CURRENT_DATE,
  count          INTEGER DEFAULT 1,
  notes          TEXT,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- LEADS
CREATE TABLE IF NOT EXISTS leads (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name                  TEXT NOT NULL,
  phone                 TEXT,
  email                 TEXT,
  platform              TEXT DEFAULT 'Facebook',
  category              TEXT DEFAULT 'Digital Marketing',
  industry              TEXT DEFAULT 'Digital Marketing',
  source                TEXT DEFAULT 'facebook_lead_ad',
  status                TEXT DEFAULT 'new',
  assigned_to           UUID REFERENCES profiles(id),
  qualification_answers JSONB DEFAULT '{}',
  notes                 TEXT,
  follow_up_date        TIMESTAMPTZ,
  whatsapp_sent         BOOLEAN DEFAULT FALSE,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE leads ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'Digital Marketing';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'facebook_lead_ad';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS follow_up_date TIMESTAMPTZ;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS qualification_answers JSONB DEFAULT '{}';

-- LEAD FOLLOW-UPS
CREATE TABLE IF NOT EXISTS lead_followups (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id       UUID REFERENCES leads(id) ON DELETE CASCADE,
  done_by       UUID REFERENCES profiles(id),
  followup_num  INTEGER DEFAULT 1,
  outcome       TEXT,
  notes         TEXT,
  next_followup TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- INDUSTRY ROUND-ROBIN STATE
CREATE TABLE IF NOT EXISTS industry_round_robin_state (
  industry            TEXT PRIMARY KEY,
  last_assigned_index INTEGER DEFAULT -1,
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- SALES INDUSTRY SKILLS
CREATE TABLE IF NOT EXISTS sales_industry_skills (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  industry    TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(employee_id, industry)
);

-- POINTS / LEADERBOARD
CREATE TABLE IF NOT EXISTS employee_points (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id   UUID REFERENCES profiles(id) ON DELETE CASCADE,
  report_date   DATE DEFAULT CURRENT_DATE,
  points        INTEGER DEFAULT 0,
  targets_hit   INTEGER DEFAULT 0,
  targets_total INTEGER DEFAULT 0,
  reason        TEXT,
  given_by      UUID REFERENCES profiles(id),
  updated_at    TIMESTAMPTZ DEFAULT NOW(),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE employee_points ADD COLUMN IF NOT EXISTS report_date DATE DEFAULT CURRENT_DATE;
ALTER TABLE employee_points ADD COLUMN IF NOT EXISTS targets_hit INTEGER DEFAULT 0;
ALTER TABLE employee_points ADD COLUMN IF NOT EXISTS targets_total INTEGER DEFAULT 0;
ALTER TABLE employee_points ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Safe UNIQUE constraint on employee_points
CREATE UNIQUE INDEX IF NOT EXISTS employee_points_emp_date_idx ON employee_points(employee_id, report_date);

-- STAR PERFORMERS
CREATE TABLE IF NOT EXISTS star_performers (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id  UUID REFERENCES profiles(id) ON DELETE CASCADE,
  month_year   TEXT NOT NULL,
  month        TEXT,
  total_points INTEGER DEFAULT 0,
  rank         INTEGER DEFAULT 1,
  reward_notes TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(employee_id, month_year)
);

ALTER TABLE star_performers ADD COLUMN IF NOT EXISTS month TEXT;

-- Sync month column from month_year for existing rows
UPDATE star_performers SET month = month_year WHERE month IS NULL;

-- RESPONSIBILITIES
CREATE TABLE IF NOT EXISTS employee_responsibilities (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  description TEXT,
  daily_target INTEGER DEFAULT 0,
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE employee_responsibilities ADD COLUMN IF NOT EXISTS daily_target INTEGER DEFAULT 0;
ALTER TABLE employee_responsibilities ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- ============================================================
-- SEED: All User Accounts
-- Password for all: RushiPandit@2026
-- ============================================================
INSERT INTO profiles (email, full_name, password_hash, role, department, designation, is_active)
VALUES
  ('rushikesh@rushipandit.com', 'Rushikesh Pandit', '$2b$10$JcHyn5URTpGtdQnKbfG.H.kmBv4oZm.TgD2Dghbc7qriPszSW2wR.', 'admin', 'Management', 'Director', true),
  ('krish.rushipandit@gmail.com', 'Krish Rushipandit', '$2b$10$JcHyn5URTpGtdQnKbfG.H.kmBv4oZm.TgD2Dghbc7qriPszSW2wR.', 'admin', 'Management', 'Director', true),
  ('poonam@rushipandit.com', 'Poonam Gaikwad', '$2b$10$JcHyn5URTpGtdQnKbfG.H.kmBv4oZm.TgD2Dghbc7qriPszSW2wR.', 'employee', 'Sales', 'Sales Executive', true),
  ('pooja@rushipandit.com', 'Pooja Mali', '$2b$10$JcHyn5URTpGtdQnKbfG.H.kmBv4oZm.TgD2Dghbc7qriPszSW2wR.', 'employee', 'Operations', 'Operations Executive', true),
  ('kedar@rushipandit.com', 'Kedar Lokhande', '$2b$10$JcHyn5URTpGtdQnKbfG.H.kmBv4oZm.TgD2Dghbc7qriPszSW2wR.', 'employee', 'Media', 'Video Editor', true),
  ('suyog@rushipandit.com', 'Suyog Rane', '$2b$10$JcHyn5URTpGtdQnKbfG.H.kmBv4oZm.TgD2Dghbc7qriPszSW2wR.', 'employee', 'Business', 'Business Manager', true),
  ('rohan@rushipandit.com', 'Rohan Solunke', '$2b$10$JcHyn5URTpGtdQnKbfG.H.kmBv4oZm.TgD2Dghbc7qriPszSW2wR.', 'employee', 'Design', 'Creative Designer', true),
  ('swapnil@rushipandit.com', 'Swapnil Baviskar', '$2b$10$JcHyn5URTpGtdQnKbfG.H.kmBv4oZm.TgD2Dghbc7qriPszSW2wR.', 'employee', 'Operations', 'Operations Manager', true),
  ('shreya@rushipandit.com', 'Shreya Sargade', '$2b$10$JcHyn5URTpGtdQnKbfG.H.kmBv4oZm.TgD2Dghbc7qriPszSW2wR.', 'employee', 'Operations', 'Employee', true),
  ('naveen@rushipandit.com', 'Naveen', '$2b$10$JcHyn5URTpGtdQnKbfG.H.kmBv4oZm.TgD2Dghbc7qriPszSW2wR.', 'employee', 'Sales', 'Sales Executive', true),
  ('shridhar@rushipandit.com', 'Shridhar', '$2b$10$JcHyn5URTpGtdQnKbfG.H.kmBv4oZm.TgD2Dghbc7qriPszSW2wR.', 'employee', 'Sales', 'Sales Executive', true)
ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash;

-- SEED: Demo Client for Strategy Panel
INSERT INTO clients (name, slug, color, is_active)
VALUES ('RushiPandit Institute', 'rushipandit-institute', '#6366f1', true)
ON CONFLICT DO NOTHING;

INSERT INTO client_deliverables (client_id, content_type, monthly_target)
SELECT id, 'Reel', 15 FROM clients WHERE slug = 'rushipandit-institute' OR name = 'RushiPandit Institute'
ON CONFLICT DO NOTHING;

INSERT INTO client_deliverables (client_id, content_type, monthly_target)
SELECT id, 'YouTube', 8 FROM clients WHERE slug = 'rushipandit-institute' OR name = 'RushiPandit Institute'
ON CONFLICT DO NOTHING;

INSERT INTO client_deliverables (client_id, content_type, monthly_target)
SELECT id, 'Static Post', 20 FROM clients WHERE slug = 'rushipandit-institute' OR name = 'RushiPandit Institute'
ON CONFLICT DO NOTHING;

-- SEED: All Employee Responsibilities & Daily Targets
DELETE FROM employee_responsibilities;

-- Poonam Gaikwad (Sales)
INSERT INTO employee_responsibilities (employee_id, title, daily_target, sort_order)
SELECT id, title, target, ord FROM profiles p,
(VALUES
  ('Daily Calls',       15, 1),
  ('Daily Follow-up',   25, 2),
  ('DM Enrollment',     15, 3),
  ('Amazon Enrollment', 10, 4)
) AS r(title, target, ord)
WHERE p.email = 'poonam@rushipandit.com';

-- Shridhar (Sales)
INSERT INTO employee_responsibilities (employee_id, title, daily_target, sort_order)
SELECT id, title, target, ord FROM profiles p,
(VALUES
  ('SM Calling',    10, 1),
  ('SM Follow-up',  20, 2),
  ('SM Enrollment', 15, 3)
) AS r(title, target, ord)
WHERE p.email = 'shridhar@rushipandit.com';

-- Naveen (Sales)
INSERT INTO employee_responsibilities (employee_id, title, daily_target, sort_order)
SELECT id, title, target, ord FROM profiles p,
(VALUES
  ('Daily Calls',     15, 1),
  ('Daily Follow-up', 25, 2),
  ('DM Enrollment',   15, 3)
) AS r(title, target, ord)
WHERE p.email = 'naveen@rushipandit.com';

-- Kedar Lokhande (Media / Video Editor)
INSERT INTO employee_responsibilities (employee_id, title, daily_target, sort_order)
SELECT id, title, target, ord FROM profiles p,
(VALUES
  ('Client management',      0, 1),
  ('Client reporting',       0, 2),
  ('Client reel editing',    4, 3),
  ('Client YouTube editing', 1, 4)
) AS r(title, target, ord)
WHERE p.email = 'kedar@rushipandit.com';

-- Suyog Rane (Business / Media)
INSERT INTO employee_responsibilities (employee_id, title, daily_target, sort_order)
SELECT id, title, target, ord FROM profiles p,
(VALUES
  ('Internal reel editing',    4, 1),
  ('Internal YouTube editing', 1, 2)
) AS r(title, target, ord)
WHERE p.email = 'suyog@rushipandit.com';

-- Pooja Mali (Operations)
INSERT INTO employee_responsibilities (employee_id, title, daily_target, sort_order)
SELECT id, title, target, ord FROM profiles p,
(VALUES
  ('Client posting',    0, 1),
  ('Content scripting', 3, 2),
  ('Ads reporting',     0, 3),
  ('Tech support',      0, 4)
) AS r(title, target, ord)
WHERE p.email = 'pooja@rushipandit.com';

-- Rohan Solunke (Design / Creative)
INSERT INTO employee_responsibilities (employee_id, title, daily_target, sort_order)
SELECT id, title, target, ord FROM profiles p,
(VALUES
  ('Shoot',                  5, 1),
  ('Design',                 2, 2),
  ('Daily posting',          0, 3),
  ('Webinar management',     0, 4),
  ('Reminder management',    0, 5),
  ('WhatsApp group creation',0, 6),
  ('Webinar coordination',   0, 7)
) AS r(title, target, ord)
WHERE p.email = 'rohan@rushipandit.com';

-- Swapnil Baviskar (Operations Manager)
INSERT INTO employee_responsibilities (employee_id, title, daily_target, sort_order)
SELECT id, title, target, ord FROM profiles p,
(VALUES
  ('Content scripting',     0, 1),
  ('Shooting',              0, 2),
  ('Google posting replies',0, 3)
) AS r(title, target, ord)
WHERE p.email = 'swapnil@rushipandit.com';

-- Shreya Sargade (Operations / Employee)
INSERT INTO employee_responsibilities (employee_id, title, daily_target, sort_order)
SELECT id, title, target, ord FROM profiles p,
(VALUES
  ('Internal posting',   0, 1),
  ('Leads management',   0, 2),
  ('Comments management',0, 3),
  ('Prospect handling',  0, 4)
) AS r(title, target, ord)
WHERE p.email = 'shreya@rushipandit.com';

-- SEED: All Clients & Deliverables (Strategy Panel & Client Work Section)
INSERT INTO clients (name, slug, color, is_active) VALUES
  ('CA', 'ca', '#6366f1', true),
  ('Advisor Alpha', 'advisor-alpha', '#10b981', true),
  ('MBC', 'mbc', '#f59e0b', true),
  ('AmicusClaims', 'amicusclaims', '#ef4444', true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO client_deliverables (client_id, content_type, monthly_target)
SELECT id, 'Reel', 8 FROM clients WHERE slug = 'ca'
ON CONFLICT DO NOTHING;

INSERT INTO client_deliverables (client_id, content_type, monthly_target)
SELECT id, 'Reel', 8 FROM clients WHERE slug = 'advisor-alpha'
ON CONFLICT DO NOTHING;

INSERT INTO client_deliverables (client_id, content_type, monthly_target)
SELECT id, 'Reel', 12 FROM clients WHERE slug = 'mbc'
ON CONFLICT DO NOTHING;

INSERT INTO client_deliverables (client_id, content_type, monthly_target)
SELECT id, 'Reel', 8 FROM clients WHERE slug = 'amicusclaims'
ON CONFLICT DO NOTHING;

INSERT INTO client_deliverables (client_id, content_type, monthly_target)
SELECT id, 'YouTube', 4 FROM clients WHERE slug = 'amicusclaims'
ON CONFLICT DO NOTHING;

INSERT INTO client_deliverables (client_id, content_type, monthly_target)
SELECT id, 'Static Post', 4 FROM clients WHERE slug = 'amicusclaims'
ON CONFLICT DO NOTHING;

-- SEED: Sales Industry Skills
INSERT INTO sales_industry_skills (employee_id, industry)
SELECT id, 'Digital Marketing' FROM profiles WHERE department = 'Sales'
ON CONFLICT DO NOTHING;

INSERT INTO sales_industry_skills (employee_id, industry)
SELECT id, 'Share Market' FROM profiles WHERE department = 'Sales'
ON CONFLICT DO NOTHING;

INSERT INTO sales_industry_skills (employee_id, industry)
SELECT id, 'Amazon' FROM profiles WHERE department = 'Sales'
ON CONFLICT DO NOTHING;
