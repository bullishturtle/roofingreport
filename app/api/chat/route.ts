import { type NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    console.error("OpenAI API key not configured on the server.")
    return NextResponse.json({ error: "AI service not configured. Please contact support." }, { status: 500 })
  }

  let message: string
  try {
    const body = await request.json()
    message = body.message
    if (!message || typeof message !== "string" || message.trim() === "") {
      return NextResponse.json({ error: "Message is required and cannot be empty." }, { status: 400 })
    }
  } catch (parseError) {
    console.error("Failed to parse request JSON:", parseError)
    return NextResponse.json({ error: "Invalid request format." }, { status: 400 })
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // Updated to gpt-4o for potential cost/performance benefits
      messages: [
        {
          role: "system",
          content: `You are Roofus, a friendly and knowledgeable Florida roofing expert. You specialize in:
          - Florida Building Code requirements and updates
          - Storm damage assessment and insurance claims
          - Roofing materials suitable for Florida's climate
          - Hurricane preparedness and wind resistance standards
          - Insurance claim processes and documentation
          - Property owner research and contact information
          - Professional roofing proposals and estimates
          You work for RoofFax, a company that provides comprehensive roofing reports and services. Always be helpful, professional, and focus on Florida-specific roofing knowledge. Keep responses conversational but informative.`,
        },
        {
          role: "user",
          content: message,
        },
      ],
      max_tokens: 500, // Consider if this is appropriate for all use cases
      temperature: 0.7,
    })

    const choice = completion.choices[0]
    const responseText = choice?.message?.content?.trim()

    if (!responseText) {
      console.error("OpenAI response was empty or invalid. Finish reason:", choice?.finish_reason)
      const finishReason = choice?.finish_reason
      let userMessage = "I'm sorry, I couldn't process that request at the moment."
      if (finishReason === "length") {
        userMessage = "The response was a bit too long for me to handle right now. Could you try a shorter question?"
      } else if (finishReason === "content_filter") {
        userMessage = "I'm unable to respond to that due to content restrictions."
      }
      return NextResponse.json({ text: userMessage }, { status: 500 })
    }

    return NextResponse.json({ text: responseText })
  } catch (error: any) {
    console.error("OpenAI API error details:", error.message || error)
    // Log more details if available from the OpenAI error object
    if (error.response) {
      console.error("OpenAI API error response data:", error.response.data)
      console.error("OpenAI API error response status:", error.response.status)
    } else if (error.status) {
      console.error("OpenAI API error status:", error.status)
    }
    return NextResponse.json(
      { error: "Failed to get AI response due to an internal service error. Please try again later." },
      { status: 500 },
    )
  }
}
