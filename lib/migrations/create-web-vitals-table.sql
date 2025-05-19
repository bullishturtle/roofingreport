-- Create web_vitals table for storing Core Web Vitals metrics
CREATE TABLE IF NOT EXISTS web_vitals (
  id SERIAL PRIMARY KEY,
  metric_id TEXT NOT NULL,
  metric_name TEXT NOT NULL,
  metric_value FLOAT NOT NULL,
  metric_rating TEXT NOT NULL,
  metric_delta FLOAT,
  navigation_type TEXT,
  url TEXT NOT NULL,
  user_agent TEXT,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_web_vitals_metric_name ON web_vitals(metric_name);
CREATE INDEX IF NOT EXISTS idx_web_vitals_timestamp ON web_vitals(timestamp);
CREATE INDEX IF NOT EXISTS idx_web_vitals_url ON web_vitals(url);
