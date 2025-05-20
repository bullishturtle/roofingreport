"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { useToast } from "@/components/ui/toast"

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
})

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

export function ForgotPasswordForm() {
  const { showToast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  async function onSubmit(data: ForgotPasswordFormValues) {
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
        }),
      })

      if (!response.ok) {
        const result = await response.json()
        throw new Error(result.message || "Something went wrong")
      }

      setIsSubmitted(true)
      showToast("Password reset link sent to your email", "success")
    } catch (error) {
      if (error instanceof Error) {
        showToast(error.message, "error")
      } else {
        showToast("Something went wrong. Please try again.", "error")
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-black/30 p-6 rounded-lg border border-white/10 text-center">
        <Icons.check className="mx-auto h-8 w-8 text-green-500 mb-4" />
        <h3 className="text-lg font-medium text-white mb-2">Check your email</h3>
        <p className="text-sm text-white/70">We've sent a password reset link to your email address.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 bg-black/30 p-6 rounded-lg border border-white/10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              className="bg-black/50 border-white/20 text-white"
              {...register("email")}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-neon-gold to-neon-orange hover:from-neon-orange hover:to-neon-gold text-black border-none shadow-neon-glow"
          >
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Send Reset Link
          </Button>
        </div>
      </form>
    </div>
  )
}
