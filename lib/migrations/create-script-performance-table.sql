CREATE TABLE IF NOT EXISTS script_performance_reports (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  timestamp TIMESTAMP NOT NULL,
  total_script_time FLOAT NOT NULL,
  total_script_size INTEGER NOT NULL,
  longest_script TEXT NOT NULL,
  longest_script_time FLOAT NOT NULL,
  largest_script TEXT NOT NULL,
  largest_script_size INTEGER NOT NULL,
  report_data JSONB NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create indexes for efficient querying
CREATE INDEX IF NOT EXISTS script_performance_reports_timestamp_idx ON script_performance_reports(timestamp);
CREATE INDEX IF NOT EXISTS script_performance_reports_url_idx ON script_performance_reports(url);
