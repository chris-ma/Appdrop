'use client'
import { motion } from 'framer-motion'
import { Star, Briefcase, MessageCircle } from 'lucide-react'
import type { Developer } from '@/lib/types'
import Button from '@/components/ui/Button'
import TiltCard from '@/components/ui/TiltCard'

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
      <TiltCard strength={6}>
        <div className="group rounded-lg border border-white/10 hover:border-white/18 transition-all duration-300 overflow-hidden" style={{ background: '#181818' }}>
          {/* Accent line top */}
          <div
            className="h-px w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: `linear-gradient(90deg, transparent, ${developer.avatarColor}, transparent)` }}
          />

          <div className="p-5">
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded flex items-center justify-center font-heading text-xl text-white"
                  style={{ background: `${developer.avatarColor}15`, border: `1px solid ${developer.avatarColor}30`, color: developer.avatarColor }}
                >
                  {developer.initials}
                </div>
                <div>
                  <h3 className="font-heading text-2xl text-white leading-none">{developer.name}</h3>
                  <p className="text-fog text-[11px] font-inter mt-0.5 leading-tight">{developer.tagline}</p>
                </div>
              </div>
              <span
                className="text-[9px] font-inter font-medium uppercase tracking-[0.2em] px-2 py-1 rounded"
                style={
                  developer.available
                    ? { background: 'rgba(0,255,136,0.12)', color: '#00FF88', border: '1px solid rgba(0,255,136,0.2)' }
                    : { background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.25)', border: '1px solid rgba(255,255,255,0.08)' }
                }
              >
                {developer.available ? 'AVAILABLE' : 'BUSY'}
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={11}
                    className={i < Math.floor(developer.rating) ? 'fill-current' : 'opacity-20'}
                    style={{ color: i < Math.floor(developer.rating) ? '#00D4FF' : 'white' }}
                  />
                ))}
              </div>
              <span className="text-white font-inter text-sm font-medium">{developer.rating}</span>
              <span className="text-fog text-xs">({developer.reviewCount})</span>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {developer.skills.slice(0, 4).map((skill) => (
                <span
                  key={skill}
                  className="text-[10px] font-inter text-fog border border-white/12 rounded px-2 py-0.5"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                >
                  {skill}
                </span>
              ))}
              {developer.skills.length > 4 && (
                <span className="text-[10px] font-inter text-mist rounded px-2 py-0.5" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  +{developer.skills.length - 4}
                </span>
              )}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 text-[11px] text-fog font-inter mb-5">
              <div className="flex items-center gap-1.5">
                <Briefcase size={11} />
                {developer.completedProjects} projects
              </div>
              <div className="flex items-center gap-1.5">
                <MessageCircle size={11} />
                {developer.reviewCount} reviews
              </div>
              <div className="ml-auto text-white font-medium">
                ${developer.hourlyRate}<span className="text-fog">/hr</span>
              </div>
            </div>

            {/* Chrome divider */}
            <div className="chrome-line mb-4" />

            {/* Portfolio */}
            {developer.portfolioItems.slice(0, 1).map((item) => (
              <div key={item.title} className="mb-4">
                <p className="text-white text-[11px] font-inter font-medium tracking-wide">{item.title}</p>
                <p className="text-fog text-[11px] font-inter mt-0.5">{item.description}</p>
              </div>
            ))}

            {/* CTA */}
            <Button
              variant={developer.available ? 'primary' : 'electric'}
              size="sm"
              className="w-full font-heading text-[14px]"
              disabled={!developer.available}
            >
              {developer.available ? 'REQUEST BID' : 'UNAVAILABLE'}
            </Button>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  )
}
