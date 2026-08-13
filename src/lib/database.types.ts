export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

// ── Profile ──────────────────────────────────────────────────────────────────
export interface ProfileRow {
  id: string
  full_name: string
  email: string
  phone: string | null
  role: 'admin' | 'employee'
  department: string | null
  designation: string | null
  avatar_url: string | null
  is_active: boolean
  whatsapp_number: string | null
  created_at: string
  updated_at: string
}
export interface ProfileInsert {
  id?: string
  full_name: string
  email: string
  phone?: string | null
  role: 'admin' | 'employee'
  department?: string | null
  designation?: string | null
  avatar_url?: string | null
  is_active?: boolean
  whatsapp_number?: string | null
}
export type ProfileUpdate = Partial<ProfileRow>

// ── Task ─────────────────────────────────────────────────────────────────────
export interface TaskRow {
  id: string
  title: string
  description: string | null
  assigned_to: string | null
  assigned_by: string | null
  task_type: 'assigned' | 'regular'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'pending' | 'in_progress' | 'completed' | 'overdue' | 'cancelled'
  deadline: string | null
  completed_at: string | null
  reminder_sent: boolean
  notes: string | null
  created_at: string
  updated_at: string
}
export type TaskInsert = Partial<TaskRow> & { title: string }
type _TaskUpdate = Partial<TaskRow>

// ── Task Update ──────────────────────────────────────────────────────────────
export interface TaskUpdateRow {
  id: string
  task_id: string
  updated_by: string | null
  comment: string
  progress_percent: number
  created_at: string
}
export type TaskUpdateInsert = Omit<TaskUpdateRow, 'id' | 'created_at'>

// ── Lead ─────────────────────────────────────────────────────────────────────
export interface LeadRow {
  id: string
  client_name: string
  phone: string
  email: string | null
  category: string
  industry?: string | null
  platform?: string | null
  status: 'new' | 'ringing' | 'not_connected' | 'switched_off' | 'not_logical' | 'busy_callback' | 'interested' | 'visit_scheduled' | 'closed_won' | 'closed_lost'
  source: string | null
  assigned_to: string | null
  notes: string | null
  follow_up_date: string | null
  qualification_answers?: Record<string, any> | null
  followup_count?: number
  last_followup_at?: string | null
  next_followup_at?: string | null
  whatsapp_visit_msg_sent?: boolean
  whatsapp_msg_status?: string | null
  created_at: string
  updated_at: string
}
export type LeadInsert = Partial<LeadRow> & { client_name: string; phone: string }
export type LeadUpdate = Partial<LeadRow>

// ── Lead Followups ────────────────────────────────────────────────────────────
export interface LeadFollowupRow {
  id: string
  lead_id: string
  sales_rep_id: string | null
  followup_number: number
  call_status: string
  notes: string | null
  scheduled_at: string | null
  completed_at: string
  created_at: string
}
export type LeadFollowupInsert = Omit<LeadFollowupRow, 'id' | 'created_at'>

// ── Sales Industry Skills ────────────────────────────────────────────────────
export interface SalesIndustrySkillRow {
  id: string
  user_id: string
  industry: string
  is_active: boolean
  created_at: string
}

// ── Notification ─────────────────────────────────────────────────────────────
export interface NotificationRow {
  id: string
  user_id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'success' | 'reminder' | 'alert'
  is_read: boolean
  task_id: string | null
  created_at: string
}
export type NotificationInsert = Omit<NotificationRow, 'id' | 'created_at'>

// ── Database (for Supabase typed client) ─────────────────────────────────────
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: ProfileRow
        Insert: ProfileInsert
        Update: ProfileUpdate
      }
      tasks: {
        Row: TaskRow
        Insert: TaskInsert
        Update: _TaskUpdate
      }
      task_updates: {
        Row: TaskUpdateRow
        Insert: TaskUpdateInsert
        Update: Partial<TaskUpdateInsert>
      }
      leads: {
        Row: LeadRow
        Insert: LeadInsert
        Update: LeadUpdate
      }
      lead_followups: {
        Row: LeadFollowupRow
        Insert: LeadFollowupInsert
        Update: Partial<LeadFollowupInsert>
      }
      sales_industry_skills: {
        Row: SalesIndustrySkillRow
        Insert: Omit<SalesIndustrySkillRow, 'id' | 'created_at'>
        Update: Partial<SalesIndustrySkillRow>
      }
      notifications: {
        Row: NotificationRow
        Insert: NotificationInsert
        Update: Partial<NotificationInsert>
      }
    }
  }
}

// Convenience type aliases
export type Profile = ProfileRow
export type Task = TaskRow
export type TaskUpdate = TaskUpdateRow
export type Lead = LeadRow
export type LeadFollowup = LeadFollowupRow
export type SalesIndustrySkill = SalesIndustrySkillRow
export type Notification = NotificationRow
