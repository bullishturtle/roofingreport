"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { X, Zap, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function RoofusAssistant() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "roofus" }[]>([
    {
      text: "Hey there! I'm Roofus, your Florida roofing expert. I know all about Florida Building Code, storm claims, and insurance tactics. How can I help you today?",
      sender: "roofus",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showTip, setShowTip] = useState(false)
  const [tipIndex, setTipIndex] = useState(0)
  const [showSpaceship, setShowSpaceship] = useState(false)
  const [spaceshipPosition, setSpaceshipPosition] = useState({ x: 0, y: 0 })
  const [spaceshipDirection, setSpaceshipDirection] = useState(1) // 1 for right, -1 for left

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const tips = [
    "Need help with Florida building codes? Just ask!",
    "I can check if your ZIP qualifies for code upgrades!",
    "Want me to create a storm damage report for you?",
    "I can help you find the property owner's contact info!",
    "Need a proposal for a client? I can draft one for you!",
  ]

  useEffect(() => {
    const tipTimer = setTimeout(() => {
      setShowTip(true)
    }, 15000)

    return () => clearTimeout(tipTimer)
  }, [])

  useEffect(() => {
    if (showTip) {
      const interval = setInterval(() => {
        setTipIndex((prev) => (prev + 1) % tips.length)
      }, 8000)
      return () => clearInterval(interval)
    }
  }, [showTip, tips.length])

  // Spaceship animation
  useEffect(() => {
    const spaceshipInterval = setInterval(() => {
      const shouldShow = Math.random() > 0.7
      if (shouldShow) {
        const startX = spaceshipDirection > 0 ? -100 : window.innerWidth + 100
        const y = Math.random() * (window.innerHeight * 0.7)
        setSpaceshipPosition({ x: startX, y })
        setShowSpaceship(true)

        // Change direction for next appearance
        setSpaceshipDirection((prev) => prev * -1)
      }
    }, 20000)

    return () => clearInterval(spaceshipInterval)
  }, [spaceshipDirection])

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { text: input, sender: "user" }])
    setInput("")
    setIsTyping(true)
    setShowTip(false)

    // Simulate Roofus response
    setTimeout(() => {
      let response = ""

      if (input.toLowerCase().includes("code") || input.toLowerCase().includes("building")) {
        response =
          "Florida Building Code is my specialty! The current code requires a minimum wind resistance of 130mph for most counties. For your specific ZIP code, I can check if you qualify for any special provisions or code upgrades. Want me to look that up for you?"
      } else if (input.toLowerCase().includes("storm") || input.toLowerCase().includes("damage")) {
        response =
          "I track all Florida storms! We've had 3 major events in your area this year. I can generate a detailed storm damage report with dates, wind speeds, and potential impact areas. This can be super helpful for insurance claims. Want me to create one for your property?"
      } else if (input.toLowerCase().includes("insurance") || input.toLowerCase().includes("claim")) {
        response =
          "Florida insurance claims can be tricky! I know all the tactics adjusters use. Make sure you document everything and don't accept the first offer. I can help you prepare documentation that highlights code upgrades required by law. Want me to walk you through the process?"
      } else if (input.toLowerCase().includes("owner") || input.toLowerCase().includes("contact")) {
        response =
          "I can find property owner information for any address in Florida! Just give me the address, and I'll pull the owner's name, phone number, email, and mailing address. This is great for direct outreach. Want me to look up an address for you?"
      } else if (input.toLowerCase().includes("proposal") || input.toLowerCase().includes("quote")) {
        response =
          "I can draft professional proposals in seconds! I'll include all the measurements, materials, code requirements, and even customize it with your branding. Just tell me the address and what type of work you're proposing. Want me to create one for you?"
      } else {
        response =
          "Thanks for your question! As your Florida roofing expert, I can help with building codes, storm tracking, insurance claims, finding property owners, or creating proposals. What specific information do you need about Florida roofing? Want me to handle something for you?"
      }

      setMessages((prev) => [...prev, { text: response, sender: "roofus" }])
      setIsTyping(false)
    }, 1500)
  }

  if (!isClient) return null

  return (
    <>
      {/* Animated stars background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.7 + 0.3,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
            }}
          />
        ))}
      </div>

      {/* Roofus flying in spaceship */}
      <AnimatePresence>
        {showSpaceship && (
          <motion.div
            className="fixed z-50 pointer-events-none"
            initial={{
              x: spaceshipPosition.x,
              y: spaceshipPosition.y,
              rotate: spaceshipDirection > 0 ? 0 : 180,
            }}
            animate={{
              x: spaceshipDirection > 0 ? window.innerWidth + 100 : -100,
              y: spaceshipPosition.y + Math.sin(Date.now() / 1000) * 50,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 10, ease: "linear" }}
            onAnimationComplete={() => setShowSpaceship(false)}
          >
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-20">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-neon-purple/50 to-transparent rounded-full filter blur-md"></div>
                <div className="absolute top-5 left-5 w-20 h-10 bg-gradient-to-r from-neon-gold/50 to-transparent rounded-full filter blur-sm"></div>
              </div>
              <div className="relative h-20 w-32 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center border-2 border-neon-gold">
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-neon-gold rounded-full filter blur-sm opacity-50"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-neon-gold flex items-center justify-center">
                  <Image
                    src="/images/roofus.png"
                    alt="Roofus"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Roofus button */}
      <div className="fixed bottom-6 right-6 z-50">
        {showTip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-20 right-0 mb-2 w-64 p-3 rounded-lg glassmorphism border-2 border-neon-gold/50 shadow-neon-glow"
          >
            <div className="flex items-start gap-2">
              <Lightbulb className="h-5 w-5 text-neon-gold flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-white/90">{tips[tipIndex]}</p>
              </div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="absolute -top-1 -right-1 h-6 w-6 rounded-full p-0"
              onClick={() => setShowTip(false)}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Close</span>
            </Button>
          </motion.div>
        )}

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        >
          <Button
            onClick={() => setIsOpen(true)}
            className="h-16 w-16 rounded-full bg-gradient-to-br from-neon-gold to-neon-orange p-0 shadow-neon-glow"
          >
            <div className="relative h-14 w-14">
              <Image
                src="/images/roofus.png"
                alt="Roofus"
                width={56}
                height={56}
                className="rounded-full object-cover"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-green-500 border border-white"
              />
            </div>
          </Button>
        </motion.div>
      </div>

      {/* Chat dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96"
          >
            <Card className="glassmorphism border-2 border-neon-gold/50 shadow-neon-glow overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-neon-gold/30 to-neon-orange/30 p-4 flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10">
                    <Image
                      src="/images/roofus.png"
                      alt="Roofus"
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                      className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-500 border border-white"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-neon-gold">Roofus</h3>
                    <p className="text-xs text-white/70">Florida Roofing Expert</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 rounded-full text-white/70 hover:text-white hover:bg-white/10"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-80 overflow-y-auto p-4 space-y-4">
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * (index % 3) }}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.sender === "roofus" && (
                        <div className="h-8 w-8 mr-2 flex-shrink-0">
                          <Image
                            src="/images/roofus.png"
                            alt="Roofus"
                            width={32}
                            height={32}
                            className="rounded-full object-cover"
                          />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === "user"
                            ? "bg-neon-blue/30 border border-neon-blue/30"
                            : "bg-neon-gold/20 border border-neon-gold/30"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="h-8 w-8 mr-2 flex-shrink-0">
                        <Image
                          src="/images/roofus.png"
                          alt="Roofus"
                          width={32}
                          height={32}
                          className="rounded-full object-cover"
                        />
                      </div>
                      <div className="max-w-[80%] rounded-lg p-3 bg-neon-gold/20 border border-neon-gold/30">
                        <div className="flex space-x-1">
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.6, delay: 0 }}
                            className="h-2 w-2 rounded-full bg-neon-gold"
                          />
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.6, delay: 0.2 }}
                            className="h-2 w-2 rounded-full bg-neon-gold"
                          />
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.6, delay: 0.4 }}
                            className="h-2 w-2 rounded-full bg-neon-gold"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              <CardFooter className="p-3 border-t border-neon-gold/30">
                <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                  <Input
                    placeholder="Ask Roofus anything about Florida roofing..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="bg-black/30 border-neon-gold/30 text-white placeholder:text-white/50 focus:border-neon-gold focus:ring-neon-gold/20"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="bg-gradient-to-r from-neon-gold to-neon-orange hover:from-neon-orange hover:to-neon-gold text-black shadow-neon-glow"
                    disabled={!input.trim() || isTyping}
                  >
                    <Zap className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
