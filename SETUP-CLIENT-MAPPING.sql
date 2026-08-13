-- ══════════════════════════════════════════════════════════════
-- RESPONSIBILITY → CLIENT MAPPING — Safe to re-run
-- Run this AFTER SETUP-CLIENTS.sql
-- ══════════════════════════════════════════════════════════════

-- Add client mapping columns to employee_responsibilities
ALTER TABLE employee_responsibilities
  ADD COLUMN IF NOT EXISTS client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS deliverable_id UUID REFERENCES client_deliverables(id) ON DELETE SET NULL;

-- ──────────────────────────────────────────────────────────────
-- SEED: Link Kedar's daily report responsibilities to clients
-- This works by matching the responsibility title to the client.
-- Adjust the responsibility title to exactly match what Kedar
-- has set up in his employee profile responsibilities.
-- ──────────────────────────────────────────────────────────────

-- Helper function: update by matching responsibility title
-- (Only updates rows that belong to Kedar's profile — matched by designation)

DO $$
DECLARE
  ca_id         UUID;
  alpha_id      UUID;
  mbc_id        UUID;
  amicus_id     UUID;
  ca_reel_id    UUID;
  alpha_reel_id UUID;
  mbc_reel_id   UUID;
  ami_reel_id   UUID;
  ami_yt_id     UUID;
  ami_static_id UUID;
BEGIN
  -- Get client IDs
  SELECT id INTO ca_id         FROM clients WHERE slug = 'ca';
  SELECT id INTO alpha_id      FROM clients WHERE slug = 'advisor-alpha';
  SELECT id INTO mbc_id        FROM clients WHERE slug = 'mbc';
  SELECT id INTO amicus_id     FROM clients WHERE slug = 'amicusclaims';

  -- Get deliverable IDs
  SELECT id INTO ca_reel_id    FROM client_deliverables WHERE client_id = ca_id AND content_type = 'Reel';
  SELECT id INTO alpha_reel_id FROM client_deliverables WHERE client_id = alpha_id AND content_type = 'Reel';
  SELECT id INTO mbc_reel_id   FROM client_deliverables WHERE client_id = mbc_id AND content_type = 'Reel';
  SELECT id INTO ami_reel_id   FROM client_deliverables WHERE client_id = amicus_id AND content_type = 'Reel';
  SELECT id INTO ami_yt_id     FROM client_deliverables WHERE client_id = amicus_id AND content_type = 'YouTube';
  SELECT id INTO ami_static_id FROM client_deliverables WHERE client_id = amicus_id AND content_type = 'Static Post';

  -- Map responsibilities to clients by matching title keywords (case-insensitive)
  -- CA Reels
  UPDATE employee_responsibilities
    SET client_id = ca_id, deliverable_id = ca_reel_id
    WHERE (title ILIKE '%CA%reel%' OR title ILIKE '%CA%edit%')
      AND client_id IS NULL;

  -- Advisor Alpha / AlphaDriver Reels
  UPDATE employee_responsibilities
    SET client_id = alpha_id, deliverable_id = alpha_reel_id
    WHERE (title ILIKE '%alpha%reel%' OR title ILIKE '%advisor%reel%' OR title ILIKE '%alphadriver%')
      AND client_id IS NULL;

  -- MBC Reels
  UPDATE employee_responsibilities
    SET client_id = mbc_id, deliverable_id = mbc_reel_id
    WHERE (title ILIKE '%MBC%reel%' OR title ILIKE '%MBC%edit%')
      AND client_id IS NULL;

  -- AmicusClaims Reels
  UPDATE employee_responsibilities
    SET client_id = amicus_id, deliverable_id = ami_reel_id
    WHERE (title ILIKE '%amicus%reel%' OR title ILIKE '%amicus%edit%')
      AND client_id IS NULL;

  -- AmicusClaims YouTube
  UPDATE employee_responsibilities
    SET client_id = amicus_id, deliverable_id = ami_yt_id
    WHERE (title ILIKE '%amicus%youtube%' OR title ILIKE '%amicus%yt%')
      AND client_id IS NULL;

  -- AmicusClaims Static Posts
  UPDATE employee_responsibilities
    SET client_id = amicus_id, deliverable_id = ami_static_id
    WHERE (title ILIKE '%amicus%static%' OR title ILIKE '%amicus%post%')
      AND client_id IS NULL;

  RAISE NOTICE 'Responsibility → client mapping complete';
END $$;

-- Verify mappings
SELECT
  er.title,
  c.name AS client,
  cd.content_type AS deliverable
FROM employee_responsibilities er
LEFT JOIN clients c ON er.client_id = c.id
LEFT JOIN client_deliverables cd ON er.deliverable_id = cd.id
WHERE er.client_id IS NOT NULL;

SELECT 'Responsibility-client mapping done ✅' AS result;
