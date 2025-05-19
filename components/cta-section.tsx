import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export function CtaSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-600">
                Ready to discover your roof's story?
              </h2>
              <p className="max-w-[600px] text-gray-600 md:text-xl">
                Get your free RoofFax Report today and understand your roof's condition, history, and future needs.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <form className="flex flex-col sm:flex-row gap-2">
                <Input type="text" placeholder="Enter your property address" className="flex-1" />
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Get Report
                </Button>
              </form>
              <p className="text-xs text-gray-500">Free for homeowners. Instant results. No credit card required.</p>
            </div>
          </div>
          <div className="relative h-[300px] lg:h-[400px]">
            <Image src="/images/roofus.png" alt="Roofus the RoofFax mascot" fill className="object-contain" />
          </div>
        </div>
      </div>
    </section>
  )
}
