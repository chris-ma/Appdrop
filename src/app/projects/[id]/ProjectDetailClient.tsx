'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Check, Circle, Star, ArrowLeft, Share2, Bookmark, Users, MessageCircle,
  Heart, ThumbsUp, CheckCircle2
} from 'lucide-react'
import type { Project } from '@/lib/types'
import { CATEGORY_CONFIG } from '@/lib/constants'
import { formatCurrency, formatCount, timeAgo } from '@/lib/utils'
import CategoryBadge from '@/components/project/CategoryBadge'
import StatusPill from '@/components/project/StatusPill'
import FundingBar from '@/components/project/FundingBar'
import VoteButton from '@/components/project/VoteButton'
import Button from '@/components/ui/Button'
import GlassCard from '@/components/ui/GlassCard'

interface ProjectDetailClientProps {
  project: Project
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const [bookmarked, setBookmarked] = useState(false)
  const catConfig = CATEGORY_CONFIG[project.category]
  const showFunding = project.status !== 'VOTING' && project.fundingGoal > 0

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <div
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${catConfig.bg} 0%, rgba(0,0,0,0.8) 100%)`,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/noise.svg')",
            opacity: 0.03,
          }}
        />
        <div
          className="absolute -right-40 top-0 w-96 h-96 rounded-full"
          style={{
            background: `radial-gradient(circle, ${catConfig.bg} 0%, transparent 70%)`,
            filter: 'blur(60px)',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-10 pb-12">
          {/* Breadcrumb */}
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors font-grotesk"
          >
            <ArrowLeft size={16} />
            ALL DROPS
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <CategoryBadge category={project.category} size="md" />
                <StatusPill status={project.status} />
              </div>
              <h1 className="font-grotesk font-extrabold text-4xl md:text-6xl text-white uppercase tracking-tight leading-tight mb-2">
                {project.title}
              </h1>
              <p className="text-white/50 text-lg max-w-xl">{project.tagline}</p>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={() => setBookmarked((v) => !v)}
                className={`p-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
                  bookmarked ? 'bg-brand-purple/20 text-brand-purple border border-brand-purple/30' : 'glass text-white/40 hover:text-white'
                }`}
              >
                <Bookmark size={18} fill={bookmarked ? 'currentColor' : 'none'} />
              </button>
              <button className="p-2.5 glass rounded-xl text-white/40 hover:text-white transition-colors cursor-pointer">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <GlassCard>
              <h2 className="font-grotesk font-bold text-white uppercase tracking-wide text-sm mb-3 text-brand-purple">
                THE PROBLEM
              </h2>
              <p className="text-white/60 leading-relaxed">{project.description}</p>
            </GlassCard>

            {/* Features */}
            <GlassCard>
              <h2 className="font-grotesk font-bold text-white uppercase tracking-wide text-sm mb-4 text-brand-cyan">
                WHAT IT DOES
              </h2>
              <ul className="space-y-3">
                {project.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center flex-shrink-0">
                      <Check size={11} className="text-brand-cyan" strokeWidth={3} />
                    </div>
                    <span className="text-white/70 text-sm leading-relaxed">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </GlassCard>

            {/* Milestones */}
            <GlassCard>
              <h2 className="font-grotesk font-bold text-white uppercase tracking-wide text-sm mb-5 text-brand-orange">
                ROADMAP
              </h2>
              <div className="relative">
                <div className="absolute left-3.5 top-2 bottom-2 w-px bg-white/10" />
                <ul className="space-y-5">
                  {project.milestones.map((m, i) => (
                    <li key={m.id} className="relative flex items-start gap-4 pl-1">
                      <div
                        className={`relative z-10 mt-0.5 w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                          m.completed
                            ? 'bg-brand-green/20 border border-brand-green/40'
                            : 'bg-white/5 border border-white/15'
                        }`}
                      >
                        {m.completed ? (
                          <CheckCircle2 size={14} className="text-brand-green" />
                        ) : (
                          <Circle size={14} className="text-white/20" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`font-grotesk font-semibold text-sm ${m.completed ? 'text-white' : 'text-white/40'}`}>
                          {m.title}
                        </p>
                        <p className={`text-xs mt-0.5 font-grotesk ${m.completed ? 'text-brand-green' : 'text-white/25'}`}>
                          {m.completed ? '✓ COMPLETED' : `Due ${new Date(m.dueDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </GlassCard>

            {/* Discussion */}
            <GlassCard>
              <h2 className="font-grotesk font-bold text-white uppercase tracking-wide text-sm mb-5 text-brand-pink">
                DISCUSSION
                <span className="ml-2 text-white/30 font-normal">({project.comments.length})</span>
              </h2>
              <div className="space-y-4">
                {project.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-grotesk font-bold text-xs flex-shrink-0"
                      style={{ background: `${comment.avatarColor}20`, color: comment.avatarColor, border: `1px solid ${comment.avatarColor}30` }}
                    >
                      {comment.initials}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-grotesk font-semibold text-sm">{comment.author}</span>
                        <span className="text-white/30 text-xs font-grotesk">{timeAgo(comment.createdAt)}</span>
                      </div>
                      <p className="text-white/60 text-sm leading-relaxed">{comment.content}</p>
                      <button className="flex items-center gap-1.5 mt-2 text-white/30 hover:text-white/60 text-xs transition-colors cursor-pointer">
                        <ThumbsUp size={12} />
                        {comment.likes}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-white/8">
                <textarea
                  placeholder="Join the discussion..."
                  className="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none resize-none h-20 focus:border-brand-purple/40 transition-colors"
                />
                <div className="flex justify-end mt-2">
                  <Button variant="primary" size="sm">POST COMMENT</Button>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Right sidebar: sticky */}
          <div className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            {/* Vote + Back */}
            <GlassCard glow="purple" className="text-center">
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

              <Button variant="primary" size="lg" className="w-full mb-3">
                {project.status === 'VOTING' ? '⬆ VOTE FOR THIS DROP' :
                 project.status === 'FUNDING' ? '💎 BACK THIS DROP' :
                 project.status === 'LIVE' ? '🚀 GET ACCESS' : '📧 JOIN WAITLIST'}
              </Button>
              <p className="text-white/25 text-xs font-grotesk">
                {project.backerCount.toLocaleString()} people already
                {project.status === 'LIVE' ? ' using this' : ' backing this'}
              </p>
            </GlassCard>

            {/* Tags */}
            <GlassCard padding={false} className="p-4">
              <p className="text-[10px] font-grotesk font-bold uppercase tracking-widest text-white/30 mb-3">TAGS</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-grotesk text-white/40 bg-white/5 border border-white/10 rounded-md px-2 py-0.5"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </GlassCard>

            {/* Developer */}
            {project.developer && (
              <GlassCard glow="cyan">
                <p className="text-[10px] font-grotesk font-bold uppercase tracking-widest text-brand-cyan mb-4">
                  ASSIGNED BUILDER
                </p>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-grotesk font-bold text-sm"
                    style={{
                      background: `${project.developer.avatarColor}20`,
                      border: `1px solid ${project.developer.avatarColor}40`,
                      color: project.developer.avatarColor
                    }}
                  >
                    {project.developer.initials}
                  </div>
                  <div>
                    <p className="font-grotesk font-bold text-white text-sm">{project.developer.name}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={10}
                          className={i < Math.floor(project.developer!.rating) ? 'text-brand-yellow fill-brand-yellow' : 'text-white/20'}
                        />
                      ))}
                      <span className="text-white/40 text-xs ml-1">{project.developer.rating}</span>
                    </div>
                  </div>
                </div>
                <p className="text-white/40 text-xs leading-relaxed">{project.developer.tagline}</p>
              </GlassCard>
            )}

            {/* Stats */}
            <GlassCard padding={false} className="p-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'UPVOTES', value: formatCount(project.upvotes) },
                  { label: 'BACKERS', value: formatCount(project.backerCount) },
                  { label: 'COMMENTS', value: String(project.comments.length) },
                  { label: 'SUBMITTED', value: timeAgo(project.createdAt) },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-2">
                    <p className="font-grotesk font-bold text-white text-lg">{stat.value}</p>
                    <p className="text-[9px] font-grotesk uppercase tracking-widest text-white/30 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  )
}
