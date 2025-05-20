"use client"

import { useState } from "react"
import { MessageSquare, X, Send } from "lucide-react"

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hi there! I'm Rufus, your RoofFax assistant. How can I help you today?" },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: input }])

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            "Thanks for your message! I can help you learn more about our roof reports or guide you through the process. For full access to our services, you'll need to sign up or contact our team at (850) 879-9172.",
        },
      ])
    }, 1000)

    setInput("")
  }

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-yellow-500 text-black p-4 rounded-full shadow-lg hover:bg-yellow-400 transition-colors z-50"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 h-96 bg-gray-900 rounded-xl shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-800">
          <div className="bg-yellow-500 text-black px-4 py-3 flex justify-between items-center">
            <div className="font-bold">Chat with Rufus</div>
            <button onClick={() => setIsOpen(false)} className="text-black hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    msg.role === "user" ? "bg-blue-600 text-white" : "bg-gray-800 text-white"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 p-2">
            <div className="flex items-center bg-gray-800 rounded-full px-3 py-1">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-transparent border-none outline-none text-white px-2 py-1"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button onClick={handleSend} className="text-yellow-500 hover:text-yellow-400 p-1">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
