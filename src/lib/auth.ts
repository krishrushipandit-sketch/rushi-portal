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

/** Sign a JWT token */
export async function signToken(payload: JWTPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
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
