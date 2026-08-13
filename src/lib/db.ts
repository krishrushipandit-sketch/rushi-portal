import { Pool } from 'pg'

// Singleton pool — reused across hot-reloads in dev
const globalForPg = globalThis as unknown as { pgPool?: Pool }

export const pool = globalForPg.pgPool ?? new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
})

if (process.env.NODE_ENV !== 'production') {
  globalForPg.pgPool = pool
}

/** Run a query and return rows */
export async function query<T = Record<string, unknown>>(
  sql: string,
  params?: unknown[]
): Promise<T[]> {
  const client = await pool.connect()
  try {
    const result = await client.query(sql, params)
    return result.rows as T[]
  } finally {
    client.release()
  }
}

/** Run a query and return the first row or null */
export async function queryOne<T = Record<string, unknown>>(
  sql: string,
  params?: unknown[]
): Promise<T | null> {
  const rows = await query<T>(sql, params)
  return rows[0] ?? null
}

/** Run a mutation (INSERT/UPDATE/DELETE) */
export async function execute(sql: string, params?: unknown[]): Promise<number> {
  const client = await pool.connect()
  try {
    const result = await client.query(sql, params)
    return result.rowCount ?? 0
  } finally {
    client.release()
  }
}
