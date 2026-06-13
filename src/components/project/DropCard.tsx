'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { formatCurrency, fundingPercent } from '@/lib/utils'
import type { Project } from '@/lib/types'
import { CATEGORY_CONFIG, STATUS_CONFIG } from '@/lib/constants'
import VoteButton from './VoteButton'
import TiltCard from '@/components/ui/TiltCard'

interface DropCardProps {
  project: Project
  index?: number
}

export default function DropCard({ project, index = 0 }: DropCardProps) {
  const pct = fundingPercent(project.fundingCurrent, project.fundingGoal)
  const catConfig = CATEGORY_CONFIG[project.category]
  const statusConfig = STATUS_CONFIG[project.status]
  const showFunding = project.status !== 'VOTING' && project.fundingGoal > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
    >
      <TiltCard glowColor={`${catConfig.accent}12`} strength={12}>
        <Link href={`/projects/${project.id}`} className="block group">
          <div
            className="relative rounded-lg overflow-hidden border border-white/10 hover:border-white/18 transition-all duration-400 bg-[#181818]"
            style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)' }}
          >
            {/* Category accent — left border strip */}
            <div
              className="absolute top-0 bottom-0 left-0 w-px"
              style={{ background: catConfig.accent, opacity: 0.4 }}
            />

            {/* Header glow zone */}
            <div
              className="absolute top-0 left-0 right-0 h-32 opacity-20"
              style={{
                background: `radial-gradient(ellipse at 50% 0%, ${catConfig.accent} 0%, transparent 70%)`,
              }}
            />

            <div className="relative p-6 pl-7">
              {/* Top row */}
              <div className="flex items-center justify-between mb-5">
                <span
                  className="text-[10px] font-inter font-semibold tracking-[0.25em] uppercase"
                  style={{ color: catConfig.color }}
                >
                  {catConfig.label}
                </span>
                <span
                  className="text-[10px] font-inter font-medium tracking-[0.15em] uppercase px-2.5 py-1 rounded-sm"
                  style={{
                    background: statusConfig.bg,
                    color: statusConfig.text,
                    border: `1px solid ${statusConfig.border}`,
                  }}
                >
                  {statusConfig.label}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-heading text-[38px] text-white leading-none uppercase mb-2">
                {project.title}
              </h3>
              <p className="text-fog text-sm font-inter leading-relaxed line-clamp-2 mb-6">
                {project.tagline}
              </p>

              {/* Funding */}
              {showFunding && (
                <div className="mb-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-heading text-xl text-white">
                      {formatCurrency(project.fundingCurrent)}
                    </span>
                    <span className="text-fog text-[11px] font-inter tracking-wider">
                      {pct >= 100 ? 'FULLY FUNDED' : `${pct}% / ${formatCurrency(project.fundingGoal)}`}
                    </span>
                  </div>
                  <div className="h-px bg-white/8 relative overflow-hidden">
                    <motion.div
                      className="absolute left-0 top-0 h-full"
                      style={{ background: catConfig.accent, boxShadow: `0 0 8px ${catConfig.accent}` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1.4, delay: 0.3 }}
                    />
                  </div>
                </div>
              )}

              {/* Divider */}
              <div className="chrome-line mb-4" />

              {/* Footer */}
              <div className="flex items-center justify-between">
                <VoteButton upvotes={project.upvotes} size="sm" />
                <span className="flex items-center gap-1.5 text-[11px] font-inter font-medium tracking-wider uppercase text-fog opacity-0 group-hover:opacity-100 group-hover:text-electric transition-all duration-200">
                  VIEW DROP
                  <ArrowUpRight size={12} />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </TiltCard>
    </motion.div>
  )
}
