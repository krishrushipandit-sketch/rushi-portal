import { NextRequest, NextResponse } from 'next/server'
import { queryOne, execute } from '@/lib/db'
import { signToken, getSecondsUntilMidnightIST } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const { email, password, device_id } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    // Ensure columns exist
    await execute('ALTER TABLE profiles ADD COLUMN IF NOT EXISTS registered_device_id TEXT').catch(() => {})
    await execute('ALTER TABLE profiles ADD COLUMN IF NOT EXISTS device_registered_at TIMESTAMPTZ').catch(() => {})

    // Find user by email
    const user = await queryOne<{
      id: string
      email: string
      full_name: string
      role: string
      password_hash: string
      is_active: boolean
      registered_device_id: string | null
    }>(
      'SELECT id, email, full_name, role, password_hash, is_active, registered_device_id FROM profiles WHERE email = $1',
      [email.trim().toLowerCase()]
    )

    if (!user || !user.is_active) {
      return NextResponse.json({ error: 'Invalid email or password. Please try again.' }, { status: 401 })
    }

    const passwordValid = await bcrypt.compare(password, user.password_hash)
    if (!passwordValid) {
      return NextResponse.json({ error: 'Invalid email or password. Please try again.' }, { status: 401 })
    }

    // ── Anti-Proxy Single Device Lock (Employees Only) ──
    // Admins have universal master access from any device or desktop
    if (user.role !== 'admin' && device_id) {
      const cleanDeviceId = String(device_id).trim()

      if (!user.registered_device_id) {
        // First login on mobile device: Bind account to this device
        await execute(
          'UPDATE profiles SET registered_device_id = $1, device_registered_at = NOW() WHERE id = $2',
          [cleanDeviceId, user.id]
        )
      } else if (user.registered_device_id !== cleanDeviceId) {
        // Mismatch: Attempting login from another mobile or desktop
        return NextResponse.json(
          {
            error: 'This account is locked to another mobile device. To prevent proxy attendance, logins from other devices or desktops are blocked. Please contact admin to reset your device registration.',
            code: 'DEVICE_MISMATCH'
          },
          { status: 403 }
        )
      }
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

