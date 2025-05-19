import { sql } from "./db"

export async function initializeDatabase() {
  console.log("Initializing database schema...")

  try {
    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255),
        user_type VARCHAR(50) NOT NULL DEFAULT 'homeowner',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP WITH TIME ZONE,
        email_verified BOOLEAN DEFAULT FALSE,
        verification_token VARCHAR(255),
        verification_token_expires TIMESTAMP WITH TIME ZONE,
        reset_password_token VARCHAR(255),
        reset_password_expires TIMESTAMP WITH TIME ZONE
      )
    `

    // Create reports table
    await sql`
      CREATE TABLE IF NOT EXISTS reports (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id),
        address VARCHAR(255) NOT NULL,
        city VARCHAR(100) NOT NULL,
        state VARCHAR(50) NOT NULL,
        zip VARCHAR(20) NOT NULL,
        report_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        roof_age INTEGER,
        roof_type VARCHAR(100),
        roof_condition VARCHAR(50),
        estimated_remaining_life INTEGER,
        last_inspection_date TIMESTAMP WITH TIME ZONE,
        report_status VARCHAR(50) DEFAULT 'completed',
        report_data JSONB
      )
    `

    // Create properties table
    await sql`
      CREATE TABLE IF NOT EXISTS properties (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id),
        address VARCHAR(255) NOT NULL,
        city VARCHAR(100) NOT NULL,
        state VARCHAR(50) NOT NULL,
        zip VARCHAR(20) NOT NULL,
        property_type VARCHAR(100),
        year_built INTEGER,
        square_footage INTEGER,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `

    console.log("Database schema initialized successfully")
  } catch (error) {
    console.error("Error initializing database schema:", error)
    throw error
  }
}

// Function to seed the database with initial data
export async function seedDatabase() {
  console.log("Seeding database with initial data...")

  try {
    // Check if we already have users
    const existingUsers = await sql`SELECT COUNT(*) FROM users`

    if (Number.parseInt(existingUsers[0].count) > 0) {
      console.log("Database already has users, skipping seed")
      return
    }

    // Create a test admin user
    await sql`
      INSERT INTO users (
        name, 
        email, 
        password, 
        user_type, 
        email_verified
      ) VALUES (
        'Admin User', 
        'admin@rooffax.report', 
        '$2a$10$eCjlKPL7RQMwT3.6Tn5Bz.xpQQTm.pYSm4OvSRk/LFJZPVQgvXUcW', -- password: admin123
        'admin',
        TRUE
      )
    `

    // Create some test reports
    const adminUser = await sql`SELECT id FROM users WHERE email = 'admin@rooffax.report'`
    const adminId = adminUser[0].id

    await sql`
      INSERT INTO reports (
        user_id,
        address,
        city,
        state,
        zip,
        roof_age,
        roof_type,
        roof_condition,
        estimated_remaining_life,
        report_data
      ) VALUES (
        ${adminId},
        '123 Main St',
        'Anytown',
        'FL',
        '32501',
        12,
        'Asphalt Shingle',
        'Good',
        8,
        ${JSON.stringify({
          issues: [
            { severity: "low", description: "Minor granule loss on south-facing slope" },
            { severity: "medium", description: "Some flashing deterioration around chimney" },
          ],
          recommendations: ["Schedule inspection in 2 years", "Monitor chimney flashing for further deterioration"],
          images: ["/roof-aerial-view.png", "/roof-closeup.png"],
        })}
      )
    `

    console.log("Database seeded successfully")
  } catch (error) {
    console.error("Error seeding database:", error)
    throw error
  }
}
