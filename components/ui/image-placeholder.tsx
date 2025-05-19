import { cn } from "@/lib/utils"
import { ImageIcon } from "lucide-react"

interface ImagePlaceholderProps {
  width?: number | string
  height?: number | string
  className?: string
  iconClassName?: string
  text?: string
}

export function ImagePlaceholder({
  width = "100%",
  height = "100%",
  className,
  iconClassName,
  text,
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md", className)}
      style={{ width, height }}
      aria-hidden="true"
    >
      <ImageIcon className={cn("h-10 w-10 text-gray-400", iconClassName)} />
      {text && <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{text}</p>}
    </div>
  )
}
