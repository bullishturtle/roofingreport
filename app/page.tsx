import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "RoofFax - The World's Smartest Roof & Property Report",
  description:
    "RoofFax delivers truth, transparency, and technology with instant, AI-powered roof and property insights for homeowners and roofing professionals.",
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Header />
      <main className="flex-1 p-4">
        <h1 className="text-4xl font-bold text-white">Welcome to RoofFax</h1>
        <p className="mt-4 text-gray-300">
          The World's Smartest Roof & Property Report. Delivering truth, transparency, and technology.
        </p>
      </main>
      <Footer />
    </div>
  )
}
