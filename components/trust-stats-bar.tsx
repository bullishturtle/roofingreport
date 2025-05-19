import { Shield, Users, Clock, Award } from "lucide-react"

export default function TrustStatsBar() {
  const stats = [
    {
      icon: Shield,
      value: "10,000+",
      label: "Roof Reports Generated",
    },
    {
      icon: Users,
      value: "5,000+",
      label: "Satisfied Customers",
    },
    {
      icon: Clock,
      value: "24/7",
      label: "Customer Support",
    },
    {
      icon: Award,
      value: "99%",
      label: "Accuracy Rate",
    },
  ]

  return (
    <section className="bg-blue-600 py-10 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center justify-center md:justify-start space-x-4">
              <stat.icon className="h-8 w-8 text-blue-200" />
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-blue-100">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
