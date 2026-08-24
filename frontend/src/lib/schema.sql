-- Supabase SQL Table Schema for Portfolio Visitor Logs
-- Run this query in your Supabase SQL Editor:

CREATE TABLE IF NOT EXISTS visitors (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  location TEXT,
  ip_address TEXT,
  device TEXT,
  page_url TEXT,
  referrer TEXT,
  user_agent TEXT
);

-- Enable Row Level Security (RLS) & allow anonymous inserts
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts to visitors table"
  ON visitors FOR INSERT
  WITH CHECK (true);
