import { type NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 })
    }

    const { message } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
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
      max_tokens: 500,
      temperature: 0.7,
    })

    const response = completion.choices[0]?.message?.content || "I'm sorry, I couldn't process that request."

    return NextResponse.json({ text: response })
  } catch (error) {
    console.error("OpenAI API error:", error)
    return NextResponse.json({ error: "Failed to get AI response" }, { status: 500 })
  }
}
