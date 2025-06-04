import Image from "next/image"

// TODO: Replace with actual partner data and logo paths
const partnersData = [
  {
    name: "Florida Roofing & Sheet Metal Contractors Association (FRSA)",
    logo: "/images/partner-logo-frsa.png", // Example: Replace with actual path
    width: 180,
    height: 60,
  },
  {
    name: "National Roofing Contractors Association (NRCA)",
    logo: "/images/partner-logo-nrca.png", // Example: Replace with actual path
    width: 160,
    height: 60,
  },
  {
    name: "Certified Contractors Network (CCN)",
    logo: "/images/partner-logo-ccn.png", // Example: Replace with actual path
    width: 150,
    height: 60,
  },
  // Add more actual partners
]

export function PartnersSection() {
  return (
    <section className="py-12 bg-white border-t border-b border-gray-200">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Trusted by Industry Leaders</p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 md:gap-x-12">
          {partnersData.map((partner) => (
            <div key={partner.name} className="flex items-center justify-center" title={partner.name}>
              <Image
                src={partner.logo || "/placeholder.svg"} // Use actual logo path
                alt={`${partner.name} logo`}
                width={partner.width}
                height={partner.height}
                className="opacity-70 hover:opacity-100 transition-opacity object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
