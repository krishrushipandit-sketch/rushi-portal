DROP TABLE IF EXISTS employee_attendance;

CREATE TABLE employee_attendance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('present', 'wfh', 'leave', 'leave_pending', 'sandwich_leave', 'half_day')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(employee_id, date)
);

ALTER TABLE employee_attendance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own attendance"
  ON employee_attendance FOR INSERT
  WITH CHECK (auth.uid() = employee_id);

CREATE POLICY "Users can update their own attendance"
  ON employee_attendance FOR UPDATE
  USING (auth.uid() = employee_id);

CREATE POLICY "Users can view their own attendance"
  ON employee_attendance FOR SELECT
  USING (auth.uid() = employee_id);

CREATE POLICY "Admins can do everything on attendance"
  ON employee_attendance FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );
