import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const supabase = supabaseAdmin()

    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: skills, error } = await supabase
      .from('sales_industry_skills')
      .select('*')

    if (error) throw error
    return NextResponse.json(skills || [])
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const supabase = supabaseAdmin()

    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Admin authorization check
    const { data: profile } = await supabase
      .from('profiles').select('role').eq('id', user.id).single()

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden. Admin access required.' }, { status: 403 })
    }

    const body = await req.json()
    const { user_id, industries } = body // e.g. industries: ['Digital Marketing', 'Share Market']

    if (!user_id || !Array.isArray(industries)) {
      return NextResponse.json({ error: 'user_id and industries array are required' }, { status: 400 })
    }

    // Delete existing skills for user
    await supabase.from('sales_industry_skills').delete().eq('user_id', user_id)

    // Insert new skills
    if (industries.length > 0) {
      const inserts = industries.map((ind: string) => ({
        user_id,
        industry: ind,
        is_active: true
      }))

      const { error: insertErr } = await supabase
        .from('sales_industry_skills')
        .insert(inserts)

      if (insertErr) throw insertErr
    }

    return NextResponse.json({ success: true, user_id, count: industries.length })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
