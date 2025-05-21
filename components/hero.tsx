import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Roof Inspections <span className="text-primary">Made Simple</span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Get comprehensive roof reports, find trusted professionals, and protect your investment with RoofFax™.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative h-[400px] w-full">
            <Image src="/images/roofus.png" alt="Roofus the RoofFax mascot" fill className="object-contain" priority />
          </div>
        </div>
      </div>
    </section>
  )
}
