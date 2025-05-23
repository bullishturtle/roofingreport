"use client"

import { useState } from "react"
import { Button as BaseButton } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/loading-spinner"
import type { ButtonProps } from "@/components/ui/button"

interface ActionButtonProps extends ButtonProps {
  onAction: () => Promise<void> | void
  loadingText?: string
}

export function ActionButton({ children, onAction, loadingText = "Processing...", ...props }: ActionButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleClick = async () => {
    try {
      setIsLoading(true)
      setError(null)
      await onAction()
    } catch (err) {
      console.error("Button action failed:", err)
      setError(err instanceof Error ? err.message : "Action failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative">
      <BaseButton {...props} onClick={handleClick} disabled={isLoading || props.disabled}>
        {isLoading ? (
          <>
            <LoadingSpinner size="sm" className="mr-2" />
            {loadingText}
          </>
        ) : (
          children
        )}
      </BaseButton>
      {error && (
        <div className="absolute top-full left-0 right-0 mt-1 text-xs text-red-400 bg-red-500/10 p-1 rounded border border-red-500/20">
          {error}
        </div>
      )}
    </div>
  )
}

// Export Button to match what's expected
export { BaseButton as Button }
