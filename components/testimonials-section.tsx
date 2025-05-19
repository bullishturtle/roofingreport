import Image from "next/image"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Homeowner",
      content:
        "RoofFax.Report saved me thousands of dollars by identifying issues before they became major problems. The report was detailed and easy to understand.",
      avatar: "/woman-portrait.png",
      rating: 5,
    },
    {
      name: "Michael Thompson",
      role: "Real Estate Agent",
      content:
        "I recommend RoofFax.Report to all my clients. It provides peace of mind for buyers and helps sellers address issues before listing their homes.",
      avatar: "/thoughtful-man-portrait.png",
      rating: 5,
    },
    {
      name: "Jennifer Davis",
      role: "Property Manager",
      content:
        "Managing multiple properties is much easier with RoofFax.Report. I can quickly assess roof conditions and plan maintenance accordingly.",
      avatar: "/placeholder.svg?height=80&width=80&query=woman professional portrait",
      rating: 4,
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our customers have to say about RoofFax.Report.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
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
