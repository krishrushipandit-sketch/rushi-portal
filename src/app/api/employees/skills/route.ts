import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne, execute } from '@/lib/db'
import { getUserFromRequest } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const skills = await query('SELECT * FROM sales_industry_skills')
    return NextResponse.json(skills || [])
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Admin authorization check
    const profile = await queryOne<{ role: string }>(
      'SELECT role FROM profiles WHERE id = $1',
      [user.userId]
    )

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden. Admin access required.' }, { status: 403 })
    }

    const body = await req.json()
    const { user_id, industries } = body // e.g. industries: ['Digital Marketing', 'Share Market']

    if (!user_id || !Array.isArray(industries)) {
      return NextResponse.json({ error: 'user_id and industries array are required' }, { status: 400 })
    }

    // Delete existing skills for user
    await execute('DELETE FROM sales_industry_skills WHERE user_id = $1', [user_id])

    // Insert new skills
    if (industries.length > 0) {
      for (const ind of industries) {
        await execute(
          `INSERT INTO sales_industry_skills (user_id, industry, is_active) VALUES ($1, $2, $3)`,
          [user_id, ind, true]
        )
      }
    }

    return NextResponse.json({ success: true, user_id, count: industries.length })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
