'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { Profile } from '@/lib/database.types'
import { getInitials } from '@/lib/utils'
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, User, Phone, Mail, Camera, Loader2, Plus, Trash2, ClipboardList, Pencil, Check, X } from 'lucide-react'

interface SettingsSectionProps {
  profile: Profile
}

export default function SettingsSection({ profile }: SettingsSectionProps) {
  const router = useRouter()
  // ── Password change state ──────────────────────────────────────────────────
  const [currentPwd, setCurrentPwd]     = useState('')
  const [newPwd, setNewPwd]             = useState('')
  const [confirmPwd, setConfirmPwd]     = useState('')
  const [showCurrent, setShowCurrent]   = useState(false)
  const [showNew, setShowNew]           = useState(false)
  const [showConfirm, setShowConfirm]   = useState(false)
  const [pwdLoading, setPwdLoading]     = useState(false)
  const [pwdSuccess, setPwdSuccess]     = useState(false)
  const [pwdError, setPwdError]         = useState('')

  // ── Profile update state ───────────────────────────────────────────────────
  const [phone, setPhone]               = useState(profile.phone || '')
  const [avatarUrl, setAvatarUrl]       = useState(profile.avatar_url || '')
  const [avatarLoading, setAvatarLoading] = useState(false)
  const [profileLoading, setProfileLoading] = useState(false)
  const [profileSuccess, setProfileSuccess] = useState(false)
  const [profileError, setProfileError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // ── Fixed Daily Reporting Tasks state ────────────────────────────────────────────────
  const [fixedTasks, setFixedTasks] = useState<{ id: string; title: string; daily_target?: number | null }[]>([])
  const [newFixedTask, setNewFixedTask] = useState('')
  const [newFixedTarget, setNewFixedTarget] = useState('')
  const [fixedTasksLoading, setFixedTasksLoading] = useState(true)
  const [fixedTaskAdding, setFixedTaskAdding] = useState(false)
  const [fixedTaskError, setFixedTaskError] = useState('')
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState('')
  const [editingTarget, setEditingTarget] = useState('')
  const [editingSaving, setEditingSaving] = useState(false)

  const loadFixedTasks = useCallback(async () => {
    const token = localStorage.getItem('rushi_token')
    if (!token) return
    try {
      const res = await fetch('/api/responsibilities', { headers: { Authorization: `Bearer ${token}` } })
      const d = await res.json()
      if (Array.isArray(d)) {
        setFixedTasks(d)
      }
    } catch {} finally {
      setFixedTasksLoading(false)
    }
  }, [])

  useEffect(() => {
    loadFixedTasks()
  }, [loadFixedTasks])

  const handleAvatarFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setAvatarLoading(true)
    setProfileError('')

    const token = localStorage.getItem('rushi_token')
    if (!token) { router.push('/'); return }

    try {
      const fd = new FormData()
      fd.append('file', file)
      const upRes = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd
      })
      const upData = await upRes.json()
      if (!upRes.ok) throw new Error(upData.error || 'Photo upload failed')

      const newAvatarUrl = upData.url
      setAvatarUrl(newAvatarUrl)

      // Save to employee profile
      await fetch(`/api/employees/${profile.id}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatar_url: newAvatarUrl })
      })

      // Update user in localStorage
      try {
        const saved = JSON.parse(localStorage.getItem('rushi_user') || '{}')
        localStorage.setItem('rushi_user', JSON.stringify({ ...saved, avatar_url: newAvatarUrl }))
      } catch {}

      setProfileSuccess(true)
    } catch (err: any) {
      setProfileError(err.message || 'Failed to update photo')
    } finally {
      setAvatarLoading(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setPwdError('')
    setPwdSuccess(false)

    if (!currentPwd || !newPwd || !confirmPwd) {
      setPwdError('All fields are required.')
      return
    }
    if (newPwd.length < 8) {
      setPwdError('New password must be at least 8 characters.')
      return
    }
    if (newPwd !== confirmPwd) {
      setPwdError('New password and confirm password do not match.')
      return
    }

    setPwdLoading(true)

    const token = localStorage.getItem('rushi_token')
    if (!token) { router.push('/'); return }

    try {
      const res = await fetch(`/api/employees/${profile.id}`, {
        method: 'PATCH',
        headers: { 
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ currentPassword: currentPwd, password: newPwd })
      })

      const data = await res.json()
      if (!res.ok) {
        setPwdError(data.error || 'Failed to update password')
      } else {
        setPwdSuccess(true)
        setCurrentPwd('')
        setNewPwd('')
        setConfirmPwd('')
      }
    } catch (err: any) {
      setPwdError(err.message || 'Failed to update password')
    }

    setPwdLoading(false)
  }

  const handleUpdatePhone = async (e: React.FormEvent) => {
    e.preventDefault()
    setProfileError('')
    setProfileSuccess(false)
    setProfileLoading(true)

    const token = localStorage.getItem('rushi_token')
    if (!token) { router.push('/'); return }

    try {
      const res = await fetch(`/api/employees/${profile.id}`, {
        method: 'PATCH',
        headers: { 
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ phone: phone.trim() })
      })

      const data = await res.json()
      if (!res.ok) {
        setProfileError(data.error || 'Failed to update phone number')
      } else {
        setProfileSuccess(true)
      }
    } catch (err: any) {
      setProfileError(err.message || 'Failed to update phone number')
    }
    
    setProfileLoading(false)
  }

  const strengthScore = (pwd: string) => {
    let score = 0
    if (pwd.length >= 8) score++
    if (/[A-Z]/.test(pwd)) score++
    if (/[0-9]/.test(pwd)) score++
    if (/[^A-Za-z0-9]/.test(pwd)) score++
    return score
  }

  const score = strengthScore(newPwd)
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][score] || ''
  const strengthColor = ['', '#ef4444', '#f59e0b', '#3b82f6', '#22c55e'][score] || ''

  const handleAddFixedTask = async () => {
    const title = newFixedTask.trim()
    if (!title) return
    setFixedTaskAdding(true)
    setFixedTaskError('')
    const token = localStorage.getItem('rushi_token')
    if (!token) return
    try {
      const res = await fetch('/api/responsibilities', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          daily_target: newFixedTarget ? Number(newFixedTarget) : null
        })
      })
      const data = await res.json()
      if (!res.ok) {
        setFixedTaskError(data.error || 'Failed to add task')
      } else {
        setFixedTasks(prev => [...prev, data])
        setNewFixedTask('')
        setNewFixedTarget('')
      }
    } catch {
      setFixedTaskError('Network error. Please try again.')
    } finally {
      setFixedTaskAdding(false)
    }
  }

  const handleStartEdit = (task: { id: string; title: string; daily_target?: number | null }) => {
    setEditingTaskId(task.id)
    setEditingTitle(task.title)
    setEditingTarget(task.daily_target ? String(task.daily_target) : '')
    setFixedTaskError('')
  }

  const handleSaveEdit = async () => {
    if (!editingTaskId || !editingTitle.trim()) return
    setEditingSaving(true)
    const token = localStorage.getItem('rushi_token')
    if (!token) return
    try {
      const res = await fetch('/api/responsibilities', {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingTaskId,
          title: editingTitle.trim(),
          daily_target: editingTarget ? Number(editingTarget) : null
        })
      })
      const data = await res.json()
      if (res.ok) {
        setFixedTasks(prev => prev.map(t => t.id === editingTaskId ? { ...t, title: data.title, daily_target: data.daily_target } : t))
        setEditingTaskId(null)
      } else {
        setFixedTaskError(data.error || 'Failed to update task')
      }
    } catch {
      setFixedTaskError('Failed to save update')
    } finally {
      setEditingSaving(false)
    }
  }

  const handleDeleteFixedTask = async (id: string) => {
    const token = localStorage.getItem('rushi_token')
    if (!token) return
    try {
      await fetch(`/api/responsibilities?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      fetch(`/api/fixed-tasks?id=${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } }).catch(() => {})
      setFixedTasks(prev => prev.filter(t => t.id !== id))
    } catch {}
  }

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 0.5rem' }}>
      {/* Page header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Account Settings
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
          Manage your profile and security preferences
        </p>
      </div>

      {/* ── Profile info card ───────────────────────────────────────────────── */}
      <div className="card" style={{ marginBottom: '1.5rem', padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          {/* Profile photo or initials with Camera Upload Button */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={profile.full_name}
                style={{
                  width: '76px', height: '76px', borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid var(--border-default)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                }}
              />
            ) : (
              <div style={{
                width: '76px', height: '76px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #10b981, #047857)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.5rem', fontWeight: 800, color: 'white',
                border: '3px solid var(--border-default)',
                boxShadow: '0 4px 12px rgba(16,185,129,0.3)',
                letterSpacing: '0.05em',
              }}>
                {getInitials(profile.full_name)}
              </div>
            )}

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarFile}
              accept="image/*"
              style={{ display: 'none' }}
            />

            {/* Camera Upload Trigger */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={avatarLoading}
              title="Upload Profile Photo"
              style={{
                position: 'absolute', bottom: '-2px', right: '-2px',
                width: '28px', height: '28px', borderRadius: '50%',
                background: 'var(--brand-primary)', color: '#ffffff',
                border: '2px solid var(--bg-surface)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                transition: 'transform 0.15s'
              }}
            >
              {avatarLoading ? <Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} /> : <Camera size={13} />}
            </button>
          </div>
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              {profile.full_name}
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.15rem 0 0', textTransform: 'capitalize' }}>
              {profile.role === 'admin' ? 'Administrator' : (profile.designation || 'Employee')}
            </p>
            <p style={{ fontSize: '0.75rem', color: 'var(--brand-primary)', margin: '0.25rem 0 0', fontWeight: 500 }}>
              Profile Info
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {/* Name (read-only) */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.375rem' }}>
              Full Name
            </label>
            <div style={{
              padding: '0.625rem 0.875rem',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-muted)',
              fontSize: '0.875rem',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <User size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              {profile.full_name}
            </div>
          </div>

          {/* Email (read-only) */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.375rem' }}>
              Email
            </label>
            <div style={{
              padding: '0.625rem 0.875rem',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-muted)',
              fontSize: '0.875rem',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <Mail size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              {profile.email}
            </div>
          </div>

          {/* Phone (editable) */}
          <form onSubmit={handleUpdatePhone}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.375rem' }}>
              WhatsApp / Phone Number
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Phone size={14} style={{
                  position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)',
                  color: 'var(--text-muted)', pointerEvents: 'none',
                }} />
                <input
                  type="tel"
                  className="form-input"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                  style={{ paddingLeft: '2.25rem' }}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={profileLoading}
                style={{ whiteSpace: 'nowrap', padding: '0 1rem' }}
              >
                {profileLoading ? 'Saving…' : 'Save'}
              </button>
            </div>
            {profileSuccess && (
              <p style={{ fontSize: '0.8rem', color: '#22c55e', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.5rem' }}>
                <CheckCircle size={13} /> Phone number updated successfully!
              </p>
            )}
            {profileError && (
              <p style={{ fontSize: '0.8rem', color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.5rem' }}>
                <AlertCircle size={13} /> {profileError}
              </p>
            )}
          </form>
        </div>
      </div>

      {/* ── Change Password card ─────────────────────────────────────────────── */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Lock size={22} color="white" />
          </div>
          <div>
            <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
              Change Password
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
              Choose a strong password with at least 8 characters
            </p>
          </div>
        </div>

        <form onSubmit={handleChangePassword} style={{ display: 'grid', gap: '1rem' }}>
          {/* Current Password */}
          <div>
            <label className="form-label">Current Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={14} style={{
                position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)',
                color: 'var(--text-muted)', pointerEvents: 'none',
              }} />
              <input
                type={showCurrent ? 'text' : 'password'}
                className="form-input"
                value={currentPwd}
                onChange={e => setCurrentPwd(e.target.value)}
                placeholder="Enter your current password"
                autoComplete="current-password"
                style={{ paddingLeft: '2.25rem', paddingRight: '2.5rem' }}
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                style={{
                  position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--text-muted)', padding: 0, display: 'flex',
                }}
              >
                {showCurrent ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="form-label">New Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={14} style={{
                position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)',
                color: 'var(--text-muted)', pointerEvents: 'none',
              }} />
              <input
                type={showNew ? 'text' : 'password'}
                className="form-input"
                value={newPwd}
                onChange={e => setNewPwd(e.target.value)}
                placeholder="Minimum 8 characters"
                autoComplete="new-password"
                style={{ paddingLeft: '2.25rem', paddingRight: '2.5rem' }}
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                style={{
                  position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--text-muted)', padding: 0, display: 'flex',
                }}
              >
                {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            {/* Strength meter */}
            {newPwd.length > 0 && (
              <div style={{ marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '0.25rem' }}>
                  {[1,2,3,4].map(i => (
                    <div key={i} style={{
                      flex: 1, height: '4px', borderRadius: '2px',
                      background: i <= score ? strengthColor : 'var(--border-default)',
                      transition: 'background 0.3s',
                    }} />
                  ))}
                </div>
                <p style={{ fontSize: '0.72rem', color: strengthColor, fontWeight: 600 }}>
                  {strengthLabel}
                </p>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="form-label">Confirm New Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={14} style={{
                position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)',
                color: 'var(--text-muted)', pointerEvents: 'none',
              }} />
              <input
                type={showConfirm ? 'text' : 'password'}
                className="form-input"
                value={confirmPwd}
                onChange={e => setConfirmPwd(e.target.value)}
                placeholder="Re-enter new password"
                autoComplete="new-password"
                style={{
                  paddingLeft: '2.25rem', paddingRight: '2.5rem',
                  borderColor: confirmPwd && confirmPwd !== newPwd ? 'var(--danger)' : undefined,
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                style={{
                  position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--text-muted)', padding: 0, display: 'flex',
                }}
              >
                {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {confirmPwd && confirmPwd !== newPwd && (
              <p style={{ fontSize: '0.75rem', color: 'var(--danger)', marginTop: '0.35rem' }}>
                Passwords do not match
              </p>
            )}
          </div>

          {/* Feedback */}
          {pwdError && (
            <div style={{
              padding: '0.75rem 1rem', background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)', borderRadius: 'var(--radius-md)',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              color: '#ef4444', fontSize: '0.85rem',
            }}>
              <AlertCircle size={15} /> {pwdError}
            </div>
          )}
          {pwdSuccess && (
            <div style={{
              padding: '0.75rem 1rem', background: 'rgba(34,197,94,0.1)',
              border: '1px solid rgba(34,197,94,0.3)', borderRadius: 'var(--radius-md)',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              color: '#22c55e', fontSize: '0.85rem',
            }}>
              <CheckCircle size={15} /> Password changed successfully! Please remember your new password.
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={pwdLoading || !currentPwd || !newPwd || !confirmPwd || newPwd !== confirmPwd}
            style={{ marginTop: '0.25rem', padding: '0.75rem', fontWeight: 600 }}
          >
            {pwdLoading ? 'Updating Password...' : 'Update Password'}
          </button>
        </form>
      </div>

      {/* ── Daily Report Format & Tasks card ──────────────────────────────────────────── */}
      <div className="card" style={{ marginBottom: '1.5rem', padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem' }}>
          <ClipboardList size={18} style={{ color: '#10b981', flexShrink: 0 }} />
          <div>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              My Daily Report Format (Fixed Tasks)
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '2px' }}>
              These tasks appear in your daily report form every day. You can add new tasks, edit existing tasks, or delete tasks you don't need.
            </p>
          </div>
        </div>

        {/* Add new task form */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <input
            type="text"
            className="form-input"
            placeholder="New task name (e.g. Daily Client Follow-up, Reels Editing...)"
            value={newFixedTask}
            onChange={e => { setNewFixedTask(e.target.value); setFixedTaskError('') }}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddFixedTask() } }}
            style={{ flex: '1 1 240px', fontSize: '0.85rem' }}
            maxLength={120}
          />
          <input
            type="number"
            min="0"
            className="form-input"
            placeholder="Target/day (opt)"
            value={newFixedTarget}
            onChange={e => setNewFixedTarget(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddFixedTask() } }}
            style={{ width: '110px', fontSize: '0.85rem', textAlign: 'center' }}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddFixedTask}
            disabled={fixedTaskAdding || !newFixedTask.trim()}
            style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, whiteSpace: 'nowrap' }}
          >
            {fixedTaskAdding ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Plus size={14} />}
            Add Task
          </button>
        </div>

        {fixedTaskError && (
          <p style={{ color: '#ef4444', fontSize: '0.8rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <AlertCircle size={13} /> {fixedTaskError}
          </p>
        )}

        {/* List of daily reporting tasks */}
        {fixedTasksLoading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="skeleton" style={{ height: '44px', borderRadius: '8px' }} />
            ))}
          </div>
        ) : fixedTasks.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '2rem 1rem',
            border: '1.5px dashed var(--border-default)', borderRadius: '10px',
            color: 'var(--text-muted)', fontSize: '0.85rem'
          }}>
            <ClipboardList size={28} style={{ opacity: 0.3, marginBottom: '8px' }} />
            <p style={{ margin: 0, fontWeight: 600 }}>No daily tasks configured</p>
            <p style={{ margin: '4px 0 0', fontSize: '0.78rem', opacity: 0.7 }}>Add tasks above to define your daily report structure.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {fixedTasks.map((task, idx) => {
              const isEditing = editingTaskId === task.id

              return (
                <div
                  key={task.id}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.625rem',
                    padding: '0.625rem 0.875rem',
                    background: 'var(--bg-card)', border: '1px solid var(--border-default)',
                    borderRadius: '8px', flexWrap: 'wrap'
                  }}
                >
                  <span style={{
                    width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0,
                    background: 'rgba(16,185,129,0.15)', color: '#10b981',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.72rem', fontWeight: 700
                  }}>
                    {idx + 1}
                  </span>

                  {isEditing ? (
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '6px', minWidth: '220px' }}>
                      <input
                        type="text"
                        className="form-input"
                        value={editingTitle}
                        onChange={e => setEditingTitle(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') handleSaveEdit() }}
                        style={{ flex: 1, fontSize: '0.85rem', padding: '4px 8px' }}
                        autoFocus
                      />
                      <input
                        type="number"
                        min="0"
                        className="form-input"
                        placeholder="Target"
                        value={editingTarget}
                        onChange={e => setEditingTarget(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') handleSaveEdit() }}
                        style={{ width: '80px', fontSize: '0.85rem', padding: '4px 8px', textAlign: 'center' }}
                      />
                      <button
                        type="button"
                        onClick={handleSaveEdit}
                        disabled={editingSaving || !editingTitle.trim()}
                        style={{
                          background: '#10b981', color: 'white', border: 'none',
                          borderRadius: '5px', padding: '5px 8px', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.75rem', fontWeight: 600
                        }}
                        title="Save Changes"
                      >
                        {editingSaving ? <Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} /> : <Check size={13} />}
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingTaskId(null)}
                        style={{
                          background: 'none', border: '1px solid var(--border-default)',
                          borderRadius: '5px', padding: '5px 8px', cursor: 'pointer',
                          color: 'var(--text-muted)', display: 'flex', alignItems: 'center', fontSize: '0.75rem'
                        }}
                        title="Cancel"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <span style={{ flex: 1, fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                        {task.title}
                      </span>

                      {task.daily_target ? (
                        <span style={{
                          fontSize: '0.7rem', fontWeight: 600,
                          padding: '2px 8px', borderRadius: '99px',
                          background: 'rgba(99,102,241,0.12)', color: '#818cf8',
                          marginRight: '4px'
                        }}>
                          Target: {task.daily_target}/day
                        </span>
                      ) : null}

                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <button
                          type="button"
                          onClick={() => handleStartEdit(task)}
                          title="Edit task name or target"
                          style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: 'var(--text-muted)', padding: '5px', borderRadius: '4px',
                            display: 'flex', alignItems: 'center',
                            transition: 'color 0.15s'
                          }}
                          onMouseEnter={e => (e.currentTarget.style.color = '#3b82f6')}
                          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                        >
                          <Pencil size={13} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteFixedTask(task.id)}
                          title="Delete this task from your daily report structure"
                          style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: 'var(--text-muted)', padding: '5px', borderRadius: '4px',
                            display: 'flex', alignItems: 'center',
                            transition: 'color 0.15s'
                          }}
                          onMouseEnter={e => (e.currentTarget.style.color = '#ef4444')}
                          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
