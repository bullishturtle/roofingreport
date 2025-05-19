import type React from "react"
import { cn } from "@/lib/utils"

interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
  fluid?: boolean
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "none"
  padding?: "none" | "sm" | "md" | "lg"
  centerContent?: boolean
}

export function ResponsiveContainer({
  children,
  className,
  as: Component = "div",
  fluid = false,
  maxWidth = "xl",
  padding = "md",
  centerContent = false,
}: ResponsiveContainerProps) {
  const maxWidthClasses = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    "2xl": "max-w-screen-2xl",
    full: "max-w-full",
    none: "",
  }

  const paddingClasses = {
    none: "",
    sm: "px-2 sm:px-4",
    md: "px-4 sm:px-6 lg:px-8",
    lg: "px-6 sm:px-8 lg:px-12",
  }

  return (
    <Component
      className={cn(
        "w-full",
        !fluid && maxWidthClasses[maxWidth],
        paddingClasses[padding],
        centerContent && "mx-auto",
        className,
      )}
    >
      {children}
    </Component>
  )
}

export default ResponsiveContainer
