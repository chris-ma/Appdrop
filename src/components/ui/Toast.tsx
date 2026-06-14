'use client'
import { createContext, useContext, useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle } from 'lucide-react'

interface Toast {
  id: string
  type: 'success' | 'error'
  message: string
}

interface ToastContextValue {
  success: (message: string) => void
  error: (message: string) => void
}

const ToastContext = createContext<ToastContextValue>({
  success: () => {},
  error: () => {},
})

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
    const t = timers.current.get(id)
    if (t) clearTimeout(t)
    timers.current.delete(id)
  }, [])

  const addToast = useCallback(
    (type: Toast['type'], message: string) => {
      const id = Math.random().toString(36).slice(2)
      setToasts((prev) => [...prev.slice(-3), { id, type, message }])
      timers.current.set(id, setTimeout(() => dismiss(id), 3500))
    },
    [dismiss]
  )

  return (
    <ToastContext.Provider value={{ success: (m) => addToast('success', m), error: (m) => addToast('error', m) }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.9 }}
              transition={{ duration: 0.18 }}
              className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg border min-w-[260px] max-w-sm"
              style={{
                background: '#1A1A1A',
                borderColor: toast.type === 'success' ? 'rgba(0,255,136,0.3)' : 'rgba(255,59,48,0.3)',
                boxShadow: toast.type === 'success'
                  ? '0 0 24px rgba(0,255,136,0.08)'
                  : '0 0 24px rgba(255,59,48,0.08)',
              }}
            >
              {toast.type === 'success' ? (
                <CheckCircle size={15} style={{ color: '#00FF88', flexShrink: 0 }} />
              ) : (
                <AlertCircle size={15} style={{ color: '#FF3B30', flexShrink: 0 }} />
              )}
              <span className="text-ash text-sm font-inter flex-1">{toast.message}</span>
              <button
                onClick={() => dismiss(toast.id)}
                className="text-fog hover:text-white transition-colors cursor-pointer ml-1"
              >
                <X size={13} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}
