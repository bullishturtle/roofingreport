"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type ToastType = "success" | "error" | "warning" | "info" | "default"

interface Toast {
  id: string
  title: string
  description?: string
  type: ToastType
}

interface ToastContextType {
  toasts: Toast[]
  showToast: (title: string, type?: ToastType, description?: string) => void
  dismissToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((title: string, type: ToastType = "default", description?: string) => {
    const id = Math.random().toString(36).substring(2, 9)

    setToasts((prev) => [...prev, { id, title, description, type }])

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 5000)

    // Log toast for debugging
    console.log(`🍞 Toast shown: ${type} - ${title}`)
  }, [])

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
      <div className="fixed bottom-0 right-0 z-50 flex flex-col items-end p-4 space-y-2 max-w-md">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn("flex w-full items-start rounded-lg p-4 shadow-lg transition-all duration-300 ease-in-out", {
              "bg-green-50 border border-green-200": toast.type === "success",
              "bg-red-50 border border-red-200": toast.type === "error",
              "bg-yellow-50 border border-yellow-200": toast.type === "warning",
              "bg-blue-50 border border-blue-200": toast.type === "info",
              "bg-gray-50 border border-gray-200": toast.type === "default",
            })}
          >
            <div className="mr-3 flex-shrink-0">
              {toast.type === "success" && <CheckCircle className="h-5 w-5 text-green-500" />}
              {toast.type === "error" && <AlertCircle className="h-5 w-5 text-red-500" />}
              {toast.type === "warning" && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
              {toast.type === "info" && <Info className="h-5 w-5 text-blue-500" />}
            </div>
            <div className="flex-1">
              <h3
                className={cn("font-medium", {
                  "text-green-800": toast.type === "success",
                  "text-red-800": toast.type === "error",
                  "text-yellow-800": toast.type === "warning",
                  "text-blue-800": toast.type === "info",
                  "text-gray-800": toast.type === "default",
                })}
              >
                {toast.title}
              </h3>
              {toast.description && (
                <p
                  className={cn("mt-1 text-sm", {
                    "text-green-700": toast.type === "success",
                    "text-red-700": toast.type === "error",
                    "text-yellow-700": toast.type === "warning",
                    "text-blue-700": toast.type === "info",
                    "text-gray-700": toast.type === "default",
                  })}
                >
                  {toast.description}
                </p>
              )}
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className={cn("ml-3 flex-shrink-0 rounded-full p-1 transition-colors", {
                "hover:bg-green-100 text-green-500": toast.type === "success",
                "hover:bg-red-100 text-red-500": toast.type === "error",
                "hover:bg-yellow-100 text-yellow-500": toast.type === "warning",
                "hover:bg-blue-100 text-blue-500": toast.type === "info",
                "hover:bg-gray-100 text-gray-500": toast.type === "default",
              })}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
