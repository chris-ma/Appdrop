'use client'
import { motion } from 'framer-motion'
import { Star, Briefcase, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Developer } from '@/lib/types'
import Button from '@/components/ui/Button'
import GlassCard from '@/components/ui/GlassCard'

interface DeveloperCardProps {
  developer: Developer
  index?: number
}

export default function DeveloperCard({ developer, index = 0 }: DeveloperCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <GlassCard glow="cyan" hover padding={false} className="overflow-hidden">
        {/* Avatar header */}
        <div className="px-5 pt-5 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center font-grotesk font-bold text-white text-lg"
                style={{ background: `${developer.avatarColor}30`, border: `2px solid ${developer.avatarColor}50` }}
              >
                {developer.initials}
              </div>
              <div>
                <h3 className="font-grotesk font-bold text-white text-base">{developer.name}</h3>
                <p className="text-white/40 text-xs mt-0.5 leading-tight">{developer.tagline}</p>
              </div>
            </div>
            <span
              className={cn(
                'text-[10px] font-grotesk font-bold uppercase tracking-wider px-2 py-1 rounded-full',
                developer.available
                  ? 'bg-brand-green/10 text-brand-green border border-brand-green/30'
                  : 'bg-white/5 text-white/30 border border-white/10'
              )}
            >
              {developer.available ? 'AVAILABLE' : 'BUSY'}
            </span>
          </div>

          {/* Rating + stats */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={i < Math.floor(developer.rating) ? 'text-brand-yellow fill-brand-yellow' : 'text-white/20'}
                />
              ))}
              <span className="text-white font-grotesk font-bold text-sm ml-1">{developer.rating}</span>
              <span className="text-white/30 text-xs">({developer.reviewCount})</span>
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {developer.skills.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="text-[11px] font-grotesk text-white/60 bg-white/5 border border-white/10 rounded-md px-2 py-0.5"
              >
                {skill}
              </span>
            ))}
            {developer.skills.length > 4 && (
              <span className="text-[11px] font-grotesk text-white/30 bg-white/5 rounded-md px-2 py-0.5">
                +{developer.skills.length - 4}
              </span>
            )}
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-4 text-xs text-white/40 font-grotesk mb-4">
            <div className="flex items-center gap-1.5">
              <Briefcase size={12} />
              {developer.completedProjects} projects
            </div>
            <div className="flex items-center gap-1.5">
              <MessageCircle size={12} />
              {developer.reviewCount} reviews
            </div>
            <div className="ml-auto text-white/60 font-semibold">
              ${developer.hourlyRate}/hr
            </div>
          </div>
        </div>

        {/* Portfolio strip */}
        <div className="px-5 py-3 bg-white/2 border-t border-white/5">
          {developer.portfolioItems.slice(0, 1).map((item) => (
            <div key={item.title}>
              <p className="text-white text-xs font-grotesk font-semibold">{item.title}</p>
              <p className="text-white/30 text-xs mt-0.5">{item.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="px-5 py-4">
          <Button
            variant="neon"
            size="sm"
            className="w-full"
            disabled={!developer.available}
          >
            {developer.available ? 'REQUEST BID' : 'UNAVAILABLE'}
          </Button>
        </div>
      </GlassCard>
    </motion.div>
  )
}
