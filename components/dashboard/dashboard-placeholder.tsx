import { Skeleton } from "@/components/ui/skeleton"

export function DashboardPlaceholder() {
  return (
    <div className="space-y-6">
      {/* Stats cards placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-lg border p-4">
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        ))}
      </div>

      {/* Recent reports table placeholder */}
      <div className="rounded-lg border p-4">
        <Skeleton className="h-6 w-1/4 mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
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
      </div>

      {/* Map placeholder */}
      <div className="rounded-lg border p-4">
        <Skeleton className="h-6 w-1/4 mb-4" />
        <Skeleton className="h-64 w-full rounded-md" />
      </div>
    </div>
  )
}
