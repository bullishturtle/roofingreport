"use client"

import { useState } from "react"
import { FileText } from "lucide-react"

export function PreviewReportButton() {
  const [isVisible, setIsVisible] = useState(true)

  // Hide button when user scrolls past a certain point
  // This would be connected to scroll events in a full implementation

  // Handle click to open report preview modal/redirect
  const handlePreviewClick = () => {
    // This would open a modal or redirect in production
    console.log("Opening report preview")
    window.open("/sample-report", "_blank")

    // For demo purposes, we'll just log and alert
    alert("Opening sample report preview (this would show a real report in production)")
  }

  if (!isVisible) return null

  return (
    <button
      onClick={handlePreviewClick}
      className="fixed bottom-6 left-6 z-40 bg-yellow-500 hover:bg-yellow-400 text-black font-medium rounded-full p-4 shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center"
      aria-label="Preview a RoofFax Report"
    >
      <FileText className="h-5 w-5 mr-2" />
      <span>Preview a Report</span>
    </button>
  )
}

export default PreviewReportButton
