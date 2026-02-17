-- Migration: Add multilingual support for properties, areas, and blog_posts tables
-- Created: 2026-02-16
-- Description: Adds language-specific columns (_en, _tr) for all translatable content

-- ============================================
-- 1. PROPERTIES TABLE - Add multilingual columns
-- ============================================

-- Rename existing columns to _en (English)
ALTER TABLE properties RENAME COLUMN name TO name_en;
ALTER TABLE properties RENAME COLUMN location TO location_en;
ALTER TABLE properties RENAME COLUMN type_label TO type_label_en;

-- Add Turkish columns
ALTER TABLE properties ADD COLUMN name_tr TEXT;
ALTER TABLE properties ADD COLUMN location_tr TEXT;
ALTER TABLE properties ADD COLUMN type_label_tr TEXT;

-- Copy English content to Turkish columns as default (to be updated by admin)
UPDATE properties SET
  name_tr = name_en,
  location_tr = location_en,
  type_label_tr = type_label_en;

-- ============================================
-- 2. AREAS TABLE - Add multilingual columns
-- ============================================

-- Rename existing columns to _en (English)
ALTER TABLE areas RENAME COLUMN name TO name_en;
ALTER TABLE areas RENAME COLUMN description TO description_en;
ALTER TABLE areas RENAME COLUMN description_long TO description_long_en;

-- Add Turkish columns
ALTER TABLE areas ADD COLUMN name_tr TEXT;
ALTER TABLE areas ADD COLUMN description_tr TEXT;
ALTER TABLE areas ADD COLUMN description_long_tr TEXT;

-- Copy English content to Turkish columns as default
UPDATE areas SET
  name_tr = name_en,
  description_tr = description_en,
  description_long_tr = description_long_en;

-- ============================================
-- 3. BLOG_POSTS TABLE - Add multilingual columns
-- ============================================

-- Rename existing columns to _en (English)
ALTER TABLE blog_posts RENAME COLUMN title TO title_en;
ALTER TABLE blog_posts RENAME COLUMN excerpt TO excerpt_en;
ALTER TABLE blog_posts RENAME COLUMN content TO content_en;
ALTER TABLE blog_posts RENAME COLUMN category TO category_en;

-- Add Turkish columns
ALTER TABLE blog_posts ADD COLUMN title_tr TEXT;
ALTER TABLE blog_posts ADD COLUMN excerpt_tr TEXT;
ALTER TABLE blog_posts ADD COLUMN content_tr TEXT;
ALTER TABLE blog_posts ADD COLUMN category_tr TEXT;

-- Copy English content to Turkish columns as default
UPDATE blog_posts SET
  title_tr = title_en,
  excerpt_tr = excerpt_en,
  content_tr = content_en,
  category_tr = category_en;

-- ============================================
-- NOTES:
-- ============================================
-- After running this migration:
-- 1. Frontend hooks will automatically use the correct language columns
-- 2. Update admin panel forms to include both EN and TR input fields
-- 3. Manually translate existing content through the admin panel
--
-- Fields that are NOT translated (shared across languages):
-- - slug, image, price, beds, sqft, dates, sort_order, etc.
-- - These fields remain language-agnostic
