"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import { resendVerificationEmail } from "@/actions/auth-actions"
import { useToast } from "@/components/ui/toast"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import Link from "next/link"

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

interface ResendVerificationProps {
  defaultEmail?: string
}

export function ResendVerification({ defaultEmail = "" }: ResendVerificationProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { showToast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: defaultEmail,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      console.log(`📧 Resending verification email to ${values.email}`)
      const result = await resendVerificationEmail(values.email)

      if (result.success) {
        console.log(`✅ Verification email resent to ${values.email}`)
        setIsSubmitted(true)
        showToast("Verification email sent", "success", result.message)
        form.reset()
      } else {
        console.error(`❌ Resend verification failed for ${values.email}: ${result.error}`)
        showToast("Error", "error", result.error)
      }
    } catch (error) {
      console.error("❌ Unexpected resend verification error:", error)
      showToast("Error", "error", "An unexpected error occurred.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="pt-6 text-center">
          <div className="rounded-full bg-green-500/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-white mb-2">Verification Email Sent</h3>
          <p className="text-gray-400 mb-4">
            We've sent a new verification link to your email address. Please check your inbox and click the link to
            verify your account.
          </p>
          <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-black">
            <Link href="/login">Go to Login</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="pt-6">
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
                      className="bg-gray-900 border-gray-700 text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black" disabled={isLoading}>
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Sending...
                </>
              ) : (
                "Resend Verification Email"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
