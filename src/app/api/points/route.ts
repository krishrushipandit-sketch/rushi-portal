import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne, execute } from '@/lib/db'
import { getUserFromRequest } from '@/lib/auth'

interface EmployeePointRow {
  employee_id: string
  points: number
  report_date: string
  targets_hit: number
  targets_total: number
  reason: string
}

interface ProfileRow {
  id: string
  full_name: string
  designation: string | null
  avatar_url: string | null
  department?: string | null
}

interface StarPerformerRow {
  id: string
  employee_id: string
  month: string
  rank: number
  total_points: number
  employee: ProfileRow | null
}

interface ResponsibilityRow {
  title: string
  daily_target: number | null
}

interface DailyReportRow {
  report_date: string
  entries: { description: string; count: number; notes?: string }[] | null
}

// ── GET /api/points ──────────────────────────────────────────────
// Returns leaderboard (current month) + star performers
export async function GET(req: NextRequest) {
  const user = await getUserFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const month = searchParams.get('month') || new Date().toISOString().slice(0, 7)
  const dateFrom = `${month}-01`
  const dateTo = new Date(new Date(dateFrom).setMonth(new Date(dateFrom).getMonth() + 1))
    .toISOString()
    .slice(0, 10)

  try {
    // Get all points for this month
    const points = await query<EmployeePointRow>(
      `SELECT employee_id, points, report_date, targets_hit, targets_total, reason
       FROM employee_points
       WHERE report_date >= $1 AND report_date < $2
       ORDER BY report_date ASC`,
      [dateFrom, dateTo]
    )

    // Get all active employees
    const employees = await query<ProfileRow>(
      `SELECT id, full_name, designation, avatar_url
       FROM profiles
       WHERE role = 'employee' AND is_active = true`
    )

    // Get star performers for current month
    const stars = await query<StarPerformerRow>(
      `SELECT 
         sp.*,
         CASE WHEN p.id IS NOT NULL THEN json_build_object(
           'id', p.id,
           'full_name', p.full_name,
           'designation', p.designation,
           'avatar_url', p.avatar_url
         ) ELSE NULL END AS employee
       FROM star_performers sp
       LEFT JOIN profiles p ON p.id = sp.employee_id
       WHERE sp.month = $1
       ORDER BY sp.rank ASC`,
      [month]
    )

    // Build leaderboard
    const leaderboard = (employees || []).map((emp) => {
      const empPoints = (points || []).filter((p) => p.employee_id === emp.id)
      const totalPoints = empPoints.reduce((sum, p) => sum + p.points, 0)
      const dailyHistory = empPoints.map((p) => ({
        date: p.report_date,
        points: p.points,
        targets_hit: p.targets_hit,
        targets_total: p.targets_total,
      }))
      return { employee: emp, totalPoints, dailyHistory }
    })

    // Sort by total points descending
    leaderboard.sort((a, b) => b.totalPoints - a.totalPoints)

    return NextResponse.json(
      { leaderboard, stars: stars || [], month },
      {
        headers: { 'Cache-Control': 's-maxage=30, stale-while-revalidate=60' },
      }
    )
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}

// ── POST /api/points ─────────────────────────────────────────────
// Called internally after report submit; calculates + upserts points
export async function POST(req: NextRequest) {
  const user = await getUserFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { employee_id, report_date, entries } = await req.json()

    // Fetch this employee's responsibilities with daily_target
    const responsibilities = await query<ResponsibilityRow>(
      `SELECT title, daily_target
       FROM employee_responsibilities
       WHERE employee_id = $1`,
      [employee_id]
    )

    const resps = responsibilities || []
    const targetsWithGoals = resps.filter((r) => r.daily_target && r.daily_target > 0)
    const totalTargets = targetsWithGoals.length

    // Map entries to responsibility counts
    let targetsHit = 0
    let monthlyBonusPoints = 0
    let monthlyBonusReason = ''

    const MONTHLY_TARGET_KEYWORDS = ['enrollment', 'enroll', 'admission', 'join', 'amazon', 'dm', 'target']
    const isMonthlyTarget = (t: string) => MONTHLY_TARGET_KEYWORDS.some((kw) => t.toLowerCase().includes(kw))

    // Check if employee is in Sales for monthly bonuses
    const profile = await queryOne<{ department: string | null }>(
      `SELECT department FROM profiles WHERE id = $1`,
      [employee_id]
    )
    const isSales = profile?.department?.toLowerCase() === 'sales'

    if (totalTargets > 0) {
      // If sales, fetch all reports for this month to compute monthly totals
      let monthReports: DailyReportRow[] = []
      if (isSales) {
        const monthPrefix = report_date.slice(0, 7)
        monthReports = await query<DailyReportRow>(
          `SELECT report_date, entries
           FROM daily_reports
           WHERE employee_id = $1
             AND report_date >= $2
             AND report_date <= $3`,
          [employee_id, `${monthPrefix}-01`, report_date]
        )
      }

      targetsWithGoals.forEach((resp) => {
        const isMonthly = isSales && isMonthlyTarget(resp.title)

        if (isMonthly) {
          // Monthly target logic (+50 pts)
          let previousSum = 0
          let currentSum = 0
          monthReports.forEach((r) => {
            const match = (r.entries || []).find(
              (e: any) => e.description?.toLowerCase().trim() === resp.title.toLowerCase().trim()
            )
            if (match) {
              currentSum += match.count || 0
              if (r.report_date < report_date) {
                previousSum += match.count || 0
              }
            }
          })

          if (resp.daily_target && previousSum < resp.daily_target && currentSum >= resp.daily_target) {
            monthlyBonusPoints += 50
            monthlyBonusReason += ` | Monthly Target Hit: ${resp.title} (+50 pts) 🏆`
          }
        } else {
          // Daily target logic (+5 pts)
          const entry = (entries || []).find(
            (e: any) => e.description?.toLowerCase().trim() === resp.title?.toLowerCase().trim()
          )
          const count = entry?.count || 0
          if (resp.daily_target && count >= resp.daily_target) targetsHit++
        }
      })
    }

    // ── Points logic ──
    let points: number
    let reason: string

    const dailyTargetCount = targetsWithGoals.filter((r) => !(isSales && isMonthlyTarget(r.title))).length

    if (dailyTargetCount === 0) {
      points = 5
      reason = 'Report submitted (no daily targets)'
    } else {
      points = 5 + targetsHit * 5
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
    await execute(
      `INSERT INTO employee_points (employee_id, report_date, points, reason, targets_hit, targets_total, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (employee_id, report_date) DO UPDATE SET
         points = EXCLUDED.points,
         reason = EXCLUDED.reason,
         targets_hit = EXCLUDED.targets_hit,
         targets_total = EXCLUDED.targets_total,
         updated_at = EXCLUDED.updated_at`,
      [employee_id, report_date, points, reason, targetsHit, dailyTargetCount, new Date().toISOString()]
    )

    // ── Auto-announce star performers on 1st of month ──
    const todayIST = (() => {
      const d = new Date()
      const offset = d.getTimezoneOffset() * 60000
      return new Date(d.getTime() + offset + 330 * 60000)
    })()
    const isFirstOfMonth = todayIST.getDate() === 1
    const lastMonth = new Date(todayIST.getFullYear(), todayIST.getMonth() - 1, 1)
    const lastMonthStr = lastMonth.toISOString().slice(0, 7)

    if (isFirstOfMonth) {
      // Check if already announced
      const existing = await query<{ id: string }>(
        `SELECT id FROM star_performers WHERE month = $1 LIMIT 1`,
        [lastMonthStr]
      )

      if (!existing || existing.length === 0) {
        // Calculate last month's points
        const lmFrom = `${lastMonthStr}-01`
        const lmTo = new Date(new Date(lmFrom).setMonth(new Date(lmFrom).getMonth() + 1))
          .toISOString()
          .slice(0, 10)

        const lmPoints = await query<{ employee_id: string; points: number }>(
          `SELECT employee_id, points
           FROM employee_points
           WHERE report_date >= $1 AND report_date < $2`,
          [lmFrom, lmTo]
        )

        // Aggregate per employee
        const empTotals: Record<string, number> = {}
        ;(lmPoints || []).forEach((p) => {
          empTotals[p.employee_id] = (empTotals[p.employee_id] || 0) + p.points
        })

        const sorted = Object.entries(empTotals).sort(([, a], [, b]) => b - a)

        // Upsert top 2
        for (let i = 0; i < Math.min(2, sorted.length); i++) {
          await execute(
            `INSERT INTO star_performers (employee_id, month, rank, total_points)
             VALUES ($1, $2, $3, $4)
             ON CONFLICT (month, rank) DO UPDATE SET
               employee_id = EXCLUDED.employee_id,
               total_points = EXCLUDED.total_points`,
            [sorted[i][0], lastMonthStr, i + 1, sorted[i][1]]
          )
        }
      }
    }

    return NextResponse.json({ points, reason, targetsHit, targetsTotal: totalTargets })
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
