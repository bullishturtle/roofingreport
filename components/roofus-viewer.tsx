"use client"

import { useState } from "react"
import Image from "next/image"

export function RoofusViewer() {
  const [viewMode, setViewMode] = useState<"front" | "side" | "top">("front")

  return (
    <div className="bg-black/30 border-2 border-yellow-500/30 rounded-lg overflow-hidden">
      <div className="relative h-96 flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="/space-stars-background.png" alt="Space background" fill className="object-cover opacity-30" />
        </div>

        <div className="relative z-10">
          {/* Roofus image - using the image from the screenshots */}
          <Image
            src={
              viewMode === "front"
                ? "/placeholder.svg?height=300&width=200&query=cartoon dog in space suit with clipboard"
                : viewMode === "side"
                  ? "/placeholder.svg?height=300&width=200&query=side view of cartoon dog in space suit"
                  : "/placeholder.svg?height=300&width=200&query=top view of cartoon dog in space suit"
            }
            alt={`Roofus ${viewMode} view`}
            width={200}
            height={300}
            className="object-contain"
          />
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          <div className={`w-3 h-3 rounded-full ${viewMode === "front" ? "bg-yellow-500" : "bg-gray-600"}`}></div>
          <div className={`w-3 h-3 rounded-full ${viewMode === "side" ? "bg-yellow-500" : "bg-gray-600"}`}></div>
          <div className={`w-3 h-3 rounded-full ${viewMode === "top" ? "bg-yellow-500" : "bg-gray-600"}`}></div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 p-4">
        <button
          onClick={() => setViewMode("front")}
          className={`px-4 py-2 rounded-md text-center transition-colors ${
            viewMode === "front"
              ? "bg-yellow-500 text-black font-bold"
              : "bg-black/50 border border-yellow-500/50 text-yellow-500 hover:bg-black/70"
          }`}
        >
          Front View
        </button>
        <button
          onClick={() => setViewMode("side")}
          className={`px-4 py-2 rounded-md text-center transition-colors ${
            viewMode === "side"
              ? "bg-yellow-500 text-black font-bold"
              : "bg-black/50 border border-yellow-500/50 text-yellow-500 hover:bg-black/70"
          }`}
        >
          Side View
        </button>
        <button
          onClick={() => setViewMode("top")}
          className={`px-4 py-2 rounded-md text-center transition-colors ${
            viewMode === "top"
              ? "bg-yellow-500 text-black font-bold"
              : "bg-black/50 border border-yellow-500/50 text-yellow-500 hover:bg-black/70"
          }`}
        >
          Top View
        </button>
      </div>

      <div className="p-4 border-t border-gray-800">
        <h3 className="text-2xl font-bold mb-2">How to Interact</h3>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>Click the view buttons to change perspective</li>
          <li>In the full 3D version, you can rotate and zoom</li>
          <li>Watch Roofus perform different animations</li>
        </ul>
      </div>
    </div>
  )
}
