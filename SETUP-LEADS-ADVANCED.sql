-- ============================================================
-- RushiPandit Staff Portal — Advanced Leads & Nurturing System
-- Run this in your Supabase SQL Editor or Hostinger PostgreSQL
-- ============================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. SALES INDUSTRY SKILLS TABLE (For Industry Round-Robin)
CREATE TABLE IF NOT EXISTS public.sales_industry_skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  industry TEXT NOT NULL, -- e.g. 'Digital Marketing', 'Share Market', 'AI Course', etc.
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, industry)
);

-- 2. ROUND-ROBIN TRACKING STATE
CREATE TABLE IF NOT EXISTS public.industry_round_robin_state (
  industry TEXT PRIMARY KEY,
  last_assigned_index INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. EXTEND LEADS TABLE
ALTER TABLE public.leads 
  ADD COLUMN IF NOT EXISTS platform TEXT DEFAULT 'Facebook',
  ADD COLUMN IF NOT EXISTS industry TEXT DEFAULT 'Digital Marketing',
  ADD COLUMN IF NOT EXISTS qualification_answers JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS followup_count INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_followup_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS next_followup_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS whatsapp_visit_msg_sent BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS whatsapp_msg_status TEXT;

-- Update lead status check constraint if possible
DO $$ 
BEGIN
  ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS leads_status_check;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- 4. LEAD FOLLOW-UPS TIMELINE TABLE
CREATE TABLE IF NOT EXISTS public.lead_followups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  sales_rep_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  followup_number INTEGER NOT NULL DEFAULT 1, -- 1 = Follow up 1, 2 = Follow up 2, etc.
  call_status TEXT NOT NULL, -- 'ringing', 'not_connected', 'switched_off', 'not_logical', 'busy_callback', 'interested', 'visit_scheduled', 'closed_won', 'closed_lost'
  notes TEXT,
  scheduled_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast queries
CREATE INDEX IF NOT EXISTS idx_leads_assigned_to ON public.leads(assigned_to);
CREATE INDEX IF NOT EXISTS idx_leads_industry ON public.leads(industry);
CREATE INDEX IF NOT EXISTS idx_lead_followups_lead_id ON public.lead_followups(lead_id);
CREATE INDEX IF NOT EXISTS idx_sales_industry_skills_user ON public.sales_industry_skills(user_id);

-- RLS POLICIES
ALTER TABLE public.sales_industry_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.industry_round_robin_state ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_followups ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to view skills & followups
CREATE POLICY "Allow view sales_industry_skills" ON public.sales_industry_skills FOR SELECT USING (true);
CREATE POLICY "Allow admin manage sales_industry_skills" ON public.sales_industry_skills FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Allow service role round_robin_state" ON public.industry_round_robin_state FOR ALL USING (true);

CREATE POLICY "Allow view lead_followups" ON public.lead_followups FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.leads WHERE id = lead_id AND (assigned_to = auth.uid() OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')))
);

CREATE POLICY "Allow insert lead_followups" ON public.lead_followups FOR INSERT WITH CHECK (true);
