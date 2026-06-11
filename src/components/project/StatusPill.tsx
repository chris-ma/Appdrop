import { cn } from '@/lib/utils'
import { STATUS_CONFIG } from '@/lib/constants'
import type { ProjectStatus } from '@/lib/types'

interface StatusPillProps {
  status: ProjectStatus
  className?: string
}

export default function StatusPill({ status, className }: StatusPillProps) {
  const config = STATUS_CONFIG[status]

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-grotesk font-bold text-[10px] uppercase tracking-wider px-2.5 py-1',
        className
      )}
      style={{
        background: config.bg,
        color: config.text,
        border: `1px solid ${config.border}50`,
      }}
    >
      {status === 'LIVE' && (
        <span
          className="w-1.5 h-1.5 rounded-full animate-pulse-glow"
          style={{ background: config.text }}
        />
      )}
      {config.label.replace('● ', '')}
    </span>
  )
}
