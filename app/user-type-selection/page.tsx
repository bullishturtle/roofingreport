"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Briefcase, ArrowRight } from "lucide-react"
import { updateUserType } from "@/lib/user-type-detection"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function UserTypeSelectionPage() {
  const [selectedType, setSelectedType] = useState<"homeowner" | "professional" | null>(null)
  const router = useRouter()

  const handleSelection = (type: "homeowner" | "professional") => {
    setSelectedType(type)
    updateUserType(type)

    // Redirect based on user type
    if (type === "homeowner") {
      window.location.href = "https://trustthefox.com"
    } else {
      window.location.href = "https://rooffaxpro.com"
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black to-blue-950">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-4xl space-y-6">
          <div className="text-center space-y-4 mb-8">
            <div className="inline-block">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-neon-gold to-neon-orange flex items-center justify-center shadow-neon-glow">
                  <span className="text-2xl font-bold text-black">R</span>
                </div>
                <span className="text-2xl font-bold text-white">
                  Roof<span className="text-neon-gold">Fax</span>
                </span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white">Tell us who you are</h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              We'll customize your experience based on your needs. Choose the option that best describes you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              className={`bg-black/70 backdrop-blur-md border-2 ${
                selectedType === "homeowner"
                  ? "border-neon-gold shadow-neon-glow"
                  : "border-white/20 hover:border-neon-gold/50"
              } transition-all cursor-pointer`}
              onClick={() => setSelectedType("homeowner")}
            >
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <Home className={`h-5 w-5 ${selectedType === "homeowner" ? "text-neon-gold" : "text-white/70"}`} />
                  I'm a Homeowner
                </CardTitle>
                <CardDescription className="text-white/70">Looking for information about my property</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="h-2 w-2 rounded-full bg-neon-gold mt-1.5"></span>
                    <span>Get detailed roof reports and condition assessments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-2 w-2 rounded-full bg-neon-gold mt-1.5"></span>
                    <span>Verify contractors and avoid storm chasers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-2 w-2 rounded-full bg-neon-gold mt-1.5"></span>
                    <span>Track storm history and potential damage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-2 w-2 rounded-full bg-neon-gold mt-1.5"></span>
                    <span>Get fair estimates for repairs and replacements</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-gradient-to-r from-neon-gold to-neon-orange hover:from-neon-orange hover:to-neon-gold text-black shadow-neon-glow"
                  onClick={() => handleSelection("homeowner")}
                >
                  Continue as Homeowner <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card
              className={`bg-black/70 backdrop-blur-md border-2 ${
                selectedType === "professional"
                  ? "border-neon-purple shadow-neon-purple"
                  : "border-white/20 hover:border-neon-purple/50"
              } transition-all cursor-pointer`}
              onClick={() => setSelectedType("professional")}
            >
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <Briefcase
                    className={`h-5 w-5 ${selectedType === "professional" ? "text-neon-purple" : "text-white/70"}`}
                  />
                  I'm a Roofing Professional
                </CardTitle>
                <CardDescription className="text-white/70">Looking for tools to grow my business</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="h-2 w-2 rounded-full bg-neon-purple mt-1.5"></span>
                    <span>Access precise roof measurements and material calculations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-2 w-2 rounded-full bg-neon-purple mt-1.5"></span>
                    <span>Generate professional proposals and estimates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-2 w-2 rounded-full bg-neon-purple mt-1.5"></span>
                    <span>Track storm activity and identify potential leads</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-2 w-2 rounded-full bg-neon-purple mt-1.5"></span>
                    <span>Manage customer relationships and project timelines</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-blue hover:to-neon-purple text-white shadow-neon-purple"
                  onClick={() => handleSelection("professional")}
                >
                  Continue as Professional <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-white/50 text-sm">
              Not sure?{" "}
              <Link href="/" className="text-neon-gold hover:text-neon-orange">
                Return to home page
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
