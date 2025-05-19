import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Your Roof Report?</h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Don't wait for leaks or damage to appear. Get a comprehensive assessment of your roof's condition today.
        </p>
        <Button asChild className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6 h-auto">
          <Link href="#top">Get Your Report Now</Link>
        </Button>
      </div>
    </section>
  )
}
