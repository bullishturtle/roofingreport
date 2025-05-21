import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Homeowner",
      content:
        "RoofFax saved me thousands of dollars by identifying issues before they became major problems. The report was easy to understand and the recommended roofers were excellent.",
      rating: 5,
    },
    {
      name: "Michael Thompson",
      role: "Property Manager",
      content:
        "As someone who manages multiple properties, RoofFax has been invaluable. Their reports are thorough and the platform makes it easy to find qualified professionals.",
      rating: 5,
    },
    {
      name: "Jennifer Davis",
      role: "Real Estate Agent",
      content:
        "I recommend RoofFax to all my clients. It gives buyers confidence and sellers a competitive edge with transparent roof condition reports.",
      rating: 5,
    },
  ]

  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Customers Say</h2>
          <p className="mt-4 text-lg text-muted-foreground">Don't just take our word for it</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex mb-4">
                  {Array(testimonial.rating)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                </div>
                <p className="flex-grow text-muted-foreground mb-4">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
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
