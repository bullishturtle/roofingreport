import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us - TheRoofFax.com",
  description: "Learn about TheRoofFax.com's mission to provide accurate and affordable roof condition reports.",
}

export default function AboutPage() {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">About TheRoofFax.com</h1>

          <div className="relative h-[300px] w-full mb-8 rounded-lg overflow-hidden">
            <Image src="/images/roofus.png" alt="Roofus the RoofFax mascot" fill style={{ objectFit: "contain" }} />
          </div>

          <div className="prose prose-lg max-w-none">
            <p>
              TheRoofFax.com was founded by Thomas Roofing & Repair Inc., a trusted name in the roofing industry for
              over 20 years. Our mission is to provide homeowners, real estate professionals, and property managers with
              accurate, detailed information about roof conditions.
            </p>

            <h2>Our Mission</h2>
            <p>
              We believe that everyone deserves to know the true condition of their roof before problems arise. Our
              AI-powered roof analysis technology makes it easy and affordable to get professional-quality roof
              assessments without the wait or high cost of traditional inspections.
            </p>

            <h2>Meet Roofus</h2>
            <p>
              Roofus, our friendly mascot, represents our commitment to making roof inspections accessible and
              understandable for everyone. Just like a loyal companion, Roofus is always there to help you understand
              your roof's condition and guide you through the process.
            </p>

            <h2>Our Technology</h2>
            <p>
              TheRoofFax.com uses advanced AI and machine learning algorithms to analyze satellite and aerial imagery of
              your roof. Our technology can detect signs of damage, wear, and potential issues that might not be visible
              from the ground. The result is a comprehensive report that helps you make informed decisions about your
              property.
            </p>

            <h2>Our Team</h2>
            <p>
              Our team consists of experienced roofing professionals, data scientists, and customer service experts who
              are passionate about helping people protect their homes and investments. We're dedicated to providing
              accurate information and excellent service to every customer.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
