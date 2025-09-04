-- Test the forms functionality by creating sample data and verifying tables

-- Create demo_analyses table if it doesn't exist
CREATE TABLE IF NOT EXISTS demo_analyses (
  id SERIAL PRIMARY KEY,
  analysis_id VARCHAR(255) UNIQUE NOT NULL,
  property_address TEXT NOT NULL,
  analysis_type VARCHAR(100) DEFAULT 'demo',
  overall_score INTEGER,
  findings JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contractor_verifications table if it doesn't exist  
CREATE TABLE IF NOT EXISTS contractor_verifications (
  id SERIAL PRIMARY KEY,
  verification_id VARCHAR(255) UNIQUE NOT NULL,
  contractor_name VARCHAR(255) NOT NULL,
  risk_level VARCHAR(50),
  license_status VARCHAR(100),
  warnings JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create signups table if it doesn't exist
CREATE TABLE IF NOT EXISTS signups (
  id SERIAL PRIMARY KEY,
  report_id VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  address TEXT NOT NULL,
  verification_status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create hot_leads table if it doesn't exist
CREATE TABLE IF NOT EXISTS hot_leads (
  id SERIAL PRIMARY KEY,
  lead_id VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  urgency VARCHAR(50) NOT NULL,
  interested_in JSONB,
  damage_description TEXT,
  insurance_claim BOOLEAN DEFAULT FALSE,
  contractor_contact BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Test signups table
INSERT INTO signups (report_id, first_name, last_name, email, phone, address) 
VALUES ('TEST-SIGNUP-001', 'Test', 'User', 'test@example.com', '555-0123', '123 Test Ave, Test City, FL')
ON CONFLICT (report_id) DO NOTHING;

-- Test contractor_verifications table  
INSERT INTO contractor_verifications (verification_id, contractor_name, risk_level, license_status, warnings)
VALUES ('TEST-VERIFY-001', 'Test Roofing Company', 'MEDIUM', 'Verification Needed', '[]'::jsonb)
ON CONFLICT (verification_id) DO NOTHING;

-- Test demo_analyses table
INSERT INTO demo_analyses (analysis_id, property_address, overall_score, findings) VALUES 
('TEST-DEMO-001', '123 Test Street, Pensacola, FL', 75, '[]'::jsonb)
ON CONFLICT (analysis_id) DO NOTHING;

-- Verify all tables have data
SELECT 'demo_analyses' as table_name, COUNT(*) as record_count FROM demo_analyses
UNION ALL
SELECT 'contractor_verifications', COUNT(*) FROM contractor_verifications  
UNION ALL
SELECT 'signups', COUNT(*) FROM signups
UNION ALL
SELECT 'hot_leads', COUNT(*) FROM hot_leads;

-- Check recent entries
SELECT 'Recent Signups' as category, first_name, last_name, email, created_at FROM signups ORDER BY created_at DESC LIMIT 5;
SELECT 'Recent Verifications' as category, contractor_name, created_at FROM contractor_verifications ORDER BY created_at DESC LIMIT 5;
SELECT 'Recent Demos' as category, property_address, created_at FROM demo_analyses ORDER BY created_at DESC LIMIT 5;
