"use client"

import { Button } from "@/components/ui/button"
import { Eye, Download } from "lucide-react"

interface Report {
  id: string
  address: string
  date: string
  condition: string
}

interface RecentReportsTableProps {
  reports: Report[]
  onView: (reportId: string) => void
  showPagination?: boolean
}

export default function RecentReportsTable({ reports, onView, showPagination = false }: RecentReportsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-medium text-gray-500">Address</th>
            <th className="text-left py-3 px-4 font-medium text-gray-500">Date</th>
            <th className="text-left py-3 px-4 font-medium text-gray-500">Condition</th>
            <th className="text-right py-3 px-4 font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.length === 0 ? (
            <tr>
              <td colSpan={4} className="py-6 text-center text-gray-500">
                No reports found
              </td>
            </tr>
          ) : (
            reports.map((report) => (
              <tr key={report.id} className="border-b">
                <td className="py-3 px-4">{report.address}</td>
                <td className="py-3 px-4">{new Date(report.date).toLocaleDateString()}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      report.condition === "Excellent"
                        ? "bg-green-100 text-green-800"
                        : report.condition === "Good"
                          ? "bg-blue-100 text-blue-800"
                          : report.condition === "Fair"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                    }`}
                  >
                    {report.condition}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => onView(report.id)} title="View Report">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" title="Download Report">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showPagination && reports.length > 0 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{reports.length}</span> of{" "}
            <span className="font-medium">{reports.length}</span> reports
          </p>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
