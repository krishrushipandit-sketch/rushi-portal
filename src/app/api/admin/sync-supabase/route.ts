import { NextRequest, NextResponse } from 'next/server'
import { query, execute } from '@/lib/db'
import { getUserFromRequest } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://musdztcockuvjiaqymva.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11c2R6dGNvY2t1dmppYXF5bXZhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Nzk1OTkxNiwiZXhwIjoyMDkzNTM1OTE2fQ.UxSg_vy514JhlxCNpmNVlCHVV1mrDxvhNs-vuBo-1oU'

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req)
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

    // 1. Sync Profiles & Avatar URLs
    const { data: profiles } = await supabase.from('profiles').select('*')
    let profileCount = 0
    if (profiles && profiles.length > 0) {
      for (const p of profiles) {
        if (p.avatar_url) {
          await execute(
            `UPDATE profiles SET avatar_url = $1 WHERE LOWER(email) = LOWER($2) OR id = $3`,
            [p.avatar_url, p.email, p.id]
          )
          profileCount++
        }
      }
    }

    // 2. Sync Responsibilities
    const { data: resps } = await supabase.from('employee_responsibilities').select('*')
    let respCount = 0
    if (resps && resps.length > 0) {
      for (const r of resps) {
        await execute(
          `INSERT INTO employee_responsibilities (id, employee_id, title, description, daily_target, target_type, is_active)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           ON CONFLICT (id) DO NOTHING`,
          [r.id, r.employee_id, r.title, r.description, r.daily_target || 0, r.target_type || 'daily', r.is_active !== false]
        )
        respCount++
      }
    }

    // 3. Sync Daily Reports (499 reports)
    const { data: reports } = await supabase.from('daily_reports').select('*')
    let reportCount = 0
    if (reports && reports.length > 0) {
      for (const r of reports) {
        await execute(
          `INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
           ON CONFLICT (employee_id, report_date) DO UPDATE SET
             entries = EXCLUDED.entries,
             note = EXCLUDED.note,
             updated_at = EXCLUDED.updated_at`,
          [
            r.id, r.employee_id, r.report_date, JSON.stringify(r.entries), r.note || '',
            r.submitted_at || new Date().toISOString(), r.updated_at || new Date().toISOString(),
            r.updated_by_admin || false, r.check_in_time, r.check_out_time, r.admin_comment
          ]
        )
        reportCount++
      }
    }

    // 4. Sync Employee Attendance
    const { data: att } = await supabase.from('employee_attendance').select('*')
    let attCount = 0
    if (att && att.length > 0) {
      for (const a of att) {
        await execute(
          `INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           ON CONFLICT (employee_id, date) DO NOTHING`,
          [a.id, a.employee_id, a.date, a.check_in, a.check_out, a.status || 'present', a.notes]
        )
        attCount++
      }
    }

    return NextResponse.json({
      success: true,
      synced: {
        profiles: profileCount,
        responsibilities: respCount,
        reports: reportCount,
        attendance: attCount
      }
    })
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
