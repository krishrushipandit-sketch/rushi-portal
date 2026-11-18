'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import type { Profile } from '@/lib/database.types'
import { formatDate, isOverdue } from '@/lib/utils'
import {
  Plus, Trash2, CheckCircle2, X, AlertCircle, Loader2, UserCheck, Send, ListChecks, Search,
  ChevronRight, Play, Check, Clock, CircleDashed, Ban, ArrowUpRight,
} from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import GlowButton from '@/components/ui/GlowButton'
import Reveal from '@/components/ui/Reveal'
import Avatar from '@/components/ui/Avatar'
import Pill from '@/components/ui/Pill'
import SidePanel, { KeyValues, PanelSection } from '@/components/ui/SidePanel'

interface Props {
  profile: Profile
  initialTab?: 'all' | 'my-tasks' | 'assigned-by-me'
}

interface TaskUpdate {
  id: string
  comment: string
  progress_percent: number
  created_at: string
  updated_by: string
}

interface Task {
  id: string
  title: string
  description: string | null
  task_type: 'assigned' | 'regular'
  priority: string
  status: string
  deadline: string | null
  notes: string | null
  assigned_to: string | null
  assigned_by: string | null
  created_at: string
  reminder_sent: boolean
  assigned_to_profile?: { id: string; full_name: string; email: string; avatar_url?: string | null }
  assigned_by_profile?: { id: string; full_name: string; email?: string; avatar_url?: string | null }
  task_updates?: TaskUpdate[]
}

interface Employee { id: string; full_name: string; email: string }

const STATUS: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  pending: { label: 'Pending', color: '#8592a3', icon: <CircleDashed size={12} /> },
  in_progress: { label: 'In progress', color: '#2f9bff', icon: <Play size={12} /> },
  completed: { label: 'Completed', color: '#22c55e', icon: <CheckCircle2 size={12} /> },
  overdue: { label: 'Overdue', color: '#ef4757', icon: <AlertCircle size={12} /> },
  cancelled: { label: 'Cancelled', color: '#8592a3', icon: <Ban size={12} /> },
}
const PRIORITY: Record<string, string> = { low: '#8592a3', medium: '#f5a524', high: '#f0773a', urgent: '#ef4757' }
const STATUS_OPTIONS = ['pending', 'in_progress', 'completed', 'cancelled']
const PRIORITY_OPTIONS = ['low', 'medium', 'high', 'urgent']

const fmtDeadline = (d: string) => new Intl.DateTimeFormat('en-IN', {
  day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata',
}).format(new Date(d))

const latestUpdate = (t: Task) =>
  t.task_updates?.length ? [...t.task_updates].sort((a, b) => b.created_at.localeCompare(a.created_at))[0] : null

const isLate = (t: Task) => isOverdue(t.deadline) && t.status !== 'completed' && t.status !== 'cancelled'

// ─── Task panel ───────────────────────────────────────────────────────────
function TaskPanel({ task, profile, canUpdate, onClose, onChanged, onDelete, onQuickStatus }: {
  task: Task
  profile: Profile
  canUpdate: boolean
  onClose: () => void
  onChanged: () => void
  onDelete: () => void
  onQuickStatus: (status: string) => void
}) {
  const latest = latestUpdate(task)
  const [status, setStatus] = useState(task.status)
  const [progress, setProgress] = useState(latest?.progress_percent ?? 0)
  const [comment, setComment] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setStatus(task.status)
    setProgress(latestUpdate(task)?.progress_percent ?? 0)
  }, [task])

  const save = async () => {
    setSaving(true)
    const token = localStorage.getItem('rushi_token') || ''
    try {
      await fetch(`/api/tasks/${task.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ comment: comment.trim() || `Progress updated to ${progress}%`, progress_percent: progress }),
      })
      await fetch(`/api/tasks/${task.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      })
      setComment('')
      onChanged()
    } finally {
      setSaving(false)
    }
  }

  const st = STATUS[isLate(task) ? 'overdue' : task.status] ?? STATUS.pending
  const history = [...(task.task_updates ?? [])].sort((a, b) => b.created_at.localeCompare(a.created_at))
  const done = task.status === 'completed' || task.status === 'cancelled'

  return (
    <SidePanel
      open
      onClose={onClose}
      leading={<span className="drawer-icon" style={{ color: st.color, background: `color-mix(in srgb, ${st.color} 14%, transparent)`, boxShadow: `0 0 20px -6px ${st.color}` }}><ListChecks size={18} /></span>}
      title={<>{task.title}</>}
      subtitle={<>
        <Pill color={st.color} icon={st.icon}>{st.label}</Pill>
        <Pill color={PRIORITY[task.priority] ?? '#8592a3'} dot>{task.priority}</Pill>
        {task.deadline && <span style={{ color: isLate(task) ? 'var(--status-danger)' : undefined }}>Due {fmtDeadline(task.deadline)}</span>}
      </>}
      footer={canUpdate && !done ? (
        <button className="btn btn-primary" onClick={save} disabled={saving}>
          {saving ? <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> : <Send size={15} />}
          {saving ? 'Saving…' : 'Save progress'}
        </button>
      ) : undefined}
    >
      <div className="quick-actions">
        {!done && task.status !== 'in_progress' && (
          <button className="btn btn-secondary" onClick={() => onQuickStatus('in_progress')}><Play size={14} /> Start</button>
        )}
        {!done && (
          <button className="btn btn-secondary" style={{ color: 'var(--status-success)' }} onClick={() => onQuickStatus('completed')}><Check size={15} /> Mark complete</button>
        )}
        {task.status === 'completed' && (
          <button className="btn btn-secondary" onClick={() => onQuickStatus('in_progress')}><ArrowUpRight size={15} /> Reopen</button>
        )}
        {profile.role === 'admin' && <button className="btn btn-danger" onClick={onDelete}><Trash2 size={15} /> Delete</button>}
      </div>

      <KeyValues items={[
        { label: 'Assigned to', value: task.assigned_to_profile ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Avatar name={task.assigned_to_profile.full_name} src={task.assigned_to_profile.avatar_url} size="xs" />{task.assigned_to_profile.full_name}</span> : 'Unassigned' },
        { label: 'Assigned by', value: task.assigned_by_profile?.full_name ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Avatar name={task.assigned_by_profile.full_name} src={task.assigned_by_profile.avatar_url} size="xs" />{task.assigned_by_profile.full_name}</span> : '—' },
        { label: 'Type', value: task.task_type === 'regular' ? 'Regular responsibility' : 'Assigned task' },
        { label: 'Created', value: formatDate(task.created_at, 'dd MMM yyyy') },
        { label: 'Deadline', value: task.deadline ? fmtDeadline(task.deadline) : '—' },
        { label: 'Progress', value: `${latest?.progress_percent ?? 0}%` },
      ]} />

      {task.description && (
        <PanelSection title="Description">
          <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>{task.description}</p>
        </PanelSection>
      )}
      {task.notes && <div className="note-box"><Clock size={14} /><span>{task.notes}</span></div>}

      {canUpdate && !done && (
        <PanelSection title="Update progress">
          <div className="form-group">
            <label className="form-label">Status</label>
            <div className="segmented" style={{ alignSelf: 'flex-start' }}>
              {STATUS_OPTIONS.map(s => (
                <button key={s} className={status === s ? 'active' : ''} onClick={() => setStatus(s)}>{STATUS[s].label}</button>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Progress</span><span className="tabular" style={{ color: 'var(--brand-primary)', fontWeight: 650 }}>{progress}%</span>
            </label>
            <input type="range" min={0} max={100} step={5} value={progress} onChange={e => setProgress(Number(e.target.value))} className="range" aria-label="Progress percent" />
          </div>
          <div className="form-group">
            <label className="form-label">What did you do?</label>
            <textarea className="form-textarea" rows={3} value={comment} onChange={e => setComment(e.target.value)} placeholder="Describe the progress since the last update…" />
          </div>
        </PanelSection>
      )}

      <PanelSection title="Progress history" aside={history.length > 0 && <span style={{ fontSize: '0.72rem', color: 'var(--text-faint)' }}>{history.length} updates</span>}>
        {history.length === 0 ? (
          <div className="empty-inline">No progress updates yet</div>
        ) : (
          <ul className="timeline">
            {history.map(u => (
              <li key={u.id} style={{ '--tone': u.progress_percent >= 100 ? '#22c55e' : '#2f9bff' } as React.CSSProperties}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="tabular" style={{ fontWeight: 650, fontSize: '0.8125rem' }}>{u.progress_percent}%</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{formatDate(u.created_at, 'dd MMM, hh:mm a')}</span>
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: 3 }}>{u.comment}</p>
              </li>
            ))}
          </ul>
        )}
      </PanelSection>
    </SidePanel>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────
export default function TasksSection({ profile, initialTab = 'all' }: Props) {
  const isAdmin = profile.role === 'admin'
  const [tasks, setTasks] = useState<Task[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'all' | 'my-tasks' | 'assigned-by-me'>(initialTab)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [openTaskId, setOpenTaskId] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const emptyForm = { title: '', description: '', assigned_to: '', task_type: 'assigned', priority: 'medium', deadline: '', notes: '' }
  const [form, setForm] = useState(emptyForm)

  const token = () => localStorage.getItem('rushi_token') || ''

  useEffect(() => { setActiveTab(initialTab) }, [initialTab])

  const fetchTasks = useCallback(async () => {
    const t = localStorage.getItem('rushi_token')
    if (!t) return
    const res = await fetch('/api/tasks', { headers: { Authorization: `Bearer ${t}` } })
    const data = await res.json()
    if (Array.isArray(data)) setTasks(data)
    setLoading(false)
  }, [])

  const fetchEmployees = useCallback(async () => {
    if (!isAdmin) return
    const t = localStorage.getItem('rushi_token')
    if (!t) return
    const res = await fetch('/api/employees', { headers: { Authorization: `Bearer ${t}` } })
    const data = await res.json()
    if (Array.isArray(data)) setEmployees(data)
  }, [isAdmin])

  useEffect(() => {
    fetchTasks()
    fetchEmployees()
  }, [fetchTasks, fetchEmployees])

  const handleCreateTask = async () => {
    if (!form.title || !form.assigned_to) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
        body: JSON.stringify({ ...form, deadline: form.deadline ? `${form.deadline}:00+05:30` : null }),
      })
      const data = await res.json()
      if (!res.ok) return alert('Failed to assign task: ' + (data.error || 'Unknown error'))
      setShowModal(false)
      setForm(emptyForm)
      fetchTasks()
    } catch (err) {
      alert('Error creating task: ' + (err as Error).message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleStatusUpdate = async (taskId: string, status: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status } : t))
    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        alert('Could not update status: ' + (data.error || 'Unknown error'))
      }
    } finally {
      fetchTasks()
    }
  }

  const handleDelete = async (taskId: string) => {
    if (!confirm('Delete this task? This cannot be undone.')) return
    await fetch(`/api/tasks/${taskId}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token()}` } })
    setOpenTaskId(null)
    fetchTasks()
  }

  const counts = {
    all: tasks.length,
    mine: tasks.filter(t => t.assigned_to === profile.id).length,
    byMe: tasks.filter(t => t.assigned_by === profile.id).length,
  }

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase()
    return tasks.filter(t => {
      if (isAdmin && activeTab === 'my-tasks' && t.assigned_to !== profile.id) return false
      if (isAdmin && activeTab === 'assigned-by-me' && t.assigned_by !== profile.id) return false
      if (q && !(t.title.toLowerCase().includes(q) || (t.description || '').toLowerCase().includes(q) || (t.assigned_to_profile?.full_name || '').toLowerCase().includes(q))) return false
      if (filterStatus === 'overdue') return isLate(t)
      if (filterStatus !== 'all' && t.status !== filterStatus) return false
      if (filterType !== 'all' && t.task_type !== filterType) return false
      return true
    }).sort((a, b) => {
      const rank = (t: Task) => (t.status === 'completed' || t.status === 'cancelled' ? 2 : isLate(t) ? 0 : 1)
      return rank(a) - rank(b) || (a.deadline ?? '9').localeCompare(b.deadline ?? '9')
    })
  }, [tasks, searchQuery, filterStatus, filterType, activeTab, isAdmin, profile.id])

  const openTask = tasks.find(t => t.id === openTaskId) || null
  const showAssignee = isAdmin && activeTab !== 'my-tasks'
  const cols = showAssignee
    ? 'minmax(220px, 2.4fr) minmax(130px, 1.1fr) 92px 120px minmax(120px, 1fr) 110px 34px 14px'
    : 'minmax(220px, 2.4fr) 92px 120px minmax(120px, 1fr) 110px 34px 14px'

  const title = !isAdmin ? 'My Tasks' : activeTab === 'my-tasks' ? 'My Tasks' : activeTab === 'assigned-by-me' ? 'Assigned by Me' : 'Task Management'
  const overdueCount = tasks.filter(isLate).length
  const openCount = tasks.filter(t => t.status !== 'completed' && t.status !== 'cancelled').length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <PageHeader
        eyebrow={`${openCount} open · ${overdueCount} overdue`}
        title={title}
        description="Click a task to see details, post a progress update or mark it done."
        actions={isAdmin ? <GlowButton onClick={() => setShowModal(true)}><Plus size={15} /> Assign task</GlowButton> : undefined}
      />

      <Reveal>
        <section className="card list">
          <div className="list-toolbar">
            {isAdmin && (
              <div className="segmented" role="tablist">
                {([
                  { id: 'all', label: 'All tasks', count: counts.all, icon: <ListChecks size={13} /> },
                  { id: 'my-tasks', label: 'Assigned to me', count: counts.mine, icon: <UserCheck size={13} /> },
                  { id: 'assigned-by-me', label: 'Assigned by me', count: counts.byMe, icon: <Send size={13} /> },
                ] as const).map(t => (
                  <button key={t.id} role="tab" aria-selected={activeTab === t.id} className={activeTab === t.id ? 'active' : ''} onClick={() => setActiveTab(t.id)}>
                    {t.icon}{t.label}<span className="tabular" style={{ color: 'var(--text-faint)' }}>{t.count}</span>
                  </button>
                ))}
              </div>
            )}
            <div className="input-icon">
              <Search size={14} />
              <input className="form-input" placeholder="Search tasks or people…" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            <select className="form-select" style={{ width: 'auto' }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)} aria-label="Status">
              <option value="all">All statuses</option>
              <option value="overdue">Overdue</option>
              {STATUS_OPTIONS.map(s => <option key={s} value={s}>{STATUS[s].label}</option>)}
            </select>
            <select className="form-select" style={{ width: 'auto' }} value={filterType} onChange={e => setFilterType(e.target.value)} aria-label="Type">
              <option value="all">All types</option>
              <option value="assigned">Assigned</option>
              <option value="regular">Regular</option>
            </select>
          </div>

          {loading ? (
            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[1, 2, 3, 4].map(i => <div key={i} className="skeleton" style={{ height: 52 }} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon"><CheckCircle2 size={20} /></div>
              <p style={{ fontWeight: 550, color: 'var(--text-secondary)' }}>{activeTab === 'my-tasks' ? 'Nothing assigned to you right now' : 'No tasks found'}</p>
              <p style={{ fontSize: '0.8rem' }}>{searchQuery || filterStatus !== 'all' || filterType !== 'all' ? 'Try adjusting your filters.' : 'New tasks will show up here.'}</p>
            </div>
          ) : (
            <div role="list">
              <div className="list-head" style={{ '--cols': cols } as React.CSSProperties}>
                <span>Task</span>{showAssignee && <span>Assignee</span>}<span>Priority</span><span>Status</span><span>Deadline</span><span>Progress</span><span /><span />
              </div>
              {filtered.map(task => {
                const late = isLate(task)
                const st = STATUS[late ? 'overdue' : task.status] ?? STATUS.pending
                const pct = latestUpdate(task)?.progress_percent ?? (task.status === 'completed' ? 100 : 0)
                const done = task.status === 'completed' || task.status === 'cancelled'
                return (
                  <div
                    key={task.id}
                    role="listitem"
                    tabIndex={0}
                    className={`list-row ${openTaskId === task.id ? 'selected' : ''}`}
                    style={{ '--cols': cols } as React.CSSProperties}
                    onClick={() => setOpenTaskId(task.id)}
                    onKeyDown={e => { if (e.key === 'Enter') setOpenTaskId(task.id) }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <div className="row-title" style={done ? { color: 'var(--text-muted)', textDecoration: 'line-through' } : undefined}>{task.title}</div>
                      <div className="row-sub">{task.description || (task.task_type === 'regular' ? 'Regular responsibility' : 'Assigned task')}</div>
                    </div>
                    {showAssignee && (
                      <div className="row-main col-hide-sm" style={{ gap: '0.5rem' }}>
                        <Avatar name={task.assigned_to_profile?.full_name || '?'} src={task.assigned_to_profile?.avatar_url} size="xs" />
                        <span className="row-cell">{task.assigned_to_profile?.full_name || 'Unassigned'}{task.assigned_to === profile.id ? ' (you)' : ''}</span>
                      </div>
                    )}
                    <span className="col-hide-sm"><Pill color={PRIORITY[task.priority] ?? '#8592a3'} dot>{task.priority}</Pill></span>
                    <span><Pill color={st.color} icon={st.icon}>{st.label}</Pill></span>
                    <span className="row-cell col-hide-sm tabular" style={{ color: late ? 'var(--status-danger)' : undefined, fontWeight: late ? 600 : undefined }}>
                      {task.deadline ? fmtDeadline(task.deadline) : '—'}
                    </span>
                    <div className="col-hide-sm" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="progress-bar" style={{ height: 5, flex: 1 }}>
                        <div className="progress-fill" style={{ width: `${pct}%`, background: pct >= 100 ? 'var(--status-success)' : 'var(--brand-gradient)' }} />
                      </div>
                      <span className="tabular" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', width: 30, textAlign: 'right' }}>{pct}%</span>
                    </div>
                    <span className="col-hide-sm" onClick={e => e.stopPropagation()}>
                      {!done && (
                        <button className="icon-btn" title="Mark complete" aria-label="Mark complete" style={{ color: 'var(--status-success)' }} onClick={() => handleStatusUpdate(task.id, 'completed')}>
                          <CheckCircle2 size={17} />
                        </button>
                      )}
                    </span>
                    <ChevronRight size={16} className="row-chevron col-hide-sm" />
                  </div>
                )
              })}
              <div className="list-foot"><span>{filtered.length} task{filtered.length === 1 ? '' : 's'}</span></div>
            </div>
          )}
        </section>
      </Reveal>

      {openTask && (
        <TaskPanel
          task={openTask}
          profile={profile}
          canUpdate={openTask.assigned_to === profile.id || !isAdmin}
          onClose={() => setOpenTaskId(null)}
          onChanged={fetchTasks}
          onDelete={() => handleDelete(openTask.id)}
          onQuickStatus={s => handleStatusUpdate(openTask.id, s)}
        />
      )}

      {showModal && (
        <div className="modal-overlay" onMouseDown={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal-content">
            <div className="modal-header">
              <h3>Assign new task</h3>
              <button className="icon-btn" onClick={() => setShowModal(false)} aria-label="Close"><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Task title *</label>
                <input className="form-input" placeholder="What needs to be done?" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-textarea" placeholder="Details, links, expectations…" rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Assign to *</label>
                  <select className="form-select" value={form.assigned_to} onChange={e => setForm({ ...form, assigned_to: e.target.value })}>
                    <option value="">Select team member</option>
                    {employees.map(e => <option key={e.id} value={e.id}>{e.full_name}{e.id === profile.id ? ' (you)' : ''}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Task type</label>
                  <select className="form-select" value={form.task_type} onChange={e => setForm({ ...form, task_type: e.target.value })}>
                    <option value="assigned">Assigned (with reminder)</option>
                    <option value="regular">Regular responsibility</option>
                  </select>
                </div>
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Priority</label>
                  <select className="form-select" value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
                    {PRIORITY_OPTIONS.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Deadline</label>
                  <input className="form-input" type="datetime-local" value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} />
                </div>
              </div>
              {form.task_type === 'assigned' && (
                <div className="hint-box" style={{ '--tone': 'var(--status-info)' } as React.CSSProperties}>
                  <Clock size={15} /><div><p style={{ marginTop: 0 }}>A WhatsApp reminder is sent 1 hour before the deadline.</p></div>
                </div>
              )}
              <div className="form-group">
                <label className="form-label">Notes</label>
                <textarea className="form-textarea" placeholder="Additional notes…" rows={2} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleCreateTask} disabled={submitting || !form.title || !form.assigned_to}>
                {submitting ? <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Assigning…</> : 'Assign task'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
