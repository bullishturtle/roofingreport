"use client"

import {
  Ruler,
  CloudRain,
  Layers,
  ClipboardList,
  Shield,
  CuboidIcon as Cube,
  Home,
  Wind,
  Calendar,
  FileText,
  Map,
  AlertTriangle,
  BarChart,
  Clock,
  Zap,
  type LucideIcon,
} from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  icon: string
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  const icons: Record<string, LucideIcon> = {
    ruler: Ruler,
    "cloud-rain": CloudRain,
    layers: Layers,
    "clipboard-list": ClipboardList,
    shield: Shield,
    cube: Cube,
    home: Home,
    wind: Wind,
    calendar: Calendar,
    "file-text": FileText,
    map: Map,
    "alert-triangle": AlertTriangle,
    "bar-chart": BarChart,
    clock: Clock,
    zap: Zap,
  }

  const IconComponent = icons[icon] || Home

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
        <IconComponent className="h-6 w-6 text-amber-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
