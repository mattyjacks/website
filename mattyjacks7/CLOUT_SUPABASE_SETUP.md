# Clout Calculations - Supabase Setup Guide

## Overview
This document provides the complete Supabase migration and integration for the Clout Calculations system on mattyjacks.com.

## Accurate API Pricing
**OpenAI GPT-4o mini:**
- Input tokens: $0.15 per 1M tokens ($0.00015 per token)
- Output tokens: $0.60 per 1M tokens ($0.0006 per token)

## Database Schema

### Tables Created

#### 1. `page_views` - Individual page visit records
```sql
CREATE TABLE page_views (
  id BIGSERIAL PRIMARY KEY,
  path TEXT NOT NULL,
  viewer_type TEXT CHECK (viewer_type IN ('human', 'bot', 'unknown')),
  user_agent TEXT,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
- Tracks every page visit with viewer type classification
- Indexed by path, viewer_type, and created_at for fast queries

#### 2. `page_view_stats` - Aggregated page statistics
```sql
CREATE TABLE page_view_stats (
  id BIGSERIAL PRIMARY KEY,
  path TEXT NOT NULL UNIQUE,
  humans INT DEFAULT 0,
  bots INT DEFAULT 0,
  unknown INT DEFAULT 0,
  total INT DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
- Maintains running totals per page
- Updated on every view via `recordView()` in view-tracker-store.ts

#### 3. `api_costs` - API costs by category
```sql
CREATE TABLE api_costs (
  id BIGSERIAL PRIMARY KEY,
  category TEXT NOT NULL UNIQUE,
  input_tokens BIGINT DEFAULT 0,
  output_tokens BIGINT DEFAULT 0,
  total_tokens BIGINT DEFAULT 0,
  total_cost DECIMAL(12, 6) DEFAULT 0,
  requests DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
- Tracks costs per category (MattyJacks, GiveGigs, CryptArtist, OpenServ, etc.)
- Updated via `trackCategorizedCost()` in category-cost-tracker.ts

#### 4. `api_cost_summary` - Total cost summary
```sql
CREATE TABLE api_cost_summary (
  id BIGSERIAL PRIMARY KEY,
  total_requests BIGINT DEFAULT 0,
  total_input_tokens BIGINT DEFAULT 0,
  total_output_tokens BIGINT DEFAULT 0,
  total_tokens BIGINT DEFAULT 0,
  total_cost DECIMAL(12, 6) DEFAULT 0,
  openserv_prompts BIGINT DEFAULT 0,
  openserv_cost DECIMAL(12, 6) DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
- Quick lookup for total costs across all categories
- Maintains OpenServ-specific metrics

## Setup Instructions

### 1. Run the Migration
1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy the entire contents of `lib/supabase/migrations.sql`
4. Paste into the SQL Editor and execute

### 2. Verify Tables Created
Run these queries in Supabase SQL Editor to verify:
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('page_views', 'page_view_stats', 'api_costs', 'api_cost_summary');
```

### 3. Enable RLS Policies
The migration automatically enables Row Level Security with policies:
- **Public read access** on all tables (for clout calculations page)
- **Service role insert/update** (for backend API)

### 4. Environment Variables
Ensure your `.env.local` contains:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Code Integration

### Files Modified
1. **`app/api/chat/route.ts`** - Updated pricing calculation
   - Input: $0.15 per 1M tokens
   - Output: $0.60 per 1M tokens

2. **`lib/category-cost-tracker.ts`** - Persists costs to Supabase
   - `trackCategorizedCost()` writes to `api_costs` table
   - Maintains in-memory cache for fast reads

3. **`lib/view-tracker-store.ts`** - Persists views to Supabase
   - `recordView()` writes to `page_views` table
   - Updates `page_view_stats` aggregates

4. **`components/clout-calculations.tsx`** - Displays live stats
   - Polls `/api/views` and `/api/category-costs` every 4.2 seconds
   - Shows page views, API costs, and category breakdown

### API Endpoints

#### GET `/api/views`
Returns page view statistics:
```json
{
  "allStats": {
    "/": { "humans": 1, "bots": 0, "unknown": 0, "total": 1 },
    "/services": { "humans": 5, "bots": 2, "unknown": 0, "total": 7 }
  },
  "siteStats": { "humans": 100, "bots": 10, "unknown": 5, "total": 115 }
}
```

#### GET `/api/category-costs`
Returns category cost breakdown:
```json
{
  "categoryBreakdown": [
    {
      "category": "MattyJacks",
      "cost": 12.50,
      "percentage": 45.5,
      "requests": 250
    },
    {
      "category": "OpenServ",
      "cost": 8.75,
      "percentage": 31.8,
      "requests": 175
    }
  ]
}
```

## Data Flow

### View Tracking
1. User visits page → `view-tracker.tsx` component mounts
2. Sends POST to `/api/views` with path
3. API calls `recordView()` from `view-tracker-store.ts`
4. `recordView()` inserts into `page_views` table (async, non-blocking)
5. Updates `page_view_stats` with aggregated counts
6. Returns cached stats immediately to client

### Cost Tracking
1. Chat API processes request with OpenAI
2. Calculates tokens and cost using accurate pricing
3. Calls `trackCategorizedCost()` from `category-cost-tracker.ts`
4. Categorizes prompt (MattyJacks, GiveGigs, etc.)
5. Inserts/updates `api_costs` table per category
6. Maintains in-memory cache for fast retrieval

### Display
1. Clout Calculations component polls every 4.2 seconds
2. Fetches `/api/views` and `/api/category-costs`
3. Updates UI with live statistics
4. Shows percentage of clout on current page

## Pricing Reference

### GPT-4o mini (Current Model)
- **Input**: $0.15 per 1M tokens
- **Output**: $0.60 per 1M tokens
- **Example**: 1000 input + 500 output tokens = $0.00015 + $0.0003 = $0.00045

### Cost Categories
- MattyJacks
- GiveGigs
- CryptArtist
- OpenServ
- Personal
- Coding
- Other
- Unknown

## Monitoring

### Check Total Costs
```sql
SELECT * FROM api_cost_summary LIMIT 1;
```

### Check Costs by Category
```sql
SELECT category, total_cost, requests, total_tokens 
FROM api_costs 
ORDER BY total_cost DESC;
```

### Check Page Views
```sql
SELECT path, humans, bots, unknown, total 
FROM page_view_stats 
ORDER BY total DESC;
```

## Troubleshooting

### Views not appearing
- Check that `page_views` table has records: `SELECT COUNT(*) FROM page_views;`
- Verify RLS policies allow inserts: Check `Allow service role insert on page_views`
- Check browser console for fetch errors

### Costs not calculating
- Verify `api_costs` table exists and has records
- Check that `trackCategorizedCost()` is being called in chat route
- Verify pricing constants are correct ($0.15 input, $0.60 output)

### Performance issues
- Ensure indexes exist: `idx_page_views_path`, `idx_api_costs_category`
- Check Supabase query performance in dashboard
- Consider archiving old records if table grows large

## Future Improvements
- Add data retention policies (archive old records)
- Create Supabase functions for aggregations
- Add real-time subscriptions for live updates
- Implement cost alerts/notifications
- Add historical cost trends
