-- =============================================================================
-- EmlakBanq Supabase Database Schema
-- =============================================================================
-- This file contains all table definitions, indexes, triggers, and RLS policies.
-- Run this against a fresh Supabase project to set up the full database.
-- =============================================================================


-- =============================================================================
-- 1. TABLES
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. properties
-- ---------------------------------------------------------------------------
CREATE TABLE public.properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  location text NOT NULL,
  price text NOT NULL,
  type text NOT NULL,
  type_label text NOT NULL,
  beds integer,
  sqft text NOT NULL,
  image text NOT NULL,
  featured boolean NOT NULL DEFAULT false,
  description text,
  gallery text[] DEFAULT '{}',
  amenities text[] DEFAULT '{}',
  developer text,
  year text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_properties_slug ON public.properties (slug);
CREATE INDEX idx_properties_type ON public.properties (type);
CREATE INDEX idx_properties_featured ON public.properties (featured) WHERE featured = true;

-- ---------------------------------------------------------------------------
-- 2. areas
-- ---------------------------------------------------------------------------
CREATE TABLE public.areas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  description text NOT NULL,
  description_long text,
  avg_price text NOT NULL,
  roi text NOT NULL,
  image text NOT NULL,
  highlights text[] DEFAULT '{}',
  featured boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_areas_slug ON public.areas (slug);
CREATE INDEX idx_areas_key ON public.areas (key);

-- ---------------------------------------------------------------------------
-- 3. blog_posts
-- ---------------------------------------------------------------------------
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  excerpt text NOT NULL,
  content text,
  date text NOT NULL,
  published_at timestamptz,
  category text NOT NULL,
  category_color text NOT NULL,
  image text NOT NULL,
  published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_blog_posts_slug ON public.blog_posts (slug);
CREATE INDEX idx_blog_posts_published ON public.blog_posts (published) WHERE published = true;

-- ---------------------------------------------------------------------------
-- 4. buyer_guides
-- ---------------------------------------------------------------------------
CREATE TABLE public.buyer_guides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  tag text NOT NULL,
  tag_color text NOT NULL,
  border_color text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  content text,
  read_time text NOT NULL,
  image text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_buyer_guides_slug ON public.buyer_guides (slug);

-- ---------------------------------------------------------------------------
-- 5. services
-- ---------------------------------------------------------------------------
CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  initials text NOT NULL,
  color text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- 6. market_highlights
-- ---------------------------------------------------------------------------
CREATE TABLE public.market_highlights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  text text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- 7. top_areas_roi
-- ---------------------------------------------------------------------------
CREATE TABLE public.top_areas_roi (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  area text NOT NULL,
  roi text NOT NULL,
  price_range text NOT NULL,
  trend text NOT NULL DEFAULT 'stable',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- 8. golden_visa_content
-- ---------------------------------------------------------------------------
CREATE TABLE public.golden_visa_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section text NOT NULL,
  key text,
  step integer,
  title text,
  description text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_golden_visa_section ON public.golden_visa_content (section);

-- ---------------------------------------------------------------------------
-- 9. offices
-- ---------------------------------------------------------------------------
CREATE TABLE public.offices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city text NOT NULL,
  address text NOT NULL,
  phone text NOT NULL,
  image text NOT NULL,
  lat numeric,
  lng numeric,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- 10. company_stats
-- ---------------------------------------------------------------------------
CREATE TABLE public.company_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  value text NOT NULL,
  label text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- 11. contact_submissions
-- ---------------------------------------------------------------------------
CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  interest text NOT NULL,
  message text,
  read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_contact_submissions_read ON public.contact_submissions (read) WHERE read = false;

-- ---------------------------------------------------------------------------
-- 12. hero_images
-- ---------------------------------------------------------------------------
CREATE TABLE public.hero_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page text NOT NULL UNIQUE,
  url text NOT NULL,
  alt text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- 13. site_settings
-- ---------------------------------------------------------------------------
CREATE TABLE public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  value jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);


-- =============================================================================
-- 2. UPDATED_AT TRIGGER FUNCTION
-- =============================================================================

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- =============================================================================
-- 3. UPDATED_AT TRIGGERS (all tables except contact_submissions)
-- =============================================================================

CREATE TRIGGER trg_properties_updated_at
  BEFORE UPDATE ON public.properties
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_areas_updated_at
  BEFORE UPDATE ON public.areas
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_buyer_guides_updated_at
  BEFORE UPDATE ON public.buyer_guides
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_market_highlights_updated_at
  BEFORE UPDATE ON public.market_highlights
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_top_areas_roi_updated_at
  BEFORE UPDATE ON public.top_areas_roi
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_golden_visa_content_updated_at
  BEFORE UPDATE ON public.golden_visa_content
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_offices_updated_at
  BEFORE UPDATE ON public.offices
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_company_stats_updated_at
  BEFORE UPDATE ON public.company_stats
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_hero_images_updated_at
  BEFORE UPDATE ON public.hero_images
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- =============================================================================
-- 4. ROW LEVEL SECURITY (RLS)
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Enable RLS on ALL tables
-- ---------------------------------------------------------------------------
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.buyer_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.top_areas_roi ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.golden_visa_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- ---------------------------------------------------------------------------
-- PUBLIC READ policies (all content tables except blog_posts & contact_submissions)
-- ---------------------------------------------------------------------------

-- properties: public read
CREATE POLICY "Public read" ON public.properties
  FOR SELECT USING (true);

-- areas: public read
CREATE POLICY "Public read" ON public.areas
  FOR SELECT USING (true);

-- blog_posts: public read only published posts
CREATE POLICY "Public read" ON public.blog_posts
  FOR SELECT USING (published = true);

-- buyer_guides: public read
CREATE POLICY "Public read" ON public.buyer_guides
  FOR SELECT USING (true);

-- services: public read
CREATE POLICY "Public read" ON public.services
  FOR SELECT USING (true);

-- market_highlights: public read
CREATE POLICY "Public read" ON public.market_highlights
  FOR SELECT USING (true);

-- top_areas_roi: public read
CREATE POLICY "Public read" ON public.top_areas_roi
  FOR SELECT USING (true);

-- golden_visa_content: public read
CREATE POLICY "Public read" ON public.golden_visa_content
  FOR SELECT USING (true);

-- offices: public read
CREATE POLICY "Public read" ON public.offices
  FOR SELECT USING (true);

-- company_stats: public read
CREATE POLICY "Public read" ON public.company_stats
  FOR SELECT USING (true);

-- hero_images: public read
CREATE POLICY "Public read" ON public.hero_images
  FOR SELECT USING (true);

-- site_settings: public read
CREATE POLICY "Public read" ON public.site_settings
  FOR SELECT USING (true);

-- ---------------------------------------------------------------------------
-- CONTACT_SUBMISSIONS policies
-- ---------------------------------------------------------------------------

-- Anyone (including anonymous) can insert a contact submission
CREATE POLICY "Anyone can submit" ON public.contact_submissions
  FOR INSERT WITH CHECK (true);

-- Only authenticated users can read submissions
CREATE POLICY "Authenticated read" ON public.contact_submissions
  FOR SELECT USING (auth.role() = 'authenticated');

-- Only authenticated users can update submissions (e.g. mark as read)
CREATE POLICY "Authenticated update" ON public.contact_submissions
  FOR UPDATE USING (auth.role() = 'authenticated');

-- ---------------------------------------------------------------------------
-- AUTHENTICATED INSERT / UPDATE / DELETE policies (all content tables)
-- ---------------------------------------------------------------------------

-- properties
CREATE POLICY "Authenticated insert" ON public.properties
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update" ON public.properties
  FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated delete" ON public.properties
  FOR DELETE TO authenticated USING (true);

-- areas
CREATE POLICY "Authenticated insert" ON public.areas
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update" ON public.areas
  FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated delete" ON public.areas
  FOR DELETE TO authenticated USING (true);

-- blog_posts
CREATE POLICY "Authenticated insert" ON public.blog_posts
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update" ON public.blog_posts
  FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated delete" ON public.blog_posts
  FOR DELETE TO authenticated USING (true);

-- buyer_guides
CREATE POLICY "Authenticated insert" ON public.buyer_guides
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update" ON public.buyer_guides
  FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated delete" ON public.buyer_guides
  FOR DELETE TO authenticated USING (true);

-- services
CREATE POLICY "Authenticated insert" ON public.services
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update" ON public.services
  FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated delete" ON public.services
  FOR DELETE TO authenticated USING (true);

-- market_highlights
CREATE POLICY "Authenticated insert" ON public.market_highlights
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update" ON public.market_highlights
  FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated delete" ON public.market_highlights
  FOR DELETE TO authenticated USING (true);

-- top_areas_roi
CREATE POLICY "Authenticated insert" ON public.top_areas_roi
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update" ON public.top_areas_roi
  FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated delete" ON public.top_areas_roi
  FOR DELETE TO authenticated USING (true);

-- golden_visa_content
CREATE POLICY "Authenticated insert" ON public.golden_visa_content
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update" ON public.golden_visa_content
  FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated delete" ON public.golden_visa_content
  FOR DELETE TO authenticated USING (true);

-- offices
CREATE POLICY "Authenticated insert" ON public.offices
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update" ON public.offices
  FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated delete" ON public.offices
  FOR DELETE TO authenticated USING (true);

-- company_stats
CREATE POLICY "Authenticated insert" ON public.company_stats
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update" ON public.company_stats
  FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated delete" ON public.company_stats
  FOR DELETE TO authenticated USING (true);

-- contact_submissions (authenticated delete)
CREATE POLICY "Authenticated delete" ON public.contact_submissions
  FOR DELETE TO authenticated USING (true);

-- hero_images
CREATE POLICY "Authenticated insert" ON public.hero_images
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update" ON public.hero_images
  FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated delete" ON public.hero_images
  FOR DELETE TO authenticated USING (true);

-- site_settings
CREATE POLICY "Authenticated insert" ON public.site_settings
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update" ON public.site_settings
  FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated delete" ON public.site_settings
  FOR DELETE TO authenticated USING (true);
