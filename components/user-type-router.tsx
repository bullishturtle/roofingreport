"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function UserTypeRouter() {
  const [activeTab, setActiveTab] = useState<"homeowner" | "professional">("homeowner")

  return (
    <section className="py-12 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Choose Your Path</h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            RoofFax serves both homeowners and roofing professionals with tailored solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button
              variant={activeTab === "homeowner" ? "default" : "outline"}
              className={cn("px-8 py-2 text-lg", activeTab === "homeowner" ? "bg-primary text-white" : "")}
              onClick={() => setActiveTab("homeowner")}
            >
              I'm a Homeowner
            </Button>
            <Button
              variant={activeTab === "professional" ? "default" : "outline"}
              className={cn("px-8 py-2 text-lg", activeTab === "professional" ? "bg-primary text-white" : "")}
              onClick={() => setActiveTab("professional")}
            >
              I'm a Professional
            </Button>
          </div>

          <div className="w-full max-w-4xl mt-8">
            {activeTab === "homeowner" && (
              <div className="space-y-4 animate-in fade-in-50">
                <h3 className="text-2xl font-bold">For Homeowners</h3>
                <p className="text-gray-500">
                  Get comprehensive information about your roof's condition, history, and value. Make informed decisions
                  about repairs, replacements, and home purchases.
                </p>
                <div className="flex justify-center mt-6">
                  <Button asChild>
                    <a href="#homeowner-features">Learn More</a>
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "professional" && (
              <div className="space-y-4 animate-in fade-in-50">
                <h3 className="text-2xl font-bold">For Professionals</h3>
                <p className="text-gray-500">
                  Access detailed roof data, generate professional reports, and build trust with your clients.
                  Streamline your workflow and grow your business with RoofFax Pro.
                </p>
                <div className="flex justify-center mt-6">
                  <Button asChild>
                    <a href="#pro-features">Learn More</a>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
