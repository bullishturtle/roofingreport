"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { ImageIcon } from "lucide-react"

interface ImageContentPlaceholderProps {
  src?: string
  alt?: string
  width?: number | string
  height?: number | string
  className?: string
  isLoading?: boolean
  showIcon?: boolean
  preserveAspectRatio?: boolean
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down"
}

export function ImageContentPlaceholder({
  src,
  alt,
  width,
  height,
  className,
  isLoading = true,
  showIcon = true,
  preserveAspectRatio = true,
  objectFit = "cover",
}: ImageContentPlaceholderProps) {
  const imgRef = useRef<HTMLImageElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, aspectRatio: "1/1" })
  const [hasLoaded, setHasLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  // Load image in background to get dimensions
  useEffect(() => {
    if (src && !hasLoaded) {
      const img = new Image()
      img.onload = () => {
        setDimensions({
          width: img.width,
          height: img.height,
          aspectRatio: `${img.width}/${img.height}`,
        })
        setHasLoaded(true)
      }
      img.onerror = () => {
        setHasError(true)
      }
      img.src = src
    }
  }, [src, hasLoaded])

  // Calculate style for placeholder
  const getPlaceholderStyle = () => {
    const style: React.CSSProperties = {}

    if (width) {
      style.width = width
    }

    if (height) {
      style.height = height
    }

    if (preserveAspectRatio && dimensions.width > 0 && dimensions.height > 0) {
      style.aspectRatio = dimensions.aspectRatio
    }

    return style
  }

  return (
    <>
      {isLoading ? (
        <div className={cn("relative overflow-hidden", className)} style={getPlaceholderStyle()}>
          <Skeleton className="absolute inset-0 w-full h-full" />
          {showIcon && (
            <div className="absolute inset-0 flex items-center justify-center">
              <ImageIcon className="h-10 w-10 text-gray-400 opacity-50" />
            </div>
          )}
        </div>
      ) : hasError ? (
        <div
          className={cn("flex items-center justify-center bg-gray-100 dark:bg-gray-800", className)}
          style={getPlaceholderStyle()}
        >
          <ImageIcon className="h-10 w-10 text-gray-400" />
        </div>
      ) : (
        <img
          ref={imgRef}
          src={src || "/placeholder.svg"}
          alt={alt || ""}
          className={className}
          style={{
            width: width || "auto",
            height: height || "auto",
            objectFit,
          }}
        />
      )}
    </>
  )
}
