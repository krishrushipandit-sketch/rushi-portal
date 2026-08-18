'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { Profile } from '@/lib/database.types'
import { getInitials } from '@/lib/utils'
import {
  BarChart3, CheckCircle2, AlertTriangle, Clock, TrendingUp,
  ChevronDown, ChevronUp, CheckCircle, X, Video, PlayCircle,
  Camera, Grid3x3, Film, Sparkles, Calendar, Layers, Filter,
  Eye, UserCheck, Award, Users
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'

interface ReportEntry { description: string; notes?: string; count: number }
interface ReportDetail { date: string; entries: ReportEntry[]; note: string }

interface EmployeePerf {
  employee: { id: string; full_name: string; email: string; designation: string | null; department: string | null; avatar_url: string | null }
  tasks: { total: number; completed: number; pending: number; in_progress: number; overdue: number }
  completionRate: number
  onTimeRate: number
  leads: {
    total: number; closed_won: number; closed_lost: number
    conversion_rate: number; by_category: Record<string, number>
  }
  reports: { total_this_month: number; details: ReportDetail[] }
}

interface ContentItem {
  id: string
  brandName: string
  brandColor: string
  clientType: 'internal' | 'external'
  contentType: string
  taskPhase: string
  title: string
  liveUrl?: string | null
  platform?: string | null
  status: string
  count: number
  logDate: string
  creatorName: string
  creatorAvatar?: string | null
  creatorDesignation?: string | null
}

interface MediaProductionEmployee {
  employee: { id: string; full_name: string; email: string; designation: string | null; department: string | null; avatar_url: string | null }
  reels: number
  youtube: number
  shooting: number
  staticPosts: number
  carousels: number
  published: number
  lnsTasks: number
  other: number
  internalTotal: number
  externalTotal: number
  totalDeliverables: number
  internalBreakdown: { brandName: string; type: 'internal'; reels: number; youtube: number; shooting: number; staticPosts: number; carousels: number; published: number; total: number }[]
  externalBreakdown: { brandName: string; type: 'external'; reels: number; youtube: number; shooting: number; staticPosts: number; carousels: number; published: number; total: number }[]
  clientBreakdown: any[]
  logsCount: number
  recentLogs: any[]
}

interface MediaTotals {
  totalReels: number
  totalYoutube: number
  totalShooting: number
  totalStaticPosts: number
  totalCarousels: number
  totalPublished: number
  totalInternal: number
  totalExternal: number
  grandTotal: number
}

interface GlobalStats {
  total_tasks: number; completed: number; in_progress: number; overdue: number
  total_leads: number; leads_closed_won: number
}

export default function PerformanceSection({ profile }: { profile: Profile }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'media' | 'tasks'>('media')
  const [mediaSubTab, setMediaSubTab] = useState<'matrix' | 'internal' | 'external' | 'inventory'>('matrix')
  const [inventorySearch, setInventorySearch] = useState('')
  const [inventoryFilterPhase, setInventoryFilterPhase] = useState<string>('all')
  const [inventoryFilterBrand, setInventoryFilterBrand] = useState<string>('all')
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7))
  const [performance, setPerformance] = useState<EmployeePerf[]>([])
  const [mediaProduction, setMediaProduction] = useState<MediaProductionEmployee[]>([])
  const [mediaTotals, setMediaTotals] = useState<MediaTotals | null>(null)
  const [contentInventory, setContentInventory] = useState<ContentItem[]>([])
  const [globalStats, setGlobalStats] = useState<GlobalStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [expandedEmpId, setExpandedEmpId] = useState<string | null>(null)
  const [expandedMediaId, setExpandedMediaId] = useState<string | null>(null)
  const [activeDate, setActiveDate] = useState<string | null>(null) // empId::date

  const isKedar = profile.email?.toLowerCase().includes('kedar') || profile.full_name?.toLowerCase().includes('kedar')
  const canAccess = profile.role === 'admin' || isKedar

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem('rushi_token')
    if (!token) {
      router.push('/')
      return
    }
    const res = await fetch(`/api/performance?month=${selectedMonth}`, { headers: { Authorization: `Bearer ${token}` } })
    const data = await res.json()
    if (data.performance) {
      setPerformance(data.performance)
      setGlobalStats(data.globalStats)
      setMediaProduction(data.mediaProduction || [])
      setMediaTotals(data.mediaTotals || null)
      setContentInventory(data.contentInventory || [])
    }
    setLoading(false)
  }, [selectedMonth, router])

  useEffect(() => { fetchData() }, [fetchData])

  if (!canAccess) return (
    <div className="empty-state">
      <p style={{ color: 'var(--text-muted)' }}>Access restricted to administrators and managers</p>
    </div>
  )

  if (loading) {
    return (
      <div>
        <div className="skeleton" style={{ height: '36px', width: '240px', marginBottom: '1.5rem' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          {[1, 2, 3, 4].map(i => <div key={i} className="skeleton" style={{ height: '88px' }} />)}
        </div>
        <div className="skeleton" style={{ height: '300px' }} />
      </div>
    )
  }

  const completionChartData = performance.map(p => ({
    name: p.employee.full_name.split(' ')[0],
    'Completion %': p.completionRate,
    'On-Time %': p.onTimeRate,
  }))

  const reportsChartData = performance.map(p => ({
    name: p.employee.full_name.split(' ')[0],
    'Reports': p.reports.total_this_month,
  }))

  const currentMonthLabel = new Date(selectedMonth + '-01').toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })

  // Filtered inventory list
  const filteredInventory = contentInventory.filter(item => {
    const matchesSearch = !inventorySearch.trim() ||
      item.title.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      item.brandName.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      item.creatorName.toLowerCase().includes(inventorySearch.toLowerCase())
    const matchesPhase = inventoryFilterPhase === 'all' || item.taskPhase.toLowerCase() === inventoryFilterPhase.toLowerCase()
    const matchesBrand = inventoryFilterBrand === 'all' ||
      (inventoryFilterBrand === 'internal' ? item.clientType === 'internal' :
       inventoryFilterBrand === 'external' ? item.clientType === 'external' :
       item.brandName.toLowerCase() === inventoryFilterBrand.toLowerCase())
    return matchesSearch && matchesPhase && matchesBrand
  })

  return (
    <div className="animate-fade-in">
      {/* ── Header & Month Selector ── */}
      <div className="page-header" style={{ alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Production & Performance Reports</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            {currentMonthLabel} — Internal Brands (7 Properties), Client Deliverables, Shoots & Media Operations
          </p>
        </div>
        <input
          type="month"
          className="form-input"
          value={selectedMonth}
          max={new Date().toISOString().slice(0, 7)}
          onChange={e => setSelectedMonth(e.target.value)}
          style={{ width: 'auto', height: '36px', fontSize: '0.82rem', padding: '0 0.75rem' }}
        />
      </div>

      {/* ── Top Level Mode Selector ── */}
      <div style={{ display: 'flex', gap: '0.625rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-default)', paddingBottom: '0.75rem' }}>
        <button
          onClick={() => setActiveTab('media')}
          style={{
            padding: '8px 18px',
            borderRadius: '99px',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: activeTab === 'media' ? 'rgba(99,102,241,0.15)' : 'transparent',
            color: activeTab === 'media' ? '#818cf8' : 'var(--text-secondary)',
            fontWeight: 800,
            fontSize: '0.875rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: activeTab === 'media' ? '0 2px 8px rgba(99,102,241,0.15)' : 'none'
          }}
        >
          <Film size={16} /> 🎬 Media & Creator Production Hub
        </button>

        <button
          onClick={() => setActiveTab('tasks')}
          style={{
            padding: '8px 18px',
            borderRadius: '99px',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: activeTab === 'tasks' ? 'rgba(16,185,129,0.15)' : 'transparent',
            color: activeTab === 'tasks' ? '#10b981' : 'var(--text-secondary)',
            fontWeight: 800,
            fontSize: '0.875rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: activeTab === 'tasks' ? '0 2px 8px rgba(16,185,129,0.15)' : 'none'
          }}
        >
          <BarChart3 size={16} /> 📋 Tasks & Team KPI Overview
        </button>
      </div>

      {/* ══════════════════════════════════════════════════════════
          TAB 1: MEDIA & VIDEO PRODUCTION REPORT (SUYOG, KEDAR, ROHAN, POOJA, SHREYA)
      ══════════════════════════════════════════════════════════ */}
      {activeTab === 'media' && (
        <div className="animate-fade-in">
          {/* Executive Totals Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.875rem', marginBottom: '1.5rem' }}>
            <div className="stat-card" style={{ borderLeft: '4px solid #10b981' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div className="metric-value" style={{ color: '#10b981' }}>{mediaTotals?.totalInternal || 0}</div>
                  <div className="metric-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    🏢 Internal Brands Output
                  </div>
                </div>
                <div style={{ width: '38px', height: '38px', background: 'rgba(16,185,129,0.12)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
                  <Sparkles size={18} />
                </div>
              </div>
            </div>

            <div className="stat-card" style={{ borderLeft: '4px solid #6366f1' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div className="metric-value" style={{ color: '#6366f1' }}>{mediaTotals?.totalExternal || 0}</div>
                  <div className="metric-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    🤝 Client Deliverables
                  </div>
                </div>
                <div style={{ width: '38px', height: '38px', background: 'rgba(99,102,241,0.12)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1' }}>
                  <Users size={18} />
                </div>
              </div>
            </div>

            <div className="stat-card" style={{ borderLeft: '4px solid #3b82f6' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div className="metric-value" style={{ color: '#3b82f6' }}>{mediaTotals?.totalReels || 0}</div>
                  <div className="metric-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <PlayCircle size={12} style={{ color: '#3b82f6' }} /> Reels Edited
                  </div>
                </div>
                <div style={{ width: '38px', height: '38px', background: 'rgba(59,130,246,0.12)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
                  <Film size={18} />
                </div>
              </div>
            </div>

            <div className="stat-card" style={{ borderLeft: '4px solid #ec4899' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div className="metric-value" style={{ color: '#ec4899' }}>{mediaTotals?.totalShooting || 0}</div>
                  <div className="metric-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Camera size={12} style={{ color: '#ec4899' }} /> Shoots Done
                  </div>
                </div>
                <div style={{ width: '38px', height: '38px', background: 'rgba(236,72,153,0.12)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ec4899' }}>
                  <Camera size={18} />
                </div>
              </div>
            </div>

            <div className="stat-card" style={{ borderLeft: '4px solid #8b5cf6' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div className="metric-value" style={{ color: '#8b5cf6' }}>{(mediaTotals?.totalStaticPosts || 0) + (mediaTotals?.totalCarousels || 0)}</div>
                  <div className="metric-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Grid3x3 size={12} style={{ color: '#8b5cf6' }} /> Posts & Carousels
                  </div>
                </div>
                <div style={{ width: '38px', height: '38px', background: 'rgba(139,92,246,0.12)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6' }}>
                  <Grid3x3 size={18} />
                </div>
              </div>
            </div>

            <div className="stat-card" style={{ borderLeft: '4px solid #f59e0b' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div className="metric-value" style={{ color: '#f59e0b' }}>{mediaTotals?.grandTotal || 0}</div>
                  <div className="metric-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Award size={12} style={{ color: '#f59e0b' }} /> Grand Total Output
                  </div>
                </div>
                <div style={{ width: '38px', height: '38px', background: 'rgba(245,158,11,0.12)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
                  <Award size={18} />
                </div>
              </div>
            </div>
          </div>

          {/* Media Sub-Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            {[
              { id: 'matrix', label: `👥 Creator Output Matrix (${mediaProduction.length})` },
              { id: 'internal', label: `🏢 Internal Brands (7 Properties)` },
              { id: 'external', label: `🤝 External Clients` },
              { id: 'inventory', label: `📁 Itemized Content Catalog (${contentInventory.length})` }
            ].map(sub => (
              <button
                key={sub.id}
                onClick={() => setMediaSubTab(sub.id as any)}
                style={{
                  padding: '6px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                  fontSize: '0.78rem', fontWeight: 700, transition: 'all 0.15s',
                  background: mediaSubTab === sub.id ? 'var(--brand-primary)' : 'var(--bg-elevated)',
                  color: mediaSubTab === sub.id ? 'white' : 'var(--text-secondary)'
                }}
              >
                {sub.label}
              </button>
            ))}
          </div>

          {/* SUB-VIEW 1: CREATOR OUTPUT MATRIX */}
          {mediaSubTab === 'matrix' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {mediaProduction.map(item => {
                const isExp = expandedMediaId === item.employee.id
                const name = item.employee.full_name || 'Team Member'
                const nameLower = name.toLowerCase()

                const roleBadge = 
                  nameLower.includes('suyog') ? { title: '🎬 Lead Video Editor - Internal Brands & Shoots', color: '#6366f1' } :
                  nameLower.includes('kedar') ? { title: '🤝 Co-Founder & Client Strategy - Client Videos & Shoots', color: '#10b981' } :
                  nameLower.includes('rohan') ? { title: '🎨 Post & Carousel Creation - Graphics & Shoots', color: '#f59e0b' } :
                  nameLower.includes('pooja') ? { title: '🚀 Social Media Distribution & LNS Operations', color: '#ec4899' } :
                  nameLower.includes('shreya') ? { title: '🚀 Social Media Posting & Channel Management', color: '#8b5cf6' } :
                  { title: item.employee.designation || 'Media Team Member', color: 'var(--brand-primary)' }

                return (
                  <div
                    key={item.employee.id}
                    className="glass-card"
                    style={{
                      overflow: 'hidden',
                      border: '1px solid var(--border-default)',
                      background: 'var(--bg-card)',
                    }}
                  >
                    {/* Header Row */}
                    <div
                      onClick={() => setExpandedMediaId(isExp ? null : item.employee.id)}
                      style={{
                        padding: '1.1rem 1.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem',
                        cursor: 'pointer',
                        flexWrap: 'wrap',
                      }}
                    >
                      {/* Creator Profile */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', minWidth: '240px', flex: 1 }}>
                        {item.employee.avatar_url ? (
                          <img
                            src={item.employee.avatar_url}
                            alt={name}
                            style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-default)' }}
                          />
                        ) : (
                          <div className="avatar avatar-lg" style={{ flexShrink: 0, fontWeight: 800 }}>{getInitials(name)}</div>
                        )}
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                            <p style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)', margin: 0 }}>{name}</p>
                            <span style={{ fontSize: '0.65rem', fontWeight: 800, padding: '2px 7px', borderRadius: '99px', background: `${roleBadge.color}18`, color: roleBadge.color, border: `1px solid ${roleBadge.color}30` }}>
                              {roleBadge.title}
                            </span>
                          </div>
                          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: '3px 0 0' }}>
                            🏢 Internal: <strong style={{ color: '#10b981' }}>{item.internalTotal}</strong> &nbsp;·&nbsp; 🤝 Clients: <strong style={{ color: '#818cf8' }}>{item.externalTotal}</strong> &nbsp;·&nbsp; {item.employee.email}
                          </p>
                        </div>
                      </div>

                      {/* Production KPIs Pills */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                        <div style={{ padding: '4px 8px', borderRadius: '6px', background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', textAlign: 'center', minWidth: '55px' }}>
                          <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#6366f1' }}>{item.reels}</span>
                          <p style={{ fontSize: '0.6rem', fontWeight: 700, color: 'var(--text-muted)', margin: 0 }}>Reels</p>
                        </div>

                        <div style={{ padding: '4px 8px', borderRadius: '6px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', textAlign: 'center', minWidth: '55px' }}>
                          <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#ef4444' }}>{item.youtube}</span>
                          <p style={{ fontSize: '0.6rem', fontWeight: 700, color: 'var(--text-muted)', margin: 0 }}>YouTube</p>
                        </div>

                        <div style={{ padding: '4px 8px', borderRadius: '6px', background: 'rgba(236,72,153,0.08)', border: '1px solid rgba(236,72,153,0.2)', textAlign: 'center', minWidth: '55px' }}>
                          <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#ec4899' }}>{item.shooting}</span>
                          <p style={{ fontSize: '0.6rem', fontWeight: 700, color: 'var(--text-muted)', margin: 0 }}>Shoots</p>
                        </div>

                        <div style={{ padding: '4px 8px', borderRadius: '6px', background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', textAlign: 'center', minWidth: '55px' }}>
                          <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#8b5cf6' }}>{item.staticPosts + item.carousels}</span>
                          <p style={{ fontSize: '0.6rem', fontWeight: 700, color: 'var(--text-muted)', margin: 0 }}>Posts</p>
                        </div>

                        <div style={{ padding: '4px 8px', borderRadius: '6px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', textAlign: 'center', minWidth: '55px' }}>
                          <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#10b981' }}>{item.published}</span>
                          <p style={{ fontSize: '0.6rem', fontWeight: 700, color: 'var(--text-muted)', margin: 0 }}>Published</p>
                        </div>

                        <div style={{ padding: '4px 10px', borderRadius: '8px', background: 'rgba(16,185,129,0.14)', border: '1.5px solid rgba(16,185,129,0.35)', textAlign: 'center', minWidth: '70px' }}>
                          <span style={{ fontSize: '1rem', fontWeight: 900, color: '#10b981' }}>{item.totalDeliverables}</span>
                          <p style={{ fontSize: '0.6rem', fontWeight: 800, color: '#10b981', margin: 0 }}>Total Output</p>
                        </div>

                        <div style={{ color: 'var(--text-muted)', marginLeft: '4px' }}>
                          {isExp ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Detail Panel */}
                    {isExp && (
                      <div style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-elevated)', padding: '1.25rem' }}>
                        {/* Internal Brands Breakdown */}
                        {item.internalBreakdown.length > 0 && (
                          <div style={{ marginBottom: '1.25rem' }}>
                            <h4 style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#10b981', marginBottom: '0.75rem' }}>
                              🏢 Internal Brand Work ({item.internalTotal} items)
                            </h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
                              {item.internalBreakdown.map(ib => (
                                <div key={ib.brandName} style={{ background: 'var(--bg-card)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid rgba(16,185,129,0.2)' }}>
                                  <p style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)', margin: '0 0 4px 0' }}>{ib.brandName}</p>
                                  <div style={{ display: 'flex', gap: '6px', fontSize: '0.72rem', color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
                                    {ib.reels > 0 && <span>🎬 {ib.reels} Reels</span>}
                                    {ib.youtube > 0 && <span>🎥 {ib.youtube} YT</span>}
                                    {ib.shooting > 0 && <span>📸 {ib.shooting} Shoots</span>}
                                    {ib.staticPosts > 0 && <span>🖼️ {ib.staticPosts} Static</span>}
                                    {ib.carousels > 0 && <span>📑 {ib.carousels} Carousels</span>}
                                    {ib.published > 0 && <span>🚀 {ib.published} Live</span>}
                                    <span style={{ fontWeight: 800, color: '#10b981', marginLeft: 'auto' }}>Total: {ib.total}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* External Clients Breakdown */}
                        {item.externalBreakdown.length > 0 && (
                          <div style={{ marginBottom: '1.25rem' }}>
                            <h4 style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#818cf8', marginBottom: '0.75rem' }}>
                              🤝 External Client Deliverables ({item.externalTotal} items)
                            </h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
                              {item.externalBreakdown.map(eb => (
                                <div key={eb.brandName} style={{ background: 'var(--bg-card)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid rgba(99,102,241,0.2)' }}>
                                  <p style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)', margin: '0 0 4px 0' }}>{eb.brandName}</p>
                                  <div style={{ display: 'flex', gap: '6px', fontSize: '0.72rem', color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
                                    {eb.reels > 0 && <span>🎬 {eb.reels} Reels</span>}
                                    {eb.youtube > 0 && <span>🎥 {eb.youtube} YT</span>}
                                    {eb.shooting > 0 && <span>📸 {eb.shooting} Shoots</span>}
                                    {eb.staticPosts > 0 && <span>🖼️ {eb.staticPosts} Static</span>}
                                    {eb.carousels > 0 && <span>📑 {eb.carousels} Carousels</span>}
                                    {eb.published > 0 && <span>🚀 {eb.published} Live</span>}
                                    <span style={{ fontWeight: 800, color: '#818cf8', marginLeft: 'auto' }}>Total: {eb.total}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* SUB-VIEW 2 & 3: INTERNAL BRANDS OR EXTERNAL CLIENTS BREAKDOWN */}
          {(mediaSubTab === 'internal' || mediaSubTab === 'external') && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
              {(() => {
                const isInt = mediaSubTab === 'internal'
                const brandMap: Record<string, { reels: number; youtube: number; shooting: number; staticPosts: number; carousels: number; published: number; total: number; creators: Set<string> }> = {}

                for (const emp of mediaProduction) {
                  const targetBreakdown = isInt ? emp.internalBreakdown : emp.externalBreakdown
                  for (const b of targetBreakdown) {
                    if (!brandMap[b.brandName]) {
                      brandMap[b.brandName] = { reels: 0, youtube: 0, shooting: 0, staticPosts: 0, carousels: 0, published: 0, total: 0, creators: new Set() }
                    }
                    brandMap[b.brandName].reels += b.reels
                    brandMap[b.brandName].youtube += b.youtube
                    brandMap[b.brandName].shooting += b.shooting
                    brandMap[b.brandName].staticPosts += b.staticPosts
                    brandMap[b.brandName].carousels += b.carousels
                    brandMap[b.brandName].published += b.published
                    brandMap[b.brandName].total += b.total
                    if (b.total > 0) brandMap[b.brandName].creators.add(emp.employee.full_name)
                  }
                }

                const entries = Object.entries(brandMap)
                if (entries.length === 0) {
                  return (
                    <div className="glass-card empty-state" style={{ gridColumn: '1 / -1' }}>
                      <p style={{ color: 'var(--text-muted)' }}>No production data logged yet for {isInt ? 'Internal Brands' : 'External Clients'} in {currentMonthLabel}</p>
                    </div>
                  )
                }

                return entries.map(([bName, data]) => (
                  <div key={bName} className="glass-card" style={{ padding: '1.25rem', borderTop: `4px solid ${isInt ? '#10b981' : '#6366f1'}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                      <div>
                        <h3 style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)', margin: 0 }}>{bName}</h3>
                        <span style={{ fontSize: '0.62rem', fontWeight: 700, padding: '1px 6px', borderRadius: '4px', background: isInt ? 'rgba(16,185,129,0.12)' : 'rgba(99,102,241,0.12)', color: isInt ? '#10b981' : '#818cf8' }}>
                          {isInt ? '🏢 Internal Property' : '🤝 Client Account'}
                        </span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.3rem', fontWeight: 900, color: isInt ? '#10b981' : '#6366f1' }}>{data.total}</div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Items</div>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginBottom: '0.75rem', fontSize: '0.72rem' }}>
                      <div style={{ background: 'var(--bg-elevated)', padding: '6px', borderRadius: '6px', textAlign: 'center' }}>
                        <strong style={{ color: '#6366f1', display: 'block', fontSize: '0.85rem' }}>{data.reels}</strong> Reels
                      </div>
                      <div style={{ background: 'var(--bg-elevated)', padding: '6px', borderRadius: '6px', textAlign: 'center' }}>
                        <strong style={{ color: '#ec4899', display: 'block', fontSize: '0.85rem' }}>{data.shooting}</strong> Shoots
                      </div>
                      <div style={{ background: 'var(--bg-elevated)', padding: '6px', borderRadius: '6px', textAlign: 'center' }}>
                        <strong style={{ color: '#8b5cf6', display: 'block', fontSize: '0.85rem' }}>{data.staticPosts + data.carousels}</strong> Posts
                      </div>
                    </div>

                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      <strong>Active Contributors:</strong> {Array.from(data.creators).join(', ') || 'None'}
                    </div>
                  </div>
                ))
              })()}
            </div>
          )}

          {/* SUB-VIEW 4: ITEMIZED CONTENT CATALOG */}
          {mediaSubTab === 'inventory' && (
            <div className="glass-card" style={{ padding: '1.25rem' }}>
              {/* Search and Filters */}
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Search by post title, brand, or creator..."
                  value={inventorySearch}
                  onChange={e => setInventorySearch(e.target.value)}
                  className="form-input"
                  style={{ flex: 1, minWidth: '220px', height: '34px', fontSize: '0.78rem' }}
                />

                <select
                  value={inventoryFilterBrand}
                  onChange={e => setInventoryFilterBrand(e.target.value)}
                  className="form-input"
                  style={{ width: 'auto', height: '34px', fontSize: '0.78rem' }}
                >
                  <option value="all">All Brands & Clients</option>
                  <option value="internal">🏢 Internal Brands Only</option>
                  <option value="external">🤝 External Clients Only</option>
                </select>

                <select
                  value={inventoryFilterPhase}
                  onChange={e => setInventoryFilterPhase(e.target.value)}
                  className="form-input"
                  style={{ width: 'auto', height: '34px', fontSize: '0.78rem' }}
                >
                  <option value="all">All Phases</option>
                  <option value="shooting">🎬 Shooting</option>
                  <option value="editing">✂️ Video Editing</option>
                  <option value="post_creation">🎨 Post Creation</option>
                  <option value="posting">🚀 Posting / Live</option>
                </select>
              </div>

              {filteredInventory.length === 0 ? (
                <div className="empty-state">
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No content items found matching your filters.</p>
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                    <thead>
                      <tr style={{ background: 'var(--bg-elevated)', borderBottom: '2px solid var(--border-default)' }}>
                        <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 700, color: 'var(--text-muted)' }}>Date</th>
                        <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 700, color: 'var(--text-muted)' }}>Brand / Property</th>
                        <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 700, color: 'var(--text-muted)' }}>Post / Content Title</th>
                        <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 700, color: 'var(--text-muted)' }}>Phase</th>
                        <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 700, color: 'var(--text-muted)' }}>Creator</th>
                        <th style={{ padding: '8px 12px', textAlign: 'center', fontWeight: 700, color: 'var(--text-muted)' }}>Count</th>
                        <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 700, color: 'var(--text-muted)' }}>Live Link</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredInventory.map((item, idx) => (
                        <tr key={item.id || idx} style={{ borderBottom: '1px solid var(--border-subtle)', background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)' }}>
                          <td style={{ padding: '8px 12px', color: 'var(--text-secondary)', fontWeight: 600, whiteSpace: 'nowrap' }}>{item.logDate}</td>
                          <td style={{ padding: '8px 12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.brandColor || '#6366f1' }} />
                              <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{item.brandName}</span>
                              <span style={{ fontSize: '0.58rem', fontWeight: 700, padding: '1px 5px', borderRadius: '3px', background: item.clientType === 'internal' ? 'rgba(16,185,129,0.12)' : 'rgba(99,102,241,0.12)', color: item.clientType === 'internal' ? '#10b981' : '#818cf8' }}>
                                {item.clientType === 'internal' ? 'Internal' : 'Client'}
                              </span>
                            </div>
                          </td>
                          <td style={{ padding: '8px 12px', fontWeight: 600, color: 'var(--text-primary)' }}>{item.title}</td>
                          <td style={{ padding: '8px 12px' }}>
                            <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', background: 'var(--bg-elevated)', color: 'var(--text-secondary)' }}>
                              {item.taskPhase}
                            </span>
                          </td>
                          <td style={{ padding: '8px 12px', color: 'var(--text-primary)', fontWeight: 600 }}>{item.creatorName}</td>
                          <td style={{ padding: '8px 12px', textAlign: 'center', fontWeight: 800, color: '#10b981' }}>{item.count}</td>
                          <td style={{ padding: '8px 12px' }}>
                            {item.liveUrl ? (
                              <a href={item.liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#10b981', fontWeight: 700, textDecoration: 'underline' }}>
                                🔗 Open
                              </a>
                            ) : (
                              <span style={{ color: 'var(--text-muted)' }}>—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          TAB 2: GENERAL TASKS & PERFORMANCE OVERVIEW
      ══════════════════════════════════════════════════════════ */}
      {activeTab === 'tasks' && (
        <div className="animate-fade-in">
          {/* Global KPIs */}
          {globalStats && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { label: 'Total Tasks', value: globalStats.total_tasks, icon: BarChart3, color: '#6366f1' },
                { label: 'Completed', value: globalStats.completed, icon: CheckCircle2, color: '#10b981' },
                { label: 'In Progress', value: globalStats.in_progress, icon: Clock, color: '#3b82f6' },
                { label: 'Overdue', value: globalStats.overdue, icon: AlertTriangle, color: '#ef4444' },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="stat-card">
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div>
                      <div className="metric-value" style={{ color }}>{value}</div>
                      <div className="metric-label">{label}</div>
                    </div>
                    <div style={{ width: '40px', height: '40px', background: `${color}18`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color, border: `1px solid ${color}22` }}>
                      <Icon size={18} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Charts */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1.25rem' }}>Task Completion by Employee</h3>
              {completionChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={completionChartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} unit="%" />
                    <Tooltip formatter={(v) => [`${v}%`]} contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: '8px', fontSize: '0.8rem' }} />
                    <Legend wrapperStyle={{ fontSize: '0.75rem' }} />
                    <Bar dataKey="Completion %" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="On-Time %" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="empty-state" style={{ height: '160px' }}><p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>No task data yet</p></div>
              )}
            </div>

            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1.25rem' }}>Daily Reports Submitted This Month</h3>
              {reportsChartData.some(d => d.Reports > 0) ? (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={reportsChartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
                    <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} allowDecimals={false} />
                    <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: '8px', fontSize: '0.8rem' }} />
                    <Bar dataKey="Reports" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="empty-state" style={{ height: '160px' }}><p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>No reports this month</p></div>
              )}
            </div>
          </div>

          {/* Individual Performance Cards */}
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Individual Performance</h2>

          {performance.length === 0 ? (
            <div className="glass-card">
              <div className="empty-state">
                <div className="empty-state-icon"><BarChart3 size={24} /></div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>No employee data available</p>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {performance.map(perf => {
                const isExpanded = expandedEmpId === perf.employee.id
                const activeDateKey = `${perf.employee.id}::${activeDate}`
                const activeReport = isExpanded && activeDate
                  ? perf.reports.details.find(d => `${perf.employee.id}::${d.date}` === activeDateKey)
                  : null

                return (
                  <div key={perf.employee.id} className="glass-card" style={{ overflow: 'hidden', transition: 'all 0.2s' }}>
                    <div
                      onClick={() => {
                        if (isExpanded) { setExpandedEmpId(null); setActiveDate(null) }
                        else { setExpandedEmpId(perf.employee.id); setActiveDate(null) }
                      }}
                      style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', cursor: 'pointer', flexWrap: 'wrap' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', minWidth: '180px', flex: 1 }}>
                        {perf.employee.avatar_url ? (
                          <img
                            src={perf.employee.avatar_url}
                            alt={perf.employee.full_name}
                            style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '2px solid var(--border-default)' }}
                          />
                        ) : (
                          <div className="avatar avatar-lg" style={{ flexShrink: 0 }}>{getInitials(perf.employee.full_name)}</div>
                        )}
                        <div>
                          <p style={{ fontWeight: 700, fontSize: '0.95rem' }}>{perf.employee.full_name}</p>
                          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                            {perf.employee.designation || 'Employee'}
                            {perf.employee.department ? ` — ${perf.employee.department}` : ''}
                          </p>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '1.5rem' }}>
                        {[
                          { label: 'Tasks', value: perf.tasks.total, color: 'var(--text-primary)' },
                          { label: 'Done', value: perf.tasks.completed, color: '#10b981' },
                          { label: 'Active', value: perf.tasks.in_progress + perf.tasks.pending, color: '#3b82f6' },
                          { label: 'Overdue', value: perf.tasks.overdue, color: '#ef4444' },
                        ].map(({ label, value, color }) => (
                          <div key={label} style={{ textAlign: 'center', minWidth: '48px' }}>
                            <div style={{ fontSize: '1.2rem', fontWeight: 800, color }}>{value}</div>
                            <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', marginTop: '1px' }}>{label}</div>
                          </div>
                        ))}
                      </div>

                      <div style={{ textAlign: 'center', minWidth: '72px' }}>
                        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#6366f1' }}>{perf.completionRate}%</div>
                        <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>Completion</div>
                        <div style={{ marginTop: '4px', height: '3px', borderRadius: '99px', background: 'var(--border-subtle)' }}>
                          <div style={{ height: '3px', borderRadius: '99px', width: `${perf.completionRate}%`, background: 'linear-gradient(90deg,#6366f1,#8b5cf6)' }} />
                        </div>
                      </div>

                      <div style={{
                        padding: '0.5rem 0.875rem', borderRadius: 'var(--radius-md)', textAlign: 'center',
                        background: perf.reports.total_this_month > 0 ? 'rgba(245,158,11,0.08)' : 'var(--bg-elevated)',
                        border: `1px solid ${perf.reports.total_this_month > 0 ? 'rgba(245,158,11,0.25)' : 'var(--border-subtle)'}`,
                        minWidth: '80px'
                      }}>
                        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: perf.reports.total_this_month > 0 ? '#f59e0b' : 'var(--text-muted)' }}>
                          {perf.reports.total_this_month}
                        </div>
                        <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>Reports</div>
                      </div>

                      {isExpanded
                        ? <ChevronUp size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                        : <ChevronDown size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />}
                    </div>

                    {isExpanded && (
                      <div style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-elevated)' }}>
                        <div style={{ padding: '0.875rem 1.25rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', marginRight: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            {currentMonthLabel}:
                          </span>
                          {perf.reports.details.length === 0 ? (
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>No reports submitted this month</span>
                          ) : perf.reports.details.map(rpt => {
                            const key = `${perf.employee.id}::${rpt.date}`
                            const isActive = key === activeDateKey
                            return (
                              <button
                                key={rpt.date}
                                onClick={e => { e.stopPropagation(); setActiveDate(isActive ? null : rpt.date) }}
                                style={{
                                  padding: '5px 12px', borderRadius: '99px', border: 'none', cursor: 'pointer',
                                  fontSize: '0.75rem', fontWeight: 700, transition: 'all 0.15s',
                                  background: isActive ? 'var(--brand-primary)' : 'rgba(16,185,129,0.1)',
                                  color: isActive ? 'white' : '#10b981',
                                  boxShadow: isActive ? '0 2px 8px rgba(14,61,53,0.3)' : 'none',
                                  outline: isActive ? '2px solid var(--brand-primary)' : '1px solid rgba(16,185,129,0.25)',
                                  outlineOffset: '1px'
                                }}
                              >
                                {new Date(rpt.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                {' '}
                                <span style={{ opacity: 0.7 }}>({rpt.entries.length})</span>
                              </button>
                            )
                          })}
                        </div>

                        {activeReport && (
                          <div style={{ margin: '0 1.25rem 1.25rem', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-default)', background: 'var(--bg-card)', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
                            <div style={{ padding: '0.875rem 1.25rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(135deg, rgba(14,61,53,0.06) 0%, transparent 100%)' }}>
                              <div>
                                <p style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--brand-primary)' }}>
                                  {new Date(activeReport.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                </p>
                                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                                  {activeReport.entries.length} work item{activeReport.entries.length !== 1 ? 's' : ''} logged
                                </p>
                              </div>
                              <button
                                onClick={e => { e.stopPropagation(); setActiveDate(null) }}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', padding: '4px' }}
                              >
                                <X size={16} />
                              </button>
                            </div>

                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                              <thead>
                                <tr style={{ background: 'var(--bg-elevated)' }}>
                                  <th style={{ padding: '0.45rem 1.25rem', textAlign: 'left', fontSize: '0.63rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', width: '200px' }}>Responsibility</th>
                                  <th style={{ padding: '0.45rem 1rem', textAlign: 'left', fontSize: '0.63rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>Description</th>
                                  <th style={{ padding: '0.45rem 1.25rem', textAlign: 'center', fontSize: '0.63rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', width: '70px' }}>Count</th>
                                </tr>
                              </thead>
                              <tbody>
                                {activeReport.entries.map((entry, i) => (
                                  <tr key={i} style={{ borderTop: '1px solid var(--border-subtle)' }}>
                                    <td style={{ padding: '0.75rem 1.25rem', verticalAlign: 'top' }}>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <CheckCircle size={12} style={{ color: '#10b981', flexShrink: 0 }} />
                                        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>{entry.description}</span>
                                      </div>
                                    </td>
                                    <td style={{ padding: '0.75rem 1rem', verticalAlign: 'top' }}>
                                      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{entry.notes || '—'}</p>
                                    </td>
                                    <td style={{ padding: '0.75rem 1.25rem', textAlign: 'center', verticalAlign: 'top' }}>
                                      <span style={{ fontSize: '0.9rem', fontWeight: 800, color: entry.count > 0 ? 'var(--brand-primary)' : 'var(--text-muted)' }}>
                                        {entry.count > 0 ? entry.count : '—'}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>

                            {activeReport.note && (
                              <div style={{ padding: '0.75rem 1.25rem', borderTop: '1px solid var(--border-subtle)', background: 'rgba(99,102,241,0.04)', display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
                                <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#6366f1', flexShrink: 0, marginTop: '1px' }}>Note</span>
                                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{activeReport.note}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
