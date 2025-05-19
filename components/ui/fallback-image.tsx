"use client"

import { useState } from "react"
import Image from "next/image"
import { ImagePlaceholder } from "./image-placeholder"

interface FallbackImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  fallbackText?: string
}

export function FallbackImage({
  src,
  alt,
  width,
  height,
  className,
  fallbackText = "Image not available",
}: FallbackImageProps) {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  const handleError = () => {
    setError(true)
    setLoading(false)
  }

  const handleLoad = () => {
    setLoading(false)
  }

  if (error) {
    return <ImagePlaceholder width={width} height={height} className={className} text={fallbackText} />
  }

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0">
          <ImagePlaceholder width="100%" height="100%" className={className} />
        </div>
      )}
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onError={handleError}
        onLoad={handleLoad}
      />
    </div>
  )
}
