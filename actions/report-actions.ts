"use server"

import { getReportById, createReport } from "@/lib/report-service"
import { sendEmail } from "@/lib/email"
import { getReportEmailTemplate } from "@/lib/email-templates"

export async function getReport(reportId: string) {
  try {
    const report = await getReportById(reportId)

    if (!report) {
      return { success: false, error: "Report not found" }
    }

    return { success: true, report }
  } catch (error) {
    console.error("Error getting report:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get report",
    }
  }
}

export async function generateReport(address: string, city: string, state: string, zip: string, userId?: string) {
  try {
    // In a real implementation, this would call an external API or service
    // to generate the actual roof report data

    // For now, we'll create a mock report with sample data
    const mockReportData = {
      issues: [
        { severity: "low", description: "Minor granule loss on south-facing slope" },
        { severity: "medium", description: "Some flashing deterioration around chimney" },
        { severity: "low", description: "Small area of moss growth on north side" },
      ],
      recommendations: [
        "Schedule inspection in 2 years",
        "Monitor chimney flashing for further deterioration",
        "Consider cleaning moss with appropriate roof cleaner",
      ],
      images: ["/roof-aerial-view.png", "/roof-closeup.png", "/damaged-roof.png"],
      measurements: {
        totalArea: 2450,
        pitch: "6:12",
        ridgeLength: 65,
        valleyLength: 32,
      },
    }

    const report = await createReport({
      userId,
      address,
      city,
      state,
      zip,
      roofAge: Math.floor(Math.random() * 20) + 1, // Random age between 1-20 years
      roofType: "Asphalt Shingle",
      roofCondition: "Good",
      estimatedRemainingLife: Math.floor(Math.random() * 15) + 1, // Random between 1-15 years
      reportStatus: "completed",
      reportData: mockReportData,
    })

    return { success: true, reportId: report.id }
  } catch (error) {
    console.error("Error generating report:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to generate report",
    }
  }
}

export async function emailReport(reportId: string, to: string, name: string, message?: string) {
  try {
    const reportResult = await getReport(reportId)

    if (!reportResult.success) {
      return reportResult
    }

    const report = reportResult.report
    const fullAddress = `${report.address}, ${report.city}, ${report.state} ${report.zip}`

    await sendEmail({
      to,
      subject: `RoofFax Report for ${fullAddress}`,
      html: getReportEmailTemplate({
        recipientName: name,
        address: fullAddress,
        roofAge: report.roofAge,
        roofType: report.roofType,
        roofCondition: report.roofCondition,
        estimatedLife: report.estimatedRemainingLife,
        issues: report.reportData?.issues || [],
        recommendations: report.reportData?.recommendations || [],
        message: message || "",
        reportUrl: `${process.env.NEXT_PUBLIC_APP_URL}/report?id=${reportId}`,
      }),
    })

    return { success: true, message: "Report sent successfully" }
  } catch (error) {
    console.error("Error emailing report:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to email report",
    }
  }
}

// Add the missing export for sendReportEmail
export async function sendReportEmail(reportId: string, email: string, name: string, message?: string) {
  try {
    const reportResult = await getReport(reportId)

    if (!reportResult.success) {
      return reportResult
    }

    const report = reportResult.report
    const fullAddress = `${report.address}, ${report.city}, ${report.state} ${report.zip}`

    await sendEmail({
      to: email,
      subject: `RoofFax Report for ${fullAddress}`,
      html: getReportEmailTemplate({
        recipientName: name,
        address: fullAddress,
        roofAge: report.roofAge,
        roofType: report.roofType,
        roofCondition: report.roofCondition,
        estimatedLife: report.estimatedRemainingLife,
        issues: report.reportData?.issues || [],
        recommendations: report.reportData?.recommendations || [],
        message: message || "",
        reportUrl: `${process.env.NEXT_PUBLIC_APP_URL}/report?id=${reportId}`,
      }),
    })

    return { success: true, message: "Report email sent successfully" }
  } catch (error) {
    console.error("Error sending report email:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send report email",
    }
  }
}
