import Link from 'next/link'
import { Users, ArrowRight } from 'lucide-react'
import { cn, formatCount } from '@/lib/utils'
import type { Project } from '@/lib/types'
import CategoryBadge from './CategoryBadge'
import StatusPill from './StatusPill'
import FundingBar from './FundingBar'
import VoteButton from './VoteButton'

interface ProjectCardProps {
  project: Project
  className?: string
  compact?: boolean
}

export default function ProjectCard({ project, className, compact = false }: ProjectCardProps) {
  const showFunding = project.status !== 'VOTING' && project.fundingGoal > 0

  return (
    <Link href={`/projects/${project.id}`} className="block group">
      <div
        className={cn(
          'relative glass rounded-xl transition-all duration-300',
          'hover:border-white/20 hover:-translate-y-1',
          'hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]',
          compact ? 'p-4' : 'p-5',
          className
        )}
      >
        {/* Category + Status */}
        <div className="flex items-center justify-between mb-3">
          <CategoryBadge category={project.category} />
          <StatusPill status={project.status} />
        </div>

        {/* Title */}
        <h3
          className={cn(
            'font-grotesk font-bold text-white leading-tight mb-1',
            compact ? 'text-base' : 'text-lg'
          )}
        >
          {project.title}
        </h3>

        {/* Tagline */}
        <p
          className={cn(
            'text-white/50 leading-snug',
            compact ? 'text-xs' : 'text-sm',
            'line-clamp-2 mb-4'
          )}
        >
          {project.tagline}
        </p>

        {/* Funding bar */}
        {showFunding && !compact && (
          <FundingBar
            current={project.fundingCurrent}
            goal={project.fundingGoal}
            backerCount={project.backerCount}
            className="mb-4"
          />
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <div className="flex items-center gap-3">
            <VoteButton
              upvotes={project.upvotes}
              downvotes={project.downvotes}
              size="sm"
            />
            {!compact && (
              <div className="flex items-center gap-1 text-white/30 text-xs">
                <Users size={12} />
                <span className="font-grotesk">{formatCount(project.backerCount)}</span>
              </div>
            )}
          </div>

          <span className="flex items-center gap-1 text-brand-cyan text-xs font-grotesk font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            VIEW DROP
            <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  )
}
