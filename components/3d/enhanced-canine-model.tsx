"use client"

import { useState, useRef, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useGLTF, useAnimations, Html } from "@react-three/drei"
import * as THREE from "three"

// Enhanced model with better animations and visual effects
function EnhancedCanineModel({
  position = [0, 0, 0],
  scale = 1,
  onInteract,
  highlightMaterial = false,
  animationSpeed = 1,
  ...props
}) {
  const group = useRef()
  const { scene, animations } = useGLTF("/models/Canine_Appraiser_here_0426083524_texture.glb")
  const { actions, names, mixer } = useAnimations(animations, group)
  const [currentAnimation, setCurrentAnimation] = useState(null)
  const [isHovered, setIsHovered] = useState(false)
  const [showBubble, setShowBubble] = useState(false)
  const [bubbleText, setBubbleText] = useState("Hey there! I'm Roofus, your roofing expert!")
  const [animationQueue, setAnimationQueue] = useState([])
  const { camera } = useThree()

  // Apply custom materials if needed
  useEffect(() => {
    if (highlightMaterial && scene) {
      scene.traverse((child) => {
        if (child.isMesh && child.material) {
          // Store original material
          child.userData.originalMaterial = child.material.clone()

          // Create enhanced material
          const newMaterial = new THREE.MeshStandardMaterial({
            map: child.material.map,
            emissive: new THREE.Color(0xffcc00),
            emissiveIntensity: 0.2,
            metalness: 0.7,
            roughness: 0.3,
          })

          child.material = newMaterial
        }
      })
    }

    return () => {
      // Restore original materials
      if (scene) {
        scene.traverse((child) => {
          if (child.isMesh && child.userData.originalMaterial) {
            child.material = child.userData.originalMaterial
          }
        })
      }
    }
  }, [scene, highlightMaterial])

  // Initialize animations
  useEffect(() => {
    if (names.length > 0) {
      console.log("Available animations:", names)

      // Find the best idle animation
      const idleAnim =
        names.find(
          (name) =>
            name.toLowerCase().includes("idle") ||
            name.toLowerCase().includes("stand") ||
            name.toLowerCase().includes("rest"),
        ) || names[0]

      setCurrentAnimation(idleAnim)

      // Set animation speed
      if (mixer) {
        mixer.timeScale = animationSpeed
      }

      // Play the animation
      if (actions[idleAnim]) {
        actions[idleAnim].reset().fadeIn(0.5).play()
      }
    }

    return () => {
      // Clean up animations
      Object.values(actions).forEach((action) => {
        if (action) action.fadeOut(0.5)
      })
    }
  }, [actions, names, mixer, animationSpeed])

  // Process animation queue
  useEffect(() => {
    if (animationQueue.length > 0 && !mixer?.isPlaying) {
      const nextAnim = animationQueue[0]
      setAnimationQueue((prev) => prev.slice(1))

      playAnimation(nextAnim)
    }
  }, [animationQueue, mixer?.isPlaying])

  // Play a specific animation with proper transitions
  const playAnimation = (animName) => {
    if (!actions[animName]) return

    // Fade out current animation
    if (currentAnimation && actions[currentAnimation]) {
      actions[currentAnimation].fadeOut(0.3)
    }

    // Play new animation
    actions[animName].reset().fadeIn(0.3).play()
    setCurrentAnimation(animName)

    // Get animation duration
    const duration = actions[animName].getClip().duration

    // Return to idle after animation completes
    setTimeout(
      () => {
        const idleAnim =
          names.find((name) => name.toLowerCase().includes("idle") || name.toLowerCase().includes("stand")) || names[0]

        if (currentAnimation !== idleAnim) {
          actions[animName].fadeOut(0.3)
          actions[idleAnim].reset().fadeIn(0.3).play()
          setCurrentAnimation(idleAnim)
        }
      },
      (duration * 1000) / animationSpeed,
    )
  }

  // Queue an animation to play
  const queueAnimation = (animName) => {
    if (actions[animName]) {
      setAnimationQueue((prev) => [...prev, animName])
    }
  }

  // Handle interaction
  const handleClick = () => {
    // Find appropriate greeting animation
    const greetingAnim = names.find(
      (name) =>
        name.toLowerCase().includes("wave") ||
        name.toLowerCase().includes("greet") ||
        name.toLowerCase().includes("hello") ||
        name.toLowerCase().includes("talk"),
    )

    if (greetingAnim) {
      playAnimation(greetingAnim)
    }

    // Show speech bubble
    setBubbleText("Hi there! I'm Roofus, your AI roofing assistant. How can I help you today?")
    setShowBubble(true)
    setTimeout(() => setShowBubble(false), 5000)

    // Call parent callback
    if (onInteract) onInteract()
  }

  // Make model look at camera
  useFrame(() => {
    if (group.current) {
      // Calculate direction to camera
      const direction = new THREE.Vector3()
      direction.subVectors(camera.position, group.current.position)
      direction.y = 0 // Keep model upright

      // Smoothly rotate model to face camera
      const targetRotation = Math.atan2(direction.x, direction.z)
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotation, 0.05)
    }
  })

  // Random idle animations and speech bubbles
  useEffect(() => {
    if (names.length <= 1) return

    // Find all idle and gesture animations
    const idleAnimations = names.filter(
      (name) => name.toLowerCase().includes("idle") || name.toLowerCase().includes("stand"),
    )

    const gestureAnimations = names.filter(
      (name) =>
        name.toLowerCase().includes("gesture") ||
        name.toLowerCase().includes("point") ||
        name.toLowerCase().includes("nod"),
    )

    // Occasionally play random animations
    const animInterval = setInterval(() => {
      if (!showBubble && Math.random() > 0.7) {
        const randomGesture = gestureAnimations[Math.floor(Math.random() * gestureAnimations.length)]
        if (randomGesture) {
          queueAnimation(randomGesture)
        }
      }
    }, 10000)

    // Random speech bubbles
    const speeches = [
      "Need help with your roof? I'm your expert!",
      "I can analyze any roof in seconds!",
      "Want to know about storm damage? Just ask!",
      "I know all about Florida building codes!",
      "Click on me to learn more about RoofFax!",
      "I can help you find potential roof issues!",
      "Let me show you how to save on your next roof project!",
      "I have real-time weather data for your area!",
    ]

    const speechInterval = setInterval(() => {
      if (Math.random() > 0.7 && !showBubble) {
        const randomSpeech = speeches[Math.floor(Math.random() * speeches.length)]
        setBubbleText(randomSpeech)
        setShowBubble(true)

        // Find a talking animation
        const talkAnim = names.find(
          (name) => name.toLowerCase().includes("talk") || name.toLowerCase().includes("speak"),
        )

        if (talkAnim) {
          queueAnimation(talkAnim)
        }

        setTimeout(() => setShowBubble(false), 5000)
      }
    }, 15000)

    return () => {
      clearInterval(animInterval)
      clearInterval(speechInterval)
    }
  }, [names, showBubble])

  return (
    <group
      ref={group}
      {...props}
      position={position}
      scale={[scale, scale, scale]}
      onClick={handleClick}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <primitive object={scene} />

      {/* Speech bubble */}
      {showBubble && (
        <Html position={[0, 2, 0]} center>
          <div className="bg-white px-4 py-2 rounded-lg border-2 border-neon-gold shadow-neon-glow text-black text-sm w-64 relative">
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white"></div>
            {bubbleText}
          </div>
        </Html>
      )}

      {/* Interaction hint */}
      {isHovered && !showBubble && (
        <Html position={[0, 2, 0]} center>
          <div className="bg-black/80 px-2 py-1 rounded-full border border-neon-gold/50 text-neon-gold text-xs">
            Click to interact
          </div>
        </Html>
      )}

      {/* Highlight glow effect when hovered */}
      {isHovered && (
        <mesh position={[0, 0, 0]} scale={[1.05, 1.05, 1.05]}>
          <sphereGeometry args={[1.5, 16, 16]} />
          <meshBasicMaterial color="#ffd700" transparent opacity={0.1} />
        </mesh>
      )}
    </group>
  )
}

// Enhanced floating animation with more natural movement
function EnhancedFloatingAnimation({ children, speed = 1, rotationIntensity = 0.5, floatIntensity = 0.5 }) {
  const group = useRef()
  const time = useRef(0)

  useFrame((state, delta) => {
    time.current += delta

    // More natural floating motion using multiple sine waves
    group.current.position.y = Math.sin(time.current * speed) * 0.1 * floatIntensity
    group.current.position.x = Math.sin(time.current * speed * 0.8) * 0.05 * floatIntensity

    // Gentle rotation
    group.current.rotation.y = Math.sin(time.current * speed * 0.3) * 0.1 * rotationIntensity
    group.current.rotation.z = Math.sin(time.current * speed * 0.2) * 0.05 * rotationIntensity
  })

  return <group ref={group}>{children}</group>
}

// Export the enhanced model
export function EnhancedRoofusModel({
  onInteract,
  floatingAnimation = true,
  highlightMaterial = false,
  animationSpeed = 1,
}) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  const ModelComponent = () => (
    <EnhancedCanineModel
      position={[0, -0.5, 0]}
      scale={1}
      onInteract={onInteract}
      highlightMaterial={highlightMaterial}
      animationSpeed={animationSpeed}
    />
  )

  return floatingAnimation ? (
    <EnhancedFloatingAnimation speed={0.8} floatIntensity={0.7} rotationIntensity={0.3}>
      <ModelComponent />
    </EnhancedFloatingAnimation>
  ) : (
    <ModelComponent />
  )
}

export default EnhancedRoofusModel
