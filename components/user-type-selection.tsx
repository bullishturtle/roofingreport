"use client"

import { cn } from "@/lib/utils"
import { Home, Briefcase } from "lucide-react"

interface UserTypeSelectionProps {
  selectedType: "homeowner" | "contractor"
  onSelect: (type: "homeowner" | "contractor") => void
  disabled?: boolean
}

export function UserTypeSelection({ selectedType, onSelect, disabled = false }: UserTypeSelectionProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        type="button"
        onClick={() => onSelect("homeowner")}
        disabled={disabled}
        className={cn(
          "flex flex-col items-center justify-center p-4 border rounded-lg transition-all",
          selectedType === "homeowner"
            ? "border-orange-500 bg-orange-50 text-orange-700"
            : "border-gray-200 hover:border-gray-300 text-gray-700",
          disabled && "opacity-50 cursor-not-allowed",
        )}
      >
        <Home size={24} className="mb-2" />
        <span className="font-medium">Homeowner</span>
      </button>

      <button
        type="button"
        onClick={() => onSelect("contractor")}
        disabled={disabled}
        className={cn(
          "flex flex-col items-center justify-center p-4 border rounded-lg transition-all",
          selectedType === "contractor"
            ? "border-orange-500 bg-orange-50 text-orange-700"
            : "border-gray-200 hover:border-gray-300 text-gray-700",
          disabled && "opacity-50 cursor-not-allowed",
        )}
      >
        <Briefcase size={24} className="mb-2" />
        <span className="font-medium">Contractor</span>
      </button>
    </div>
  )
}
