'use client'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Zap } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function CtaBanner() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-24 px-6" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden"
      >
        {/* Gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.3) 0%, rgba(6,182,212,0.2) 50%, rgba(236,72,153,0.25) 100%)',
          }}
        />
        <div className="absolute inset-0 glass" />

        {/* Animated orb */}
        <div
          className="absolute -right-20 -top-20 w-64 h-64 rounded-full animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(124,58,237,0.3), transparent)',
            filter: 'blur(40px)',
          }}
        />

        <div
          className="absolute -left-10 -bottom-10 w-48 h-48 rounded-full animate-float-slow"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.25), transparent)',
            filter: 'blur(40px)',
          }}
        />

        <div className="relative z-10 text-center px-8 py-16">
          <div className="inline-flex items-center gap-2 text-brand-cyan text-[11px] font-grotesk font-bold uppercase tracking-widest mb-4">
            <Zap size={12} />
            READY TO DROP?
          </div>
          <h2 className="font-grotesk font-extrabold text-4xl md:text-6xl uppercase text-white leading-tight tracking-tight mb-4">
            YOUR IDEA COULD BE{' '}
            <span className="gradient-text">NEXT</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto mb-10">
            Join 28,000+ community members shaping the future of software.
            Submit your idea today — it costs nothing but 5 minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/submit">
              <Button variant="primary" size="lg">
                SUBMIT YOUR DROP
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/marketplace">
              <Button variant="neon" size="lg">
                BROWSE THE DROPS
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
