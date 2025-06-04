import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

// TODO: Replace with actual testimonial data and avatar image paths
const testimonialsData = [
  {
    name: "Michael Johnson",
    role: "Roofing Contractor",
    company: "Johnson Roofing Experts",
    avatar: "/images/avatar-michael-johnson.jpg", // Example: Replace with actual path
    content:
      "RoofFax has completely transformed how we approach new clients. The detailed reports give us credibility and help homeowners understand their roof's condition before we even arrive.",
    rating: 5,
  },
  {
    name: "Sarah Williams",
    role: "Homeowner",
    company: "Tampa, FL",
    avatar: "/images/avatar-sarah-williams.jpg", // Example: Replace with actual path
    content:
      "When a contractor showed up at my door after a storm, I used RoofFax to verify their credentials. Turns out they weren't licensed! RoofFax saved me from a potential scam.",
    rating: 5,
  },
  // Add more actual testimonials
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trusted by Professionals & Homeowners</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See what our users are saying about their experience with RoofFax.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <Card key={index} className="border border-gray-200 shadow-sm flex flex-col">
              <CardContent className="p-6 space-y-4 flex-grow">
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-orange-500 text-orange-500" />
                  ))}
                </div>
                <p className="text-gray-700 italic flex-grow">&ldquo;{testimonial.content}&rdquo;</p>
              </CardContent>
              <div className="p-6 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={`${testimonial.name}, ${testimonial.role}`}
                    />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
