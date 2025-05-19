"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface ContentAwareSkeletonProps {
  content?: React.ReactNode
  className?: string
  width?: string | number
  height?: string | number
  preserveAspectRatio?: boolean
  rounded?: "none" | "sm" | "md" | "lg" | "full"
  isLoading?: boolean
  children?: React.ReactNode
}

export function ContentAwareSkeleton({
  content,
  className,
  width,
  height,
  preserveAspectRatio = true,
  rounded = "md",
  isLoading = true,
  children,
}: ContentAwareSkeletonProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [hasRendered, setHasRendered] = useState(false)

  // Measure content dimensions
  useEffect(() => {
    if (contentRef.current && !hasRendered) {
      const { offsetWidth, offsetHeight } = contentRef.current
      setDimensions({ width: offsetWidth, height: offsetHeight })
      setHasRendered(true)
    }
  }, [hasRendered, content, children])

  // Get rounded class based on prop
  const getRoundedClass = () => {
    switch (rounded) {
      case "none":
        return ""
      case "sm":
        return "rounded-sm"
      case "md":
        return "rounded-md"
      case "lg":
        return "rounded-lg"
      case "full":
        return "rounded-full"
      default:
        return "rounded-md"
    }
  }

  // Calculate style
  const getStyle = () => {
    const style: React.CSSProperties = {}

    if (width) {
      style.width = width
    } else if (dimensions.width > 0) {
      style.width = dimensions.width
    }

    if (height) {
      style.height = height
    } else if (dimensions.height > 0) {
      style.height = dimensions.height
    }

    if (preserveAspectRatio && dimensions.width > 0 && dimensions.height > 0) {
      style.aspectRatio = `${dimensions.width} / ${dimensions.height}`
    }

    return style
  }

  return (
    <>
      {isLoading ? <Skeleton className={cn(getRoundedClass(), className)} style={getStyle()} /> : children || content}

      {/* Hidden div to measure content */}
      {!hasRendered && (
        <div ref={contentRef} className="absolute opacity-0 pointer-events-none" aria-hidden="true">
          {children || content}
        </div>
      )}
    </>
  )
}
