-- ══════════════════════════════════════════════════════════════
-- SETUP INTERNAL BRANDS AND CLIENT ASSIGNMENTS
-- ══════════════════════════════════════════════════════════════

-- 1. Ensure client_type column exists on clients
ALTER TABLE clients ADD COLUMN IF NOT EXISTS client_type VARCHAR(20) DEFAULT 'external';

-- 2. Mark existing clients as external
UPDATE clients SET client_type = 'external' WHERE client_type IS NULL OR client_type = '';

-- 3. Create employee_client_assignments table
CREATE TABLE IF NOT EXISTS employee_client_assignments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(employee_id, client_id)
);

-- 4. Seed the 7 Internal Brands
INSERT INTO clients (name, slug, color, client_type, is_active) VALUES
  ('RushiPandit Digital Marketing', 'rushipandit-digital', '#6366f1', 'internal', true),
  ('Amazon', 'amazon-course', '#f59e0b', 'internal', true),
  ('AI Course', 'ai-course', '#10b981', 'internal', true),
  ('Agnomatic', 'agnomatic', '#8b5cf6', 'internal', true),
  ('Cultural Reels', 'cultural-reels', '#ec4899', 'internal', true),
  ('Pandit Capital', 'pandit-capital', '#3b82f6', 'internal', true),
  ('Agnochat', 'agnochat', '#06b6d4', 'internal', true)
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  color = EXCLUDED.color,
  client_type = 'internal',
  is_active = true;

-- 5. Seed deliverables for internal brands (Reel, YouTube, Static Post)
DO $$
DECLARE
  b RECORD;
BEGIN
  FOR b IN SELECT id FROM clients WHERE client_type = 'internal' LOOP
    INSERT INTO client_deliverables (client_id, content_type, monthly_target)
    VALUES 
      (b.id, 'Reel', 15),
      (b.id, 'YouTube', 4),
      (b.id, 'Static Post', 20)
    ON CONFLICT DO NOTHING;
  END LOOP;
END $$;

-- 6. Auto-assign internal brands to video editors (Suyog, Rohan, Kedar)
DO $$
DECLARE
  suyog_id UUID;
  rohan_id UUID;
  kedar_id UUID;
  brand RECORD;
  ext_client RECORD;
BEGIN
  SELECT id INTO suyog_id FROM profiles WHERE full_name ILIKE '%suyog%' OR email ILIKE '%suyog%' LIMIT 1;
  SELECT id INTO rohan_id FROM profiles WHERE full_name ILIKE '%rohan%' OR email ILIKE '%rohan%' LIMIT 1;
  SELECT id INTO kedar_id FROM profiles WHERE full_name ILIKE '%kedar%' OR email ILIKE '%kedar%' LIMIT 1;

  -- Assign all internal brands to Suyog
  IF suyog_id IS NOT NULL THEN
    FOR brand IN SELECT id FROM clients WHERE client_type = 'internal' LOOP
      INSERT INTO employee_client_assignments (employee_id, client_id)
      VALUES (suyog_id, brand.id)
      ON CONFLICT (employee_id, client_id) DO NOTHING;
    END LOOP;
  END IF;

  -- Assign all internal brands to Rohan
  IF rohan_id IS NOT NULL THEN
    FOR brand IN SELECT id FROM clients WHERE client_type = 'internal' LOOP
      INSERT INTO employee_client_assignments (employee_id, client_id)
      VALUES (rohan_id, brand.id)
      ON CONFLICT (employee_id, client_id) DO NOTHING;
    END LOOP;
  END IF;

  -- Assign all internal and external brands to Kedar
  IF kedar_id IS NOT NULL THEN
    FOR brand IN SELECT id FROM clients LOOP
      INSERT INTO employee_client_assignments (employee_id, client_id)
      VALUES (kedar_id, brand.id)
      ON CONFLICT (employee_id, client_id) DO NOTHING;
    END LOOP;
  END IF;
END $$;
