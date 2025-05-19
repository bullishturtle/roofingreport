"use client"

import { useState } from "react"
import { MessageCircle, X } from "lucide-react"

export function AskRoofusTooltip() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 bg-orange-500 hover:bg-orange-400 text-white rounded-full p-3 shadow-lg transition-all duration-200 flex items-center justify-center"
        aria-label={isOpen ? "Close Roofus assistant" : "Ask Roofus AI assistant"}
      >
        {isOpen ? (
          <X size={24} aria-hidden="true" />
        ) : (
          <div className="flex items-center">
            <span className="text-xl mr-1">🦊</span>
            <MessageCircle size={20} aria-hidden="true" />
          </div>
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-20 left-6 z-50 bg-gray-900 border border-gray-800 rounded-lg shadow-xl p-4 w-64 animate-fade-in">
          <h3 className="text-white font-bold mb-2 flex items-center">
            <span className="text-xl mr-2">🦊</span>
            Ask Roofus
          </h3>
          <p className="text-gray-300 text-sm mb-3">
            Coming soon! Roofus, our AI assistant, will answer all your roofing questions instantly.
          </p>
          <div className="bg-gray-800 rounded p-3 text-sm text-gray-300">
            <p className="italic">
              "Roofus can help with roof measurements, material estimates, storm damage assessment, and more!"
            </p>
          </div>
          <div className="mt-3 text-center">
            <button
              onClick={() => setIsOpen(false)}
              className="text-yellow-500 hover:text-yellow-400 text-sm transition-colors"
              aria-label="Close this tooltip"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default AskRoofusTooltip
