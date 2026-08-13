-- ══════════════════════════════════════════════════════
-- POINTS SYSTEM — Safe to re-run (idempotent)
-- ══════════════════════════════════════════════════════

-- 1. Daily points table
CREATE TABLE IF NOT EXISTS employee_points (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  report_date DATE NOT NULL,
  points INTEGER NOT NULL DEFAULT 0,
  reason TEXT,
  targets_hit INTEGER DEFAULT 0,
  targets_total INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(employee_id, report_date)
);

-- 2. Enable RLS
ALTER TABLE employee_points ENABLE ROW LEVEL SECURITY;

-- 3. Drop existing policies first (safe re-run)
DROP POLICY IF EXISTS "Admin full access to points" ON employee_points;
DROP POLICY IF EXISTS "Employees can view own points" ON employee_points;

-- 4. Recreate policies
CREATE POLICY "Admin full access to points" ON employee_points
  FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Employees can view own points" ON employee_points
  FOR SELECT TO authenticated
  USING (employee_id = auth.uid());

-- 5. Star performers table
CREATE TABLE IF NOT EXISTS star_performers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  month TEXT NOT NULL,
  rank INTEGER NOT NULL,
  total_points INTEGER NOT NULL,
  announced_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(month, rank)
);

ALTER TABLE star_performers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Everyone can view star performers" ON star_performers;
DROP POLICY IF EXISTS "Admin can manage star performers" ON star_performers;

CREATE POLICY "Everyone can view star performers" ON star_performers
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admin can manage star performers" ON star_performers
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

SELECT 'Points system tables ready ✅' AS result;
