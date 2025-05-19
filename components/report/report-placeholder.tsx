import { Skeleton } from "@/components/ui/skeleton"

export function ReportPlaceholder() {
  return (
    <div className="space-y-6 p-4">
      {/* Header placeholder */}
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      {/* Property details placeholder */}
      <div className="rounded-lg border p-4">
        <div className="mb-4">
          <Skeleton className="h-6 w-1/3 mb-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
        </div>
      </div>

      {/* Roof condition placeholder */}
      <div className="rounded-lg border p-4">
        <div className="mb-4">
          <Skeleton className="h-6 w-1/3 mb-4" />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <Skeleton className="h-24" />
        </div>
      </div>

      {/* Roof measurements placeholder */}
      <div className="rounded-lg border p-4">
        <div className="mb-4">
          <Skeleton className="h-6 w-1/3 mb-4" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
        </div>
      </div>

      {/* Actions placeholder */}
      <div className="flex flex-wrap gap-3 justify-end">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  )
}
