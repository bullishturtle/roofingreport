"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import AskRoofusTooltip from "@/components/ask-roofus-tooltip"

export default function AskRoofusButton() {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)

  return (
    <div className="relative">
      {isTooltipOpen && <AskRoofusTooltip onClose={() => setIsTooltipOpen(false)} />}

      <Button
        onClick={() => setIsTooltipOpen(!isTooltipOpen)}
        className={`rounded-full w-14 h-14 p-0 shadow-lg ${
          isTooltipOpen ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"
        }`}
        aria-label={isTooltipOpen ? "Close Roofus assistant" : "Ask Roofus for help"}
      >
        {isTooltipOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <div className="relative w-8 h-8">
            <Image src="/images/roofus.png" alt="Roofus" fill style={{ objectFit: "contain" }} />
          </div>
        )}
      </Button>
    </div>
  )
}
