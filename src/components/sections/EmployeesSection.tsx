'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import type { Profile } from '@/lib/database.types'
import { getInitials, formatDate } from '@/lib/utils'
import { Plus, Trash2, X, Loader2, Users, Phone, Mail, Edit2, ToggleLeft, ToggleRight, Upload } from 'lucide-react'

interface Props { profile: Profile }

interface Employee {
  id: string
  full_name: string
  email: string
  phone: string | null
  role: string
  department: string | null
  designation: string | null
  whatsapp_number: string | null
  is_active: boolean
  created_at: string
  avatar_url?: string | null
}

const DEPARTMENTS = ['Sales', 'Administration', 'Academic', 'Finance', 'Operations', 'Marketing', 'IT']

export default function EmployeesSection({ profile }: Props) {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null)

  const [form, setForm] = useState({
    full_name: '', email: '', password: '', role: 'employee',
    department: '', designation: '', phone: '', whatsapp_number: '', avatar_url: ''
  })

  const getToken = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    return session?.access_token || ''
  }

  const fetchEmployees = useCallback(async () => {
    const token = await getToken()
    const res = await fetch('/api/employees', { headers: { Authorization: `Bearer ${token}` } })
    const data = await res.json()
    if (Array.isArray(data)) setEmployees(data)
    setLoading(false)
  }, [])

  useEffect(() => { fetchEmployees() }, [fetchEmployees])

  const openCreate = () => {
    setEditEmployee(null)
    setForm({ full_name: '', email: '', password: '', role: 'employee', department: '', designation: '', phone: '', whatsapp_number: '', avatar_url: '' })
    setShowModal(true)
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setSubmitting(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
      
      const { error: uploadError } = await supabase.storage.from('avatars').upload(fileName, file)
      if (uploadError) throw uploadError
      
      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(fileName)
      setForm(f => ({ ...f, avatar_url: publicUrl }))
    } catch (err: any) {
      alert('Avatar upload failed: ' + err.message + '\nMake sure you created a public "avatars" bucket in Supabase Storage.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleSubmit = async () => {
    if (!form.full_name || !form.email) return
    setSubmitting(true)
    const token = await getToken()

    if (editEmployee) {
      const { password, ...updateData } = form
      await fetch(`/api/employees/${editEmployee.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(updateData),
      })
    } else {
      if (!form.password) return
      const res = await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        alert(data.error || 'Failed to create employee')
        setSubmitting(false)
        return
      }
    }

    setShowModal(false)
    fetchEmployees()
    setSubmitting(false)
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete employee "${name}"? All their tasks will be unassigned.`)) return
    const token = await getToken()
    await fetch(`/api/employees/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    fetchEmployees()
  }

  const toggleActive = async (emp: Employee) => {
    const token = await getToken()
    await fetch(`/api/employees/${emp.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ is_active: !emp.is_active }),
    })
    fetchEmployees()
  }

  if (profile.role !== 'admin') return null

  if (loading) {
    return (
      <div>
        <div className="skeleton" style={{ height: '40px', marginBottom: '1rem' }} />
        {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: '80px', marginBottom: '8px' }} />)}
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Employee Management</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            {employees.length} team member{employees.length !== 1 ? 's' : ''} — {employees.filter(e => e.is_active).length} active
          </p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>
          <Plus size={16} />
          Add Employee
        </button>
      </div>

      {/* Employee Grid */}
      {employees.length === 0 ? (
        <div className="glass-card">
          <div className="empty-state">
            <div className="empty-state-icon"><Users size={24} /></div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>No employees added yet</p>
            <button className="btn btn-primary btn-sm" onClick={openCreate}><Plus size={14} /> Add First Employee</button>
          </div>
        </div>
      ) : (
        <div className="glass-card" style={{ overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th className="hidden-mobile">Role</th>
                  <th className="hidden-mobile">Department</th>
                  <th>Contact</th>
                  <th className="hidden-mobile">WhatsApp</th>
                  <th>Status</th>
                  <th className="hidden-mobile">Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(emp => (
                  <tr key={emp.id} style={{ opacity: emp.is_active ? 1 : 0.6 }}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {emp.avatar_url ? (
                          <img src={emp.avatar_url} alt="Avatar" className="avatar avatar-sm" style={{ objectFit: 'cover' }} />
                        ) : (
                          <div className="avatar avatar-sm">{getInitials(emp.full_name)}</div>
                        )}
                        <div>
                          <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>{emp.full_name}</p>
                          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{emp.designation || '—'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="hidden-mobile">
                      <span className="badge" style={{
                        background: emp.role === 'admin' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                        color: emp.role === 'admin' ? '#6366f1' : '#10b981',
                      }}>
                        {emp.role}
                      </span>
                    </td>
                    <td className="hidden-mobile">
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        {emp.department || '—'}
                      </span>
                    </td>
                    <td>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          <Mail size={11} /> {emp.email}
                        </div>
                        {emp.phone && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                            <Phone size={11} /> {emp.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="hidden-mobile">
                      <span style={{ fontSize: '0.8rem', color: emp.whatsapp_number ? 'var(--text-secondary)' : 'var(--text-muted)' }}>
                        {emp.whatsapp_number || 'Not set'}
                      </span>
                    </td>
                    <td>
                      <button onClick={() => toggleActive(emp)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                        {emp.is_active
                          ? <ToggleRight size={22} style={{ color: '#10b981' }} />
                          : <ToggleLeft size={22} style={{ color: 'var(--text-muted)' }} />
                        }
                      </button>
                    </td>
                    <td className="hidden-mobile">
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {formatDate(emp.created_at, 'dd MMM yyyy')}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => {
                            setEditEmployee(emp)
                            setForm({
                              full_name: emp.full_name, email: emp.email, password: '',
                              role: emp.role, department: emp.department || '',
                              designation: emp.designation || '', phone: emp.phone || '',
                              whatsapp_number: emp.whatsapp_number || '', avatar_url: emp.avatar_url || ''
                            })
                            setShowModal(true)
                          }}
                          data-tooltip="Edit employee"
                        >
                          <Edit2 size={13} />
                        </button>
                        {emp.id !== profile.id && (
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(emp.id, emp.full_name)}
                            data-tooltip="Delete employee"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Employee Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal-content" style={{ maxWidth: '580px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                {editEmployee ? 'Edit Employee' : 'Add New Employee'}
              </h3>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowModal(false)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <div style={{ position: 'relative', width: '80px', height: '80px' }}>
                  {form.avatar_url ? (
                    <img src={form.avatar_url} alt="Preview" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-subtle)' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'var(--bg-elevated)', border: '2px dashed var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                      <Users size={24} />
                    </div>
                  )}
                  <label style={{ position: 'absolute', bottom: '-4px', right: '-4px', background: 'var(--brand-primary)', color: '#fff', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                    <Upload size={14} />
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarUpload} disabled={submitting} />
                  </label>
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input className="form-input" placeholder="First Last" value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input className="form-input" type="email" placeholder="employee@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} disabled={!!editEmployee} />
                </div>
              </div>
              {!editEmployee && (
                <div className="form-group">
                  <label className="form-label">Password *</label>
                  <input className="form-input" type="password" placeholder="Minimum 8 characters" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                </div>
              )}
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Role</label>
                  <select className="form-select" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Department</label>
                  <select className="form-select" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })}>
                    <option value="">Select department</option>
                    {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Designation</label>
                <input className="form-input" placeholder="e.g. Sales Executive, Admin Officer" value={form.designation} onChange={e => setForm({ ...form, designation: e.target.value })} />
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input className="form-input" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">WhatsApp Number</label>
                  <input className="form-input" placeholder="+91 98765 43210" value={form.whatsapp_number} onChange={e => setForm({ ...form, whatsapp_number: e.target.value })} />
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Used for task deadline reminders
                  </p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={submitting || !form.full_name || !form.email || (!editEmployee && !form.password)}
              >
                {submitting ? <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Saving...</> : (editEmployee ? 'Update Employee' : 'Create Employee')}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
