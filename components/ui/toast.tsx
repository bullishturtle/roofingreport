"use client"

import { useState, useCallback, createContext, useContext, type ReactNode, useEffect } from "react"
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from "lucide-react"

type ToastType = "success" | "error" | "warning" | "info"

interface ToastDetails {
  id: number
  type: ToastType
  message: string
}

interface ToastContextProps {
  toasts: ToastDetails[]
  showToast: (message: string, type?: ToastType) => void
  dismissToast: (id: number) => void
}

const ToastContext = createContext<ToastContextProps>({
  toasts: [],
  showToast: () => {},
  dismissToast: () => {},
})

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastDetails[]>([])
  const [nextId, setNextId] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const showToast = useCallback(
    (message: string, type: ToastType = "info") => {
      const id = nextId
      setToasts((prevToasts) => [...prevToasts, { id, type, message }])
      setNextId(id + 1)
    },
    [nextId],
  )

  const dismissToast = useCallback((id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

  // Auto-dismiss toasts after a certain duration
  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        dismissToast(toasts[0].id)
      }, 5000) // Dismiss after 5 seconds

      return () => clearTimeout(timer)
    }
  }, [toasts, dismissToast])

  const value = {
    toasts,
    showToast,
    dismissToast,
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      {mounted && (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
          {toasts.map((toast) => (
            <Toast key={toast.id} toast={toast} onDismiss={() => dismissToast(toast.id)} />
          ))}
        </div>
      )}
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

interface ToastProps {
  toast: ToastDetails
  onDismiss: () => void
}

const Toast = ({ toast, onDismiss }: ToastProps) => {
  const { type, message } = toast

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
  }

  const bgColors = {
    success: "bg-green-50 border-green-200",
    error: "bg-red-50 border-red-200",
    warning: "bg-amber-50 border-amber-200",
    info: "bg-blue-50 border-blue-200",
  }

  return (
    <div className={`w-72 p-4 rounded-lg border shadow-lg ${bgColors[type]} animate-fadeIn`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">{icons[type]}</div>
        <div className="flex-1 text-sm text-gray-700">{message}</div>
        <button
          onClick={onDismiss}
          className="flex-shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
