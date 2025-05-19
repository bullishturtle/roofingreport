"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRoofus } from "@/contexts/roofus-context"
import { AnimatedCharacters } from "@/components/animated-characters"
import { Button } from "@/components/ui/button"
import { X, MessageCircle } from "lucide-react"
import { useUser } from "@/contexts/user-context"

export default function RoofusAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "roofus" }[]>([])
  const [input, setInput] = useState("")
  const { currentAction, triggerRoofusAction } = useRoofus()
  const { user } = useUser()

  // Initial greeting when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = user
        ? `Hi ${user.name}! I'm Roofus, your roof assistant. How can I help you today?`
        : "Hi there! I'm Roofus, your roof assistant. How can I help you today?"

      setMessages([{ text: greeting, sender: "roofus" }])
      triggerRoofusAction("excited")
    }
  }, [isOpen, messages.length, user, triggerRoofusAction])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { text: input, sender: "user" }])

    // Simulate Roofus thinking
    triggerRoofusAction("search")

    // Clear input
    setInput("")

    // Simulate response after a delay
    setTimeout(() => {
      const responses = [
        "I can help you understand your roof's condition and potential issues.",
        "Would you like me to explain how our roof reports work?",
        "I can provide information about common roof problems in your area.",
        "Need help interpreting your roof report? Just ask!",
        "I'm here to answer any questions about your roof's health and maintenance.",
      ]

      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setMessages((prev) => [...prev, { text: randomResponse, sender: "roofus" }])
      triggerRoofusAction("chat")
    }, 1000)
  }

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="rounded-full w-16 h-16 shadow-lg flex items-center justify-center"
          >
            <MessageCircle size={24} />
          </Button>
        )}
      </div>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-lg shadow-xl z-50 flex flex-col overflow-hidden border">
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h3 className="font-medium">Chat with Roofus</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-blue-700"
            >
              <X size={18} />
            </Button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto max-h-96 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                {msg.sender === "roofus" && (
                  <div className="flex-shrink-0 mr-2">
                    <AnimatedCharacters variant="portrait" size="sm" animate={false} />
                  </div>
                )}
                <div
                  className={`rounded-lg px-4 py-2 max-w-[75%] ${
                    msg.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="border-t p-4 flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button type="submit" className="rounded-l-none">
              Send
            </Button>
          </form>
        </div>
      )}
    </>
  )
}
