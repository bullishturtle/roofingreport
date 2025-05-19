import { BarChart3, Cloud, Users, FileText, Calendar, MessageSquare } from "lucide-react"

export function Features() {
  return (
    <section id="features" className="py-12 md:py-24 bg-[#0a0d17]">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-block rounded-full bg-yellow-500/10 px-3 py-1 text-sm text-yellow-500 mb-4 border border-yellow-500/20">
            All-in-One Platform
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-4">
            Everything You Need in One Place
          </h2>
          <p className="max-w-[700px] text-gray-400 md:text-xl">
            RoofFax replaces multiple tools with a single, powerful platform designed for roofing professionals.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col p-6 rounded-lg border border-gray-800 bg-black/20">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10">
              <BarChart3 className="h-6 w-6 text-yellow-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Comprehensive Dashboard</h3>
            <p className="text-gray-400">
              Manage your reports, leads, and projects all in one place with our intuitive dashboard.
            </p>
          </div>

          <div className="flex flex-col p-6 rounded-lg border border-gray-800 bg-black/20">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10">
              <Cloud className="h-6 w-6 text-yellow-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Storm Tracking</h3>
            <p className="text-gray-400">
              Real-time weather data and storm tracking to identify potential damage areas.
            </p>
          </div>

          <div className="flex flex-col p-6 rounded-lg border border-gray-800 bg-black/20">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10">
              <Users className="h-6 w-6 text-yellow-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Team Management</h3>
            <p className="text-gray-400">
              Assign tasks, track performance, and collaborate with your team efficiently.
            </p>
          </div>

          <div className="flex flex-col p-6 rounded-lg border border-gray-800 bg-black/20">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10">
              <FileText className="h-6 w-6 text-yellow-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Proposal Generation</h3>
            <p className="text-gray-400">
              Create professional proposals with accurate measurements and pricing in minutes.
            </p>
          </div>

          <div className="flex flex-col p-6 rounded-lg border border-gray-800 bg-black/20">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10">
              <Calendar className="h-6 w-6 text-yellow-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Scheduling</h3>
            <p className="text-gray-400">
              Manage appointments, inspections, and project timelines with our built-in calendar.
            </p>
          </div>

          <div className="flex flex-col p-6 rounded-lg border border-gray-800 bg-black/20">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10">
              <MessageSquare className="h-6 w-6 text-yellow-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Customer Communication</h3>
            <p className="text-gray-400">Keep clients informed with automated updates and easy communication tools.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
