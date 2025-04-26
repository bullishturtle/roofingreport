"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { X, Lightbulb, Send, Loader2, Paperclip, Maximize2, Minimize2, Download, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useDropzone } from "react-dropzone"

// Define message types
type MessageType = {
  id: string
  text: string
  sender: "user" | "roofus"
  timestamp: Date
  attachments?: { name: string; url: string; type: string }[]
  isLoading?: boolean
}

// Predefined responses for common questions
const PREDEFINED_RESPONSES = {
  greeting: [
    "Hey there! I'm Roofus, your Florida roofing expert. How can I help you today?",
    "Hello! I'm Roofus, your AI roofing assistant. What can I help you with?",
    "Hi there! Roofus at your service. What roofing questions do you have today?",
  ],
  code: [
    "Florida Building Code is my specialty! The current code requires a minimum wind resistance of 130mph for most counties. For your specific ZIP code, I can check if you qualify for any special provisions or code upgrades. Want me to look that up for you?",
    "I'm up-to-date with all Florida building codes! The 7th Edition (2020) Florida Building Code is currently in effect with amendments. For roofing, key requirements include minimum 2:12 slope for shingles, proper underlayment, and wind resistance ratings based on your location. I can provide specific requirements for your area if you share your ZIP code.",
  ],
  storm: [
    "I track all Florida storms! We've had 3 major events in your area this year. I can generate a detailed storm damage report with dates, wind speeds, and potential impact areas. This can be super helpful for insurance claims. Want me to create one for your property?",
    "Based on my weather data, your area has experienced significant weather events recently. I can provide a detailed report showing wind speeds, precipitation, and potential damage patterns. This documentation is crucial for insurance claims. Would you like me to generate a report for your address?",
  ],
  insurance: [
    "Florida insurance claims can be tricky! I know all the tactics adjusters use. Make sure you document everything and don't accept the first offer. I can help you prepare documentation that highlights code upgrades required by law. Want me to walk you through the process?",
    "When dealing with Florida insurance claims, timing is everything. You typically have 2 years from the date of damage to file a claim. I recommend documenting all damage with photos, getting multiple contractor estimates, and understanding your policy's ACV vs. RCV coverage. I can help you prepare all the necessary documentation for a successful claim.",
  ],
  owner: [
    "I can find property owner information for any address in Florida! Just give me the address, and I'll pull the owner's name, phone number, email, and mailing address. This is great for direct outreach. Want me to look up an address for you?",
    "Property owner information is just a click away! With any Florida address, I can access the property appraiser's database to find current ownership details, including contact information and property characteristics. This helps you target your marketing effectively. Which address would you like me to research?",
  ],
  proposal: [
    "I can draft professional proposals in seconds! I'll include all the measurements, materials, code requirements, and even customize it with your branding. Just tell me the address and what type of work you're proposing. Want me to create one for you?",
    "My proposal generator creates professional, detailed estimates that win jobs! I'll include accurate measurements, material specifications, code requirements, and warranty information. The proposals are fully customizable with your branding and can be delivered instantly via email. Would you like me to create a sample for you?",
  ],
  materials: [
    "For Florida roofs, I recommend impact-resistant shingles rated for high wind zones (130+ mph). Popular options include GAF Timberline HDZ, Owens Corning Duration, and CertainTeed Landmark Pro. Metal roofing is also excellent for hurricane resistance. The best choice depends on your specific location, budget, and aesthetic preferences. Would you like specific brand recommendations?",
    "The best roofing materials for Florida's climate include impact-resistant shingles, metal roofing, concrete or clay tiles, and modified bitumen for flat roofs. Each has different price points and benefits. Metal roofing offers the best hurricane resistance but at a higher cost. Architectural shingles provide a good balance of performance and value. What's your budget range?",
  ],
  cost: [
    "Roof replacement costs in Florida typically range from $8,000 to $20,000+ depending on size, materials, and complexity. Asphalt shingles average $4-$7 per square foot installed, while metal roofing runs $7-$14 per square foot. For an accurate estimate, I'd need your address to calculate the exact roof dimensions and factor in local labor rates. Would you like me to generate a ballpark estimate for you?",
    "In the current market, Florida roof replacements average $4.50-$7.00 per square foot for standard shingles, $7-$14 for metal, and $8-$25 for tile. A typical 2,000 sq ft roof replacement ranges from $9,000 to $14,000 for shingles. Prices vary by county and can increase during high demand periods after storms. I can provide a more precise estimate with your specific address.",
  ],
  roof_life: [
    "Based on my analysis of your roof's current condition and Florida's harsh climate, I estimate your roof has about 2-3 years of useful life remaining. With our extreme UV exposure, heavy rains, and hurricane threats, asphalt shingles deteriorate faster here than in northern states. I'd recommend planning for replacement within the next 24 months to avoid potential leaks and more costly repairs.",
    "Looking at the satellite imagery and weather history for your address, your roof is showing signs of advanced wear. In Florida's climate, a 15-year-old roof has typically lost 80-90% of its useful life. I'd recommend getting an in-person inspection soon, as waiting too long can lead to interior damage that insurance won't cover.",
  ],
  damage: [
    "I've analyzed the satellite imagery of your property and detected potential wind damage on the south-facing slope and possible granule loss near the ridge line. These issues, combined with the 3 major storms your area experienced last year, suggest your roof may qualify for an insurance claim. Would you like me to generate a detailed damage report with documentation for your insurance company?",
    "The satellite imagery shows several concerning areas on your roof, particularly around the valleys and flashings. These are common failure points after the type of wind events your neighborhood experienced last season. I recommend having a professional inspection as soon as possible, as these issues can lead to leaks and interior damage if left unaddressed.",
  ],
}

// Function to get a random response from a category
const getRandomResponse = (category: keyof typeof PREDEFINED_RESPONSES) => {
  const responses = PREDEFINED_RESPONSES[category]
  return responses[Math.floor(Math.random() * responses.length)]
}

// Function to generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 11)

export function RoofusAIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: generateId(),
      text: getRandomResponse("greeting"),
      sender: "roofus",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showTip, setShowTip] = useState(false)
  const [tipIndex, setTipIndex] = useState(0)
  const [showSpaceship, setShowSpaceship] = useState(false)
  const [spaceshipPosition, setSpaceshipPosition] = useState({ x: 0, y: 0 })
  const [spaceshipDirection, setSpaceshipDirection] = useState(1) // 1 for right, -1 for left
  const [isMounted, setIsMounted] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const tips = [
    "Need help with Florida building codes? Just ask!",
    "I can check if your ZIP qualifies for code upgrades!",
    "Want me to create a storm damage report for you?",
    "I can help you find the property owner's contact info!",
    "Need a proposal for a client? I can draft one for you!",
    "Ask me about the best roofing materials for Florida!",
    "I can estimate roof replacement costs for your area!",
    "Need help with an insurance claim? I know all the tricks!",
    "I can analyze satellite imagery of any property!",
    "Ask me about Florida's wind mitigation requirements!",
  ]

  // File upload dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 5,
    maxSize: 10485760, // 10MB
    onDrop: (acceptedFiles) => {
      setUploadedFiles((prev) => [...prev, ...acceptedFiles])
    },
  })

  // Set mounted state to handle SSR
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const tipTimer = setTimeout(() => {
      setShowTip(true)
    }, 15000)

    return () => clearTimeout(tipTimer)
  }, [isMounted])

  useEffect(() => {
    if (!isMounted || !showTip) return

    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % tips.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [showTip, tips.length, isMounted])

  // Spaceship animation
  useEffect(() => {
    if (!isMounted) return

    const spaceshipInterval = setInterval(() => {
      const shouldShow = Math.random() > 0.7
      if (shouldShow) {
        const windowWidth = typeof window !== "undefined" ? window.innerWidth : 1000
        const windowHeight = typeof window !== "undefined" ? window.innerHeight : 800

        const startX = spaceshipDirection > 0 ? -100 : windowWidth + 100
        const y = Math.random() * (windowHeight * 0.7)
        setSpaceshipPosition({ x: startX, y })
        setShowSpaceship(true)

        // Change direction for next appearance
        setSpaceshipDirection((prev) => prev * -1)
      }
    }, 20000)

    return () => clearInterval(spaceshipInterval)
  }, [spaceshipDirection, isMounted])

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isMounted) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isMounted])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Simulate file upload
  const handleFileUpload = async () => {
    if (uploadedFiles.length === 0) return

    setIsUploading(true)

    // Add message with attachments
    const attachments = uploadedFiles.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type,
    }))

    setMessages((prev) => [
      ...prev,
      {
        id: generateId(),
        text: "I've uploaded these files for you to analyze:",
        sender: "user",
        timestamp: new Date(),
        attachments,
      },
    ])

    // Clear uploaded files
    setUploadedFiles([])

    // Simulate processing time
    setTimeout(() => {
      setIsUploading(false)

      // Add Roofus response about the files
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          text: "Thanks for sharing these files! I've analyzed them and can see this is a typical Florida hip roof with architectural shingles. Based on the images, I can identify some potential wind damage near the ridge line and possible granule loss. The roof appears to be 8-10 years old, which in Florida's harsh climate means it's approaching the end of its reliable service life. Would you like me to generate a detailed report based on these images?",
          sender: "roofus",
          timestamp: new Date(),
        },
      ])
    }, 2000)
  }

  // Handle sending a message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() && uploadedFiles.length === 0) return

    // If there are files to upload, handle them
    if (uploadedFiles.length > 0) {
      handleFileUpload()
      return
    }

    // Add user message
    const userMessage = {
      id: generateId(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)
    setShowTip(false)

    // Process the message to determine the best response
    processUserMessage(input)
  }

  // Process user message and generate appropriate response
  const processUserMessage = (message: string) => {
    const lowerMessage = message.toLowerCase()

    // Add typing indicator
    setMessages((prev) => [
      ...prev,
      {
        id: generateId(),
        text: "",
        sender: "roofus",
        timestamp: new Date(),
        isLoading: true,
      },
    ])

    // Determine which category the message falls into
    let responseCategory: keyof typeof PREDEFINED_RESPONSES = "greeting"
    let responseDelay = 1500

    if (lowerMessage.includes("code") || lowerMessage.includes("building") || lowerMessage.includes("regulation")) {
      responseCategory = "code"
      responseDelay = 2000
    } else if (
      lowerMessage.includes("storm") ||
      lowerMessage.includes("damage") ||
      lowerMessage.includes("hurricane")
    ) {
      responseCategory = "storm"
      responseDelay = 2000
    } else if (
      lowerMessage.includes("insurance") ||
      lowerMessage.includes("claim") ||
      lowerMessage.includes("adjuster")
    ) {
      responseCategory = "insurance"
      responseDelay = 2200
    } else if (
      lowerMessage.includes("owner") ||
      lowerMessage.includes("contact") ||
      lowerMessage.includes("property")
    ) {
      responseCategory = "owner"
      responseDelay = 1800
    } else if (
      lowerMessage.includes("proposal") ||
      lowerMessage.includes("quote") ||
      lowerMessage.includes("estimate")
    ) {
      responseCategory = "proposal"
      responseDelay = 2000
    } else if (
      lowerMessage.includes("material") ||
      lowerMessage.includes("shingle") ||
      lowerMessage.includes("metal")
    ) {
      responseCategory = "materials"
      responseDelay = 2200
    } else if (lowerMessage.includes("cost") || lowerMessage.includes("price") || lowerMessage.includes("expensive")) {
      responseCategory = "cost"
      responseDelay = 1900
    } else if (lowerMessage.includes("life") || lowerMessage.includes("old") || lowerMessage.includes("replace")) {
      responseCategory = "roof_life"
      responseDelay = 2100
    } else if (
      lowerMessage.includes("damage") ||
      lowerMessage.includes("leak") ||
      lowerMessage.includes("problem") ||
      lowerMessage.includes("issue")
    ) {
      responseCategory = "damage"
      responseDelay = 2300
    }

    // Simulate API response delay
    setTimeout(() => {
      // Remove typing indicator
      setMessages((prev) => prev.filter((msg) => !msg.isLoading))

      // Add Roofus response
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          text: getRandomResponse(responseCategory),
          sender: "roofus",
          timestamp: new Date(),
        },
      ])

      setIsTyping(false)
    }, responseDelay)
  }

  // Don't render anything during SSR
  if (!isMounted) {
    return null
  }

  return (
    <>
      {/* Animated stars background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white"
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
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
              x: spaceshipDirection > 0 ? (typeof window !== "undefined" ? window.innerWidth : 1000) + 100 : -100,
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
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-neon-gold flex items-center justify-center overflow-hidden">
                  <Image src="/images/roofus.png" alt="Roofus" width={48} height={48} className="object-cover" />
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
            className="h-16 w-16 rounded-full bg-gradient-to-br from-neon-gold to-neon-orange p-0 shadow-neon-glow overflow-hidden"
          >
            <div className="relative h-16 w-16 flex items-center justify-center">
              <Image src="/images/roofus.png" alt="Roofus" width={64} height={64} className="object-cover" />
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
            className={`fixed ${isExpanded ? "inset-4 md:inset-10" : "bottom-24 right-6 w-80 md:w-96"} z-50 transition-all duration-300`}
          >
            <Card className="glassmorphism border-2 border-neon-gold/50 shadow-neon-glow overflow-hidden h-full flex flex-col">
              <CardHeader className="bg-gradient-to-r from-neon-gold/30 to-neon-orange/30 p-4 flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden">
                    <Image src="/images/roofus.png" alt="Roofus" width={40} height={40} className="object-cover" />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                      className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-500 border border-white"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-neon-gold">Roofus AI</h3>
                    <p className="text-xs text-white/70">Florida Roofing Expert</p>
                  </div>
                  <Badge className="ml-2 bg-green-500/20 text-green-400 border-green-500/30">Online</Badge>
                </div>
                <div className="flex items-center gap-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setIsExpanded(!isExpanded)}
                          className="h-8 w-8 rounded-full text-white/70 hover:text-white hover:bg-white/10"
                        >
                          {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{isExpanded ? "Minimize" : "Maximize"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 rounded-full text-white/70 hover:text-white hover:bg-white/10"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0 flex-1 overflow-hidden">
                <div className={`${isExpanded ? "h-[calc(100vh-13rem)]" : "h-80"} overflow-y-auto p-4 space-y-4`}>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.sender === "roofus" && (
                        <div className="h-8 w-8 mr-2 flex-shrink-0 rounded-full overflow-hidden">
                          <Image
                            src="/images/roofus.png"
                            alt="Roofus"
                            width={32}
                            height={32}
                            className="object-cover"
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
                        {message.isLoading ? (
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
                        ) : (
                          <>
                            <p className="text-sm whitespace-pre-wrap">{message.text}</p>

                            {/* Display attachments if any */}
                            {message.attachments && message.attachments.length > 0 && (
                              <div className="mt-2 space-y-2">
                                {message.attachments.map((attachment, index) => (
                                  <div key={index} className="flex items-center gap-2 p-2 bg-black/30 rounded-md">
                                    {attachment.type.startsWith("image/") ? (
                                      <div className="relative h-12 w-12 rounded-md overflow-hidden">
                                        <Image
                                          src={attachment.url || "/placeholder.svg"}
                                          alt={attachment.name}
                                          fill
                                          className="object-cover"
                                        />
                                      </div>
                                    ) : (
                                      <div className="h-12 w-12 rounded-md bg-black/50 flex items-center justify-center">
                                        <FileText className="h-6 w-6 text-white/70" />
                                      </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                      <p className="text-xs font-medium truncate">{attachment.name}</p>
                                      <p className="text-xs text-white/50">
                                        {attachment.type.split("/")[1].toUpperCase()}
                                      </p>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6 rounded-full hover:bg-white/10"
                                      onClick={() => window.open(attachment.url, "_blank")}
                                    >
                                      <Download className="h-3 w-3" />
                                      <span className="sr-only">Download</span>
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            )}

                            <div className="mt-1 text-right">
                              <span className="text-xs text-white/50">
                                {new Date(message.timestamp).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              <CardFooter className="p-3 border-t border-neon-gold/30">
                {/* File upload area */}
                {uploadedFiles.length > 0 && (
                  <div className="mb-2 w-full">
                    <div className="flex flex-wrap gap-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center gap-1 bg-black/30 rounded-full pl-2 pr-1 py-1">
                          <span className="text-xs truncate max-w-[100px]">{file.name}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 rounded-full hover:bg-white/10"
                            onClick={() => setUploadedFiles((prev) => prev.filter((_, i) => i !== index))}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                  <div className="relative flex-1">
                    <Textarea
                      ref={inputRef}
                      placeholder="Ask Roofus anything about Florida roofing..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="min-h-[40px] max-h-[120px] bg-black/30 border-neon-gold/30 text-white placeholder:text-white/50 focus:border-neon-gold focus:ring-neon-gold/20 pr-10"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage(e)
                        }
                      }}
                    />
                    <div className="absolute right-2 bottom-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              className="h-6 w-6 rounded-full hover:bg-white/10"
                              {...getRootProps()}
                            >
                              <input {...getInputProps()} />
                              <Paperclip className="h-4 w-4 text-white/70" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Attach files</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    size="icon"
                    className="bg-gradient-to-r from-neon-gold to-neon-orange hover:from-neon-orange hover:to-neon-gold text-black shadow-neon-glow h-10 w-10"
                    disabled={(!input.trim() && uploadedFiles.length === 0) || isTyping || isUploading}
                  >
                    {isTyping || isUploading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
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
