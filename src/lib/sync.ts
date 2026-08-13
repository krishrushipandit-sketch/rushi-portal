import { createClient } from '@supabase/supabase-js'

const db = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function syncDailyReportToClients(
  employee_id: string,
  report_date: string,
  entries: { description: string; count: number; notes?: string }[]
) {
  if (!entries || entries.length === 0) return

  const { data: clients, error } = await db()
    .from('clients')
    .select('id, name, slug, deliverables:client_deliverables(id, content_type)')
    .eq('is_active', true)

  if (error || !clients || clients.length === 0) return

  const clientKeywords: Record<string, string[]> = {
    'ca':            ['ca sir', 'ca '],
    'advisor-alpha': ['alpha', 'advisor', 'alphadriver'],
    'mbc':           ['mbc'],
    'amicusclaims':  ['amicus'],
  }
  const typeKeywords: Record<string, string[]> = {
    'Reel':        ['reel'],
    'YouTube':     ['youtube', 'yt'],
    'Static Post': ['static', 'post'],
  }

  function extractCountForClient(text: string, keywords: string[], fallback: number): number {
    for (const kw of keywords) {
      const k = kw.trim()
      const m1 = text.match(new RegExp('(\\d+)\\s*(?:\\w+\\s*)?(?:for\\s+|of\\s+)?' + k, 'i'))
      if (m1) return parseInt(m1[1])
      const m2 = text.match(new RegExp(k + '\\s*(?:sir|client|clients)?\\s*[-:]?\\s*(\\d+)', 'i'))
      if (m2) return parseInt(m2[1])
    }
    return fallback
  }

  for (const entry of entries) {
    if (!entry.count || entry.count <= 0) continue
    const searchText = `${entry.description || ''} ${entry.notes || ''}`.toLowerCase()
    const matchedClients = (clients as any[]).filter(c => {
      const kws = clientKeywords[c.slug] || [c.name.toLowerCase()]
      return kws.some((kw: string) => searchText.includes(kw.toLowerCase()))
    })
    if (matchedClients.length === 0) continue

    for (const mc of matchedClients) {
      const deliverables = mc.deliverables || []
      const matchedDel = deliverables.find((d: any) => {
        const kws = typeKeywords[d.content_type] || [d.content_type.toLowerCase()]
        return kws.some((kw: string) => searchText.includes(kw))
      })
      if (!matchedDel) continue

      const kws = clientKeywords[mc.slug] || [mc.name.toLowerCase()]
      const clientCount = matchedClients.length === 1 ? entry.count : extractCountForClient(searchText, kws, entry.count)

      await db()
        .from('client_progress_log')
        .delete()
        .eq('employee_id', employee_id)
        .eq('deliverable_id', matchedDel.id)
        .eq('log_date', report_date)

      await db().from('client_progress_log').insert({
        client_id: mc.id, deliverable_id: matchedDel.id, employee_id, log_date: report_date,
        count: clientCount, notes: entry.notes || null
      })
    }
  }
}
