import { ComprehensiveAuditRunner } from "@/components/admin/comprehensive-audit-runner"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Comprehensive Site Audit | RoofFax Admin",
  description: "Complete site audit covering UX, accessibility, performance, and code quality",
}

export default function ComprehensiveAuditPage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Comprehensive Site Audit</h1>
        <p className="text-gray-600 text-lg">
          Run a complete audit covering user experience, accessibility, performance, visual enhancements, functionality,
          and code quality. This audit checks for all the issues identified in your site review.
        </p>
      </div>

      <ComprehensiveAuditRunner />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-3">User Experience</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Loading states for transitions</li>
            <li>• Accessibility features</li>
            <li>• Keyboard navigation</li>
            <li>• Reduced motion support</li>
            <li>• Offline functionality</li>
          </ul>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="font-semibold text-green-900 mb-3">Visual Enhancement</h3>
          <ul className="text-sm text-green-800 space-y-1">
            <li>• Dynamic animations</li>
            <li>• Particle systems</li>
            <li>• Advanced shader effects</li>
            <li>• Responsive design</li>
          </ul>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="font-semibold text-purple-900 mb-3">Functionality</h3>
          <ul className="text-sm text-purple-800 space-y-1">
            <li>• Real form submission</li>
            <li>• Analytics implementation</li>
            <li>• SEO optimization</li>
            <li>• Progressive Web App features</li>
          </ul>
        </div>

        <div className="bg-orange-50 p-6 rounded-lg">
          <h3 className="font-semibold text-orange-900 mb-3">Code Quality</h3>
          <ul className="text-sm text-orange-800 space-y-1">
            <li>• Component size optimization</li>
            <li>• TypeScript strict mode</li>
            <li>• Error handling</li>
            <li>• Performance monitoring</li>
          </ul>
        </div>

        <div className="bg-red-50 p-6 rounded-lg">
          <h3 className="font-semibold text-red-900 mb-3">Performance</h3>
          <ul className="text-sm text-red-800 space-y-1">
            <li>• Core Web Vitals</li>
            <li>• Load time optimization</li>
            <li>• Bundle size analysis</li>
            <li>• Runtime performance</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-3">Security & Compliance</h3>
          <ul className="text-sm text-gray-800 space-y-1">
            <li>• Security headers</li>
            <li>• HTTPS enforcement</li>
            <li>• Data protection</li>
            <li>• Privacy compliance</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
