-- ============================================================================
-- EmlakBanq Seed Data
-- All Alanya-related content has been removed
-- ============================================================================

-- ============================================================================
-- 1. PROPERTIES
-- All Alanya properties have been removed
-- ============================================================================

-- No properties to seed


-- ============================================================================
-- 2. AREAS
-- All Alanya areas have been removed
-- ============================================================================

-- No areas to seed


-- ============================================================================
-- 3. BLOG_POSTS
-- All Alanya-related blog posts have been removed
-- ============================================================================

-- No blog posts to seed


-- ============================================================================
-- 4. BUYER_GUIDES
-- Keeping buyer guides as they can apply to any location
-- ============================================================================

INSERT INTO buyer_guides (slug, tag, tag_color, border_color, title, description, read_time, image, sort_order) VALUES
(
  'complete-buyers-guide',
  'Essential',
  'bg-blue-100 text-blue-800',
  'border-t-gold-500',
  'Complete Buyer''s Guide to Real Estate',
  'Everything you need to know about purchasing property -- from choosing the right area to completing your transaction with confidence.',
  '15 min read',
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80&fit=crop',
  0
),
(
  'first-time-buyer-tips',
  'Beginner',
  'bg-blue-100 text-blue-800',
  'border-t-blue-500',
  'First-Time Buyer Tips',
  'New to property investment? Avoid common pitfalls and learn the insider strategies that experienced investors use to maximise returns.',
  '10 min read',
  'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=800&q=80&fit=crop',
  1
),
(
  'mortgage-and-finance',
  'Finance',
  'bg-emerald-100 text-emerald-800',
  'border-t-emerald-500',
  'Mortgage & Finance Options',
  'Navigate mortgage regulations, compare rates from leading banks, and understand the financing options available to residents and non-residents alike.',
  '12 min read',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&fit=crop',
  2
),
(
  'legal-framework',
  'Legal',
  'bg-violet-100 text-violet-800',
  'border-t-violet-500',
  'Legal Framework for Foreign Property Owners',
  'Understand freehold vs. leasehold zones, regulations, escrow protections, and your legal rights as a foreign property owner.',
  '14 min read',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&fit=crop',
  3
),
(
  'off-plan-guide',
  'Investment',
  'bg-amber-100 text-amber-800',
  'border-t-amber-500',
  'Off-Plan Property Investment Guide',
  'Learn how to evaluate off-plan opportunities, assess developer credibility, understand payment plans, and manage risk for maximum capital appreciation.',
  '11 min read',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&fit=crop',
  4
),
(
  'property-tax-and-fees',
  'Tax & Fees',
  'bg-rose-100 text-rose-800',
  'border-t-rose-500',
  'Property Tax & Fees Breakdown',
  'A transparent breakdown of all costs involved in buying property -- fees, agent commissions, charges, service charges, and more.',
  '8 min read',
  'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800&q=80&fit=crop',
  5
);


-- ============================================================================
-- 5. SERVICES
-- ============================================================================

INSERT INTO services (key, initials, color, sort_order) VALUES
('investment', 'IC', 'bg-blue-500', 0),
('legal', 'LF', 'bg-estate-600', 1),
('visa', 'GV', 'bg-blue-700', 2),
('afterSales', 'AS', 'bg-estate-500', 3);


-- ============================================================================
-- 6. MARKET_HIGHLIGHTS
-- All Alanya-specific market highlights have been removed
-- ============================================================================

-- No market highlights to seed


-- ============================================================================
-- 7. TOP_AREAS_ROI
-- All Alanya areas have been removed
-- ============================================================================

-- No top areas to seed


-- ============================================================================
-- 8. GOLDEN_VISA_CONTENT
-- Keeping Golden Visa content as it's UAE-wide, not Alanya-specific
-- ============================================================================

-- Benefits (section = 'benefit')
INSERT INTO golden_visa_content (section, key, title, description, sort_order) VALUES
('benefit', 'residency', '10-Year Renewable Residency', 'Secure long-term UAE residency for yourself and your family with a 10-year visa that is fully renewable.', 0),
('benefit', 'family', 'Full Family Sponsorship', 'Sponsor your spouse, children, and domestic staff under a single visa application with no additional property requirements.', 1),
('benefit', 'business', '100% Business Ownership', 'Establish and fully own a business in the UAE mainland or free zones without the need for a local sponsor.', 2),
('benefit', 'travel', 'Ease of Travel', 'Enter and exit the UAE freely without restrictions. Your visa remains valid regardless of time spent outside the country.', 3),
('benefit', 'tax', 'Tax-Free Environment', 'Enjoy zero personal income tax, zero capital gains tax, and one of the world''s most business-friendly fiscal policies.', 4),
('benefit', 'healthcare', 'Premium Services Access', 'Gain access to world-class healthcare, education, and banking services reserved for UAE residents.', 5);

-- Eligibility (section = 'eligibility')
INSERT INTO golden_visa_content (section, key, title, description, sort_order) VALUES
('eligibility', 'eligibility_1', NULL, 'Minimum property investment of AED 2,000,000 (approx. USD 545,000)', 0),
('eligibility', 'eligibility_2', NULL, 'Property must be fully paid or mortgaged with a minimum 50% down payment for select programs', 1),
('eligibility', 'eligibility_3', NULL, 'Property can be residential (ready or off-plan from approved developers)', 2),
('eligibility', 'eligibility_4', NULL, 'Multiple properties may be combined to meet the minimum threshold', 3),
('eligibility', 'eligibility_5', NULL, 'No criminal record and valid health insurance are required', 4),
('eligibility', 'eligibility_6', NULL, 'Applicant must maintain property ownership for the duration of the visa', 5);

-- Process Steps (section = 'process_step')
INSERT INTO golden_visa_content (section, key, title, description, sort_order) VALUES
('process_step', 'step_1', 'Initial Consultation', 'Meet with our Golden Visa specialists to assess your eligibility, discuss property options, and outline a personalised roadmap.', 0),
('process_step', 'step_2', 'Property Selection', 'Choose from our curated portfolio of qualifying properties. We handle developer negotiations, due diligence, and documentation.', 1),
('process_step', 'step_3', 'Property Purchase', 'Complete the purchase with full legal support. We coordinate with the Land Department, escrow, and mortgage providers.', 2),
('process_step', 'step_4', 'Visa Application', 'We manage your entire visa application from medical exams and Emirates ID to final visa stamping -- a seamless, stress-free process.', 3);


-- ============================================================================
-- 9. OFFICES
-- Alanya office has been removed
-- ============================================================================

INSERT INTO offices (city, address, phone, image, lat, lng) VALUES
(
  'Istanbul',
  'Skyland Istanbul, Turkey',
  '+90 212 XXX XXXX',
  'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80&fit=crop',
  41.0766,
  28.9864
);


-- ============================================================================
-- 10. COMPANY_STATS
-- ============================================================================

INSERT INTO company_stats (value, label, sort_order) VALUES
('100+', 'Expert Advisors', 0),
('500+', 'Premium Properties', 1),
('40+', 'Countries Served', 2),
('$2B+', 'Transaction Volume', 3);


-- ============================================================================
-- 11. HERO_IMAGES
-- ============================================================================

INSERT INTO hero_images (page, url) VALUES
('home', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80&fit=crop'),
('properties', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80&fit=crop'),
('areas', 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1920&q=80&fit=crop'),
('about', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80&fit=crop'),
('contact', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80&fit=crop'),
('goldenVisa', 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=1920&q=80&fit=crop'),
('buyerGuides', 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80&fit=crop'),
('insights', 'https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=1920&q=80&fit=crop'),
('blog', 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=1920&q=80&fit=crop');


-- ============================================================================
-- 12. SITE_SETTINGS
-- Alanya tagline has been removed
-- ============================================================================

INSERT INTO site_settings (key, value) VALUES
('brand', '"EmlakBanq"'),
('domain', '"emlakbanq.com"'),
('tagline', '"Premier Luxury Real Estate"'),
('social', '{"instagram":"https://instagram.com/emlakbanq","youtube":"https://youtube.com/@emlakbanq","linkedin":"https://linkedin.com/company/emlakbanq","twitter":"https://twitter.com/emlakbanq"}');
