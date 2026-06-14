'use client'
import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import type { User } from '@supabase/supabase-js'
import type { UserProfile } from './types'
import { signInWithGithub, signOut as apiSignOut, getCurrentUser } from './api'
import { getSupabase } from './supabase'

const USE_MOCK = !process.env.NEXT_PUBLIC_SUPABASE_URL

interface AuthContextValue {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  profile: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(!USE_MOCK)

  useEffect(() => {
    if (USE_MOCK) return

    const supabase = getSupabase()

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) getCurrentUser().then(setProfile)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        getCurrentUser().then(setProfile)
      } else {
        setProfile(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = useCallback(async () => {
    await signInWithGithub()
  }, [])

  const signOut = useCallback(async () => {
    await apiSignOut()
    setUser(null)
    setProfile(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, profile, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
