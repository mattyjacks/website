-- Create page_views table for tracking website visits
CREATE TABLE IF NOT EXISTS page_views (
  id BIGSERIAL PRIMARY KEY,
  path TEXT NOT NULL,
  viewer_type TEXT NOT NULL CHECK (viewer_type IN ('human', 'bot', 'unknown')),
  user_agent TEXT,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(path);
CREATE INDEX IF NOT EXISTS idx_page_views_viewer_type ON page_views(viewer_type);
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at);

-- Create page_view_stats table for aggregated stats
CREATE TABLE IF NOT EXISTS page_view_stats (
  id BIGSERIAL PRIMARY KEY,
  path TEXT NOT NULL UNIQUE,
  humans INT DEFAULT 0,
  bots INT DEFAULT 0,
  unknown INT DEFAULT 0,
  total INT DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create api_costs table for tracking API usage
CREATE TABLE IF NOT EXISTS api_costs (
  id BIGSERIAL PRIMARY KEY,
  category TEXT NOT NULL,
  input_tokens INT DEFAULT 0,
  output_tokens INT DEFAULT 0,
  total_tokens INT DEFAULT 0,
  total_cost DECIMAL(10, 4) DEFAULT 0,
  requests DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_api_costs_category ON api_costs(category);
CREATE INDEX IF NOT EXISTS idx_api_costs_created_at ON api_costs(created_at);

-- Create api_cost_summary table for quick lookups
CREATE TABLE IF NOT EXISTS api_cost_summary (
  id BIGSERIAL PRIMARY KEY,
  total_requests INT DEFAULT 0,
  total_input_tokens INT DEFAULT 0,
  total_output_tokens INT DEFAULT 0,
  total_tokens INT DEFAULT 0,
  total_cost DECIMAL(10, 4) DEFAULT 0,
  openserv_prompts INT DEFAULT 0,
  openserv_cost DECIMAL(10, 4) DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_view_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_costs ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_cost_summary ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access (for clout calculations page)
CREATE POLICY "Allow public read on page_views" ON page_views FOR SELECT USING (true);
CREATE POLICY "Allow public read on page_view_stats" ON page_view_stats FOR SELECT USING (true);
CREATE POLICY "Allow public read on api_costs" ON api_costs FOR SELECT USING (true);
CREATE POLICY "Allow public read on api_cost_summary" ON api_cost_summary FOR SELECT USING (true);

-- Allow service role to insert/update (for backend API)
CREATE POLICY "Allow service role insert on page_views" ON page_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow service role update on page_view_stats" ON page_view_stats FOR UPDATE USING (true);
CREATE POLICY "Allow service role insert on api_costs" ON api_costs FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow service role update on api_cost_summary" ON api_cost_summary FOR UPDATE USING (true);
