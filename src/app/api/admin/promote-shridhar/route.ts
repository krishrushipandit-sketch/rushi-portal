import { NextRequest, NextResponse } from 'next/server'
import { execute, queryOne } from '@/lib/db'

/**
 * GET or POST /api/admin/promote-shridhar
 * Promotes Shridhar to admin in the PostgreSQL profiles table.
 */
export async function GET(req: NextRequest) {
  return handlePromote()
}

export async function POST(req: NextRequest) {
  return handlePromote()
}

async function handlePromote() {
  try {
    // 1. Update Shridhar's role to admin
    await execute(
      `UPDATE profiles
       SET role = 'admin', designation = 'Administrator & Operations', department = 'Management'
       WHERE LOWER(email) = LOWER('shridhar@rushipandit.com') OR LOWER(full_name) ILIKE '%shridhar%'`
    )

    // 2. Fetch updated profile
    const updated = await queryOne(
      `SELECT id, email, full_name, role, department, designation
       FROM profiles
       WHERE LOWER(email) = LOWER('shridhar@rushipandit.com') OR LOWER(full_name) ILIKE '%shridhar%'`
    )

    return NextResponse.json({
      success: true,
      message: 'Shridhar has been promoted to Admin successfully!',
      profile: updated
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
