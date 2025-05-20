export default function StatsSection() {
  const stats = [
    { value: "3.5M+", label: "Roofs Analyzed" },
    { value: "15K+", label: "Active Contractors" },
    { value: "98%", label: "Accuracy Rate" },
    { value: "2.5X", label: "Close Rate Increase" },
  ]

  return (
    <section className="py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="border-2 border-yellow-500/30 rounded-xl p-6 bg-black/20 hover:bg-black/30 transition-colors"
          >
            <div className="text-yellow-500 text-4xl font-bold mb-2">{stat.value}</div>
            <div className="text-gray-300">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
