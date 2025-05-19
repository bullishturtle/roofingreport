"use client"

import { useState, useEffect } from "react"

export function Roof3DViewer() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Loading 3D viewer...</p>
      </div>
    )
  }

  return (
    <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center">
      <div className="text-center p-4">
        <div className="text-4xl mb-2">🏠</div>
        <p className="text-gray-700 font-medium">3D Roof Viewer</p>
        <p className="text-gray-500 text-sm">Enable JavaScript to view interactive 3D model</p>
      </div>
    </div>
  )
}
