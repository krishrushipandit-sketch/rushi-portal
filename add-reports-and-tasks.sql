-- ============================================================
-- Daily Reports Table — Professional Format
-- ============================================================

DROP TABLE IF EXISTS public.daily_reports CASCADE;

CREATE TABLE public.daily_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  report_date DATE NOT NULL DEFAULT CURRENT_DATE,
  in_time TIME,
  out_time TIME,
  -- task_entries: [{ task_id, task_title, status: 'completed'|'in_progress'|'pending', notes, time_spent }]
  task_entries JSONB NOT NULL DEFAULT '[]',
  overall_note TEXT DEFAULT '',
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(employee_id, report_date)
);

ALTER TABLE public.daily_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employees see own reports" ON public.daily_reports
  FOR SELECT USING (employee_id = auth.uid());

CREATE POLICY "Admins see all reports" ON public.daily_reports
  FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Employees insert own reports" ON public.daily_reports
  FOR INSERT WITH CHECK (employee_id = auth.uid());

CREATE POLICY "Employees update own reports" ON public.daily_reports
  FOR UPDATE USING (employee_id = auth.uid());

CREATE OR REPLACE FUNCTION public.set_report_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER daily_reports_updated_at
  BEFORE UPDATE ON public.daily_reports
  FOR EACH ROW EXECUTE FUNCTION public.set_report_updated_at();

SELECT 'daily_reports table ready' AS status;
