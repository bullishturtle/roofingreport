"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface CardContentPlaceholderProps {
  className?: string
  headerHeight?: number | string
  contentLines?: number
  footerHeight?: number | string
  hasImage?: boolean
  imagePosition?: "top" | "left" | "right"
  imageHeight?: number | string
  imageWidth?: number | string
  isLoading?: boolean
  children?: React.ReactNode
}

export function CardContentPlaceholder({
  className,
  headerHeight = "2rem",
  contentLines = 3,
  footerHeight = "2rem",
  hasImage = false,
  imagePosition = "top",
  imageHeight = "12rem",
  imageWidth = "100%",
  isLoading = true,
  children,
}: CardContentPlaceholderProps) {
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
  }, [hasRendered, children])

  // Render image placeholder based on position
  const renderImagePlaceholder = () => {
    if (!hasImage) return null

    return (
      <Skeleton
        className={cn(
          imagePosition === "top" && "w-full",
          (imagePosition === "left" || imagePosition === "right") && "h-full",
        )}
        style={{
          height: imagePosition === "top" ? imageHeight : "100%",
          width: imagePosition !== "top" ? imageWidth : "100%",
        }}
      />
    )
  }

  // Render content skeleton
  const renderContentSkeleton = () => {
    return (
      <div className="space-y-4 p-4">
        <Skeleton style={{ height: headerHeight, width: "70%" }} />

        <div className="space-y-2">
          {Array.from({ length: contentLines }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-4"
              style={{
                width: `${index === contentLines - 1 ? 80 : 100}%`,
              }}
            />
          ))}
        </div>

        {footerHeight && <Skeleton style={{ height: footerHeight, width: "40%" }} />}
      </div>
    )
  }

  return (
    <>
      {isLoading ? (
        <div
          className={cn(
            "overflow-hidden rounded-lg border",
            imagePosition === "left" && "flex",
            imagePosition === "right" && "flex flex-row-reverse",
            className,
          )}
          style={dimensions.height ? { height: dimensions.height } : {}}
        >
          {imagePosition === "top" && renderImagePlaceholder()}

          <div className={cn("flex-1", (imagePosition === "left" || imagePosition === "right") && "flex-1")}>
            {renderContentSkeleton()}
          </div>

          {(imagePosition === "left" || imagePosition === "right") && (
            <div className="w-1/3">{renderImagePlaceholder()}</div>
          )}
        </div>
      ) : (
        children
      )}

      {/* Hidden div to measure content */}
      {!hasRendered && (
        <div ref={contentRef} className="absolute opacity-0 pointer-events-none" aria-hidden="true">
          {children}
        </div>
      )}
    </>
  )
}
