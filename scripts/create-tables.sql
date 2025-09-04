-- Create tables for RoofFax application

-- RoofFax signups table
CREATE TABLE IF NOT EXISTS rooffax_signups (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    report_id TEXT NOT NULL UNIQUE,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hot leads table
CREATE TABLE IF NOT EXISTS hot_leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    address TEXT NOT NULL,
    has_damage TEXT,
    damage_type TEXT[],
    urgency TEXT,
    has_insurance TEXT,
    had_inspection TEXT,
    suggested_work TEXT,
    contact_method TEXT,
    best_time TEXT,
    interested_in TEXT[],
    additional_concerns TEXT,
    priority TEXT DEFAULT 'LOW' CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH')),
    action TEXT,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contractor verifications table
CREATE TABLE IF NOT EXISTS contractor_verifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    contractor_name TEXT NOT NULL,
    user_ip TEXT,
    result_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_rooffax_signups_email ON rooffax_signups(email);
CREATE INDEX IF NOT EXISTS idx_rooffax_signups_created_at ON rooffax_signups(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_hot_leads_priority ON hot_leads(priority);
CREATE INDEX IF NOT EXISTS idx_hot_leads_created_at ON hot_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contractor_verifications_created_at ON contractor_verifications(created_at DESC);

-- Enable Row Level Security
ALTER TABLE rooffax_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE hot_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE contractor_verifications ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (forms)
CREATE POLICY "Allow public insert on rooffax_signups" ON rooffax_signups
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public insert on hot_leads" ON hot_leads
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public insert on contractor_verifications" ON contractor_verifications
    FOR INSERT WITH CHECK (true);

-- Create policies for service role (admin access)
CREATE POLICY "Allow service role full access on rooffax_signups" ON rooffax_signups
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access on hot_leads" ON hot_leads
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access on contractor_verifications" ON contractor_verifications
    FOR ALL USING (auth.role() = 'service_role');
