import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Project } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(1)}M`
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1)}K`
  }
  return `$${amount}`
}

export function formatCount(n: number): string {
  if (n >= 1_000_000) {
    return `${(n / 1_000_000).toFixed(1)}M`
  }
  if (n >= 1000) {
    return `${(n / 1000).toFixed(1)}K`
  }
  return String(n)
}

export function fundingPercent(current: number, goal: number): number {
  if (goal === 0) return 0
  return Math.min(100, Math.round((current / goal) * 100))
}

export function timeAgo(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days === 0) return 'Today'
  if (days === 1) return '1 day ago'
  if (days < 30) return `${days} days ago`
  const months = Math.floor(days / 30)
  if (months === 1) return '1 month ago'
  if (months < 12) return `${months} months ago`
  return `${Math.floor(months / 12)} years ago`
}

export function formatLargeNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`
  return String(n)
}

export function validationScore(project: Project): number {
  return (
    project.upvotes * 5 +
    project.comments.length * 10 +
    (project.waitlistCount ?? 0) * 25 +
    project.backerCount * 100
  )
}

export function validationTier(score: number): { label: string; color: string } {
  if (score >= 2000) return { label: 'PROVEN DEMAND', color: '#00FF88' }
  if (score >= 500) return { label: 'STRONG SIGNAL', color: '#00D4FF' }
  if (score >= 100) return { label: 'BUILDING', color: '#BF5AF2' }
  return { label: 'EARLY SIGNAL', color: '#707070' }
}
