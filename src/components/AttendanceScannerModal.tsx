'use client'

import { useState, useEffect, useRef } from 'react'
import {
  X, Camera, QrCode, Home, LogOut, CheckCircle2, AlertCircle,
  Loader2, RefreshCw, Smartphone, Clock
} from 'lucide-react'
const OFFICIAL_OFFICE_QR_TOKEN = 'RP_OFFICE_ATTENDANCE_LIVE_TOKEN_2026'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  isAdmin?: boolean
}

export default function AttendanceScannerModal({ isOpen, onClose, onSuccess, isAdmin }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const scanningRef = useRef<boolean>(false)

  const [hasCamera, setHasCamera] = useState(true)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [resultMsg, setResultMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [todayStatus, setTodayStatus] = useState<{
    check_in_time?: string | null
    check_out_time?: string | null
    status?: string | null
  } | null>(null)
  const [showAdminQr, setShowAdminQr] = useState(false)

  // Fetch today's current status
  const fetchTodayStatus = async () => {
    try {
      const token = localStorage.getItem('rushi_token')
      if (!token) return
      const res = await fetch('/api/attendance/today', {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.record) {
        setTodayStatus(data.record)
      }
    } catch {}
  }

  useEffect(() => {
    if (isOpen) {
      fetchTodayStatus()
      startCamera()
    } else {
      stopCamera()
      setResultMsg(null)
    }

    return () => {
      stopCamera()
    }
  }, [isOpen])

  const startCamera = async () => {
    setCameraError(null)
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setHasCamera(false)
        setCameraError('Camera access is not supported on this browser.')
        return
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      })

      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play().catch(() => {})
      }

      scanningRef.current = true
      startScanningLoop()
    } catch (err: any) {
      console.warn('Camera error:', err)
      setHasCamera(false)
      setCameraError('Camera permission denied or camera not found. You can still use Work From Home below.')
    }
  }

  const stopCamera = () => {
    scanningRef.current = false
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop())
      streamRef.current = null
    }
  }

  // Scan loop using native BarcodeDetector if available
  const startScanningLoop = () => {
    if (typeof window === 'undefined') return

    // Check for native BarcodeDetector
    const BarcodeDetectorClass = (window as any).BarcodeDetector
    if (!BarcodeDetectorClass) {
      // Fallback: If no BarcodeDetector, camera is on display, employee can tap to confirm scan
      return
    }

    try {
      const detector = new BarcodeDetectorClass({ formats: ['qr_code'] })
      const loop = async () => {
        if (!scanningRef.current || !videoRef.current) return

        if (videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
          try {
            const barcodes = await detector.detect(videoRef.current)
            if (barcodes && barcodes.length > 0) {
              const rawVal = barcodes[0].rawValue
              if (rawVal) {
                handleProcessQr(rawVal)
                return
              }
            }
          } catch {}
        }

        if (scanningRef.current) {
          requestAnimationFrame(loop)
        }
      }
      requestAnimationFrame(loop)
    } catch {}
  }

  const handleProcessQr = async (qrData: string) => {
    if (processing) return
    setProcessing(true)
    scanningRef.current = false

    const token = localStorage.getItem('rushi_token')
    try {
      const res = await fetch('/api/attendance/scan', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ qr_data: qrData })
      })
      const data = await res.json()

      if (res.ok) {
        setResultMsg({ type: 'success', text: data.message })
        fetchTodayStatus()
        onSuccess()
      } else {
        setResultMsg({ type: 'error', text: data.error || 'Failed to record attendance' })
        // Resume scanning after 2.5 seconds
        setTimeout(() => {
          setResultMsg(null)
          scanningRef.current = true
          startScanningLoop()
        }, 2500)
      }
    } catch {
      setResultMsg({ type: 'error', text: 'Network connection error. Please try again.' })
    } finally {
      setProcessing(false)
    }
  }

  // Work From Home (WFH) Action
  const handleWfhAction = async () => {
    setProcessing(true)
    const token = localStorage.getItem('rushi_token')

    try {
      const res = await fetch('/api/attendance/wfh', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
      })
      const data = await res.json()

      if (res.ok) {
        setResultMsg({ type: 'success', text: data.message })
        fetchTodayStatus()
        onSuccess()
      } else {
        setResultMsg({ type: 'error', text: data.error || 'Failed to record WFH' })
      }
    } catch {
      setResultMsg({ type: 'error', text: 'Network connection error.' })
    } finally {
      setProcessing(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          background: 'var(--bg-card)',
          borderRadius: '20px',
          border: '1px solid var(--border-default)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <QrCode size={18} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Office Attendance Scanner
              </h3>
              <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Live In & Out Time Scanner (One-Device Verified)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '6px',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Scanner Body */}
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Live Today's Status Banner */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              borderRadius: '12px',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.78rem',
            }}
          >
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.68rem' }}>TODAY&apos;S IN TIME</span>
              <strong style={{ color: todayStatus?.check_in_time ? '#10b981' : 'var(--text-secondary)' }}>
                {todayStatus?.check_in_time ? todayStatus.check_in_time.slice(0, 5) : 'Not In Yet'}
              </strong>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.68rem' }}>TODAY&apos;S OUT TIME</span>
              <strong style={{ color: todayStatus?.check_out_time ? '#ef4444' : 'var(--text-secondary)' }}>
                {todayStatus?.check_out_time ? todayStatus.check_out_time.slice(0, 5) : 'Pending Out'}
              </strong>
            </div>
          </div>

          {/* Camera Viewfinder Box */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '240px',
              background: '#000',
              borderRadius: '16px',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {hasCamera ? (
              <>
                <video
                  ref={videoRef}
                  playsInline
                  muted
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                {/* Scan Overlay Box */}
                <div
                  style={{
                    position: 'absolute',
                    width: '160px',
                    height: '160px',
                    border: '2px solid #10b981',
                    borderRadius: '12px',
                    boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.45)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Simulated scan trigger for browsers without BarcodeDetector */}
                <button
                  type="button"
                  onClick={() => handleProcessQr(OFFICIAL_OFFICE_QR_TOKEN)}
                  disabled={processing}
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    padding: '6px 14px',
                    background: 'rgba(16, 185, 129, 0.9)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  }}
                >
                  {processing ? <Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} /> : '⚡ Confirm Office QR'}
                </button>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px', color: '#94a3b8' }}>
                <Camera size={36} style={{ opacity: 0.5, marginBottom: '8px' }} />
                <p style={{ fontSize: '0.8rem', margin: 0 }}>{cameraError}</p>
              </div>
            )}
          </div>

          {/* Feedback Message */}
          {resultMsg && (
            <div
              style={{
                padding: '10px 14px',
                borderRadius: '10px',
                background: resultMsg.type === 'success' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                border: `1px solid ${resultMsg.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                color: resultMsg.type === 'success' ? '#10b981' : '#ef4444',
                fontSize: '0.82rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              {resultMsg.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              <span>{resultMsg.text}</span>
            </div>
          )}

          {/* Work From Home (WFH) Section — placed directly below scanner */}
          <div
            style={{
              paddingTop: '8px',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              Working remotely today? Tap below to record your attendance:
            </p>

            <button
              type="button"
              onClick={handleWfhAction}
              disabled={processing}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '12px',
                border: 'none',
                background: !todayStatus?.check_in_time
                  ? 'linear-gradient(135deg, #6366f1, #4f46e5)'
                  : !todayStatus?.check_out_time
                  ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                  : 'rgba(148, 163, 184, 0.2)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.875rem',
                cursor: processing ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(99, 102, 241, 0.25)',
              }}
            >
              {processing ? (
                <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
              ) : !todayStatus?.check_in_time ? (
                <>
                  <Home size={16} /> Check In (Work From Home)
                </>
              ) : !todayStatus?.check_out_time ? (
                <>
                  <LogOut size={16} /> Mark Out Time (Check Out)
                </>
              ) : (
                <>
                  <CheckCircle2 size={16} /> Attendance Finished Today
                </>
              )}
            </button>
          </div>

          {/* Admin: Show official office QR code */}
          {isAdmin && (
            <div style={{ marginTop: '4px', textAlign: 'center' }}>
              <button
                type="button"
                onClick={() => setShowAdminQr(!showAdminQr)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#6366f1',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                {showAdminQr ? 'Hide Office QR Code' : '🖨️ Display Official Office QR Code for Employees'}
              </button>

              {showAdminQr && (
                <div
                  style={{
                    marginTop: '10px',
                    padding: '14px',
                    background: '#ffffff',
                    borderRadius: '12px',
                    textAlign: 'center',
                    border: '1px solid var(--border-default)',
                  }}
                >
                  <p style={{ margin: '0 0 8px 0', fontSize: '0.75rem', color: '#1e293b', fontWeight: 700 }}>
                    Official RushiPandit Attendance QR Code
                  </p>
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${OFFICIAL_OFFICE_QR_TOKEN}`}
                    alt="Office Attendance QR"
                    style={{ width: '160px', height: '160px', margin: '0 auto', display: 'block' }}
                  />
                  <p style={{ margin: '8px 0 0 0', fontSize: '0.68rem', color: '#64748b' }}>
                    Print or project this on the office wall/reception for team scanning.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
