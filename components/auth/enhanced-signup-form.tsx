"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { storeUserData } from "@/lib/user-storage"
import { updateUserType } from "@/lib/user-type-detection"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

export function EnhancedSignUpForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userType: "homeowner" as "homeowner" | "professional",
    company: "",
    agreeTerms: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleUserTypeChange = (value: "homeowner" | "professional") => {
    setFormData((prev) => ({
      ...prev,
      userType: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.agreeTerms) {
      toast({
        title: "Terms Required",
        description: "You must agree to the terms and conditions to continue.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Store user data in Supabase
      const result = await storeUserData({
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        userType: formData.userType,
        company: formData.userType === "professional" ? formData.company : undefined,
      })

      if (!result.success) {
        throw new Error(result.error || "Failed to create account")
      }

      // Update user type in local storage
      updateUserType(formData.userType)

      // Show success message
      toast({
        title: "Account Created!",
        description: "Your account has been successfully created with 1 free report credit.",
      })

      // Redirect based on user type
      if (formData.userType === "homeowner") {
        router.push("/dashboard?newUser=true")
      } else {
        router.push("/pro-dashboard?newUser=true")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-white">
            First name
          </Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="bg-black/30 border-neon-gold/30 text-white placeholder:text-white/50 focus:border-neon-gold"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-white">
            Last name
          </Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="bg-black/30 border-neon-gold/30 text-white placeholder:text-white/50 focus:border-neon-gold"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-white">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="name@example.com"
          required
          className="bg-black/30 border-neon-gold/30 text-white placeholder:text-white/50 focus:border-neon-gold"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-white">
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="bg-black/30 border-neon-gold/30 text-white placeholder:text-white/50 focus:border-neon-gold"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-white">I am a:</Label>
        <RadioGroup
          value={formData.userType}
          onValueChange={(value) => handleUserTypeChange(value as "homeowner" | "professional")}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="homeowner" id="homeowner" className="border-neon-gold/50 text-neon-gold" />
            <Label htmlFor="homeowner" className="text-white">
              Homeowner
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="professional" id="professional" className="border-neon-gold/50 text-neon-gold" />
            <Label htmlFor="professional" className="text-white">
              Roofing Professional
            </Label>
          </div>
        </RadioGroup>
      </div>

      {formData.userType === "professional" && (
        <div className="space-y-2">
          <Label htmlFor="company" className="text-white">
            Company Name
          </Label>
          <Input
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Your company name"
            className="bg-black/30 border-neon-gold/30 text-white placeholder:text-white/50 focus:border-neon-gold"
          />
        </div>
      )}

      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          name="agreeTerms"
          checked={formData.agreeTerms}
          onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, agreeTerms: checked === true }))}
          className="border-neon-gold/50 data-[state=checked]:bg-neon-gold data-[state=checked]:text-black"
        />
        <Label htmlFor="terms" className="text-sm text-white/70">
          I agree to the
          <Link href="/terms" className="text-neon-gold hover:text-neon-orange transition-colors ml-1">
            terms and conditions
          </Link>
        </Label>
      </div>

      <Button
        className="w-full bg-gradient-to-r from-neon-gold to-neon-orange hover:from-neon-orange hover:to-neon-gold text-black shadow-neon-glow"
        type="submit"
        disabled={isLoading}
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

      <div className="text-center text-sm text-white/70">
        <span>Already have an account? </span>
        <Link href="/login" className="text-neon-gold hover:text-neon-orange transition-colors font-medium">
          Sign in
        </Link>
      </div>
    </form>
  )
}
