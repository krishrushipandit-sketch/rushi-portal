import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

const SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'rushi_super_secret_jwt_2026'
)

export interface JWTPayload {
  userId: string
  email: string
  role: string
  name: string
}

/** Calculate seconds until next 12:00 AM IST (Midnight) */
export function getSecondsUntilMidnightIST(): number {
  const now = new Date()
  const istOffsetMs = 5.5 * 60 * 60 * 1000
  const istTime = new Date(now.getTime() + istOffsetMs)
  
  // Next 12:00 AM midnight in IST (00:00:00 of next day)
  const nextMidnightIST = new Date(Date.UTC(
    istTime.getUTCFullYear(),
    istTime.getUTCMonth(),
    istTime.getUTCDate() + 1,
    0, 0, 0, 0
  ))
  
  const diffMs = (nextMidnightIST.getTime() - istOffsetMs) - now.getTime()
  return Math.max(Math.floor(diffMs / 1000), 60)
}

/** Sign a JWT token that strictly expires at 12:00 AM Midnight IST */
export async function signToken(payload: JWTPayload): Promise<string> {
  const secondsUntilMidnight = getSecondsUntilMidnightIST()
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${secondsUntilMidnight}s`)
    .sign(SECRET)
}

/** Verify a JWT token */
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET)
    return payload as unknown as JWTPayload
  } catch {
    return null
  }
}

/** Get current user from cookie (server-side) */
export async function getCurrentUser(): Promise<JWTPayload | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('rushi_session')?.value
    if (!token) return null
    return await verifyToken(token)
  } catch {
    return null
  }
}

/** Get current user from request (API routes) */
export async function getUserFromRequest(req: NextRequest): Promise<JWTPayload | null> {
  // Check cookie first
  const cookieToken = req.cookies.get('rushi_session')?.value
  if (cookieToken) return await verifyToken(cookieToken)

  // Fall back to Authorization header
  const authHeader = req.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.replace('Bearer ', '')
    return await verifyToken(token)
  }

  return null
}

