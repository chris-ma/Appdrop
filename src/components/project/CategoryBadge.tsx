import { cn } from '@/lib/utils'
import { CATEGORY_CONFIG } from '@/lib/constants'
import type { Category } from '@/lib/types'

interface CategoryBadgeProps {
  category: Category
  size?: 'sm' | 'md'
  className?: string
}

export default function CategoryBadge({ category, size = 'sm', className }: CategoryBadgeProps) {
  const config = CATEGORY_CONFIG[category]

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-grotesk font-semibold uppercase tracking-wider',
        size === 'sm' ? 'text-[10px] px-2.5 py-1' : 'text-xs px-3 py-1.5',
        className
      )}
      style={{
        background: config.bg,
        color: config.color,
        border: `1px solid ${config.color}30`,
      }}
    >
      {config.label}
    </span>
  )
}
