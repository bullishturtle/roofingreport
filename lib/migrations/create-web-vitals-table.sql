CREATE TABLE IF NOT EXISTS web_vitals (
  id SERIAL PRIMARY KEY,
  metric_id VARCHAR(255) NOT NULL,
  metric_name VARCHAR(50) NOT NULL,
  metric_value FLOAT NOT NULL,
  metric_rating VARCHAR(50) NOT NULL,
  metric_delta FLOAT,
  navigation_type VARCHAR(255),
  url TEXT NOT NULL,
  user_agent TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_web_vitals_metric_name ON web_vitals(metric_name);
CREATE INDEX IF NOT EXISTS idx_web_vitals_timestamp ON web_vitals(timestamp);
CREATE INDEX IF NOT EXISTS idx_web_vitals_url ON web_vitals(url);
