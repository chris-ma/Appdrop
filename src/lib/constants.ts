import type { Category, ProjectStatus, SortTab } from './types'

export const CATEGORY_CONFIG: Record<
  Category,
  { label: string; color: string; bg: string; icon: string; accent: string }
> = {
  AI: {
    label: 'AI',
    color: '#00D4FF',
    bg: 'rgba(0,212,255,0.06)',
    icon: 'Sparkles',
    accent: '#00D4FF',
  },
  PRODUCTIVITY: {
    label: 'Productivity',
    color: '#FFFFFF',
    bg: 'rgba(255,255,255,0.04)',
    icon: 'Zap',
    accent: '#FFFFFF',
  },
  HEALTH: {
    label: 'Health',
    color: '#00FF88',
    bg: 'rgba(0,255,136,0.06)',
    icon: 'Heart',
    accent: '#00FF88',
  },
  GAMING: {
    label: 'Gaming',
    color: '#BF5AF2',
    bg: 'rgba(191,90,242,0.06)',
    icon: 'Gamepad2',
    accent: '#BF5AF2',
  },
  SOCIAL: {
    label: 'Social',
    color: '#EAEAEA',
    bg: 'rgba(255,255,255,0.04)',
    icon: 'Users',
    accent: '#EAEAEA',
  },
  FINTECH: {
    label: 'FinTech',
    color: '#00FF88',
    bg: 'rgba(0,255,136,0.06)',
    icon: 'TrendingUp',
    accent: '#00FF88',
  },
  EDUCATION: {
    label: 'Education',
    color: '#C8C8C8',
    bg: 'rgba(200,200,200,0.06)',
    icon: 'BookOpen',
    accent: '#C8C8C8',
  },
  DEVELOPER_TOOLS: {
    label: 'Dev Tools',
    color: '#00D4FF',
    bg: 'rgba(0,212,255,0.06)',
    icon: 'Code2',
    accent: '#00D4FF',
  },
}

export const STATUS_CONFIG: Record<
  ProjectStatus,
  { label: string; bg: string; border: string; text: string }
> = {
  VOTING: {
    label: 'VALIDATING',
    bg: 'rgba(0,212,255,0.08)',
    border: 'rgba(0,212,255,0.35)',
    text: '#00D4FF',
  },
  FUNDING: {
    label: 'FUNDING',
    bg: 'rgba(0,255,136,0.08)',
    border: 'rgba(0,255,136,0.35)',
    text: '#00FF88',
  },
  IN_DEV: {
    label: 'IN DEV',
    bg: 'rgba(200,200,200,0.06)',
    border: 'rgba(200,200,200,0.25)',
    text: '#C8C8C8',
  },
  BETA: {
    label: 'BETA',
    bg: 'rgba(191,90,242,0.08)',
    border: 'rgba(191,90,242,0.35)',
    text: '#BF5AF2',
  },
  LIVE: {
    label: 'LIVE',
    bg: 'rgba(255,255,255,0.06)',
    border: 'rgba(255,255,255,0.3)',
    text: '#FFFFFF',
  },
}

export const SORT_TABS: SortTab[] = ['TRENDING', 'NEW', 'MOST FUNDED', 'MOST WANTED']

export const CATEGORIES: Category[] = [
  'AI',
  'PRODUCTIVITY',
  'HEALTH',
  'GAMING',
  'SOCIAL',
  'FINTECH',
  'EDUCATION',
  'DEVELOPER_TOOLS',
]

export const PLATFORM_STATS = [
  { value: 28400, label: 'COMMUNITY MEMBERS', format: (n: number) => `${Math.round(n / 1000)}K` },
  { value: 4892, label: 'IDEAS SUBMITTED', format: (n: number) => `${Math.round(n).toLocaleString()}` },
  { value: 1200000, label: 'TOTAL FUNDED', format: (n: number) => `$${(n / 1000000).toFixed(1)}M` },
  { value: 143, label: 'APPS SHIPPED', format: (n: number) => `${Math.round(n)}` },
]
