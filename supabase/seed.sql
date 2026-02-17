-- ============================================================================
-- EmlakBanq Seed Data
-- Generated from React hardcoded data in src/pages and src/config
-- ============================================================================

-- ============================================================================
-- 1. PROPERTIES (15 rows)
-- 9 from MOCK_PROPERTIES (Properties.jsx) + 6 from FEATURED_PROPERTIES (Home.jsx)
-- ============================================================================

-- MOCK_PROPERTIES (featured = false)
INSERT INTO properties (name, slug, location, price, type, type_label, beds, sqft, image, featured, sort_order, description, amenities) VALUES
(
  'The Royal Atlantis Residences',
  'royal-atlantis-residences',
  'Palm Jumeirah, Dubai',
  'AED 15,500,000',
  'branded',
  'Branded Residence',
  3,
  '4,250',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&fit=crop',
  false,
  0,
  'Experience unrivalled luxury at The Royal Atlantis Residences on Palm Jumeirah. This stunning 3-bedroom branded residence offers floor-to-ceiling windows with panoramic ocean views, bespoke interiors by Sybille de Margerie, and access to world-class amenities including private beach, celebrity chef restaurants, and the iconic sky pool.',
  '{"Private Beach Access","Infinity Pool","Concierge Service","Valet Parking","Spa & Wellness Centre","Celebrity Chef Restaurants","Sky Pool","Kids Club"}'
),
(
  'Emaar Beachfront Vista',
  'emaar-beachfront-vista',
  'Dubai Harbour',
  'AED 4,200,000',
  'offPlan',
  'Off-Plan',
  2,
  '1,850',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80&fit=crop',
  false,
  1,
  'A contemporary 2-bedroom apartment in the highly anticipated Emaar Beachfront development at Dubai Harbour. Enjoy resort-style living with direct beach access, a private marina, and sweeping views of the Arabian Gulf. Ideal for investors seeking strong rental yields in a prime waterfront location.',
  '{"Beach Access","Swimming Pool","Gymnasium","Marina Views","Landscaped Gardens","Retail Promenade","Children''s Play Area","24/7 Security"}'
),
(
  'DAMAC Lagoons Villa',
  'damac-lagoons-villa',
  'DAMAC Lagoons, Dubai',
  'AED 8,900,000',
  'villa',
  'Villa',
  5,
  '6,100',
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fit=crop',
  false,
  2,
  'A magnificent 5-bedroom villa nestled within the tranquil DAMAC Lagoons community. Inspired by Mediterranean design, this spacious residence features a private garden, rooftop terrace, and direct access to crystal-clear lagoons. Perfect for families seeking a serene suburban lifestyle without compromising on luxury.',
  '{"Private Garden","Lagoon Access","Rooftop Terrace","Smart Home System","Maid''s Room","Double Garage","Community Pool","Jogging Tracks"}'
),
(
  'Bulgari Lighthouse',
  'bulgari-lighthouse',
  'Jumeirah Bay Island',
  'AED 42,000,000',
  'penthouse',
  'Penthouse',
  4,
  '8,500',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fit=crop',
  false,
  3,
  'An extraordinary 4-bedroom penthouse within the Bulgari Resort & Residences on Jumeirah Bay Island. This ultra-premium residence boasts double-height ceilings, a private rooftop infinity pool, Italian marble finishes throughout, and unobstructed views of the Dubai skyline. The pinnacle of branded luxury living.',
  '{"Private Rooftop Pool","Butler Service","Italian Marble Finishes","Wine Cellar","Home Cinema","Bulgari Spa Access","Private Dining","Helicopter Transfer"}'
),
(
  'Creek Harbour Tower',
  'creek-harbour-tower',
  'Dubai Creek Harbour',
  'AED 2,800,000',
  'ready',
  'Ready',
  1,
  '980',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&fit=crop',
  false,
  4,
  'A sleek 1-bedroom apartment in the heart of Dubai Creek Harbour, offering stunning views of the Creek Tower and wildlife sanctuary. This move-in ready unit features premium finishes, an open-plan layout, and access to a curated collection of retail and dining experiences. An excellent entry point for investors.',
  '{"Creek Views","Swimming Pool","Gymnasium","Retail Podium","Landscaped Park","Cycling Tracks","24/7 Concierge","Covered Parking"}'
),
(
  'Business Bay Executive Suite',
  'business-bay-executive',
  'Business Bay, Dubai',
  'AED 6,500,000',
  'commercial',
  'Commercial',
  NULL,
  '3,200',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80&fit=crop',
  false,
  5,
  'A premium commercial suite in the thriving Business Bay district, ideal for corporate headquarters or serviced office space. Featuring floor-to-ceiling glazing, canal views, high-speed fibre connectivity, and flexible floor plates. Located minutes from Downtown Dubai and the Dubai International Financial Centre.',
  '{"Canal Views","High-Speed Internet","Meeting Rooms","Dedicated Parking","24/7 Access","Reception Services","Pantry Facilities","Building Management"}'
),
(
  'Palm Jumeirah Signature Villa',
  'palm-jumeirah-signature-villa',
  'Palm Jumeirah Fronds',
  'AED 35,000,000',
  'villa',
  'Villa',
  6,
  '12,000',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&fit=crop',
  false,
  6,
  'An iconic 6-bedroom signature villa on the fronds of Palm Jumeirah, offering private beachfront living at its finest. This palatial residence features a 25-metre private pool, landscaped gardens, staff quarters, and uninterrupted views of the Arabian Gulf and Atlantis. One of Dubai''s most exclusive addresses.',
  '{"Private Beach","25m Pool","Staff Quarters","Landscaped Gardens","Home Gym","Outdoor Kitchen","Boat Mooring","Smart Home Automation"}'
),
(
  'Downtown Address Sky View',
  'downtown-address-sky-view',
  'Downtown Dubai',
  'AED 5,800,000',
  'ready',
  'Ready',
  2,
  '2,100',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80&fit=crop',
  false,
  7,
  'A sophisticated 2-bedroom residence in the Address Sky View towers, offering direct Burj Khalifa and fountain views from the heart of Downtown Dubai. Enjoy world-class hotel-style services, the iconic Sky Bridge connecting the two towers, and an infinity pool overlooking the Dubai skyline.',
  '{"Burj Khalifa Views","Sky Bridge Access","Infinity Pool","Hotel Services","Valet Parking","Fine Dining","Spa & Gym","Dubai Mall Access"}'
),
(
  'Sobha Seahaven Penthouse',
  'sobha-seahaven-penthouse',
  'Dubai Marina',
  'AED 22,000,000',
  'penthouse',
  'Penthouse',
  4,
  '5,800',
  'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80&fit=crop',
  false,
  8,
  'A breathtaking 4-bedroom penthouse in Sobha Seahaven, one of Dubai Marina''s most anticipated ultra-luxury towers. Featuring expansive terraces with panoramic marina and sea views, Sobha''s signature craftsmanship, imported European fixtures, and direct access to The Walk at JBR.',
  '{"Marina Views","Private Terrace","European Fixtures","Concierge Service","Residents'' Lounge","Temperature-Controlled Pool","Underground Parking","JBR Walk Access"}'
);

-- FEATURED_PROPERTIES (featured = true)
INSERT INTO properties (name, slug, location, price, type, type_label, beds, sqft, image, featured, sort_order, description, amenities) VALUES
(
  'The Residences at Burj Khalifa',
  'the-residences-at-burj-khalifa',
  'Downtown Dubai',
  'AED 18,500,000',
  'penthouse',
  'Penthouse',
  4,
  '6200',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&fit=crop',
  true,
  0,
  'Live at the pinnacle of luxury in The Residences at Burj Khalifa. This exceptional 4-bedroom penthouse offers unparalleled views from the world''s tallest building, with interiors by Giorgio Armani, a private lobby, and access to the Armani Hotel''s world-class amenities.',
  '{"Armani-Designed Interiors","Private Lobby","Burj Khalifa Views","Armani Spa Access","Fine Dining","Valet Parking","Swimming Pool","24/7 Concierge"}'
),
(
  'Atlantis The Royal Residences',
  'atlantis-the-royal-residences',
  'Palm Jumeirah',
  'AED 25,000,000',
  'branded',
  'Branded Residence',
  5,
  '8400',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80&fit=crop',
  true,
  1,
  'An extraordinary 5-bedroom branded residence within the architectural marvel that is Atlantis The Royal. Featuring bespoke interiors, private plunge pools, and access to celebrity chef restaurants by Nobu and Jose Andres. The ultimate Palm Jumeirah address.',
  '{"Private Plunge Pool","Celebrity Chef Restaurants","Beach Club","Concierge Service","Spa & Wellness","Water Park Access","Kids Club","Helipad"}'
),
(
  'Marina Gate Tower III',
  'marina-gate-tower-iii',
  'Dubai Marina',
  'AED 3,200,000',
  'ready',
  'Ready',
  2,
  '1650',
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fit=crop',
  true,
  2,
  'A stylish 2-bedroom apartment in the sought-after Marina Gate complex, offering stunning marina and sea views. Move-in ready with premium finishes, open-plan living, and direct access to Dubai Marina Mall and the JBR beachfront.',
  '{"Marina Views","Swimming Pool","Gymnasium","Retail Podium","BBQ Area","Children''s Pool","Covered Parking","Marina Walk Access"}'
),
(
  'Creek Harbour Vistas',
  'creek-harbour-vistas',
  'Dubai Creek Harbour',
  'AED 2,100,000',
  'offPlan',
  'Off-Plan',
  3,
  '2100',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fit=crop',
  true,
  3,
  'A modern 3-bedroom apartment in the emerging Dubai Creek Harbour masterplan. This off-plan unit offers flexible payment plans, creek and skyline views, and access to a vibrant waterfront community with parks, retail, and dining.',
  '{"Creek Views","Flexible Payment Plan","Swimming Pool","Landscaped Gardens","Retail Plaza","Jogging Track","Children''s Area","Smart Home Features"}'
),
(
  'Six Senses The Palm',
  'six-senses-the-palm',
  'Palm Jumeirah',
  'AED 42,000,000',
  'villa',
  'Villa',
  6,
  '12500',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&fit=crop',
  true,
  4,
  'An ultra-exclusive 6-bedroom villa at Six Senses The Palm, blending wellness-driven design with uncompromising luxury. Features include a private beach, infinity pool, outdoor yoga deck, organic garden, and full access to Six Senses Spa services.',
  '{"Private Beach","Infinity Pool","Six Senses Spa","Yoga Deck","Organic Garden","Butler Service","Wine Cellar","Smart Home System"}'
),
(
  'Emaar Beachfront Azure',
  'emaar-beachfront-azure',
  'Dubai Harbour',
  'AED 4,800,000',
  'offPlan',
  'Off-Plan',
  3,
  '2800',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80&fit=crop',
  true,
  5,
  'A premium 3-bedroom off-plan apartment at Emaar Beachfront Azure, offering direct beach access, marina views, and resort-style living. With an attractive payment plan and strong projected returns, this is an ideal investment in Dubai Harbour''s fastest-growing community.',
  '{"Beach Access","Marina Views","Swimming Pool","Gymnasium","Retail Promenade","Children''s Pool","Landscaped Deck","Covered Parking"}'
);


-- ============================================================================
-- 2. AREAS (8 rows)
-- From ZONE_DATA (Areas.jsx) and zone images (images.js)
-- ============================================================================

INSERT INTO areas (key, name, slug, avg_price, roi, image, featured, sort_order, description, description_long, highlights) VALUES
(
  'downtown',
  'Downtown Dubai',
  'downtown-dubai',
  'AED 2,800/sqft',
  '6.2%',
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80&fit=crop',
  true,
  0,
  'The iconic heart of Dubai, home to the Burj Khalifa, Dubai Mall, and the world-famous Dubai Fountain. A premier address for luxury living and investment.',
  'Downtown Dubai is the crown jewel of the city''s urban landscape. Anchored by the Burj Khalifa -- the world''s tallest building -- this master-planned community by Emaar offers a seamless blend of residential towers, five-star hotels, premium retail, and cultural attractions. The neighbourhood attracts a global clientele of high-net-worth individuals seeking an address that embodies prestige and connectivity. With the Dubai Opera, Souk Al Bahar, and expansive boulevard within walking distance, Downtown Dubai remains one of the most desirable residential postcodes in the world.',
  '{"Home to Burj Khalifa & Dubai Mall","Average ROI of 6.2%","Premium branded residences","World-class dining and entertainment","Direct metro connectivity","Strong capital appreciation"}'
),
(
  'marina',
  'Dubai Marina',
  'dubai-marina',
  'AED 2,200/sqft',
  '7.1%',
  'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80&fit=crop',
  true,
  1,
  'A vibrant waterfront community with a stunning marina promenade, upscale dining, and some of Dubai''s most sought-after residential towers.',
  'Dubai Marina is one of the largest and most carefully planned waterfront developments in the world. Spanning over 50 million square feet, this canal city features a 7-kilometre pedestrian walkway, a yacht marina, and over 200 residential towers offering everything from studio apartments to ultra-luxury penthouses. The area is a magnet for young professionals and international investors thanks to its walkability, proximity to JBR Beach, and thriving nightlife and dining scene. With consistent rental demand and strong yields, Dubai Marina remains a perennial favourite among property investors.',
  '{"7km Marina Walk promenade","Strong rental yields at 7.1%","Proximity to JBR Beach","Vibrant nightlife and dining","Tram and metro connectivity","Diverse property mix"}'
),
(
  'palm',
  'Palm Jumeirah',
  'palm-jumeirah',
  'AED 3,500/sqft',
  '5.8%',
  'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&q=80&fit=crop',
  true,
  2,
  'The world''s most iconic man-made island, offering exclusive beachfront villas, branded residences, and ultra-luxury penthouses.',
  'Palm Jumeirah is a globally recognised symbol of luxury and ambition. This palm-shaped island features a curated collection of beachfront villas, high-rise apartments, and branded residences from names like Atlantis, Six Senses, and Bulgari. Residents enjoy private beaches, world-class hospitality, and an unmatched lifestyle that combines island serenity with urban convenience. The Crescent and its iconic landmarks, including Atlantis The Royal and The Palm Tower, offer dining, entertainment, and leisure experiences found nowhere else on earth. Palm Jumeirah consistently commands the highest per-square-foot prices in Dubai.',
  '{"World-famous man-made island","Ultra-luxury branded residences","Private beach access","Home to Atlantis The Royal","Highest price per sqft in Dubai","Monorail connectivity"}'
),
(
  'businessBay',
  'Business Bay',
  'business-bay',
  'AED 1,900/sqft',
  '7.5%',
  'https://images.unsplash.com/photo-1546412414-e1885259563a?w=800&q=80&fit=crop',
  true,
  3,
  'Dubai''s thriving commercial and residential hub along the Dubai Water Canal, offering excellent connectivity and strong rental returns.',
  'Business Bay is a dynamic mixed-use district stretching along the Dubai Water Canal, adjacent to Downtown Dubai. Once primarily a commercial zone, it has evolved into one of the city''s most popular residential neighbourhoods, attracting young professionals and investors with its modern high-rises, canal-side promenades, and competitive pricing. The area offers excellent connectivity via Sheikh Zayed Road and the metro, and its proximity to DIFC and Downtown makes it a strategic choice for both living and working. With some of the highest rental yields in the city, Business Bay is a top pick for ROI-focused investors.',
  '{"Dubai Water Canal frontage","High rental yields at 7.5%","Adjacent to Downtown Dubai","Excellent metro connectivity","Growing dining and retail scene","Competitive entry prices"}'
),
(
  'jbr',
  'JBR',
  'jumeirah-beach-residence',
  'AED 2,400/sqft',
  '6.8%',
  'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800&q=80&fit=crop',
  false,
  4,
  'A bustling beachfront community known for The Walk, Ain Dubai, and a vibrant mix of dining, retail, and entertainment options.',
  'Jumeirah Beach Residence (JBR) is one of Dubai''s most popular beachfront neighbourhoods, stretching along 1.7 kilometres of pristine coastline. The development comprises 40 residential towers and offers direct access to The Walk -- a lively outdoor promenade lined with cafes, restaurants, and boutiques. With Ain Dubai (the world''s largest observation wheel) and Bluewaters Island just steps away, JBR is a lifestyle destination that attracts residents and tourists alike. The area commands strong rental demand, particularly for short-term holiday lets, making it an attractive proposition for investors.',
  '{"1.7km beachfront","The Walk promenade","Adjacent to Ain Dubai","Strong short-term rental demand","Family-friendly amenities","Tram connectivity"}'
),
(
  'creekHarbour',
  'Dubai Creek Harbour',
  'dubai-creek-harbour',
  'AED 2,100/sqft',
  '8.0%',
  'https://images.unsplash.com/photo-1622015663319-e97e697503ee?w=800&q=80&fit=crop',
  false,
  5,
  'An emerging waterfront masterplan featuring the future Dubai Creek Tower, a wildlife sanctuary, and rapidly appreciating property values.',
  'Dubai Creek Harbour is a visionary 6-square-kilometre master development by Emaar at the junction of Ras Al Khor and the historic Dubai Creek. Set to become home to Dubai Creek Tower -- poised to surpass the Burj Khalifa in height -- this community offers a unique blend of modern urban living and natural beauty, with a Ras Al Khor wildlife sanctuary at its doorstep. Early investors have already seen significant capital appreciation, and with major infrastructure still under development, the area presents compelling long-term growth potential. The neighbourhood is quickly becoming one of Dubai''s most talked-about investment destinations.',
  '{"Future Dubai Creek Tower","Ras Al Khor wildlife sanctuary","Strong capital appreciation at 8.0% ROI","Emaar master development","Waterfront living","Emerging retail and dining hub"}'
),
(
  'dubaiHills',
  'Dubai Hills Estate',
  'dubai-hills-estate',
  'AED 1,800/sqft',
  '7.3%',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&fit=crop',
  false,
  6,
  'A green, family-oriented community centred around an 18-hole championship golf course, with villas, townhouses, and apartments.',
  'Dubai Hills Estate is an expansive master-planned community by Emaar and Meraas, offering a rare combination of green open spaces, urban convenience, and premium real estate. Centred around an 18-hole championship golf course designed by European Golf Design, the neighbourhood features a mix of luxury villas, townhouses, and apartment towers. Dubai Hills Mall, one of the city''s newest retail destinations, serves as the community''s social hub. With excellent school options, parks, and healthcare facilities, Dubai Hills Estate is the neighbourhood of choice for families seeking a balanced lifestyle with strong investment fundamentals.',
  '{"18-hole championship golf course","Dubai Hills Mall","Family-oriented community","Parks and green spaces","Top-rated schools nearby","Strong 7.3% rental ROI"}'
),
(
  'jvc',
  'Jumeirah Village Circle',
  'jumeirah-village-circle',
  'AED 1,100/sqft',
  '8.5%',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80&fit=crop',
  false,
  7,
  'One of Dubai''s most affordable and highest-yielding communities, popular with young professionals and first-time investors.',
  'Jumeirah Village Circle (JVC) has established itself as one of Dubai''s most in-demand residential communities, offering exceptional value and consistently high rental yields. The circular master-planned neighbourhood features a diverse mix of apartments, townhouses, and villas, set among landscaped parks and community amenities. Its central location provides easy access to key business districts including Dubai Marina, JLT, and Al Barsha. With the lowest entry prices among major communities and the highest gross rental yields in the city, JVC is the go-to destination for yield-focused investors and first-time buyers looking for affordable quality living.',
  '{"Highest rental ROI in Dubai at 8.5%","Affordable entry prices","Central location","Diverse property types","Growing community amenities","Popular with young professionals"}'
);


-- ============================================================================
-- 3. BLOG_POSTS (6 rows)
-- From BLOG_POSTS (Blog.jsx)
-- ============================================================================

INSERT INTO blog_posts (slug, title, excerpt, date, category, category_color, image) VALUES
(
  'dubai-real-estate-forecast-2026',
  'Dubai Real Estate Forecast 2026: Key Trends & Opportunities',
  'A comprehensive look at the forces shaping Dubai''s property market this year -- from supply dynamics and mega-project completions to evolving buyer demographics.',
  '2026-02-10',
  'Market Analysis',
  'bg-gold-100 text-gold-800',
  'https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=800&q=80&fit=crop'
),
(
  'golden-visa-changes-2026',
  'UAE Golden Visa 2026: What the New Reforms Mean for Investors',
  'The latest amendments to the Golden Visa programme make it easier than ever to qualify. Here''s a breakdown of what changed and how it affects property buyers.',
  '2026-02-05',
  'Visa & Policy',
  'bg-blue-100 text-blue-800',
  'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800&q=80&fit=crop'
),
(
  'branded-residences-worth-premium',
  'Are Branded Residences Worth the Premium? A Data-Driven Analysis',
  'We compare branded vs. non-branded residences across price per sqft, rental yield, resale value, and occupancy to determine if the luxury premium pays off.',
  '2026-01-28',
  'Investment',
  'bg-violet-100 text-violet-800',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&fit=crop'
),
(
  'off-plan-vs-ready-2026',
  'Off-Plan vs. Ready Properties: Which Is the Better Investment in 2026?',
  'With off-plan prices rising and ready property yields holding strong, we weigh the pros and cons of each strategy in today''s market conditions.',
  '2026-01-20',
  'Buyer Guide',
  'bg-emerald-100 text-emerald-800',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80&fit=crop'
),
(
  'palm-jebel-ali-opportunity',
  'Palm Jebel Ali: Is This Dubai''s Biggest Investment Opportunity?',
  'The revival of Palm Jebel Ali has captured global investor attention. We explore the masterplan, pricing, developer track record, and projected returns.',
  '2026-01-14',
  'Area Spotlight',
  'bg-amber-100 text-amber-800',
  'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800&q=80&fit=crop'
),
(
  'mortgage-guide-non-residents',
  'The Complete Mortgage Guide for Non-Resident Buyers in Dubai',
  'From LTV ratios and documentation requirements to the best banks for expats, everything a non-resident needs to know about financing Dubai property.',
  '2026-01-07',
  'Finance',
  'bg-rose-100 text-rose-800',
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fit=crop'
);


-- ============================================================================
-- 4. BUYER_GUIDES (6 rows)
-- From GUIDES (BuyerGuides.jsx)
-- ============================================================================

INSERT INTO buyer_guides (slug, tag, tag_color, border_color, title, description, read_time, image, sort_order) VALUES
(
  'complete-buyers-guide',
  'Essential',
  'bg-gold-100 text-gold-800',
  'border-t-gold-500',
  'Complete Buyer''s Guide to Dubai Real Estate',
  'Everything you need to know about purchasing property in Dubai -- from choosing the right area to completing your transaction with confidence.',
  '15 min read',
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80&fit=crop',
  0
),
(
  'first-time-buyer-tips',
  'Beginner',
  'bg-blue-100 text-blue-800',
  'border-t-blue-500',
  'First-Time Buyer Tips for the Dubai Market',
  'New to Dubai property? Avoid common pitfalls and learn the insider strategies that experienced investors use to maximise returns.',
  '10 min read',
  'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=800&q=80&fit=crop',
  1
),
(
  'mortgage-and-finance',
  'Finance',
  'bg-emerald-100 text-emerald-800',
  'border-t-emerald-500',
  'Mortgage & Finance Options in the UAE',
  'Navigate UAE mortgage regulations, compare rates from leading banks, and understand the financing options available to residents and non-residents alike.',
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
  'Understand freehold vs. leasehold zones, RERA regulations, escrow protections, and your legal rights as a foreign property owner in Dubai.',
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
  'A transparent breakdown of all costs involved in buying Dubai property -- DLD fees, agent commissions, NOC charges, service charges, and more.',
  '8 min read',
  'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800&q=80&fit=crop',
  5
);


-- ============================================================================
-- 5. SERVICES (4 rows)
-- From SERVICES (Home.jsx)
-- ============================================================================

INSERT INTO services (key, initials, color, sort_order) VALUES
('investment', 'IC', 'bg-gold-500', 0),
('legal', 'LF', 'bg-estate-600', 1),
('visa', 'GV', 'bg-gold-700', 2),
('afterSales', 'AS', 'bg-estate-500', 3);


-- ============================================================================
-- 6. MARKET_HIGHLIGHTS (5 rows)
-- From MARKET_HIGHLIGHTS (Insights.jsx)
-- ============================================================================

INSERT INTO market_highlights (text, sort_order) VALUES
('Dubai property transactions exceeded AED 528 billion in 2024, a record year', 0),
('Off-plan sales grew 60% year-over-year, driven by international investor demand', 1),
('Average rental yields remain among the highest globally at 6-8%', 2),
('New visa reforms and economic diversification continue to attract long-term residents', 3),
('Prime areas saw 15-25% capital appreciation over the last 12 months', 4);


-- ============================================================================
-- 7. TOP_AREAS_ROI (8 rows)
-- From TOP_AREAS_ROI (Insights.jsx)
-- ============================================================================

INSERT INTO top_areas_roi (area, roi, price_range, trend, sort_order) VALUES
('Jumeirah Village Circle', '8.5%', 'AED 800 - 1,200/sqft', 'up', 0),
('Dubai Creek Harbour', '8.0%', 'AED 1,800 - 2,400/sqft', 'up', 1),
('Business Bay', '7.5%', 'AED 1,500 - 2,200/sqft', 'up', 2),
('Dubai Hills Estate', '7.3%', 'AED 1,400 - 2,000/sqft', 'up', 3),
('Dubai Marina', '7.1%', 'AED 1,800 - 2,600/sqft', 'stable', 4),
('JBR', '6.8%', 'AED 2,000 - 2,800/sqft', 'up', 5),
('Downtown Dubai', '6.2%', 'AED 2,400 - 3,200/sqft', 'stable', 6),
('Palm Jumeirah', '5.8%', 'AED 2,800 - 4,500/sqft', 'stable', 7);


-- ============================================================================
-- 8. GOLDEN_VISA_CONTENT (16 rows)
-- From BENEFITS (6), ELIGIBILITY (6), PROCESS_STEPS (4) in GoldenVisa.jsx
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
('process_step', 'step_3', 'Property Purchase', 'Complete the purchase with full legal support. We coordinate with the Dubai Land Department, escrow, and mortgage providers.', 2),
('process_step', 'step_4', 'Visa Application', 'We manage your entire visa application from medical exams and Emirates ID to final visa stamping -- a seamless, stress-free process.', 3);


-- ============================================================================
-- 9. OFFICES (2 rows)
-- From OFFICES (About.jsx) with coordinates
-- ============================================================================

INSERT INTO offices (city, address, phone, image, lat, lng) VALUES
(
  'Dubai',
  'Business Bay, Bay Square, Dubai, UAE',
  '+971 4 XXX XXXX',
  'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800&q=80&fit=crop',
  25.1865,
  55.2622
),
(
  'Istanbul',
  'Skyland Istanbul, Turkey',
  '+90 212 XXX XXXX',
  'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80&fit=crop',
  41.0766,
  28.9864
);


-- ============================================================================
-- 10. COMPANY_STATS (4 rows)
-- From STATS (About.jsx)
-- ============================================================================

INSERT INTO company_stats (value, label, sort_order) VALUES
('100+', 'Expert Advisors', 0),
('500+', 'Premium Properties', 1),
('40+', 'Countries Served', 2),
('$2B+', 'Transaction Volume', 3);


-- ============================================================================
-- 11. HERO_IMAGES (9 rows)
-- From IMAGES.hero (images.js)
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
-- 12. SITE_SETTINGS (4 rows)
-- Brand configuration
-- ============================================================================

INSERT INTO site_settings (key, value) VALUES
('brand', '"EmlakBanq"'),
('domain', '"emlakbanq.com"'),
('tagline', '"Dubai''s Premier Luxury Real Estate"'),
('social', '{"instagram":"https://instagram.com/emlakbanq","youtube":"https://youtube.com/@emlakbanq","linkedin":"https://linkedin.com/company/emlakbanq","twitter":"https://twitter.com/emlakbanq"}');
