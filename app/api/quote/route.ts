import { type NextRequest, NextResponse } from "next/server"
import axios from "axios"

// Define quote types
type QuoteData = {
  address: string
  date: string
  expirationDate: string
  customer: {
    name: string
    email: string
    phone: string
  }
  property: {
    type: string
    roofArea: number
    stories: number
  }
  options: Array<{
    id: string
    name: string
    description: string
    materials: string
    warranty: string
    price: number
    features: string[]
    recommended: boolean
  }>
  selectedOption?: string
  additionalServices: Array<{
    id: string
    name: string
    description: string
    price: number
    selected: boolean
  }>
  discounts: Array<{
    id: string
    name: string
    description: string
    amount: number
    type: "percentage" | "fixed"
    selected: boolean
  }>
  totals: {
    subtotal: number
    discounts: number
    tax: number
    total: number
  }
  notes: string
  terms: string
  paymentOptions: Array<{
    name: string
    description: string
  }>
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const address = searchParams.get("address")
    const roofArea = Number.parseInt(searchParams.get("roofArea") || "0")
    const customerName = searchParams.get("customerName") || "Homeowner"

    if (!address) {
      return NextResponse.json({ error: "Address parameter is required" }, { status: 400 })
    }

    // If no roof area provided, try to get it from the measurement API
    let actualRoofArea = roofArea
    if (!actualRoofArea) {
      try {
        const measurementResponse = await axios.get(`/api/measure?address=${encodeURIComponent(address)}`)
        actualRoofArea = measurementResponse.data.roof.totalArea
      } catch (error) {
        console.error("Error fetching roof measurements:", error)
        actualRoofArea = 2500 // Default value if measurement API fails
      }
    }

    // Generate quote based on address and roof area
    const quote = generateQuote(address, actualRoofArea, customerName)

    return NextResponse.json(quote)
  } catch (error) {
    console.error("Quote API error:", error)
    return NextResponse.json({ error: "Failed to generate quote" }, { status: 500 })
  }
}

// Generate a quote based on address and roof area
function generateQuote(address: string, roofArea: number, customerName: string): QuoteData {
  // Calculate base prices based on roof area
  const basePrice = roofArea * 4.5 // $4.50 per sq ft for basic option
  const premiumPrice = roofArea * 6.75 // $6.75 per sq ft for premium option
  const luxuryPrice = roofArea * 9.5 // $9.50 per sq ft for luxury option

  // Current date and expiration date (30 days from now)
  const currentDate = new Date()
  const expirationDate = new Date()
  expirationDate.setDate(expirationDate.getDate() + 30)

  // Format dates
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Generate quote data
  const quote: QuoteData = {
    address,
    date: formatDate(currentDate),
    expirationDate: formatDate(expirationDate),
    customer: {
      name: customerName,
      email: `${customerName.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
    },
    property: {
      type: "Single Family Home",
      roofArea,
      stories: Math.random() > 0.7 ? 2 : 1,
    },
    options: [
      {
        id: "basic",
        name: "Essential Protection",
        description: "Our standard roofing system with quality materials and workmanship.",
        materials: "Owens Corning Supreme® 3-tab shingles",
        warranty: "25-year manufacturer warranty, 5-year workmanship warranty",
        price: Math.round(basePrice),
        features: [
          "3-tab asphalt shingles",
          "Standard underlayment",
          "Ridge vents for proper attic ventilation",
          "Ice and water shield in valleys",
          "Standard flashing replacement",
        ],
        recommended: false,
      },
      {
        id: "premium",
        name: "Premium Protection",
        description: "Our most popular option with enhanced materials and extended warranty.",
        materials: "Owens Corning Duration® architectural shingles",
        warranty: "Limited Lifetime manufacturer warranty, 10-year workmanship warranty",
        price: Math.round(premiumPrice),
        features: [
          "Architectural shingles with enhanced wind resistance",
          "Synthetic underlayment",
          "Enhanced ridge vent system",
          "Ice and water shield in valleys and eaves",
          "New flashing and pipe boots",
          "Ridge cap shingles",
        ],
        recommended: true,
      },
      {
        id: "luxury",
        name: "Ultimate Protection",
        description: "Our premium roofing system with top-of-the-line materials and comprehensive warranty.",
        materials: "Owens Corning Duration® Designer Colors or GAF Timberline HDZ®",
        warranty: "Limited Lifetime manufacturer warranty, 25-year workmanship warranty",
        price: Math.round(luxuryPrice),
        features: [
          "Premium designer architectural shingles",
          "Synthetic underlayment throughout",
          "Complete ventilation system upgrade",
          "Ice and water shield on entire roof deck",
          "Custom metal flashing",
          "Enhanced ridge cap shingles",
          "Starter strip shingles on all eaves and rakes",
        ],
        recommended: false,
      },
    ],
    selectedOption: "premium",
    additionalServices: [
      {
        id: "gutter",
        name: "Gutter Replacement",
        description: "New seamless gutters and downspouts.",
        price: Math.round(roofArea * 0.8),
        selected: false,
      },
      {
        id: "skylight",
        name: "Skylight Replacement",
        description: "Replace existing skylights with new energy-efficient models.",
        price: 1200,
        selected: false,
      },
      {
        id: "ventilation",
        name: "Ventilation Upgrade",
        description: "Enhanced attic ventilation system to improve energy efficiency.",
        price: 800,
        selected: false,
      },
      {
        id: "insulation",
        name: "Attic Insulation",
        description: "Upgrade attic insulation to R-38 for better energy efficiency.",
        price: Math.round(roofArea * 1.2),
        selected: false,
      },
    ],
    discounts: [
      {
        id: "military",
        name: "Military Discount",
        description: "Thank you for your service.",
        amount: 5,
        type: "percentage",
        selected: false,
      },
      {
        id: "senior",
        name: "Senior Discount",
        description: "For homeowners 65 and older.",
        amount: 5,
        type: "percentage",
        selected: false,
      },
      {
        id: "referral",
        name: "Referral Discount",
        description: "Referred by an existing customer.",
        amount: 500,
        type: "fixed",
        selected: false,
      },
      {
        id: "bundle",
        name: "Bundle Discount",
        description: "When selecting 2 or more additional services.",
        amount: 10,
        type: "percentage",
        selected: false,
      },
    ],
    totals: {
      subtotal: Math.round(premiumPrice),
      discounts: 0,
      tax: Math.round(premiumPrice * 0.07),
      total: Math.round(premiumPrice * 1.07),
    },
    notes:
      "This quote includes removal of existing roofing materials, disposal fees, and cleanup. Permit fees are included. Any wood replacement needed will be charged at $75 per sheet of plywood.",
    terms:
      "A 10% deposit is required to schedule the project. 40% is due upon material delivery, and the remaining 50% is due upon completion and final inspection. This quote is valid for 30 days from the date issued.",
    paymentOptions: [
      {
        name: "Cash/Check/Credit Card",
        description: "Pay by cash, check, or major credit cards (3% processing fee for credit cards).",
      },
      {
        name: "Financing",
        description: "0% interest for 12 months or 6.99% for 60 months through our financing partners.",
      },
      {
        name: "Insurance",
        description: "We work directly with your insurance company for approved claims.",
      },
    ],
  }

  return quote
}
