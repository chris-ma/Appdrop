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
        'inline-flex items-center gap-1.5 font-inter font-medium text-[10px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-sm',
        className
      )}
      style={{
        background: config.bg,
        color: config.text,
        border: `1px solid ${config.border}`,
      }}
    >
      {status === 'LIVE' && (
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: config.text, boxShadow: `0 0 4px ${config.text}` }}
        />
      )}
      {config.label}
    </span>
  )
}
