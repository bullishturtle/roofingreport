"use client"

import { useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"

function RoofusModel() {
  const modelRef = useRef()

  return (
    <mesh ref={modelRef} position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#FFD700" />
    </mesh>
  )
}

export function SimpleRoofusModel() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} shadows>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <RoofusModel />
      <OrbitControls enablePan={false} enableZoom={false} />
      <Environment preset="city" />
    </Canvas>
  )
}
