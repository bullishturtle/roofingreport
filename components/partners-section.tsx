export function PartnersSection() {
  const partners = [
    {
      name: "Florida Roofing Association",
      logo: "/placeholder.svg?height=60&width=180",
    },
    {
      name: "Tampa Chamber of Commerce",
      logo: "/placeholder.svg?height=60&width=180",
    },
    {
      name: "Florida Insurance Council",
      logo: "/placeholder.svg?height=60&width=180",
    },
    {
      name: "Property Owners Association",
      logo: "/placeholder.svg?height=60&width=180",
    },
    {
      name: "Florida Contractors Alliance",
      logo: "/placeholder.svg?height=60&width=180",
    },
  ]

  return (
    <section className="py-12 bg-white border-t border-b border-gray-200">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Trusted by Industry Leaders</p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {partners.map((partner, index) => (
            <div key={index} className="flex items-center justify-center">
              <img
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                className="h-12 md:h-16 opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
