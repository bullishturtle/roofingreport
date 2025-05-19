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
    type: "list" | "grid" | "text"
    items: number
    itemHeight: number
  }
}

interface ReportContentPlaceholderProps {
  className?: string
  isLoading?: boolean
  children?: React.ReactNode
}

export function ReportContentPlaceholder({ className, isLoading = true, children }: ReportContentPlaceholderProps) {
  const reportRef = useRef<HTMLDivElement>(null)
  const [reportStructure, setReportStructure] = useState<{
    header: { height: number }
    sections: SectionDimensions[]
    actions: { height: number; count: number }
  } | null>(null)
  const [hasRendered, setHasRendered] = useState(false)

  // Analyze report structure
  useEffect(() => {
    if (reportRef.current && !hasRendered && children) {
      const report = reportRef.current

      // Analyze header
      const header = report.querySelector('[class*="bg-blue-900"]')
      const headerHeight = header?.getBoundingClientRect().height || 120

      // Analyze sections
      const sections = report.querySelectorAll('[class*="mb-8"]')
      const sectionDimensions: SectionDimensions[] = []

      sections.forEach((section) => {
        const sectionHeight = section.getBoundingClientRect().height

        // Analyze title
        const title = section.querySelector("h2")
        const titleHeight = title?.getBoundingClientRect().height || 24
        const titleWidth = title?.getBoundingClientRect().width || 200

        // Analyze content
        let contentType: "list" | "grid" | "text" = "text"
        let items = 1
        let itemHeight = 20

        if (section.querySelector("ul")) {
          contentType = "list"
          items = section.querySelectorAll("li").length || 3
          const firstItem = section.querySelector("li")
          itemHeight = firstItem?.getBoundingClientRect().height || 24
        } else if (section.querySelector('[class*="grid"]')) {
          contentType = "grid"
          items = section.querySelectorAll('[class*="grid"] > div').length || 3
          const firstItem = section.querySelector('[class*="grid"] > div')
          itemHeight = firstItem?.getBoundingClientRect().height || 100
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

      // Analyze actions
      const actions = report.querySelector('[class*="flex flex-wrap gap-4"]')
      const actionButtons = actions?.querySelectorAll("button")

      setReportStructure({
        header: { height: headerHeight },
        sections: sectionDimensions,
        actions: {
          height: actionButtons?.[0]?.getBoundingClientRect().height || 40,
          count: actionButtons?.length || 3,
        },
      })

      setHasRendered(true)
    }
  }, [children, hasRendered])

  // Render placeholder based on analyzed structure
  const renderPlaceholder = () => {
    if (!reportStructure) {
      // Default placeholder if no analysis available
      return (
        <div className="space-y-6 p-4">
          <div className="bg-blue-900 p-6 rounded-t-lg">
            <Skeleton className="h-8 w-3/4 bg-blue-800" />
            <Skeleton className="h-6 w-1/2 mt-2 bg-blue-800" />
            <Skeleton className="h-4 w-1/3 mt-2 bg-blue-800" />
          </div>

          {Array.from({ length: 3 }).map((_, sectionIndex) => (
            <div key={sectionIndex} className="mb-8">
              <Skeleton className="h-6 w-1/3 mb-4" />

              {sectionIndex === 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex justify-between">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-4 w-1/3" />
                    </div>
                  ))}
                </div>
              ) : sectionIndex === 1 ? (
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center">
                      <Skeleton className="h-2 w-2 rounded-full mr-2" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-48 w-full" />
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="flex flex-wrap gap-4 justify-end">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-32" />
            ))}
          </div>
        </div>
      )
    }

    // Content-aware placeholder based on analysis
    return (
      <div className="space-y-6 p-4">
        <div className="bg-blue-900 p-6 rounded-t-lg" style={{ height: reportStructure.header.height }}>
          <Skeleton className="h-8 w-3/4 bg-blue-800" />
          <Skeleton className="h-6 w-1/2 mt-2 bg-blue-800" />
          <Skeleton className="h-4 w-1/3 mt-2 bg-blue-800" />
        </div>

        {reportStructure.sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-8" style={{ height: section.height }}>
            <Skeleton
              className="mb-4"
              style={{
                height: section.title.height,
                width: section.title.width,
              }}
            />

            {section.content.type === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Array.from({ length: section.content.items }).map((_, i) => (
                  <Skeleton key={i} style={{ height: section.content.itemHeight }} />
                ))}
              </div>
            ) : section.content.type === "list" ? (
              <div className="space-y-2">
                {Array.from({ length: section.content.items }).map((_, i) => (
                  <div key={i} className="flex items-center">
                    <Skeleton className="h-2 w-2 rounded-full mr-2" />
                    <Skeleton style={{ height: section.content.itemHeight }} className="w-full" />
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
        ))}

        <div className="flex flex-wrap gap-4 justify-end">
          {Array.from({ length: reportStructure.actions.count }).map((_, i) => (
            <Skeleton
              key={i}
              style={{
                height: reportStructure.actions.height,
                width: 120,
              }}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      {isLoading ? (
        <div className={cn("bg-white rounded-lg shadow-md overflow-hidden", className)}>{renderPlaceholder()}</div>
      ) : (
        children
      )}

      {/* Hidden div to analyze structure */}
      {!hasRendered && children && (
        <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
          <div ref={reportRef}>{children}</div>
        </div>
      )}
    </>
  )
}
