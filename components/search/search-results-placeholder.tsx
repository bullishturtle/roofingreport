import { Skeleton } from "@/components/ui/skeleton"

export function SearchResultsPlaceholder() {
  return (
    <div className="space-y-6 p-4">
      {/* Search header placeholder */}
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      {/* Search results placeholder */}
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-lg border p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <Skeleton className="h-32 w-full md:w-48 rounded-md" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="grid grid-cols-2 gap-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <div className="flex justify-end">
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination placeholder */}
      <div className="flex justify-center space-x-2">
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />
      </div>
    </div>
  )
}
