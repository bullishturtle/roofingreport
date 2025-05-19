"use client"

import { Home, Briefcase } from "lucide-react"

interface UserTypeSelectionProps {
  selectedType: "homeowner" | "contractor"
  onSelect: (type: "homeowner" | "contractor") => void
}

export default function UserTypeSelection({ selectedType, onSelect }: UserTypeSelectionProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">I am a:</p>
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onSelect("homeowner")}
          className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all ${
            selectedType === "homeowner"
              ? "border-blue-500 bg-blue-50 text-blue-700"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <Home className="h-6 w-6 mb-2" />
          <span className="text-sm font-medium">Homeowner</span>
        </button>

        <button
          type="button"
          onClick={() => onSelect("contractor")}
          className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all ${
            selectedType === "contractor"
              ? "border-blue-500 bg-blue-50 text-blue-700"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <Briefcase className="h-6 w-6 mb-2" />
          <span className="text-sm font-medium">Contractor</span>
        </button>
      </div>
    </div>
  )
}
