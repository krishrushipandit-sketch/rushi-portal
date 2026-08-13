-- ══════════════════════════════════════════════════════
-- TASK REMINDER LOG — tracks which reminders have been sent
-- Run in Supabase SQL Editor
-- ══════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS task_reminder_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reminder_type TEXT NOT NULL CHECK (reminder_type IN ('2d', '1d', '1h', 'overdue')),
  channel TEXT NOT NULL CHECK (channel IN ('in_app', 'whatsapp')),
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(task_id, recipient_id, reminder_type, channel)
);

-- If table already exists, update the check constraint to allow 'overdue'
DO $$
BEGIN
  ALTER TABLE task_reminder_log DROP CONSTRAINT IF EXISTS task_reminder_log_reminder_type_check;
  ALTER TABLE task_reminder_log ADD CONSTRAINT task_reminder_log_reminder_type_check
    CHECK (reminder_type IN ('2d', '1d', '1h', 'overdue'));
EXCEPTION WHEN others THEN NULL;
END $$;


ALTER TABLE task_reminder_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin can view reminder log" ON task_reminder_log;
CREATE POLICY "Admin can view reminder log" ON task_reminder_log
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Add phone column to profiles if missing
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS phone TEXT;

SELECT 'Task reminder log table ready ✅' AS result;
