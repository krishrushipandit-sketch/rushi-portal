// ⚠️ Supabase has been fully replaced by PostgreSQL + JWT auth
// This file is kept as a compatibility shim to prevent import errors during migration
// New code should use: import { query, queryOne, execute } from '@/lib/db'
// And: import { getUserFromRequest, getCurrentUser } from '@/lib/auth'

export const supabase = null as never
export const supabaseAdmin = () => { throw new Error('Supabase removed — use @/lib/db instead') }
