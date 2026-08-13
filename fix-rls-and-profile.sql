-- ============================================================
-- FIX SCRIPT — Run this in Supabase SQL Editor
-- Fixes: RLS circular reference + missing admin profile
-- ============================================================

-- STEP 1: Drop the broken recursive admin RLS policies
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can insert profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can delete profiles" ON public.profiles;

-- STEP 2: Create a security-definer function to safely check admin role
-- This avoids the circular RLS issue
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = user_id AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- STEP 3: Re-create admin policies using the function
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert profiles" ON public.profiles
  FOR INSERT WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update profiles" ON public.profiles
  FOR UPDATE USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete profiles" ON public.profiles
  FOR DELETE USING (public.is_admin(auth.uid()));

-- Also fix task/lead/notification admin policies
DROP POLICY IF EXISTS "Admins can insert tasks" ON public.tasks;
DROP POLICY IF EXISTS "Admins can update tasks" ON public.tasks;
DROP POLICY IF EXISTS "Admins can delete tasks" ON public.tasks;
DROP POLICY IF EXISTS "Employees see their own tasks" ON public.tasks;
DROP POLICY IF EXISTS "Admins can delete leads" ON public.leads;
DROP POLICY IF EXISTS "Leads visibility" ON public.leads;
DROP POLICY IF EXISTS "Employees can update own leads" ON public.leads;

CREATE POLICY "Tasks visibility" ON public.tasks
  FOR SELECT USING (assigned_to = auth.uid() OR public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert tasks" ON public.tasks
  FOR INSERT WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update tasks" ON public.tasks
  FOR UPDATE USING (public.is_admin(auth.uid()));

CREATE POLICY "Employees can update own tasks" ON public.tasks
  FOR UPDATE USING (assigned_to = auth.uid());

CREATE POLICY "Admins can delete tasks" ON public.tasks
  FOR DELETE USING (public.is_admin(auth.uid()));

CREATE POLICY "Leads visibility" ON public.leads
  FOR SELECT USING (assigned_to = auth.uid() OR public.is_admin(auth.uid()));

CREATE POLICY "Employees can update own leads" ON public.leads
  FOR UPDATE USING (assigned_to = auth.uid() OR public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete leads" ON public.leads
  FOR DELETE USING (public.is_admin(auth.uid()));

-- ============================================================
-- STEP 4: Insert missing admin profile
-- Replace the email below with your actual admin email
-- ============================================================
INSERT INTO public.profiles (id, full_name, email, role)
SELECT
  id,
  COALESCE(raw_user_meta_data->>'full_name', split_part(email, '@', 1)),
  email,
  'admin'
FROM auth.users
WHERE email = 'rushipanditsubscriptions@gmail.com'  -- <-- CHANGE THIS to your admin email
ON CONFLICT (id) DO UPDATE SET role = 'admin';

-- Verify it worked:
SELECT id, full_name, email, role FROM public.profiles;
