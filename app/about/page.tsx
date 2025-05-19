import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-6 text-white">About RoofFax</h1>

          <div className="prose prose-invert max-w-none">
            <p className="mb-6 text-lg text-gray-300">RoofFax – The Smartest Roof & Property Report in the World</p>

            <p className="mb-6 text-gray-300">
              At RoofFax, we're redefining how homeowners and roofing professionals assess, verify, and act on roof and
              property data. Our mission is simple: deliver truth, transparency, and technology in an industry often
              clouded by confusion and outdated methods.
            </p>

            <p className="mb-8 text-gray-300">
              Whether you're a homeowner navigating a storm claim or a contractor closing your next project, RoofFax
              equips you with instant, AI-powered insights that matter.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Our Technology</h2>
            <p className="mb-6 text-gray-300">
              Using advanced machine learning algorithms and high-resolution imagery, our platform can detect roof
              damage, estimate material quantities, and provide accurate measurements. This technology allows us to
              deliver detailed reports without the need for physical roof inspections in many cases.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Our Commitment</h2>
            <p className="mb-6 text-gray-300">
              We're committed to bringing transparency to the roofing industry through data-driven insights and
              cutting-edge technology. By providing accurate, comprehensive reports, we help homeowners make informed
              decisions and empower contractors to work more efficiently.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">Our Team</h2>
            <p className="mb-6 text-gray-300">
              Our team consists of experienced roofing professionals, data scientists, and software engineers who are
              passionate about revolutionizing the roofing industry. With decades of combined experience, we understand
              the challenges faced by both homeowners and contractors.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
