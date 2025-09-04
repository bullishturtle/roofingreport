const { createClient } = require("@supabase/supabase-js")

// Test Supabase connection
async function testConnection() {
  console.log("🔍 Testing Supabase connection...")

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Missing Supabase environment variables")
    return
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    // Test basic connection
    const { data, error } = await supabase.from("rooffax_signups").select("count").limit(1)

    if (error) {
      console.error("❌ Connection failed:", error.message)
      return
    }

    console.log("✅ Supabase connection successful!")

    // Test insert
    const testData = {
      first_name: "Test",
      last_name: "User",
      email: "test@example.com",
      phone: "555-0123",
      address: "123 Test St",
      report_id: "TEST-" + Date.now(),
    }

    const { data: insertData, error: insertError } = await supabase.from("rooffax_signups").insert(testData).select()

    if (insertError) {
      console.error("❌ Insert test failed:", insertError.message)
      return
    }

    console.log("✅ Insert test successful!")

    // Clean up test data
    if (insertData && insertData[0]) {
      await supabase.from("rooffax_signups").delete().eq("id", insertData[0].id)
      console.log("✅ Test data cleaned up")
    }
  } catch (err) {
    console.error("❌ Test failed:", err.message)
  }
}

testConnection()
