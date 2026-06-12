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
        'inline-flex items-center font-inter font-medium uppercase tracking-[0.18em]',
        size === 'sm' ? 'text-[10px] px-2.5 py-1' : 'text-[11px] px-3 py-1.5',
        className
      )}
      style={{ color: config.color }}
    >
      {config.label}
    </span>
  )
}
