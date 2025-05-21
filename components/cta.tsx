import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight } from "lucide-react"

export default function CTA() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to protect your investment?
            </h2>
            <p className="mt-4 text-lg opacity-90">
              Join thousands of satisfied homeowners who trust RoofFax for their roofing needs.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-medium mb-4">Get a free consultation</h3>
            <form className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Your name"
                  className="bg-white/20 border-white/30 placeholder:text-white/70"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email address"
                  className="bg-white/20 border-white/30 placeholder:text-white/70"
                />
              </div>
              <div>
                <Input
                  type="tel"
                  placeholder="Phone number"
                  className="bg-white/20 border-white/30 placeholder:text-white/70"
                />
              </div>
              <Button size="lg" className="w-full bg-white text-primary hover:bg-white/90">
                Schedule Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
