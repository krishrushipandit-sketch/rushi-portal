-- Fresh daily reporting table (simple, free-form like Google Sheets)
-- Run this in Supabase SQL Editor

DROP TABLE IF EXISTS public.daily_reports CASCADE;

CREATE TABLE public.daily_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  report_date DATE NOT NULL,
  -- entries: array of what employee did. [{description: "Edited 3 reels", count: 3}]
  entries JSONB NOT NULL DEFAULT '[]',
  note TEXT DEFAULT '',
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by_admin BOOLEAN DEFAULT FALSE,
  UNIQUE(employee_id, report_date)
);

ALTER TABLE public.daily_reports ENABLE ROW LEVEL SECURITY;

-- Employee: can insert/update only TODAY's own report (not previous days)
CREATE POLICY "employee_insert_today" ON public.daily_reports
  FOR INSERT WITH CHECK (
    auth.uid() = employee_id AND
    report_date = CURRENT_DATE
  );

CREATE POLICY "employee_update_today" ON public.daily_reports
  FOR UPDATE USING (
    auth.uid() = employee_id AND
    report_date = CURRENT_DATE
  );

CREATE POLICY "employee_select_own" ON public.daily_reports
  FOR SELECT USING (auth.uid() = employee_id);

-- Admin: can do everything
CREATE POLICY "admin_all" ON public.daily_reports
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

SELECT 'Daily reports table created!' AS status;
