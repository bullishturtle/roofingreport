"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { Physics, usePlane, useBox } from "@react-three/cannon"
import { OrbitControls, PerspectiveCamera, Html } from "@react-three/drei"
import { usePathname } from "next/navigation"
import { useMediaQuery } from "@/hooks/use-media-query"
import { checkWebGLSupport } from "@/lib/3d-utils"
import { useToast } from "@/components/ui/toast"
import { GLBModelCharacter, preloadGLBModels } from "./glb-model-character"

// Character models
const ROOFUS_MODEL_URL = "/models/roofus-character.glb"
const LANDON_MODEL_URL = "/models/landon-character.glb"

// Animation states
type AnimationState = "idle" | "running" | "jumping" | "pointing" | "waving" | "climbing"

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
export function EnhancedAnimated3DCharacters() {
  const pathname = usePathname()
  const isMobile = useMediaQuery("(max-width: 768px)")
  const { toast } = useToast()
  const [webGLSupported, setWebGLSupported] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [modelsLoaded, setModelsLoaded] = useState(false)
  const [modelErrors, setModelErrors] = useState<Record<string, boolean>>({})

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

  // Preload models
  useEffect(() => {
    if (webGLSupported) {
      try {
        preloadGLBModels([ROOFUS_MODEL_URL, LANDON_MODEL_URL])
        setModelsLoaded(true)
      } catch (error) {
        console.error("Error preloading models:", error)
        setHasError(true)
      }
    }
  }, [webGLSupported])

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
      toast({
        title: "3D animations disabled",
        description: "An error occurred while setting up 3D animations",
        variant: "destructive",
      })
      return () => {}
    }
  }, [landonPosition, webGLSupported, toast])

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

  // Handle model load errors
  const handleModelError = (modelName: string, error: Error) => {
    console.error(`Error loading ${modelName} model:`, error)
    setModelErrors((prev) => ({ ...prev, [modelName]: true }))

    toast({
      title: `Error loading ${modelName} model`,
      description: "Falling back to simplified character",
      variant: "destructive",
    })
  }

  // Add this check to prevent server-side rendering
  if (typeof window === "undefined" || !shouldRender || hasError || !webGLSupported) {
    return webGLSupported ? null : <WebGLFallback />
  }

  // Check if both models failed to load
  const allModelsFailed = modelErrors.roofus && modelErrors.landon

  if (allModelsFailed) {
    return <WebGLFallback />
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      <Canvas
        shadows
        onError={(error) => {
          console.error("Canvas error:", error)
          setHasError(true)
          toast({
            title: "3D animations disabled",
            description: "An error occurred in the 3D renderer",
            variant: "destructive",
          })
        }}
      >
        <Suspense fallback={null}>
          <Physics>
            <PerspectiveCamera makeDefault position={[0, 5, 10]} />
            <Environment3D />

            <GLBModelCharacter
              modelUrl={ROOFUS_MODEL_URL}
              position={roofusPosition}
              animation={roofusAnimation}
              direction={roofusDirection}
              name="roofus"
              onInteract={handleInteraction}
              onLoadError={(error) => handleModelError("roofus", error)}
            />

            <GLBModelCharacter
              modelUrl={LANDON_MODEL_URL}
              position={landonPosition}
              animation={landonAnimation}
              name="landon"
              onInteract={handleInteraction}
              onLoadError={(error) => handleModelError("landon", error)}
            />

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
