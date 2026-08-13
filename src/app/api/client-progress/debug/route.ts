import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const db = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// GET /api/client-progress/debug
// Tests keyword matching on a sample description and checks DB state
export async function GET(req: NextRequest) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '')
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const testDesc = searchParams.get('desc') || 'CA Reel editing'

  try {
    // 1. Check clients exist
    const { data: clients, error: clientErr } = await db()
      .from('clients')
      .select('id, name, slug, deliverables:client_deliverables(id, content_type)')
      .eq('is_active', true)

    if (clientErr) {
      return NextResponse.json({
        error: 'clients table error — did you run SETUP-CLIENTS.sql?',
        details: clientErr.message
      }, { status: 500 })
    }

    // 2. Check client_progress_log exists
    const { error: logErr } = await db().from('client_progress_log').select('id').limit(1)

    // 3. Test keyword matching on the provided description
    const clientKeywords: Record<string, string[]> = {
      'ca':            ['ca ', ' ca', 'ca-', '-ca', 'ca_'],
      'advisor-alpha': ['alpha', 'advisor', 'alphadriver'],
      'mbc':           ['mbc'],
      'amicusclaims':  ['amicus'],
    }
    const typeKeywords: Record<string, string[]> = {
      'Reel':        ['reel'],
      'YouTube':     ['youtube', ' yt', 'yt ', 'y.t'],
      'Static Post': ['static', 'post'],
    }

    const desc = testDesc.toLowerCase()
    
    const matchedClient = (clients || []).find((c: any) => {
      const keywords = clientKeywords[c.slug] || [c.name.toLowerCase()]
      return keywords.some(kw => desc.includes(kw))
    })

    let matchedDeliverable = null
    if (matchedClient) {
      const deliverables = (matchedClient as any).deliverables || []
      matchedDeliverable = deliverables.find((d: any) => {
        const keywords = typeKeywords[d.content_type] || [d.content_type.toLowerCase()]
        return keywords.some((kw: string) => desc.includes(kw))
      })
    }

    // 4. Recent logs
    const { data: recentLogs } = await db()
      .from('client_progress_log')
      .select('employee_id, log_date, count, deliverable_id')
      .order('created_at', { ascending: false })
      .limit(5)

    return NextResponse.json({
      status: 'ok',
      clients_in_db: (clients || []).length,
      clients: (clients || []).map((c: any) => ({
        name: c.name,
        slug: c.slug,
        deliverables: c.deliverables?.map((d: any) => d.content_type)
      })),
      client_progress_log_accessible: !logErr,
      test_description: testDesc,
      matched_client: matchedClient ? (matchedClient as any).name : '❌ NO MATCH',
      matched_deliverable: matchedDeliverable ? (matchedDeliverable as any).content_type : '❌ NO MATCH',
      would_sync: !!matchedClient && !!matchedDeliverable,
      recent_logs: recentLogs || []
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
