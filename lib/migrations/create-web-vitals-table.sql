CREATE TABLE IF NOT EXISTS web_vitals (
  id SERIAL PRIMARY KEY,
  name VARCHAR(10) NOT NULL,
  value FLOAT NOT NULL,
  rating VARCHAR(20) NOT NULL,
  url TEXT NOT NULL,
  user_agent TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS web_vitals_name_idx ON web_vitals(name);
CREATE INDEX IF NOT EXISTS web_vitals_timestamp_idx ON web_vitals(timestamp);
