import { EnhancedSignUpForm } from "@/components/auth/enhanced-signup-form"

export default function SignUpPage() {
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
            <h1 className="text-2xl font-bold text-white">Create an account</h1>
            <p className="text-white/70 text-sm">Enter your information to create an account</p>
          </div>

          <EnhancedSignUpForm />
        </div>
      </div>
    </div>
  )
}
