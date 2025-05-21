"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { trackButtonClick } from "@/lib/analytics"
import type { ButtonProps } from "@/components/ui/button"

interface TrackedButtonProps extends ButtonProps {
  trackingName: string
  trackingMetadata?: Record<string, any>
}

export function TrackedButton({ trackingName, trackingMetadata, onClick, children, ...props }: TrackedButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    trackButtonClick(trackingName, trackingMetadata)
    onClick?.(e)
  }

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  )
}
