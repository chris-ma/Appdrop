import type { Category, ProjectStatus, SortTab } from './types'

export const CATEGORY_CONFIG: Record<
  Category,
  { label: string; color: string; bg: string; icon: string; glow: string }
> = {
  AI: {
    label: 'AI',
    color: '#A78BFA',
    bg: 'rgba(124,58,237,0.15)',
    icon: 'Sparkles',
    glow: 'rgba(124,58,237,0.4)',
  },
  PRODUCTIVITY: {
    label: 'Productivity',
    color: '#67E8F9',
    bg: 'rgba(6,182,212,0.15)',
    icon: 'Zap',
    glow: 'rgba(6,182,212,0.4)',
  },
  HEALTH: {
    label: 'Health',
    color: '#F9A8D4',
    bg: 'rgba(236,72,153,0.15)',
    icon: 'Heart',
    glow: 'rgba(236,72,153,0.4)',
  },
  GAMING: {
    label: 'Gaming',
    color: '#FED7AA',
    bg: 'rgba(249,115,22,0.15)',
    icon: 'Gamepad2',
    glow: 'rgba(249,115,22,0.4)',
  },
  SOCIAL: {
    label: 'Social',
    color: '#F9A8D4',
    bg: 'rgba(236,72,153,0.15)',
    icon: 'Users',
    glow: 'rgba(236,72,153,0.4)',
  },
  FINTECH: {
    label: 'FinTech',
    color: '#6EE7B7',
    bg: 'rgba(16,185,129,0.15)',
    icon: 'TrendingUp',
    glow: 'rgba(16,185,129,0.4)',
  },
  EDUCATION: {
    label: 'Education',
    color: '#FDE68A',
    bg: 'rgba(234,179,8,0.15)',
    icon: 'BookOpen',
    glow: 'rgba(234,179,8,0.4)',
  },
  DEVELOPER_TOOLS: {
    label: 'Dev Tools',
    color: '#67E8F9',
    bg: 'rgba(6,182,212,0.15)',
    icon: 'Code2',
    glow: 'rgba(6,182,212,0.4)',
  },
}

export const STATUS_CONFIG: Record<
  ProjectStatus,
  { label: string; bg: string; border: string; text: string; dot?: string }
> = {
  VOTING: {
    label: 'VOTING',
    bg: 'rgba(124,58,237,0.15)',
    border: '#7C3AED',
    text: '#A78BFA',
  },
  FUNDING: {
    label: 'FUNDING',
    bg: 'rgba(6,182,212,0.15)',
    border: '#06B6D4',
    text: '#67E8F9',
  },
  IN_DEV: {
    label: 'IN DEV',
    bg: 'rgba(249,115,22,0.15)',
    border: '#F97316',
    text: '#FED7AA',
  },
  BETA: {
    label: 'BETA',
    bg: 'rgba(234,179,8,0.15)',
    border: '#EAB308',
    text: '#FDE68A',
  },
  LIVE: {
    label: '● LIVE',
    bg: 'rgba(34,197,94,0.15)',
    border: '#22C55E',
    text: '#86EFAC',
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
  { value: 28400, label: 'COMMUNITY MEMBERS', suffix: '+' },
  { value: 4892, label: 'IDEAS SUBMITTED', suffix: '+' },
  { value: 1200000, label: 'TOTAL FUNDED', suffix: '', prefix: '$', isCurrency: true },
  { value: 143, label: 'APPS SHIPPED', suffix: '' },
]
