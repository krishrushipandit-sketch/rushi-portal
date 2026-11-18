-- "Visit Done" lead status: timestamp of when a lead was marked visited, used for monthly visit counts.
-- The app also adds this column automatically on first use; running this adds the index too.
ALTER TABLE leads ADD COLUMN IF NOT EXISTS visit_done_at TIMESTAMPTZ;
CREATE INDEX IF NOT EXISTS leads_visit_done_at_idx ON leads (assigned_to, visit_done_at) WHERE visit_done_at IS NOT NULL;
