import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-blue-950 p-4">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-neon-gold">404</h1>
          <h2 className="text-2xl font-bold text-white">Page Not Found</h2>
          <p className="text-white/70 max-w-md mx-auto">The page you're looking for doesn't exist or has been moved.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            className="bg-gradient-to-r from-neon-gold to-neon-orange hover:from-neon-orange hover:to-neon-gold text-black"
          >
            <Link href="/">Go Home</Link>
          </Button>
          <Button asChild variant="outline" className="border-neon-gold/30 text-neon-gold hover:bg-neon-gold/10">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
