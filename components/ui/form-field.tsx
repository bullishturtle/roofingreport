"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  error?: string
  touched?: boolean
}

export function FormField({ label, name, error, touched, className = "", ...props }: FormFieldProps) {
  const showError = error && touched

  return (
    <div className="space-y-1">
      <Label htmlFor={name} className={showError ? "text-red-400" : ""}>
        {label}
      </Label>
      <div className="relative">
        <Input
          id={name}
          name={name}
          className={`${
            showError
              ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
              : "border-neon-gold/30 focus:border-neon-gold focus:ring-neon-gold/20"
          } ${className}`}
          aria-invalid={showError ? "true" : "false"}
          aria-describedby={showError ? `${name}-error` : undefined}
          {...props}
        />
        {showError && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400">
            <AlertCircle className="h-4 w-4" />
          </div>
        )}
      </div>
      {showError && (
        <p id={`${name}-error`} className="text-xs text-red-400 mt-1">
          {error}
        </p>
      )}
    </div>
  )
}
