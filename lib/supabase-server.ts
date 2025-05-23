import { createClient } from "@supabase/supabase-js"

// This function safely creates a Supabase client for server components
export function createServerSupabaseClient() {
  // Safely access environment variables with fallbacks
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

  // Check if we have the required environment variables
  if (!supabaseUrl || !supabaseKey) {
    console.warn("Supabase environment variables are missing. Using mock client.")

    // Return a mock client that won't throw errors during build
    return {
      auth: {
        signUp: async () => ({ data: null, error: new Error("Supabase not configured") }),
        signIn: async () => ({ data: null, error: new Error("Supabase not configured") }),
        signOut: async () => ({ error: null }),
      },
      from: () => ({
        select: () => ({ data: [], error: null }),
        insert: () => ({ data: null, error: null }),
        update: () => ({ data: null, error: null }),
        delete: () => ({ data: null, error: null }),
      }),
    }
  }

  // Create and return the real client
  return createClient(supabaseUrl, supabaseKey)
}
