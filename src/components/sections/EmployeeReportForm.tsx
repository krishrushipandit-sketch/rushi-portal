'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { istToday } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useTheme } from '@/lib/ThemeContext'
import { Mic, MicOff, Loader2, Plus, Minus, Trash2, X, SendHorizonal, Search, Building2, ChevronDown, Check, CheckCircle2, ClipboardList, Lock, LogIn, LogOut } from 'lucide-react'
import SidePanel, { PanelSection } from '@/components/ui/SidePanel'
import Pill from '@/components/ui/Pill'

interface Row { responsibility: string; daily_target: number | null; description: string; count: string; isCustom?: boolean; clientId?: string; contentType?: string }

interface ClientItem {
  id: string
  name: string
  color: string
  client_type?: string
}

interface SearchableClientDropdownProps {
  clients: ClientItem[]
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
  const internalList = useMemo(() => filteredClients.filter(c => c.client_type === 'internal'), [filteredClients])
  const externalList = useMemo(() => filteredClients.filter(c => (c.client_type || 'external') === 'external'), [filteredClients])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      setTimeout(() => searchInputRef.current?.focus(), 50)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const option = (c: ClientItem) => (
    <button key={c.id} type="button" className={`client-option ${selectedId === c.id ? 'selected' : ''}`} onClick={() => { onSelect(c.id); setOpen(false) }}>
      <span className="client-dot" style={{ background: c.color || 'var(--brand-primary)' }} />
      <span className="truncate-1">{c.name}</span>
      {selectedId === c.id && <Check size={12} style={{ marginLeft: 'auto' }} />}
    </button>
  )

  return (
    <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-flex' }}>
      {selectedClient ? (
        <span className="client-tag" style={{ '--tone': selectedClient.color || 'var(--brand-primary)' } as React.CSSProperties}>
          <button type="button" disabled={disabled} onClick={() => setOpen(!open)} title="Switch company">
            <span className="client-dot" style={{ background: selectedClient.color || 'var(--brand-primary)' }} />
            <span className="truncate-1" style={{ maxWidth: 130 }}>{selectedClient.name}</span>
            <ChevronDown size={11} />
          </button>
          {!disabled && <button type="button" onClick={() => onSelect('')} title="Untag company" aria-label="Untag company"><X size={11} /></button>}
        </span>
      ) : (
        <button type="button" className="client-tag-empty" disabled={disabled} onClick={() => setOpen(!open)}>
          <Building2 size={12} /> Tag a client / brand <ChevronDown size={11} />
        </button>
      )}

      {open && (
        <div className="menu" style={{ top: 'calc(100% + 6px)', left: 0, width: 240, padding: 0, overflow: 'hidden' }}>
          <div className="client-search">
            <Search size={13} />
            <input ref={searchInputRef} type="text" placeholder="Search client…" value={search} onChange={e => setSearch(e.target.value)} />
            {search && <button type="button" onClick={() => setSearch('')} aria-label="Clear search"><X size={11} /></button>}
          </div>
          <div style={{ maxHeight: 220, overflowY: 'auto', padding: 4 }}>
            <button type="button" className={`client-option ${!selectedId ? 'selected' : ''}`} onClick={() => { onSelect(''); setOpen(false) }}>
              <span style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>No client</span>
            </button>
            {internalList.length > 0 && <div className="cmdk-group">Internal brands</div>}
            {internalList.map(option)}
            {externalList.length > 0 && <div className="cmdk-group">External clients</div>}
            {externalList.map(option)}
            {filteredClients.length === 0 && <div style={{ padding: 10, textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>No companies found</div>}
          </div>
        </div>
      )}
    </div>
  )
}

const todayDate = istToday
const fmtDay = (d: string) => new Date(d + 'T00:00:00').toLocaleDateString('en-IN', {
  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
})

type MicState = 'idle' | 'recording' | 'processing'

export default function DailyReportForm({ onClose, onSaved, existingReport, isAdmin, targetDate, targetEmployeeId }: {
  onClose: () => void; onSaved: () => void
  existingReport?: any; isAdmin?: boolean
  targetDate?: string; targetEmployeeId?: string
}) {
  const router = useRouter()
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const reportDate = isAdmin && targetDate
    ? String(targetDate).slice(0, 10)
    : (existingReport?.report_date ? String(existingReport.report_date).slice(0, 10) : todayDate())
  const isLocked = !isAdmin && reportDate < todayDate()

  const [rows, setRows] = useState<Row[]>([])
  const [clientsList, setClientsList] = useState<ClientItem[]>([])
  const [isMediaUser, setIsMediaUser] = useState(false)
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

  const isRohan = useMemo(() => {
    const userStr = typeof window !== 'undefined' ? localStorage.getItem('rushi_user') : null
    if (!userStr) return false
    try {
      const u = JSON.parse(userStr)
      return (
        (u.full_name || '').toLowerCase().includes('rohan') ||
        (u.email || '').toLowerCase().includes('rohan') ||
        (u.department || '').toLowerCase() === 'design'
      )
    } catch { return false }
  }, [])

  const getRowContentType = (title: string): string => {
    const t = (title || '').toLowerCase()
    if (t.includes('design') || isRohan) return 'Static Post'
    if (t.includes('youtube') || t.includes('u2f') || t.includes('yt')) return 'YouTube'
    if (t.includes('reel') || t.includes('real')) return 'Reel'
    if (t.includes('shoot') || t.includes('shooting')) return 'Shoot'
    if (t.includes('edit')) return 'Reel'
    return 'Reel'
  }

  // Load responsibilities + clients + today's assigned tasks
  useEffect(() => {
    (async () => {
      const token = getToken()
      if (!token) return

      // Fetch employee responsibilities first
      const empId = isAdmin && targetEmployeeId ? `?employee_id=${targetEmployeeId}` : ''
      let resps: any[] = []
      try {
        const res = await fetch(`/api/responsibilities${empId}`, { headers: { Authorization: `Bearer ${token}` } })
        resps = await res.json()
      } catch {}

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

      // Check if user is eligible for client tagging (strictly Suyog, Kedar, Rohan, or Admin)
      let canTagClient = false
      const userStr = typeof window !== 'undefined' ? localStorage.getItem('rushi_user') : null
      if (userStr) {
        try {
          const u = JSON.parse(userStr)
          const name = (u.full_name || '').toLowerCase()
          const email = (u.email || '').toLowerCase()
          canTagClient = (
            name.includes('suyog') || email.includes('suyog') ||
            name.includes('kedar') || email.includes('kedar') ||
            name.includes('rohan') || email.includes('rohan') ||
            u.role === 'admin'
          )
        } catch {}
      }
      if (isAdmin) canTagClient = true

      try {
        if (canTagClient) {
          let clientItems: any[] = []
          try {
            const fallbackRes = await fetch('/api/clients', { headers: { Authorization: `Bearer ${token}` } })
            const fallbackData = await fallbackRes.json()
            if (Array.isArray(fallbackData) && fallbackData.length > 0) {
              clientItems = fallbackData
            }
          } catch {}

          if (clientItems.length === 0) {
            try {
              const progRes = await fetch('/api/client-progress', { headers: { Authorization: `Bearer ${token}` } })
              const progData = await progRes.json()
              if (Array.isArray(progData?.clients) && progData.clients.length > 0) {
                clientItems = progData.clients
              }
            } catch {}
          }

          if (clientItems.length > 0) {
            setClientsList(clientItems.map((c: any) => ({
              id: c.id,
              name: c.name,
              color: c.color,
              client_type: c.client_type || 'external'
            })))
          } else {
            setClientsList([])
          }
        } else {
          setClientsList([])
        }

        setIsMediaUser(canTagClient)
      } catch {
        setIsMediaUser(canTagClient)
      }

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

        // Fetch and inject fixed daily tasks
        let fixedRows: Row[] = []
        try {
          const fixedRes = await fetch('/api/fixed-tasks', { headers: { Authorization: `Bearer ${token}` } })
          const fixedData = await fixedRes.json()
          if (Array.isArray(fixedData)) {
            fixedRows = fixedData
              .filter((ft: any) => !respRows.some(r => r.responsibility.toLowerCase() === (ft.title || '').toLowerCase()))
              .map((ft: any) => ({
                responsibility: ft.title,
                daily_target: null,
                description: '',
                count: '',
                isCustom: true,
              }))
          }
        } catch {}

        // Inject pending tasks as extra rows (avoid duplicates)
        const taskRows = pendingTasks.filter(pt =>
          !respRows.some(r => r.responsibility === pt.responsibility) &&
          !fixedRows.some(r => r.responsibility === pt.responsibility)
        )
        setRows([...respRows, ...fixedRows, ...taskRows])
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
      clientId: '',
      contentType: base.contentType || getRowContentType(base.responsibility)
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
    if (isLocked) {
      alert('Daily reports can only be edited on the same day before 12:00 AM midnight IST. Past reports are locked.')
      return
    }

    const valid = rows.filter(r => r.responsibility.trim() && (r.description.trim() || r.count.trim()))
    if (!valid.length) return
    const token = getToken()
    if (!token) return
    setSubmitting(true)
    const entries = valid.map(r => {
      const matchedClient = clientsList.find(c => c.id === r.clientId)
      const determinedContentType = r.contentType || getRowContentType(r.responsibility)
      return {
        description: r.responsibility.trim(),
        responsibility: r.responsibility.trim(),
        notes: r.description.trim(),
        count: r.count.trim() ? Number(r.count) : 1,
        clientId: r.clientId || undefined,
        clientName: matchedClient ? matchedClient.name : undefined,
        contentType: determinedContentType || undefined,
      }
    })
    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          report_date: reportDate, entries, note,
          check_in_time: checkInTime || null,
          check_out_time: checkOutTime || null,
          ...(isAdmin && targetEmployeeId ? { employee_id: targetEmployeeId } : {}),
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || `Server returned ${res.status}`)
      }
      onSaved()
    } catch (err) {
      alert('Your report was NOT saved: ' + (err as Error).message + '\nPlease try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const filled = rows.filter(r => r.responsibility.trim() && (r.description.trim() || r.count.trim())).length
  const totalCount = rows.reduce((a, r) => a + (Number(r.count) || 0), 0)
  const worked = (() => {
    if (!checkInTime || !checkOutTime) return null
    const [ih, im] = checkInTime.split(':').map(Number)
    const [oh, om] = checkOutTime.split(':').map(Number)
    const mins = oh * 60 + om - (ih * 60 + im)
    return mins > 0 ? `${Math.floor(mins / 60)}h ${mins % 60}m` : null
  })()
  const step = (i: number, delta: number) => update(i, 'count', String(Math.max(0, (Number(rows[i].count) || 0) + delta)))

  return (
    <SidePanel
      open
      dismissible={false}
      onClose={onClose}
      width={720}
      leading={<span className="drawer-icon" style={{ color: 'var(--brand-primary)', background: 'var(--brand-primary-soft)', boxShadow: '0 0 20px -6px var(--brand-primary)' }}><ClipboardList size={18} /></span>}
      title={<>Daily report {isAdmin ? <Pill color="#8b5cf6">Admin mode</Pill> : isLocked ? <Pill color="#ef4757" icon={<Lock size={11} />}>Locked</Pill> : <Pill color="#22c55e" dot>Editable until midnight</Pill>}</>}
      subtitle={fmtDay(reportDate)}
      footer={isLocked ? (
        <>
          <span style={{ marginRight: 'auto', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Only an admin can edit a previous day’s report.</span>
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </>
      ) : (
        <>
          <span style={{ marginRight: 'auto', fontSize: '0.8125rem', color: filled ? 'var(--status-success)' : 'var(--text-muted)', fontWeight: filled ? 600 : 400 }}>
            {filled ? `${filled} item${filled === 1 ? '' : 's'} logged · ${totalCount} total` : 'Fill at least one item'}
          </span>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={submitting || filled === 0}>
            {submitting ? <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Saving…</> : <><SendHorizonal size={14} /> {isAdmin ? 'Save report' : 'Submit report'}</>}
          </button>
        </>
      )}
    >
      {isLocked && (
        <div className="hint-box" style={{ '--tone': 'var(--status-danger)' } as React.CSSProperties}>
          <Lock size={15} />
          <div><strong>This report is locked</strong><p>Reports can only be edited on the same day, before 12:00 AM IST. Past reports stay locked for audit.</p></div>
        </div>
      )}

      {!isLocked && (
        <section className={`voice-card ${micState}`}>
          <button
            className="voice-btn"
            onClick={micState === 'idle' ? startRecording : micState === 'recording' ? stopRecording : undefined}
            disabled={micState === 'processing'}
            aria-label={micState === 'recording' ? 'Stop recording' : 'Start voice entry'}
          >
            {micState === 'processing' ? <Loader2 size={22} style={{ animation: 'spin 1s linear infinite' }} /> : micState === 'recording' ? <MicOff size={22} /> : <Mic size={22} />}
          </button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="voice-title">
              {micState === 'idle' && <>Speak your report <span className="eyebrow" style={{ marginLeft: 6 }}>AI fills it in</span></>}
              {micState === 'recording' && <><span className="rec-dot" /> Listening… tap again to stop</>}
              {micState === 'processing' && 'Reading your narration…'}
            </div>
            <p className="voice-hint">
              {micState === 'recording' ? 'Mention clients and counts: “1 reel for CA, 2 reels for Alpha”' : 'Try: “I made 40 calls, 12 follow-ups, and edited 1 reel for CA”'}
            </p>
            {micMsg && (
              <p className="voice-msg" style={{ color: micMsg.startsWith('✨') ? 'var(--status-success)' : /^(Error|Mic|Could|Recording too)/.test(micMsg) ? 'var(--status-danger)' : 'var(--status-warning)' }}>{micMsg}</p>
            )}
            {transcript && micState !== 'recording' && <p className="voice-transcript">“{transcript}”</p>}
          </div>
        </section>
      )}

      <div className="time-row">
        <label className="time-field" style={{ '--tone': 'var(--status-success)' } as React.CSSProperties}>
          <span><LogIn size={13} /> Check-in</span>
          <input type="time" disabled={isLocked} value={checkInTime} onChange={e => setCheckInTime(e.target.value)} style={{ colorScheme: isLight ? 'light' : 'dark' }} />
        </label>
        <label className="time-field" style={{ '--tone': 'var(--status-danger)' } as React.CSSProperties}>
          <span><LogOut size={13} /> Check-out</span>
          <input type="time" disabled={isLocked} value={checkOutTime} onChange={e => setCheckOutTime(e.target.value)} style={{ colorScheme: isLight ? 'light' : 'dark' }} />
        </label>
        <div className="time-total">
          <span>Worked</span>
          <strong className="tabular">{worked || '—'}</strong>
        </div>
      </div>

      <PanelSection title="Today’s work" aside={<span style={{ fontSize: '0.72rem', color: 'var(--text-faint)' }}>{filled} of {rows.length} filled</span>}>
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{[1, 2, 3].map(i => <div key={i} className="skeleton" style={{ height: 96 }} />)}</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {rows.map((row, i) => {
              const n = Number(row.count) || 0
              const target = row.daily_target ?? 0
              const done = !!(row.description.trim() || row.count.trim())
              return (
                <div key={i} className={`work-card ${done ? 'done' : ''}`}>
                  <div className="work-head">
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div className="work-title">
                        {done && <CheckCircle2 size={14} style={{ color: 'var(--status-success)', flexShrink: 0 }} />}
                        <span className="truncate-1">{row.responsibility || <em style={{ color: 'var(--text-faint)' }}>Untitled item</em>}</span>
                        {row.isCustom && <Pill color="#8b5cf6">extra</Pill>}
                      </div>
                      {target > 0 && (
                        <div className="work-target">
                          <div className="progress-bar" style={{ height: 4, flex: 1 }}>
                            <div className="progress-fill" style={{ width: `${Math.min(100, (n / target) * 100)}%`, background: n >= target ? 'var(--status-success)' : 'var(--brand-gradient)' }} />
                          </div>
                          <span className="tabular">{n}/{target} target</span>
                        </div>
                      )}
                    </div>
                    <div className="stepper">
                      <button type="button" disabled={isLocked || n === 0} onClick={() => step(i, -1)} aria-label="Decrease count"><Minus size={14} /></button>
                      <input disabled={isLocked} type="number" min="0" inputMode="numeric" placeholder="0" value={row.count} onChange={e => update(i, 'count', e.target.value)} aria-label={`Count for ${row.responsibility}`} />
                      <button type="button" disabled={isLocked} onClick={() => step(i, 1)} aria-label="Increase count"><Plus size={14} /></button>
                    </div>
                    {!isLocked && (
                      <button type="button" className="icon-btn" onClick={() => removeRow(i)} title="Remove from today’s report" aria-label="Remove item"><Trash2 size={14} /></button>
                    )}
                  </div>
                  <input
                    className="form-input"
                    disabled={isLocked}
                    placeholder={isLocked ? '—' : 'What did you do? (optional details)'}
                    value={row.description}
                    onChange={e => update(i, 'description', e.target.value)}
                  />
                  {clientsList.length > 0 && (
                    <div className="work-tags">
                      <SearchableClientDropdown clients={clientsList} selectedId={row.clientId || ''} disabled={isLocked} onSelect={id => update(i, 'clientId', id)} />
                      {row.clientId && isRohan && <Pill color="#8b5cf6">Design</Pill>}
                      {row.clientId && !isRohan && (
                        row.responsibility.toLowerCase().includes('shoot') ? <Pill color="#f5a524">Shoot</Pill> : (
                          <div className="segmented" style={{ padding: 2 }}>
                            {(['Reel', 'YouTube'] as const).map(t => (
                              <button key={t} type="button" disabled={isLocked} style={{ height: 24 }} className={(row.contentType || getRowContentType(row.responsibility)) === t ? 'active' : ''} onClick={() => update(i, 'contentType', t)}>{t}</button>
                            ))}
                          </div>
                        )
                      )}
                      {!isLocked && (
                        <button type="button" className="btn btn-ghost btn-sm" onClick={() => duplicateClientRow(i)} title="Add another row for another brand"><Plus size={12} /> Another client</button>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {!isLocked && (
          <div className="add-item">
            <Plus size={15} />
            <input
              placeholder="Add extra work item (not in your responsibilities)…"
              value={customTask}
              onChange={e => setCustomTask(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addCustom())}
            />
            <button className="btn btn-secondary btn-sm" onClick={addCustom} disabled={!customTask.trim()}>Add</button>
          </div>
        )}
      </PanelSection>

      <PanelSection title="Blockers or notes">
        <textarea className="form-textarea" disabled={isLocked} rows={2} placeholder="Anything blocking you, or anything your manager should know? (optional)" value={note} onChange={e => setNote(e.target.value)} />
      </PanelSection>
    </SidePanel>
  )
}
