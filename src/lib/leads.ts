import { execute } from './db'

let visitColumnReady: Promise<number> | null = null

export function ensureVisitDoneColumn(): Promise<number> {
  visitColumnReady ??= execute('ALTER TABLE leads ADD COLUMN IF NOT EXISTS visit_done_at TIMESTAMPTZ')
    .catch((err) => {
      visitColumnReady = null
      throw err
    })
  return visitColumnReady
}

// Used inside `UPDATE leads SET ...`: `status` on the right-hand side is the pre-update value,
// so the timestamp is stamped only on the transition into visit_done.
export function visitDoneAtAssignment(statusParam: string): string {
  return `visit_done_at = CASE WHEN ${statusParam} = 'visit_done' AND status IS DISTINCT FROM 'visit_done' THEN NOW() ELSE visit_done_at END`
}
