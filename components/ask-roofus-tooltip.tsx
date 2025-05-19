"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import LoadingSpinner from "@/components/ui/loading-spinner"

interface AskRoofusTooltipProps {
  onClose: () => void
}

export default function AskRoofusTooltip({ onClose }: AskRoofusTooltipProps) {
  const [message, setMessage] = useState("")
  const [conversation, setConversation] = useState<Array<{ sender: "user" | "roofus"; text: string }>>([
    { sender: "roofus", text: "Hi there! I'm Roofus, your roof assistant. How can I help you today?" },
  ])
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!message.trim()) return

    // Add user message to conversation
    setConversation((prev) => [...prev, { sender: "user", text: message }])

    // Clear input
    setMessage("")

    // Simulate AI response
    setIsLoading(true)

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate response based on user message
    let response = ""
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("cost") || lowerMessage.includes("price") || lowerMessage.includes("expensive")) {
      response =
        "The cost of roof repairs or replacement depends on many factors including size, materials, and complexity. Based on your report, a full replacement might cost around $8,000-$20,000, but repairs would be much less expensive."
    } else if (lowerMessage.includes("damage") || lowerMessage.includes("leak") || lowerMessage.includes("repair")) {
      response =
        "If you're experiencing leaks or visible damage, it's important to address them quickly. I recommend scheduling a professional inspection to assess the extent of the damage and get a repair estimate."
    } else if (lowerMessage.includes("material") || lowerMessage.includes("shingle") || lowerMessage.includes("tile")) {
      response =
        "The most common roofing materials are asphalt shingles, metal, tile, and slate. Each has different benefits, costs, and lifespans. Your current roof appears to be made of asphalt shingles based on our analysis."
    } else {
      response =
        "Thanks for your question! I'd be happy to help with information about your roof report, maintenance tips, or connecting you with a roofing professional. Could you provide more details about what you'd like to know?"
    }

    // Add Roofus response to conversation
    setConversation((prev) => [...prev, { sender: "roofus", text: response }])

    setIsLoading(false)
  }

  return (
    <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
      <div className="bg-blue-600 text-white p-3 flex items-center">
        <div className="relative w-8 h-8 mr-2">
          <Image src="/images/roofus.png" alt="Roofus" fill style={{ objectFit: "contain" }} />
        </div>
        <div>
          <h3 className="font-medium">Roofus</h3>
          <p className="text-xs text-blue-100">Roof Assistant</p>
        </div>
      </div>

      <div className="h-64 overflow-y-auto p-3 bg-gray-50">
        {conversation.map((msg, index) => (
          <div key={index} className={`mb-3 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
            <div
              className={`inline-block rounded-lg px-3 py-2 max-w-[80%] ${
                msg.sender === "user" ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="text-left mb-3">
            <div className="inline-block rounded-lg px-3 py-2 bg-white border border-gray-200">
              <LoadingSpinner size="sm" className="border-gray-300 border-t-gray-600" />
            </div>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-gray-200">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage()
          }}
          className="flex items-center"
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask Roofus a question..."
            className="flex-1 border border-gray-300 rounded-l-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Button type="submit" className="rounded-l-none" disabled={!message.trim() || isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
