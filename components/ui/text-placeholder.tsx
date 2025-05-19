"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { getSkeletonWidth } from "@/lib/placeholder-utils"

interface TextPlaceholderProps {
  text?: string
  lines?: number
  className?: string
  textClassName?: string
  width?: string | number
  isLoading?: boolean
  preserveStructure?: boolean
  children?: React.ReactNode
}

export function TextPlaceholder({
  text,
  lines = 1,
  className,
  textClassName,
  width,
  isLoading = true,
  preserveStructure = false,
  children,
}: TextPlaceholderProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentLines, setContentLines] = useState<string[]>([])
  const [hasRendered, setHasRendered] = useState(false)

  // Analyze content to determine line structure
  useEffect(() => {
    if (!hasRendered && contentRef.current) {
      // If children are provided, analyze their text content
      if (children) {
        const textContent = contentRef.current.textContent || ""
        const estimatedLines = Math.max(1, Math.ceil(textContent.length / 50))
        setContentLines(Array(estimatedLines).fill(""))
      }
      // If text is provided, split it into lines
      else if (text) {
        if (preserveStructure) {
          setContentLines(text.split("\n"))
        } else {
          const estimatedLines = Math.max(1, Math.ceil(text.length / 50))
          setContentLines(Array(estimatedLines).fill(""))
        }
      }
      // Otherwise use the specified number of lines
      else {
        setContentLines(Array(lines).fill(""))
      }

      setHasRendered(true)
    }
  }, [children, text, lines, preserveStructure, hasRendered])

  // Calculate width for each line
  const getLineWidth = (index: number, total: number) => {
    if (width) return width

    // For multi-line text, make the last line shorter
    if (total > 1) {
      if (index === total - 1) {
        return `${Math.max(30, Math.random() * 70)}%`
      }
    }

    // If we have actual text, base width on text length
    if (text && preserveStructure && contentLines[index]) {
      return getSkeletonWidth(contentLines[index], 30, 100)
    }

    return "100%"
  }

  return (
    <>
      {isLoading ? (
        <div className={cn("space-y-2", className)}>
          {contentLines.map((_, index) => (
            <Skeleton key={index} className="h-4" style={{ width: getLineWidth(index, contentLines.length) }} />
          ))}
        </div>
      ) : (
        <div className={cn(textClassName)}>{children || text}</div>
      )}

      {/* Hidden div to measure content */}
      {!hasRendered && (
        <div ref={contentRef} className="absolute opacity-0 pointer-events-none" aria-hidden="true">
          {children || text}
        </div>
      )}
    </>
  )
}
