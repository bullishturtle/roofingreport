"use client"

import { TrendingUp, Users, FileText, Calendar, ArrowUpRight, ArrowDownRight } from "lucide-react"

export function StatsCards() {
  const stats = [
    {
      title: "Total Reports",
      value: "1,234",
      change: "+12.5%",
      trend: "up",
      icon: FileText,
      color: "blue",
    },
    {
      title: "Active Customers",
      value: "567",
      change: "+5.2%",
      trend: "up",
      icon: Users,
      color: "green",
    },
    {
      title: "Monthly Revenue",
      value: "$12,345",
      change: "+8.1%",
      trend: "up",
      icon: TrendingUp,
      color: "purple",
    },
    {
      title: "Upcoming Appointments",
      value: "23",
      change: "-3.4%",
      trend: "down",
      icon: Calendar,
      color: "amber",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.title} className="bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className={`p-2 rounded-md bg-${stat.color}-100 dark:bg-${stat.color}-900/30`}>
                  <stat.icon className={`h-5 w-5 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{stat.title}</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900 dark:text-white">{stat.value}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className={`bg-gray-50 dark:bg-gray-700/50 px-5 py-3`}>
            <div className="text-sm flex items-center">
              {stat.trend === "up" ? (
                <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
              )}
              <span
                className={`font-medium ${
                  stat.trend === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                }`}
              >
                {stat.change}
              </span>
              <span className="ml-2 text-gray-500 dark:text-gray-400">from last month</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
