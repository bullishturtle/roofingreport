import Image from "next/image"
import { Star } from "lucide-react"

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Homeowner",
      image: "/woman-portrait.png",
      content:
        "TheRoofFax report saved me thousands of dollars by identifying issues before they became major problems. The detailed analysis helped me negotiate with contractors effectively.",
      rating: 5,
    },
    {
      name: "Michael Rodriguez",
      role: "Roofing Contractor",
      image: "/thoughtful-man-portrait.png",
      content:
        "As a contractor, TheRoofFax reports help me provide more accurate quotes and identify issues that might not be visible during a standard inspection. It's become an essential tool for my business.",
      rating: 5,
    },
    {
      name: "Jennifer Williams",
      role: "Real Estate Agent",
      image: "/woman-portrait.png",
      content:
        "I recommend TheRoofFax to all my clients before purchasing a home. It provides peace of mind and helps avoid unexpected expenses after closing.",
      rating: 4,
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">What Our Customers Say</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Thousands of homeowners and professionals trust TheRoofFax for accurate roof assessments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <p className="text-gray-700">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
