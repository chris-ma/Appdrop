export type ProjectStatus = 'VOTING' | 'FUNDING' | 'IN_DEV' | 'BETA' | 'LIVE'

export type Category =
  | 'AI'
  | 'PRODUCTIVITY'
  | 'HEALTH'
  | 'GAMING'
  | 'SOCIAL'
  | 'FINTECH'
  | 'EDUCATION'
  | 'DEVELOPER_TOOLS'

export interface Milestone {
  id: string
  title: string
  completed: boolean
  dueDate: string
}

export interface Comment {
  id: string
  author: string
  initials: string
  avatarColor: string
  content: string
  createdAt: string
  likes: number
}

export interface PortfolioItem {
  title: string
  description: string
  url?: string
  image_url?: string
  tech_stack?: string[]
  role?: string
}

export interface Developer {
  id: string
  name: string
  initials: string
  avatarColor: string
  tagline: string
  skills: string[]
  rating: number
  reviewCount: number
  completedProjects: number
  bio: string
  available: boolean
  portfolioItems: PortfolioItem[]
  hourlyRate: number
  githubUrl?: string
  linkedinUrl?: string
  websiteUrl?: string
}

export interface Project {
  id: string
  title: string
  slug: string
  tagline: string
  description: string
  category: Category
  status: ProjectStatus
  upvotes: number
  downvotes: number
  fundingCurrent: number
  fundingGoal: number
  backerCount: number
  features: string[]
  milestones: Milestone[]
  developer?: Developer
  comments: Comment[]
  createdAt: string
  tags: string[]
  gradient: string
  creatorId?: string
  videoUrl?: string
  images?: string[]
  pitchDeckUrl?: string
  waitlistCount?: number
}

export interface Badge {
  id: string
  name: string
  description: string
  emoji: string
  color: 'purple' | 'cyan' | 'pink' | 'orange'
  earned: boolean
}

export interface UserStats {
  totalVotes: number
  totalBacked: number
  totalSubmitted: number
  reputation: number
  totalFunded: number
}

export interface UserProfile {
  id: string
  name: string
  username: string
  initials: string
  avatarColor: string
  joinedAt: string
  badges: Badge[]
  stats: UserStats
}

export type SortTab = 'TRENDING' | 'NEW' | 'MOST FUNDED' | 'MOST WANTED'

export interface Update {
  id: string
  ideaId: string
  title: string
  content: string
  createdAt: string
}
