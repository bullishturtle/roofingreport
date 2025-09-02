-- Create RoofFax Signups table
CREATE TABLE IF NOT EXISTS rooffax_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
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
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  has_damage BOOLEAN NOT NULL,
  damage_type TEXT[],
  urgency TEXT CHECK (urgency IN ('immediate', 'week', 'month')),
  has_insurance TEXT CHECK (has_insurance IN ('yes', 'no', 'unsure')),
  had_inspection BOOLEAN NOT NULL,
  suggested_work TEXT,
  contact_method TEXT NOT NULL CHECK (contact_method IN ('phone', 'email', 'text')),
  best_time TEXT NOT NULL CHECK (best_time IN ('morning', 'afternoon', 'evening')),
  interested_in TEXT[] NOT NULL,
  additional_concerns TEXT,
  priority TEXT NOT NULL CHECK (priority IN ('HIGH', 'MEDIUM', 'LOW')),
  action TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Contractor Verifications table
CREATE TABLE IF NOT EXISTS contractor_verifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contractor_name TEXT NOT NULL,
  user_ip TEXT,
  result_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_rooffax_signups_email ON rooffax_signups(email);
CREATE INDEX IF NOT EXISTS idx_rooffax_signups_created_at ON rooffax_signups(created_at);
CREATE INDEX IF NOT EXISTS idx_hot_leads_priority ON hot_leads(priority);
CREATE INDEX IF NOT EXISTS idx_hot_leads_status ON hot_leads(status);
CREATE INDEX IF NOT EXISTS idx_hot_leads_created_at ON hot_leads(created_at);
CREATE INDEX IF NOT EXISTS idx_contractor_verifications_created_at ON contractor_verifications(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE rooffax_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE hot_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE contractor_verifications ENABLE ROW LEVEL SECURITY;

-- Create policies to allow inserts from the application
CREATE POLICY "Allow public inserts on rooffax_signups" ON rooffax_signups
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public inserts on hot_leads" ON hot_leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public inserts on contractor_verifications" ON contractor_verifications
  FOR INSERT WITH CHECK (true);

-- Create policies to allow reads for the application (you may want to restrict this in production)
CREATE POLICY "Allow service role to read rooffax_signups" ON rooffax_signups
  FOR SELECT USING (true);

CREATE POLICY "Allow service role to read hot_leads" ON hot_leads
  FOR SELECT USING (true);

CREATE POLICY "Allow service role to read contractor_verifications" ON contractor_verifications
  FOR SELECT USING (true);
