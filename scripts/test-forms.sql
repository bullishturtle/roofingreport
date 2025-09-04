-- Test script to verify all forms are working properly
-- Run this after deployment to check database connectivity

-- Check if signups table exists and is accessible
SELECT COUNT(*) as signup_count FROM signups;

-- Check if hot_leads table exists and is accessible  
SELECT COUNT(*) as hot_leads_count FROM hot_leads;

-- Check if contractor_verifications table exists and is accessible
SELECT COUNT(*) as verification_count FROM contractor_verifications;

-- Check if demo_analyses table exists and is accessible
SELECT COUNT(*) as demo_count FROM demo_analyses;

-- Show recent signups (last 24 hours)
SELECT 
  first_name,
  last_name, 
  email,
  address,
  status,
  created_at
FROM signups 
WHERE created_at > NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC
LIMIT 10;

-- Show recent contractor verifications
SELECT 
  contractor_name,
  user_address,
  searched_at
FROM contractor_verifications
WHERE searched_at > NOW() - INTERVAL '24 hours'
ORDER BY searched_at DESC
LIMIT 10;

-- Show recent demo analyses
SELECT 
  address,
  user_email,
  analyzed_at
FROM demo_analyses
WHERE analyzed_at > NOW() - INTERVAL '24 hours'
ORDER BY analyzed_at DESC
LIMIT 10;
