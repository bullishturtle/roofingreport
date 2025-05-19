import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { Stats } from "@/components/stats"
import { Features } from "@/components/features"
import { Footer } from "@/components/footer"
import { Testimonials } from "@/components/testimonials"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#0a0d17]">
      <Header />
      <Hero />
      <Stats />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Footer />
    </main>
  )
}
