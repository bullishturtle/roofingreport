import Image from "next/image"

export function Testimonials() {
  const testimonials = [
    {
      quote: "I almost signed a $14K roof contract—RoofFax helped me know what to say no to.",
      name: "Sarah Johnson",
      location: "Dallas, TX",
      image: "/woman-portrait.png",
    },
    {
      quote: "The PDF helped me win the claim with my insurance adjuster.",
      name: "Michael Rodriguez",
      location: "Tampa, FL",
      image: "/thoughtful-man-portrait.png",
    },
  ]

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">What Our Users Say</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div>
                <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                <p className="font-bold text-gray-900">{testimonial.name}</p>
                <p className="text-gray-600 text-sm">{testimonial.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
