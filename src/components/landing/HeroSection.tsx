'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'
import Button from '@/components/ui/Button'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-60" />

      {/* Animated gradient orbs */}
      <div
        className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full animate-float"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
          willChange: 'transform',
        }}
      />
      <div
        className="absolute top-1/4 -right-40 w-[600px] h-[600px] rounded-full animate-float-slow"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)',
          filter: 'blur(80px)',
          willChange: 'transform',
        }}
      />
      <div
        className="absolute -bottom-20 left-1/3 w-[500px] h-[500px] rounded-full animate-float-slower"
        style={{
          background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)',
          filter: 'blur(80px)',
          willChange: 'transform',
        }}
      />

      {/* Noise */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/noise.svg')",
          opacity: 0.03,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 glass border border-brand-purple/30 rounded-full px-4 py-2 text-xs font-grotesk font-semibold uppercase tracking-widest text-brand-purple">
              <span className="w-1.5 h-1.5 bg-brand-purple rounded-full animate-pulse" />
              THE DROP IS LIVE
              <ArrowRight size={12} />
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-grotesk font-extrabold text-5xl sm:text-7xl md:text-8xl uppercase leading-[0.9] tracking-tight mb-6"
          >
            <span className="gradient-text">BUILD WHAT</span>
            <br />
            <span className="text-white">THE WORLD</span>
            <br />
            <span className="gradient-text">ACTUALLY WANTS</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl mx-auto text-white/50 text-lg md:text-xl leading-relaxed mb-10"
          >
            Submit an app idea, rally the community, fund the build.
            Developers ship what the crowd demands — and everyone wins.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link href="/marketplace">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                EXPLORE DROPS
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/submit">
              <Button variant="neon" size="lg" className="w-full sm:w-auto">
                <Zap size={18} />
                SUBMIT YOUR IDEA
              </Button>
            </Link>
          </motion.div>

          {/* Floating stat chips */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {[
              { value: '28K+', label: 'Community Members' },
              { value: '4.8K+', label: 'Ideas Submitted' },
              { value: '$1.2M+', label: 'Total Funded' },
              { value: '143', label: 'Apps Shipped' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass border border-white/10 rounded-full px-4 py-2 flex items-center gap-2"
              >
                <span className="font-grotesk font-bold text-white text-sm">{stat.value}</span>
                <span className="text-white/40 text-xs">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
    </section>
  )
}
