import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, formatDistanceToNow, isAfter, isBefore, addHours } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date | null, fmt = 'dd MMM yyyy, hh:mm a') {
  if (!date) return 'N/A'
  return format(new Date(date), fmt)
}

export function timeAgo(date: string | Date | null) {
  if (!date) return 'N/A'
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export function isDeadlineApproaching(deadline: string | null, hoursThreshold = 1): boolean {
  if (!deadline) return false
  const now = new Date()
  const deadlineDate = new Date(deadline)
  return isAfter(deadlineDate, now) && isBefore(deadlineDate, addHours(now, hoursThreshold))
}

export function isOverdue(deadline: string | null): boolean {
  if (!deadline) return false
  return isBefore(new Date(deadline), new Date())
}

export function getPriorityColor(priority: string) {
  const map: Record<string, string> = {
    low: 'text-emerald-400 bg-emerald-400/10',
    medium: 'text-amber-400 bg-amber-400/10',
    high: 'text-orange-400 bg-orange-400/10',
    urgent: 'text-red-400 bg-red-400/10',
  }
  return map[priority] ?? 'text-slate-400 bg-slate-400/10'
}

export function getStatusColor(status: string) {
  const map: Record<string, string> = {
    pending: 'text-slate-300 bg-slate-700',
    in_progress: 'text-blue-400 bg-blue-400/10',
    completed: 'text-emerald-400 bg-emerald-400/10',
    overdue: 'text-red-400 bg-red-400/10',
    cancelled: 'text-slate-500 bg-slate-800',
    new: 'text-blue-400 bg-blue-400/10',
    follow_up: 'text-amber-400 bg-amber-400/10',
    negotiation: 'text-purple-400 bg-purple-400/10',
    closed_won: 'text-emerald-400 bg-emerald-400/10',
    closed_lost: 'text-red-400 bg-red-400/10',
  }
  return map[status] ?? 'text-slate-400 bg-slate-400/10'
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function formatPhoneForWhatsApp(phone: string) {
  // Remove all non-numeric characters and ensure country code
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.startsWith('91') && cleaned.length === 12) return cleaned
  if (cleaned.length === 10) return `91${cleaned}`
  return cleaned
}
