'use client'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import MagneticButton from '@/components/ui/MagneticButton'

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
})

const textVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { delay: i * 0.15 + 0.3, duration: 0.8 },
  }),
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-void">
      {/* Technical grid */}
      <div className="absolute inset-0 grid-technical opacity-100" />

      {/* 3D Scene — full bg */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Vignette — lightened so 3D scene shows through */}
      <div className="absolute inset-0 bg-gradient-to-r from-void/95 via-void/55 to-transparent z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-void/20 z-[1]" />

      {/* Noise */}
      <div
        className="absolute inset-0 z-[1]"
        style={{ backgroundImage: "url('/noise.svg')", opacity: 0.02 }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16 w-full">
        <div className="max-w-3xl">
          {/* Label */}
          <motion.div
            custom={0}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-1 h-4 bg-electric" />
            <span className="text-[11px] font-inter font-medium tracking-[0.25em] text-silver uppercase">
              VALIDATE BEFORE YOU BUILD
            </span>
          </motion.div>

          {/* Main headline */}
          <div className="overflow-hidden mb-2">
            <motion.h1
              custom={1}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="font-heading text-[clamp(72px,12vw,160px)] leading-[0.88] uppercase electric-text"
            >
              VALIDATE
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-2">
            <motion.h1
              custom={2}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="font-heading text-[clamp(72px,12vw,160px)] leading-[0.88] text-white uppercase"
            >
              THE
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1
              custom={3}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="font-heading text-[clamp(72px,12vw,160px)] leading-[0.88] text-white uppercase"
            >
              MARKET
            </motion.h1>
          </div>

          {/* Sub */}
          <motion.p
            custom={4}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-silver text-base font-inter max-w-md leading-relaxed mb-10"
          >
            Post your app idea. Collect real demand signals from potential users.
            Know if it&apos;s worth building before you write a single line of code.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={5}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <MagneticButton>
              <Link href="/submit">
                <Button variant="primary" size="lg" className="font-heading text-[16px]">
                  VALIDATE AN IDEA
                  <ArrowUpRight size={18} />
                </Button>
              </Link>
            </MagneticButton>

            <MagneticButton>
              <Link href="/marketplace">
                <Button variant="electric" size="lg" className="font-heading text-[16px]">
                  SEE WHAT&apos;S TRENDING
                  <ArrowRight size={18} />
                </Button>
              </Link>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-6 flex items-center gap-3 opacity-70"
        >
          <div className="flex flex-col gap-1">
            <div className="w-4 h-px bg-white/20" />
            <div className="w-6 h-px bg-electric" />
            <div className="w-3 h-px bg-white/20" />
          </div>
          <span className="text-[10px] font-inter tracking-[0.2em] text-fog uppercase">
            SCROLL TO EXPLORE
          </span>
        </motion.div>
      </div>
    </section>
  )
}
