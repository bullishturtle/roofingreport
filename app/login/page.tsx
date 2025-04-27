import { LoginForm } from "@/components/auth/login-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-black to-blue-950 relative overflow-hidden">
      {/* Animated stars background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
            }}
          />
        ))}
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-gold/10 blur-[100px] animate-float"></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-neon-orange/10 blur-[100px] animate-float"
        style={{ animationDelay: "1s" }}
      ></div>

      <header className="container flex h-16 items-center">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4 text-white" />
            <span className="sr-only">Back to Home</span>
          </Link>
        </Button>
      </header>

      <main className="flex-1 container flex flex-col items-center justify-center py-12">
        <div className="w-full max-w-md mb-8 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-8">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-neon-gold to-neon-orange flex items-center justify-center shadow-neon-glow">
              <span className="text-2xl font-bold text-black">R</span>
            </div>
            <span className="text-2xl font-bold text-white">
              Roof<span className="text-neon-gold">Fax</span>
            </span>
          </div>
          <LoginForm />
        </div>
      </main>
    </div>
  )
}
