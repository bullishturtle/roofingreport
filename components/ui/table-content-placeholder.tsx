"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface TableContentPlaceholderProps {
  className?: string
  headerHeight?: number | string
  rowHeight?: number | string
  columns?: number
  rows?: number
  cellWidths?: (string | number)[]
  isLoading?: boolean
  children?: React.ReactNode
}

export function TableContentPlaceholder({
  className,
  headerHeight = "3rem",
  rowHeight = "3rem",
  columns = 4,
  rows = 5,
  cellWidths,
  isLoading = true,
  children,
}: TableContentPlaceholderProps) {
  const tableRef = useRef<HTMLTableElement>(null)
  const [tableDimensions, setTableDimensions] = useState({
    width: 0,
    height: 0,
    columnWidths: [] as number[],
    rowHeights: [] as number[],
  })
  const [hasRendered, setHasRendered] = useState(false)

  // Analyze table structure
  useEffect(() => {
    if (tableRef.current && !hasRendered && children) {
      const table = tableRef.current

      // Get table dimensions
      const { offsetWidth, offsetHeight } = table

      // Get column widths
      const headerCells = table.querySelectorAll("thead th")
      const columnWidths = Array.from(headerCells).map((cell) => cell.getBoundingClientRect().width)

      // Get row heights
      const rows = table.querySelectorAll("tbody tr")
      const rowHeights = Array.from(rows).map((row) => row.getBoundingClientRect().height)

      setTableDimensions({
        width: offsetWidth,
        height: offsetHeight,
        columnWidths,
        rowHeights,
      })

      setHasRendered(true)
    }
  }, [children, hasRendered])

  // Get column width
  const getColumnWidth = (index: number) => {
    // If specific widths are provided, use them
    if (cellWidths && cellWidths[index]) {
      return cellWidths[index]
    }

    // If we have measured widths, use them
    if (tableDimensions.columnWidths[index]) {
      return tableDimensions.columnWidths[index]
    }

    // Otherwise, distribute evenly
    return `${100 / columns}%`
  }

  // Get row height
  const getRowHeight = (index: number) => {
    // If we have measured heights, use them
    if (tableDimensions.rowHeights[index]) {
      return tableDimensions.rowHeights[index]
    }

    // Otherwise, use default
    return rowHeight
  }

  return (
    <>
      {isLoading ? (
        <div className={cn("w-full overflow-hidden rounded-lg border", className)}>
          <div className="w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  {Array.from({ length: columns }).map((_, i) => (
                    <th key={`header-${i}`} className="px-4" style={{ height: headerHeight, width: getColumnWidth(i) }}>
                      <Skeleton className="h-4 w-full" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: rows }).map((_, rowIndex) => (
                  <tr
                    key={`row-${rowIndex}`}
                    className={rowIndex % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"}
                    style={{ height: getRowHeight(rowIndex) }}
                  >
                    {Array.from({ length: columns }).map((_, colIndex) => (
                      <td
                        key={`cell-${rowIndex}-${colIndex}`}
                        className="px-4"
                        style={{ width: getColumnWidth(colIndex) }}
                      >
                        <Skeleton className="h-4 w-full" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        children
      )}

      {/* Hidden table to analyze structure */}
      {!hasRendered && children && (
        <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
          <table ref={tableRef}>{children}</table>
        </div>
      )}
    </>
  )
}
