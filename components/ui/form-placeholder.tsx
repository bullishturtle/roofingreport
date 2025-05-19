import { Skeleton } from "@/components/ui/skeleton"

interface FormPlaceholderProps {
  fields?: number
  hasSubmitButton?: boolean
}

export function FormPlaceholder({ fields = 4, hasSubmitButton = true }: FormPlaceholderProps) {
  return (
    <div className="space-y-6">
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}

      {hasSubmitButton && (
        <div className="pt-2">
          <Skeleton className="h-10 w-32" />
        </div>
      )}
    </div>
  )
}
