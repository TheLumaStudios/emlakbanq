-- Migration: Convert market_highlights and top_areas_roi to JSONB multilingual
-- Created: 2026-02-18
-- Description: Converts plain text fields to JSONB for 8-language support
-- Languages: en, tr, ar, ru, de, fr, fa, hi
-- All Alanya-specific data has been removed

-- ============================================
-- 1. MARKET_HIGHLIGHTS - Convert text to JSONB
-- ============================================

-- Convert the text column from text to jsonb
ALTER TABLE market_highlights
  ALTER COLUMN text TYPE jsonb
  USING jsonb_build_object('en', text);

-- All Alanya-specific market highlights have been removed


-- ============================================
-- 2. TOP_AREAS_ROI - Convert area to JSONB
-- ============================================

-- Convert the area column from text to jsonb
ALTER TABLE top_areas_roi
  ALTER COLUMN area TYPE jsonb
  USING jsonb_build_object('en', area);

-- All Alanya areas have been removed
