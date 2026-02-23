-- Seed Multilingual Data for EmlakBanq
-- Run this after 20260216000002_multilingual_jsonb.sql
-- All Alanya-related content has been removed

-- ===========================================
-- CLEAN EXISTING DATA (Optional)
-- ===========================================
-- Uncomment these lines if you want to delete existing data before seeding
-- DELETE FROM blog_posts;
-- DELETE FROM properties;
-- DELETE FROM areas;

-- ===========================================
-- AREAS - Investment Zones
-- All Alanya areas have been removed
-- ===========================================

-- No areas to seed


-- ===========================================
-- PROPERTIES - Luxury Real Estate
-- All Alanya properties have been removed
-- ===========================================

-- No properties to seed


-- ===========================================
-- BLOG POSTS - Real Estate Insights
-- All Alanya-related blog posts have been removed
-- ===========================================

-- No blog posts to seed


-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Multilingual seed data processed!';
  RAISE NOTICE '📊 All Alanya-related content has been removed';
  RAISE NOTICE '🌍 Database structure supports 8 languages';
END $$;
