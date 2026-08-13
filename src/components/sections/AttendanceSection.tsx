'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import type { Profile } from '@/lib/database.types'
import { Calendar as CalendarIcon, CheckCircle2, ChevronLeft, ChevronRight, Home, Briefcase, CalendarOff, Palmtree, User } from 'lucide-react'

// Hardcoded 2026/2027 Indian National Holidays (can be expanded)
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
  { value: 'present', label: 'In Office', icon: <Briefcase size={16} />, color: '#10b981', short: 'P' },
  { value: 'wfh', label: 'Work From Home', icon: <Home size={16} />, color: '#6366f1', short: 'W' },
  { value: 'leave_pending', label: 'Leave (Pending)', icon: <CalendarOff size={16} />, color: '#f97316', short: 'LP' },
  { value: 'leave', label: 'Leave (Approved)', icon: <CalendarOff size={16} />, color: '#ef4444', short: 'L' },
  { value: 'sandwich_leave', label: 'Sandwich Leave', icon: <Palmtree size={16} />, color: '#ec4899', short: 'SL' },
  { value: 'half_day', label: 'Half Day', icon: <CheckCircle2 size={16} />, color: '#f59e0b', short: 'HD' },
]

const EMPLOYEE_SELECTABLE = ['present', 'wfh', 'leave_pending']

export default function AttendanceSection({ profile }: { profile: Profile }) {
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7))
  const [records, setRecords] = useState<any[]>([])
  const [employees, setEmployees] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [markingDate, setMarkingDate] = useState<string | null>(null)
  const [markingAdmin, setMarkingAdmin] = useState<{ empId: string, empName: string, date: string } | null>(null)
  
  const isAdmin = profile.role === 'admin'
  const todayIST = new Date(Date.now() + 5.5 * 60 * 60 * 1000).toISOString().slice(0, 10)

  const loadData = useCallback(async () => {
    setLoading(true)
    const { data: { session } } = await supabase.auth.getSession()
    const token = session?.access_token || ''
    
    // Fetch records
    const res = await fetch(`/api/attendance?month=${month}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const json = await res.json()
    setRecords(json || [])

    // Fetch employees for admin view
    if (isAdmin) {
      const { data: emps } = await supabase.from('profiles').select('*').eq('role', 'employee').eq('is_active', true)
      setEmployees(emps || [])
    }
    setLoading(false)
  }, [month, isAdmin])

  useEffect(() => { loadData() }, [loadData])

  const markAttendance = async (status: string, targetEmpId?: string, targetDate?: string) => {
    const dateToMark = targetDate || markingDate
    if (!dateToMark) return
    const { data: { session } } = await supabase.auth.getSession()
    const token = session?.access_token || ''

    await fetch('/api/attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ 
        date: dateToMark, 
        status, 
        employee_id: targetEmpId // Admin can specify employee_id
      })
    })
    
    setMarkingDate(null)
    setMarkingAdmin(null)
    loadData()
  }

  // Generate calendar days for the current month
  const [yearStr, monthStr] = month.split('-')
  const y = parseInt(yearStr)
  const m = parseInt(monthStr) - 1
  
  const firstDay = new Date(y, m, 1)
  const lastDay = new Date(y, m + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startDayOfWeek = firstDay.getDay() // 0 = Sunday

  const days = []
  for (let i = 0; i < startDayOfWeek; i++) {
    days.push(null) // Padding
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const dStr = `${yearStr}-${monthStr}-${i.toString().padStart(2, '0')}`
    days.push(dStr)
  }

  if (isAdmin) {
    // ADMIN VIEW: Table Grid
    return (
      <div className="animate-fade-in">
        <div className="page-header" style={{ marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '1.35rem', marginBottom: '0.25rem' }}>Staff Attendance</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              Monthly overview of team attendance and leaves
            </p>
          </div>
          <input
            type="month" className="form-input" value={month}
            onChange={e => setMonth(e.target.value)}
            style={{ width: 'auto', padding: '0.4rem 0.75rem' }}
          />
        </div>

        <div className="glass-card" style={{ overflowX: 'auto', padding: '1rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid var(--border-subtle)', minWidth: '150px' }}>Employee</th>
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const d = new Date(y, m, i + 1)
                  const isSunday = d.getDay() === 0
                  return (
                    <th key={i} style={{ 
                      padding: '0.5rem 0.25rem', 
                      borderBottom: '1px solid var(--border-subtle)',
                      background: isSunday ? 'rgba(255,255,255,0.02)' : 'transparent',
                      color: isSunday ? 'var(--text-muted)' : 'inherit'
                    }}>
                      {i + 1}
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => {
                const empRecords = records.filter(r => r.employee_id === emp.id)
                return (
                  <tr key={emp.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '0.5rem', fontWeight: 600 }}>{emp.full_name}</td>
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const dStr = `${yearStr}-${monthStr}-${(i + 1).toString().padStart(2, '0')}`
                      const isSunday = new Date(y, m, i + 1).getDay() === 0
                      const holiday = NATIONAL_HOLIDAYS[dStr]
                      const rec = empRecords.find(r => r.date === dStr)
                      
                      let content = '-'
                      let color = 'var(--text-muted)'
                      
                      if (holiday) {
                        content = 'H'
                        color = '#a855f7'
                      } else if (isSunday) {
                        content = 'S'
                        color = 'var(--text-muted)'
                      } else if (rec) {
                        const tInfo = ATTENDANCE_TYPES.find(t => t.value === rec.status)
                        if (tInfo) { content = tInfo.short || '-'; color = tInfo.color }
                      } else if (dStr < todayIST) {
                        content = 'A' // Absent if past date and no record
                        color = '#ef4444'
                      }

                      return (
                        <td key={i} 
                          onClick={() => setMarkingAdmin({ empId: emp.id, empName: emp.full_name, date: dStr })}
                          style={{ 
                          padding: '0.5rem 0.25rem', 
                          textAlign: 'center', 
                          fontWeight: 700, 
                          color,
                          background: isSunday ? 'rgba(255,255,255,0.02)' : 'transparent',
                          cursor: 'pointer'
                        }}
                        className="hover:bg-white/5"
                        title="Click to edit">
                          {content}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

      {/* Admin Edit Modal */}
      {markingAdmin && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
          <div className="glass-card" style={{ width: '100%', maxWidth: '400px', padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
              Edit Attendance
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              {markingAdmin.empName} — {new Date(markingAdmin.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {ATTENDANCE_TYPES.map(type => (
                <button
                  key={type.value}
                  onClick={() => markAttendance(type.value, markingAdmin.empId, markingAdmin.date)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem',
                    borderRadius: '12px', border: `1px solid ${type.color}40`,
                    background: `${type.color}10`, color: type.color,
                    fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                    textAlign: 'left'
                  }}
                  className="hover:brightness-125"
                >
                  {type.icon}
                  {type.label}
                </button>
              ))}
              <button
                  onClick={() => markAttendance('DELETE', markingAdmin.empId, markingAdmin.date)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem',
                    borderRadius: '12px', border: `1px solid rgba(255,255,255,0.1)`,
                    background: `rgba(255,255,255,0.05)`, color: 'var(--text-secondary)',
                    fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                    textAlign: 'left', marginTop: '0.5rem'
                  }}
                  className="hover:bg-white/10"
                >
                  Clear Record (Absent)
              </button>
            </div>
            
            <button 
              className="btn btn-secondary" 
              style={{ width: '100%', marginTop: '1.5rem' }}
              onClick={() => setMarkingAdmin(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      </div>
    )
  }

  // EMPLOYEE VIEW: Calendar
  return (
    <div className="animate-fade-in">
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.35rem', marginBottom: '0.25rem' }}>My Attendance</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Mark your daily attendance and track leaves
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-secondary" onClick={() => {
            const d = new Date(y, m - 1, 1)
            setMonth(`${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}`)
          }}><ChevronLeft size={16} /></button>
          <input
            type="month" className="form-input" value={month}
            onChange={e => setMonth(e.target.value)}
            style={{ width: 'auto', padding: '0.4rem 0.75rem' }}
          />
          <button className="btn btn-secondary" onClick={() => {
            const d = new Date(y, m + 1, 1)
            setMonth(`${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}`)
          }}><ChevronRight size={16} /></button>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '1.5rem' }}>
        {/* Calendar Header */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem', marginBottom: '0.5rem' }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} style={{ textAlign: 'center', fontWeight: 600, fontSize: '0.75rem', color: day === 'Sun' ? '#ef4444' : 'var(--text-muted)', textTransform: 'uppercase' }}>
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem' }}>
          {days.map((dStr, i) => {
            if (!dStr) return <div key={i} style={{ padding: '2rem' }}></div>
            
            const dayNum = parseInt(dStr.split('-')[2])
            const isSunday = new Date(dStr).getDay() === 0
            const holiday = NATIONAL_HOLIDAYS[dStr]
            const rec = records.find(r => r.date === dStr)
            const isToday = dStr === todayIST
            const isFuture = dStr > todayIST

            let statusColor = 'transparent'
            let statusLabel = ''
            
            if (rec) {
              const typeInfo = ATTENDANCE_TYPES.find(t => t.value === rec.status)
              if (typeInfo) {
                statusColor = typeInfo.color
                statusLabel = typeInfo.label
              }
            } else if (holiday) {
              statusColor = '#a855f7'
              statusLabel = holiday
            } else if (isSunday) {
              statusColor = 'rgba(255,255,255,0.05)'
              statusLabel = 'Weekend'
            }

            return (
              <div 
                key={i} 
                onClick={() => {
                  if (!isFuture && !isSunday && !holiday) setMarkingDate(dStr)
                }}
                style={{
                  border: `1px solid ${isToday ? 'var(--brand-primary)' : 'var(--border-subtle)'}`,
                  background: rec ? `${statusColor}15` : 'rgba(255,255,255,0.02)',
                  borderRadius: '12px',
                  padding: '0.75rem',
                  minHeight: '100px',
                  cursor: (!isFuture && !isSunday && !holiday) ? 'pointer' : 'default',
                  opacity: isFuture ? 0.5 : 1,
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transition: 'all 0.2s ease',
                }}
                className={(!isFuture && !isSunday && !holiday) ? 'hover:border-[var(--brand-primary)]' : ''}
              >
                <span style={{ fontWeight: 800, fontSize: '1.2rem', color: isSunday ? '#ef4444' : isToday ? 'var(--brand-primary)' : 'inherit' }}>
                  {dayNum}
                </span>
                
                <div style={{ flex: 1 }} />
                
                {statusLabel ? (
                  <div style={{ fontSize: '0.65rem', fontWeight: 600, color: statusColor, background: `${statusColor}20`, padding: '4px 8px', borderRadius: '4px', textAlign: 'center', lineHeight: 1.2 }}>
                    {statusLabel}
                  </div>
                ) : (!isFuture && !isSunday && !holiday && dStr < todayIST) ? (
                  <div style={{ fontSize: '0.65rem', fontWeight: 600, color: '#ef4444', background: '#ef444420', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>
                    Absent
                  </div>
                ) : (!isFuture && !isSunday && !holiday && isToday) ? (
                  <div style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>
                    Click to mark
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>

      {/* Attendance Modal */}
      {markingDate && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
          <div className="glass-card" style={{ width: '100%', maxWidth: '400px', padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
              Mark Attendance
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              For {new Date(markingDate).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {ATTENDANCE_TYPES.filter(t => EMPLOYEE_SELECTABLE.includes(t.value)).map(type => (
                <button
                  key={type.value}
                  onClick={() => markAttendance(type.value)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem',
                    borderRadius: '12px', border: `1px solid ${type.color}40`,
                    background: `${type.color}10`, color: type.color,
                    fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                    textAlign: 'left'
                  }}
                  className="hover:brightness-125"
                >
                  {type.icon}
                  {type.label}
                </button>
              ))}
            </div>
            
            <button 
              className="btn btn-secondary" 
              style={{ width: '100%', marginTop: '1.5rem' }}
              onClick={() => setMarkingDate(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
