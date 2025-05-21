import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-black to-blue-950 relative overflow-hidden">
      {/* Background grid effect */}
      <div className="absolute inset-0 grid-bg opacity-20"></div>

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-gold/10 blur-[100px] animate-float"></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-neon-orange/10 blur-[100px] animate-float"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-neon-gold/20 bg-black/50 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-neon-gold to-neon-orange flex items-center justify-center shadow-neon-glow">
              <span className="text-xl font-bold text-black">R</span>
            </div>
            <span className="text-xl font-bold text-white">
              Roof<span className="text-neon-gold">Fax</span>
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="border-neon-gold/30 text-neon-gold hover:bg-neon-gold/10"
          >
            <Link href="/" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 container py-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="border-2 border-neon-gold/30 bg-black/50 backdrop-blur-md shadow-neon-glow rounded-xl overflow-hidden">
            <div className="p-6 border-b border-neon-gold/20">
              <h1 className="text-2xl font-bold text-white">Sign In</h1>
              <p className="text-sm text-white/70 mt-1">Access your RoofFax account</p>
            </div>

            <form className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="bg-black/30 border-neon-gold/30 text-white placeholder:text-white/50"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-white">
                    Password
                  </Label>
                  <Link href="/forgot-password" className="text-xs text-neon-gold hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="bg-black/30 border-neon-gold/30 text-white placeholder:text-white/50"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-neon-gold to-neon-orange hover:from-neon-orange hover:to-neon-gold text-black border-none shadow-neon-glow"
                asChild
              >
                <Link href="/dashboard">Sign In</Link>
              </Button>

              <div className="text-center">
                <p className="text-sm text-white/70">
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-neon-gold hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-neon-gold/20 py-6 bg-black/50 backdrop-blur-md">
        <div className="container flex flex-col gap-6 md:gap-0 md:h-16 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-neon-gold to-neon-orange flex items-center justify-center shadow-neon-glow">
              <span className="text-sm font-bold text-black">R</span>
            </div>
            <span className="text-sm font-bold text-white">
              Roof<span className="text-neon-gold">Fax</span>
            </span>
          </div>
          <p className="text-sm text-white/50">&copy; 2023 RoofFax. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
