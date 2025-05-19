"use client"

import React from "react"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from "lucide-react"

export type ToastType = "success" | "error" | "warning" | "info"

export interface Toast {
  id: string
  message: string
  type: ToastType
  duration?: number
}

interface ToastProviderProps {
  children: React.ReactNode
}

interface ToastContextType {
  showToast: (message: string, type: ToastType, duration?: number) => void
  hideToast: (id: string) => void
}

// Create context
const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

// Create a hook to use the toast context
export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  const showToast = (message: string, type: ToastType, duration = 5000) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = { id, message, type, duration }
    setToasts((prev) => [...prev, newToast])

    if (duration !== Number.POSITIVE_INFINITY) {
      setTimeout(() => {
        hideToast(id)
      }, duration)
    }
  }

  const hideToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const value = { showToast, hideToast }

  if (!isMounted) {
    return <>{children}</>
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      {isMounted &&
        createPortal(
          <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
            <AnimatePresence>
              {toasts.map((toast) => (
                <Toast key={toast.id} toast={toast} onClose={() => hideToast(toast.id)} />
              ))}
            </AnimatePresence>
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  )
}

interface ToastProps {
  toast: Toast
  onClose: () => void
}

function Toast({ toast, onClose }: ToastProps) {
  const { id, message, type } = toast

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
  }

  const bgColors = {
    success: "bg-green-500/10 border-green-500/30",
    error: "bg-red-500/10 border-red-500/30",
    warning: "bg-amber-500/10 border-amber-500/30",
    info: "bg-blue-500/10 border-blue-500/30",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.8 }}
      className={`w-72 p-4 rounded-lg border backdrop-blur-md shadow-lg ${bgColors[type]}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">{icons[type]}</div>
        <div className="flex-1 text-sm text-white">{message}</div>
        <button
          onClick={onClose}
          className="flex-shrink-0 rounded-full p-1 text-white/70 hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  )
}
