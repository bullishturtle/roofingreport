import Image from "next/image"

export function AboutSection() {
  return (
    <section id="about" className="py-16 bg-blue-50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-600">Our Mission</h2>
            <p className="text-gray-600 md:text-xl">
              RoofFax Report is here to help homeowners understand their roof conditions, simulate roof inspections, and
              provide valuable insights into potential roof repairs. [^1]
            </p>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Why RoofFax?</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-2 rounded-full bg-blue-600 p-1 text-white">✓</span>
                  <span>Accurate roof assessments without climbing ladders</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 rounded-full bg-blue-600 p-1 text-white">✓</span>
                  <span>Historical data on weather events affecting your property</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 rounded-full bg-blue-600 p-1 text-white">✓</span>
                  <span>Transparent information for homebuyers and sellers</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 rounded-full bg-blue-600 p-1 text-white">✓</span>
                  <span>Professional tools for contractors, realtors, and insurance agents</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-xl">
            <Image src="/images/new.png" alt="Roofus and a roofing professional" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
