"use client"

import { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, useGLTF } from "@react-three/drei"
import { Suspense } from "react"

function RoofModel({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath)
  return <primitive object={scene} scale={1} position={[0, 0, 0]} />
}

export function Roof3DViewer() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Loading 3D viewer...</p>
      </div>
    )
  }

  return (
    <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-200">
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <RoofModel modelPath="/assets/3d/duck.glb" />
          <Environment preset="sunset" />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  )
}
