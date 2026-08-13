import { NextResponse } from 'next/server'
import { queryOne, execute } from '@/lib/db'

export async function GET() {
  try {
    // 1. Get Kedar's ID
    const kedar = await queryOne<{ id: string; full_name: string }>(
      'SELECT id, full_name FROM profiles WHERE full_name ILIKE $1 LIMIT 1',
      ['%kedar%']
    )

    if (!kedar) {
      return NextResponse.json({ error: 'Kedar not found' })
    }

    const kedarId = kedar.id

    // 2. Delete existing responsibilities
    await execute(
      'DELETE FROM employee_responsibilities WHERE employee_id = $1',
      [kedarId]
    )

    // 3. Insert new responsibilities
    const newResps = [
      { title: 'CA Suyash Sir (No. of Reels)', sort_order: 1 },
      { title: 'Advisor Alpha (No. of Reels)', sort_order: 2 },
      { title: 'Amicus Claims (No. of Reels)', sort_order: 3 },
      { title: 'MBC (No. of Reels)', sort_order: 4 },
      { title: 'Karrier (No. of Reels)', sort_order: 5 },
      { title: 'Shubhash Shrivastav (No. of Reels)', sort_order: 6 },
      { title: 'Client Management', sort_order: 7 },
    ]

    for (const r of newResps) {
      await execute(
        'INSERT INTO employee_responsibilities (employee_id, title, sort_order) VALUES ($1, $2, $3)',
        [kedarId, r.title, r.sort_order]
      )
    }

    return NextResponse.json({ success: true, message: 'Kedar reporting structure updated successfully!' })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
