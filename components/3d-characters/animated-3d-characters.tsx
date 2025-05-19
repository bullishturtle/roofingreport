"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Physics, useBox, usePlane } from "@react-three/cannon"
import { OrbitControls, PerspectiveCamera, Html } from "@react-three/drei"
import type * as THREE from "three"
import { usePathname } from "next/navigation"
import { useMediaQuery } from "@/hooks/use-media-query"
import { checkWebGLSupport } from "@/lib/3d-utils"
import { useToast } from "@/components/ui/toast"

// Animation states
type AnimationState = "idle" | "running" | "jumping" | "pointing" | "waving" | "climbing"

// Character controller for Roofus - using primitive shapes instead of GLB models
function RoofusCharacter({
  position = [0, 0, 0],
  animation = "idle",
  direction = "right",
  onInteract,
}: {
  position?: [number, number, number]
  animation?: AnimationState
  direction?: "left" | "right"
  onInteract?: () => void
}) {
  const group = useRef<THREE.Group>(null)
  const [physicsRef, physicsApi] = useBox(() => ({
    mass: 1,
    position,
    args: [0.5, 1, 0.5],
    fixedRotation: true,
    onCollide: (e) => {
      if (e.body.name === "landon") {
        onInteract?.()
      }
    },
  }))

  // Handle animation changes
  useEffect(() => {
    // Simple animation handling
    if (animation === "running") {
      const interval = setInterval(() => {
        if (group.current) {
          group.current.position.y = group.current.position.y + 0.1
          setTimeout(() => {
            if (group.current) {
              group.current.position.y = group.current.position.y - 0.1
            }
          }, 150)
        }
      }, 300)

      return () => clearInterval(interval)
    }

    if (animation === "jumping" && group.current) {
      group.current.position.y += 0.5
      setTimeout(() => {
        if (group.current) {
          group.current.position.y -= 0.5
        }
      }, 500)
    }
  }, [animation])

  // Handle direction changes
  useEffect(() => {
    if (group.current) {
      group.current.rotation.y = direction === "left" ? Math.PI : 0
    }
  }, [direction])

  // Update physics body position to match animation
  useFrame(() => {
    if (group.current && physicsRef.current) {
      const physicsPosition = physicsRef.current.position
      group.current.position.set(physicsPosition.x, physicsPosition.y, physicsPosition.z)
    }
  })

  return (
    <group ref={group}>
      <mesh ref={physicsRef} name="roofus" visible={false} />

      {/* Fox character made with primitive shapes */}
      <group scale={[0.5, 0.5, 0.5]}>
        {/* Body */}
        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[0.8, 16, 16]} />
          <meshStandardMaterial color="#FF8C00" />
        </mesh>

        {/* Head */}
        <mesh position={[0, 1.2, 0.4]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial color="#FF8C00" />
        </mesh>

        {/* Ears */}
        <mesh position={[0.3, 1.6, 0.4]} rotation={[0, 0, 0.3]}>
          <coneGeometry args={[0.2, 0.5, 16]} />
          <meshStandardMaterial color="#FF8C00" />
        </mesh>
        <mesh position={[-0.3, 1.6, 0.4]} rotation={[0, 0, -0.3]}>
          <coneGeometry args={[0.2, 0.5, 16]} />
          <meshStandardMaterial color="#FF8C00" />
        </mesh>

        {/* Snout */}
        <mesh position={[0, 1.1, 0.8]}>
          <coneGeometry args={[0.2, 0.4, 16]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#FFD700" />
        </mesh>

        {/* Eyes */}
        <mesh position={[0.2, 1.3, 0.7]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="black" />
        </mesh>
        <mesh position={[-0.2, 1.3, 0.7]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="black" />
        </mesh>

        {/* Tail */}
        <mesh position={[0, 0.3, -0.8]} rotation={[0.5, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.3, 1, 16]} />
          <meshStandardMaterial color="#FF8C00" />
        </mesh>
      </group>
    </group>
  )
}

// Character controller for Landon - using primitive shapes instead of GLB models
function LandonCharacter({
  position = [0, 0, 0],
  animation = "idle",
  onInteract,
}: {
  position?: [number, number, number]
  animation?: AnimationState
  onInteract?: () => void
}) {
  const group = useRef<THREE.Group>(null)
  const [physicsRef, physicsApi] = useBox(() => ({
    mass: 1,
    position,
    args: [0.5, 1, 0.5],
    fixedRotation: true,
    onCollide: (e) => {
      if (e.body.name === "roofus") {
        onInteract?.()
      }
    },
  }))

  // Handle animation changes
  useEffect(() => {
    // Simple animation handling
    if (animation === "running") {
      const interval = setInterval(() => {
        if (group.current) {
          group.current.position.y = group.current.position.y + 0.1
          setTimeout(() => {
            if (group.current) {
              group.current.position.y = group.current.position.y - 0.1
            }
          }, 150)
        }
      }, 300)

      return () => clearInterval(interval)
    }

    if (animation === "jumping" && group.current) {
      group.current.position.y += 0.5
      setTimeout(() => {
        if (group.current) {
          group.current.position.y -= 0.5
        }
      }, 500)
    }
  }, [animation])

  // Update physics body position to match animation
  useFrame(() => {
    if (group.current && physicsRef.current) {
      const physicsPosition = physicsRef.current.position
      group.current.position.set(physicsPosition.x, physicsPosition.y, physicsPosition.z)
    }
  })

  return (
    <group ref={group}>
      <mesh ref={physicsRef} name="landon" visible={false} />

      {/* Human character made with primitive shapes */}
      <group scale={[0.5, 0.5, 0.5]}>
        {/* Body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 2, 0.5]} />
          <meshStandardMaterial color="#3B82F6" />
        </mesh>

        {/* Head */}
        <mesh position={[0, 1.5, 0]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial color="#F5DEB3" />
        </mesh>

        {/* Hair */}
        <mesh position={[0, 1.7, 0]}>
          <boxGeometry args={[0.6, 0.2, 0.6]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>

        {/* Eyes */}
        <mesh position={[0.2, 1.5, 0.3]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="black" />
        </mesh>
        <mesh position={[-0.2, 1.5, 0.3]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="black" />
        </mesh>

        {/* Arms */}
        <mesh position={[0.7, 0.5, 0]} rotation={[0, 0, -0.2]}>
          <boxGeometry args={[0.3, 1.5, 0.3]} />
          <meshStandardMaterial color="#3B82F6" />
        </mesh>
        <mesh position={[-0.7, 0.5, 0]} rotation={[0, 0, 0.2]}>
          <boxGeometry args={[0.3, 1.5, 0.3]} />
          <meshStandardMaterial color="#3B82F6" />
        </mesh>

        {/* Legs */}
        <mesh position={[0.3, -1.2, 0]}>
          <boxGeometry args={[0.4, 1.5, 0.4]} />
          <meshStandardMaterial color="#1F2937" />
        </mesh>
        <mesh position={[-0.3, -1.2, 0]}>
          <boxGeometry args={[0.4, 1.5, 0.4]} />
          <meshStandardMaterial color="#1F2937" />
        </mesh>
      </group>
    </group>
  )
}

// Speech bubble component
function SpeechBubble({ text, position }: { text: string; position: [number, number, number] }) {
  const { camera } = useThree()

  return (
    <Html position={position} center transform sprite>
      <div className="bg-white text-black p-2 rounded-lg border-2 border-neon-gold shadow-neon-glow whitespace-normal max-w-[200px] text-sm">
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white"></div>
        <p className="font-medium">{text}</p>
      </div>
    </Html>
  )
}

// Environment setup
function Environment3D() {
  // Create a floor
  const [floorRef] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.5, 0],
  }))

  // Create some obstacles
  const [box1Ref] = useBox(() => ({
    mass: 0,
    position: [3, 0, 0],
    args: [1, 1, 1],
  }))

  const [box2Ref] = useBox(() => ({
    mass: 0,
    position: [-3, 0, 0],
    args: [1, 1, 1],
  }))

  return (
    <>
      <mesh ref={floorRef} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      <mesh ref={box1Ref} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>

      <mesh ref={box2Ref} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#3B82F6" />
      </mesh>

      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
    </>
  )
}

// Fallback component when WebGL is not supported
function WebGLFallback() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 opacity-30">
      <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs p-2 rounded">
        3D animations disabled - WebGL not supported
      </div>
    </div>
  )
}

// Main component
export function Animated3DCharacters() {
  const pathname = usePathname()
  const isMobile = useMediaQuery("(max-width: 768px)")
  const { showToast } = useToast()
  const [webGLSupported, setWebGLSupported] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Don't show on certain pages
  const shouldRender = !(pathname === "/login" || pathname === "/signup")

  const [roofusPosition, setRoofusPosition] = useState<[number, number, number]>([2, 0, 0])
  const [landonPosition, setLandonPosition] = useState<[number, number, number]>([0, 0, 0])
  const [roofusAnimation, setRoofusAnimation] = useState<AnimationState>("idle")
  const [landonAnimation, setLandonAnimation] = useState<AnimationState>("idle")
  const [roofusDirection, setRoofusDirection] = useState<"left" | "right">("right")
  const [showSpeechBubble, setShowSpeechBubble] = useState(false)
  const [speechText, setSpeechText] = useState("")
  const [isChasing, setIsChasing] = useState(false)
  const [userInactive, setUserInactive] = useState(false)
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null)

  // Check WebGL support
  useEffect(() => {
    try {
      const supported = checkWebGLSupport()
      setWebGLSupported(supported)

      if (!supported) {
        console.warn("WebGL not supported - 3D animations disabled")
      }
    } catch (error) {
      console.error("Error checking WebGL support:", error)
      setWebGLSupported(false)
    }
  }, [])

  // Reset inactivity timer whenever user moves mouse or types
  const resetInactivityTimer = () => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current)
    }

    setUserInactive(false)

    inactivityTimer.current = setTimeout(() => {
      setUserInactive(true)
    }, 60000) // 1 minute of inactivity
  }

  // Initialize event listeners and timers
  useEffect(() => {
    if (!webGLSupported) return

    try {
      // Set up event listeners for user activity
      window.addEventListener("mousemove", resetInactivityTimer)
      window.addEventListener("keydown", resetInactivityTimer)
      window.addEventListener("click", resetInactivityTimer)
      window.addEventListener("scroll", resetInactivityTimer)
      window.addEventListener("touchstart", resetInactivityTimer)
      window.addEventListener("touchmove", resetInactivityTimer)

      resetInactivityTimer()

      // Start chase sequence
      const startChase = () => {
        setIsChasing(true)
        setRoofusAnimation("running")
        setLandonAnimation("running")

        // Move characters around
        const chaseInterval = setInterval(() => {
          try {
            const newX = Math.random() * 6 - 3
            const newZ = Math.random() * 6 - 3

            setRoofusPosition([newX, 0, newZ])
            setRoofusDirection(newX > landonPosition[0] ? "right" : "left")

            setTimeout(() => {
              setLandonPosition([newX - 1, 0, newZ])
            }, 500)
          } catch (error) {
            console.error("Error in chase animation:", error)
            clearInterval(chaseInterval)
            setHasError(true)
          }
        }, 3000)

        // End chase after some time
        setTimeout(() => {
          clearInterval(chaseInterval)
          setIsChasing(false)
          setRoofusAnimation("idle")
          setLandonAnimation("idle")

          setSpeechText("You got me! Let's help this customer!")
          setShowSpeechBubble(true)

          setTimeout(() => {
            setShowSpeechBubble(false)
          }, 3000)
        }, 15000)

        return () => clearInterval(chaseInterval)
      }

      // Start chase randomly
      const chaseTimer = setTimeout(() => {
        if (Math.random() > 0.5) {
          startChase()
        }
      }, 10000)

      return () => {
        window.removeEventListener("mousemove", resetInactivityTimer)
        window.removeEventListener("keydown", resetInactivityTimer)
        window.removeEventListener("click", resetInactivityTimer)
        window.removeEventListener("scroll", resetInactivityTimer)
        window.removeEventListener("touchstart", resetInactivityTimer)
        window.removeEventListener("touchmove", resetInactivityTimer)

        if (inactivityTimer.current) {
          clearTimeout(inactivityTimer.current)
        }

        clearTimeout(chaseTimer)
      }
    } catch (error) {
      console.error("Error setting up 3D animation:", error)
      setHasError(true)
      showToast("3D animations disabled due to an error", "error")
      return () => {}
    }
  }, [landonPosition, webGLSupported, showToast])

  // Handle character interaction
  const handleInteraction = () => {
    if (!showSpeechBubble) {
      setSpeechText("Hey! Let's help this customer with their roof!")
      setShowSpeechBubble(true)

      setTimeout(() => {
        setShowSpeechBubble(false)
      }, 3000)
    }
  }

  // Add this check to prevent server-side rendering
  if (typeof window === "undefined" || !shouldRender || hasError || !webGLSupported) {
    return webGLSupported ? null : <WebGLFallback />
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      <Canvas
        shadows
        onError={(error) => {
          console.error("Canvas error:", error)
          setHasError(true)
          showToast("3D animations disabled due to an error", "error")
        }}
      >
        <Suspense fallback={null}>
          <Physics>
            <PerspectiveCamera makeDefault position={[0, 5, 10]} />
            <Environment3D />

            <RoofusCharacter
              position={roofusPosition}
              animation={roofusAnimation}
              direction={roofusDirection}
              onInteract={handleInteraction}
            />

            <LandonCharacter position={landonPosition} animation={landonAnimation} onInteract={handleInteraction} />

            {showSpeechBubble && (
              <SpeechBubble
                text={speechText}
                position={[roofusPosition[0], roofusPosition[1] + 2, roofusPosition[2]]}
              />
            )}

            <OrbitControls enableZoom={false} enablePan={false} />
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  )
}
