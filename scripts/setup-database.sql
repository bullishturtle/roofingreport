-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Signups table
CREATE TABLE IF NOT EXISTS signups (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    report_id VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RoofFax Signups table
CREATE TABLE IF NOT EXISTS rooffax_signups (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  report_id TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Hot Leads table
CREATE TABLE IF NOT EXISTS hot_leads (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(200) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    urgency VARCHAR(10) NOT NULL,
    priority VARCHAR(10) NOT NULL,
    interested_in TEXT[],
    damage_description TEXT,
    insurance_claim BOOLEAN DEFAULT FALSE,
    contractor_contact BOOLEAN DEFAULT FALSE,
    lead_id VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Contractor Verifications table
CREATE TABLE IF NOT EXISTS contractor_verifications (
    id SERIAL PRIMARY KEY,
    search_term VARCHAR(255) NOT NULL,
    searched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_signups_email ON signups(email);
CREATE INDEX IF NOT EXISTS idx_signups_report_id ON signups(report_id);
CREATE INDEX IF NOT EXISTS idx_signups_created_at ON signups(created_at);

CREATE INDEX IF NOT EXISTS idx_rooffax_signups_email ON rooffax_signups(email);
CREATE INDEX IF NOT EXISTS idx_rooffax_signups_created_at ON rooffax_signups(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_rooffax_signups_report_id ON rooffax_signups(report_id);

CREATE INDEX IF NOT EXISTS idx_hot_leads_email ON hot_leads(email);
CREATE INDEX IF NOT EXISTS idx_hot_leads_lead_id ON hot_leads(lead_id);
CREATE INDEX IF NOT EXISTS idx_hot_leads_priority ON hot_leads(priority);
CREATE INDEX IF NOT EXISTS idx_hot_leads_created_at ON hot_leads(created_at);

CREATE INDEX IF NOT EXISTS idx_contractor_verifications_searched_at ON contractor_verifications(searched_at);

-- Enable Row Level Security (RLS)
ALTER TABLE signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooffax_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE hot_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE contractor_verifications ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public inserts (for the forms)
CREATE POLICY "Allow public inserts on signups" ON signups
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public inserts on rooffax_signups" ON rooffax_signups
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public inserts on hot_leads" ON hot_leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public inserts on contractor_verifications" ON contractor_verifications
  FOR INSERT WITH CHECK (true);

-- Create policies to allow service role to read all data (for admin dashboard)
CREATE POLICY "Service role can manage signups" ON signups
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role to read rooffax_signups" ON rooffax_signups
  FOR SELECT USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage hot_leads" ON hot_leads
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role to read contractor_verifications" ON contractor_verifications
  FOR SELECT USING (auth.role() = 'service_role');

-- Create policies for service role access
CREATE POLICY "Service role can manage contractor_verifications" ON contractor_verifications
    FOR ALL USING (auth.role() = 'service_role');

-- Allow anon users to read their own data (optional, for user dashboards later)
CREATE POLICY "Allow anon to read signups" ON signups
  FOR SELECT USING (true);

CREATE POLICY "Allow anon to read rooffax_signups" ON rooffax_signups
  FOR SELECT USING (true);

CREATE POLICY "Allow anon to read hot_leads" ON hot_leads
  FOR SELECT USING (true);

CREATE POLICY "Allow anon to read contractor_verifications" ON contractor_verifications
  FOR SELECT USING (true);
