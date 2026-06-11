'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { formatCount } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface VoteButtonProps {
  upvotes: number
  downvotes?: number
  size?: 'sm' | 'md' | 'lg'
  layout?: 'horizontal' | 'vertical'
  className?: string
}

export default function VoteButton({
  upvotes: initialUpvotes,
  downvotes: initialDownvotes = 0,
  size = 'md',
  layout = 'horizontal',
  className,
}: VoteButtonProps) {
  const [upvotes, setUpvotes] = useState(initialUpvotes)
  const [downvotes, setDownvotes] = useState(initialDownvotes)
  const [voted, setVoted] = useState<'up' | 'down' | null>(null)

  const handleUpvote = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (voted === 'up') {
      setUpvotes((v) => v - 1)
      setVoted(null)
    } else {
      if (voted === 'down') setDownvotes((v) => v - 1)
      setUpvotes((v) => v + 1)
      setVoted('up')
    }
  }

  const handleDownvote = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (voted === 'down') {
      setDownvotes((v) => v - 1)
      setVoted(null)
    } else {
      if (voted === 'up') setUpvotes((v) => v - 1)
      setDownvotes((v) => v + 1)
      setVoted('down')
    }
  }

  const iconSize = size === 'sm' ? 14 : size === 'lg' ? 20 : 16

  return (
    <div
      className={cn(
        'flex items-center gap-1',
        layout === 'vertical' && 'flex-col',
        className
      )}
    >
      <motion.button
        whileTap={{ scale: 0.85 }}
        whileHover={{ scale: 1.05 }}
        onClick={handleUpvote}
        className={cn(
          'flex items-center gap-1.5 rounded-lg transition-all duration-200 font-grotesk font-bold',
          size === 'sm' && 'text-xs px-2 py-1',
          size === 'md' && 'text-sm px-3 py-1.5',
          size === 'lg' && 'text-base px-4 py-2',
          voted === 'up'
            ? 'bg-brand-purple text-white border border-brand-purple/50 shadow-glow-purple'
            : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white hover:border-brand-purple/40'
        )}
      >
        <ChevronUp size={iconSize} strokeWidth={2.5} />
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={upvotes}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {formatCount(upvotes)}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {layout === 'horizontal' && (
        <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.05 }}
          onClick={handleDownvote}
          className={cn(
            'flex items-center gap-1 rounded-lg transition-all duration-200',
            size === 'sm' && 'text-xs px-2 py-1',
            size === 'md' && 'text-sm px-2 py-1.5',
            size === 'lg' && 'text-base px-3 py-2',
            voted === 'down'
              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
              : 'text-white/30 hover:text-white/60 border border-transparent hover:border-white/10'
          )}
        >
          <ChevronDown size={iconSize - 2} strokeWidth={2} />
        </motion.button>
      )}
    </div>
  )
}
