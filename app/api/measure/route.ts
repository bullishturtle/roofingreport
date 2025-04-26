import { type NextRequest, NextResponse } from "next/server"

// Define roof measurement types
type RoofMeasurementData = {
  address: string
  coordinates: {
    lat: number
    lng: number
  }
  property: {
    type: string
    yearBuilt: number
    stories: number
    squareFootage: number
    lotSize: string
  }
  roof: {
    totalArea: number
    pitch: string
    ridges: number
    valleys: number
    facets: Array<{
      name: string
      area: number
      pitch: string
      direction: string
    }>
    materials: Array<{
      name: string
      quantity: number
      unit: string
    }>
  }
  condition: {
    overall: "Excellent" | "Good" | "Fair" | "Poor"
    estimatedAge: number
    remainingLife: number
    issues: Array<{
      type: string
      severity: string
      description: string
      location: string
    }>
  }
  images: {
    satellite: string
    aerial?: string
    heatMap?: string
    threeDModel?: string
  }
}

// Mock property database
const propertyDatabase = {
  "123 Main St, Orlando, FL": {
    address: "123 Main St, Orlando, FL 32801",
    coordinates: {
      lat: 28.5383,
      lng: -81.3792,
    },
    property: {
      type: "Single Family",
      yearBuilt: 2005,
      stories: 1,
      squareFootage: 2150,
      lotSize: "0.25 acres",
    },
    roof: {
      totalArea: 2450,
      pitch: "6:12",
      ridges: 86,
      valleys: 42,
      facets: [
        {
          name: "Main Front",
          area: 820,
          pitch: "6:12",
          direction: "South",
        },
        {
          name: "Main Back",
          area: 780,
          pitch: "6:12",
          direction: "North",
        },
        {
          name: "Left Side",
          area: 425,
          pitch: "5:12",
          direction: "East",
        },
        {
          name: "Right Side",
          area: 425,
          pitch: "5:12",
          direction: "West",
        },
      ],
      materials: [
        {
          name: "Shingles",
          quantity: 25,
          unit: "Squares",
        },
        {
          name: "Underlayment",
          quantity: 2450,
          unit: "sq ft",
        },
        {
          name: "Ridge Cap",
          quantity: 86,
          unit: "ft",
        },
        {
          name: "Drip Edge",
          quantity: 180,
          unit: "ft",
        },
      ],
    },
    condition: {
      overall: "Fair",
      estimatedAge: 12,
      remainingLife: 3,
      issues: [
        {
          type: "Granule Loss",
          severity: "Moderate",
          description: "Moderate granule loss detected on south-facing slope, indicating aging shingles.",
          location: "South Facet",
        },
        {
          type: "Wind Damage",
          severity: "Minor",
          description: "Minor wind damage detected on ridge caps and southeast corner.",
          location: "Ridge and Southeast Corner",
        },
        {
          type: "Flashing Wear",
          severity: "Moderate",
          description: "Chimney flashing shows signs of wear and potential for leaks.",
          location: "Chimney",
        },
      ],
    },
    images: {
      satellite: "/placeholder.svg?height=450&width=800&text=Satellite+View",
      aerial: "/placeholder.svg?height=200&width=400&text=Aerial+View",
      heatMap: "/placeholder.svg?height=200&width=400&text=Heat+Map",
      threeDModel: "/placeholder.svg?height=200&width=400&text=3D+Model",
    },
  },
  "456 Oak Ave, Orlando, FL": {
    address: "456 Oak Ave, Orlando, FL 32804",
    coordinates: {
      lat: 28.5729,
      lng: -81.3854,
    },
    property: {
      type: "Single Family",
      yearBuilt: 1998,
      stories: 2,
      squareFootage: 2850,
      lotSize: "0.3 acres",
    },
    roof: {
      totalArea: 3100,
      pitch: "5:12",
      ridges: 110,
      valleys: 65,
      facets: [
        {
          name: "Main Front",
          area: 950,
          pitch: "5:12",
          direction: "East",
        },
        {
          name: "Main Back",
          area: 950,
          pitch: "5:12",
          direction: "West",
        },
        {
          name: "Left Side",
          area: 600,
          pitch: "5:12",
          direction: "North",
        },
        {
          name: "Right Side",
          area: 600,
          pitch: "5:12",
          direction: "South",
        },
      ],
      materials: [
        {
          name: "Shingles",
          quantity: 31,
          unit: "Squares",
        },
        {
          name: "Underlayment",
          quantity: 3100,
          unit: "sq ft",
        },
        {
          name: "Ridge Cap",
          quantity: 110,
          unit: "ft",
        },
        {
          name: "Drip Edge",
          quantity: 220,
          unit: "ft",
        },
      ],
    },
    condition: {
      overall: "Poor",
      estimatedAge: 18,
      remainingLife: 1,
      issues: [
        {
          type: "Shingle Curling",
          severity: "Severe",
          description: "Significant curling and buckling of shingles across multiple facets.",
          location: "All Facets",
        },
        {
          type: "Moss Growth",
          severity: "Moderate",
          description: "Moss growth on north-facing slope, indicating moisture retention issues.",
          location: "North Facet",
        },
        {
          type: "Missing Shingles",
          severity: "Severe",
          description: "Multiple areas with missing shingles, exposing underlayment to elements.",
          location: "South and West Facets",
        },
        {
          type: "Flashing Damage",
          severity: "Severe",
          description: "Damaged and deteriorated flashing around chimney and vents.",
          location: "Roof Penetrations",
        },
      ],
    },
    images: {
      satellite: "/placeholder.svg?height=450&width=800&text=Satellite+View",
      aerial: "/placeholder.svg?height=200&width=400&text=Aerial+View",
      heatMap: "/placeholder.svg?height=200&width=400&text=Heat+Map",
      threeDModel: "/placeholder.svg?height=200&width=400&text=3D+Model",
    },
  },
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const address = searchParams.get("address")
    const detailed = searchParams.get("detailed") === "true"

    if (!address) {
      return NextResponse.json({ error: "Address parameter is required" }, { status: 400 })
    }

    // Try to find the address in our database
    const exactMatch = propertyDatabase[address]

    // If we have an exact match, return it
    if (exactMatch) {
      return NextResponse.json(exactMatch)
    }

    // Otherwise, generate a mock measurement based on the address
    const mockMeasurement = generateMockMeasurement(address, detailed)

    return NextResponse.json(mockMeasurement)
  } catch (error) {
    console.error("Measurement API error:", error)
    return NextResponse.json({ error: "Failed to fetch roof measurements" }, { status: 500 })
  }
}

// Generate mock measurement data for any address
function generateMockMeasurement(address: string, detailed: boolean): RoofMeasurementData {
  // Extract city and state if available
  const addressParts = address.split(",")
  const city = addressParts.length > 1 ? addressParts[1].trim() : "Orlando"
  const state = addressParts.length > 2 ? addressParts[2].trim() : "FL"

  // Generate random coordinates near Florida
  const lat = 27.5 + Math.random() * 2
  const lng = -82.5 + Math.random() * 2

  // Generate random year built between 1980 and 2015
  const yearBuilt = 1980 + Math.floor(Math.random() * 35)

  // Calculate age of roof (typically 5-10 years newer than house)
  const roofAge = Math.floor(new Date().getFullYear() - yearBuilt - Math.random() * 10)

  // Generate random square footage between 1800 and 3500
  const squareFootage = 1800 + Math.floor(Math.random() * 1700)

  // Calculate roof area (typically 15-20% larger than house footprint)
  const roofArea = Math.floor(squareFootage * (1.15 + Math.random() * 0.05))

  // Determine roof condition based on age
  let condition: "Excellent" | "Good" | "Fair" | "Poor" = "Good"
  let remainingLife = 15

  if (roofAge < 5) {
    condition = "Excellent"
    remainingLife = 20 - roofAge
  } else if (roofAge < 10) {
    condition = "Good"
    remainingLife = 15 - roofAge
  } else if (roofAge < 15) {
    condition = "Fair"
    remainingLife = 5 - Math.floor(Math.random() * 3)
  } else {
    condition = "Poor"
    remainingLife = 2 - Math.floor(Math.random() * 2)
  }

  // Ensure remaining life is at least 0
  remainingLife = Math.max(0, remainingLife)

  // Generate a more conservative remaining life estimate for sales purposes
  remainingLife = Math.floor(remainingLife * 0.7)

  // Generate random issues based on condition
  const issues = []

  if (condition === "Fair" || condition === "Poor") {
    issues.push({
      type: "Granule Loss",
      severity: condition === "Poor" ? "Severe" : "Moderate",
      description: `${condition === "Poor" ? "Significant" : "Moderate"} granule loss detected on south-facing slope, indicating aging shingles.`,
      location: "South Facet",
    })

    issues.push({
      type: "Wind Damage",
      severity: condition === "Poor" ? "Moderate" : "Minor",
      description: `${condition === "Poor" ? "Moderate" : "Minor"} wind damage detected on ridge caps and southeast corner.`,
      location: "Ridge and Southeast Corner",
    })
  }

  if (condition === "Poor") {
    issues.push({
      type: "Flashing Wear",
      severity: "Severe",
      description: "Chimney flashing shows significant deterioration with high potential for leaks.",
      location: "Chimney",
    })

    issues.push({
      type: "Shingle Curling",
      severity: "Moderate",
      description: "Shingle curling and buckling observed on multiple facets, indicating advanced age and heat damage.",
      location: "Multiple Facets",
    })
  }

  // Create the measurement data
  const measurementData: RoofMeasurementData = {
    address: address,
    coordinates: {
      lat,
      lng,
    },
    property: {
      type: Math.random() > 0.3 ? "Single Family" : "Multi-Family",
      yearBuilt,
      stories: Math.random() > 0.7 ? 2 : 1,
      squareFootage,
      lotSize: `${(0.2 + Math.random() * 0.5).toFixed(2)} acres`,
    },
    roof: {
      totalArea: roofArea,
      pitch: `${4 + Math.floor(Math.random() * 4)}:12`,
      ridges: Math.floor(roofArea * 0.035),
      valleys: Math.floor(roofArea * 0.02),
      facets: [
        {
          name: "Main Front",
          area: Math.floor(roofArea * 0.33),
          pitch: `${4 + Math.floor(Math.random() * 4)}:12`,
          direction: "South",
        },
        {
          name: "Main Back",
          area: Math.floor(roofArea * 0.33),
          pitch: `${4 + Math.floor(Math.random() * 4)}:12`,
          direction: "North",
        },
        {
          name: "Left Side",
          area: Math.floor(roofArea * 0.17),
          pitch: `${4 + Math.floor(Math.random() * 4)}:12`,
          direction: "East",
        },
        {
          name: "Right Side",
          area: Math.floor(roofArea * 0.17),
          pitch: `${4 + Math.floor(Math.random() * 4)}:12`,
          direction: "West",
        },
      ],
      materials: [
        {
          name: "Shingles",
          quantity: Math.ceil(roofArea / 100),
          unit: "Squares",
        },
        {
          name: "Underlayment",
          quantity: roofArea,
          unit: "sq ft",
        },
        {
          name: "Ridge Cap",
          quantity: Math.floor(roofArea * 0.035),
          unit: "ft",
        },
        {
          name: "Drip Edge",
          quantity: Math.floor(Math.sqrt(roofArea) * 4),
          unit: "ft",
        },
      ],
    },
    condition: {
      overall: condition,
      estimatedAge: roofAge,
      remainingLife,
      issues,
    },
    images: {
      satellite: "/placeholder.svg?height=450&width=800&text=Satellite+View",
      aerial: "/placeholder.svg?height=200&width=400&text=Aerial+View",
      heatMap: "/placeholder.svg?height=200&width=400&text=Heat+Map",
      threeDModel: "/placeholder.svg?height=200&width=400&text=3D+Model",
    },
  }

  return measurementData
}
