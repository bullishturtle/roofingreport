"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export function AskRoofusButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <>
      <div
        className="fixed bottom-6 right-6 z-40"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full shadow-lg bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 flex items-center gap-2 transition-all duration-200"
        >
          <span className="text-2xl">🦊</span>
          <span>Got questions? Ask Roofus</span>
        </Button>

        {isHovered && !isOpen && (
          <div className="absolute bottom-16 right-0 bg-white p-3 rounded-lg shadow-lg text-sm w-64 text-gray-800 animate-fade-in">
            <p>Coming soon: Roofus, your AI roof assistant!</p>
            <p className="text-xs mt-1 text-gray-500">Get instant answers about your roof and reports.</p>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-lg shadow-xl z-40 overflow-hidden">
          <div className="bg-amber-500 text-white p-4 flex justify-between items-center">
            <h3 className="font-bold flex items-center gap-2">
              <span className="text-xl">🦊</span> Chat with Roofus
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-4 h-80 overflow-y-auto bg-gray-50">
            <div className="mb-4">
              <div className="bg-amber-100 text-gray-800 p-3 rounded-lg inline-block max-w-[80%]">
                Hi there! I'm Roofus, your AI roof assistant. How can I help you today?
              </div>
            </div>

            <div className="mb-4 text-right">
              <div className="bg-blue-100 text-gray-800 p-3 rounded-lg inline-block max-w-[80%]">
                How accurate are your roof reports?
              </div>
            </div>

            <div className="mb-4">
              <div className="bg-amber-100 text-gray-800 p-3 rounded-lg inline-block max-w-[80%]">
                Our reports are 98% accurate! We use satellite imagery, public records, and AI analysis to provide the
                most accurate assessment of your roof.
              </div>
            </div>
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your question..."
                className="flex-grow p-2 border rounded-md"
                disabled
                aria-label="Ask a question (feature coming soon)"
              />
              <Button disabled>Send</Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">This is a demo. Chat functionality coming soon!</p>
          </div>
        </div>
      )}
    </>
  )
}

export default AskRoofusButton
