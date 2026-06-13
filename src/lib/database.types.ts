export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

// Row shapes returned from Supabase selects
export interface ProfileRow {
  id: string
  username: string
  name: string
  avatar_color: string
  initials: string
  reputation: number
  total_submitted: number
  total_backed: number
  total_votes: number
  total_funded: number
  created_at: string
}

export interface IdeaRow {
  id: string
  title: string
  tagline: string
  description: string
  problem: string
  category: string
  status: string
  upvotes: number
  downvotes: number
  funding_goal: number
  funding_current: number
  backer_count: number
  tags: string[]
  features: string[]
  target_audience: string
  monetization: string
  creator_id: string | null
  developer_id: string | null
  created_at: string
}

export interface IdeaInsert {
  title: string
  tagline: string
  description: string
  problem: string
  category: string
  status?: string
  features?: string[]
  target_audience?: string
  monetization?: string
  tags?: string[]
  funding_goal?: number
  creator_id?: string | null
}

export interface MilestoneRow {
  id: string
  idea_id: string
  title: string
  description: string
  due_date: string
  completed: boolean
  payout_amount: number
  order_index: number
}

export interface VoteRow {
  id: string
  idea_id: string
  user_id: string
  direction: 'up' | 'down'
  created_at: string
}

export interface DeveloperRow {
  id: string
  user_id: string | null
  name: string
  tagline: string
  skills: string[]
  hourly_rate: number
  rating: number
  review_count: number
  completed_projects: number
  available: boolean
  avatar_color: string
  initials: string
  portfolio_items: Json
  created_at: string
}

export interface CommentRow {
  id: string
  idea_id: string
  user_id: string
  content: string
  likes: number
  avatar_color: string
  initials: string
  author: string
  created_at: string
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: ProfileRow
        Insert: Omit<ProfileRow, 'created_at'>
        Update: Partial<Omit<ProfileRow, 'id' | 'created_at'>>
      }
      ideas: {
        Row: IdeaRow
        Insert: IdeaInsert
        Update: Partial<IdeaInsert>
      }
      milestones: {
        Row: MilestoneRow
        Insert: Omit<MilestoneRow, 'id'>
        Update: Partial<Omit<MilestoneRow, 'id'>>
      }
      votes: {
        Row: VoteRow
        Insert: Omit<VoteRow, 'id' | 'created_at'>
        Update: Pick<VoteRow, 'direction'>
      }
      developers: {
        Row: DeveloperRow
        Insert: Omit<DeveloperRow, 'id' | 'created_at'>
        Update: Partial<Omit<DeveloperRow, 'id' | 'created_at'>>
      }
      comments: {
        Row: CommentRow
        Insert: Omit<CommentRow, 'id' | 'created_at' | 'likes'>
        Update: Partial<Pick<CommentRow, 'content' | 'likes'>>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
