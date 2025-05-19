import { Skeleton } from "@/components/ui/skeleton"

interface TablePlaceholderProps {
  rows?: number
  columns?: number
  hasHeader?: boolean
}

export function TablePlaceholder({ rows = 5, columns = 4, hasHeader = true }: TablePlaceholderProps) {
  return (
    <div className="w-full overflow-hidden rounded-lg border">
      <div className="w-full overflow-x-auto">
        <table className="w-full table-auto">
          {hasHeader && (
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                {Array.from({ length: columns }).map((_, i) => (
                  <th key={`header-${i}`} className="px-4 py-3">
                    <Skeleton className="h-4 w-20" />
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr
                key={`row-${rowIndex}`}
                className={rowIndex % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"}
              >
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <td key={`cell-${rowIndex}-${colIndex}`} className="px-4 py-3">
                    <Skeleton className={`h-4 w-${Math.floor(Math.random() * 16) + 12}`} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
