import { NextRequest, NextResponse } from 'next/server'
import { queryOne, execute } from '@/lib/db'
import bcrypt from 'bcryptjs'

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
  const adminProfile = await queryOne<{ id: string }>(
    `SELECT id FROM profiles WHERE role = 'admin' LIMIT 1`
  )

  if (!adminProfile) {
    return NextResponse.json({ error: 'No admin profile found. Create admin first.' }, { status: 400 })
  }

  const adminId = adminProfile.id
  const results: { name: string; status: string; tasks: number }[] = []
  const errors: string[] = []

  for (const emp of EMPLOYEES) {
    try {
      // Check if user already exists
      const existing = await queryOne<{ id: string }>(
        `SELECT id FROM profiles WHERE LOWER(full_name) = LOWER($1)`,
        [emp.name]
      )

      let profileId: string

      if (existing) {
        profileId = existing.id
        results.push({ name: emp.name, status: 'already exists — tasks updated', tasks: 0 })
      } else {
        // Hash password and insert profile directly
        const passwordHash = await bcrypt.hash(DEFAULT_PASSWORD, 10)
        profileId = crypto.randomUUID()

        await execute(
          `INSERT INTO profiles (id, email, full_name, role, designation, department, phone, is_active, password_hash)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          [
            profileId,
            emp.email,
            emp.name,
            'employee',
            emp.designation,
            emp.department,
            emp.phone,
            true,
            passwordHash,
          ]
        )

        results.push({ name: emp.name, status: 'created', tasks: 0 })
      }

      // Delete old regular tasks for this employee (to avoid duplicates)
      await execute(
        `DELETE FROM tasks WHERE assigned_to = $1 AND task_type = $2`,
        [profileId, 'regular']
      )

      // Insert regular tasks
      let insertedCount = 0
      for (const title of emp.tasks) {
        await execute(
          `INSERT INTO tasks (title, description, assigned_to, assigned_by, task_type, priority, status)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [
            title,
            `Regular responsibility for ${emp.name}`,
            profileId,
            adminId,
            'regular',
            'medium',
            'in_progress',
          ]
        )
        insertedCount++
      }

      const r = results.find(r => r.name === emp.name)
      if (r) r.tasks = insertedCount
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
