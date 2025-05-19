"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface SectionDimensions {
  height: number
  title: {
    height: number
    width: number
  }
  content: {
    type: "cards" | "table" | "text"
    items: number
    itemHeight: number
  }
}

interface DashboardContentPlaceholderProps {
  className?: string
  isLoading?: boolean
  children?: React.ReactNode
}

export function DashboardContentPlaceholder({
  className,
  isLoading = true,
  children,
}: DashboardContentPlaceholderProps) {
  const dashboardRef = useRef<HTMLDivElement>(null)
  const [dashboardStructure, setDashboardStructure] = useState<{
    header: { height: number; titleWidth: number; descWidth: number }
    sections: SectionDimensions[]
  } | null>(null)
  const [hasRendered, setHasRendered] = useState(false)

  // Analyze dashboard structure
  useEffect(() => {
    if (dashboardRef.current && !hasRendered && children) {
      const dashboard = dashboardRef.current

      // Analyze header
      const header = dashboard.querySelector("h1")?.parentElement
      const headerHeight = header?.getBoundingClientRect().height || 80
      const title = header?.querySelector("h1")
      const titleWidth = title?.getBoundingClientRect().width || 250
      const description = header?.querySelector("p")
      const descWidth = description?.getBoundingClientRect().width || 350

      // Analyze sections
      const sections = dashboard.querySelectorAll(".grid, .bg-white")
      const sectionDimensions: SectionDimensions[] = []

      sections.forEach((section) => {
        const sectionHeight = section.getBoundingClientRect().height

        // Analyze title
        const title = section.querySelector("h2")
        const titleHeight = title?.getBoundingClientRect().height || 24
        const titleWidth = title?.getBoundingClientRect().width || 200

        // Analyze content
        let contentType: "cards" | "table" | "text" = "text"
        let items = 1
        let itemHeight = 20

        if (section.classList.contains("grid")) {
          contentType = "cards"
          items = section.querySelectorAll(".bg-white").length || 3
          const firstItem = section.querySelector(".bg-white")
          itemHeight = firstItem?.getBoundingClientRect().height || 150
        } else if (section.querySelector("table")) {
          contentType = "table"
          items = section.querySelectorAll("tr").length || 5
          const firstItem = section.querySelector("tr")
          itemHeight = firstItem?.getBoundingClientRect().height || 40
        }

        sectionDimensions.push({
          height: sectionHeight,
          title: {
            height: titleHeight,
            width: titleWidth,
          },
          content: {
            type: contentType,
            items,
            itemHeight,
          },
        })
      })

      setDashboardStructure({
        header: {
          height: headerHeight,
          titleWidth,
          descWidth,
        },
        sections: sectionDimensions,
      })

      setHasRendered(true)
    }
  }, [children, hasRendered])

  // Render placeholder based on analyzed structure
  const renderPlaceholder = () => {
    if (!dashboardStructure) {
      // Default placeholder if no analysis available
      return (
        <div className="space-y-6">
          <div className="mb-8">
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                <Skeleton className="h-6 w-1/2 mb-4" />
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <Skeleton key={j} className="h-4 w-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <Skeleton className="h-6 w-1/4 mb-4" />
            <Skeleton className="h-4 w-3/4 mb-4" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      )
    }

    // Content-aware placeholder based on analysis
    return (
      <div className="space-y-6">
        <div className="mb-8" style={{ height: dashboardStructure.header.height }}>
          <Skeleton
            className="mb-2"
            style={{
              height: 32,
              width: dashboardStructure.header.titleWidth,
            }}
          />
          <Skeleton
            style={{
              height: 20,
              width: dashboardStructure.header.descWidth,
            }}
          />
        </div>

        {dashboardStructure.sections.map((section, sectionIndex) => {
          if (section.content.type === "cards") {
            return (
              <div key={sectionIndex} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {Array.from({ length: section.content.items }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white p-6 rounded-lg shadow-md"
                    style={{ height: section.content.itemHeight }}
                  >
                    <Skeleton className="h-6 w-1/2 mb-4" />
                    <div className="space-y-3">
                      {Array.from({ length: 3 }).map((_, j) => (
                        <Skeleton key={j} className="h-4 w-full" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )
          } else {
            return (
              <div key={sectionIndex} className="bg-white p-6 rounded-lg shadow-md" style={{ height: section.height }}>
                <Skeleton
                  className="mb-4"
                  style={{
                    height: section.title.height,
                    width: section.title.width,
                  }}
                />

                {section.content.type === "table" ? (
                  <div className="space-y-3">
                    {Array.from({ length: section.content.items }).map((_, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-40" />
                            <Skeleton className="h-3 w-24" />
                          </div>
                        </div>
                        <Skeleton className="h-8 w-20" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Skeleton
                        key={i}
                        className="w-full"
                        style={{
                          height: section.content.itemHeight,
                          width: `${i === 2 ? 75 : 100}%`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )
          }
        })}
      </div>
    )
  }

  return (
    <>
      {isLoading ? <div className={cn("container mx-auto px-4", className)}>{renderPlaceholder()}</div> : children}

      {/* Hidden div to analyze structure */}
      {!hasRendered && children && (
        <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
          <div ref={dashboardRef}>{children}</div>
        </div>
      )}
    </>
  )
}
