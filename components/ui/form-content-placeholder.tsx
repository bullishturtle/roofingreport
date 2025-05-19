"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface FormFieldDimensions {
  labelHeight: number
  inputHeight: number
  gap: number
}

interface FormContentPlaceholderProps {
  className?: string
  isLoading?: boolean
  children?: React.ReactNode
}

export function FormContentPlaceholder({ className, isLoading = true, children }: FormContentPlaceholderProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [formStructure, setFormStructure] = useState<FormFieldDimensions[]>([])
  const [hasRendered, setHasRendered] = useState(false)

  // Analyze form structure
  useEffect(() => {
    if (formRef.current && !hasRendered && children) {
      const form = formRef.current

      // Find all form field containers
      const fieldContainers = form.querySelectorAll("div > div")
      const fieldDimensions: FormFieldDimensions[] = []

      fieldContainers.forEach((container) => {
        const label = container.querySelector("label")
        const input = container.querySelector("input, textarea, select")

        if (label && input) {
          fieldDimensions.push({
            labelHeight: label.getBoundingClientRect().height,
            inputHeight: input.getBoundingClientRect().height,
            gap: 8, // Default gap
          })
        }
      })

      setFormStructure(fieldDimensions)
      setHasRendered(true)
    }
  }, [children, hasRendered])

  return (
    <>
      {isLoading ? (
        <div className={cn("space-y-6", className)}>
          {formStructure.length > 0
            ? // Render based on analyzed structure
              formStructure.map((field, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton style={{ height: field.labelHeight, width: "30%" }} />
                  <Skeleton style={{ height: field.inputHeight, width: "100%" }} />
                </div>
              ))
            : // Default structure if no analysis available
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}

          <div className="pt-2">
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      ) : (
        children
      )}

      {/* Hidden form to analyze structure */}
      {!hasRendered && children && (
        <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
          <form ref={formRef}>{children}</form>
        </div>
      )}
    </>
  )
}
