'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { Profile } from '@/lib/database.types'
import { formatDate } from '@/lib/utils'
import { Plus, Trash2, X, Loader2, Users, Edit2, Upload, Tag, Building2, Globe, Sparkles, KeyRound, UserX, AlertTriangle, Search, ChevronRight } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import GlowButton from '@/components/ui/GlowButton'
import Reveal from '@/components/ui/Reveal'
import Avatar from '@/components/ui/Avatar'
import Pill from '@/components/ui/Pill'
import SidePanel, { KeyValues, PanelSection } from '@/components/ui/SidePanel'

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
  registered_device_id?: string | null
}

interface ClientBrandItem {
  id: string
  name: string
  slug: string
  color: string
  client_type: string
}

const DEPARTMENTS = ['Sales', 'Administration', 'Academic', 'Finance', 'Operations', 'Marketing', 'IT', 'Media', 'Strategy']
const ALL_INDUSTRIES = ['Digital Marketing', 'Share Market', 'Amazon', 'AI Course', 'BBA/MBA', 'Other']

export default function EmployeesSection({ profile }: Props) {
  const router = useRouter()
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null)
  const [openEmpId, setOpenEmpId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [filterDept, setFilterDept] = useState('all')
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all')

  // Industry Skills Manager state
  const [skillsEmployee, setSkillsEmployee] = useState<Employee | null>(null)
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([])
  const [customIndustry, setCustomIndustry] = useState('')
  const [allSkills, setAllSkills] = useState<{ employee_id?: string; user_id?: string; industry: string }[]>([])
  const [savingSkills, setSavingSkills] = useState(false)

  // Internal Brands & External Clients Assignment state
  const [brandEmployee, setBrandEmployee] = useState<Employee | null>(null)
  const [allBrands, setAllBrands] = useState<ClientBrandItem[]>([])
  const [assignedBrandIds, setAssignedBrandIds] = useState<string[]>([])
  const [loadingAssignments, setLoadingAssignments] = useState(false)
  const [savingBrandAssignments, setSavingBrandAssignments] = useState(false)

  // Change Password state
  const [pwEmployee, setPwEmployee] = useState<Employee | null>(null)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [savingPassword, setSavingPassword] = useState(false)
  const [pwSuccess, setPwSuccess] = useState(false)

  // Offboard state
  const [offboardEmployee, setOffboardEmployee] = useState<Employee | null>(null)
  const [offboardReassignTo, setOffboardReassignTo] = useState('')
  const [offboarding, setOffboarding] = useState(false)
  const [offboardResult, setOffboardResult] = useState<{ leadsReassigned: number; tasksUnassigned: number } | null>(null)

  const [form, setForm] = useState({
    full_name: '', email: '', password: '', role: 'employee',
    department: '', designation: '', phone: '', whatsapp_number: '', avatar_url: ''
  })

  const getToken = () => typeof window !== 'undefined' ? (localStorage.getItem('rushi_token') || '') : ''

  const fetchEmployees = useCallback(async () => {
    const token = getToken()
    if (!token) return
    const res = await fetch('/api/employees', { headers: { Authorization: `Bearer ${token}` } })
    const data = await res.json()
    if (Array.isArray(data)) setEmployees(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchEmployees()
    fetchAllSkills()
  }, [fetchEmployees])

  const fetchAllSkills = async () => {
    const token = getToken()
    if (!token) return
    const res = await fetch('/api/employees/skills', { headers: { Authorization: `Bearer ${token}` } })
    const data = await res.json()
    if (Array.isArray(data)) setAllSkills(data)
  }

  const openSkillsManager = (emp: Employee) => {
    setSkillsEmployee(emp)
    const empId = emp.id
    const current = allSkills
      .filter(s => (s.employee_id || s.user_id) === empId)
      .map(s => s.industry)
    setSelectedIndustries(current)
    setCustomIndustry('')
  }

  const saveSkills = async () => {
    if (!skillsEmployee) return
    setSavingSkills(true)
    const token = getToken()
    if (!token) return
    const industries = [
      ...selectedIndustries,
      ...(customIndustry.trim() ? [customIndustry.trim()] : [])
    ]
    await fetch('/api/employees/skills', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ user_id: skillsEmployee.id, industries })
    })
    await fetchAllSkills()
    setSkillsEmployee(null)
    setSavingSkills(false)
  }

  const openBrandAssignmentManager = async (emp: Employee) => {
    setBrandEmployee(emp)
    setLoadingAssignments(true)
    const token = getToken()
    if (!token) return
    try {
      const res = await fetch(`/api/employees/assignments?employee_id=${emp.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.assignments) setAssignedBrandIds(data.assignments)
      if (data.allClients) setAllBrands(data.allClients)
    } catch {}
    setLoadingAssignments(false)
  }

  const saveBrandAssignments = async () => {
    if (!brandEmployee) return
    setSavingBrandAssignments(true)
    const token = getToken()
    if (!token) return
    try {
      await fetch('/api/employees/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          employee_id: brandEmployee.id,
          client_ids: assignedBrandIds
        })
      })
      setBrandEmployee(null)
    } catch (err: any) {
      alert('Failed to save assignments: ' + err.message)
    } finally {
      setSavingBrandAssignments(false)
    }
  }

  const openChangePassword = (emp: Employee) => {
    setPwEmployee(emp)
    setNewPassword('')
    setConfirmPassword('')
    setPwSuccess(false)
  }

  const handleChangePassword = async () => {
    if (!pwEmployee) return
    if (newPassword.length < 8) return alert('Password must be at least 8 characters')
    if (newPassword !== confirmPassword) return alert('Passwords do not match')
    setSavingPassword(true)
    const token = getToken()
    try {
      const res = await fetch(`/api/employees/${pwEmployee.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ password: newPassword }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to change password')
      setPwSuccess(true)
      setTimeout(() => setPwEmployee(null), 1500)
    } catch (err: any) {
      alert(err.message)
    } finally {
      setSavingPassword(false)
    }
  }

  const openOffboard = (emp: Employee) => {
    setOffboardEmployee(emp)
    setOffboardReassignTo('')
    setOffboardResult(null)
  }

  const handleOffboard = async () => {
    if (!offboardEmployee) return
    if (!confirm(`⚠️ Offboard "${offboardEmployee.full_name}"?\n\nThis will:\n• Deactivate their login immediately\n• Reassign or unassign all open leads\n• Unassign all open tasks\n• Remove them from lead round-robin\n\nThis action cannot be undone automatically.`)) return
    setOffboarding(true)
    const token = getToken()
    try {
      const res = await fetch(`/api/employees/${offboardEmployee.id}/offboard`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ reassign_to: offboardReassignTo || undefined }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Offboarding failed')
      setOffboardResult(data.summary)
      fetchEmployees()
    } catch (err: any) {
      alert(err.message)
    } finally {
      setOffboarding(false)
    }
  }

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
      const formData = new FormData()
      formData.append('file', file)
      
      const token = getToken()
      if (!token) return

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Upload failed')
      setForm(f => ({ ...f, avatar_url: data.url }))
    } catch (err: any) {
      alert('Avatar upload failed: ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleSubmit = async () => {
    if (!form.full_name || !form.email) return
    setSubmitting(true)
    const token = getToken()
    if (!token) return

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
    const token = getToken()
    if (!token) return
    await fetch(`/api/employees/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    fetchEmployees()
  }

  const toggleActive = async (emp: Employee) => {
    const token = getToken()
    if (!token) return
    await fetch(`/api/employees/${emp.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ is_active: !emp.is_active }),
    })
    fetchEmployees()
  }


  const openEdit = (emp: Employee) => {
    setEditEmployee(emp)
    setForm({
      full_name: emp.full_name, email: emp.email, password: '',
      role: emp.role, department: emp.department || '',
      designation: emp.designation || '', phone: emp.phone || '',
      whatsapp_number: emp.whatsapp_number || '', avatar_url: emp.avatar_url || ''
    })
    setShowModal(true)
  }

  if (profile.role !== 'admin') return null

  const q = search.toLowerCase()
  const visible = employees.filter(e =>
    (!q || e.full_name.toLowerCase().includes(q) || e.email.toLowerCase().includes(q) || (e.designation || '').toLowerCase().includes(q)) &&
    (filterDept === 'all' || (e.department || '').toLowerCase() === filterDept.toLowerCase()) &&
    (filterActive === 'all' || (filterActive === 'active' ? e.is_active : !e.is_active))
  )
  const departments = Array.from(new Set(employees.map(e => e.department).filter(Boolean))) as string[]
  const openEmp = employees.find(e => e.id === openEmpId) || null
  const skillsOf = (id: string) => allSkills.filter(s => (s.employee_id || s.user_id) === id).map(s => s.industry)
  const cols = 'minmax(220px, 2fr) 96px minmax(110px, 1fr) minmax(180px, 1.6fr) 96px 110px 14px'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <PageHeader
        eyebrow={`${employees.length} people · ${employees.filter(e => e.is_active).length} active`}
        title="Employees"
        description="Click a team member to manage their profile, access and assignments."
        actions={<GlowButton onClick={openCreate}><Plus size={15} /> Add employee</GlowButton>}
      />

      <Reveal>
        <section className="card list">
          <div className="list-toolbar">
            <div className="input-icon">
              <Search size={14} />
              <input className="form-input" placeholder="Search name, email or role…" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <select className="form-select" style={{ width: 'auto' }} value={filterDept} onChange={e => setFilterDept(e.target.value)} aria-label="Department">
              <option value="all">All departments</option>
              {departments.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <div className="segmented">
              {(['all', 'active', 'inactive'] as const).map(f => (
                <button key={f} className={filterActive === f ? 'active' : ''} onClick={() => setFilterActive(f)} style={{ textTransform: 'capitalize' }}>{f}</button>
              ))}
            </div>
          </div>

          {loading ? (
            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[1, 2, 3, 4].map(i => <div key={i} className="skeleton" style={{ height: 52 }} />)}
            </div>
          ) : visible.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon"><Users size={20} /></div>
              <p style={{ fontWeight: 550, color: 'var(--text-secondary)' }}>{employees.length === 0 ? 'No employees added yet' : 'No one matches these filters'}</p>
              {employees.length === 0 && <button className="btn btn-primary btn-sm" onClick={openCreate}><Plus size={14} /> Add first employee</button>}
            </div>
          ) : (
            <div role="list">
              <div className="list-head" style={{ '--cols': cols } as React.CSSProperties}>
                <span>Employee</span><span>Role</span><span>Department</span><span>Email</span><span>Status</span><span>Joined</span><span />
              </div>
              {visible.map(emp => (
                <div
                  key={emp.id}
                  role="listitem"
                  tabIndex={0}
                  className={`list-row ${openEmpId === emp.id ? 'selected' : ''}`}
                  style={{ '--cols': cols, opacity: emp.is_active ? 1 : 0.6 } as React.CSSProperties}
                  onClick={() => setOpenEmpId(emp.id)}
                  onKeyDown={e => { if (e.key === 'Enter') setOpenEmpId(emp.id) }}
                >
                  <div className="row-main">
                    <Avatar name={emp.full_name} src={emp.avatar_url} size="sm" />
                    <div style={{ minWidth: 0 }}>
                      <div className="row-title">{emp.full_name}{emp.id === profile.id ? ' (you)' : ''}</div>
                      <div className="row-sub">{emp.designation || '—'}</div>
                    </div>
                  </div>
                  <span className="col-hide-sm"><Pill color={emp.role === 'admin' ? '#8b5cf6' : '#14b8a0'}>{emp.role}</Pill></span>
                  <span className="row-cell col-hide-sm">{emp.department || '—'}</span>
                  <span className="row-cell col-hide-sm">{emp.email}</span>
                  <span><Pill color={emp.is_active ? '#22c55e' : '#8592a3'} dot>{emp.is_active ? 'Active' : 'Inactive'}</Pill></span>
                  <span className="row-cell col-hide-sm tabular">{formatDate(emp.created_at, 'dd MMM yyyy')}</span>
                  <ChevronRight size={16} className="row-chevron col-hide-sm" />
                </div>
              ))}
              <div className="list-foot"><span>{visible.length} of {employees.length} people</span></div>
            </div>
          )}
        </section>
      </Reveal>

      {openEmp && (
        <SidePanel
          open
          onClose={() => setOpenEmpId(null)}
          leading={<Avatar name={openEmp.full_name} src={openEmp.avatar_url} size="md" />}
          title={<>{openEmp.full_name} <Pill color={openEmp.role === 'admin' ? '#8b5cf6' : '#14b8a0'}>{openEmp.role}</Pill></>}
          subtitle={<>
            <span>{[openEmp.designation, openEmp.department].filter(Boolean).join(' · ') || 'Team member'}</span>
            <Pill color={openEmp.is_active ? '#22c55e' : '#8592a3'} dot>{openEmp.is_active ? 'Active' : 'Inactive'}</Pill>
          </>}
        >
          <div className="quick-actions">
            <button className="btn btn-secondary" onClick={() => openEdit(openEmp)}><Edit2 size={14} /> Edit</button>
            {openEmp.id !== profile.id && <button className="btn btn-secondary" onClick={() => openChangePassword(openEmp)}><KeyRound size={14} /> Password</button>}
            <button className="btn btn-secondary" onClick={() => openBrandAssignmentManager(openEmp)}><Building2 size={14} /> Brands</button>
            {openEmp.department?.toLowerCase() === 'sales' && <button className="btn btn-secondary" onClick={() => openSkillsManager(openEmp)}><Tag size={14} /> Lead industries</button>}
          </div>

          <KeyValues items={[
            { label: 'Email', value: openEmp.email },
            { label: 'Phone', value: openEmp.phone || '—' },
            { label: 'WhatsApp', value: openEmp.whatsapp_number || 'Not set' },
            { label: 'Department', value: openEmp.department || '—' },
            { label: 'Joined', value: formatDate(openEmp.created_at, 'dd MMM yyyy') },
            { label: 'Attendance device', value: openEmp.registered_device_id ? 'Registered' : 'Not registered' },
          ]} />

          {openEmp.department?.toLowerCase() === 'sales' && (
            <PanelSection title="Lead industries (round-robin)" aside={<button className="btn btn-ghost btn-sm" onClick={() => openSkillsManager(openEmp)}>Manage</button>}>
              {skillsOf(openEmp.id).length === 0
                ? <div className="empty-inline">No industries assigned — this rep won’t receive auto-routed leads.</div>
                : <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{skillsOf(openEmp.id).map(s => <Pill key={s} color="#2f9bff">{s}</Pill>)}</div>}
            </PanelSection>
          )}

          {openEmp.id !== profile.id && (
            <PanelSection title="Access">
              <div className="setting-row">
                <div>
                  <strong>{openEmp.is_active ? 'Account active' : 'Account disabled'}</strong>
                  <p>{openEmp.is_active ? 'Can sign in and receive tasks and leads.' : 'Cannot sign in.'}</p>
                </div>
                <button className={`switch ${openEmp.is_active ? 'on' : ''}`} role="switch" aria-checked={openEmp.is_active} aria-label="Toggle account active" onClick={() => toggleActive(openEmp)}>
                  <span />
                </button>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {openEmp.is_active && <button className="btn btn-danger" onClick={() => openOffboard(openEmp)}><UserX size={14} /> Offboard</button>}
                <button className="btn btn-ghost" style={{ color: 'var(--status-danger)' }} onClick={() => { handleDelete(openEmp.id, openEmp.full_name); setOpenEmpId(null) }}><Trash2 size={14} /> Delete permanently</button>
              </div>
            </PanelSection>
          )}
        </SidePanel>
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
                    <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" style={{ display: 'none' }} onChange={handleAvatarUpload} disabled={submitting} />
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

      {/* ── Industry Skills Manager Modal ── */}
      {skillsEmployee && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setSkillsEmployee(null)}>
          <div className="modal-content" style={{ maxWidth: '480px' }}>
            <div className="modal-header">
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>🎯 Sales Lead Industries</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>
                  {skillsEmployee.full_name} — Assign industries for round-robin lead routing
                </p>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => setSkillsEmployee(null)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Select which course categories this salesperson handles. Incoming Facebook leads will be
                automatically assigned via round-robin among reps tagged with the same industry.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
                {ALL_INDUSTRIES.map(ind => (
                  <label key={ind} style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '0.625rem 0.875rem', borderRadius: '10px', cursor: 'pointer',
                    background: selectedIndustries.includes(ind) ? 'rgba(99,102,241,0.1)' : 'var(--bg-surface)',
                    border: `1px solid ${selectedIndustries.includes(ind) ? 'rgba(99,102,241,0.3)' : 'var(--border-default)'}`,
                    transition: 'all 0.15s'
                  }}>
                    <input
                      type="checkbox"
                      checked={selectedIndustries.includes(ind)}
                      onChange={e => {
                        if (e.target.checked) setSelectedIndustries(p => [...p, ind])
                        else setSelectedIndustries(p => p.filter(x => x !== ind))
                      }}
                      style={{ width: '16px', height: '16px', accentColor: '#6366f1' }}
                    />
                    <span style={{ fontSize: '0.875rem', fontWeight: selectedIndustries.includes(ind) ? 600 : 400, color: selectedIndustries.includes(ind) ? '#6366f1' : 'var(--text-primary)' }}>
                      {ind}
                    </span>
                    {selectedIndustries.includes(ind) && (
                      <span style={{ marginLeft: 'auto', fontSize: '0.65rem', color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '2px 8px', borderRadius: '99px' }}>Active</span>
                    )}
                  </label>
                ))}
              </div>
              {/* Custom industry input */}
              <div className="form-group">
                <label className="form-label">Add Custom Course / Industry</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    className="form-input"
                    placeholder="e.g. Forex Trading, Graphic Design..."
                    value={customIndustry}
                    onChange={e => setCustomIndustry(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && customIndustry.trim()) {
                        setSelectedIndustries(p => p.includes(customIndustry.trim()) ? p : [...p, customIndustry.trim()])
                        setCustomIndustry('')
                      }
                    }}
                    style={{ flex: 1 }}
                  />
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      if (customIndustry.trim()) {
                        setSelectedIndustries(p => p.includes(customIndustry.trim()) ? p : [...p, customIndustry.trim()])
                        setCustomIndustry('')
                      }
                    }}
                  >Add</button>
                </div>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>Press Enter or click Add</p>
              </div>
              {selectedIndustries.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginTop: '0.5rem' }}>
                  {selectedIndustries.map(ind => (
                    <span key={ind} style={{
                      fontSize: '0.75rem', padding: '3px 10px', borderRadius: '99px',
                      background: 'rgba(99,102,241,0.12)', color: '#6366f1', border: '1px solid rgba(99,102,241,0.2)',
                      display: 'flex', alignItems: 'center', gap: '4px'
                    }}>
                      {ind}
                      <button onClick={() => setSelectedIndustries(p => p.filter(x => x !== ind))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1', padding: 0, lineHeight: 1 }}>×</button>
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setSkillsEmployee(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={saveSkills} disabled={savingSkills}>
                {savingSkills ? <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Saving...</> : '💾 Save Industries'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Internal Brands & External Clients Assignment Modal */}
      {brandEmployee && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setBrandEmployee(null)}>
          <div className="modal-content" style={{ maxWidth: '640px', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
            <div className="modal-header">
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Building2 size={18} style={{ color: '#10b981' }} /> Brand &amp; Client Assignments
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '3px 0 0' }}>
                  {brandEmployee.full_name} ({brandEmployee.designation || 'Team Member'}) — Choose which companies appear in their daily report &amp; workflow
                </p>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => setBrandEmployee(null)}><X size={18} /></button>
            </div>

            <div className="modal-body" style={{ overflowY: 'auto', flex: 1, padding: '1.25rem' }}>
              {loadingAssignments ? (
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                  <Loader2 size={24} style={{ animation: 'spin 1s linear infinite', color: 'var(--brand-primary)', margin: '0 auto 8px' }} />
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Loading client assignments...</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  
                  {/* Internal Brands Section */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#818cf8', display: 'flex', alignItems: 'center', gap: '6px', margin: 0 }}>
                        <Sparkles size={15} /> 🌟 Internal Brands (In-House Properties)
                      </h4>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          type="button"
                          onClick={() => {
                            const internalIds = allBrands.filter(b => b.client_type === 'internal').map(b => b.id)
                            setAssignedBrandIds(prev => Array.from(new Set([...prev, ...internalIds])))
                          }}
                          style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '6px', background: 'rgba(99,102,241,0.12)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.25)', cursor: 'pointer', fontWeight: 700 }}
                        >
                          Select All
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const internalIds = new Set(allBrands.filter(b => b.client_type === 'internal').map(b => b.id))
                            setAssignedBrandIds(prev => prev.filter(id => !internalIds.has(id)))
                          }}
                          style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '6px', background: 'var(--bg-surface)', color: 'var(--text-muted)', border: '1px solid var(--border-default)', cursor: 'pointer', fontWeight: 600 }}
                        >
                          Clear
                        </button>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.5rem' }}>
                      {allBrands.filter(b => b.client_type === 'internal').map(brand => {
                        const isAssigned = assignedBrandIds.includes(brand.id)
                        return (
                          <label
                            key={brand.id}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.625rem',
                              padding: '0.625rem 0.875rem',
                              borderRadius: '10px',
                              cursor: 'pointer',
                              background: isAssigned ? 'rgba(99,102,241,0.12)' : 'var(--bg-surface)',
                              border: isAssigned ? '1.5px solid rgba(99,102,241,0.4)' : '1px solid var(--border-default)',
                              transition: 'all 0.15s'
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={isAssigned}
                              onChange={e => {
                                if (e.target.checked) setAssignedBrandIds(prev => [...prev, brand.id])
                                else setAssignedBrandIds(prev => prev.filter(id => id !== brand.id))
                              }}
                              style={{ width: '15px', height: '15px', accentColor: '#6366f1' }}
                            />
                            <span style={{ fontSize: '0.82rem', fontWeight: isAssigned ? 700 : 500, color: isAssigned ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                              {brand.name}
                            </span>
                          </label>
                        )
                      })}
                    </div>
                  </div>

                  {/* External Clients Section */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px', margin: 0 }}>
                        <Globe size={15} /> 🌐 External Clients (Agency Accounts)
                      </h4>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          type="button"
                          onClick={() => {
                            const extIds = allBrands.filter(b => (b.client_type || 'external') === 'external').map(b => b.id)
                            setAssignedBrandIds(prev => Array.from(new Set([...prev, ...extIds])))
                          }}
                          style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '6px', background: 'rgba(16,185,129,0.12)', color: '#10b981', border: '1px solid rgba(16,185,129,0.25)', cursor: 'pointer', fontWeight: 700 }}
                        >
                          Select All
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const extIds = new Set(allBrands.filter(b => (b.client_type || 'external') === 'external').map(b => b.id))
                            setAssignedBrandIds(prev => prev.filter(id => !extIds.has(id)))
                          }}
                          style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '6px', background: 'var(--bg-surface)', color: 'var(--text-muted)', border: '1px solid var(--border-default)', cursor: 'pointer', fontWeight: 600 }}
                        >
                          Clear
                        </button>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.5rem' }}>
                      {allBrands.filter(b => (b.client_type || 'external') === 'external').map(client => {
                        const isAssigned = assignedBrandIds.includes(client.id)
                        return (
                          <label
                            key={client.id}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.625rem',
                              padding: '0.625rem 0.875rem',
                              borderRadius: '10px',
                              cursor: 'pointer',
                              background: isAssigned ? 'rgba(16,185,129,0.12)' : 'var(--bg-surface)',
                              border: isAssigned ? '1.5px solid rgba(16,185,129,0.4)' : '1px solid var(--border-default)',
                              transition: 'all 0.15s'
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={isAssigned}
                              onChange={e => {
                                if (e.target.checked) setAssignedBrandIds(prev => [...prev, client.id])
                                else setAssignedBrandIds(prev => prev.filter(id => id !== client.id))
                              }}
                              style={{ width: '15px', height: '15px', accentColor: '#10b981' }}
                            />
                            <span style={{ fontSize: '0.82rem', fontWeight: isAssigned ? 700 : 500, color: isAssigned ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                              {client.name}
                            </span>
                          </label>
                        )
                      })}
                    </div>
                  </div>

                </div>
              )}
            </div>

            <div className="modal-footer" style={{ borderTop: '1px solid var(--border-default)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {assignedBrandIds.length} compan{assignedBrandIds.length === 1 ? 'y' : 'ies'} assigned
              </span>
              <div style={{ display: 'flex', gap: '0.625rem' }}>
                <button className="btn btn-secondary" onClick={() => setBrandEmployee(null)}>Cancel</button>
                <button className="btn btn-primary" onClick={saveBrandAssignments} disabled={savingBrandAssignments || loadingAssignments}>
                  {savingBrandAssignments ? <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Saving...</> : '💾 Save Assignments'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* ── Change Password Modal ── */}
      {pwEmployee && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setPwEmployee(null)}>
          <div className="modal-content" style={{ maxWidth: '420px' }}>
            <div className="modal-header">
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <KeyRound size={18} style={{ color: '#f59e0b' }} /> Change Password
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '3px 0 0' }}>
                  Setting new password for <strong>{pwEmployee.full_name}</strong>
                </p>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => setPwEmployee(null)}><X size={18} /></button>
            </div>
            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {pwSuccess ? (
                <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>✅</div>
                  <p style={{ fontWeight: 700, color: '#10b981' }}>Password changed successfully!</p>
                </div>
              ) : (
                <>
                  <div className="form-group">
                    <label className="form-label">New Password *</label>
                    <input
                      className="form-input"
                      type="password"
                      placeholder="Minimum 8 characters"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      autoFocus
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Confirm New Password *</label>
                    <input
                      className="form-input"
                      type="password"
                      placeholder="Re-enter password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleChangePassword()}
                    />
                    {confirmPassword && newPassword !== confirmPassword && (
                      <p style={{ fontSize: '0.72rem', color: '#ef4444', marginTop: '4px' }}>Passwords do not match</p>
                    )}
                  </div>
                  <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '10px', padding: '0.625rem 0.875rem', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    ⚠️ The employee will need to use this new password on their next login.
                  </div>
                </>
              )}
            </div>
            {!pwSuccess && (
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setPwEmployee(null)}>Cancel</button>
                <button
                  className="btn btn-primary"
                  onClick={handleChangePassword}
                  disabled={savingPassword || newPassword.length < 8 || newPassword !== confirmPassword}
                  style={{ background: '#f59e0b', borderColor: '#f59e0b' }}
                >
                  {savingPassword ? <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Saving...</> : '🔑 Change Password'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Offboard Employee Modal ── */}
      {offboardEmployee && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && !offboarding && setOffboardEmployee(null)}>
          <div className="modal-content" style={{ maxWidth: '480px' }}>
            <div className="modal-header">
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444' }}>
                  <UserX size={18} /> Offboard Employee
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '3px 0 0' }}>
                  Removing access for <strong>{offboardEmployee.full_name}</strong>
                </p>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => setOffboardEmployee(null)} disabled={offboarding}><X size={18} /></button>
            </div>
            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {offboardResult ? (
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>✅</div>
                  <p style={{ fontWeight: 700, color: '#10b981', marginBottom: '0.5rem' }}>
                    {offboardEmployee.full_name} has been offboarded
                  </p>
                  <div style={{ background: 'var(--bg-surface)', borderRadius: '10px', padding: '0.875rem', textAlign: 'left', fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <span>🔒 Login disabled immediately</span>
                    <span>📋 {offboardResult.leadsReassigned} open lead{offboardResult.leadsReassigned !== 1 ? 's' : ''} {offboardResult.leadsReassigned > 0 ? (offboardResult.leadsReassigned > 0 ? 'reassigned/unassigned' : '') : 'found (none open)'}</span>
                    <span>✅ {offboardResult.tasksUnassigned} open task{offboardResult.tasksUnassigned !== 1 ? 's' : ''} unassigned</span>
                    <span>🎯 Removed from lead round-robin</span>
                  </div>
                  <button className="btn btn-secondary" style={{ marginTop: '1rem' }} onClick={() => setOffboardEmployee(null)}>Close</button>
                </div>
              ) : (
                <>
                  {/* Warning banner */}
                  <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '10px', padding: '0.875rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <AlertTriangle size={18} style={{ color: '#ef4444', flexShrink: 0, marginTop: '1px' }} />
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      <strong style={{ color: '#ef4444' }}>This will:</strong>
                      <ul style={{ margin: '0.4rem 0 0', paddingLeft: '1.1rem' }}>
                        <li>Block <strong>{offboardEmployee.full_name}</strong> from logging in</li>
                        <li>Reassign only <strong>new, uncontacted leads from this month</strong></li>
                        <li>Keep all historical worked leads (ringing, callback, etc.) in their records</li>
                        <li>Unassign pending tasks</li>
                      </ul>
                      <p style={{ marginTop: '0.4rem', marginBottom: 0 }}>Historical data (closed leads, reports, completed tasks) is <strong>preserved</strong>.</p>
                    </div>
                  </div>

                  {/* Reassign leads to */}
                  <div className="form-group">
                    <label className="form-label">Reassign New Leads (This Month) To</label>
                    <select
                      className="form-select"
                      value={offboardReassignTo}
                      onChange={e => setOffboardReassignTo(e.target.value)}
                    >
                      <option value="">— Leave unassigned (admin can re-assign later) —</option>
                      {employees
                        .filter(e => e.is_active && e.id !== offboardEmployee.id)
                        .map(e => (
                          <option key={e.id} value={e.id}>
                            {e.full_name} {e.department ? `(${e.department})` : ''}
                          </option>
                        ))}
                    </select>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      Only fresh, uncontacted new leads from this month will be reassigned. All existing calls &amp; pipeline stay in records.
                    </p>
                  </div>
                </>
              )}
            </div>
            {!offboardResult && (
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setOffboardEmployee(null)} disabled={offboarding}>Cancel</button>
                <button
                  className="btn btn-danger"
                  onClick={handleOffboard}
                  disabled={offboarding}
                  style={{ background: '#ef4444', color: '#fff', border: 'none' }}
                >
                  {offboarding
                    ? <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Offboarding...</>
                    : <><UserX size={14} /> Offboard {offboardEmployee.full_name}</>
                  }
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
