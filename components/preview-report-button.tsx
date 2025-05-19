"use client"

import { useState } from "react"
import { FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

export function PreviewReportButton() {
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useIsMobile()

  const handleClick = () => {
    setIsOpen(true)
    // In a real implementation, this would open a modal or navigate to a preview page
    alert("This would open a sample report preview")
    setIsOpen(false)
  }

  return (
    <div className={cn("fixed z-40 transition-all duration-300", isMobile ? "bottom-4 right-4" : "bottom-6 right-6")}>
      <Button
        onClick={handleClick}
        className={cn(
          "rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 text-white",
          isMobile ? "h-12 px-4" : "h-14 px-6",
        )}
      >
        <FileText className="mr-2" size={isMobile ? 16 : 20} />
        <span className={isMobile ? "text-sm" : "text-base"}>Preview a Report</span>
      </Button>
    </div>
  )
}
