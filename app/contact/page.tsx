import { ContactForm } from "@/components/contact-form"

export default function ContactPage() {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">Contact Us</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Get in Touch</h2>
              <p className="text-gray-700 mb-6">
                Have questions about RoofFax.Report? We're here to help! Fill out the form and we'll get back to you as
                soon as possible.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-700">
                    <a href="mailto:Landon@rooffax.com" className="text-blue-600 hover:underline">
                      Landon@rooffax.com
                    </a>
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Phone</h3>
                  <p className="text-gray-700">
                    <a href="tel:+18508799172" className="text-blue-600 hover:underline">
                      (850) 879-9172
                    </a>
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Business Hours</h3>
                  <p className="text-gray-700">Monday - Friday: 9am - 5pm EST</p>
                  <p className="text-gray-700">Saturday - Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
