import { NextRequest, NextResponse } from 'next/server'
import { queryOne } from '@/lib/db'
import { signToken, getSecondsUntilMidnightIST } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    // Find user by email
    const user = await queryOne<{
      id: string
      email: string
      full_name: string
      role: string
      password_hash: string
      is_active: boolean
    }>(
      'SELECT id, email, full_name, role, password_hash, is_active FROM profiles WHERE email = $1',
      [email.trim().toLowerCase()]
    )

    if (!user || !user.is_active) {
      return NextResponse.json({ error: 'Invalid email or password. Please try again.' }, { status: 401 })
    }

    const passwordValid = await bcrypt.compare(password, user.password_hash)
    if (!passwordValid) {
      return NextResponse.json({ error: 'Invalid email or password. Please try again.' }, { status: 401 })
    }

    const token = await signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.full_name,
    })

    const secondsUntilMidnight = getSecondsUntilMidnightIST()

    const response = NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, name: user.full_name, role: user.role },
      token,
      expiresIn: secondsUntilMidnight,
    })

    // Set HTTP-only session cookie expiring at 12:00 AM midnight IST
    response.cookies.set('rushi_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: secondsUntilMidnight,
      path: '/',
    })

    return response
  } catch (err: unknown) {
    console.error('Login error:', err)
    return NextResponse.json({ error: 'An error occurred. Please try again.' }, { status: 500 })
  }
}

