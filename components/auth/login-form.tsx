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
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
  rememberMe: z.boolean().optional(),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Initialize form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  // Handle form submission
  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)

    try {
      // In a real implementation, you would call your authentication API
      // For now, we'll simulate a successful login
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Show success message
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      })

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Error",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md border-neon-gold/30 bg-black/50 backdrop-blur-md shadow-neon-glow">
      <CardHeader>
        <CardTitle className="text-2xl text-white">Welcome back</CardTitle>
        <CardDescription className="text-white/70">Sign in to your RoofFax account</CardDescription>
      </CardHeader>
      <CardContent>
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

            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-neon-gold data-[state=checked]:border-neon-gold"
                      />
                    </FormControl>
                    <FormLabel className="text-sm text-white cursor-pointer">Remember me</FormLabel>
                  </FormItem>
                )}
              />

              <Link href="/forgot-password" className="text-sm text-neon-gold hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-neon-gold to-neon-orange hover:from-neon-orange hover:to-neon-gold text-black border-none shadow-neon-glow"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-white/70">
          Don't have an account?{" "}
          <Link href="/signup" className="text-neon-gold hover:underline">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
