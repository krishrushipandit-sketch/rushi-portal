import { NextRequest, NextResponse } from 'next/server'
import { query, execute } from '@/lib/db'
import { getUserFromRequest } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const user = await getUserFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const employeeId = searchParams.get('employee_id') || user.userId

  try {
    // Ensure table exists
    await execute(`
      CREATE TABLE IF NOT EXISTS employee_client_assignments (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        employee_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
        client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(employee_id, client_id)
      )
    `)
    await execute("ALTER TABLE clients ADD COLUMN IF NOT EXISTS client_type VARCHAR(20) DEFAULT 'external'")

    // Fetch assigned client IDs for employee
    const rows = await query<{ client_id: string }>(
      `SELECT client_id FROM employee_client_assignments WHERE employee_id = $1`,
      [employeeId]
    )
    const assignedClientIds = rows.map(r => r.client_id)

    // Fetch all active clients/brands
    const allClients = await query<{ id: string; name: string; slug: string; color: string; client_type: string }>(
      `SELECT id, name, slug, color, COALESCE(client_type, 'external') as client_type 
       FROM clients 
       WHERE is_active = true AND (status IS NULL OR status != 'inactive')
       ORDER BY name ASC`
    )

    return NextResponse.json({
      employee_id: employeeId,
      assignments: assignedClientIds,
      allClients: allClients || []
    })
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const user = await getUserFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  if (user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const { employee_id, client_ids } = await req.json()
    if (!employee_id) {
      return NextResponse.json({ error: 'employee_id is required' }, { status: 400 })
    }

    // Ensure table exists
    await execute(`
      CREATE TABLE IF NOT EXISTS employee_client_assignments (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        employee_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
        client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(employee_id, client_id)
      )
    `)

    // Clear existing assignments for this employee
    await execute('DELETE FROM employee_client_assignments WHERE employee_id = $1', [employee_id])

    // Insert new assignments
    if (Array.isArray(client_ids) && client_ids.length > 0) {
      for (const clientId of client_ids) {
        if (clientId) {
          await execute(
            `INSERT INTO employee_client_assignments (employee_id, client_id) 
             VALUES ($1, $2) 
             ON CONFLICT (employee_id, client_id) DO NOTHING`,
            [employee_id, clientId]
          )
        }
      }
    }

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
