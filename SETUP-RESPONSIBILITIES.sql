-- ============================================================
-- RushiPandit Staff Portal — Employee Responsibilities Setup
-- Run this in Supabase SQL Editor
-- ============================================================

-- Step 1: Create responsibilities table (separate from tasks)
DROP TABLE IF EXISTS public.employee_responsibilities CASCADE;

CREATE TABLE public.employee_responsibilities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  daily_target INTEGER DEFAULT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.employee_responsibilities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "read_own_responsibilities" ON public.employee_responsibilities
  FOR SELECT USING (
    auth.uid() = employee_id OR
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "admin_manage_responsibilities" ON public.employee_responsibilities
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Step 2: Clear old regular tasks
DELETE FROM public.tasks WHERE task_type = 'regular';

-- Step 3: Insert responsibilities — cast NULL explicitly as INTEGER

-- Shreya
INSERT INTO public.employee_responsibilities (employee_id, title, daily_target, sort_order)
SELECT p.id, r.title, r.target::INTEGER, r.ord FROM public.profiles p
JOIN (VALUES
  ('Internal posting',    NULL::INTEGER, 1),
  ('Leads management',    NULL::INTEGER, 2),
  ('Comments management', NULL::INTEGER, 3),
  ('Prospect handling',   NULL::INTEGER, 4)
) AS r(title, target, ord) ON p.full_name ILIKE '%Shreya%'
WHERE p.role = 'employee';

-- Shirdhar
INSERT INTO public.employee_responsibilities (employee_id, title, daily_target, sort_order)
SELECT p.id, r.title, r.target::INTEGER, r.ord FROM public.profiles p
JOIN (VALUES
  ('SM Calling',    10::INTEGER, 1),
  ('SM Follow-up',  20::INTEGER, 2),
  ('SM Enrollment', 15::INTEGER, 3)
) AS r(title, target, ord) ON p.full_name ILIKE '%Shirdhar%'
WHERE p.role = 'employee';

-- Poonam
INSERT INTO public.employee_responsibilities (employee_id, title, daily_target, sort_order)
SELECT p.id, r.title, r.target::INTEGER, r.ord FROM public.profiles p
JOIN (VALUES
  ('Daily Calls',       15::INTEGER, 1),
  ('Daily Follow-up',   25::INTEGER, 2),
  ('DM Enrollment',     15::INTEGER, 3),
  ('Amazon Enrollment', 10::INTEGER, 4)
) AS r(title, target, ord) ON p.full_name ILIKE '%Poonam%'
WHERE p.role = 'employee';

-- Kedar
INSERT INTO public.employee_responsibilities (employee_id, title, daily_target, sort_order)
SELECT p.id, r.title, r.target::INTEGER, r.ord FROM public.profiles p
JOIN (VALUES
  ('Client management',       NULL::INTEGER, 1),
  ('Client reporting',        NULL::INTEGER, 2),
  ('Client reel editing',     4::INTEGER,    3),
  ('Client YouTube editing',  1::INTEGER,    4)
) AS r(title, target, ord) ON p.full_name ILIKE '%Kedar%'
WHERE p.role = 'employee';

-- Suyog
INSERT INTO public.employee_responsibilities (employee_id, title, daily_target, sort_order)
SELECT p.id, r.title, r.target::INTEGER, r.ord FROM public.profiles p
JOIN (VALUES
  ('Internal reel editing',    4::INTEGER, 1),
  ('Internal YouTube editing', 1::INTEGER, 2)
) AS r(title, target, ord) ON p.full_name ILIKE '%Suyog%'
WHERE p.role = 'employee';

-- Pooja
INSERT INTO public.employee_responsibilities (employee_id, title, daily_target, sort_order)
SELECT p.id, r.title, r.target::INTEGER, r.ord FROM public.profiles p
JOIN (VALUES
  ('Client posting',    NULL::INTEGER, 1),
  ('Content scripting', 3::INTEGER,    2),
  ('Ads reporting',     NULL::INTEGER, 3),
  ('Tech support',      NULL::INTEGER, 4)
) AS r(title, target, ord) ON p.full_name ILIKE '%Pooja%'
WHERE p.role = 'employee';

-- Rohan
INSERT INTO public.employee_responsibilities (employee_id, title, daily_target, sort_order)
SELECT p.id, r.title, r.target::INTEGER, r.ord FROM public.profiles p
JOIN (VALUES
  ('Shoot',                  5::INTEGER,    1),
  ('Design',                 2::INTEGER,    2),
  ('Daily posting',          NULL::INTEGER, 3),
  ('Webinar management',     NULL::INTEGER, 4),
  ('Reminder management',    NULL::INTEGER, 5),
  ('WhatsApp group creation',NULL::INTEGER, 6),
  ('Webinar coordination',   NULL::INTEGER, 7)
) AS r(title, target, ord) ON p.full_name ILIKE '%Rohan%'
WHERE p.role = 'employee';

-- Swapnil
INSERT INTO public.employee_responsibilities (employee_id, title, daily_target, sort_order)
SELECT p.id, r.title, r.target::INTEGER, r.ord FROM public.profiles p
JOIN (VALUES
  ('Content scripting',    NULL::INTEGER, 1),
  ('Shooting',             NULL::INTEGER, 2),
  ('Google posting replies',NULL::INTEGER, 3)
) AS r(title, target, ord) ON p.full_name ILIKE '%Swapnil%'
WHERE p.role = 'employee';

SELECT 'Responsibilities setup complete!' AS status;
