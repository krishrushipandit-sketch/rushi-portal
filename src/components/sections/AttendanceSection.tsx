'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { Profile } from '@/lib/database.types'
import { CheckCircle2, ChevronLeft, ChevronRight, Home, Briefcase, CalendarOff, Palmtree, Users, Clock, Trash2, Check } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import Reveal from '@/components/ui/Reveal'
import KpiCard from '@/components/ui/KpiCard'
import Avatar from '@/components/ui/Avatar'
import Pill from '@/components/ui/Pill'
import SidePanel, { KeyValues, PanelSection } from '@/components/ui/SidePanel'

const NATIONAL_HOLIDAYS: Record<string, string> = {
  '2026-01-26': 'Republic Day',
  '2026-05-01': 'Maharashtra Day',
  '2026-08-15': 'Independence Day',
  '2026-10-02': 'Gandhi Jayanti',
  '2026-11-09': 'Diwali',
  '2026-12-25': 'Christmas',
  '2027-01-26': 'Republic Day',
}

const ATTENDANCE_TYPES = [
  { value: 'present', label: 'In office', icon: <Briefcase size={15} />, color: '#22c55e', short: 'P' },
  { value: 'wfh', label: 'Work from home', icon: <Home size={15} />, color: '#2f9bff', short: 'W' },
  { value: 'half_day', label: 'Half day', icon: <CheckCircle2 size={15} />, color: '#f5a524', short: 'HD' },
  { value: 'leave_pending', label: 'Leave (pending)', icon: <CalendarOff size={15} />, color: '#f0773a', short: 'LP' },
  { value: 'leave', label: 'Leave (approved)', icon: <CalendarOff size={15} />, color: '#ef4757', short: 'L' },
  { value: 'sandwich_leave', label: 'Sandwich leave', icon: <Palmtree size={15} />, color: '#e8509a', short: 'SL' },
]
const typeOf = (v: string) => ATTENDANCE_TYPES.find(t => t.value === v)
const EMPLOYEE_SELECTABLE = ['present', 'wfh', 'leave_pending']
const ABSENT = '#ef4757'
const HOLIDAY = '#a855f7'

interface AttendanceRecord {
  employee_id: string
  date: string
  status: string
  check_in_time?: string | null
  check_out_time?: string | null
  attendance_mode?: string | null
}
interface Employee { id: string; full_name: string; designation?: string | null; avatar_url?: string | null; role: string; is_active: boolean }

const shiftMonth = (month: string, delta: number) => {
  const [y, m] = month.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1 + delta, 1)).toISOString().slice(0, 7)
}

function dayState(dStr: string, rec: AttendanceRecord | undefined, today: string) {
  const holiday = NATIONAL_HOLIDAYS[dStr]
  const sunday = new Date(`${dStr}T00:00:00Z`).getUTCDay() === 0
  if (rec) {
    const t = typeOf(rec.status)
    if (t) return { short: t.short, label: t.label, color: t.color, kind: 'record' as const }
  }
  if (holiday) return { short: 'H', label: holiday, color: HOLIDAY, kind: 'holiday' as const }
  if (sunday) return { short: 'S', label: 'Sunday', color: 'var(--text-faint)', kind: 'weekend' as const }
  if (dStr < today) return { short: 'A', label: 'Absent', color: ABSENT, kind: 'absent' as const }
  return { short: '', label: dStr === today ? 'Not marked yet' : '', color: 'var(--text-faint)', kind: 'empty' as const }
}

function MonthNav({ month, setMonth }: { month: string; setMonth: (m: string) => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <button className="icon-btn bordered" onClick={() => setMonth(shiftMonth(month, -1))} aria-label="Previous month"><ChevronLeft size={16} /></button>
      <input type="month" className="form-input" value={month} onChange={e => setMonth(e.target.value)} style={{ width: 'auto' }} aria-label="Month" />
      <button className="icon-btn bordered" onClick={() => setMonth(shiftMonth(month, 1))} aria-label="Next month"><ChevronRight size={16} /></button>
    </div>
  )
}

function StatusPicker({ options, current, onPick, onClear }: { options: typeof ATTENDANCE_TYPES; current?: string; onPick: (v: string) => void; onClear?: () => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div className="status-grid">
        {options.map(t => (
          <button key={t.value} className={`status-option ${current === t.value ? 'selected' : ''}`} style={{ '--tone': t.color, height: 46 } as React.CSSProperties} onClick={() => onPick(t.value)}>
            {t.icon}{t.label}{current === t.value && <Check size={14} style={{ marginLeft: 'auto' }} />}
          </button>
        ))}
      </div>
      {onClear && <button className="btn btn-ghost" style={{ color: 'var(--status-danger)', alignSelf: 'flex-start' }} onClick={onClear}><Trash2 size={14} /> Clear record (marks absent)</button>}
    </div>
  )
}

export default function AttendanceSection({ profile }: { profile: Profile }) {
  const router = useRouter()
  const isAdmin = profile.role === 'admin'
  const todayIST = new Date(Date.now() + 5.5 * 3600 * 1000).toISOString().slice(0, 10)
  const [month, setMonth] = useState(todayIST.slice(0, 7))
  const [records, setRecords] = useState<AttendanceRecord[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [editCell, setEditCell] = useState<{ empId?: string; empName?: string; date: string } | null>(null)
  const [openEmpId, setOpenEmpId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const loadData = useCallback(async () => {
    setLoading(true)
    const token = localStorage.getItem('rushi_token')
    if (!token) { setLoading(false); return }
    try {
      const json = await fetch(`/api/attendance?month=${month}`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json())
      setRecords(Array.isArray(json) ? json : [])
      if (isAdmin) {
        const emps = await fetch('/api/employees', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json())
        setEmployees(Array.isArray(emps) ? emps.filter((e: Employee) => e.role === 'employee' && e.is_active) : [])
      }
    } catch (err) {
      console.error('Error loading attendance:', err)
      setRecords([])
    } finally {
      setLoading(false)
    }
  }, [month, isAdmin])

  useEffect(() => { loadData() }, [loadData])

  const markAttendance = async (status: string, date: string, empId?: string) => {
    const token = localStorage.getItem('rushi_token')
    if (!token) { router.push('/'); return }
    setSaving(true)
    try {
      await fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ date, status, employee_id: empId }),
      })
      setEditCell(null)
      await loadData()
    } finally {
      setSaving(false)
    }
  }

  const [yy, mm] = month.split('-').map(Number)
  const daysInMonth = new Date(Date.UTC(yy, mm, 0)).getUTCDate()
  const dates = Array.from({ length: daysInMonth }, (_, i) => `${month}-${String(i + 1).padStart(2, '0')}`)
  const monthLabel = new Date(`${month}-01T00:00:00Z`).toLocaleDateString('en-IN', { month: 'long', year: 'numeric', timeZone: 'UTC' })

  const summarize = (empRecords: AttendanceRecord[]) => {
    const counts: Record<string, number> = { present: 0, wfh: 0, half_day: 0, leave: 0, leave_pending: 0, sandwich_leave: 0, absent: 0 }
    for (const d of dates) {
      const s = dayState(d, empRecords.find(r => r.date === d), todayIST)
      if (s.kind === 'record') {
        const rec = empRecords.find(r => r.date === d)!
        counts[rec.status] = (counts[rec.status] || 0) + 1
      } else if (s.kind === 'absent') counts.absent++
    }
    return counts
  }

  const editPanel = editCell && (() => {
    const rec = records.find(r => r.date === editCell.date && (!editCell.empId || r.employee_id === editCell.empId))
    return (
      <SidePanel
        open
        onClose={() => setEditCell(null)}
        width={460}
        leading={editCell.empName ? <Avatar name={editCell.empName} size="md" /> : <span className="drawer-icon" style={{ color: 'var(--brand-primary)', background: 'var(--brand-primary-soft)' }}><Clock size={18} /></span>}
        title={editCell.empName ? `${editCell.empName}` : 'Mark attendance'}
        subtitle={<>{new Date(`${editCell.date}T00:00:00Z`).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}{saving && <span>· saving…</span>}</>}
      >
        {rec && (
          <KeyValues items={[
            { label: 'Current status', value: typeOf(rec.status)?.label || rec.status },
            { label: 'Marked via', value: rec.attendance_mode || '—' },
            { label: 'Check-in', value: rec.check_in_time?.slice(0, 5) || '—' },
            { label: 'Check-out', value: rec.check_out_time?.slice(0, 5) || '—' },
          ]} />
        )}
        <PanelSection title={isAdmin ? 'Set status' : 'How are you working today?'}>
          <StatusPicker
            options={isAdmin ? ATTENDANCE_TYPES : ATTENDANCE_TYPES.filter(t => EMPLOYEE_SELECTABLE.includes(t.value))}
            current={rec?.status}
            onPick={v => markAttendance(v, editCell.date, editCell.empId)}
            onClear={isAdmin && rec ? () => markAttendance('DELETE', editCell.date, editCell.empId) : undefined}
          />
          {!isAdmin && <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Leave requests stay pending until an admin approves them.</p>}
        </PanelSection>
      </SidePanel>
    )
  })()

  const legend = (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {ATTENDANCE_TYPES.map(t => <Pill key={t.value} color={t.color}><b>{t.short}</b> {t.label}</Pill>)}
      <Pill color={ABSENT}><b>A</b> Absent</Pill>
      <Pill color={HOLIDAY}><b>H</b> Holiday</Pill>
    </div>
  )

  /* ── Admin ── */
  if (isAdmin) {
    const todays = records.filter(r => r.date === todayIST)
    const count = (s: string) => todays.filter(r => r.status === s).length
    const pendingLeaves = records.filter(r => r.status === 'leave_pending').length
    const openEmp = employees.find(e => e.id === openEmpId) || null

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <PageHeader eyebrow={monthLabel} title="Attendance" description="Click a cell to change a day, or a name to see that person’s month." actions={<MonthNav month={month} setMonth={setMonth} />} />

        <Reveal className="grid-4">
          <KpiCard label="In office today" value={count('present')} icon={Briefcase} tone="brand" foot={`of ${employees.length} employees`} />
          <KpiCard label="WFH today" value={count('wfh')} icon={Home} tone="info" />
          <KpiCard label="On leave today" value={count('leave') + count('sandwich_leave') + count('half_day')} icon={CalendarOff} tone="warning" />
          <KpiCard label="Leave requests" value={pendingLeaves} icon={Users} tone={pendingLeaves ? 'danger' : 'default'} foot={pendingLeaves ? 'Pending approval this month' : 'Nothing pending'} />
        </Reveal>

        <Reveal delay={0.06}>
          <section className="card" style={{ overflow: 'hidden' }}>
            <div className="list-toolbar">{legend}</div>
            {loading ? (
              <div style={{ padding: '1rem' }}><div className="skeleton" style={{ height: 260 }} /></div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className="att-grid">
                  <thead>
                    <tr>
                      <th className="att-name">Employee</th>
                      {dates.map(d => {
                        const dt = new Date(`${d}T00:00:00Z`)
                        return (
                          <th key={d} className={`${dt.getUTCDay() === 0 ? 'sun' : ''} ${d === todayIST ? 'today' : ''}`}>
                            <span>{['S', 'M', 'T', 'W', 'T', 'F', 'S'][dt.getUTCDay()]}</span>{dt.getUTCDate()}
                          </th>
                        )
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map(emp => {
                      const empRecords = records.filter(r => r.employee_id === emp.id)
                      return (
                        <tr key={emp.id}>
                          <td className="att-name">
                            <button onClick={() => setOpenEmpId(emp.id)}>
                              <Avatar name={emp.full_name} src={emp.avatar_url} size="xs" />
                              <span className="truncate-1">{emp.full_name}</span>
                            </button>
                          </td>
                          {dates.map(d => {
                            const s = dayState(d, empRecords.find(r => r.date === d), todayIST)
                            return (
                              <td key={d} className={d === todayIST ? 'today' : ''}>
                                <button
                                  className={`att-cell ${s.kind}`}
                                  style={{ '--tone': s.color } as React.CSSProperties}
                                  title={`${emp.full_name} · ${d}${s.label ? ` · ${s.label}` : ''}`}
                                  onClick={() => setEditCell({ empId: emp.id, empName: emp.full_name, date: d })}
                                >
                                  {s.short}
                                </button>
                              </td>
                            )
                          })}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </Reveal>

        {openEmp && (() => {
          const empRecords = records.filter(r => r.employee_id === openEmp.id)
          const c = summarize(empRecords)
          return (
            <SidePanel open onClose={() => setOpenEmpId(null)} leading={<Avatar name={openEmp.full_name} src={openEmp.avatar_url} size="md" />} title={openEmp.full_name} subtitle={<>{openEmp.designation || 'Employee'} · {monthLabel}</>}>
              <KeyValues items={[
                { label: 'In office', value: c.present },
                { label: 'Work from home', value: c.wfh },
                { label: 'Half days', value: c.half_day },
                { label: 'Leaves', value: c.leave + c.sandwich_leave },
                { label: 'Pending leave requests', value: c.leave_pending },
                { label: 'Absent', value: c.absent },
              ]} />
              <PanelSection title="Month at a glance">
                <div className="mini-cal">
                  {dates.map(d => {
                    const s = dayState(d, empRecords.find(r => r.date === d), todayIST)
                    return (
                      <button key={d} className={`att-cell ${s.kind}`} style={{ '--tone': s.color } as React.CSSProperties} title={`${d} · ${s.label}`} onClick={() => setEditCell({ empId: openEmp.id, empName: openEmp.full_name, date: d })}>
                        <small>{Number(d.slice(8))}</small>{s.short}
                      </button>
                    )
                  })}
                </div>
              </PanelSection>
            </SidePanel>
          )
        })()}
        {editPanel}
      </div>
    )
  }

  /* ── Employee ── */
  const c = summarize(records)
  const firstWeekday = new Date(`${month}-01T00:00:00Z`).getUTCDay()
  const cells: (string | null)[] = [...Array(firstWeekday).fill(null), ...dates]
  const todayRec = records.find(r => r.date === todayIST)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <PageHeader eyebrow={monthLabel} title="My Attendance" description="Click a day to mark how you worked or request leave." actions={<MonthNav month={month} setMonth={setMonth} />} />

      {month === todayIST.slice(0, 7) && (
        <div className={`alert-strip ${todayRec ? 'tone-success' : 'tone-warning'}`}>
          <span className="alert-strip-icon">{todayRec ? <CheckCircle2 size={16} /> : <Clock size={16} />}</span>
          <div style={{ flex: 1, minWidth: 200 }}>
            <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>{todayRec ? `Today: ${typeOf(todayRec.status)?.label}` : 'You haven’t marked today yet'}</p>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{todayRec?.check_in_time ? `Checked in at ${todayRec.check_in_time.slice(0, 5)}` : 'Use the office QR / biometric, or mark WFH here.'}</p>
          </div>
          {!todayRec && <button className="btn btn-primary btn-sm" onClick={() => setEditCell({ date: todayIST })}>Mark today</button>}
        </div>
      )}

      <Reveal className="grid-4">
        <KpiCard label="In office" value={c.present} icon={Briefcase} tone="brand" compact />
        <KpiCard label="Work from home" value={c.wfh} icon={Home} tone="info" compact />
        <KpiCard label="Leaves" value={c.leave + c.sandwich_leave + c.leave_pending} icon={CalendarOff} tone="warning" compact foot={c.leave_pending ? `${c.leave_pending} pending` : undefined} />
        <KpiCard label="Absent" value={c.absent} icon={Clock} tone={c.absent ? 'danger' : 'default'} compact />
      </Reveal>

      <Reveal delay={0.06}>
        <section className="card" style={{ padding: '1.1rem' }}>
          <div className="cal-head">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <span key={d}>{d}</span>)}</div>
          <div className="cal-grid">
            {cells.map((d, i) => {
              if (!d) return <div key={`pad-${i}`} />
              const rec = records.find(r => r.date === d)
              const s = dayState(d, rec, todayIST)
              const future = d > todayIST
              const clickable = !future && s.kind !== 'weekend' && s.kind !== 'holiday'
              return (
                <button
                  key={d}
                  disabled={!clickable}
                  className={`cal-day ${s.kind} ${d === todayIST ? 'today' : ''} ${future ? 'future' : ''}`}
                  style={{ '--tone': s.color } as React.CSSProperties}
                  onClick={() => setEditCell({ date: d })}
                >
                  <span className="cal-num">{Number(d.slice(8))}</span>
                  {s.label && <span className="cal-label">{s.label}</span>}
                  {rec?.check_in_time && <span className="cal-time">{rec.check_in_time.slice(0, 5)}</span>}
                </button>
              )
            })}
          </div>
          <div style={{ marginTop: '1rem' }}>{legend}</div>
        </section>
      </Reveal>
      {editPanel}
    </div>
  )
}
