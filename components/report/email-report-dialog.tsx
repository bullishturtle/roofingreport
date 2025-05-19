"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { sendReportEmail } from "@/actions/report-actions"
import { LoadingSpinner } from "@/components/loading-spinner"
import { useToast } from "@/components/ui/use-toast"

interface EmailReportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  address: string
  reportData: any
  reportId?: string
  userEmail?: string
  userName?: string
}

export function EmailReportDialog({
  open,
  onOpenChange,
  address,
  reportData,
  reportId = "demo",
  userEmail = "",
  userName = "",
}: EmailReportDialogProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    recipientEmail: "",
    recipientName: "",
    senderName: userName || "",
    ccEmails: "",
    additionalMessage: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Process CC emails (split by comma and trim)
      const ccEmailsArray = formData.ccEmails
        ? formData.ccEmails
            .split(",")
            .map((email) => email.trim())
            .filter(Boolean)
        : []

      const result = await sendReportEmail({
        recipientEmail: formData.recipientEmail,
        recipientName: formData.recipientName || "Property Owner",
        address,
        reportData,
        reportId,
        ccEmails: ccEmailsArray,
        senderName: formData.senderName,
        additionalMessage: formData.additionalMessage,
      })

      if (result.success) {
        toast({
          title: "Report Sent",
          description: "The report has been sent successfully.",
          variant: "default",
        })
        onOpenChange(false)
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to send report. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Email Report</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="recipientEmail">Recipient Email *</Label>
              <Input
                id="recipientEmail"
                name="recipientEmail"
                type="email"
                value={formData.recipientEmail}
                onChange={handleChange}
                placeholder="recipient@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="recipientName">Recipient Name</Label>
              <Input
                id="recipientName"
                name="recipientName"
                value={formData.recipientName}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="senderName">Your Name</Label>
              <Input
                id="senderName"
                name="senderName"
                value={formData.senderName}
                onChange={handleChange}
                placeholder="Your Name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ccEmails">CC (separate multiple emails with commas)</Label>
              <Input
                id="ccEmails"
                name="ccEmails"
                value={formData.ccEmails}
                onChange={handleChange}
                placeholder="cc1@example.com, cc2@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalMessage">Additional Message (optional)</Label>
              <Textarea
                id="additionalMessage"
                name="additionalMessage"
                value={formData.additionalMessage}
                onChange={handleChange}
                placeholder="Add a personal message to include with this report..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <LoadingSpinner className="mr-2 h-4 w-4" /> : null}
              {isLoading ? "Sending..." : "Send Report"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
