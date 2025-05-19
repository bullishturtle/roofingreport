"use client"

import { useState } from "react"
import { FileText, X } from "lucide-react"

export function PreviewReportButton() {
  const [isOpen, setIsOpen] = useState(false)

  const handlePreviewClick = () => {
    // This will be replaced with actual preview functionality
    console.log("Preview report clicked")
    window.location.href = "/sample-report"
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-yellow-500 hover:bg-yellow-400 text-black rounded-full p-3 shadow-lg transition-all duration-200 flex items-center justify-center"
        aria-label={isOpen ? "Close preview options" : "Preview a RoofFax Report"}
      >
        {isOpen ? <X size={24} aria-hidden="true" /> : <FileText size={24} aria-hidden="true" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 bg-gray-900 border border-gray-800 rounded-lg shadow-xl p-4 w-64 animate-fade-in">
          <h3 className="text-white font-bold mb-2 flex items-center">
            <FileText size={18} className="text-yellow-500 mr-2" aria-hidden="true" />
            Preview a Report
          </h3>
          <p className="text-gray-300 text-sm mb-3">See a sample RoofFax report without entering your address.</p>
          <button
            onClick={handlePreviewClick}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-medium py-2 rounded transition-colors"
            aria-label="View sample report"
          >
            View Sample Report
          </button>
        </div>
      )}
    </>
  )
}

export default PreviewReportButton
