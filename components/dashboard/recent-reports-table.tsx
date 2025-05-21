"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronUp, MoreHorizontal, FileText, Download, Share, Trash } from "lucide-react"
import { Button } from "@/components/ui/action-button"

export function RecentReportsTable() {
  const [sortField, setSortField] = useState("date")
  const [sortDirection, setSortDirection] = useState("desc")
  const [openMenu, setOpenMenu] = useState<number | null>(null)

  // Sample data
  const reports = [
    {
      id: 1,
      address: "123 Main St, Anytown, USA",
      date: "2023-05-15",
      status: "Completed",
      score: 92,
    },
    {
      id: 2,
      address: "456 Oak Ave, Somewhere, USA",
      date: "2023-05-12",
      status: "Completed",
      score: 78,
    },
    {
      id: 3,
      address: "789 Pine Rd, Nowhere, USA",
      date: "2023-05-10",
      status: "Completed",
      score: 85,
    },
    {
      id: 4,
      address: "101 Maple Dr, Everywhere, USA",
      date: "2023-05-08",
      status: "Pending",
      score: null,
    },
    {
      id: 5,
      address: "202 Cedar Ln, Anywhere, USA",
      date: "2023-05-05",
      status: "Completed",
      score: 95,
    },
  ]

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedReports = [...reports].sort((a, b) => {
    if (sortField === "date") {
      return sortDirection === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime()
    } else if (sortField === "score") {
      if (a.score === null) return sortDirection === "asc" ? 1 : -1
      if (b.score === null) return sortDirection === "asc" ? -1 : 1
      return sortDirection === "asc" ? a.score - b.score : b.score - a.score
    } else if (sortField === "address") {
      return sortDirection === "asc" ? a.address.localeCompare(b.address) : b.address.localeCompare(a.address)
    }
    return 0
  })

  const toggleMenu = (id: number) => {
    setOpenMenu(openMenu === id ? null : id)
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Recent Reports</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Your most recent property reports</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("address")}
              >
                <div className="flex items-center">
                  Address
                  {sortField === "address" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("date")}
              >
                <div className="flex items-center">
                  Date
                  {sortField === "date" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("score")}
              >
                <div className="flex items-center">
                  Roof Score
                  {sortField === "score" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {sortedReports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-100 rounded-md dark:bg-blue-900/30">
                      <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        <Link href={`/report?id=${report.id}`} className="hover:underline">
                          {report.address}
                        </Link>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Report #{report.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {new Date(report.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      report.status === "Completed"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}
                  >
                    {report.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {report.score !== null ? (
                    <div className="flex items-center">
                      <div className="mr-2 h-2.5 w-full max-w-24 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                        <div
                          className={`h-full ${
                            report.score >= 90 ? "bg-green-500" : report.score >= 70 ? "bg-yellow-500" : "bg-red-500"
                          }`}
                          style={{ width: `${report.score}%` }}
                        ></div>
                      </div>
                      <span>{report.score}</span>
                    </div>
                  ) : (
                    <span className="text-gray-500 dark:text-gray-400">Pending</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                  <button
                    onClick={() => toggleMenu(report.id)}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </button>

                  {openMenu === report.id && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
                      <div className="py-1" role="menu" aria-orientation="vertical">
                        <Link
                          href={`/report?id=${report.id}`}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                          role="menuitem"
                        >
                          <FileText className="mr-3 h-4 w-4 text-gray-400" />
                          View Report
                        </Link>
                        <button
                          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                          role="menuitem"
                        >
                          <Download className="mr-3 h-4 w-4 text-gray-400" />
                          Download PDF
                        </button>
                        <button
                          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                          role="menuitem"
                        >
                          <Share className="mr-3 h-4 w-4 text-gray-400" />
                          Share Report
                        </button>
                        <button
                          className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700"
                          role="menuitem"
                        >
                          <Trash className="mr-3 h-4 w-4 text-red-500" />
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing <span className="font-medium">5</span> of <span className="font-medium">42</span> reports
          </div>
          <div>
            <Link href="/dashboard/reports">
              <Button variant="outline" size="sm">
                View All Reports
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
