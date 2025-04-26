"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import Link from "next/link"

// Form validation schema
const signupSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type SignupFormValues = z.infer<typeof signupSchema>

export function SignupForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Initialize form
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  })

  // Handle form submission
  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to create account")
      }

      // Show success message
      toast({
        title: "Account created!",
        description: "Welcome to RoofFax. Check your email for confirmation.",
      })

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Signup error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create account",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md border-neon-gold/30 bg-black/50 backdrop-blur-md shadow-neon-glow">
      <CardHeader>
        <CardTitle className="text-2xl text-white">Create your account</CardTitle>
        <CardDescription className="text-white/70">Enter your information to get started with RoofFax</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      {...field}
                      className="bg-black/30 border-neon-gold/30 text-white placeholder:text-white/50 focus:border-neon-gold"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      {...field}
                      className="bg-black/30 border-neon-gold/30 text-white placeholder:text-white/50 focus:border-neon-gold"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...field}
                      className="bg-black/30 border-neon-gold/30 text-white placeholder:text-white/50 focus:border-neon-gold"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...field}
                      className="bg-black/30 border-neon-gold/30 text-white placeholder:text-white/50 focus:border-neon-gold"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border border-neon-gold/20">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-neon-gold data-[state=checked]:border-neon-gold"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-white">
                      I agree to the{" "}
                      <Link href="/terms" className="text-neon-gold hover:underline">
                        terms of service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-neon-gold hover:underline">
                        privacy policy
                      </Link>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-neon-gold to-neon-orange hover:from-neon-orange hover:to-neon-gold text-black border-none shadow-neon-glow"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-white/70">
          Already have an account?{" "}
          <Link href="/login" className="text-neon-gold hover:underline">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
