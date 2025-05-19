"use client"

import { useEffect, useState, useRef } from "react"

// Function to get content dimensions from DOM element
export function useContentDimensions<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (ref.current) {
      const observer = new ResizeObserver((entries) => {
        const { width, height } = entries[0].contentRect
        setDimensions({ width, height })
      })

      observer.observe(ref.current)

      return () => {
        observer.disconnect()
      }
    }
  }, [])

  return { ref, dimensions }
}

// Function to generate placeholder text that matches original content length
export function generatePlaceholderText(originalText: string, preserveStructure = false): string {
  if (!originalText) return ""

  if (preserveStructure) {
    // Preserve paragraph and sentence structure
    return originalText
      .split("\n")
      .map((paragraph) =>
        paragraph
          .split(".")
          .map((sentence) => sentence.replace(/[a-zA-Z]+/g, (word) => "█".repeat(word.length)))
          .join("."),
      )
      .join("\n")
  }

  // Simple replacement
  return "█".repeat(originalText.length)
}

// Function to calculate aspect ratio
export function calculateAspectRatio(width: number, height: number): string {
  if (!width || !height) return "1/1"

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b)
  }

  const divisor = gcd(width, height)
  return `${width / divisor}/${height / divisor}`
}

// Function to generate skeleton width based on text length
export function getSkeletonWidth(text: string, minWidth = 20, maxWidth = 100): string {
  if (!text) return `${minWidth}%`

  const length = text.length
  const percentage = Math.min(maxWidth, Math.max(minWidth, length * 2))

  return `${percentage}%`
}
