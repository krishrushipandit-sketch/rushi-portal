-- Add AI analysis columns to daily_reports
-- Run this in Supabase SQL Editor

ALTER TABLE public.daily_reports
  ADD COLUMN IF NOT EXISTS ai_summary TEXT,
  ADD COLUMN IF NOT EXISTS ai_productivity_score INTEGER CHECK (ai_productivity_score BETWEEN 0 AND 100),
  ADD COLUMN IF NOT EXISTS ai_sentiment TEXT CHECK (ai_sentiment IN ('excellent', 'good', 'average', 'struggling')),
  ADD COLUMN IF NOT EXISTS ai_key_points JSONB DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS ai_concerns TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS ai_improvement_tip TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS ai_analyzed_at TIMESTAMPTZ,
  -- Extracted quantitative metrics: [{task_title, quantity, unit, raw_note}]
  ADD COLUMN IF NOT EXISTS ai_metrics JSONB DEFAULT '[]';

SELECT 'AI columns added successfully' AS status;
