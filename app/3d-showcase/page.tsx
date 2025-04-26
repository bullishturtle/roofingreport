import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ClientModelWrapper } from "@/components/3d/client-model-wrapper"

export default function ThreeDShowcasePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-black to-blue-950">
      <header className="sticky top-0 z-50 w-full border-b border-neon-gold/20 bg-black/50 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 text-white" />
                <span className="sr-only">Back to Home</span>
              </Link>
            </Button>
            <span className="text-xl font-bold text-white">
              Roof<span className="text-neon-gold">Fax</span> 3D Showcase
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white mb-4">
              Meet <span className="text-neon-gold">Roofus</span> in 3D
            </h1>
            <p className="text-white/70 text-lg">
              Interact with our canine appraiser in full 3D. Rotate, zoom, and see different animations!
            </p>
          </div>

          {/* 3D Model - Loaded client-side */}
          <ClientModelWrapper />

          <div className="bg-black/30 backdrop-blur-md border border-neon-gold/20 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">How to Interact</h2>
            <ul className="space-y-2 text-white/70">
              <li>
                • <span className="text-neon-gold">Left-click + drag</span>: Rotate the camera around Roofus
              </li>
              <li>
                • <span className="text-neon-gold">Scroll</span>: Zoom in and out
              </li>
              <li>
                • <span className="text-neon-gold">Animation buttons</span>: Change Roofus's animations
              </li>
              <li>
                • <span className="text-neon-gold">View buttons</span>: Change camera angle
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
