const { createClient } = require('@supabase/supabase-js')

const SUPABASE_URL = 'https://musdztcockuvjiaqymva.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11c2R6dGNvY2t1dmppYXF5bXZhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Nzk1OTkxNiwiZXhwIjoyMDkzNTM1OTE2fQ.UxSg_vy514JhlxCNpmNVlCHVV1mrDxvhNs-vuBo-1oU'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function inspectSupabase() {
  console.log('Connecting to Supabase...')

  // 1. Fetch profiles
  const { data: profiles, error: pErr } = await supabase.from('profiles').select('*')
  if (pErr) console.error('Profiles error:', pErr)
  else {
    console.log(`\nFound ${profiles.length} profiles in Supabase:`)
    profiles.forEach(p => {
      console.log(`- ${p.full_name} (${p.email}) | Avatar: ${p.avatar_url ? p.avatar_url.slice(0, 40) + '...' : 'none'}`)
    })
  }

  // 2. Fetch daily reports
  const { data: reports, error: rErr } = await supabase.from('daily_reports').select('*')
  if (rErr) console.error('Reports error:', rErr)
  else {
    console.log(`\nFound ${reports.length} daily_reports in Supabase!`)
    if (reports.length > 0) {
      console.log('Sample report:', JSON.stringify(reports[0], null, 2))
    }
  }

  // 3. Fetch attendance
  const { data: attendance, error: aErr } = await supabase.from('attendance').select('*')
  if (aErr) console.error('Attendance error:', aErr)
  else {
    console.log(`\nFound ${attendance ? attendance.length : 0} attendance records in Supabase!`)
  }
}

inspectSupabase()
