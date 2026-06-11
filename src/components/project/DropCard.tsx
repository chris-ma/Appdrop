'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Users } from 'lucide-react'
import { formatCount, formatCurrency, fundingPercent } from '@/lib/utils'
import type { Project } from '@/lib/types'
import CategoryBadge from './CategoryBadge'
import StatusPill from './StatusPill'
import VoteButton from './VoteButton'

interface DropCardProps {
  project: Project
  index?: number
}

export default function DropCard({ project, index = 0 }: DropCardProps) {
  const pct = fundingPercent(project.fundingCurrent, project.fundingGoal)
  const showFunding = project.status !== 'VOTING' && project.fundingGoal > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
    >
      <Link href={`/projects/${project.id}`} className="block group">
        <div className="relative glass rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
          {/* Gradient header band */}
          <div
            className={`h-1.5 bg-gradient-to-r ${project.gradient}`}
          />

          <div className="p-6">
            {/* Top row */}
            <div className="flex items-center justify-between mb-4">
              <CategoryBadge category={project.category} size="md" />
              <StatusPill status={project.status} />
            </div>

            {/* Title */}
            <h3 className="font-grotesk font-bold text-white text-xl leading-tight mb-1.5">
              {project.title}
            </h3>
            <p className="text-white/50 text-sm line-clamp-2 leading-relaxed mb-5">
              {project.tagline}
            </p>

            {/* Funding */}
            {showFunding && (
              <div className="mb-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-grotesk font-bold text-base">
                    {formatCurrency(project.fundingCurrent)}
                  </span>
                  <span className="text-white/40 text-xs font-grotesk">
                    {pct >= 100 ? 'FULLY FUNDED' : `${pct}% of ${formatCurrency(project.fundingGoal)}`}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${project.gradient} transition-all duration-1000`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <VoteButton upvotes={project.upvotes} size="md" />

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-white/30 text-xs font-grotesk">
                  <Users size={13} />
                  {formatCount(project.backerCount)} backers
                </div>
                <span className="flex items-center gap-1 text-brand-cyan text-xs font-grotesk font-bold uppercase tracking-wider group-hover:gap-2 transition-all duration-200">
                  VIEW
                  <ArrowRight size={13} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
