import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const db = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function getAuth(req: NextRequest) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '')
  if (!token) return null
  const { data: { user } } = await db().auth.getUser(token)
  if (!user) return null
  const { data: profile } = await db().from('profiles').select('role').eq('id', user.id).single()
  return { user, profile }
}

// ── GET /api/points ──────────────────────────────────────────────
// Returns leaderboard (current month) + star performers
export async function GET(req: NextRequest) {
  const auth = await getAuth(req)
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const month = searchParams.get('month') || new Date().toISOString().slice(0, 7)
  const dateFrom = `${month}-01`
  const dateTo = new Date(new Date(dateFrom).setMonth(new Date(dateFrom).getMonth() + 1))
    .toISOString().slice(0, 10)

  try {
    // Get all points for this month
    const { data: points } = await db()
      .from('employee_points')
      .select('employee_id, points, report_date, targets_hit, targets_total, reason')
      .gte('report_date', dateFrom)
      .lt('report_date', dateTo)
      .order('report_date', { ascending: true })

    // Get all active employees
    const { data: employees } = await db()
      .from('profiles')
      .select('id, full_name, designation, avatar_url')
      .eq('role', 'employee')
      .eq('is_active', true)

    // Get star performers for current month
    const { data: stars } = await db()
      .from('star_performers')
      .select('*, employee:profiles!star_performers_employee_id_fkey(id, full_name, designation, avatar_url)')
      .eq('month', month)
      .order('rank', { ascending: true })

    // Build leaderboard
    const leaderboard = (employees || []).map(emp => {
      const empPoints = (points || []).filter(p => p.employee_id === emp.id)
      const totalPoints = empPoints.reduce((sum, p) => sum + p.points, 0)
      const dailyHistory = empPoints.map(p => ({
        date: p.report_date,
        points: p.points,
        targets_hit: p.targets_hit,
        targets_total: p.targets_total,
      }))
      return { employee: emp, totalPoints, dailyHistory }
    })

    // Sort by total points descending
    leaderboard.sort((a, b) => b.totalPoints - a.totalPoints)

    return NextResponse.json({ leaderboard, stars: stars || [], month }, {
      headers: { 'Cache-Control': 's-maxage=30, stale-while-revalidate=60' }
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// ── POST /api/points ─────────────────────────────────────────────
// Called internally after report submit; calculates + upserts points
export async function POST(req: NextRequest) {
  const auth = await getAuth(req)
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { employee_id, report_date, entries } = await req.json()

    // Fetch this employee's responsibilities with daily_target
    const { data: responsibilities } = await db()
      .from('employee_responsibilities')
      .select('title, daily_target')
      .eq('employee_id', employee_id)

    const resps = responsibilities || []
    const targetsWithGoals = resps.filter((r: any) => r.daily_target && r.daily_target > 0)
    const totalTargets = targetsWithGoals.length

    // Map entries to responsibility counts
    let targetsHit = 0
    let monthlyBonusPoints = 0
    let monthlyBonusReason = ''

    const MONTHLY_TARGET_KEYWORDS = ['enrollment', 'enroll', 'admission', 'join', 'amazon', 'dm', 'target']
    const isMonthlyTarget = (t: string) => MONTHLY_TARGET_KEYWORDS.some(kw => t.toLowerCase().includes(kw))

    // Check if employee is in Sales for monthly bonuses
    const { data: profile } = await db().from('profiles').select('department').eq('id', employee_id).single()
    const isSales = profile?.department?.toLowerCase() === 'sales'

    if (totalTargets > 0) {
      // If sales, fetch all reports for this month to compute monthly totals
      let monthReports: any[] = []
      if (isSales) {
        const monthPrefix = report_date.slice(0, 7)
        const { data } = await db()
          .from('daily_reports')
          .select('report_date, entries')
          .eq('employee_id', employee_id)
          .gte('report_date', `${monthPrefix}-01`)
          .lte('report_date', report_date)
        monthReports = data || []
      }

      targetsWithGoals.forEach((resp: any) => {
        const isMonthly = isSales && isMonthlyTarget(resp.title)
        
        if (isMonthly) {
          // Monthly target logic (+50 pts)
          let previousSum = 0
          let currentSum = 0
          monthReports.forEach(r => {
            const match = (r.entries || []).find((e: any) => e.description?.toLowerCase().trim() === resp.title.toLowerCase().trim())
            if (match) {
              currentSum += match.count || 0
              if (r.report_date < report_date) {
                previousSum += match.count || 0
              }
            }
          })
          
          if (previousSum < resp.daily_target && currentSum >= resp.daily_target) {
            monthlyBonusPoints += 50
            monthlyBonusReason += ` | Monthly Target Hit: ${resp.title} (+50 pts) 🏆`
          }
        } else {
          // Daily target logic (+5 pts)
          const entry = (entries || []).find((e: any) => e.description?.toLowerCase().trim() === resp.title?.toLowerCase().trim())
          const count = entry?.count || 0
          if (count >= resp.daily_target) targetsHit++
        }
      })
    }

    // ── Points logic ──
    // Base 5 points for report submission + 5 points for EACH daily target hit + 50 points for monthly targets
    let points: number
    let reason: string

    const dailyTargetCount = targetsWithGoals.filter((r: any) => !(isSales && isMonthlyTarget(r.title))).length

    if (dailyTargetCount === 0) {
      // No daily targets configured
      points = 5
      reason = 'Report submitted (no daily targets)'
    } else {
      points = 5 + (targetsHit * 5)
      if (targetsHit === dailyTargetCount) {
        reason = `All ${dailyTargetCount} daily target${dailyTargetCount > 1 ? 's' : ''} hit! 🎯 (+${points} pts)`
      } else if (targetsHit > 0) {
        reason = `${targetsHit}/${dailyTargetCount} daily targets hit (+${points} pts)`
      } else {
        reason = `Report submitted, 0/${dailyTargetCount} daily targets hit (+5 pts base)`
      }
    }

    // Add monthly bonuses if applicable
    if (monthlyBonusPoints > 0) {
      points += monthlyBonusPoints
      reason += monthlyBonusReason
    }

    // Upsert points record
    const { data, error } = await db()
      .from('employee_points')
      .upsert({
        employee_id,
        report_date,
        points,
        reason,
        targets_hit: targetsHit,
        targets_total: dailyTargetCount,
        updated_at: new Date().toISOString()
      }, { onConflict: 'employee_id,report_date' })
      .select()
      .single()

    if (error) throw error

    // ── Auto-announce star performers on 1st of month ──
    const todayIST = (() => {
      const d = new Date()
      const offset = d.getTimezoneOffset() * 60000
      return new Date(d.getTime() + offset + (330 * 60000))
    })()
    const isFirstOfMonth = todayIST.getDate() === 1
    const lastMonth = new Date(todayIST.getFullYear(), todayIST.getMonth() - 1, 1)
    const lastMonthStr = lastMonth.toISOString().slice(0, 7)

    if (isFirstOfMonth) {
      // Check if already announced
      const { data: existing } = await db()
        .from('star_performers')
        .select('id')
        .eq('month', lastMonthStr)
        .limit(1)

      if (!existing || existing.length === 0) {
        // Calculate last month's points
        const lmFrom = `${lastMonthStr}-01`
        const lmTo = new Date(new Date(lmFrom).setMonth(new Date(lmFrom).getMonth() + 1))
          .toISOString().slice(0, 10)

        const { data: lmPoints } = await db()
          .from('employee_points')
          .select('employee_id, points')
          .gte('report_date', lmFrom)
          .lt('report_date', lmTo)

        // Aggregate per employee
        const empTotals: Record<string, number> = {}
        ;(lmPoints || []).forEach((p: any) => {
          empTotals[p.employee_id] = (empTotals[p.employee_id] || 0) + p.points
        })

        const sorted = Object.entries(empTotals).sort(([, a], [, b]) => b - a)

        // Upsert top 2
        for (let i = 0; i < Math.min(2, sorted.length); i++) {
          await db().from('star_performers').upsert({
            employee_id: sorted[i][0],
            month: lastMonthStr,
            rank: i + 1,
            total_points: sorted[i][1],
          }, { onConflict: 'month,rank' })
        }
      }
    }

    return NextResponse.json({ points, reason, targetsHit, targetsTotal: totalTargets })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
