import { type NextRequest, NextResponse } from "next/server"

// Define document types
type DocumentData = {
  id: string
  type: "report" | "proposal" | "contract" | "inspection" | "warranty"
  title: string
  address: string
  date: string
  customer?: {
    name: string
    email: string
    phone: string
  }
  content: {
    sections: Array<{
      title: string
      content: string
      images?: string[]
    }>
  }
  status: "draft" | "sent" | "viewed" | "signed" | "expired"
  url: string
  thumbnailUrl: string
  createdAt: string
  updatedAt: string
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const address = searchParams.get("address")
    const type = searchParams.get("type") as "report" | "proposal" | "contract" | "inspection" | "warranty" | undefined
    const id = searchParams.get("id")

    // If ID is provided, return specific document
    if (id) {
      const document = generateMockDocument(id)
      return NextResponse.json(document)
    }

    // If address is provided, return documents for that address
    if (address) {
      const documents = generateMockDocumentsForAddress(address, type)
      return NextResponse.json(documents)
    }

    // If type is provided, return documents of that type
    if (type) {
      const documents = generateMockDocumentsByType(type)
      return NextResponse.json(documents)
    }

    // If no parameters, return all documents
    const documents = generateMockDocuments()
    return NextResponse.json(documents)
  } catch (error) {
    console.error("Documents API error:", error)
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 })
  }
}

// Generate a specific document by ID
function generateMockDocument(id: string): DocumentData {
  const documentTypes = ["report", "proposal", "contract", "inspection", "warranty"]
  const type = documentTypes[Number.parseInt(id.charAt(id.length - 1)) % documentTypes.length] as
    | "report"
    | "proposal"
    | "contract"
    | "inspection"
    | "warranty"

  const date = new Date()
  date.setDate(date.getDate() - (Number.parseInt(id.substring(id.length - 3)) % 30))

  const address = `${100 + (Number.parseInt(id.substring(id.length - 4)) % 900)} ${["Main St", "Oak Ave", "Maple Rd", "Pine Ln", "Cedar Dr"][Number.parseInt(id.charAt(id.length - 1)) % 5]}, Orlando, FL`

  return {
    id,
    type,
    title: `${type.charAt(0).toUpperCase() + type.slice(1)} for ${address}`,
    address,
    date: date.toISOString().split("T")[0],
    customer: {
      name: ["John Smith", "Jane Doe", "Robert Johnson", "Emily Williams", "Michael Brown"][
        Number.parseInt(id.charAt(id.length - 2)) % 5
      ],
      email: `customer${Number.parseInt(id.substring(id.length - 3))}@example.com`,
      phone: `(${400 + (Number.parseInt(id.substring(id.length - 3)) % 500)}) ${100 + (Number.parseInt(id.substring(id.length - 2)) % 900)}-${1000 + (Number.parseInt(id.substring(id.length - 4)) % 9000)}`,
    },
    content: {
      sections: generateSectionsForType(type),
    },
    status: ["draft", "sent", "viewed", "signed", "expired"][Number.parseInt(id.charAt(id.length - 1)) % 5] as
      | "draft"
      | "sent"
      | "viewed"
      | "signed"
      | "expired",
    url: `/api/docs/download?id=${id}`,
    thumbnailUrl: `/placeholder.svg?height=200&width=150&text=${type}+thumbnail`,
    createdAt: new Date(date.getTime() - 86400000).toISOString(),
    updatedAt: date.toISOString(),
  }
}

// Generate sections based on document type
function generateSectionsForType(
  type: "report" | "proposal" | "contract" | "inspection" | "warranty",
): Array<{ title: string; content: string; images?: string[] }> {
  switch (type) {
    case "report":
      return [
        {
          title: "Property Overview",
          content:
            "Single-family residential property with asphalt shingle roof. The property was built in 2005 and has approximately 2,150 square feet of living space.",
          images: ["/placeholder.svg?height=300&width=400&text=Property+Overview"],
        },
        {
          title: "Roof Measurements",
          content: "Total roof area: 2,450 sq ft\nPitch: 6:12\nRidges: 86 ft\nValleys: 42 ft",
          images: ["/placeholder.svg?height=300&width=400&text=Roof+Measurements"],
        },
        {
          title: "Condition Assessment",
          content:
            "The roof is in fair condition with signs of aging and weather damage. Estimated remaining life: 3-5 years. Several issues were identified that may require attention in the near future.",
          images: ["/placeholder.svg?height=300&width=400&text=Condition+Assessment"],
        },
        {
          title: "Identified Issues",
          content:
            "1. Moderate granule loss on south-facing slope\n2. Minor wind damage to ridge caps\n3. Worn flashing around chimney\n4. Some shingles showing signs of curling",
          images: [
            "/placeholder.svg?height=200&width=300&text=Granule+Loss",
            "/placeholder.svg?height=200&width=300&text=Wind+Damage",
          ],
        },
        {
          title: "Recommendations",
          content:
            "Based on our assessment, we recommend planning for a full roof replacement within the next 2-3 years. In the meantime, repairs to the flashing and damaged shingles would help prevent leaks and extend the roof's useful life.",
        },
      ]
    case "proposal":
      return [
        {
          title: "Project Scope",
          content:
            "Complete roof replacement including removal of existing materials, installation of new underlayment, shingles, flashing, and ventilation components.",
        },
        {
          title: "Materials",
          content:
            "- Owens Corning Duration® architectural shingles\n- Synthetic underlayment\n- Ice and water shield in valleys and eaves\n- Ridge vent system\n- New flashing and pipe boots",
          images: ["/placeholder.svg?height=300&width=400&text=Materials"],
        },
        {
          title: "Pricing Options",
          content:
            "Option 1: Essential Protection - $10,800\nOption 2: Premium Protection - $16,200 (Recommended)\nOption 3: Ultimate Protection - $22,800",
        },
        {
          title: "Warranty",
          content:
            "Limited Lifetime manufacturer warranty on shingles\n10-year workmanship warranty\nFree inspections for the first 2 years",
        },
        {
          title: "Timeline",
          content:
            "Estimated start date: Within 2-3 weeks of approval\nEstimated completion: 2-3 days (weather permitting)",
        },
      ]
    case "contract":
      return [
        {
          title: "Parties",
          content:
            'This agreement is made between [Contractor Name] ("Contractor") and [Customer Name] ("Customer") for work to be performed at [Property Address].',
        },
        {
          title: "Scope of Work",
          content:
            "Contractor agrees to perform a complete roof replacement including removal of existing materials, installation of new underlayment, shingles, flashing, and ventilation components as detailed in the attached proposal.",
        },
        {
          title: "Payment Terms",
          content:
            "Total contract amount: $16,200\nDeposit due at signing: $1,620 (10%)\nPayment due at material delivery: $6,480 (40%)\nFinal payment due upon completion: $8,100 (50%)",
        },
        {
          title: "Change Orders",
          content:
            "Any alterations or deviations from the above specifications involving extra costs will be executed only upon written change orders, and will become an extra charge over and above the estimate.",
        },
        {
          title: "Warranties",
          content:
            "Contractor provides a 10-year workmanship warranty. Manufacturer warranties are as provided by the manufacturer and are separate from this contract.",
        },
      ]
    case "inspection":
      return [
        {
          title: "Inspection Details",
          content:
            "Inspection Date: [Date]\nInspector: [Inspector Name]\nInspection Type: Comprehensive Roof Inspection",
          images: ["/placeholder.svg?height=300&width=400&text=Inspection+Overview"],
        },
        {
          title: "Roof Overview",
          content: "Roof Type: Asphalt Shingle\nEstimated Age: 12 years\nOverall Condition: Fair",
        },
        {
          title: "Exterior Inspection",
          content:
            "Shingles: Moderate granule loss, some curling\nFlashing: Worn around chimney and vents\nGutters: Functional but with some debris\nFascia/Soffit: Good condition with minor paint peeling",
          images: [
            "/placeholder.svg?height=200&width=300&text=Shingle+Condition",
            "/placeholder.svg?height=200&width=300&text=Flashing+Issues",
          ],
        },
        {
          title: "Interior Inspection",
          content:
            "Attic Inspection: No visible leaks\nInsulation: Adequate\nVentilation: Functioning but could be improved\nMoisture Readings: Normal levels",
          images: ["/placeholder.svg?height=300&width=400&text=Attic+Inspection"],
        },
        {
          title: "Conclusion",
          content:
            "The roof is showing signs of age-related wear but is still functional. No immediate replacement is necessary, but planning for replacement within 2-3 years is recommended. Some maintenance repairs would be beneficial to extend the roof's useful life.",
        },
      ]
    case "warranty":
      return [
        {
          title: "Warranty Coverage",
          content:
            "This warranty covers defects in materials and workmanship for the roof installation performed at [Property Address] on [Installation Date].",
        },
        {
          title: "Workmanship Warranty",
          content:
            "Contractor provides a 10-year workmanship warranty covering defects in installation. This warranty is transferable to new homeowners once during the warranty period with written notice to the contractor.",
        },
        {
          title: "Manufacturer Warranty",
          content:
            "Owens Corning Duration® shingles carry a Limited Lifetime manufacturer warranty for the original homeowner, and a 50-year non-prorated warranty for subsequent owners. This covers manufacturing defects that result in leaks.",
          images: ["/placeholder.svg?height=300&width=400&text=Warranty+Certificate"],
        },
        {
          title: "Exclusions",
          content:
            "This warranty does not cover damage from acts of God, including but not limited to hurricanes, tornadoes, floods, lightning, or fires. Damage from foot traffic, improper maintenance, or alterations to the roof by anyone other than the original contractor is also excluded.",
        },
        {
          title: "Claim Process",
          content:
            "To make a warranty claim, contact [Contractor Name] at [Phone Number] or [Email]. Claims should be made within 30 days of discovering a problem. Contractor will inspect the issue and make necessary repairs for valid warranty claims at no cost to the homeowner.",
        },
      ]
    default:
      return []
  }
}

// Generate documents for a specific address
function generateMockDocumentsForAddress(
  address: string,
  type?: "report" | "proposal" | "contract" | "inspection" | "warranty",
): DocumentData[] {
  const documents: DocumentData[] = []

  // Generate a unique but consistent ID based on the address
  const baseId = `DOC${address.split(" ")[0]}${address.length}`

  // Generate different document types
  const types = type ? [type] : ["report", "proposal", "contract", "inspection", "warranty"]

  types.forEach((docType, index) => {
    const id = `${baseId}${index}`
    const date = new Date()
    date.setDate(date.getDate() - index * 7) // Each document is a week apart

    documents.push({
      id,
      type: docType as "report" | "proposal" | "contract" | "inspection" | "warranty",
      title: `${docType.charAt(0).toUpperCase() + docType.slice(1)} for ${address}`,
      address,
      date: date.toISOString().split("T")[0],
      customer: {
        name: ["John Smith", "Jane Doe", "Robert Johnson", "Emily Williams", "Michael Brown"][index % 5],
        email: `customer${baseId.substring(3, 6)}@example.com`,
        phone: `(${400 + (Number.parseInt(baseId.substring(3, 6)) % 500)}) ${100 + (index % 900)}-${1000 + (Number.parseInt(baseId.substring(3, 6)) % 9000)}`,
      },
      content: {
        sections: generateSectionsForType(docType as "report" | "proposal" | "contract" | "inspection" | "warranty"),
      },
      status: ["draft", "sent", "viewed", "signed", "expired"][index % 5] as
        | "draft"
        | "sent"
        | "viewed"
        | "signed"
        | "expired",
      url: `/api/docs/download?id=${id}`,
      thumbnailUrl: `/placeholder.svg?height=200&width=150&text=${docType}+thumbnail`,
      createdAt: new Date(date.getTime() - 86400000).toISOString(),
      updatedAt: date.toISOString(),
    })
  })

  return documents
}

// Generate documents by type
function generateMockDocumentsByType(
  type: "report" | "proposal" | "contract" | "inspection" | "warranty",
): DocumentData[] {
  const documents: DocumentData[] = []

  // Generate 5 documents of the specified type
  for (let i = 0; i < 5; i++) {
    const id = `DOC${type.substring(0, 3).toUpperCase()}${1000 + i}`
    const date = new Date()
    date.setDate(date.getDate() - i * 5) // Each document is 5 days apart

    const address = `${100 + i * 100} ${["Main St", "Oak Ave", "Maple Rd", "Pine Ln", "Cedar Dr"][i % 5]}, Orlando, FL`

    documents.push({
      id,
      type,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} for ${address}`,
      address,
      date: date.toISOString().split("T")[0],
      customer: {
        name: ["John Smith", "Jane Doe", "Robert Johnson", "Emily Williams", "Michael Brown"][i % 5],
        email: `customer${i}@example.com`,
        phone: `(${400 + (i % 500)}) ${100 + (i % 900)}-${1000 + (i % 9000)}`,
      },
      content: {
        sections: generateSectionsForType(type),
      },
      status: ["draft", "sent", "viewed", "signed", "expired"][i % 5] as
        | "draft"
        | "sent"
        | "viewed"
        | "signed"
        | "expired",
      url: `/api/docs/download?id=${id}`,
      thumbnailUrl: `/placeholder.svg?height=200&width=150&text=${type}+thumbnail`,
      createdAt: new Date(date.getTime() - 86400000).toISOString(),
      updatedAt: date.toISOString(),
    })
  }

  return documents
}

// Generate a collection of mock documents
function generateMockDocuments(): DocumentData[] {
  const documents: DocumentData[] = []

  // Generate documents of each type
  const types: Array<"report" | "proposal" | "contract" | "inspection" | "warranty"> = [
    "report",
    "proposal",
    "contract",
    "inspection",
    "warranty",
  ]

  types.forEach((type) => {
    documents.push(...generateMockDocumentsByType(type))
  })

  return documents
}
