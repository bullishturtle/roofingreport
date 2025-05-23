"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pagination } from "@/components/ui/pagination"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Download, RefreshCw } from "lucide-react"

interface AuditLog {
  id: string
  timestamp: string
  userId: string | null
  action: string
  entityType: string
  entityId: string | null
  details: any
  ipAddress: string | null
  userAgent: string | null
  status: string
}

interface PaginationInfo {
  page: number
  limit: number
  totalCount: number
  totalPages: number
}

export function AuditLogViewer() {
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 25,
    totalCount: 0,
    totalPages: 0,
  })
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    userId: "",
    action: "",
    entityType: "",
    entityId: "",
    status: "",
    startDate: "",
    endDate: "",
    search: "",
  })
  const [showFilters, setShowFilters] = useState(false)

  // Action options for filter
  const actionOptions = [
    { value: "", label: "All Actions" },
    { value: "user.login", label: "User Login" },
    { value: "user.logout", label: "User Logout" },
    { value: "user.register", label: "User Registration" },
    { value: "data.create", label: "Data Created" },
    { value: "data.update", label: "Data Updated" },
    { value: "data.delete", label: "Data Deleted" },
    { value: "report.generate", label: "Report Generated" },
    // Add more options as needed
  ]

  // Entity type options for filter
  const entityTypeOptions = [
    { value: "", label: "All Entities" },
    { value: "user", label: "User" },
    { value: "report", label: "Report" },
    { value: "property", label: "Property" },
    { value: "system", label: "System" },
    // Add more options as needed
  ]

  // Status options for filter
  const statusOptions = [
    { value: "", label: "All Statuses" },
    { value: "success", label: "Success" },
    { value: "failure", label: "Failure" },
    { value: "warning", label: "Warning" },
  ]

  const fetchLogs = async () => {
    setLoading(true)
    try {
      // Build query string from filters and pagination
      const queryParams = new URLSearchParams()
      queryParams.append("page", pagination.page.toString())
      queryParams.append("limit", pagination.limit.toString())

      // Add filters if they have values
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value)
      })

      const response = await fetch(`/api/audit?${queryParams.toString()}`)

      if (!response.ok) {
        throw new Error("Failed to fetch audit logs")
      }

      const data = await response.json()
      setLogs(data.logs)
      setPagination(data.pagination)
    } catch (error) {
      console.error("Error fetching audit logs:", error)
      // Handle error (show toast, etc.)
    } finally {
      setLoading(false)
    }
  }

  // Fetch logs on initial load and when filters or pagination changes
  useEffect(() => {
    fetchLogs()
  }, [pagination.page, pagination.limit])

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleApplyFilters = () => {
    setPagination((prev) => ({ ...prev, page: 1 })) // Reset to first page
    fetchLogs()
  }

  const handleResetFilters = () => {
    setFilters({
      userId: "",
      action: "",
      entityType: "",
      entityId: "",
      status: "",
      startDate: "",
      endDate: "",
      search: "",
    })
    setPagination((prev) => ({ ...prev, page: 1 }))
    fetchLogs()
  }

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }))
  }

  const handleExportCsv = async () => {
    try {
      // Build query string from filters
      const queryParams = new URLSearchParams()
      queryParams.append("format", "csv")

      // Add filters if they have values
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value)
      })

      const response = await fetch(`/api/audit/export?${queryParams.toString()}`)

      if (!response.ok) {
        throw new Error("Failed to export audit logs")
      }

      // Create a download link for the CSV
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.style.display = "none"
      a.href = url
      a.download = `audit-logs-${new Date().toISOString().split("T")[0]}.csv`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error exporting audit logs:", error)
      // Handle error (show toast, etc.)
    }
  }

  // Format timestamp for display
  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge variant="success">{status}</Badge>
      case "failure":
        return <Badge variant="destructive">{status}</Badge>
      case "warning":
        return <Badge variant="warning">{status}</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Audit Logs</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4 mr-2" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
          <Button variant="outline" size="sm" onClick={fetchLogs}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportCsv}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Search and filters */}
        <div className="mb-4">
          <div className="flex gap-2 mb-4">
            <div className="flex-1">
              <Input
                placeholder="Search logs..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="w-full"
              />
            </div>
            <Button onClick={handleApplyFilters}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 p-4 border rounded-md bg-gray-50">
              <div>
                <label className="block text-sm font-medium mb-1">Action</label>
                <Select value={filters.action} onValueChange={(value) => handleFilterChange("action", value)}>
                  {actionOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Entity Type</label>
                <Select value={filters.entityType} onValueChange={(value) => handleFilterChange("entityType", value)}>
                  {entityTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">User ID</label>
                <Input
                  placeholder="Filter by user ID"
                  value={filters.userId}
                  onChange={(e) => handleFilterChange("userId", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Entity ID</label>
                <Input
                  placeholder="Filter by entity ID"
                  value={filters.entityId}
                  onChange={(e) => handleFilterChange("entityId", e.target.value)}
                />
              </div>

              <div className="md:col-span-2 lg:col-span-1">
                <label className="block text-sm font-medium mb-1">Date Range</label>
                <DateRangePicker
                  startDate={filters.startDate ? new Date(filters.startDate) : undefined}
                  endDate={filters.endDate ? new Date(filters.endDate) : undefined}
                  onStartDateChange={(date) => handleFilterChange("startDate", date ? date.toISOString() : "")}
                  onEndDateChange={(date) => handleFilterChange("endDate", date ? date.toISOString() : "")}
                />
              </div>

              <div className="col-span-full flex justify-end gap-2">
                <Button variant="outline" onClick={handleResetFilters}>
                  Reset Filters
                </Button>
                <Button onClick={handleApplyFilters}>Apply Filters</Button>
              </div>
            </div>
          )}
        </div>

        {/* Audit logs table */}
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex justify-center items-center">
                      <RefreshCw className="h-6 w-6 animate-spin mr-2" />
                      Loading audit logs...
                    </div>
                  </TableCell>
                </TableRow>
              ) : logs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    No audit logs found
                  </TableCell>
                </TableRow>
              ) : (
                logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="whitespace-nowrap">{formatTimestamp(log.timestamp)}</TableCell>
                    <TableCell>{log.userId || "System"}</TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell>
                      {log.entityType}
                      {log.entityId && <span className="text-xs text-gray-500 block">{log.entityId}</span>}
                    </TableCell>
                    <TableCell>{getStatusBadge(log.status)}</TableCell>
                    <TableCell>{log.ipAddress || "N/A"}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => alert(JSON.stringify(log.details, null, 2))}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing {logs.length} of {pagination.totalCount} results
          </div>
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </CardContent>
    </Card>
  )
}
