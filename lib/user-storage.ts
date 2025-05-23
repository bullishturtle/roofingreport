// User data storage service
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = proSUPABASE_NEXT_PUBLIC_SUPABASE_ANON_KEY_ANON_KEY || ""
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface UserData {
  email: string
  firstName?: string
  lastName?: string
  userType: "homeowner" | "professional"
  company?: string
  phone?: string
  address?: string
  reportCredits: number
  createdAt: Date
}

// Store user data in Supabase
export async function storeUserData(
  userData: Omit<UserData, "createdAt" | "reportCredits">,
): Promise<{ success: boolean; error?: string; userId?: string }> {
  try {
    // First create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: Math.random().toString(36).slice(-8) + Math.random().toString(36).toUpperCase().slice(-4) + "!1", // Generate secure random password
    })

    if (authError) throw new Error(authError.message)

    // Then store user profile data
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          ...userData,
          auth_id: authData.user?.id,
          report_credits: 1, // Start with one free report
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) throw new Error(error.message)

    return { success: true, userId: data?.[0]?.id }
  } catch (error) {
    console.error("Error storing user data:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error occurred" }
  }
}

// Get user data from Supabase
export async function getUserData(userId: string): Promise<{ data?: UserData; error?: string }> {
  try {
    const { data, error } = await supabase.from("users").select("*").eq("id", userId).single()

    if (error) throw new Error(error.message)

    return { data: data as UserData }
  } catch (error) {
    console.error("Error fetching user data:", error)
    return { error: error instanceof Error ? error.message : "Unknown error occurred" }
  }
}

// Decrement report credits
export async function useReportCredit(
  userId: string,
): Promise<{ success: boolean; creditsRemaining?: number; error?: string }> {
  try {
    // First get current credits
    const { data: userData, error: fetchError } = await supabase
      .from("users")
      .select("report_credits")
      .eq("id", userId)
      .single()

    if (fetchError) throw new Error(fetchError.message)

    if (userData.report_credits < 1) {
      return { success: false, creditsRemaining: 0, error: "No report credits remaining" }
    }

    // Update credits
    const { data, error } = await supabase
      .from("users")
      .update({ report_credits: userData.report_credits - 1 })
      .eq("id", userId)
      .select("report_credits")

    if (error) throw new Error(error.message)

    return { success: true, creditsRemaining: data?.[0]?.report_credits }
  } catch (error) {
    console.error("Error using report credit:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error occurred" }
  }
}
