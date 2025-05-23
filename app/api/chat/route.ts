import { openai } from "@ai-sdk/openai"
import { deepinfra } from "@ai-sdk/deepinfra"
import { streamText, tool } from "ai"
import { z } from "zod"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages, conversationId } = await req.json()

  // Use DeepInfra as primary, OpenAI as fallback
  const model = deepinfra("meta-llama/Meta-Llama-3.1-70B-Instruct") || openai("gpt-4o")

  const result = await streamText({
    model,
    system: `You are Roofus, the friendly AI assistant for RoofFax™. You're an expert in roofing, property inspections, and helping homeowners understand their roof conditions.

Key Information:
- Company: RoofFax™ 
- Phone: (850) 879-9172
- Email: Landon@rooffax.com
- Main site: therooffax.com (sales, demos, brand story)
- Homeowner tool: trustthefox.com (property reports & roofer verification)
- Pro portal: rooffaxpro.com (company leads, reports, advanced tools)

Your personality:
- Friendly, knowledgeable, and trustworthy
- Use roofing expertise to help customers
- Always professional but approachable
- Mention relevant RoofFax services when appropriate
- You have a playful side and enjoy making jokes about roofing

Guidelines:
- Help with roofing questions, report interpretation, and service inquiries
- Provide accurate roofing advice and safety information
- Guide users to appropriate RoofFax tools and services
- Schedule consultations when requested
- Never give unsafe DIY advice for complex roofing work
- Remember previous conversations with the user if they're in your memory`,
    messages,
    tools: {
      scheduleConsultation: tool({
        description: "Schedule a roofing consultation with RoofFax",
        parameters: z.object({
          name: z.string().describe("Customer name"),
          phone: z.string().describe("Customer phone number"),
          address: z.string().describe("Property address"),
          issue: z.string().describe("Roofing issue or concern"),
        }),
        execute: async ({ name, phone, address, issue }) => {
          // In a real implementation, this would integrate with your scheduling system
          return {
            success: true,
            message: `Consultation scheduled for ${name} at ${address}. We'll call ${phone} within 24 hours to confirm. Issue: ${issue}`,
            nextSteps: "Our team will contact you to schedule the inspection and provide a detailed assessment.",
          }
        },
      }),
      getReportInfo: tool({
        description: "Get information about roof reports and assessments",
        parameters: z.object({
          reportType: z.enum(["basic", "detailed", "insurance"]).describe("Type of report needed"),
        }),
        execute: async ({ reportType }) => {
          const reportInfo = {
            basic: {
              description: "Basic visual inspection and condition assessment",
              price: "Starting at $199",
              turnaround: "24-48 hours",
              includes: ["Visual inspection", "Photo documentation", "Basic condition report"],
            },
            detailed: {
              description: "Comprehensive inspection with detailed analysis",
              price: "Starting at $399",
              turnaround: "2-3 business days",
              includes: [
                "Thorough inspection",
                "Detailed photo documentation",
                "Material assessment",
                "Repair recommendations",
                "Cost estimates",
              ],
            },
            insurance: {
              description: "Insurance-grade inspection for claims",
              price: "Starting at $299",
              turnaround: "1-2 business days",
              includes: [
                "Insurance-compliant inspection",
                "Damage documentation",
                "Claim support documentation",
                "Expert testimony if needed",
              ],
            },
          }
          return reportInfo[reportType]
        },
      }),
      checkRooferCredentials: tool({
        description: "Help verify roofer credentials and legitimacy",
        parameters: z.object({
          rooferName: z.string().describe("Name of the roofing company"),
          location: z.string().describe("Location/area of the roofer"),
        }),
        execute: async ({ rooferName, location }) => {
          return {
            message: `To verify ${rooferName} in ${location}, visit trustthefox.com for our roofer verification tool.`,
            checkList: [
              "License verification",
              "Insurance confirmation",
              "Better Business Bureau rating",
              "Customer reviews and references",
              "Bonding status",
            ],
            warning: "Always verify credentials before hiring any contractor. Be wary of door-to-door solicitors.",
          }
        },
      }),
    },
  })

  return result.toDataStreamResponse()
}
