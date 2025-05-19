"use client"

import Link from "next/link"
import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/components/ui/toast"
import { forgotPassword } from "@/actions/auth-actions"
import { CheckCircle } from "lucide-react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

export function ForgotPasswordForm() {
  const { showToast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      console.log(`🔑 Forgot password attempt for ${values.email}`)
      const result = await forgotPassword(values.email)

      if (result.success) {
        console.log(`✅ Password reset email sent to ${values.email}`)
        setIsSubmitted(true)
        showToast("Email sent", "success", result.message)
      } else {
        console.error(`❌ Forgot password failed for ${values.email}: ${result.error}`)
        showToast("Error", "error", result.error || "Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error("❌ Unexpected forgot password error:", error)
      showToast("Error", "error", "An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 text-center">
        <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
        <h3 className="text-lg font-medium text-white mb-2">Check your email</h3>
        <p className="text-sm text-slate-400 mb-4">
          If your email is registered with us, we've sent a password reset link to your email address.
        </p>
        <Button asChild variant="outline" className="w-full">
          <Link href="/login">Back to Login</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name@example.com"
                    className="bg-slate-900 border-slate-700 text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600" disabled={isLoading}>
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
