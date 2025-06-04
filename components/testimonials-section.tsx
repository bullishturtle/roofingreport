import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Michael Johnson",
      role: "Roofing Contractor",
      company: "Johnson Roofing",
      image: "/placeholder.svg?height=80&width=80",
      content:
        "RoofFax has completely transformed how we approach new clients. The detailed reports give us credibility and help homeowners understand their roof's condition before we even arrive.",
      rating: 5,
    },
    {
      name: "Sarah Williams",
      role: "Homeowner",
      company: "Tampa, FL",
      image: "/placeholder.svg?height=80&width=80",
      content:
        "When a contractor showed up at my door after a storm, I used RoofFax to verify their credentials. Turns out they weren't licensed! RoofFax saved me from a potential scam.",
      rating: 5,
    },
    {
      name: "David Martinez",
      role: "Insurance Adjuster",
      company: "Florida Insurance Group",
      image: "/placeholder.svg?height=80&width=80",
      content:
        "The storm timeline feature is invaluable for our claims process. It provides objective data about when damage occurred, making the claims process smoother for everyone involved.",
      rating: 5,
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trusted by Professionals & Homeowners</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See what our users are saying about their experience with RoofFax.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border border-gray-200 shadow-sm">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-orange-500 text-orange-500" />
                  ))}
                </div>

                <p className="text-gray-700 italic">&ldquo;{testimonial.content}&rdquo;</p>

                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
