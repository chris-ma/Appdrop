'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight, LogOut } from 'lucide-react'
import Button from '@/components/ui/Button'
import MagneticButton from '@/components/ui/MagneticButton'
import { useAuth } from '@/lib/auth-context'

const navLinks = [
  { label: 'MARKET', href: '/marketplace' },
  { label: 'BUILDERS', href: '/developers' },
  { label: 'PROFILE', href: '/profile' },
]

const ADMIN_EMAIL = 'crispy-studios@hotmail.com'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, profile, loading, signIn, signOut } = useAuth()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`pointer-events-auto w-full max-w-5xl transition-all duration-500 ${
            scrolled
              ? 'glass-frosted rounded-xl border border-white/12 shadow-glass'
              : 'rounded-xl'
          }`}
        >
          <div className="h-14 flex items-center justify-between px-5">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1 group">
              <span className="font-heading text-2xl tracking-wide text-white leading-none">
                APP
                <span className="text-electric">▼</span>
                DROP
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[11px] font-inter font-medium text-fog hover:text-white uppercase tracking-[0.15em] transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-electric group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
              {user?.email === ADMIN_EMAIL && (
                <Link
                  href="/admin"
                  className="text-[11px] font-inter font-medium text-electric hover:text-white uppercase tracking-[0.15em] transition-colors duration-200 relative group"
                >
                  ADMIN
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-electric group-hover:w-full transition-all duration-300" />
                </Link>
              )}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              {/* Auth */}
              {loading ? (
                <div className="w-8 h-8 rounded bg-white/5 animate-pulse" />
              ) : user ? (
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-2 px-3 py-1.5 rounded border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                  title="Sign out"
                >
                  <div
                    className="w-6 h-6 rounded flex items-center justify-center font-heading text-sm"
                    style={{
                      background: `${profile?.avatarColor ?? '#00D4FF'}15`,
                      color: profile?.avatarColor ?? '#00D4FF',
                      border: `1px solid ${profile?.avatarColor ?? '#00D4FF'}30`,
                    }}
                  >
                    {profile?.initials ?? (user.email?.charAt(0).toUpperCase() ?? 'U')}
                  </div>
                  <LogOut size={13} className="text-fog group-hover:text-white transition-colors" />
                </button>
              ) : (
                <button
                  onClick={() => signIn()}
                  className="text-[11px] font-inter font-medium uppercase tracking-[0.15em] text-fog hover:text-white transition-colors cursor-pointer px-3 py-1.5"
                >
                  SIGN IN
                </button>
              )}
              <MagneticButton>
                <Link href="/submit">
                  <Button variant="primary" size="sm" className="font-heading text-[12px]">
                    VALIDATE AN IDEA
                    <ArrowUpRight size={13} />
                  </Button>
                </Link>
              </MagneticButton>
            </div>

            {/* Mobile */}
            <button
              className="md:hidden text-fog hover:text-white p-1 transition-colors cursor-pointer"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-4 right-4 z-40 glass-frosted rounded-xl border border-white/12 px-6 py-6 flex flex-col gap-5 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-heading text-xl text-ash hover:text-white tracking-wider transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-white/12 flex flex-col gap-3">
              {user ? (
                <button
                  onClick={() => { signOut(); setMobileOpen(false) }}
                  className="flex items-center gap-3 font-heading text-xl text-ash hover:text-white tracking-wider transition-colors cursor-pointer"
                >
                  <div
                    className="w-7 h-7 rounded flex items-center justify-center font-heading text-sm"
                    style={{ background: `${profile?.avatarColor ?? '#00D4FF'}15`, color: profile?.avatarColor ?? '#00D4FF', border: `1px solid ${profile?.avatarColor ?? '#00D4FF'}30` }}
                  >
                    {profile?.initials ?? (user.email?.charAt(0).toUpperCase() ?? 'U')}
                  </div>
                  SIGN OUT
                </button>
              ) : (
                <button
                  onClick={() => { signIn(); setMobileOpen(false) }}
                  className="font-heading text-xl text-electric hover:text-white tracking-wider transition-colors cursor-pointer text-left"
                >
                  SIGN IN
                </button>
              )}
              <Link href="/submit" onClick={() => setMobileOpen(false)}>
                <Button variant="primary" size="md" className="w-full font-heading">
                  VALIDATE AN IDEA
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
