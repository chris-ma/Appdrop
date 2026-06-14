import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn, formatCount } from '@/lib/utils'
import type { Project } from '@/lib/types'
import { CATEGORY_CONFIG, STATUS_CONFIG } from '@/lib/constants'
import VoteButton from './VoteButton'
import FundingBar from './FundingBar'
import TiltCard from '@/components/ui/TiltCard'

interface ProjectCardProps {
  project: Project
  className?: string
  compact?: boolean
}

export default function ProjectCard({ project, className, compact = false }: ProjectCardProps) {
  const catConfig = CATEGORY_CONFIG[project.category]
  const statusConfig = STATUS_CONFIG[project.status]
  const showFunding = project.status !== 'VOTING' && project.fundingGoal > 0

  return (
    <TiltCard glowColor={`${catConfig.accent}10`} strength={10}>
      <Link href={`/projects/${project.id}`} className="block group">
        <div
          className={cn(
            'relative rounded-lg overflow-hidden transition-all duration-300',
            'border border-white/10 hover:border-white/15',
            'bg-[#181818]',
            compact ? 'p-4' : 'p-5',
            className
          )}
        >
          {/* Top accent line from category color */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${catConfig.accent}40, transparent)` }}
          />

          {/* Top row: category + status */}
          <div className="flex items-center justify-between mb-4">
            <span
              className="text-[10px] font-inter font-medium tracking-[0.2em] uppercase"
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
          <h3
            className={cn(
              'font-heading text-white leading-none mb-2 uppercase',
              compact ? 'text-2xl' : 'text-[28px]'
            )}
          >
            {project.title}
          </h3>

          {/* Tagline */}
          <p className="text-fog text-[13px] font-inter leading-relaxed line-clamp-2 mb-4">
            {project.tagline}
          </p>

          {/* Funding */}
          {showFunding && !compact && (
            <FundingBar
              current={project.fundingCurrent}
              goal={project.fundingGoal}
              backerCount={project.backerCount}
              className="mb-4"
            />
          )}

          {/* Divider */}
          <div className="chrome-line mb-3" />

          {/* Footer */}
          <div className="flex items-center justify-between">
            <VoteButton upvotes={project.upvotes} downvotes={project.downvotes} ideaId={project.id} size="sm" />

            <span
              className="flex items-center gap-1.5 text-[11px] font-inter font-medium tracking-[0.15em] uppercase text-fog opacity-0 group-hover:opacity-100 group-hover:text-electric transition-all duration-200"
            >
              VIEW
              <ArrowRight size={11} />
            </span>
          </div>
        </div>
      </Link>
    </TiltCard>
  )
}
