"use client"

import { useState } from "react"
import Image from "next/image"
import { MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

export function AskRoofusButton() {
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useIsMobile()

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Chat Button */}
      <div className={cn("fixed z-40 transition-all duration-300", isMobile ? "bottom-4 left-4" : "bottom-6 left-6")}>
        <Button
          onClick={toggleChat}
          className={cn(
            "rounded-full shadow-lg bg-orange-500 hover:bg-orange-600 text-white",
            isMobile ? "h-12 px-4" : "h-14 px-6",
          )}
        >
          {isOpen ? (
            <>
              <X className="mr-2" size={isMobile ? 16 : 20} />
              <span className={isMobile ? "text-sm" : "text-base"}>Close Chat</span>
            </>
          ) : (
            <>
              <MessageCircle className="mr-2" size={isMobile ? 16 : 20} />
              <span className={isMobile ? "text-sm" : "text-base"}>Ask Roofus</span>
            </>
          )}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          className={cn(
            "fixed z-30 bg-white rounded-lg shadow-xl transition-all duration-300 overflow-hidden",
            isMobile ? "left-4 right-4 bottom-20 top-20" : "left-6 bottom-24 w-96 h-[500px]",
          )}
        >
          <div className="flex flex-col h-full">
            {/* Chat Header */}
            <div className="bg-orange-500 text-white p-4 flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-white">
                <Image src="/images/roofus.png" alt="Roofus" width={40} height={40} className="object-cover" />
              </div>
              <div>
                <h3 className="font-bold">Roofus</h3>
                <p className="text-xs text-orange-100">Roof Expert Assistant</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              <div className="bg-orange-100 rounded-lg p-3 mb-3 max-w-[80%]">
                <p>Hi there! I'm Roofus, your roof expert assistant. How can I help you today?</p>
              </div>

              {/* This would be populated with actual chat messages in a real implementation */}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Type your question..."
                  className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button className="bg-orange-500 text-white px-4 py-2 rounded-r-lg hover:bg-orange-600">Send</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
