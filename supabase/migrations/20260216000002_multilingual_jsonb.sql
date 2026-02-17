-- Migration: Convert multilingual support to JSONB format
-- Created: 2026-02-16
-- Description: Uses JSONB for flexible multi-language support (8 languages)
-- Languages: en, tr, ar, ru, de, fr, fa, hi

-- ============================================
-- 1. PROPERTIES TABLE - Convert to JSONB
-- ============================================

-- Drop previous _en and _tr columns if they exist
ALTER TABLE properties DROP COLUMN IF EXISTS name_en CASCADE;
ALTER TABLE properties DROP COLUMN IF EXISTS name_tr CASCADE;
ALTER TABLE properties DROP COLUMN IF EXISTS location_en CASCADE;
ALTER TABLE properties DROP COLUMN IF EXISTS location_tr CASCADE;
ALTER TABLE properties DROP COLUMN IF EXISTS type_label_en CASCADE;
ALTER TABLE properties DROP COLUMN IF EXISTS type_label_tr CASCADE;

-- Add JSONB columns
ALTER TABLE properties ADD COLUMN IF NOT EXISTS name JSONB DEFAULT '{}'::jsonb;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS location JSONB DEFAULT '{}'::jsonb;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS type_label JSONB DEFAULT '{}'::jsonb;

-- Migrate existing data if name column exists and is TEXT
-- This handles both new installations and migrations
DO $$
BEGIN
  -- Check if old text column exists and has data
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'properties'
    AND column_name = 'name'
    AND data_type = 'text'
  ) THEN
    -- Backup old data to new JSONB structure with 'en' as default
    UPDATE properties
    SET name = jsonb_build_object('en', name::text)
    WHERE name IS NOT NULL;
  END IF;
END $$;

-- ============================================
-- 2. AREAS TABLE - Convert to JSONB
-- ============================================

ALTER TABLE areas DROP COLUMN IF EXISTS name_en CASCADE;
ALTER TABLE areas DROP COLUMN IF EXISTS name_tr CASCADE;
ALTER TABLE areas DROP COLUMN IF EXISTS description_en CASCADE;
ALTER TABLE areas DROP COLUMN IF EXISTS description_tr CASCADE;
ALTER TABLE areas DROP COLUMN IF EXISTS description_long_en CASCADE;
ALTER TABLE areas DROP COLUMN IF EXISTS description_long_tr CASCADE;

ALTER TABLE areas ADD COLUMN IF NOT EXISTS name JSONB DEFAULT '{}'::jsonb;
ALTER TABLE areas ADD COLUMN IF NOT EXISTS description JSONB DEFAULT '{}'::jsonb;
ALTER TABLE areas ADD COLUMN IF NOT EXISTS description_long JSONB DEFAULT '{}'::jsonb;

-- ============================================
-- 3. BLOG_POSTS TABLE - Convert to JSONB
-- ============================================

ALTER TABLE blog_posts DROP COLUMN IF EXISTS title_en CASCADE;
ALTER TABLE blog_posts DROP COLUMN IF EXISTS title_tr CASCADE;
ALTER TABLE blog_posts DROP COLUMN IF EXISTS excerpt_en CASCADE;
ALTER TABLE blog_posts DROP COLUMN IF EXISTS excerpt_tr CASCADE;
ALTER TABLE blog_posts DROP COLUMN IF EXISTS content_en CASCADE;
ALTER TABLE blog_posts DROP COLUMN IF EXISTS content_tr CASCADE;
ALTER TABLE blog_posts DROP COLUMN IF EXISTS category_en CASCADE;
ALTER TABLE blog_posts DROP COLUMN IF EXISTS category_tr CASCADE;

ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS title JSONB DEFAULT '{}'::jsonb;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS excerpt JSONB DEFAULT '{}'::jsonb;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS content JSONB DEFAULT '{}'::jsonb;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS category JSONB DEFAULT '{}'::jsonb;

-- ============================================
-- 4. HELPER FUNCTIONS
-- ============================================

-- Function to get translated value from JSONB
CREATE OR REPLACE FUNCTION get_translation(
  json_data JSONB,
  lang_code TEXT,
  fallback_lang TEXT DEFAULT 'en'
)
RETURNS TEXT AS $$
BEGIN
  -- Try requested language
  IF json_data ? lang_code THEN
    RETURN json_data->>lang_code;
  END IF;

  -- Try fallback language
  IF json_data ? fallback_lang THEN
    RETURN json_data->>fallback_lang;
  END IF;

  -- Return any available translation
  RETURN json_data->>(
    SELECT jsonb_object_keys(json_data) LIMIT 1
  );
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to set translation in JSONB
CREATE OR REPLACE FUNCTION set_translation(
  json_data JSONB,
  lang_code TEXT,
  translation TEXT
)
RETURNS JSONB AS $$
BEGIN
  RETURN jsonb_set(
    COALESCE(json_data, '{}'::jsonb),
    array[lang_code],
    to_jsonb(translation)
  );
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- ============================================
-- USAGE EXAMPLES:
-- ============================================
--
-- Insert property with multiple languages:
-- INSERT INTO properties (name, location, price, ...)
-- VALUES (
--   '{"en": "Luxury Villa", "tr": "Lüks Villa", "ar": "فيلا فاخرة"}'::jsonb,
--   '{"en": "Dubai Marina", "tr": "Dubai Marina", "ar": "دبي مارينا"}'::jsonb,
--   'AED 5M',
--   ...
-- );
--
-- Query with language:
-- SELECT
--   get_translation(name, 'tr') as name,
--   get_translation(location, 'ar') as location
-- FROM properties;
--
-- Update specific language:
-- UPDATE properties
-- SET name = set_translation(name, 'de', 'Luxusvilla')
-- WHERE id = '...';
