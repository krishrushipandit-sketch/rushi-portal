'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { Profile } from '@/lib/database.types'
import { formatDate, getStatusColor, getPriorityColor, isOverdue } from '@/lib/utils'
import {
  Plus, Search, Filter, Trash2, CheckCircle2, Clock, Edit3, X,
  AlertCircle, ChevronDown, Loader2, MessageSquarePlus, UserCheck, Send, CheckSquare
} from 'lucide-react'

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
  assigned_to_profile?: { id: string; full_name: string; email: string }
  assigned_by_profile?: { id: string; full_name: string; email: string }
  task_updates?: TaskUpdate[]
}

interface Employee { id: string; full_name: string; email: string }

const STATUS_OPTIONS = ['pending', 'in_progress', 'completed', 'cancelled']
const PRIORITY_OPTIONS = ['low', 'medium', 'high', 'urgent']

export default function TasksSection({ profile, initialTab = 'all' }: Props) {
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'all' | 'my-tasks' | 'assigned-by-me'>(initialTab)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState<Task | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const [form, setForm] = useState({
    title: '', description: '', assigned_to: '',
    task_type: 'assigned', priority: 'medium', deadline: '', notes: '',
  })
  const [updateComment, setUpdateComment] = useState('')
  const [updateProgress, setUpdateProgress] = useState(0)
  const [updateStatus, setUpdateStatus] = useState('')

  const getToken = () => typeof window !== 'undefined' ? (localStorage.getItem('rushi_token') || '') : ''

  // Sync tab if initialTab changes from parent navigation
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab)
    }
  }, [initialTab])

  const fetchTasks = useCallback(async () => {
    const token = getToken()
    if (!token) return
    const res = await fetch('/api/tasks', { headers: { Authorization: `Bearer ${token}` } })
    const data = await res.json()
    if (Array.isArray(data)) setTasks(data)
    setLoading(false)
  }, [])

  const fetchEmployees = useCallback(async () => {
    if (profile.role !== 'admin') return
    const token = getToken()
    if (!token) return
    const res = await fetch('/api/employees', { headers: { Authorization: `Bearer ${token}` } })
    const data = await res.json()
    if (Array.isArray(data)) setEmployees(data)
  }, [profile.role])

  useEffect(() => {
    fetchTasks()
    fetchEmployees()
  }, [fetchTasks, fetchEmployees])

  const handleCreateTask = async () => {
    if (!form.title) { alert('Please enter a task title'); return }
    if (!form.assigned_to) { alert('Please select an employee to assign this task to'); return }
    setSubmitting(true)
    const token = getToken()
    if (!token) { setSubmitting(false); return }

    const payload = {
      ...form,
      deadline: form.deadline ? `${form.deadline}:00+05:30` : null
    }

    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      })
      const data = await res.json()

      if (res.ok) {
        setShowModal(false)
        setForm({ title: '', description: '', assigned_to: '', task_type: 'assigned', priority: 'medium', deadline: '', notes: '' })
        fetchTasks()
      } else {
        alert('Failed to assign task: ' + (data.error || 'Unknown error'))
      }
    } catch (err: any) {
      alert('Error creating task: ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleStatusUpdate = async (taskId: string, status: string) => {
    const token = getToken()
    if (!token) return

    // Optimistic UI update for instant click response
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status } : t))

    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) {
        const data = await res.json()
        alert('Could not update status: ' + (data.error || 'Unknown error'))
      }
    } catch (err: any) {
      alert('Error updating status: ' + err.message)
    } finally {
      fetchTasks()
    }
  }

  const handleUpdateSubmit = async () => {
    if (!showUpdateModal) return
    setSubmitting(true)
    const token = getToken()
    if (!token) { setSubmitting(false); return }

    // 1. Insert a progress update into task_updates table
    await fetch(`/api/tasks/${showUpdateModal.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        comment: updateComment.trim() || `Progress updated to ${updateProgress}%`,
        progress_percent: updateProgress
      }),
    })

    // 2. PATCH the task status if it changed
    const newStatus = updateStatus || showUpdateModal.status
    await fetch(`/api/tasks/${showUpdateModal.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status: newStatus }),
    })

    setShowUpdateModal(null)
    setUpdateComment('')
    setUpdateProgress(0)
    setUpdateStatus('')
    fetchTasks()
    setSubmitting(false)
  }

  const handleDelete = async (taskId: string) => {
    if (!confirm('Delete this task? This cannot be undone.')) return
    const token = getToken()
    if (!token) return
    await fetch(`/api/tasks/${taskId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    fetchTasks()
  }

  // Count calculations for tabs
  const allTasksCount = tasks.length
  const myTasksCount = tasks.filter(t => t.assigned_to === profile.id).length
  const assignedByMeCount = tasks.filter(t => t.assigned_by === profile.id).length

  // Filter tasks by active tab
  const tabFilteredTasks = tasks.filter(t => {
    if (profile.role !== 'admin') return true // Regular employees already only receive their tasks
    if (activeTab === 'my-tasks') return t.assigned_to === profile.id
    if (activeTab === 'assigned-by-me') return t.assigned_by === profile.id
    return true // 'all'
  })

  // Filter tasks by search query, status, and type
  const filtered = tabFilteredTasks.filter(t => {
    const matchSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.assigned_to_profile?.full_name || '').toLowerCase().includes(searchQuery.toLowerCase())
    const matchStatus = filterStatus === 'all' || t.status === filterStatus
    const matchType = filterType === 'all' || t.task_type === filterType
    return matchSearch && matchStatus && matchType
  })

  if (loading) {
    return (
      <div>
        <div className="skeleton" style={{ height: '40px', marginBottom: '1rem' }} />
        {[1,2,3,4].map(i => <div key={i} className="skeleton" style={{ height: '72px', marginBottom: '8px' }} />)}
      </div>
    )
  }

  const getPageTitle = () => {
    if (profile.role !== 'admin') return 'My Tasks'
    if (activeTab === 'my-tasks') return 'My Assigned Tasks'
    if (activeTab === 'assigned-by-me') return 'Tasks Assigned by Me'
    return 'Task Management'
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="page-header" style={{ alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckSquare size={22} style={{ color: 'var(--brand-primary)' }} />
            {getPageTitle()}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            {filtered.length} task{filtered.length !== 1 ? 's' : ''} shown
          </p>
        </div>
        {profile.role === 'admin' && (
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={16} />
            Assign Task
          </button>
        )}
      </div>

      {/* Admin View Tabs (All Tasks / My Tasks / Assigned by Me) */}
      {profile.role === 'admin' && (
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '1.25rem',
          background: 'var(--bg-surface)',
          padding: '5px',
          borderRadius: '12px',
          border: '1px solid var(--border-subtle)',
          width: 'fit-content',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setActiveTab('all')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '0.84rem',
              fontWeight: activeTab === 'all' ? 700 : 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease',
              background: activeTab === 'all' ? 'linear-gradient(135deg, #10b981, #059669)' : 'transparent',
              color: activeTab === 'all' ? '#ffffff' : 'var(--text-secondary)',
              border: 'none',
              boxShadow: activeTab === 'all' ? '0 2px 8px rgba(16, 185, 129, 0.25)' : 'none'
            }}
          >
            <span>📋 All Company Tasks</span>
            <span style={{
              background: activeTab === 'all' ? 'rgba(255,255,255,0.25)' : 'var(--bg-elevated)',
              padding: '2px 7px',
              borderRadius: '10px',
              fontSize: '0.72rem',
              fontWeight: 700
            }}>
              {allTasksCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('my-tasks')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '0.84rem',
              fontWeight: activeTab === 'my-tasks' ? 700 : 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease',
              background: activeTab === 'my-tasks' ? 'linear-gradient(135deg, #10b981, #059669)' : 'transparent',
              color: activeTab === 'my-tasks' ? '#ffffff' : 'var(--text-secondary)',
              border: 'none',
              boxShadow: activeTab === 'my-tasks' ? '0 2px 8px rgba(16, 185, 129, 0.25)' : 'none'
            }}
          >
            <UserCheck size={14} />
            <span>My Tasks (Assigned to Me)</span>
            <span style={{
              background: activeTab === 'my-tasks' ? 'rgba(255,255,255,0.25)' : 'var(--bg-elevated)',
              padding: '2px 7px',
              borderRadius: '10px',
              fontSize: '0.72rem',
              fontWeight: 700,
              color: activeTab === 'my-tasks' ? '#ffffff' : (myTasksCount > 0 ? '#10b981' : 'var(--text-muted)')
            }}>
              {myTasksCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('assigned-by-me')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '0.84rem',
              fontWeight: activeTab === 'assigned-by-me' ? 700 : 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease',
              background: activeTab === 'assigned-by-me' ? 'linear-gradient(135deg, #10b981, #059669)' : 'transparent',
              color: activeTab === 'assigned-by-me' ? '#ffffff' : 'var(--text-secondary)',
              border: 'none',
              boxShadow: activeTab === 'assigned-by-me' ? '0 2px 8px rgba(16, 185, 129, 0.25)' : 'none'
            }}
          >
            <Send size={14} />
            <span>Assigned by Me</span>
            <span style={{
              background: activeTab === 'assigned-by-me' ? 'rgba(255,255,255,0.25)' : 'var(--bg-elevated)',
              padding: '2px 7px',
              borderRadius: '10px',
              fontSize: '0.72rem',
              fontWeight: 700
            }}>
              {assignedByMeCount}
            </span>
          </button>
        </div>
      )}

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <Search size={15} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
          <input
            className="form-input"
            placeholder="Search tasks, descriptions, or assignees..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>
        <select className="form-select" style={{ width: 'auto' }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="all">All Status</option>
          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
        </select>
        <select className="form-select" style={{ width: 'auto' }} value={filterType} onChange={e => setFilterType(e.target.value)}>
          <option value="all">All Types</option>
          <option value="assigned">Assigned</option>
          <option value="regular">Regular</option>
        </select>
      </div>

      {/* Task List */}
      <div className="glass-card" style={{ overflow: 'hidden' }}>
        {filtered.length === 0 ? (
          <div className="empty-state" style={{ padding: '3rem 1.5rem', textAlign: 'center' }}>
            <div className="empty-state-icon" style={{ margin: '0 auto 0.75rem' }}><CheckCircle2 size={28} /></div>
            <p style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}>
              {activeTab === 'my-tasks' ? 'No tasks assigned to you right now' : 'No tasks found'}
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '4px' }}>
              {activeTab === 'my-tasks'
                ? 'Tasks assigned to you will appear here with instant update controls.'
                : 'Try adjusting your filters or search query.'}
            </p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Task</th>
                  {profile.role === 'admin' && activeTab !== 'my-tasks' && <th>Assigned To</th>}
                  {activeTab === 'my-tasks' && <th>Assigned By</th>}
                  <th>Type</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Deadline</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(task => {
                  const overdue = isOverdue(task.deadline) && task.status !== 'completed' && task.status !== 'cancelled'
                  const isAssignedToMe = task.assigned_to === profile.id
                  return (
                    <tr key={task.id}>
                      <td style={{ maxWidth: '300px' }}>
                        <div>
                          <p style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-primary)' }}>{task.title}</p>
                          {task.description && (
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px', lineHeight: 1.4 }}>
                              {task.description.slice(0, 75)}{task.description.length > 75 ? '...' : ''}
                            </p>
                          )}
                          {/* Show latest progress update */}
                          {task.task_updates && task.task_updates.length > 0 && (() => {
                            const latest = [...task.task_updates].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0]
                            return (
                              <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <div style={{ width: '70px', height: '4px', borderRadius: '99px', background: 'var(--border-subtle)', flexShrink: 0 }}>
                                  <div style={{ height: '4px', borderRadius: '99px', width: `${latest.progress_percent}%`, background: latest.progress_percent >= 100 ? '#10b981' : '#6366f1', transition: 'width 0.3s' }} />
                                </div>
                                <span style={{ fontSize: '0.68rem', color: 'var(--brand-primary)', fontWeight: 700 }}>{latest.progress_percent}%</span>
                                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontStyle: 'italic', wordBreak: 'break-word', maxWidth: '280px' }} title={latest.comment}>"{latest.comment}"</span>
                              </div>
                            )
                          })()}
                        </div>
                      </td>

                      {profile.role === 'admin' && activeTab !== 'my-tasks' && (
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                              {task.assigned_to_profile?.full_name || 'Unassigned'}
                            </span>
                            {isAssignedToMe && (
                              <span style={{ fontSize: '0.65rem', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '1px 6px', borderRadius: '6px', fontWeight: 700 }}>
                                You
                              </span>
                            )}
                          </div>
                        </td>
                      )}

                      {activeTab === 'my-tasks' && (
                        <td>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            {task.assigned_by_profile?.full_name || 'Rushikesh Pandit'}
                          </p>
                        </td>
                      )}

                      <td>
                        <span className="badge" style={{
                          background: task.task_type === 'regular' ? 'rgba(100, 116, 139, 0.15)' : 'rgba(99, 102, 241, 0.1)',
                          color: task.task_type === 'regular' ? '#94a3b8' : '#818cf8',
                        }}>
                          {task.task_type}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${getStatusColor(task.status)}`}>
                          {task.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td>
                        <span style={{
                          fontSize: '0.8rem',
                          color: overdue ? '#ef4444' : 'var(--text-secondary)',
                          display: 'flex', alignItems: 'center', gap: '4px',
                        }}>
                          {overdue && <AlertCircle size={12} />}
                          {task.deadline
                            ? new Intl.DateTimeFormat('en-IN', {
                                day: '2-digit', month: 'short',
                                hour: '2-digit', minute: '2-digit', hour12: true,
                                timeZone: 'Asia/Kolkata'
                              }).format(new Date(task.deadline))
                            : '—'}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          {/* Progress update button: Available to the assignee (Shridhar/employee) or admin on their task */}
                          {(isAssignedToMe || profile.role === 'employee' || activeTab === 'my-tasks') && task.status !== 'completed' && (
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={() => {
                                setShowUpdateModal(task)
                                setUpdateStatus(task.status)
                              }}
                              title="Add progress update / notes"
                            >
                              <MessageSquarePlus size={14} />
                              <span style={{ fontSize: '0.72rem', marginLeft: '3px' }}>Progress</span>
                            </button>
                          )}
                          {/* Quick complete */}
                          {task.status !== 'completed' && task.status !== 'cancelled' && (
                            <button
                              className="btn btn-sm"
                              style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.2)' }}
                              onClick={() => handleStatusUpdate(task.id, 'completed')}
                              title="Mark complete"
                            >
                              <CheckCircle2 size={14} />
                            </button>
                          )}
                          {/* Admin: delete */}
                          {profile.role === 'admin' && (
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(task.id)}
                              title="Delete task"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ====== CREATE TASK MODAL ====== */}
      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal-content">
            <div className="modal-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Assign New Task</h3>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowModal(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Task Title *</label>
                <input className="form-input" placeholder="Enter task title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-textarea" placeholder="Detailed task description..." rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ resize: 'vertical' }} />
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Assign To *</label>
                  <select className="form-select" value={form.assigned_to} onChange={e => setForm({ ...form, assigned_to: e.target.value })}>
                    <option value="">Select team member</option>
                    {employees.map(e => (
                      <option key={e.id} value={e.id}>
                        {e.full_name} {e.id === profile.id ? '(You)' : ''}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Task Type</label>
                  <select className="form-select" value={form.task_type} onChange={e => setForm({ ...form, task_type: e.target.value })}>
                    <option value="assigned">Assigned (with reminder)</option>
                    <option value="regular">Regular Responsibility</option>
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
                <div style={{
                  padding: '0.75rem 1rem',
                  background: 'rgba(99, 102, 241, 0.06)',
                  border: '1px solid rgba(99, 102, 241, 0.15)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                }}>
                  WhatsApp reminder will be sent 1 hour before the deadline.
                </div>
              )}
              <div className="form-group">
                <label className="form-label">Notes</label>
                <textarea className="form-textarea" placeholder="Additional notes..." rows={2} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} style={{ resize: 'vertical' }} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button
                className="btn btn-primary"
                onClick={handleCreateTask}
                disabled={submitting || !form.title || !form.assigned_to}
              >
                {submitting ? <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Assigning...</> : 'Assign Task'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====== UPDATE PROGRESS MODAL ====== */}
      {showUpdateModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowUpdateModal(null)}>
          <div className="modal-content">
            <div className="modal-header">
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Update Task Progress</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>{showUpdateModal.title}</p>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowUpdateModal(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Status</label>
                <select className="form-select" value={updateStatus} onChange={e => setUpdateStatus(e.target.value)}>
                  {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Progress — {updateProgress}%</label>
                <input type="range" min={0} max={100} step={5} value={updateProgress} onChange={e => setUpdateProgress(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--brand-primary)' }} />
                <div className="progress-bar" style={{ marginTop: '0.5rem' }}>
                  <div className="progress-fill" style={{ width: `${updateProgress}%` }} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Progress Note *</label>
                <textarea className="form-textarea" placeholder="Describe what you've done..." rows={4}
                  value={updateComment} onChange={e => setUpdateComment(e.target.value)} style={{ resize: 'vertical' }} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowUpdateModal(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleUpdateSubmit} disabled={submitting}>
                {submitting ? <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Saving...</> : 'Save Update'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
