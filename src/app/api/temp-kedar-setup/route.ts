import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const db = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  try {
    // 1. Get Kedar's ID
    const { data: profiles, error: pErr } = await db()
      .from('profiles')
      .select('id, full_name')
      .ilike('full_name', '%kedar%')
      .limit(1)

    if (pErr || !profiles || profiles.length === 0) {
      return NextResponse.json({ error: 'Kedar not found', details: pErr })
    }

    const kedarId = profiles[0].id

    // 2. Delete existing responsibilities
    const { error: dErr } = await db()
      .from('employee_responsibilities')
      .delete()
      .eq('employee_id', kedarId)

    if (dErr) {
      return NextResponse.json({ error: 'Failed to delete old responsibilities', details: dErr })
    }

    // 3. Insert new responsibilities
    const newResps = [
      { employee_id: kedarId, title: 'CA Suyash Sir (No. of Reels)', sort_order: 1 },
      { employee_id: kedarId, title: 'Advisor Alpha (No. of Reels)', sort_order: 2 },
      { employee_id: kedarId, title: 'Amicus Claims (No. of Reels)', sort_order: 3 },
      { employee_id: kedarId, title: 'MBC (No. of Reels)', sort_order: 4 },
      { employee_id: kedarId, title: 'Karrier (No. of Reels)', sort_order: 5 },
      { employee_id: kedarId, title: 'Shubhash Shrivastav (No. of Reels)', sort_order: 6 },
      { employee_id: kedarId, title: 'Client Management', sort_order: 7 },
    ]

    const { error: iErr } = await db()
      .from('employee_responsibilities')
      .insert(newResps)

    if (iErr) {
      return NextResponse.json({ error: 'Failed to insert new responsibilities', details: iErr })
    }

    return NextResponse.json({ success: true, message: 'Kedar reporting structure updated successfully!' })
  } catch (err: any) {
    return NextResponse.json({ error: err.message })
  }
}
