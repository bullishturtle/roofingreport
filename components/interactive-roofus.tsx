"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Physics, usePlane, useBox } from "@react-three/cannon"
import { PerspectiveCamera, Html } from "@react-three/drei"
import * as THREE from "three"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, X } from "lucide-react"

// Character behavior states
type BehaviorState = "idle" | "wandering" | "jumping" | "interacting" | "chatting"

// Helper function to get a random position within bounds
const getRandomPosition = (bounds = 5) => {
  return [
    (Math.random() - 0.5) * bounds,
    0.5, // Fixed height
    (Math.random() - 0.5) * bounds,
  ] as [number, number, number]
}

// Helper to get random time between min and max
const getRandomTime = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

// Roofus Character Component (built with basic geometries)
function RoofusCharacter({
  position = [0, 0.5, 0],
  onInteract,
  isChatOpen,
}: {
  position?: [number, number, number]
  onInteract: () => void
  isChatOpen: boolean
}) {
  const group = useRef<THREE.Group>(null)
  const [behaviorState, setBehaviorState] = useState<BehaviorState>("idle")
  const [direction, setDirection] = useState<THREE.Vector3>(new THREE.Vector3(1, 0, 0))
  const [targetPosition, setTargetPosition] = useState<THREE.Vector3>(new THREE.Vector3(...position))
  const [showSpeechBubble, setShowSpeechBubble] = useState(false)
  const [speechText, setSpeechText] = useState("")
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now())
  const [isJumping, setIsJumping] = useState(false)
  const [isWagging, setIsWagging] = useState(false)
  const behaviorTimer = useRef<NodeJS.Timeout | null>(null)
  const speechTimer = useRef<NodeJS.Timeout | null>(null)
  const tailRef = useRef<THREE.Object3D>(null)
  const earsRef = useRef<THREE.Object3D>(null)
  const { camera, viewport } = useThree()

  // Setup physics
  const [physicsRef, physicsApi] = useBox(() => ({
    mass: 1,
    position,
    args: [0.3, 0.5, 0.3],
    fixedRotation: true,
    onCollide: (e) => {
      if (e.body.name === "obstacle") {
        // React to collision
        if (Math.random() > 0.5) {
          speak("Oops! I bumped into something!")
        } else {
          speak("Excuse me, coming through!")
        }
      }
      if (e.body.name === "ground" && isJumping) {
        setIsJumping(false)
      }
    },
  }))

  // Initialize character
  useEffect(() => {
    // Start behavior cycle
    startBehaviorCycle()

    // Start tail wagging
    startWagging()

    return () => {
      if (behaviorTimer.current) clearTimeout(behaviorTimer.current)
      if (speechTimer.current) clearTimeout(speechTimer.current)
    }
  }, [])

  // Handle chat state
  useEffect(() => {
    if (isChatOpen) {
      setBehaviorState("chatting")
      speak("How can I help you today?")
    } else if (behaviorState === "chatting") {
      setBehaviorState("idle")
      startBehaviorCycle()
    }
  }, [isChatOpen])

  // Behavior cycle
  const startBehaviorCycle = () => {
    if (behaviorTimer.current) clearTimeout(behaviorTimer.current)

    if (isChatOpen) {
      setBehaviorState("chatting")
      return
    }

    // Determine next behavior
    const inactiveTime = Date.now() - lastInteractionTime
    const isInactive = inactiveTime > 30000 // 30 seconds

    if (isInactive && Math.random() > 0.7) {
      // More likely to do something interesting when user is inactive
      const behaviors: BehaviorState[] = ["wandering", "jumping"]
      const nextBehavior = behaviors[Math.floor(Math.random() * behaviors.length)]
      setBehaviorState(nextBehavior)

      switch (nextBehavior) {
        case "wandering":
          const newTarget = getRandomPosition(8)
          setTargetPosition(new THREE.Vector3(...newTarget))
          break
        case "jumping":
          performJump()
          break
      }

      // Random quips during behaviors
      if (Math.random() > 0.7) {
        const quips = [
          "Just stretching my legs!",
          "Looking for roof damage...",
          "I love exploring!",
          "Need any roofing advice?",
          "Click on me if you need help!",
        ]
        speak(quips[Math.floor(Math.random() * quips.length)])
      }
    } else {
      // Default to idle or simple wandering
      if (Math.random() > 0.6) {
        setBehaviorState("wandering")
        const newTarget = getRandomPosition(5)
        setTargetPosition(new THREE.Vector3(...newTarget))
      } else {
        setBehaviorState("idle")
      }
    }

    // Schedule next behavior change
    const nextBehaviorTime = getRandomTime(5000, 15000) // 5-15 seconds
    behaviorTimer.current = setTimeout(startBehaviorCycle, nextBehaviorTime)
  }

  // Start tail wagging
  const startWagging = () => {
    setIsWagging(true)
  }

  // Perform jump
  const performJump = () => {
    setIsJumping(true)
    physicsApi.velocity.set(0, 5, 0)

    setTimeout(() => {
      if (isJumping) {
        setIsJumping(false)
        setBehaviorState("idle")
      }
    }, 2000)
  }

  // Display speech bubble
  const speak = (text: string) => {
    setSpeechText(text)
    setShowSpeechBubble(true)

    if (speechTimer.current) clearTimeout(speechTimer.current)

    speechTimer.current = setTimeout(() => {
      setShowSpeechBubble(false)
    }, 5000)
  }

  // Handle user interaction
  const handleClick = () => {
    setLastInteractionTime(Date.now())
    onInteract()

    if (!isChatOpen) {
      speak("Hi there! Click again to chat with me!")
    }
  }

  // Update character position and rotation
  useFrame((state, delta) => {
    if (!group.current || !physicsRef.current) return

    const physicsPosition = physicsRef.current.position

    // Update group position to match physics
    group.current.position.set(physicsPosition.x, physicsPosition.y - 0.25, physicsPosition.z)

    // Handle wandering behavior
    if (behaviorState === "wandering") {
      const currentPos = new THREE.Vector3(physicsPosition.x, 0, physicsPosition.z)
      const target = new THREE.Vector3(targetPosition.x, 0, targetPosition.z)

      if (currentPos.distanceTo(target) > 0.5) {
        // Calculate direction to target
        direction.subVectors(target, currentPos).normalize()

        // Apply velocity in that direction
        physicsApi.velocity.set(direction.x * 2, physicsPosition.y < 0.3 ? 0 : -9.8 * delta, direction.z * 2)

        // Rotate model to face direction of travel
        if (direction.length() > 0.1) {
          const angle = Math.atan2(direction.x, direction.z)
          group.current.rotation.y = angle
        }
      } else {
        // Reached target
        physicsApi.velocity.set(0, physicsPosition.y < 0.3 ? 0 : -9.8 * delta, 0)
        setBehaviorState("idle")
      }
    } else if (behaviorState === "idle" || behaviorState === "chatting") {
      // Apply gravity but no horizontal movement
      physicsApi.velocity.set(0, physicsPosition.y < 0.3 ? 0 : -9.8 * delta, 0)
    }

    // Keep character within bounds
    const bounds = 10
    if (Math.abs(physicsPosition.x) > bounds || Math.abs(physicsPosition.z) > bounds) {
      const newPos = [
        Math.max(-bounds, Math.min(bounds, physicsPosition.x)),
        physicsPosition.y,
        Math.max(-bounds, Math.min(bounds, physicsPosition.z)),
      ] as [number, number, number]
      physicsApi.position.set(...newPos)

      // Turn around
      if (group.current) {
        const angle = Math.atan2(-direction.x, -direction.z)
        group.current.rotation.y = angle
        direction.multiplyScalar(-1)
      }
    }

    // Ensure character stays above ground
    if (physicsPosition.y < 0.3) {
      physicsApi.position.set(physicsPosition.x, 0.3, physicsPosition.z)
    }

    // Animate tail wagging
    if (tailRef.current && isWagging) {
      tailRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 5) * 0.5
    }

    // Animate ears when jumping
    if (earsRef.current && isJumping) {
      earsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 10) * 0.2
    } else if (earsRef.current) {
      earsRef.current.rotation.x = 0
    }
  })

  return (
    <group>
      <mesh ref={physicsRef} name="roofus" visible={false} onClick={handleClick}>
        <boxGeometry args={[0.6, 1, 0.6]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Custom built Roofus character */}
      <group ref={group}>
        {/* Body */}
        <mesh position={[0, 0.25, 0]} castShadow>
          <boxGeometry args={[0.4, 0.5, 0.6]} />
          <meshStandardMaterial color="#ff6b35" />
        </mesh>

        {/* Head */}
        <mesh position={[0, 0.6, 0.2]} castShadow>
          <boxGeometry args={[0.35, 0.35, 0.35]} />
          <meshStandardMaterial color="#ff6b35" />
        </mesh>

        {/* Snout */}
        <mesh position={[0, 0.55, 0.4]} castShadow>
          <boxGeometry args={[0.2, 0.15, 0.1]} />
          <meshStandardMaterial color="#ff8c66" />
        </mesh>

        {/* Nose */}
        <mesh position={[0, 0.55, 0.46]} castShadow>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#222" />
        </mesh>

        {/* Eyes */}
        <mesh position={[0.1, 0.65, 0.38]} castShadow>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#222" />
        </mesh>
        <mesh position={[-0.1, 0.65, 0.38]} castShadow>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#222" />
        </mesh>

        {/* Ears */}
        <group ref={earsRef}>
          <mesh position={[0.15, 0.85, 0.2]} rotation={[0.2, 0, 0.3]} castShadow>
            <boxGeometry args={[0.1, 0.2, 0.05]} />
            <meshStandardMaterial color="#ff6b35" />
          </mesh>
          <mesh position={[-0.15, 0.85, 0.2]} rotation={[0.2, 0, -0.3]} castShadow>
            <boxGeometry args={[0.1, 0.2, 0.05]} />
            <meshStandardMaterial color="#ff6b35" />
          </mesh>
        </group>

        {/* Tail */}
        <mesh ref={tailRef} position={[0, 0.3, -0.35]} rotation={[0.5, 0, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.08, 0.3, 8]} />
          <meshStandardMaterial color="#ff6b35" />
        </mesh>

        {/* Legs */}
        <mesh position={[0.15, 0, 0.2]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.3, 8]} />
          <meshStandardMaterial color="#ff6b35" />
        </mesh>
        <mesh position={[-0.15, 0, 0.2]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.3, 8]} />
          <meshStandardMaterial color="#ff6b35" />
        </mesh>
        <mesh position={[0.15, 0, -0.2]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.3, 8]} />
          <meshStandardMaterial color="#ff6b35" />
        </mesh>
        <mesh position={[-0.15, 0, -0.2]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.3, 8]} />
          <meshStandardMaterial color="#ff6b35" />
        </mesh>

        {/* Hard hat */}
        <mesh position={[0, 0.85, 0.2]} castShadow>
          <cylinderGeometry args={[0.25, 0.25, 0.1, 16]} />
          <meshStandardMaterial color="#ffcc00" />
        </mesh>
        <mesh position={[0, 0.9, 0.2]} castShadow>
          <sphereGeometry args={[0.2, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#ffcc00" />
        </mesh>
      </group>

      {/* Speech bubble */}
      {showSpeechBubble && (
        <Html
          position={[
            physicsRef.current ? physicsRef.current.position.x : 0,
            physicsRef.current ? physicsRef.current.position.y + 1.2 : 1.2,
            physicsRef.current ? physicsRef.current.position.z : 0,
          ]}
          center
          distanceFactor={10}
        >
          <div className="bg-white text-black p-2 rounded-lg border-2 border-blue-500 shadow-lg whitespace-normal max-w-[200px] text-sm">
            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white"></div>
            <p className="font-medium">{speechText}</p>
          </div>
        </Html>
      )}
    </group>
  )
}

// Floor component
function Floor() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
    type: "static",
    name: "ground",
  }))

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#111" transparent opacity={0.1} />
    </mesh>
  )
}

// Obstacle component
function Obstacle({ position }: { position: [number, number, number] }) {
  const [ref] = useBox(() => ({
    mass: 0,
    position,
    args: [1, 1, 1],
    type: "static",
    name: "obstacle",
  }))

  return (
    <mesh ref={ref} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#333" transparent opacity={0.3} />
    </mesh>
  )
}

// Chat interface component
function ChatInterface({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()

  if (!isOpen) return null

  return (
    <Card className="absolute bottom-20 right-6 w-96 h-[400px] shadow-xl z-50">
      <CardContent className="p-0 flex flex-col h-full">
        <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
          <h3 className="font-bold">Chat with Roofus</h3>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-blue-700">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="flex-1 p-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 mt-8">
              <p className="font-semibold">Hi! I'm Roofus 🏠</p>
              <p className="text-sm mt-2">Ask me anything about roofing or RoofFax services!</p>
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}>
              <div
                className={`inline-block p-3 rounded-lg ${
                  message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="text-left mb-4">
              <div className="inline-block p-3 rounded-lg bg-gray-100">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>

        <div className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}

// Main component
export default function InteractiveRoofus() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  const handleInteract = () => {
    if (!hasInteracted) {
      setHasInteracted(true)
    } else {
      setIsChatOpen(true)
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-auto z-40">
      <Suspense fallback={null}>
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[0, 5, 10]} fov={50} />

          {/* Improved lighting setup */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[-10, 10, -10]} intensity={0.5} />
          <hemisphereLight args={["#ffffff", "#60666C"]} intensity={0.5} />

          <Physics gravity={[0, -9.8, 0]}>
            <RoofusCharacter onInteract={handleInteract} isChatOpen={isChatOpen} />
            <Floor />

            {/* Add some obstacles for Roofus to interact with */}
            <Obstacle position={[5, 0.5, 3]} />
            <Obstacle position={[-4, 0.5, -2]} />
            <Obstacle position={[3, 0.5, -4]} />
            <Obstacle position={[-2, 0.5, 5]} />
          </Physics>
        </Canvas>
      </Suspense>

      <ChatInterface isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  )
}
