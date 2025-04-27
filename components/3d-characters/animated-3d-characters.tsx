"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Physics, useBox, usePlane } from "@react-three/cannon"
import { OrbitControls, useGLTF, useAnimations, PerspectiveCamera, Html } from "@react-three/drei"
import type * as THREE from "three" // Import THREE
import { usePathname } from "next/navigation"
import { useMediaQuery } from "@/hooks/use-media-query"

// Character models
const ROOFUS_MODEL_URL = "/models/roofus-character.glb"
const LANDON_MODEL_URL = "/models/landon-character.glb"

// Animation states
type AnimationState = "idle" | "running" | "jumping" | "pointing" | "waving" | "climbing"

// Character controller for Roofus
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
  const { scene, animations } = useGLTF(ROOFUS_MODEL_URL)
  const { actions, names } = useAnimations(animations, group)
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
    // Reset all animations
    names.forEach((name) => actions[name]?.stop())

    // Play the current animation
    if (actions[animation]) {
      actions[animation]?.reset().play()
    } else {
      // Fallback to idle if animation doesn't exist
      actions["idle"]?.reset().play()
    }
  }, [actions, animation, names])

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
      group.current.position.set(physicsPosition.x, physicsPosition.y - 0.5, physicsPosition.z)
    }
  })

  return (
    <group ref={group}>
      <mesh ref={physicsRef} name="roofus" visible={false} />
      <primitive object={scene.clone()} scale={[0.5, 0.5, 0.5]} />
    </group>
  )
}

// Character controller for Landon
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
  const { scene, animations } = useGLTF(LANDON_MODEL_URL)
  const { actions, names } = useAnimations(animations, group)
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
    // Reset all animations
    names.forEach((name) => actions[name]?.stop())

    // Play the current animation
    if (actions[animation]) {
      actions[animation]?.reset().play()
    } else {
      // Fallback to idle if animation doesn't exist
      actions["idle"]?.reset().play()
    }
  }, [actions, animation, names])

  // Update physics body position to match animation
  useFrame(() => {
    if (group.current && physicsRef.current) {
      const physicsPosition = physicsRef.current.position
      group.current.position.set(physicsPosition.x, physicsPosition.y - 0.5, physicsPosition.z)
    }
  })

  return (
    <group ref={group}>
      <mesh ref={physicsRef} name="landon" visible={false} />
      <primitive object={scene.clone()} scale={[0.5, 0.5, 0.5]} />
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

// Main component
export function Animated3DCharacters() {
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
  const pathname = usePathname()
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [isRoofusVisible, setIsRoofusVisible] = useState(true)
  const [windowAvailable, setWindowAvailable] = useState(false)

  useEffect(() => {
    setWindowAvailable(true)
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
    if (!windowAvailable) return

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
        const newX = Math.random() * 6 - 3
        const newZ = Math.random() * 6 - 3

        setRoofusPosition([newX, 0, newZ])
        setRoofusDirection(newX > landonPosition[0] ? "right" : "left")

        setTimeout(() => {
          setLandonPosition([newX - 1, 0, newZ])
        }, 500)
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
      if (!windowAvailable) return

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
  }, [windowAvailable, isRoofusVisible, userInactive, isMobile, landonPosition])

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

  // Don't show on certain pages
  if (pathname === "/login" || pathname === "/signup") {
    return null
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      <Canvas shadows>
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

// Preload models
useGLTF.preload(ROOFUS_MODEL_URL)
useGLTF.preload(LANDON_MODEL_URL)
