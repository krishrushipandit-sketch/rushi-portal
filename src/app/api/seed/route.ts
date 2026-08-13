import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const db = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// ============================================================
// Employee definitions — edit emails/designations as needed
// ============================================================
const EMPLOYEES = [
  {
    name: 'Poonam',
    email: 'poonam@rushipandit.com',
    designation: 'Sales Executive',
    department: 'Sales',         // ← LEADS access
    phone: '',
    tasks: [
      'Business Development (All Types)',
      'Recovery',
      'Batch Creation',
      'Amazon Product Research',
      'Water Bottle Sales',
      'DM Counselling',
      'Client Follow-ups',
      'Chasing',
    ],
  },
  {
    name: 'Pooja',
    email: 'pooja@rushipandit.com',
    designation: 'Operations Executive',
    department: 'Operations',
    phone: '',
    tasks: [
      'Posting',
      'Scripting',
      'Operations',
      'Tech Support',
      'Leads Distribution',
      'Comment Replies',
      'Client Management',
      'Website SEO',
      'LinkedIn Outreach',
      'Webinar Management + Flows',
      'Monitoring Ad Account',
      'Enrollment Calls',
      'Amazon Calls',
      'Student Assignment Checking',
      'Interview Preparation',
      'Team Reporting',
      'Book Distribution',
      'Payment Followups',
      'New Batches Creation',
      'Services Export R&D',
      'Landing Page Creation',
    ],
  },
  {
    name: 'Kedar',
    email: 'kedar@rushipandit.com',
    designation: 'Video Editor',
    department: 'Media',
    phone: '',
    tasks: [
      'Shooting',
      'Editing',
    ],
  },
  {
    name: 'Suyog',
    email: 'suyog@rushipandit.com',
    designation: 'Business Manager',
    department: 'Business',
    phone: '',
    tasks: [
      'Freelancer Management',
      'Business Development',
      'Client Query Resolving',
      'Client Follow-ups',
      'Amazon Listing',
      'Amazon Dispatch',
      'Inventory Management',
      'Team Reporting',
      'Team Training',
      'Payment Followups',
    ],
  },
  {
    name: 'Honey',
    email: 'honey@rushipandit.com',
    designation: 'Digital Marketing Executive',
    department: 'Marketing',
    phone: '',
    tasks: [
      'Services Export Data Collection',
      'Google Posting',
      'Scripting (AI)',
      'Placement Data Collections',
      'Internal Shooting',
      'Content Ideation (PanelTrollers + RP)',
      'Meta Ads',
      'Data Analysis (Webinars + Ads Performance)',
      'Digital Detox',
    ],
  },
  {
    name: 'Rohan',
    email: 'rohan@rushipandit.com',
    designation: 'Creative Designer',
    department: 'Design',
    phone: '',
    tasks: [
      'Shooting',
      'Certificate Creation',
      'Webinar Management',
      'Canva Design',
      'Posting',
    ],
  },
  {
    name: 'Swapnil',
    email: 'swapnil@rushipandit.com',
    designation: 'Operations Manager',
    department: 'Operations',
    phone: '',
    tasks: [
      'Morning Team Meeting',
      'Team Reporting',
      'Internal Management + Changes',
      'Share Market Trading',
      'SM Syllabus for Jagdish Patil',
      'Tanveer Webinar - Paid',
      'SM Online Course Selling',
      'SM YouTube Shooting',
      'SM Offline Batch',
      'SM Business Development',
      'SM Counselling',
      'Invoice Creations',
      'Salary Calculations',
      'Company Policies',
    ],
  },
]

const DEFAULT_PASSWORD = 'RushiPandit@2026'

export async function POST(req: NextRequest) {
  // Security: only allow if a secret header matches
  const secret = req.headers.get('x-seed-secret')
  if (secret !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Get admin ID
  const { data: adminProfile } = await db()
    .from('profiles')
    .select('id')
    .eq('role', 'admin')
    .single()

  if (!adminProfile) {
    return NextResponse.json({ error: 'No admin profile found. Create admin first.' }, { status: 400 })
  }

  const adminId = adminProfile.id
  const results: { name: string; status: string; tasks: number }[] = []
  const errors: string[] = []

  for (const emp of EMPLOYEES) {
    try {
      // Check if user already exists
      const { data: existing } = await db()
        .from('profiles')
        .select('id')
        .ilike('full_name', emp.name)
        .single()

      let profileId: string

      if (existing) {
        profileId = existing.id
        results.push({ name: emp.name, status: 'already exists — tasks updated', tasks: 0 })
      } else {
        // Create auth user
        const { data: authUser, error: authError } = await db().auth.admin.createUser({
          email: emp.email,
          password: DEFAULT_PASSWORD,
          email_confirm: true,
          user_metadata: { full_name: emp.name },
        })

        if (authError) {
          errors.push(`${emp.name}: ${authError.message}`)
          continue
        }

        profileId = authUser.user.id

        // Create profile
        await db().from('profiles').upsert({
          id: profileId,
          email: emp.email,
          full_name: emp.name,
          role: 'employee',
          designation: emp.designation,
          department: emp.department,
          phone: emp.phone,
          is_active: true,
        })

        results.push({ name: emp.name, status: 'created', tasks: 0 })
      }

      // Delete old regular tasks for this employee (to avoid duplicates)
      await db().from('tasks')
        .delete()
        .eq('assigned_to', profileId)
        .eq('task_type', 'regular')

      // Insert regular tasks
      const taskRows = emp.tasks.map(title => ({
        title,
        description: `Regular responsibility for ${emp.name}`,
        assigned_to: profileId,
        assigned_by: adminId,
        task_type: 'regular',
        priority: 'medium',
        status: 'in_progress',
      }))

      const { error: taskError } = await db().from('tasks').insert(taskRows)
      if (taskError) {
        errors.push(`${emp.name} tasks: ${taskError.message}`)
      } else {
        const r = results.find(r => r.name === emp.name)
        if (r) r.tasks = emp.tasks.length
      }
    } catch (e: any) {
      errors.push(`${emp.name}: ${e.message}`)
    }
  }

  return NextResponse.json({
    success: true,
    defaultPassword: DEFAULT_PASSWORD,
    results,
    errors: errors.length > 0 ? errors : undefined,
  })
}
