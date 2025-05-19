"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useUser } from "@/contexts/user-context"
import { useToast } from "@/components/ui/toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  userType: z.enum(["Homeowner", "Pro"], {
    required_error: "Please select a user type",
  }),
})

export function RegisterForm() {
  const { register } = useUser()
  const { showToast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const [userEmail, setUserEmail] = useState("")

  // Get user type from URL if available
  const searchParams = useSearchParams()
  const userTypeParam = searchParams?.get("userType") as "Homeowner" | "Pro" | null

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      userType: userTypeParam || undefined,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    console.log(`📝 Registration attempt for ${values.email} as ${values.userType}`)

    try {
      const result = await register(values.name, values.email, values.password, values.userType)

      if (result.success) {
        console.log(`✅ Registration successful for ${values.email}`)
        setRegistrationSuccess(true)
        setUserEmail(values.email)
        form.reset()
      } else {
        console.error(`❌ Registration failed for ${values.email}: ${result.error}`)
        showToast("Registration failed", "error", result.error || "An error occurred during registration")
      }
    } catch (error) {
      console.error("❌ Unexpected registration error:", error)
      showToast("Registration failed", "error", "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (registrationSuccess) {
    return (
      <div className="space-y-6">
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-700">
            Registration successful! We&apos;ve sent a verification email to <strong>{userEmail}</strong>. Please check
            your inbox and click the verification link to complete your registration.
          </AlertDescription>
        </Alert>

        <div className="text-center space-y-4">
          <p className="text-sm text-gray-600">
            Didn&apos;t receive the email?{" "}
            <Link
              href={`/resend-verification?email=${encodeURIComponent(userEmail)}`}
              className="text-yellow-600 hover:text-yellow-500"
            >
              Resend verification email
            </Link>
          </p>

          <Button asChild variant="outline">
            <Link href="/login">Go to Login</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="name@example.com" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="userType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>I am a</FormLabel>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    type="button"
                    variant={field.value === "Homeowner" ? "default" : "outline"}
                    onClick={() => form.setValue("userType", "Homeowner")}
                    className={field.value === "Homeowner" ? "border-2 border-yellow-500" : ""}
                  >
                    Homeowner
                  </Button>
                  <Button
                    type="button"
                    variant={field.value === "Pro" ? "default" : "outline"}
                    onClick={() => form.setValue("userType", "Pro")}
                    className={field.value === "Pro" ? "border-2 border-yellow-500" : ""}
                  >
                    Roofing Pro
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-yellow-600 hover:text-yellow-500">
          Log in
        </Link>
      </div>
    </div>
  )
}
