import { Shield, Search, FileCheck, Award } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Roof Protection",
      description: "Get comprehensive reports on your roof's condition and potential issues.",
    },
    {
      icon: <Search className="h-10 w-10 text-primary" />,
      title: "Find Trusted Roofers",
      description: "Connect with verified roofing professionals in your area.",
    },
    {
      icon: <FileCheck className="h-10 w-10 text-primary" />,
      title: "Detailed Reports",
      description: "Access easy-to-understand reports with actionable insights.",
    },
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: "Quality Assurance",
      description: "All roofers in our network are thoroughly vetted and certified.",
    },
  ]

  return (
    <section className="bg-slate-50 py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Choose RoofFax</h2>
          <p className="mt-4 text-lg text-muted-foreground">We make roof inspections and repairs hassle-free</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
              {feature.icon}
              <h3 className="mt-4 text-xl font-medium">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
