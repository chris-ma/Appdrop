import { getSupabase } from './supabase'
import type { Project, Developer, UserProfile, Comment } from './types'
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

export async function voteOnProject(ideaId: string, direction: 'up' | 'down' | null): Promise<void> {
  if (USE_MOCK) return

  const db = getSupabase()
  const { data: { user } } = await db.auth.getUser()
  if (!user) return

  if (direction === null) {
    await db.from('votes').delete().eq('idea_id', ideaId).eq('user_id', user.id)
  } else {
    await db.from('votes').upsert(
      { idea_id: ideaId, user_id: user.id, direction },
      { onConflict: 'idea_id,user_id' }
    )
  }
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

// ─── Comments ────────────────────────────────────────────────────────────────

export async function postComment(ideaId: string, content: string): Promise<Comment | null> {
  if (USE_MOCK) return null

  const db = getSupabase()
  const { data: { user } } = await db.auth.getUser()
  if (!user) return null

  const { data: profile } = await db.from('profiles').select('name, initials, avatar_color').eq('id', user.id).single()
  const p = profile as Row | null

  const { data, error } = await db.from('comments').insert({
    idea_id: ideaId,
    user_id: user.id,
    content,
    author: p?.name ?? 'Anonymous',
    initials: p?.initials ?? '??',
    avatar_color: p?.avatar_color ?? '#00D4FF',
  }).select('*').single()

  if (error || !data) return null
  const row = data as Row
  return {
    id: String(row.id),
    author: String(row.author),
    initials: String(row.initials),
    avatarColor: String(row.avatar_color),
    content: String(row.content),
    likes: Number(row.likes),
    createdAt: String(row.created_at),
  }
}

// ─── Pledges ─────────────────────────────────────────────────────────────────

export async function pledgeToProject(ideaId: string, amount: number): Promise<boolean> {
  if (USE_MOCK) return true

  const db = getSupabase()
  const { data: { user } } = await db.auth.getUser()
  if (!user) return false

  const { error } = await db.from('pledges').insert({ idea_id: ideaId, user_id: user.id, amount })
  return !error
}

// ─── User Projects ────────────────────────────────────────────────────────────

export async function getProjectsByCreator(userId: string): Promise<Project[]> {
  if (USE_MOCK) return mockProjects.slice(0, 3)

  const db = getSupabase()
  const { data } = await db.from('ideas').select('*').eq('creator_id', userId).order('created_at', { ascending: false })
  return ((data ?? []) as Row[]).map((row) => rowToProject(row, [], []))
}

export async function getBackedProjects(userId: string): Promise<Project[]> {
  if (USE_MOCK) return mockProjects.slice(3, 6)

  const db = getSupabase()
  const { data: pledges } = await db.from('pledges').select('idea_id').eq('user_id', userId).neq('status', 'refunded')
  if (!pledges || pledges.length === 0) return []

  const ids = (pledges as Row[]).map((r) => String(r.idea_id))
  const { data } = await db.from('ideas').select('*').in('id', ids)
  return ((data ?? []) as Row[]).map((row) => rowToProject(row, [], []))
}

export async function getRecentActivity(userId: string): Promise<Array<{
  type: 'vote' | 'comment'
  ideaId: string
  content: string
  createdAt: string
}>> {
  if (USE_MOCK) return []

  const db = getSupabase()
  const [{ data: votes }, { data: comments }] = await Promise.all([
    db.from('votes').select('idea_id, direction, created_at').eq('user_id', userId).order('created_at', { ascending: false }).limit(5),
    db.from('comments').select('idea_id, content, created_at').eq('user_id', userId).order('created_at', { ascending: false }).limit(5),
  ])

  const items = [
    ...((votes ?? []) as Row[]).map((v) => ({
      type: 'vote' as const,
      ideaId: String(v.idea_id),
      content: String(v.direction) === 'up' ? 'Upvoted a project' : 'Downvoted a project',
      createdAt: String(v.created_at),
    })),
    ...((comments ?? []) as Row[]).map((c) => ({
      type: 'comment' as const,
      ideaId: String(c.idea_id),
      content: String(c.content).slice(0, 80),
      createdAt: String(c.created_at),
    })),
  ]

  return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 10)
}

// ─── Admin ───────────────────────────────────────────────────────────────────

export async function updateIdeaStatus(ideaId: string, status: string): Promise<boolean> {
  if (USE_MOCK) return true

  const db = getSupabase()
  const { error } = await db.from('ideas').update({ status }).eq('id', ideaId)
  return !error
}

export async function getAllIdeasAdmin(): Promise<Project[]> {
  if (USE_MOCK) return mockProjects

  const db = getSupabase()
  const { data, error } = await db.from('ideas').select('*').order('created_at', { ascending: false })
  if (error || !data) return []
  return (data as Row[]).map((row) => rowToProject(row, [], []))
}

// ─── Bid Requests ────────────────────────────────────────────────────────────

export async function requestBid(input: {
  developerId: string
  message: string
  budget: string
  timeline: string
  ideaId?: string
}): Promise<boolean> {
  if (USE_MOCK) return true

  const db = getSupabase()
  const { data: { user } } = await db.auth.getUser()
  if (!user) return false

  const { error } = await db.from('bid_requests').insert({
    developer_id: input.developerId,
    user_id: user.id,
    message: input.message,
    budget: input.budget,
    timeline: input.timeline,
    idea_id: input.ideaId ?? null,
  })
  return !error
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
