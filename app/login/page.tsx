import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black to-blue-950">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-1">
            <div className="inline-block">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-neon-gold to-neon-orange flex items-center justify-center shadow-neon-glow">
                  <span className="text-xl font-bold text-black">R</span>
                </div>
                <span className="text-xl font-bold text-white">
                  Roof<span className="text-neon-gold">Fax</span>
                </span>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white">Sign in to your account</h1>
            <p className="text-white/70 text-sm">Enter your email to sign in to your account</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                className="bg-black/30 border-neon-gold/30 text-white placeholder:text-white/50 focus:border-neon-gold"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-neon-gold hover:text-neon-orange transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                className="bg-black/30 border-neon-gold/30 text-white placeholder:text-white/50 focus:border-neon-gold"
              />
            </div>

            <Button
              className="w-full bg-gradient-to-r from-neon-gold to-neon-orange hover:from-neon-orange hover:to-neon-gold text-black shadow-neon-glow"
              type="submit"
              asChild
            >
              <Link href="/dashboard">Sign In</Link>
            </Button>

            <div className="text-center text-sm text-white/70">
              <span>Don't have an account? </span>
              <Link href="/signup" className="text-neon-gold hover:text-neon-orange transition-colors font-medium">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
