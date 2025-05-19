import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { FileQuestion } from "lucide-react"

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 rounded-lg border border-dashed",
        className,
      )}
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 mb-4">
        {icon || <FileQuestion className="h-10 w-10 text-gray-400" />}
      </div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      {description && <p className="text-sm text-gray-500 mb-4 max-w-md">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
