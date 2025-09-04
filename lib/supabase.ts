import { createClient as createSupabaseClient } from "@supabase/supabase-js"

// Your Supabase project credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

// Create and export the client creation function
export function createClient() {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}

// Export the default client instance
export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface RoofFaxSignup {
  id?: string
  first_name: string
  last_name: string
  email: string
  phone: string
  address: string
  report_id: string
  created_at?: string
  status?: "pending" | "processing" | "completed"
}

export interface HotLead {
  id?: string
  full_name: string
  phone: string
  email: string
  address: string
  has_damage: boolean
  damage_type?: string[]
  urgency?: "immediate" | "week" | "month"
  has_insurance?: "yes" | "no" | "unsure"
  had_inspection: boolean
  suggested_work?: string
  contact_method: "phone" | "email" | "text"
  best_time: "morning" | "afternoon" | "evening"
  interested_in: string[]
  additional_concerns?: string
  priority: "HIGH" | "MEDIUM" | "LOW"
  action: string
  created_at?: string
  status?: "new" | "contacted" | "completed"
}

export interface ContractorVerification {
  id?: string
  contractor_name: string
  user_ip?: string
  result_data: any
  created_at?: string
}

export interface Signup {
  id?: string
  name: string
  email: string
  phone: string
  company?: string
  address?: string
  verification_status?: "pending" | "verified" | "rejected"
  created_at?: string
}

export interface DemoAnalysis {
  id?: string
  analysis_id: string
  property_address: string
  analysis_type?: string
  overall_score?: number
  findings?: any
  created_at?: string
}
