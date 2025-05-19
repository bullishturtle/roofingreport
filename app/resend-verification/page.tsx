import { ResendVerification } from "@/components/auth/resend-verification"

export default function ResendVerificationPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <ResendVerification />
      </div>
    </div>
  )
}
