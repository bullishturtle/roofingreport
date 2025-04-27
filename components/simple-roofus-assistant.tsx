"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"

export function SimpleRoofusAssistant() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        size="lg"
        className="rounded-full h-14 w-14 bg-gradient-to-r from-neon-gold to-neon-orange hover:from-neon-orange hover:to-neon-gold text-black shadow-neon-glow"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageSquare className="h-6 w-6" />
        <span className="sr-only">Open Roofus AI Assistant</span>
      </Button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 bg-black/90 border border-neon-gold/30 rounded-lg shadow-neon-glow overflow-hidden">
          <div className="p-4 border-b border-neon-gold/30">
            <h3 className="text-white font-medium">Roofus AI Assistant</h3>
          </div>
          <div className="p-4">
            <p className="text-white/80 text-sm">
              Hi there! I'm Roofus, your AI roofing assistant. How can I help you today?
            </p>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full bg-white/10 border border-neon-gold/30 rounded-md p-2 text-white placeholder:text-white/50"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
