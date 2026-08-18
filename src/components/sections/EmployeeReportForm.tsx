'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from '@/lib/ThemeContext'
import { Mic, MicOff, Loader2, Plus, Trash2, X, SendHorizonal, Search, Building2, ChevronDown } from 'lucide-react'

interface Row { responsibility: string; daily_target: number | null; description: string; count: string; isCustom?: boolean; clientId?: string }

interface SearchableClientDropdownProps {
  clients: { id: string; name: string; color: string }[]
  selectedId: string
  disabled?: boolean
  onSelect: (id: string) => void
}

function SearchableClientDropdown({ clients, selectedId, disabled, onSelect }: SearchableClientDropdownProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const selectedClient = clients.find(c => c.id === selectedId)

  const filteredClients = useMemo(() => {
    if (!search.trim()) return clients
    return clients.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
  }, [clients, search])

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      setTimeout(() => searchInputRef.current?.focus(), 50)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  return (
    <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(!open)}
        style={{
          fontSize: '0.7rem',
          padding: '3px 8px',
          borderRadius: '6px',
          background: selectedClient ? 'rgba(99,102,241,0.15)' : 'var(--bg-surface)',
          color: selectedClient ? '#818cf8' : 'var(--text-muted)',
          border: selectedClient ? '1px solid rgba(99,102,241,0.4)' : '1px solid var(--border-default)',
          outline: 'none',
          cursor: disabled ? 'not-allowed' : 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          maxWidth: '160px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fontWeight: selectedClient ? 700 : 500,
          transition: 'all 0.15s'
        }}
      >
        <Building2 size={11} style={{ flexShrink: 0 }} />
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {selectedClient ? selectedClient.name : 'Tag Client'}
        </span>
        <ChevronDown size={10} style={{ flexShrink: 0, opacity: 0.7 }} />
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 4px)',
          left: 0,
          zIndex: 9999,
          background: 'var(--bg-card)',
          border: '1px solid var(--border-default)',
          borderRadius: '8px',
          boxShadow: '0 10px 28px rgba(0,0,0,0.4)',
          width: '220px',
          overflow: 'hidden'
        }}>
          {/* Search Bar */}
          <div style={{
            padding: '6px 8px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'var(--bg-surface)'
          }}>
            <Search size={12} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search client..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: '0.74rem',
                color: 'var(--text-primary)',
                fontFamily: 'inherit'
              }}
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}
              >
                <X size={10} />
              </button>
            )}
          </div>

          {/* Client List */}
          <div style={{ maxHeight: '170px', overflowY: 'auto', padding: '4px' }}>
            <button
              type="button"
              onClick={() => { onSelect(''); setOpen(false) }}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '5px 8px',
                fontSize: '0.72rem',
                background: !selectedId ? 'rgba(99,102,241,0.1)' : 'transparent',
                color: !selectedId ? '#818cf8' : 'var(--text-muted)',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span style={{ fontStyle: 'italic' }}>— No Client —</span>
            </button>

            {filteredClients.map(c => (
              <button
                key={c.id}
                type="button"
                onClick={() => { onSelect(c.id); setOpen(false) }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '5px 8px',
                  fontSize: '0.74rem',
                  fontWeight: selectedId === c.id ? 700 : 500,
                  background: selectedId === c.id ? 'rgba(99,102,241,0.15)' : 'transparent',
                  color: selectedId === c.id ? '#818cf8' : 'var(--text-primary)',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'background 0.1s'
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-hover)')}
                onMouseLeave={e => (e.currentTarget.style.background = selectedId === c.id ? 'rgba(99,102,241,0.15)' : 'transparent')}
              >
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: c.color || '#6366f1',
                  flexShrink: 0
                }} />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {c.name}
                </span>
              </button>
            ))}

            {filteredClients.length === 0 && (
              <div style={{ padding: '8px', textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                No client found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

const todayDate = () => {
  const d = new Date()
  const offset = d.getTimezoneOffset() * 60000
  const istTime = new Date(d.getTime() + offset + (330 * 60000))
  return istTime.toISOString().slice(0, 10)
}
const fmtDay = (d: string) => new Date(d + 'T00:00:00').toLocaleDateString('en-IN', {
  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
})

type MicState = 'idle' | 'recording' | 'processing'

export default function DailyReportForm({ onClose, onSaved, existingReport, isAdmin, targetDate, targetEmployeeId, isClientWorker }: {
  onClose: () => void; onSaved: () => void
  existingReport?: any; isAdmin?: boolean
  targetDate?: string; targetEmployeeId?: string
  isClientWorker?: boolean  // if false, hide client tag dropdowns
}) {
  const router = useRouter()
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const reportDate = isAdmin && targetDate ? targetDate : todayDate()
  const isLocked = !isAdmin && reportDate !== todayDate()

  const [rows, setRows] = useState<Row[]>([])
  const [clientsList, setClientsList] = useState<{ id: string; name: string; color: string }[]>([])
  const [note, setNote] = useState(existingReport?.note || '')
  const [checkInTime, setCheckInTime] = useState<string>(existingReport?.check_in_time?.slice(0,5) || '')
  const [checkOutTime, setCheckOutTime] = useState<string>(existingReport?.check_out_time?.slice(0,5) || '')
  const [micState, setMicState] = useState<MicState>('idle')
  const [transcript, setTranscript] = useState('')
  const [micMsg, setMicMsg] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [customTask, setCustomTask] = useState('')
  const [loading, setLoading] = useState(true)
  const mediaRecRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const recognitionRef = useRef<any>(null)
  const interimRef = useRef('')

  const getToken = () => typeof window !== 'undefined' ? (localStorage.getItem('rushi_token') || '') : ''

  // Load responsibilities + clients + today's assigned tasks
  useEffect(() => {
    (async () => {
      const token = getToken()
      if (!token) return

      // Fetch active clients for tagging
      try {
        const cRes = await fetch('/api/client-progress', { headers: { Authorization: `Bearer ${token}` } })
        const cData = await cRes.json()
        if (Array.isArray(cData.clients)) {
          setClientsList(cData.clients.map((c: any) => ({ id: c.id, name: c.name, color: c.color })))
        }
      } catch {}

      // Fetch employee responsibilities
      const empId = isAdmin && targetEmployeeId ? `?employee_id=${targetEmployeeId}` : ''
      const res = await fetch(`/api/responsibilities${empId}`, { headers: { Authorization: `Bearer ${token}` } })
      const resps = await res.json()
      
      // Clean responsibility titles (strip trailing 0 from old seeds)
      const respList: { title: string; daily_target: number | null }[] = Array.isArray(resps)
        ? resps
            .filter((r: any) => {
              const t = (r.title || '').toLowerCase()
              return !t.includes('enrollment') && !t.includes('admission')
            })
            .map((r: any) => {
              const cleanTitle = (r.title || '').replace(/0+$/, '').trim()
              return { title: cleanTitle || r.title, daily_target: r.daily_target ?? null }
            })
        : []

      // Fetch pending regular responsibility tasks assigned to this employee
      const tasksRes = await fetch('/api/tasks', { headers: { Authorization: `Bearer ${token}` } })
      const tasksData = await tasksRes.json()
      const pendingTasks: Row[] = Array.isArray(tasksData)
        ? tasksData
            .filter((t: any) => t.task_type === 'regular' && t.status !== 'completed' && t.status !== 'cancelled')
            .map((t: any) => ({
              responsibility: `📋 ${t.title}`,
              daily_target: null,
              description: '',
              count: '1',
              isCustom: true,
            }))
        : []

      // Build rows: pre-fill from responsibilities, overlay existing entries
      if (existingReport?.entries?.length) {
        const mapped: Row[] = respList.map(r => {
          const existing = existingReport.entries.find((e: any) => (e.description || '').replace(/0+$/, '').trim() === r.title)
          return { responsibility: r.title, daily_target: r.daily_target, description: existing?.notes || '', count: String(existing?.count ?? ''), isCustom: false, clientId: existing?.clientId }
        })
        // Add any custom rows from existing report
        existingReport.entries.forEach((e: any) => {
          const cleanDesc = (e.description || '').replace(/0+$/, '').trim()
          const isEnrollment = cleanDesc.toLowerCase().includes('enrollment')
          if (!isEnrollment && !respList.find(r => r.title === cleanDesc)) {
            mapped.push({ responsibility: cleanDesc, daily_target: null, description: e.notes || '', count: String(e.count ?? ''), isCustom: true, clientId: e.clientId })
          }
        })
        setRows(mapped)
      } else {
        const respRows = respList.length
          ? respList.map(r => ({ responsibility: r.title, daily_target: r.daily_target, description: '', count: '' }))
          : [{ responsibility: '', daily_target: null, description: '', count: '', isCustom: true }]
        // Inject pending tasks as extra rows (avoid duplicates)
        const taskRows = pendingTasks.filter(pt =>
          !respRows.some(r => r.responsibility === pt.responsibility)
        )
        setRows([...respRows, ...taskRows])
      }
      setLoading(false)
    })()
  }, [])

  const update = (i: number, field: keyof Row, val: string) =>
    setRows(p => p.map((r, idx) => idx === i ? { ...r, [field]: val } : r))

  const duplicateClientRow = (i: number) => {
    const base = rows[i]
    const newRow: Row = {
      responsibility: base.responsibility,
      daily_target: null,
      description: '',
      count: '1',
      isCustom: true,
      clientId: ''
    }
    setRows(p => {
      const copy = [...p]
      copy.splice(i + 1, 0, newRow)
      return copy
    })
  }

  const addCustom = () => {
    const t = customTask.trim()
    if (!t) return
    setRows(p => [...p, { responsibility: t, daily_target: null, description: '', count: '', isCustom: true }])
    setCustomTask('')
  }

  const removeRow = (i: number) => setRows(p => p.filter((_, idx) => idx !== i))

  // ── VOICE: MediaRecorder + Deepgram (transcription) + Gemini text (parsing) ──
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

      // Pick best supported mimeType — iOS Safari only supports mp4, Chrome uses webm
      const preferredTypes = [
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/mp4',
        'audio/ogg;codecs=opus',
        'audio/ogg',
        '',  // browser default
      ]
      const mimeType = preferredTypes.find(t => !t || MediaRecorder.isTypeSupported(t)) || ''
      const recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream)

      chunksRef.current = []

      recorder.ondataavailable = e => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data)
      }

      recorder.onstop = async () => {
        stream.getTracks().forEach(t => t.stop())
        const audioBlob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' })

        if (audioBlob.size < 500) {
          setMicState('idle')
          setMicMsg('Recording too short. Hold the button and speak, then tap stop.')
          return
        }

        setMicState('processing')
        setMicMsg('Transcribing... please wait')

        try {
          const base64data = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => {
              const res = reader.result as string
              resolve(res.split(',')[1])
            }
            reader.onerror = reject
            reader.readAsDataURL(audioBlob)
          })

          const token = getToken()
          if (!token) return
          const res = await fetch('/api/reports/transcribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ audioBase64: base64data, mimeType: recorder.mimeType || 'audio/webm' })
          })
          const data = await res.json()

          if (!res.ok || !data.transcript) {
            setMicState('idle')
            setMicMsg(data.error || 'Could not understand. Please try again.')
            return
          }

          setTranscript(data.transcript)
          setMicMsg(`Heard: "${data.transcript}". Parsing...`)
          await parseTranscript(data.transcript)
        } catch (err: any) {
          setMicState('idle')
          setMicMsg(`Error: ${err.message}`)
        }
      }

      mediaRecRef.current = recorder
      recorder.start() // Do not use a timeslice to prevent WebM header corruption on Windows
      setMicState('recording')
      setMicMsg('🔴 Recording… speak now, tap stop when done')
      setTranscript('')
    } catch (err: any) {
      setMicMsg(`Mic error: ${err.message || 'Cannot access microphone. Check permissions.'}`)
    }
  }

  const stopRecording = () => {
    if (mediaRecRef.current && mediaRecRef.current.state === 'recording') {
      mediaRecRef.current.stop()
      setMicState('processing')
      setMicMsg('Processing audio...')
    }
  }

  // Send transcript text to Gemini for structured parsing
  const parseTranscript = async (text: string) => {
    if (!text.trim()) return
    setMicState('processing')
    setMicMsg('AI is reading your narration...')
    try {
      const respNames = rows.map(r => r.responsibility).filter(Boolean)
      const token = getToken()
      if (!token) return
      const res = await fetch('/api/reports/voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ transcript: text, responsibilities: respNames })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Parse failed')

      if (data.checkInTime) setCheckInTime(data.checkInTime)
      if (data.checkOutTime) setCheckOutTime(data.checkOutTime)

      const parsed: { responsibility: string; description: string; count: number; client?: string }[] = data.items || []
      if (parsed.length > 0) {
        setRows(prev => {
          const updated = [...prev]
          parsed.forEach(p => {
            let matchedCId = ''
            if (p.client) {
              const found = clientsList.find(c =>
                c.name.toLowerCase().includes(p.client!.toLowerCase()) ||
                p.client!.toLowerCase().includes(c.name.toLowerCase())
              )
              if (found) matchedCId = found.id
            }
            if (!matchedCId) {
              const found = clientsList.find(c =>
                (p.description || '').toLowerCase().includes(c.name.toLowerCase())
              )
              if (found) matchedCId = found.id
            }

            const cleanPResp = (p.responsibility || '').replace(/0+$/, '').trim()
            // Check if we have an empty row for this responsibility without description
            const idx = updated.findIndex(r =>
              r.responsibility.toLowerCase() === cleanPResp.toLowerCase() && !r.description
            )
            if (idx >= 0) {
              updated[idx] = {
                ...updated[idx],
                description: p.description,
                count: String(p.count ?? '1'),
                clientId: matchedCId || updated[idx].clientId
              }
            } else {
              updated.push({
                responsibility: cleanPResp,
                daily_target: null,
                description: p.description,
                count: String(p.count ?? '1'),
                isCustom: true,
                clientId: matchedCId
              })
            }
          })
          return updated
        })
        setMicMsg(`✨ AI filled ${parsed.length} item${parsed.length !== 1 ? 's' : ''}. Review and submit.`)
      } else {
        setMicMsg('Could not parse. Try again or type manually.')
      }
    } catch (err: any) {
      setMicMsg(`Error: ${err.message}`)
    }
    setMicState('idle')
  }


  const handleSubmit = async () => {
    const valid = rows.filter(r => r.responsibility.trim() && (r.description.trim() || r.count.trim()))
    if (!valid.length) return
    setSubmitting(true)
    const token = getToken()
    if (!token) return
    const entries = valid.map(r => ({
      description: r.responsibility.trim(),
      notes: r.description.trim(),
      count: r.count.trim() ? Number(r.count) : 1,
      clientId: r.clientId || undefined,
    }))
    await fetch('/api/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        report_date: reportDate, entries, note,
        check_in_time: checkInTime || null,
        check_out_time: checkOutTime || null,
        ...(isAdmin && targetEmployeeId ? { employee_id: targetEmployeeId } : {}),
      }),
    })
    onSaved()
    setSubmitting(false)
  }

  const filled = rows.filter(r => r.responsibility.trim() && (r.description.trim() || r.count.trim())).length

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-content" style={{ maxWidth: '720px', maxHeight: '92vh', padding: 0, display: 'flex', flexDirection: 'column' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem', borderBottom: '1px solid var(--border-default)' }}>
          <div>
            <h3 style={{ fontWeight: 700 }}>Daily Report — {fmtDay(reportDate)}</h3>
            {isAdmin && <p style={{ fontSize: '0.72rem', color: '#6366f1', marginTop: '2px' }}>Admin mode — can edit any date</p>}
            {isLocked && <p style={{ fontSize: '0.72rem', color: '#ef4444', marginTop: '2px' }}>Previous day — view only</p>}
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}><X size={18} /></button>
        </div>

        {/* Mic */}
        {!isLocked && (
          <div style={{ padding: '0.875rem 1.25rem', borderBottom: '1px solid var(--border-subtle)', background: micState === 'recording' ? 'rgba(239,68,68,0.06)' : 'var(--bg-elevated)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
              <button
                onClick={micState === 'idle' ? startRecording : micState === 'recording' ? stopRecording : undefined}
                disabled={micState === 'processing'}
                style={{
                  width: '52px', height: '52px', borderRadius: '50%', border: 'none',
                  cursor: micState === 'processing' ? 'wait' : 'pointer',
                  background: micState === 'recording' ? '#ef4444' : 'var(--brand-primary)', color: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  boxShadow: micState === 'recording' ? '0 0 0 10px rgba(239,68,68,0.15)' : '0 2px 10px rgba(14,61,53,0.3)',
                  transition: 'all 0.2s', opacity: micState === 'processing' ? 0.7 : 1,
                }}>
                {micState === 'processing' ? <Loader2 size={21} style={{ animation: 'spin 1s linear infinite' }} />
                  : micState === 'recording' ? <MicOff size={21} /> : <Mic size={21} />}
              </button>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.87rem', fontWeight: 600, color: micState === 'recording' ? '#ef4444' : 'var(--text-primary)' }}>
                  {micState === 'idle' && '🎤 Tap mic and speak — AI fills the sheet instantly'}
                  {micState === 'recording' && '🔴 Listening... speak clearly, tap stop when done'}
                  {micState === 'processing' && '⏳ AI is processing and filling your sheet...'}
                </p>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {micState === 'idle' && 'Say: "I edited 1 reel for CA, 1 reel for RushiPandit, and 1 YouTube video"'}
                  {micState === 'recording' && 'Mention clients and counts: "1 reel for CA, 2 reels for Alpha"'}
                  {micState === 'processing' && 'Matching your words to your responsibilities and clients...'}
                </p>
              </div>
            </div>

            {micMsg && (
              <p style={{ marginTop: '0.375rem', fontSize: '0.8rem', fontWeight: 600, color: micMsg.startsWith('✨') ? '#10b981' : micMsg.startsWith('Error') || micMsg.startsWith('Mic') || micMsg.startsWith('Nothing') ? '#ef4444' : '#f59e0b' }}>
                {micMsg}
              </p>
            )}
          </div>
        )}


        {/* Sheet */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {loading ? <div className="skeleton" style={{ height: '200px', borderRadius: 0 }} /> : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                <tr style={{ background: 'var(--bg-elevated)', borderBottom: '2px solid var(--border-default)' }}>
                  <th style={{ padding: '0.55rem 1rem', textAlign: 'left', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-muted)', width: '220px' }}>Responsibility / Client</th>
                  <th style={{ padding: '0.55rem 0.75rem', textAlign: 'left', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-muted)' }}>What I did today</th>
                  <th style={{ padding: '0.55rem 0.75rem', textAlign: 'center', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-muted)', width: '80px' }}>Count</th>
                  {!isLocked && <th style={{ width: '36px' }} />}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-subtle)', background: i % 2 === 0 ? 'transparent' : 'rgba(14,61,53,0.015)' }}>
                    <td style={{ padding: '0.4rem 1rem', verticalAlign: 'middle' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4px' }}>
                        <span style={{ fontSize: '0.83rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {row.responsibility || <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>—</span>}
                        </span>
                        {row.isCustom && <span style={{ fontSize: '0.62rem', color: '#6366f1', background: 'rgba(99,102,241,0.1)', padding: '1px 5px', borderRadius: '4px' }}>extra</span>}
                      </div>

                      {(row.daily_target ?? 0) > 0 && (
                        <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '1px' }}>
                          Target: {row.daily_target}/day
                        </span>
                      )}

                      {/* Client Tag Dropdown & Add Client Row Button — only for client workers */}
                      {isClientWorker !== false && clientsList.length > 0 && (
                        <div style={{ marginTop: '5px', display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                          <SearchableClientDropdown
                            clients={clientsList}
                            selectedId={row.clientId || ''}
                            disabled={isLocked}
                            onSelect={id => update(i, 'clientId', id)}
                          />

                          {!isLocked && (
                            <button
                              type="button"
                              onClick={() => duplicateClientRow(i)}
                              style={{
                                fontSize: '0.65rem', fontWeight: 700, padding: '2px 6px', borderRadius: '4px',
                                background: 'rgba(16,185,129,0.1)', color: '#047857', border: '1px solid rgba(16,185,129,0.25)',
                                cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '2px'
                              }}
                              title="Add another row for another client"
                            >
                              <Plus size={10} /> Client
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '0.25rem 0.5rem', verticalAlign: 'middle' }}>
                      <input disabled={isLocked}
                        style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: row.description.trim() ? '1.5px solid var(--brand-primary)' : '1px solid var(--border-subtle)', padding: '0.35rem 0.25rem', outline: 'none', fontSize: '0.83rem', color: 'var(--text-primary)', fontFamily: 'inherit' }}
                        placeholder={isLocked ? '—' : 'Describe what you did...'}
                        value={row.description}
                        onChange={e => update(i, 'description', e.target.value)}
                      />
                    </td>
                    <td style={{ padding: '0.25rem 0.5rem', verticalAlign: 'middle' }}>
                      <input disabled={isLocked} type="number" min="0"
                        style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: row.count ? '1.5px solid var(--brand-primary)' : '1px solid var(--border-subtle)', padding: '0.35rem 0.5rem', outline: 'none', fontSize: '0.83rem', color: 'var(--text-primary)', fontFamily: 'inherit', textAlign: 'center' }}
                        placeholder="0"
                        value={row.count}
                        onChange={e => update(i, 'count', e.target.value)}
                      />
                    </td>
                    {!isLocked && (
                      <td style={{ padding: '0.35rem 0.5rem', textAlign: 'center', verticalAlign: 'middle' }}>
                        {row.isCustom && (
                          <button onClick={() => removeRow(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px', display: 'flex', alignItems: 'center' }}>
                            <Trash2 size={12} />
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Add extra row */}
          {!isLocked && (
            <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Plus size={13} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              <input
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'inherit' }}
                placeholder="Add extra work item (not in responsibilities)..."
                value={customTask}
                onChange={e => setCustomTask(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addCustom())}
              />
              {customTask.trim() && (
                <button onClick={addCustom} style={{ padding: '0.2rem 0.6rem', fontSize: '0.72rem', background: 'var(--brand-primary)', color: 'white', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>Add</button>
              )}
            </div>
          )}

          {/* ── Check-in / Check-out times ─────────────────────────────── */}
          <div style={{ padding: '0.75rem 1.25rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap', background: 'var(--bg-elevated)', borderRadius: '0 0 8px 8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981', whiteSpace: 'nowrap' }}>🕐 Check-In</span>
              <input
                type="time"
                disabled={isLocked}
                value={checkInTime}
                onChange={e => setCheckInTime(e.target.value)}
                style={{
                  background: checkInTime ? 'rgba(16,185,129,0.1)' : 'var(--bg-surface)',
                  border: checkInTime ? '1.5px solid #10b981' : '1.5px solid var(--border-default)',
                  borderRadius: '6px',
                  padding: '0.3rem 0.5rem', outline: 'none',
                  fontSize: '0.85rem', fontWeight: 600,
                  color: checkInTime ? '#10b981' : 'var(--text-primary)',
                  fontFamily: 'inherit', cursor: isLocked ? 'not-allowed' : 'pointer',
                  colorScheme: isLight ? 'light' : 'dark',
                }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ef4444', whiteSpace: 'nowrap' }}>🕕 Check-Out</span>
              <input
                type="time"
                disabled={isLocked}
                value={checkOutTime}
                onChange={e => setCheckOutTime(e.target.value)}
                style={{
                  background: checkOutTime ? 'rgba(239,68,68,0.1)' : 'var(--bg-surface)',
                  border: checkOutTime ? '1.5px solid #ef4444' : '1.5px solid var(--border-default)',
                  borderRadius: '6px',
                  padding: '0.3rem 0.5rem', outline: 'none',
                  fontSize: '0.85rem', fontWeight: 600,
                  color: checkOutTime ? '#ef4444' : 'var(--text-primary)',
                  fontFamily: 'inherit', cursor: isLocked ? 'not-allowed' : 'pointer',
                  colorScheme: isLight ? 'light' : 'dark',
                }}
              />
            </div>
            {checkInTime && checkOutTime && (() => {
              const [ih, im] = checkInTime.split(':').map(Number)
              const [oh, om] = checkOutTime.split(':').map(Number)
              const mins = (oh * 60 + om) - (ih * 60 + im)
              if (mins > 0) {
                const h = Math.floor(mins / 60), m = mins % 60
                return <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', background: 'var(--bg-surface)', padding: '3px 8px', borderRadius: '6px', border: '1px solid var(--border-default)' }}>⏱ {h}h {m}m worked</span>
              }
              return null
            })()}
          </div>

          <div style={{ padding: '0.625rem 1.25rem' }}>
            <input disabled={isLocked}
              style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px dashed var(--border-subtle)', padding: '0.3rem 0', outline: 'none', fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'inherit' }}
              placeholder="Any blocker or note for today? (optional)"
              value={note} onChange={e => setNote(e.target.value)}
            />
          </div>
        </div>

        {/* Footer */}
        {!isLocked ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1.25rem', borderTop: '1px solid var(--border-default)' }}>
            <p style={{ flex: 1, fontSize: '0.78rem', color: filled > 0 ? '#10b981' : 'var(--text-muted)', fontWeight: filled > 0 ? 600 : 400 }}>
              {filled > 0 ? `✓ ${filled} responsibilities covered` : 'Fill at least one row'}
            </p>
            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSubmit} disabled={submitting || filled === 0}>
              {submitting ? <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Saving...</> : isAdmin ? 'Save' : 'Submit Report'}
            </button>
          </div>
        ) : (
          <div style={{ padding: '0.875rem 1.25rem', borderTop: '1px solid var(--border-default)', textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Only admin can edit previous day reports. <button className="btn btn-ghost btn-sm" onClick={onClose}>Close</button>
          </div>
        )}

        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  )
}
