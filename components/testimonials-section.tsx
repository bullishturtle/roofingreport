export function TestimonialsSection() {
  return (
    <section className="bg-black py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Trusted by <span className="text-yellow-500">Thousands</span> of Professionals
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            See what roofing contractors and homeowners are saying about RoofFax.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <TestimonialCard
            quote="RoofFax has completely transformed our business. We've increased our close rate by 35% since implementing it."
            author="Michael Johnson"
            role="Owner, Johnson Roofing"
            image="/images/testimonial-1.jpg"
          />
          <TestimonialCard
            quote="The accuracy of the measurements and the professional reports give us a huge advantage over competitors."
            author="Sarah Williams"
            role="Sales Manager, Elite Roofing"
            image="/images/testimonial-2.jpg"
          />
          <TestimonialCard
            quote="As a homeowner, RoofFax gave me confidence that I was getting a fair price for my roof replacement."
            author="David Thompson"
            role="Homeowner"
            image="/images/testimonial-3.jpg"
          />
        </div>
      </div>
    </section>
  )
}

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  image: string
}

function TestimonialCard({ quote, author, role, image }: TestimonialCardProps) {
  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
      <div className="mb-4 text-yellow-500">
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.039 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
        </svg>
      </div>
      <p className="mb-4 text-gray-300">{quote}</p>
      <div className="flex items-center">
        <div className="mr-4 h-12 w-12 overflow-hidden rounded-full bg-gray-700">
          <img
            src={image || "/placeholder.svg"}
            alt={author}
            className="h-full w-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = "https://via.placeholder.com/48"
            }}
          />
        </div>
        <div>
          <div className="font-medium text-white">{author}</div>
          <div className="text-sm text-gray-400">{role}</div>
        </div>
      </div>
    </div>
  )
}

export default TestimonialsSection
