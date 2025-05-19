import sql from "@/lib/db"

export interface ReportData {
  id?: string
  userId?: string
  address: string
  city: string
  state: string
  zip: string
  roofAge?: number
  roofType?: string
  roofCondition?: string
  estimatedRemainingLife?: number
  lastInspectionDate?: Date
  reportStatus?: string
  reportData?: any
  createdAt?: Date
}

export async function getReportById(reportId: string): Promise<ReportData | null> {
  try {
    const reports = await sql`
      SELECT * FROM reports WHERE id = ${reportId}
    `

    if (reports.length === 0) {
      return null
    }

    const report = reports[0]
    return {
      id: report.id,
      userId: report.user_id,
      address: report.address,
      city: report.city,
      state: report.state,
      zip: report.zip,
      roofAge: report.roof_age,
      roofType: report.roof_type,
      roofCondition: report.roof_condition,
      estimatedRemainingLife: report.estimated_remaining_life,
      lastInspectionDate: report.last_inspection_date ? new Date(report.last_inspection_date) : undefined,
      reportStatus: report.report_status,
      reportData: report.report_data,
      createdAt: new Date(report.report_date),
    }
  } catch (error) {
    console.error("Error getting report by ID:", error)
    throw error
  }
}

export async function getReportsByUserId(userId: string): Promise<ReportData[]> {
  try {
    const reports = await sql`
      SELECT * FROM reports 
      WHERE user_id = ${userId}
      ORDER BY report_date DESC
    `

    return reports.map((report) => ({
      id: report.id,
      userId: report.user_id,
      address: report.address,
      city: report.city,
      state: report.state,
      zip: report.zip,
      roofAge: report.roof_age,
      roofType: report.roof_type,
      roofCondition: report.roof_condition,
      estimatedRemainingLife: report.estimated_remaining_life,
      lastInspectionDate: report.last_inspection_date ? new Date(report.last_inspection_date) : undefined,
      reportStatus: report.report_status,
      reportData: report.report_data,
      createdAt: new Date(report.report_date),
    }))
  } catch (error) {
    console.error("Error getting reports by user ID:", error)
    throw error
  }
}

export async function createReport(reportData: ReportData): Promise<ReportData> {
  try {
    const result = await sql`
      INSERT INTO reports (
        user_id,
        address,
        city,
        state,
        zip,
        roof_age,
        roof_type,
        roof_condition,
        estimated_remaining_life,
        last_inspection_date,
        report_status,
        report_data
      ) VALUES (
        ${reportData.userId || null},
        ${reportData.address},
        ${reportData.city},
        ${reportData.state},
        ${reportData.zip},
        ${reportData.roofAge || null},
        ${reportData.roofType || null},
        ${reportData.roofCondition || null},
        ${reportData.estimatedRemainingLife || null},
        ${reportData.lastInspectionDate ? reportData.lastInspectionDate.toISOString() : null},
        ${reportData.reportStatus || "completed"},
        ${reportData.reportData ? JSON.stringify(reportData.reportData) : null}
      )
      RETURNING *
    `

    const report = result[0]
    return {
      id: report.id,
      userId: report.user_id,
      address: report.address,
      city: report.city,
      state: report.state,
      zip: report.zip,
      roofAge: report.roof_age,
      roofType: report.roof_type,
      roofCondition: report.roof_condition,
      estimatedRemainingLife: report.estimated_remaining_life,
      lastInspectionDate: report.last_inspection_date ? new Date(report.last_inspection_date) : undefined,
      reportStatus: report.report_status,
      reportData: report.report_data,
      createdAt: new Date(report.report_date),
    }
  } catch (error) {
    console.error("Error creating report:", error)
    throw error
  }
}

export async function updateReport(reportId: string, reportData: Partial<ReportData>): Promise<ReportData> {
  try {
    // Build the SET clause dynamically based on provided fields
    const updates: string[] = []
    const values: any[] = []

    if (reportData.address !== undefined) {
      updates.push(`address = $${values.length + 1}`)
      values.push(reportData.address)
    }

    if (reportData.city !== undefined) {
      updates.push(`city = $${values.length + 1}`)
      values.push(reportData.city)
    }

    if (reportData.state !== undefined) {
      updates.push(`state = $${values.length + 1}`)
      values.push(reportData.state)
    }

    if (reportData.zip !== undefined) {
      updates.push(`zip = $${values.length + 1}`)
      values.push(reportData.zip)
    }

    if (reportData.roofAge !== undefined) {
      updates.push(`roof_age = $${values.length + 1}`)
      values.push(reportData.roofAge)
    }

    if (reportData.roofType !== undefined) {
      updates.push(`roof_type = $${values.length + 1}`)
      values.push(reportData.roofType)
    }

    if (reportData.roofCondition !== undefined) {
      updates.push(`roof_condition = $${values.length + 1}`)
      values.push(reportData.roofCondition)
    }

    if (reportData.estimatedRemainingLife !== undefined) {
      updates.push(`estimated_remaining_life = $${values.length + 1}`)
      values.push(reportData.estimatedRemainingLife)
    }

    if (reportData.lastInspectionDate !== undefined) {
      updates.push(`last_inspection_date = $${values.length + 1}`)
      values.push(reportData.lastInspectionDate.toISOString())
    }

    if (reportData.reportStatus !== undefined) {
      updates.push(`report_status = $${values.length + 1}`)
      values.push(reportData.reportStatus)
    }

    if (reportData.reportData !== undefined) {
      updates.push(`report_data = $${values.length + 1}`)
      values.push(JSON.stringify(reportData.reportData))
    }

    // Add the report ID as the last parameter
    values.push(reportId)

    if (updates.length === 0) {
      throw new Error("No fields to update")
    }

    const updateQuery = `
      UPDATE reports 
      SET ${updates.join(", ")}
      WHERE id = $${values.length}
      RETURNING *
    `

    const result = await sql(updateQuery, values)

    if (!result || result.length === 0) {
      throw new Error("Report not found")
    }

    const report = result[0]
    return {
      id: report.id,
      userId: report.user_id,
      address: report.address,
      city: report.city,
      state: report.state,
      zip: report.zip,
      roofAge: report.roof_age,
      roofType: report.roof_type,
      roofCondition: report.roof_condition,
      estimatedRemainingLife: report.estimated_remaining_life,
      lastInspectionDate: report.last_inspection_date ? new Date(report.last_inspection_date) : undefined,
      reportStatus: report.report_status,
      reportData: report.report_data,
      createdAt: new Date(report.report_date),
    }
  } catch (error) {
    console.error("Error updating report:", error)
    throw error
  }
}

export async function deleteReport(reportId: string): Promise<boolean> {
  try {
    const result = await sql`
      DELETE FROM reports
      WHERE id = ${reportId}
      RETURNING id
    `

    return result.length > 0
  } catch (error) {
    console.error("Error deleting report:", error)
    throw error
  }
}

export async function searchReports(query: string): Promise<ReportData[]> {
  try {
    const searchTerm = `%${query}%`

    const reports = await sql`
      SELECT * FROM reports
      WHERE 
        address ILIKE ${searchTerm} OR
        city ILIKE ${searchTerm} OR
        state ILIKE ${searchTerm} OR
        zip ILIKE ${searchTerm}
      ORDER BY report_date DESC
      LIMIT 20
    `

    return reports.map((report) => ({
      id: report.id,
      userId: report.user_id,
      address: report.address,
      city: report.city,
      state: report.state,
      zip: report.zip,
      roofAge: report.roof_age,
      roofType: report.roof_type,
      roofCondition: report.roof_condition,
      estimatedRemainingLife: report.estimated_remaining_life,
      lastInspectionDate: report.last_inspection_date ? new Date(report.last_inspection_date) : undefined,
      reportStatus: report.report_status,
      reportData: report.report_data,
      createdAt: new Date(report.report_date),
    }))
  } catch (error) {
    console.error("Error searching reports:", error)
    throw error
  }
}

export async function getRecentReports(limit = 5): Promise<ReportData[]> {
  try {
    const reports = await sql`
      SELECT * FROM reports
      ORDER BY report_date DESC
      LIMIT ${limit}
    `

    return reports.map((report) => ({
      id: report.id,
      userId: report.user_id,
      address: report.address,
      city: report.city,
      state: report.state,
      zip: report.zip,
      roofAge: report.roof_age,
      roofType: report.roof_type,
      roofCondition: report.roof_condition,
      estimatedRemainingLife: report.estimated_remaining_life,
      lastInspectionDate: report.last_inspection_date ? new Date(report.last_inspection_date) : undefined,
      reportStatus: report.report_status,
      reportData: report.report_data,
      createdAt: new Date(report.report_date),
    }))
  } catch (error) {
    console.error("Error getting recent reports:", error)
    throw error
  }
}
