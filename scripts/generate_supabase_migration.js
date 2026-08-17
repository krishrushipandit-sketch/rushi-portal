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
  if (obj === null || obj === undefined) return "'[]'::jsonb"
  return "'" + JSON.stringify(obj).replace(/'/g, "''") + "'::jsonb"
}

async function exportAll() {
  console.log('Fetching all tables from Supabase...')
  const sqlLines = []
  sqlLines.push('-- ============================================================')
  sqlLines.push('-- Bulletproof Email-Mapped Supabase Data Import')
  sqlLines.push('-- ============================================================\n')

  // 1. Fetch Supabase profiles to build an ID-to-email map
  const { data: profiles } = await supabase.from('profiles').select('*')
  const idToEmail = {}
  if (profiles) {
    profiles.forEach(p => {
      idToEmail[p.id] = p.email
    })
  }

  // 1. Update Profiles with Avatars and Details by Email
  sqlLines.push('-- 1. Update Profiles with Avatars and Details')
  for (const p of (profiles || [])) {
    if (p.email) {
      sqlLines.push(`
UPDATE profiles 
SET avatar_url = COALESCE(${escapeSql(p.avatar_url)}, avatar_url),
    phone = COALESCE(${escapeSql(p.phone)}, phone),
    whatsapp_number = COALESCE(${escapeSql(p.whatsapp_number)}, whatsapp_number),
    department = COALESCE(${escapeSql(p.department)}, department),
    designation = COALESCE(${escapeSql(p.designation)}, designation),
    bio = COALESCE(${escapeSql(p.bio)}, bio)
WHERE LOWER(email) = LOWER(${escapeSql(p.email)});
`)
    }
  }

  // 2. Employee Responsibilities (mapped by employee email)
  const { data: resps } = await supabase.from('employee_responsibilities').select('*')
  if (resps && resps.length > 0) {
    console.log(`Exporting ${resps.length} employee responsibilities...`)
    sqlLines.push('\n-- 2. Employee Responsibilities')
    for (const r of resps) {
      const email = idToEmail[r.employee_id]
      if (email) {
        sqlLines.push(`
INSERT INTO employee_responsibilities (employee_id, title, description, daily_target, target_type, is_active)
SELECT p.id, ${escapeSql(r.title)}, ${escapeSql(r.description)}, ${r.daily_target || 0}, ${escapeSql(r.target_type || 'daily')}, ${r.is_active !== false}
FROM profiles p
WHERE LOWER(p.email) = LOWER(${escapeSql(email)})
ON CONFLICT DO NOTHING;
`)
      }
    }
  }

  // 3. Daily Reports (499 reports mapped by employee email)
  const { data: reports } = await supabase.from('daily_reports').select('*')
  if (reports && reports.length > 0) {
    console.log(`Exporting ${reports.length} daily reports mapped by email...`)
    sqlLines.push('\n-- 3. Daily Reports')
    for (const r of reports) {
      const email = idToEmail[r.employee_id]
      if (email) {
        sqlLines.push(`
INSERT INTO daily_reports (employee_id, report_date, entries, note, submitted_at, updated_at, updated_by_admin, check_in_time, check_out_time, admin_comment)
SELECT p.id, ${escapeSql(r.report_date)}, ${escapeJson(r.entries)}, ${escapeSql(r.note || '')}, ${escapeSql(r.submitted_at || new Date().toISOString())}, ${escapeSql(r.updated_at || new Date().toISOString())}, ${r.updated_by_admin || false}, ${escapeSql(r.check_in_time)}, ${escapeSql(r.check_out_time)}, ${escapeSql(r.admin_comment)}
FROM profiles p
WHERE LOWER(p.email) = LOWER(${escapeSql(email)})
ON CONFLICT (employee_id, report_date) DO UPDATE SET
  entries = EXCLUDED.entries,
  note = EXCLUDED.note,
  updated_at = EXCLUDED.updated_at;
`)
      }
    }
  }

  // 4. Employee Attendance (mapped by email)
  const { data: att } = await supabase.from('employee_attendance').select('*')
  if (att && att.length > 0) {
    console.log(`Exporting ${att.length} employee attendance records mapped by email...`)
    sqlLines.push('\n-- 4. Employee Attendance')
    for (const a of att) {
      const email = idToEmail[a.employee_id]
      if (email) {
        sqlLines.push(`
INSERT INTO employee_attendance (employee_id, date, check_in, check_out, status, notes)
SELECT p.id, ${escapeSql(a.date)}, ${escapeSql(a.check_in)}, ${escapeSql(a.check_out)}, ${escapeSql(a.status || 'present')}, ${escapeSql(a.notes)}
FROM profiles p
WHERE LOWER(p.email) = LOWER(${escapeSql(email)})
ON CONFLICT (employee_id, date) DO NOTHING;
`)
      }
    }
  }

  // Write to file
  const outPath = path.join(__dirname, '..', 'IMPORT-SUPABASE-REPORTS-PHOTOS.sql')
  fs.writeFileSync(outPath, sqlLines.join('\n'), 'utf8')
  console.log(`\n✅ Generated ${outPath} (${sqlLines.length} SQL lines) with 100% email-mapped matching!`)
}

exportAll()
