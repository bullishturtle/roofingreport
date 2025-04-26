import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, FileText, MoreHorizontal } from "lucide-react"
import Link from "next/link"

export function RecentReportsTable() {
  // This would be fetched from an API in a real application
  const reports = [
    {
      id: "REP-1234",
      address: "123 Main St, Anytown, USA",
      date: "2023-04-15",
      status: "Completed",
      type: "Basic",
    },
    {
      id: "REP-1235",
      address: "456 Oak Ave, Somewhere, USA",
      date: "2023-04-14",
      status: "In Progress",
      type: "Advanced",
    },
    {
      id: "REP-1236",
      address: "789 Pine Rd, Nowhere, USA",
      date: "2023-04-13",
      status: "Pending",
      type: "3D",
    },
    {
      id: "REP-1237",
      address: "101 Elm St, Everywhere, USA",
      date: "2023-04-12",
      status: "Completed",
      type: "Advanced",
    },
    {
      id: "REP-1238",
      address: "202 Maple Dr, Anywhere, USA",
      date: "2023-04-11",
      status: "Completed",
      type: "Basic",
    },
  ]

  return (
    <div className="overflow-auto">
      <table className="w-full caption-bottom text-sm">
        <thead>
          <tr className="border-b">
            <th className="h-12 px-4 text-left font-medium">Report ID</th>
            <th className="h-12 px-4 text-left font-medium">Address</th>
            <th className="h-12 px-4 text-left font-medium">Date</th>
            <th className="h-12 px-4 text-left font-medium">Type</th>
            <th className="h-12 px-4 text-left font-medium">Status</th>
            <th className="h-12 px-4 text-left font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id} className="border-b transition-colors hover:bg-muted/50">
              <td className="p-4 align-middle font-medium">{report.id}</td>
              <td className="p-4 align-middle">{report.address}</td>
              <td className="p-4 align-middle">{report.date}</td>
              <td className="p-4 align-middle">
                <Badge variant={report.type === "3D" ? "default" : "outline"}>{report.type}</Badge>
              </td>
              <td className="p-4 align-middle">
                <Badge
                  variant="outline"
                  className={
                    report.status === "Completed"
                      ? "bg-green-500/10 text-green-500 border-green-500/20"
                      : report.status === "In Progress"
                        ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                        : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                  }
                >
                  {report.status}
                </Badge>
              </td>
              <td className="p-4 align-middle">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/dashboard/reports/${report.id}`}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/dashboard/reports/${report.id}/pdf`}>
                      <FileText className="h-4 w-4" />
                      <span className="sr-only">PDF</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">More</span>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
