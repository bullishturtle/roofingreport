"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Calendar, CheckCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"

export function DemoSignupForm() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      toast({
        title: "Demo Requested",
        description: "We'll contact you shortly to schedule your demo.",
        variant: "default",
      })

      // INTEGRATION_POINT: CRM integration for lead tracking
      console.log("Demo request submitted:", formData)
    }, 1500)
  }

  return (
    <Card className="w-full max-w-md border-2 border-neon-gold/30 bg-black/50 backdrop-blur-md shadow-neon-glow">
      <CardHeader>
        <CardTitle className="text-xl text-white">Request a Demo</CardTitle>
        <CardDescription className="text-white/70">See the full power of RoofFax Pro in action</CardDescription>
      </CardHeader>

      {!isSuccess ? (
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="John Smith"
                required
                value={formData.name}
                onChange={handleChange}
                className="bg-black/30 border-neon-gold/30 text-white placeholder:text-white/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                required
                value={formData.email}
                onChange={handleChange}
                className="bg-black/30 border-neon-gold/30 text-white placeholder:text-white/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white">
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                placeholder="(555) 123-4567"
                required
                value={formData.phone}
                onChange={handleChange}
                className="bg-black/30 border-neon-gold/30 text-white placeholder:text-white/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="text-white">
                Company Name
              </Label>
              <Input
                id="company"
                name="company"
                placeholder="Acme Roofing"
                value={formData.company}
                onChange={handleChange}
                className="bg-black/30 border-neon-gold/30 text-white placeholder:text-white/50"
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-neon-gold to-neon-orange hover:from-neon-orange hover:to-neon-gold text-black border-none shadow-neon-glow"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Schedule My Demo"
              )}
            </Button>
          </CardFooter>
        </form>
      ) : (
        <CardContent className="py-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center space-y-4"
          >
            <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Demo Request Received!</h3>
            <p className="text-white/70">
              Thank you for your interest in RoofFax Pro. One of our team members will contact you shortly to schedule
              your personalized demo.
            </p>
            <div className="flex items-center gap-2 text-neon-gold">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">Check your email for scheduling details</span>
            </div>
          </motion.div>
        </CardContent>
      )}
    </Card>
  )
}
