'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  Check, Circle, Star, ArrowLeft, Share2, Bookmark,
  ThumbsUp, CheckCircle2, MessageSquare, Play, FileText, Globe
} from 'lucide-react'
import type { Project, Comment, Update } from '@/lib/types'
import { CATEGORY_CONFIG } from '@/lib/constants'
import { formatCount, timeAgo } from '@/lib/utils'
import CategoryBadge from '@/components/project/CategoryBadge'
import StatusPill from '@/components/project/StatusPill'
import FundingBar from '@/components/project/FundingBar'
import VoteButton from '@/components/project/VoteButton'
import Button from '@/components/ui/Button'
import MagneticButton from '@/components/ui/MagneticButton'
import PledgeModal from '@/components/ui/PledgeModal'
import { postComment, getProjectUpdates, postProjectUpdate } from '@/lib/api'
import { useAuth } from '@/lib/auth-context'
import { useToast } from '@/components/ui/Toast'
import { getSupabase } from '@/lib/supabase'

const USE_MOCK = !process.env.NEXT_PUBLIC_SUPABASE_URL

interface ProjectDetailClientProps {
  project: Project
}

function Panel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-lg border border-white/10 p-6 ${className}`}
      style={{ background: '#181818' }}
    >
      {children}
    </div>
  )
}

function SectionLabel({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-3 h-px" style={{ background: color }} />
      <span className="text-[10px] font-inter tracking-[0.25em] uppercase" style={{ color }}>
        {children}
      </span>
    </div>
  )
}

function extractYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([A-Za-z0-9_-]{11})/)
  return match?.[1] ?? null
}

function toGoogleSlidesEmbed(url: string): string {
  return url.split('#')[0].split('?')[0].replace(/\/(edit|pub|present)$/, '') + '/embed'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToComment(row: Record<string, any>): Comment {
  return {
    id: String(row.id),
    author: String(row.author),
    initials: String(row.initials),
    avatarColor: String(row.avatar_color),
    content: String(row.content),
    likes: Number(row.likes ?? 0),
    createdAt: String(row.created_at),
  }
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const [bookmarked, setBookmarked] = useState(false)
  const [pledgeOpen, setPledgeOpen] = useState(false)
  const [fundingCurrent, setFundingCurrent] = useState(project.fundingCurrent)
  const [backerCount, setBackerCount] = useState(project.backerCount)
  const [upvotes, setUpvotes] = useState(project.upvotes)
  const [comments, setComments] = useState<Comment[]>(project.comments)
  const [commentText, setCommentText] = useState('')
  const [posting, setPosting] = useState(false)
  const [activeTab, setActiveTab] = useState<'DISCUSSION' | 'UPDATES'>('DISCUSSION')
  const [updates, setUpdates] = useState<Update[]>([])
  const [updateTitle, setUpdateTitle] = useState('')
  const [updateContent, setUpdateContent] = useState('')
  const [postingUpdate, setPostingUpdate] = useState(false)
  const { user, signIn } = useAuth()
  const toast = useToast()
  const commentIds = useRef(new Set(project.comments.map((c) => c.id)))
  const updateIds = useRef(new Set<string>())

  const isCreator = !!user && !!project.creatorId && user.id === project.creatorId

  // Load updates on mount
  useEffect(() => {
    getProjectUpdates(project.id).then(setUpdates)
  }, [project.id])

  // Show success toast if returning from Stripe checkout
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    if (params.get('paid') === '1') {
      toast.success('Payment successful! Your pledge has been received.')
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Supabase Realtime — live vote counts, comments, funding
  useEffect(() => {
    if (USE_MOCK) return

    const supabase = getSupabase()
    const channel = supabase
      .channel(`idea:${project.id}`)
      .on(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        'postgres_changes' as any,
        { event: 'INSERT', schema: 'public', table: 'comments', filter: `idea_id=eq.${project.id}` },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (payload: any) => {
          const newComment = rowToComment(payload.new)
          if (!commentIds.current.has(newComment.id)) {
            commentIds.current.add(newComment.id)
            setComments((prev) => [...prev, newComment])
          }
        }
      )
      .on(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        'postgres_changes' as any,
        { event: 'UPDATE', schema: 'public', table: 'ideas', filter: `id=eq.${project.id}` },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (payload: any) => {
          const row = payload.new
          if (row.funding_current !== undefined) setFundingCurrent(Number(row.funding_current))
          if (row.backer_count !== undefined) setBackerCount(Number(row.backer_count))
          if (row.upvotes !== undefined) setUpvotes(Number(row.upvotes))
        }
      )
      .on(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        'postgres_changes' as any,
        { event: 'INSERT', schema: 'public', table: 'project_updates', filter: `idea_id=eq.${project.id}` },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (payload: any) => {
          const r = payload.new
          const update: Update = {
            id: String(r.id),
            ideaId: String(r.idea_id),
            title: String(r.title),
            content: String(r.content),
            createdAt: String(r.created_at),
          }
          if (!updateIds.current.has(update.id)) {
            updateIds.current.add(update.id)
            setUpdates((prev) => [update, ...prev])
          }
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [project.id])

  const catConfig = CATEGORY_CONFIG[project.category]
  const showFunding = project.status !== 'VOTING' && project.fundingGoal > 0
  const accentColor = catConfig.color

  const handlePledgeSuccess = (amount: number) => {
    setFundingCurrent((v) => v + amount)
    setBackerCount((v) => v + 1)
  }

  const handlePostComment = async () => {
    if (!user) { await signIn(); return }
    const text = commentText.trim()
    if (!text) return
    setPosting(true)
    const result = await postComment(project.id, text)
    setPosting(false)
    if (result) {
      setComments((prev) => [...prev, result])
      setCommentText('')
      toast.success('Comment posted!')
    } else {
      toast.error('Failed to post comment.')
    }
  }

  const handlePostUpdate = async () => {
    if (!user || !updateTitle.trim() || !updateContent.trim()) return
    setPostingUpdate(true)
    const result = await postProjectUpdate(project.id, updateTitle.trim(), updateContent.trim())
    setPostingUpdate(false)
    if (result) {
      setUpdateTitle('')
      setUpdateContent('')
      toast.success('Update posted!')
    } else {
      toast.error('Failed to post update.')
    }
  }

  const ctaLabel =
    project.status === 'VOTING' ? 'VOTE FOR THIS DROP' :
    project.status === 'FUNDING' ? 'BACK THIS DROP' :
    project.status === 'LIVE' ? 'GET ACCESS' : 'JOIN WAITLIST'

  const handleCta = () => {
    if (project.status === 'FUNDING') {
      setPledgeOpen(true)
    }
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <div
        className="relative overflow-hidden border-b border-white/5"
        style={{ background: '#111111' }}
      >
        <div className="absolute top-0 left-0 w-32 h-px" style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />
        <div className="absolute top-0 left-0 w-px h-32" style={{ background: `linear-gradient(180deg, ${accentColor}, transparent)` }} />

        <div
          className="absolute -right-40 top-0 w-96 h-96 rounded-full"
          style={{ background: `radial-gradient(circle, ${accentColor}10, transparent)`, filter: 'blur(80px)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-10 pb-12">
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 text-fog hover:text-white text-[11px] font-inter tracking-[0.2em] uppercase mb-8 transition-colors"
          >
            <ArrowLeft size={14} />
            ALL DROPS
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <CategoryBadge category={project.category} size="md" />
                <StatusPill status={project.status} />
              </div>
              <h1 className="font-heading text-5xl md:text-7xl text-white uppercase leading-none mb-3">
                {project.title}
              </h1>
              <p className="text-fog text-base font-inter max-w-xl">{project.tagline}</p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => setBookmarked((v) => !v)}
                className="p-2.5 rounded transition-all duration-200 cursor-pointer border"
                style={
                  bookmarked
                    ? { background: `${accentColor}10`, color: accentColor, borderColor: `${accentColor}30` }
                    : { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)', borderColor: 'rgba(255,255,255,0.08)' }
                }
              >
                <Bookmark size={16} fill={bookmarked ? 'currentColor' : 'none'} />
              </button>
              <button
                className="p-2.5 rounded transition-colors cursor-pointer border border-white/12 text-fog hover:text-white"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              >
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Content */}
          <div className="lg:col-span-2 space-y-4">

            <Panel>
              <SectionLabel color="#00D4FF">THE PROBLEM</SectionLabel>
              <p className="text-fog font-inter leading-relaxed text-sm">{project.description}</p>
            </Panel>

            <Panel>
              <SectionLabel color="#00FF88">WHAT IT DOES</SectionLabel>
              <ul className="space-y-3">
                {project.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <div
                      className="mt-0.5 w-4 h-4 rounded flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(0,255,136,0.12)', border: '1px solid rgba(0,255,136,0.2)' }}
                    >
                      <Check size={10} style={{ color: '#00FF88' }} strokeWidth={3} />
                    </div>
                    <span className="text-fog text-sm font-inter leading-relaxed">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </Panel>

            <Panel>
              <SectionLabel color="#BF5AF2">ROADMAP</SectionLabel>
              <div className="relative">
                <div className="absolute left-3 top-2 bottom-2 w-px bg-white/5" />
                <ul className="space-y-5">
                  {project.milestones.map((m) => (
                    <li key={m.id} className="relative flex items-start gap-4 pl-1">
                      <div
                        className="relative z-10 mt-0.5 w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                        style={
                          m.completed
                            ? { background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.3)' }
                            : { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }
                        }
                      >
                        {m.completed ? (
                          <CheckCircle2 size={13} style={{ color: '#00FF88' }} />
                        ) : (
                          <Circle size={13} className="text-white/20" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`font-inter text-sm font-medium ${m.completed ? 'text-white' : 'text-fog'}`}>
                          {m.title}
                        </p>
                        <p className="text-[11px] font-inter mt-0.5" style={{ color: m.completed ? '#00FF88' : 'rgba(255,255,255,0.2)' }}>
                          {m.completed ? '✓ COMPLETED' : `Due ${new Date(m.dueDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Panel>

            {/* Media panel — only renders if any media present */}
            {(project.videoUrl || (project.images && project.images.length > 0) || project.pitchDeckUrl) && (
              <Panel>
                <SectionLabel color="#00D4FF">PITCH MEDIA</SectionLabel>
                <div className="space-y-5">

                  {/* Video embed */}
                  {project.videoUrl && (() => {
                    const ytId = extractYouTubeId(project.videoUrl)
                    if (ytId) {
                      return (
                        <div>
                          <p className="text-[10px] font-inter tracking-[0.2em] uppercase text-fog mb-2 flex items-center gap-1.5">
                            <Play size={10} style={{ color: '#00D4FF' }} />
                            DEMO VIDEO
                          </p>
                          <div className="relative w-full rounded-lg overflow-hidden border border-white/8" style={{ paddingBottom: '56.25%' }}>
                            <iframe
                              src={`https://www.youtube-nocookie.com/embed/${ytId}`}
                              title="Demo video"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="absolute inset-0 w-full h-full"
                            />
                          </div>
                        </div>
                      )
                    }
                    return (
                      <a href={project.videoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-electric hover:text-white text-sm font-inter transition-colors">
                        <Play size={14} />
                        Watch Demo Video
                      </a>
                    )
                  })()}

                  {/* Image gallery */}
                  {project.images && project.images.length > 0 && (
                    <div>
                      <p className="text-[10px] font-inter tracking-[0.2em] uppercase text-fog mb-2">SCREENSHOTS</p>
                      <div className={`grid gap-2 ${project.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                        {project.images.map((src, i) => (
                          <div
                            key={i}
                            className="relative aspect-video rounded-lg overflow-hidden border border-white/8"
                            style={{ background: '#111' }}
                          >
                            <Image
                              src={src}
                              alt={`Screenshot ${i + 1}`}
                              fill
                              unoptimized
                              className="object-cover"
                              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pitch deck */}
                  {project.pitchDeckUrl && (
                    <div>
                      <p className="text-[10px] font-inter tracking-[0.2em] uppercase text-fog mb-2 flex items-center gap-1.5">
                        <FileText size={10} style={{ color: '#BF5AF2' }} />
                        PITCH DECK
                      </p>
                      {project.pitchDeckUrl.includes('docs.google.com/presentation') ? (
                        <div className="relative w-full rounded-lg overflow-hidden border border-white/8" style={{ paddingBottom: '56.25%' }}>
                          <iframe
                            src={toGoogleSlidesEmbed(project.pitchDeckUrl)}
                            title="Pitch deck"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full"
                          />
                        </div>
                      ) : (
                        <a
                          href={project.pitchDeckUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-3 rounded-lg border border-white/10 text-fog hover:text-white hover:border-cyber/40 transition-all text-sm font-inter"
                          style={{ background: 'rgba(191,90,242,0.04)' }}
                        >
                          <FileText size={14} style={{ color: '#BF5AF2' }} />
                          View Pitch Deck
                          <Globe size={12} className="ml-auto opacity-40" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </Panel>
            )}

            {/* Discussion + Updates tabs */}
            <Panel>
              {/* Tab bar */}
              <div className="flex items-center gap-1 mb-5 border-b border-white/8 pb-4">
                {(['DISCUSSION', 'UPDATES'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="font-heading text-[13px] uppercase tracking-wide px-4 py-1.5 rounded transition-all duration-200 cursor-pointer"
                    style={
                      activeTab === tab
                        ? { background: 'rgba(0,212,255,0.08)', color: '#00D4FF', border: '1px solid rgba(0,212,255,0.2)' }
                        : { color: 'rgba(255,255,255,0.3)', border: '1px solid transparent' }
                    }
                  >
                    {tab === 'DISCUSSION' ? `${tab} (${comments.length})` : `${tab} (${updates.length})`}
                  </button>
                ))}
              </div>

              {activeTab === 'DISCUSSION' && (
                <>
                  <div className="space-y-5">
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <div
                          className="w-8 h-8 rounded flex items-center justify-center font-heading text-sm flex-shrink-0"
                          style={{ background: `${comment.avatarColor}12`, color: comment.avatarColor, border: `1px solid ${comment.avatarColor}25` }}
                        >
                          {comment.initials}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-white font-inter font-medium text-sm">{comment.author}</span>
                            <span className="text-fog text-[11px] font-inter">{timeAgo(comment.createdAt)}</span>
                          </div>
                          <p className="text-fog text-sm font-inter leading-relaxed">{comment.content}</p>
                          <button className="flex items-center gap-1.5 mt-2 text-fog hover:text-white text-[11px] font-inter transition-colors cursor-pointer">
                            <ThumbsUp size={11} />
                            {comment.likes}
                          </button>
                        </div>
                      </div>
                    ))}
                    {comments.length === 0 && (
                      <p className="text-fog text-sm font-inter text-center py-4">
                        No comments yet. Be the first to join the discussion.
                      </p>
                    )}
                  </div>
                  <div className="mt-6 pt-5 border-t border-white/5">
                    {user ? (
                      <>
                        <textarea
                          placeholder="Join the discussion..."
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          className="w-full px-4 py-3 text-sm text-white placeholder-fog outline-none resize-none h-20 rounded-lg border border-white/12 focus:border-electric/30 transition-all font-inter"
                          style={{ background: 'rgba(255,255,255,0.05)' }}
                        />
                        <div className="flex justify-end mt-2">
                          <Button
                            variant="primary"
                            size="sm"
                            className="font-heading text-[13px]"
                            onClick={handlePostComment}
                            disabled={posting || !commentText.trim()}
                          >
                            <MessageSquare size={13} />
                            {posting ? 'POSTING...' : 'POST COMMENT'}
                          </Button>
                        </div>
                      </>
                    ) : (
                      <button
                        onClick={() => signIn()}
                        className="w-full py-3 text-sm font-inter text-fog hover:text-white transition-colors cursor-pointer border border-white/10 rounded-lg"
                        style={{ background: 'rgba(255,255,255,0.03)' }}
                      >
                        Sign in to join the discussion
                      </button>
                    )}
                  </div>
                </>
              )}

              {activeTab === 'UPDATES' && (
                <>
                  {isCreator && (
                    <div className="mb-6 p-4 rounded-lg border border-white/10" style={{ background: 'rgba(0,212,255,0.04)' }}>
                      <p className="text-[10px] font-inter tracking-[0.2em] text-electric uppercase mb-3">POST UPDATE</p>
                      <input
                        placeholder="Update title..."
                        value={updateTitle}
                        onChange={(e) => setUpdateTitle(e.target.value)}
                        className="w-full px-3 py-2 text-sm text-white placeholder-fog outline-none rounded border border-white/12 focus:border-electric/30 transition-all font-inter mb-2"
                        style={{ background: 'rgba(255,255,255,0.05)' }}
                      />
                      <textarea
                        placeholder="What's the latest? Share progress with your backers..."
                        value={updateContent}
                        onChange={(e) => setUpdateContent(e.target.value)}
                        className="w-full px-3 py-2 text-sm text-white placeholder-fog outline-none resize-none h-20 rounded border border-white/12 focus:border-electric/30 transition-all font-inter mb-2"
                        style={{ background: 'rgba(255,255,255,0.05)' }}
                      />
                      <div className="flex justify-end">
                        <Button
                          variant="primary"
                          size="sm"
                          className="font-heading text-[13px]"
                          onClick={handlePostUpdate}
                          disabled={postingUpdate || !updateTitle.trim() || !updateContent.trim()}
                        >
                          {postingUpdate ? 'POSTING...' : 'POST UPDATE'}
                        </Button>
                      </div>
                    </div>
                  )}
                  <div className="space-y-4">
                    {updates.map((update) => (
                      <div key={update.id} className="rounded-lg border border-white/8 p-4" style={{ background: '#111' }}>
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 size={13} style={{ color: '#00D4FF' }} />
                          <span className="text-fog text-[11px] font-inter">{timeAgo(update.createdAt)}</span>
                        </div>
                        <p className="text-white font-inter font-medium text-sm mb-1">{update.title}</p>
                        <p className="text-fog text-sm font-inter leading-relaxed">{update.content}</p>
                      </div>
                    ))}
                    {updates.length === 0 && (
                      <p className="text-fog text-sm font-inter text-center py-6">
                        No updates yet. {isCreator ? 'Post your first update above.' : 'Check back soon.'}
                      </p>
                    )}
                  </div>
                </>
              )}
            </Panel>
          </div>

          {/* Right sidebar */}
          <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <Panel className="text-center">
              <div className="flex items-center justify-center gap-4 mb-5">
                <VoteButton
                  upvotes={upvotes}
                  downvotes={project.downvotes}
                  ideaId={project.id}
                  size="lg"
                />
              </div>

              {showFunding && (
                <FundingBar
                  current={fundingCurrent}
                  goal={project.fundingGoal}
                  backerCount={backerCount}
                  className="mb-5"
                />
              )}

              <MagneticButton>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full font-heading text-[15px] mb-3"
                  onClick={handleCta}
                >
                  {ctaLabel}
                </Button>
              </MagneticButton>
              <p className="text-fog text-[11px] font-inter">
                {backerCount.toLocaleString()} people already
                {project.status === 'LIVE' ? ' using this' : ' backing this'}
              </p>
            </Panel>

            <Panel>
              <p className="text-[10px] font-inter tracking-[0.25em] text-fog uppercase mb-3">TAGS</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-inter text-fog border border-white/10 rounded px-2 py-0.5"
                    style={{ background: 'rgba(255,255,255,0.05)' }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </Panel>

            {project.developer && (
              <Panel>
                <p className="text-[10px] font-inter tracking-[0.25em] text-electric uppercase mb-4">
                  ASSIGNED BUILDER
                </p>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded flex items-center justify-center font-heading text-lg"
                    style={{
                      background: `${project.developer.avatarColor}12`,
                      border: `1px solid ${project.developer.avatarColor}30`,
                      color: project.developer.avatarColor,
                    }}
                  >
                    {project.developer.initials}
                  </div>
                  <div>
                    <p className="font-heading text-xl text-white leading-none">{project.developer.name}</p>
                    <div className="flex items-center gap-0.5 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={10}
                          className={i < Math.floor(project.developer!.rating) ? 'fill-current' : 'opacity-20'}
                          style={{ color: i < Math.floor(project.developer!.rating) ? '#00D4FF' : 'white' }}
                        />
                      ))}
                      <span className="text-fog text-[11px] ml-1">{project.developer.rating}</span>
                    </div>
                  </div>
                </div>
                <p className="text-fog text-[11px] font-inter leading-relaxed">{project.developer.tagline}</p>
              </Panel>
            )}

            <Panel>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'UPVOTES', value: formatCount(upvotes) },
                  { label: 'BACKERS', value: formatCount(backerCount) },
                  { label: 'COMMENTS', value: String(comments.length) },
                  { label: 'SUBMITTED', value: timeAgo(project.createdAt) },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-2">
                    <p className="font-heading text-3xl text-white leading-none">{stat.value}</p>
                    <p className="text-[9px] font-inter tracking-[0.2em] uppercase text-fog mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </div>
      </div>

      <PledgeModal
        projectId={project.id}
        projectTitle={project.title}
        isOpen={pledgeOpen}
        onClose={() => setPledgeOpen(false)}
        onSuccess={handlePledgeSuccess}
      />
    </div>
  )
}
