'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp } from 'lucide-react'
import { formatCount, cn } from '@/lib/utils'
import { useAuth } from '@/lib/auth-context'
import { voteOnProject, getUserVote } from '@/lib/api'

interface VoteButtonProps {
  upvotes: number
  downvotes?: number
  ideaId?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function VoteButton({
  upvotes: initialUpvotes,
  ideaId,
  size = 'md',
  className,
}: VoteButtonProps) {
  const [count, setCount] = useState(initialUpvotes)
  const [voted, setVoted] = useState(false)
  const { user, signIn } = useAuth()

  useEffect(() => {
    if (!ideaId || !user) return
    getUserVote(ideaId).then((v) => {
      if (v === 'up') setVoted(true)
    })
  }, [ideaId, user])

  const handleVote = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (ideaId && !user) {
      await signIn()
      return
    }

    const next = !voted
    setVoted(next)
    setCount((v) => v + (next ? 1 : -1))

    if (ideaId) {
      try {
        await voteOnProject(ideaId, next ? 'up' : null)
      } catch {
        // revert optimistic update
        setVoted(voted)
        setCount(initialUpvotes)
      }
    }
  }

  const iconSize = size === 'sm' ? 13 : size === 'lg' ? 18 : 15

  return (
    <motion.button
      whileTap={{ scale: 0.88 }}
      onClick={handleVote}
      className={cn(
        'flex items-center gap-1.5 font-inter font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer rounded-sm',
        size === 'sm' && 'text-[11px] px-2.5 py-1.5',
        size === 'md' && 'text-[13px] px-3 py-2',
        size === 'lg' && 'text-base px-4 py-2.5',
        voted
          ? 'text-electric border border-electric/40 bg-electric/8 shadow-electric'
          : 'text-fog border border-white/12 hover:border-white/20 hover:text-ash bg-white/[0.02]',
        className
      )}
    >
      <ChevronUp size={iconSize} strokeWidth={2.5} />
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={count}
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 12, opacity: 0 }}
          transition={{ duration: 0.12 }}
        >
          {formatCount(count)}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}
