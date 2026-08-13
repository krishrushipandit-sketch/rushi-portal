-- ══════════════════════════════════════════════════════════
-- CLIENT PRODUCTION TRACKER — Run in Supabase SQL Editor
-- ══════════════════════════════════════════════════════════

-- 1. Clients table
CREATE TABLE IF NOT EXISTS clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  color TEXT DEFAULT '#6366f1',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Client deliverables (monthly targets per content type)
CREATE TABLE IF NOT EXISTS client_deliverables (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  content_type TEXT NOT NULL,       -- 'reel', 'youtube', 'static_post'
  monthly_target INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

-- 3. Daily progress log (what was actually completed each day)
CREATE TABLE IF NOT EXISTS client_progress_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  deliverable_id UUID NOT NULL REFERENCES client_deliverables(id) ON DELETE CASCADE,
  employee_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  log_date DATE NOT NULL,
  count INTEGER NOT NULL DEFAULT 1,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. RLS
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_deliverables ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_progress_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "All auth users can view clients" ON clients FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin can manage clients" ON clients FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "All auth users can view deliverables" ON client_deliverables FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin can manage deliverables" ON client_deliverables FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "All auth users can view progress" ON client_progress_log FOR SELECT TO authenticated USING (true);
CREATE POLICY "Employees can insert own progress" ON client_progress_log FOR INSERT TO authenticated
  WITH CHECK (employee_id = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admin can manage all progress" ON client_progress_log FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- 5. Seed the 4 VoodooMedia clients
INSERT INTO clients (name, slug, color) VALUES
  ('CA', 'ca', '#6366f1'),
  ('Advisor Alpha', 'advisor-alpha', '#10b981'),
  ('MBC', 'mbc', '#f59e0b'),
  ('AmicusClaims', 'amicusclaims', '#ef4444')
ON CONFLICT (slug) DO NOTHING;

-- 6. Seed monthly deliverables
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

SELECT 'Client production tracker tables created ✅' AS result;
