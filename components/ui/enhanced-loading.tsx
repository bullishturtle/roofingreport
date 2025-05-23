"use client"

import { useState, useEffect } from "react"
import { Loader2, Zap } from "lucide-react"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  variant?: "default" | "pulse" | "bounce" | "spin"
  text?: string
  className?: string
}

export function EnhancedLoadingSpinner({
  size = "md",
  variant = "default",
  text,
  className = "",
}: LoadingSpinnerProps) {
  const [dots, setDots] = useState("")

  useEffect(() => {
    if (!text) return

    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."))
    }, 500)

    return () => clearInterval(interval)
  }, [text])

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }

  const variants = {
    default: "animate-spin",
    pulse: "animate-pulse",
    bounce: "animate-bounce",
    spin: "animate-spin",
  }

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      <Loader2 className={`${sizeClasses[size]} ${variants[variant]} text-blue-600`} />
      {text && (
        <span className="text-sm text-gray-600">
          {text}
          {dots}
        </span>
      )}
    </div>
  )
}

export function SkeletonLoader({ className = "", lines = 3 }: { className?: string; lines?: number }) {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className={`h-4 bg-gray-200 rounded mb-2 ${i === lines - 1 ? "w-3/4" : "w-full"}`} />
      ))}
    </div>
  )
}

export function PageTransitionLoader() {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600 mb-4"></div>
          <Zap className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-blue-600" />
        </div>
        <p className="text-gray-600 font-medium">Loading...</p>
      </div>
    </div>
  )
}
