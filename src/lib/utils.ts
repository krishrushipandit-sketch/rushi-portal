import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, formatDistanceToNow, isAfter, isBefore, addHours } from 'date-fns'

/** Today's date in India (YYYY-MM-DD), correct regardless of the device's or server's timezone. */
export function istToday(): string {
  return new Date(Date.now() + 5.5 * 60 * 60 * 1000).toISOString().slice(0, 10)
}

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
    low: 'tone-neutral',
    medium: 'tone-warning',
    high: 'tone-orange',
    urgent: 'tone-danger',
  }
  return map[priority] ?? 'tone-neutral'
}

export function getStatusColor(status: string) {
  const map: Record<string, string> = {
    pending: 'tone-neutral',
    in_progress: 'tone-info',
    completed: 'tone-success',
    overdue: 'tone-danger',
    cancelled: 'tone-neutral',
    new: 'tone-info',
    follow_up: 'tone-warning',
    negotiation: 'tone-violet',
    visit_done: 'tone-success',
    closed_won: 'tone-success',
    closed_lost: 'tone-danger',
  }
  return map[status] ?? 'tone-neutral'
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
