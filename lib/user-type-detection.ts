// User type detection and routing logic
export type UserType = "homeowner" | "professional" | "unknown"

export interface UserPreference {
  type: UserType
  interests: string[]
  visitCount: number
  lastVisit: Date
}

// Initialize or retrieve user preferences from localStorage
export function getUserPreference(): UserPreference {
  if (typeof window === "undefined") {
    return {
      type: "unknown",
      interests: [],
      visitCount: 0,
      lastVisit: new Date(),
    }
  }

  const storedPreference = localStorage.getItem("userPreference")

  if (storedPreference) {
    const preference = JSON.parse(storedPreference)
    preference.visitCount += 1
    preference.lastVisit = new Date()
    localStorage.setItem("userPreference", JSON.stringify(preference))
    return preference
  }

  // First visit
  const initialPreference: UserPreference = {
    type: "unknown",
    interests: [],
    visitCount: 1,
    lastVisit: new Date(),
  }

  localStorage.setItem("userPreference", JSON.stringify(initialPreference))
  return initialPreference
}

// Update user type based on their interactions
export function updateUserType(type: UserType): void {
  if (typeof window === "undefined") return

  const preference = getUserPreference()
  preference.type = type
  localStorage.setItem("userPreference", JSON.stringify(preference))
}

// Add user interest based on their interactions
export function addUserInterest(interest: string): void {
  if (typeof window === "undefined") return

  const preference = getUserPreference()
  if (!preference.interests.includes(interest)) {
    preference.interests.push(interest)
    localStorage.setItem("userPreference", JSON.stringify(preference))
  }
}

// Get appropriate redirect URL based on user type
export function getRedirectUrl(userType: UserType): string {
  switch (userType) {
    case "homeowner":
      return "https://trustthefox.com"
    case "professional":
      return "https://rooffaxpro.com"
    default:
      return "/user-type-selection"
  }
}
