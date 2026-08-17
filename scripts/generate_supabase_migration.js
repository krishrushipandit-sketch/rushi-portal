const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

const SUPABASE_URL = 'https://musdztcockuvjiaqymva.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11c2R6dGNvY2t1dmppYXF5bXZhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Nzk1OTkxNiwiZXhwIjoyMDkzNTM1OTE2fQ.UxSg_vy514JhlxCNpmNVlCHVV1mrDxvhNs-vuBo-1oU'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

function escapeSql(str) {
  if (str === null || str === undefined) return 'NULL'
  return "'" + String(str).replace(/'/g, "''") + "'"
}

function escapeJson(obj) {
  if (obj === null || obj === undefined) return 'NULL'
  return "'" + JSON.stringify(obj).replace(/'/g, "''") + "'::jsonb"
}

async function exportAll() {
  console.log('Fetching all tables from Supabase...')
  const sqlLines = []
  sqlLines.push('-- ============================================================')
  sqlLines.push('-- Supabase Data Import Migration')
  sqlLines.push('-- ============================================================\n')

  // 1. Profiles (Update avatars, phone, bios)
  const { data: profiles } = await supabase.from('profiles').select('*')
  if (profiles && profiles.length > 0) {
    console.log(`Exporting ${profiles.length} profiles...`)
    sqlLines.push('-- 1. Profiles')
    for (const p of profiles) {
      sqlLines.push(`
INSERT INTO profiles (id, email, full_name, role, department, designation, phone, whatsapp_number, avatar_url, bio, is_active, password_hash)
VALUES (
  ${escapeSql(p.id)},
  ${escapeSql(p.email)},
  ${escapeSql(p.full_name)},
  ${escapeSql(p.role || 'employee')},
  ${escapeSql(p.department)},
  ${escapeSql(p.designation)},
  ${escapeSql(p.phone)},
  ${escapeSql(p.whatsapp_number)},
  ${escapeSql(p.avatar_url)},
  ${escapeSql(p.bio)},
  ${p.is_active !== false},
  ${escapeSql(p.password_hash || '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRzi.guEGQ6b2YJgWq7sKkJpPjDWe')}
)
ON CONFLICT (id) DO UPDATE SET
  avatar_url = EXCLUDED.avatar_url,
  phone = COALESCE(EXCLUDED.phone, profiles.phone),
  whatsapp_number = COALESCE(EXCLUDED.whatsapp_number, profiles.whatsapp_number),
  department = COALESCE(EXCLUDED.department, profiles.department),
  designation = COALESCE(EXCLUDED.designation, profiles.designation),
  bio = COALESCE(EXCLUDED.bio, profiles.bio);
`)
      // Also update by email in case UUIDs differ
      if (p.avatar_url) {
        sqlLines.push(`UPDATE profiles SET avatar_url = ${escapeSql(p.avatar_url)} WHERE LOWER(email) = LOWER(${escapeSql(p.email)}) AND (avatar_url IS NULL OR avatar_url = '');`)
      }
    }
  }

  // 2. Employee Responsibilities
  const { data: resps } = await supabase.from('employee_responsibilities').select('*')
  if (resps && resps.length > 0) {
    console.log(`Exporting ${resps.length} employee responsibilities...`)
    sqlLines.push('\n-- 2. Employee Responsibilities')
    for (const r of resps) {
      sqlLines.push(`
INSERT INTO employee_responsibilities (id, employee_id, title, description, daily_target, target_type, is_active)
VALUES (
  ${escapeSql(r.id)},
  ${escapeSql(r.employee_id)},
  ${escapeSql(r.title)},
  ${escapeSql(r.description)},
  ${r.daily_target || 0},
  ${escapeSql(r.target_type || 'daily')},
  ${r.is_active !== false}
)
ON CONFLICT (id) DO NOTHING;
`)
    }
  }

  // 3. Daily Reports (499 reports)
  const { data: reports } = await supabase.from('daily_reports').select('*')
  if (reports && reports.length > 0) {
    console.log(`Exporting ${reports.length} daily reports...`)
    sqlLines.push('\n-- 3. Daily Reports')
    for (const r of reports) {
      sqlLines.push(`
INSERT INTO daily_reports (id, employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
VALUES (
  ${escapeSql(r.id)},
  ${escapeSql(r.employee_id)},
  ${escapeSql(r.report_date)},
  ${escapeJson(r.entries)},
  ${escapeSql(r.note || '')},
  ${escapeSql(r.submitted_at || new Date().toISOString())},
  ${escapeSql(r.updated_at || new Date().toISOString())},
  ${r.updated_by_admin || false},
  ${escapeSql(r.check_in_time)},
  ${escapeSql(r.check_out_time)},
  ${escapeSql(r.admin_comment)}
)
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;
`)
    }
  }

  // 4. Employee Attendance
  const { data: att } = await supabase.from('employee_attendance').select('*')
  if (att && att.length > 0) {
    console.log(`Exporting ${att.length} employee attendance records...`)
    sqlLines.push('\n-- 4. Employee Attendance')
    for (const a of att) {
      sqlLines.push(`
INSERT INTO employee_attendance (id, employee_id, date, check_in, check_out, status, notes)
VALUES (
  ${escapeSql(a.id)},
  ${escapeSql(a.employee_id)},
  ${escapeSql(a.date)},
  ${escapeSql(a.check_in)},
  ${escapeSql(a.check_out)},
  ${escapeSql(a.status || 'present')},
  ${escapeSql(a.notes)}
)
ON CONFLICT (employee_id, date) DO NOTHING;
`)
    }
  }

  // Write to file
  const outPath = path.join(__dirname, '..', 'IMPORT-SUPABASE-REPORTS-PHOTOS.sql')
  fs.writeFileSync(outPath, sqlLines.join('\n'), 'utf8')
  console.log(`\n✅ Generated ${outPath} (${sqlLines.length} SQL lines)`)
}

exportAll()
