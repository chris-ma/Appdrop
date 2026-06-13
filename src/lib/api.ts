import { getSupabase } from './supabase'
import type { Project, Developer, UserProfile } from './types'
import { mockProjects, mockDevelopers, mockUser } from './mock-data'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Row = Record<string, any>

const USE_MOCK = !process.env.NEXT_PUBLIC_SUPABASE_URL

// ─── Mappers ─────────────────────────────────────────────────────────────────

function rowToProject(row: Row, milestones: Row[], comments: Row[]): Project {
  return {
    id: String(row.id),
    title: String(row.title),
    slug: String(row.id),
    tagline: String(row.tagline),
    description: String(row.description),
    category: row.category as Project['category'],
    status: row.status as Project['status'],
    upvotes: Number(row.upvotes),
    downvotes: Number(row.downvotes),
    fundingGoal: Number(row.funding_goal),
    fundingCurrent: Number(row.funding_current),
    backerCount: Number(row.backer_count),
    tags: (row.tags as string[]) ?? [],
    features: (row.features as string[]) ?? [],
    createdAt: String(row.created_at),
    gradient: 'from-void to-slate',
    milestones: milestones.map((m) => ({
      id: String(m.id),
      title: String(m.title),
      dueDate: String(m.due_date),
      completed: Boolean(m.completed),
    })),
    comments: comments.map((c) => ({
      id: String(c.id),
      author: String(c.author),
      initials: String(c.initials),
      avatarColor: String(c.avatar_color),
      content: String(c.content),
      likes: Number(c.likes),
      createdAt: String(c.created_at),
    })),
  }
}

function rowToDeveloper(row: Row): Developer {
  const portfolio = (row.portfolio_items as Row[]) ?? []
  return {
    id: String(row.id),
    name: String(row.name),
    tagline: String(row.tagline),
    bio: String(row.tagline),
    skills: (row.skills as string[]) ?? [],
    hourlyRate: Number(row.hourly_rate),
    rating: Number(row.rating),
    reviewCount: Number(row.review_count),
    completedProjects: Number(row.completed_projects),
    available: Boolean(row.available),
    avatarColor: String(row.avatar_color),
    initials: String(row.initials),
    portfolioItems: portfolio.map((p) => ({
      title: String(p.title),
      description: String(p.description),
      url: p.url ? String(p.url) : undefined,
    })),
  }
}

// ─── Projects ────────────────────────────────────────────────────────────────

export async function getProjects(): Promise<Project[]> {
  if (USE_MOCK) return mockProjects

  const db = getSupabase()
  const { data, error } = await db.from('ideas').select('*').order('upvotes', { ascending: false })
  if (error || !data) return mockProjects
  return (data as Row[]).map((row) => rowToProject(row, [], []))
}

export async function getProjectById(id: string): Promise<Project | null> {
  if (USE_MOCK) return mockProjects.find((p) => p.id === id) ?? null

  const db = getSupabase()
  const [{ data: idea }, { data: milestones }, { data: comments }] = await Promise.all([
    db.from('ideas').select('*').eq('id', id).single(),
    db.from('milestones').select('*').eq('idea_id', id).order('order_index'),
    db.from('comments').select('*').eq('idea_id', id).order('created_at'),
  ])

  if (!idea) return null
  return rowToProject(idea as Row, (milestones ?? []) as Row[], (comments ?? []) as Row[])
}

export async function getFeaturedProjects(): Promise<Project[]> {
  if (USE_MOCK) return mockProjects.filter((p) => ['1', '7', '4'].includes(p.id))

  const db = getSupabase()
  const { data } = await db.from('ideas').select('*').order('upvotes', { ascending: false }).limit(3)
  return ((data ?? []) as Row[]).map((row) => rowToProject(row, [], []))
}

export async function submitProject(input: {
  title: string
  category: string
  problem: string
  audience: string
  features: string[]
  monetization: string
  tags: string
}): Promise<{ id: string } | null> {
  if (USE_MOCK) return { id: String(Date.now()) }

  const db = getSupabase()
  const { data: { user } } = await db.auth.getUser()

  const { data, error } = await db.from('ideas').insert({
    title: input.title,
    tagline: input.problem.slice(0, 100),
    description: input.problem,
    problem: input.problem,
    category: input.category,
    status: 'VOTING',
    features: input.features,
    target_audience: input.audience,
    monetization: input.monetization,
    tags: input.tags.split(',').map((t: string) => t.trim()).filter(Boolean),
    funding_goal: 10000,
    creator_id: user?.id ?? null,
  }).select('id').single()

  if (error || !data) return null
  return { id: String((data as Row).id) }
}

// ─── Votes ───────────────────────────────────────────────────────────────────

export async function voteOnProject(ideaId: string, direction: 'up' | 'down'): Promise<void> {
  if (USE_MOCK) return

  const db = getSupabase()
  const { data: { user } } = await db.auth.getUser()
  if (!user) return

  await db.from('votes').upsert(
    { idea_id: ideaId, user_id: user.id, direction },
    { onConflict: 'idea_id,user_id' }
  )
}

export async function getUserVote(ideaId: string): Promise<'up' | 'down' | null> {
  if (USE_MOCK) return null

  const db = getSupabase()
  const { data: { user } } = await db.auth.getUser()
  if (!user) return null

  const { data } = await db.from('votes').select('direction')
    .eq('idea_id', ideaId).eq('user_id', user.id).single()

  return ((data as Row)?.direction as 'up' | 'down') ?? null
}

// ─── Developers ──────────────────────────────────────────────────────────────

export async function getDevelopers(): Promise<Developer[]> {
  if (USE_MOCK) return mockDevelopers

  const db = getSupabase()
  const { data, error } = await db.from('developers').select('*').order('rating', { ascending: false })
  if (error || !data) return mockDevelopers
  return (data as Row[]).map(rowToDeveloper)
}

// ─── Profile ─────────────────────────────────────────────────────────────────

export async function getCurrentUser(): Promise<UserProfile> {
  if (USE_MOCK) return mockUser

  const db = getSupabase()
  const { data: { user } } = await db.auth.getUser()
  if (!user) return mockUser

  const { data } = await db.from('profiles').select('*').eq('id', user.id).single()
  if (!data) return mockUser

  const row = data as Row
  return {
    id: String(row.id),
    name: String(row.name),
    username: String(row.username),
    avatarColor: String(row.avatar_color),
    initials: String(row.initials),
    joinedAt: String(row.created_at),
    stats: {
      totalSubmitted: Number(row.total_submitted),
      totalBacked: Number(row.total_backed),
      totalVotes: Number(row.total_votes),
      totalFunded: Number(row.total_funded),
      reputation: Number(row.reputation),
    },
    badges: mockUser.badges,
  }
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export async function signInWithGithub() {
  const db = getSupabase()
  return db.auth.signInWithOAuth({
    provider: 'github',
    options: { redirectTo: `${window.location.origin}/auth/callback` },
  })
}

export async function signOut() {
  return getSupabase().auth.signOut()
}
