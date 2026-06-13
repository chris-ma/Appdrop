'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Check, Circle, Star, ArrowLeft, Share2, Bookmark,
  ThumbsUp, CheckCircle2
} from 'lucide-react'
import type { Project } from '@/lib/types'
import { CATEGORY_CONFIG } from '@/lib/constants'
import { formatCurrency, formatCount, timeAgo } from '@/lib/utils'
import CategoryBadge from '@/components/project/CategoryBadge'
import StatusPill from '@/components/project/StatusPill'
import FundingBar from '@/components/project/FundingBar'
import VoteButton from '@/components/project/VoteButton'
import Button from '@/components/ui/Button'
import MagneticButton from '@/components/ui/MagneticButton'

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

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const [bookmarked, setBookmarked] = useState(false)
  const catConfig = CATEGORY_CONFIG[project.category]
  const showFunding = project.status !== 'VOTING' && project.fundingGoal > 0
  const accentColor = catConfig.color

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <div
        className="relative overflow-hidden border-b border-white/5"
        style={{ background: '#111111' }}
      >
        {/* Corner accent lines */}
        <div className="absolute top-0 left-0 w-32 h-px" style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />
        <div className="absolute top-0 left-0 w-px h-32" style={{ background: `linear-gradient(180deg, ${accentColor}, transparent)` }} />

        {/* Glow orb */}
        <div
          className="absolute -right-40 top-0 w-96 h-96 rounded-full"
          style={{ background: `radial-gradient(circle, ${accentColor}10, transparent)`, filter: 'blur(80px)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-10 pb-12">
          {/* Breadcrumb */}
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

            {/* The Problem */}
            <Panel>
              <SectionLabel color="#00D4FF">THE PROBLEM</SectionLabel>
              <p className="text-fog font-inter leading-relaxed text-sm">{project.description}</p>
            </Panel>

            {/* Features */}
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

            {/* Milestones */}
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

            {/* Discussion */}
            <Panel>
              <SectionLabel color="#C8C8C8">
                DISCUSSION <span className="opacity-40">({project.comments.length})</span>
              </SectionLabel>
              <div className="space-y-5">
                {project.comments.map((comment) => (
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
              </div>
              <div className="mt-6 pt-5 border-t border-white/5">
                <textarea
                  placeholder="Join the discussion..."
                  className="w-full px-4 py-3 text-sm text-white placeholder-fog outline-none resize-none h-20 rounded-lg border border-white/12 focus:border-electric/30 transition-all font-inter"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                />
                <div className="flex justify-end mt-2">
                  <Button variant="primary" size="sm" className="font-heading text-[13px]">POST COMMENT</Button>
                </div>
              </div>
            </Panel>
          </div>

          {/* Right sidebar */}
          <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            {/* Vote + Back */}
            <Panel className="text-center">
              <div className="flex items-center justify-center gap-4 mb-5">
                <VoteButton
                  upvotes={project.upvotes}
                  downvotes={project.downvotes}
                  size="lg"
                />
              </div>

              {showFunding && (
                <FundingBar
                  current={project.fundingCurrent}
                  goal={project.fundingGoal}
                  backerCount={project.backerCount}
                  className="mb-5"
                />
              )}

              <MagneticButton>
                <Button variant="primary" size="lg" className="w-full font-heading text-[15px] mb-3">
                  {project.status === 'VOTING' ? 'VOTE FOR THIS DROP' :
                   project.status === 'FUNDING' ? 'BACK THIS DROP' :
                   project.status === 'LIVE' ? 'GET ACCESS' : 'JOIN WAITLIST'}
                </Button>
              </MagneticButton>
              <p className="text-fog text-[11px] font-inter">
                {project.backerCount.toLocaleString()} people already
                {project.status === 'LIVE' ? ' using this' : ' backing this'}
              </p>
            </Panel>

            {/* Tags */}
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

            {/* Developer */}
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

            {/* Stats */}
            <Panel>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'UPVOTES', value: formatCount(project.upvotes) },
                  { label: 'BACKERS', value: formatCount(project.backerCount) },
                  { label: 'COMMENTS', value: String(project.comments.length) },
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
    </div>
  )
}
