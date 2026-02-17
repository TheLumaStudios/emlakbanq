-- Seed Multilingual Data for EmlakBanq
-- Run this after 20260216000002_multilingual_jsonb.sql

-- ===========================================
-- CLEAN EXISTING DATA (Optional)
-- ===========================================
-- Uncomment these lines if you want to delete existing data before seeding
-- DELETE FROM blog_posts;
-- DELETE FROM properties;
-- DELETE FROM areas;

-- ===========================================
-- AREAS - Investment Zones
-- ===========================================

INSERT INTO areas (name, key, slug, description, description_long, image, avg_price, roi, highlights, featured, sort_order)
VALUES
  -- Dubai Marina
  (
    '{
      "en": "Dubai Marina",
      "tr": "Dubai Marina",
      "ar": "دبي مارينا",
      "ru": "Дубай Марина",
      "de": "Dubai Marina",
      "fr": "Dubai Marina",
      "fa": "دبی مارینا",
      "hi": "दुबई मरीना"
    }'::jsonb,
    'dubai-marina-premium',
    'dubai-marina-premium',
    '{
      "en": "Waterfront living with world-class amenities and stunning skyline views",
      "tr": "Dünya standartlarında olanaklar ve muhteşem silüet manzaralarıyla sahil yaşamı",
      "ar": "الحياة على الواجهة المائية مع وسائل راحة عالمية المستوى وإطلالات رائعة على الأفق",
      "ru": "Жизнь на берегу с удобствами мирового класса и потрясающим видом на горизонт",
      "de": "Leben am Wasser mit erstklassigen Annehmlichkeiten und atemberaubendem Skyline-Blick",
      "fr": "Vie en bord de mer avec des commodités de classe mondiale et une vue imprenable sur l''horizon",
      "fa": "زندگی در کنار آب با امکانات جهانی و چشم‌اندازهای خیره‌کننده",
      "hi": "विश्व स्तरीय सुविधाओं और शानदार स्काईलाइन दृश्यों के साथ वॉटरफ्रंट रहन-सहन"
    }'::jsonb,
    '{
      "en": "Dubai Marina is one of the world''s most prestigious waterfront communities, featuring luxury residential towers, fine dining restaurants, and a vibrant marina walk. The area offers a cosmopolitan lifestyle with easy access to beaches, shopping, and entertainment.",
      "tr": "Dubai Marina, lüks konut kuleleri, kaliteli restoranlar ve canlı bir marina yürüyüş yoluna sahip dünyanın en prestijli sahil topluluklarından biridir. Bölge, plajlara, alışverişe ve eğlenceye kolay erişimle kozmopolit bir yaşam tarzı sunuyor.",
      "ar": "دبي مارينا هي واحدة من أكثر المجتمعات الساحلية المرموقة في العالم، وتتميز بأبراج سكنية فاخرة ومطاعم راقية وممشى حيوي للمارينا. توفر المنطقة أسلوب حياة عالمي مع سهولة الوصول إلى الشواطئ والتسوق والترفيه.",
      "ru": "Дубай Марина - одно из самых престижных прибрежных сообществ в мире с роскошными жилыми башнями, изысканными ресторанами и оживленной набережной марины. Район предлагает космополитичный образ жизни с легким доступом к пляжам, магазинам и развлечениям.",
      "de": "Dubai Marina ist eine der renommiertesten Wasserfront-Gemeinden der Welt mit luxuriösen Wohntürmen, gehobenen Restaurants und einer lebhaften Marina-Promenade. Das Gebiet bietet einen kosmopolitischen Lebensstil mit einfachem Zugang zu Stränden, Einkaufsmöglichkeiten und Unterhaltung.",
      "fr": "Dubai Marina est l''une des communautés de front de mer les plus prestigieuses au monde, avec des tours résidentielles de luxe, des restaurants gastronomiques et une promenade animée de la marina. Le quartier offre un style de vie cosmopolite avec un accès facile aux plages, aux boutiques et aux divertissements.",
      "fa": "دبی مارینا یکی از معتبرترین جوامع ساحلی جهان است که دارای برج‌های مسکونی لوکس، رستوران‌های عالی و پیاده‌روی پرجنب‌وجوش است. این منطقه سبک زندگی جهانی با دسترسی آسان به سواحل، خرید و سرگرمی ارائه می‌دهد.",
      "hi": "दुबई मरीना दुनिया के सबसे प्रतिष्ठित वॉटरफ्रंट समुदायों में से एक है, जिसमें लक्जरी आवासीय टावर, बढ़िया डाइनिंग रेस्तरां और एक जीवंत मरीना वॉक है। यह क्षेत्र समुद्र तटों, शॉपिंग और मनोरंजन की आसान पहुंच के साथ एक कॉस्मोपॉलिटन जीवन शैली प्रदान करता है।"
    }'::jsonb,
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
    'AED 2.5M',
    '7.2%',
    ARRAY['Beachfront Living', 'World-class Dining', '24/7 Security', 'Marina Walk'],
    true,
    1
  ),

  -- Downtown Dubai
  (
    '{
      "en": "Downtown Dubai",
      "tr": "Downtown Dubai",
      "ar": "وسط مدينة دبي",
      "ru": "Даунтаун Дубай",
      "de": "Downtown Dubai",
      "fr": "Centre-ville de Dubaï",
      "fa": "مرکز شهر دبی",
      "hi": "डाउनटाउन दुबई"
    }'::jsonb,
    'downtown-dubai-luxury',
    'downtown-dubai-luxury',
    '{
      "en": "The heart of Dubai, home to Burj Khalifa and Dubai Mall",
      "tr": "Dubai''nin kalbi, Burj Khalifa ve Dubai Mall''un evi",
      "ar": "قلب دبي، موطن برج خليفة ودبي مول",
      "ru": "Сердце Дубая, дом Бурдж-Халифа и Дубай Молла",
      "de": "Das Herz von Dubai, Heimat des Burj Khalifa und der Dubai Mall",
      "fr": "Le cœur de Dubaï, abritant le Burj Khalifa et le Dubai Mall",
      "fa": "قلب دبی، خانه برج خلیفه و مرکز خرید دبی",
      "hi": "दुबई का दिल, बुर्ज खलीफा और दुबई मॉल का घर"
    }'::jsonb,
    '{
      "en": "Downtown Dubai represents the pinnacle of urban sophistication, featuring the world''s tallest building, Burj Khalifa, and the iconic Dubai Fountain. This prestigious district offers luxury residences, premium shopping at Dubai Mall, and proximity to Old Town and Souk Al Bahar.",
      "tr": "Downtown Dubai, dünyanın en yüksek binası Burj Khalifa ve ikonik Dubai Fountain ile kentsel sofistikenin zirvesini temsil eder. Bu prestijli bölge, lüks konutlar, Dubai Mall''da premium alışveriş ve Old Town ile Souk Al Bahar''a yakınlık sunuyor.",
      "ar": "يمثل وسط مدينة دبي قمة التطور الحضري، ويضم أطول مبنى في العالم، برج خليفة، ونافورة دبي الشهيرة. يوفر هذا الحي المرموق مساكن فاخرة وتسوقًا متميزًا في دبي مول وقربًا من البلدة القديمة وسوق البحار.",
      "ru": "Даунтаун Дубай представляет собой вершину городской утонченности с самым высоким зданием в мире Бурдж-Халифа и знаменитым фонтаном Дубая. Этот престижный район предлагает роскошные резиденции, премиальный шопинг в Дубай Молле и близость к Старому городу и Сук Аль Бахар.",
      "de": "Downtown Dubai repräsentiert den Gipfel urbaner Raffinesse mit dem höchsten Gebäude der Welt, Burj Khalifa, und dem ikonischen Dubai Fountain. Dieses prestigeträchtige Viertel bietet luxuriöse Residenzen, Premium-Shopping in der Dubai Mall und Nähe zur Old Town und Souk Al Bahar.",
      "fr": "Downtown Dubai représente le summum de la sophistication urbaine, avec le plus haut bâtiment du monde, le Burj Khalifa, et l''emblématique fontaine de Dubaï. Ce quartier prestigieux offre des résidences de luxe, des boutiques haut de gamme au Dubai Mall et la proximité de la vieille ville et du Souk Al Bahar.",
      "fa": "مرکز شهر دبی اوج پیچیدگی شهری را با بلندترین ساختمان جهان، برج خلیفه، و فواره معروف دبی نشان می‌دهد. این منطقه معتبر اقامتگاه‌های لوکس، خرید ممتاز در مرکز خرید دبی و نزدیکی به شهر قدیم و سوق البحر را ارائه می‌دهد.",
      "hi": "डाउनटाउन दुबई शहरी परिष्कार के शिखर का प्रतिनिधित्व करता है, जिसमें दुनिया की सबसे ऊंची इमारत, बुर्ज खलीफा, और प्रतिष्ठित दुबई फाउंटेन है। यह प्रतिष्ठित जिला लक्जरी आवास, दुबई मॉल में प्रीमियम शॉपिंग और ओल्ड टाउन और सूक अल बहार की निकटता प्रदान करता है।"
    }'::jsonb,
    'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5',
    'AED 3.2M',
    '6.8%',
    ARRAY['Burj Khalifa', 'Dubai Mall', 'Opera District', 'Fountain Views'],
    true,
    2
  ),

  -- Palm Jumeirah
  (
    '{
      "en": "Palm Jumeirah",
      "tr": "Palm Jumeirah",
      "ar": "نخلة جميرا",
      "ru": "Палм Джумейра",
      "de": "Palm Jumeirah",
      "fr": "Palm Jumeirah",
      "fa": "پالم جمیرا",
      "hi": "पाम जुमेराह"
    }'::jsonb,
    'palm-jumeirah-exclusive',
    'palm-jumeirah-exclusive',
    '{
      "en": "Iconic man-made island with exclusive villas and luxury hotels",
      "tr": "Özel villalar ve lüks otellere sahip ikonik yapay ada",
      "ar": "جزيرة اصطناعية شهيرة مع فلل حصرية وفنادق فاخرة",
      "ru": "Знаковый искусственный остров с эксклюзивными виллами и роскошными отелями",
      "de": "Ikonische künstliche Insel mit exklusiven Villen und Luxushotels",
      "fr": "Île artificielle emblématique avec villas exclusives et hôtels de luxe",
      "fa": "جزیره مصنوعی نمادین با ویلاهای انحصاری و هتل‌های لوکس",
      "hi": "विशेष विला और लक्जरी होटल के साथ प्रतिष्ठित कृत्रिम द्वीप"
    }'::jsonb,
    '{
      "en": "Palm Jumeirah is the world''s largest man-made island, offering unparalleled luxury living with private beaches, exclusive villas, and world-renowned hotels. This engineering marvel provides residents with a unique island lifestyle while remaining connected to mainland Dubai.",
      "tr": "Palm Jumeirah, özel plajlar, benzersiz villalar ve dünyaca ünlü oteller sunarak benzersiz lüks yaşam sunan dünyanın en büyük yapay adasıdır. Bu mühendislik harikası, ana karaya bağlı kalırken sakinlerine benzersiz bir ada yaşam tarzı sağlar.",
      "ar": "نخلة جميرا هي أكبر جزيرة اصطناعية في العالم، وتوفر حياة فاخرة لا مثيل لها مع شواطئ خاصة وفلل حصرية وفنادق مشهورة عالميًا. توفر هذه الأعجوبة الهندسية للمقيمين أسلوب حياة جزيرة فريد مع البقاء متصلين بالبر الرئيسي لدبي.",
      "ru": "Палм Джумейра - крупнейший в мире искусственный остров, предлагающий непревзойденную роскошную жизнь с частными пляжами, эксклюзивными виллами и всемирно известными отелями. Это чудо инженерной мысли предоставляет жителям уникальный островной образ жизни, оставаясь связанным с материковым Дубаем.",
      "de": "Palm Jumeirah ist die größte künstliche Insel der Welt und bietet unvergleichliches Luxusleben mit Privatstränden, exklusiven Villen und weltbekannten Hotels. Dieses technische Wunderwerk bietet den Bewohnern einen einzigartigen Insel-Lebensstil, während es mit dem Festland Dubai verbunden bleibt.",
      "fr": "Palm Jumeirah est la plus grande île artificielle du monde, offrant une vie de luxe inégalée avec des plages privées, des villas exclusives et des hôtels de renommée mondiale. Cette merveille d''ingénierie offre aux résidents un style de vie insulaire unique tout en restant connecté à Dubaï continental.",
      "fa": "پالم جمیرا بزرگترین جزیره مصنوعی جهان است که زندگی لوکس بی‌نظیری با سواحل خصوصی، ویلاهای انحصاری و هتل‌های معروف جهانی ارائه می‌دهد. این شاهکار مهندسی به ساکنان سبک زندگی منحصر به فرد جزیره‌ای را در حالی که به خشکی دبی متصل است، ارائه می‌دهد.",
      "hi": "पाम जुमेराह दुनिया का सबसे बड़ा कृत्रिम द्वीप है, जो निजी समुद्र तटों, विशेष विला और विश्व प्रसिद्ध होटलों के साथ अद्वितीय लक्जरी जीवन प्रदान करता है। यह इंजीनियरिंग चमत्कार निवासियों को मुख्य भूमि दुबई से जुड़े रहते हुए एक अनूठी द्वीप जीवन शैली प्रदान करता है।"
    }'::jsonb,
    'https://images.unsplash.com/photo-1580674285054-bed31e145f59',
    'AED 5.8M',
    '6.5%',
    ARRAY['Private Beach', 'Exclusive Villas', '5-Star Hotels', 'Island Living'],
    true,
    3
  );

-- ===========================================
-- PROPERTIES - Luxury Real Estate
-- ===========================================

INSERT INTO properties (name, slug, type, type_label, location, price, beds, sqft, developer, year, image, description, gallery, amenities, featured, sort_order)
VALUES
  -- Marina Heights Tower
  (
    '{
      "en": "Marina Heights Tower",
      "tr": "Marina Heights Kulesi",
      "ar": "برج مارينا هايتس",
      "ru": "Башня Марина Хайтс",
      "de": "Marina Heights Turm",
      "fr": "Tour Marina Heights",
      "fa": "برج مارینا هایتس",
      "hi": "मरीना हाइट्स टावर"
    }'::jsonb,
    'marina-heights-tower-sample',
    'apartment',
    '{
      "en": "Luxury Apartment",
      "tr": "Lüks Daire",
      "ar": "شقة فاخرة",
      "ru": "Роскошная квартира",
      "de": "Luxuswohnung",
      "fr": "Appartement de luxe",
      "fa": "آپارتمان لوکس",
      "hi": "लक्जरी अपार्टमेंट"
    }'::jsonb,
    '{
      "en": "Dubai Marina",
      "tr": "Dubai Marina",
      "ar": "دبي مارينا",
      "ru": "Дубай Марина",
      "de": "Dubai Marina",
      "fr": "Dubai Marina",
      "fa": "دبی مارینا",
      "hi": "दुबई मरीना"
    }'::jsonb,
    'AED 2,750,000',
    3,
    '2,450 sqft',
    'Emaar Properties',
    '2024',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00',
    'Stunning 3-bedroom apartment with panoramic marina views, modern finishes, and access to premium amenities including infinity pool, gym, and concierge services.',
    ARRAY[
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2'
    ],
    ARRAY[
      'Infinity Pool',
      'State-of-the-art Gym',
      '24/7 Concierge',
      'Private Parking',
      'Marina Walk Access',
      'Children Play Area'
    ],
    true,
    1
  ),

  -- Burj Khalifa Residence
  (
    '{
      "en": "Burj Khalifa Residence",
      "tr": "Burj Khalifa Rezidansı",
      "ar": "إقامة برج خليفة",
      "ru": "Резиденция Бурдж-Халифа",
      "de": "Burj Khalifa Residenz",
      "fr": "Résidence Burj Khalifa",
      "fa": "اقامتگاه برج خلیفه",
      "hi": "बुर्ज खलीफा निवास"
    }'::jsonb,
    'burj-khalifa-residence-sample',
    'penthouse',
    '{
      "en": "Ultra-Luxury Penthouse",
      "tr": "Ultra-Lüks Çatı Katı",
      "ar": "بنتهاوس فائق الفخامة",
      "ru": "Ультра-роскошный пентхаус",
      "de": "Ultra-Luxus-Penthouse",
      "fr": "Penthouse ultra-luxueux",
      "fa": "پنت‌هاوس فوق‌العاده لوکس",
      "hi": "अत्यधिक लक्जरी पेंटहाउस"
    }'::jsonb,
    '{
      "en": "Downtown Dubai",
      "tr": "Downtown Dubai",
      "ar": "وسط مدينة دبي",
      "ru": "Даунтаун Дубай",
      "de": "Downtown Dubai",
      "fr": "Centre-ville de Dubaï",
      "fa": "مرکز شهر دبی",
      "hi": "डाउनटाउन दुबई"
    }'::jsonb,
    'AED 15,500,000',
    5,
    '8,200 sqft',
    'Emaar Properties',
    '2023',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
    'Exclusive penthouse in the world''s tallest tower with breathtaking city views, custom interiors, private elevator, and unparalleled luxury finishes.',
    ARRAY[
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3'
    ],
    ARRAY[
      'Private Elevator',
      'Smart Home System',
      'Wine Cellar',
      'Jacuzzi',
      'Panoramic Views',
      'Butler Service',
      'Private Cinema'
    ],
    true,
    2
  ),

  -- Palm Villa Retreat
  (
    '{
      "en": "Palm Villa Retreat",
      "tr": "Palm Villa Dinlenme Yeri",
      "ar": "ملاذ فيلا النخلة",
      "ru": "Вилла на Пальме",
      "de": "Palm Villa Rückzugsort",
      "fr": "Retraite de Villa Palm",
      "fa": "ویلای پالم",
      "hi": "पाम विला रिट्रीट"
    }'::jsonb,
    'palm-villa-retreat-sample',
    'villa',
    '{
      "en": "Beachfront Villa",
      "tr": "Sahil Villası",
      "ar": "فيلا على الشاطئ",
      "ru": "Вилла на берегу",
      "de": "Strandvilla",
      "fr": "Villa en bord de mer",
      "fa": "ویلای ساحلی",
      "hi": "बीचफ्रंट विला"
    }'::jsonb,
    '{
      "en": "Palm Jumeirah",
      "tr": "Palm Jumeirah",
      "ar": "نخلة جميرا",
      "ru": "Палм Джумейра",
      "de": "Palm Jumeirah",
      "fr": "Palm Jumeirah",
      "fa": "پالم جمیرا",
      "hi": "पाम जुमेराह"
    }'::jsonb,
    'AED 22,000,000',
    6,
    '12,000 sqft',
    'Nakheel',
    '2023',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    'Magnificent beachfront villa on the iconic Palm Jumeirah featuring private beach access, infinity pool, home cinema, and stunning Arabian Gulf views.',
    ARRAY[
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9'
    ],
    ARRAY[
      'Private Beach',
      'Infinity Pool',
      'Home Cinema',
      'Spa & Sauna',
      'Landscaped Garden',
      'Staff Quarters',
      'Smart Villa Technology'
    ],
    true,
    3
  );

-- ===========================================
-- BLOG POSTS - Real Estate Insights
-- ===========================================

INSERT INTO blog_posts (title, slug, excerpt, content, image, category, category_color, date, published, published_at, sort_order)
VALUES
  -- Dubai Real Estate Market 2025
  (
    '{
      "en": "Dubai Real Estate Market Outlook 2025",
      "tr": "Dubai Emlak Piyasası 2025 Görünümü",
      "ar": "توقعات سوق العقارات في دبي 2025",
      "ru": "Прогноз рынка недвижимости Дубая 2025",
      "de": "Dubai Immobilienmarkt Ausblick 2025",
      "fr": "Perspectives du marché immobilier de Dubaï 2025",
      "fa": "چشم‌انداز بازار املاک دبی 2025",
      "hi": "दुबई रियल एस्टेट बाजार दृष्टिकोण 2025"
    }'::jsonb,
    'dubai-real-estate-market-outlook-2025-sample',
    '{
      "en": "Comprehensive analysis of Dubai''s real estate market trends, investment opportunities, and price forecasts for 2025.",
      "tr": "Dubai emlak piyasası trendleri, yatırım fırsatları ve 2025 fiyat tahminlerinin kapsamlı analizi.",
      "ar": "تحليل شامل لاتجاهات سوق العقارات في دبي وفرص الاستثمار وتوقعات الأسعار لعام 2025.",
      "ru": "Комплексный анализ тенденций рынка недвижимости Дубая, инвестиционных возможностей и прогнозов цен на 2025 год.",
      "de": "Umfassende Analyse der Immobilienmarkttrends in Dubai, Investitionsmöglichkeiten und Preisprognosen für 2025.",
      "fr": "Analyse complète des tendances du marché immobilier de Dubaï, des opportunités d''investissement et des prévisions de prix pour 2025.",
      "fa": "تحلیل جامع روندهای بازار املاک دبی، فرصت‌های سرمایه‌گذاری و پیش‌بینی قیمت برای 2025.",
      "hi": "दुबई के रियल एस्टेट बाजार के रुझानों, निवेश के अवसरों और 2025 के लिए मूल्य पूर्वानुमानों का व्यापक विश्लेषण।"
    }'::jsonb,
    '{
      "en": "Dubai''s real estate market continues to show remarkable resilience and growth in 2025. With government initiatives supporting foreign investment, new visa programs, and infrastructure development, the emirate remains a top destination for property investors worldwide.\n\nKey trends include:\n• Sustainable and smart home developments\n• Increased demand in suburban communities\n• Rising popularity of branded residences\n• Strong rental yields in prime locations\n\nInvestors are particularly drawn to Dubai''s tax-free environment, world-class infrastructure, and the recent introduction of the Golden Visa program, which offers long-term residency to property investors.",
      "tr": "Dubai emlak piyasası 2025''te olağanüstü dayanıklılık ve büyüme göstermeye devam ediyor. Yabancı yatırımı destekleyen hükümet girişimleri, yeni vize programları ve altyapı geliştirmeleri ile emirlik, dünya çapında gayrimenkul yatırımcıları için en önemli destinasyon olmaya devam ediyor.\n\nAna trendler şunlardır:\n• Sürdürülebilir ve akıllı ev gelişmeleri\n• Banliyö topluluklarında artan talep\n• Markalı rezidansların artan popülaritesi\n• Prime konumlarda güçlü kira getirileri\n\nYatırımcılar özellikle Dubai''nin vergisiz ortamına, dünya standartlarındaki altyapısına ve mülk yatırımcılarına uzun vadeli ikamet sunan Golden Visa programının yakın zamanda tanıtılmasına çekilmektedir.",
      "ar": "يواصل سوق العقارات في دبي إظهار المرونة والنمو الملحوظ في عام 2025. مع المبادرات الحكومية الداعمة للاستثمار الأجنبي وبرامج التأشيرات الجديدة وتطوير البنية التحتية، تظل الإمارة وجهة رئيسية للمستثمرين العقاريين في جميع أنحاء العالم.\n\nتشمل الاتجاهات الرئيسية:\n• التطورات المستدامة والمنازل الذكية\n• زيادة الطلب في المجتمعات الضاحية\n• تزايد شعبية الإقامات ذات العلامات التجارية\n• عوائد إيجار قوية في المواقع الرئيسية\n\nينجذب المستثمرون بشكل خاص إلى بيئة دبي المعفاة من الضرائب والبنية التحتية ذات المستوى العالمي وبرنامج التأشيرة الذهبية الذي تم تقديمه مؤخرًا والذي يوفر إقامة طويلة الأجل لمستثمري العقارات.",
      "ru": "Рынок недвижимости Дубая продолжает демонстрировать замечательную устойчивость и рост в 2025 году. Благодаря государственным инициативам, поддерживающим иностранные инвестиции, новым визовым программам и развитию инфраструктуры, эмират остается главным направлением для инвесторов в недвижимость по всему миру.\n\nОсновные тенденции включают:\n• Устойчивые и умные дома\n• Растущий спрос в пригородных районах\n• Растущая популярность брендированных резиденций\n• Высокая доходность аренды в престижных локациях\n\nИнвесторов особенно привлекает безналоговая среда Дубая, инфраструктура мирового класса и недавно введенная программа Golden Visa, которая предлагает долгосрочное проживание для инвесторов в недвижимость.",
      "de": "Der Immobilienmarkt in Dubai zeigt 2025 weiterhin bemerkenswerte Widerstandsfähigkeit und Wachstum. Mit Regierungsinitiativen zur Unterstützung ausländischer Investitionen, neuen Visa-Programmen und Infrastrukturentwicklung bleibt das Emirat ein Top-Ziel für Immobilieninvestoren weltweit.\n\nWichtige Trends umfassen:\n• Nachhaltige und intelligente Wohnentwicklungen\n• Steigende Nachfrage in Vorstadtgemeinden\n• Wachsende Beliebtheit von Markenresidenzen\n• Starke Mietrenditen in erstklassigen Lagen\n\nInvestoren werden besonders von Dubais steuerfreiem Umfeld, der erstklassigen Infrastruktur und der kürzlich eingeführten Golden Visa angezogen, die Immobilieninvestoren langfristigen Aufenthalt bietet.",
      "fr": "Le marché immobilier de Dubaï continue de montrer une résilience et une croissance remarquables en 2025. Avec des initiatives gouvernementales soutenant l''investissement étranger, de nouveaux programmes de visa et le développement des infrastructures, l''émirat reste une destination de choix pour les investisseurs immobiliers du monde entier.\n\nLes tendances clés incluent:\n• Développements durables et maisons intelligentes\n• Demande accrue dans les communautés de banlieue\n• Popularité croissante des résidences de marque\n• Rendements locatifs solides dans les emplacements de choix\n\nLes investisseurs sont particulièrement attirés par l''environnement sans taxe de Dubaï, les infrastructures de classe mondiale et le récent programme Golden Visa qui offre une résidence à long terme aux investisseurs immobiliers.",
      "fa": "بازار املاک دبی در سال 2025 به نشان دادن انعطاف‌پذیری و رشد قابل توجه ادامه می‌دهد. با ابتکارات دولتی که از سرمایه‌گذاری خارجی، برنامه‌های ویزای جدید و توسعه زیرساخت حمایت می‌کنند، امارات به عنوان مقصد برتر برای سرمایه‌گذاران املاک در سراسر جهان باقی می‌ماند.\n\nروندهای کلیدی شامل:\n• توسعه خانه‌های پایدار و هوشمند\n• افزایش تقاضا در جوامع حومه‌ای\n• محبوبیت فزاینده اقامتگاه‌های برندی\n• بازدهی قوی اجاره در مکان‌های برتر\n\nسرمایه‌گذاران به ویژه به محیط بدون مالیات دبی، زیرساخت جهانی و برنامه اخیر ویزای طلایی که اقامت بلندمدت به سرمایه‌گذاران املاک ارائه می‌دهد، جذب می‌شوند.",
      "hi": "दुबई का रियल एस्टेट बाजार 2025 में उल्लेखनीय लचीलापन और विकास दिखाना जारी रखता है। विदेशी निवेश का समर्थन करने वाली सरकारी पहलों, नए वीजा कार्यक्रमों और बुनियादी ढांचे के विकास के साथ, अमीरात दुनिया भर में संपत्ति निवेशकों के लिए एक शीर्ष गंतव्य बना हुआ है।\n\nमुख्य रुझानों में शामिल हैं:\n• टिकाऊ और स्मार्ट होम विकास\n• उपनगरीय समुदायों में बढ़ती मांग\n• ब्रांडेड निवासों की बढ़ती लोकप्रियता\n• प्रमुख स्थानों में मजबूत किराये की उपज\n\nनिवेशक विशेष रूप से दुबई के कर-मुक्त वातावरण, विश्व स्तरीय बुनियादी ढांचे और हाल ही में शुरू किए गए गोल्डन वीजा कार्यक्रम से आकर्षित होते हैं, जो संपत्ति निवेशकों को दीर्घकालिक निवास प्रदान करता है।"
    }'::jsonb,
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa',
    '{
      "en": "Market Insights",
      "tr": "Piyasa İçgörüleri",
      "ar": "رؤى السوق",
      "ru": "Рыночная аналитика",
      "de": "Markteinblicke",
      "fr": "Perspectives du marché",
      "fa": "بینش بازار",
      "hi": "बाजार अंतर्दृष्टि"
    }'::jsonb,
    'bg-blue-100 text-blue-700',
    'January 15, 2025',
    true,
    '2025-01-15T10:00:00Z',
    1
  ),

  -- Golden Visa Guide
  (
    '{
      "en": "Complete Guide to UAE Golden Visa",
      "tr": "BAE Altın Vize Tam Rehberi",
      "ar": "الدليل الكامل لتأشيرة الإمارات الذهبية",
      "ru": "Полное руководство по Golden Visa ОАЭ",
      "de": "Vollständiger Leitfaden zum UAE Golden Visa",
      "fr": "Guide complet du visa doré des EAU",
      "fa": "راهنمای کامل ویزای طلایی امارات",
      "hi": "यूएई गोल्डन वीजा के लिए पूर्ण गाइड"
    }'::jsonb,
    'complete-guide-uae-golden-visa-sample',
    '{
      "en": "Everything you need to know about obtaining the UAE Golden Visa through property investment, including requirements, benefits, and application process.",
      "tr": "Mülk yatırımı yoluyla BAE Altın Vize alma hakkında bilmeniz gereken her şey, gereksinimler, faydalar ve başvuru süreci dahil.",
      "ar": "كل ما تحتاج لمعرفته حول الحصول على تأشيرة الإمارات الذهبية من خلال الاستثمار العقاري، بما في ذلك المتطلبات والفوائد وعملية التقديم.",
      "ru": "Все, что вам нужно знать о получении Golden Visa ОАЭ через инвестиции в недвижимость, включая требования, преимущества и процесс подачи заявки.",
      "de": "Alles, was Sie über den Erhalt des UAE Golden Visa durch Immobilieninvestitionen wissen müssen, einschließlich Anforderungen, Vorteile und Antragsverfahren.",
      "fr": "Tout ce que vous devez savoir sur l''obtention du visa doré des EAU par l''investissement immobilier, y compris les exigences, les avantages et le processus de demande.",
      "fa": "همه چیزهایی که باید در مورد دریافت ویزای طلایی امارات از طریق سرمایه‌گذاری املاک بدانید، از جمله الزامات، مزایا و فرآیند درخواست.",
      "hi": "संपत्ति निवेश के माध्यम से यूएई गोल्डन वीजा प्राप्त करने के बारे में आपको जो कुछ भी जानने की जरूरत है, आवश्यकताओं, लाभों और आवेदन प्रक्रिया सहित।"
    }'::jsonb,
    '{
      "en": "The UAE Golden Visa is a long-term residence visa that enables foreign talents to live, work, and study in the UAE without the need for a national sponsor. Property investors can qualify for this prestigious visa by investing a minimum of AED 2 million in real estate.\n\nKey Benefits:\n• 10-year renewable residency\n• No sponsor requirement\n• Family sponsorship included\n• 100% ownership of business on UAE mainland\n• Ease of travel and business operations\n\nEligibility Criteria:\n• Property investment of minimum AED 2 million\n• Property must not be mortgaged\n• Investment must be retained for at least 3 years\n\nThe application process typically takes 4-6 weeks and can be completed through our expert Golden Visa assistance service.",
      "tr": "BAE Altın Vize, yabancı yeteneklerin ulusal bir sponsora ihtiyaç duymadan BAE''de yaşamasını, çalışmasını ve okumasını sağlayan uzun vadeli bir ikamet vizesidir. Emlak yatırımcıları, gayrimenkule minimum 2 milyon AED yatırım yaparak bu prestijli vize için hak kazanabilir.\n\nAna Faydalar:\n• 10 yıl yenilenebilir ikamet\n• Sponsor gereksinimi yok\n• Aile sponsorluğu dahil\n• BAE anakarasında işletmenin %100 sahipliği\n• Seyahat ve iş operasyonlarında kolaylık\n\nUygunluk Kriterleri:\n• Minimum 2 milyon AED mülk yatırımı\n• Mülk ipotekli olmamalı\n• Yatırım en az 3 yıl tutulmalı\n\nBaşvuru süreci genellikle 4-6 hafta sürer ve uzman Altın Vize yardım hizmetimiz aracılığıyla tamamlanabilir.",
      "ar": "تأشيرة الإمارات الذهبية هي تأشيرة إقامة طويلة الأجل تمكن المواهب الأجنبية من العيش والعمل والدراسة في الإمارات دون الحاجة إلى كفيل وطني. يمكن لمستثمري العقارات التأهل لهذه التأشيرة المرموقة من خلال الاستثمار بحد أدنى 2 مليون درهم في العقارات.\n\nالفوائد الرئيسية:\n• إقامة قابلة للتجديد لمدة 10 سنوات\n• لا حاجة لكفيل\n• كفالة العائلة مدرجة\n• ملكية 100٪ للأعمال في البر الرئيسي للإمارات\n• سهولة السفر والعمليات التجارية\n\nمعايير الأهلية:\n• استثمار عقاري بحد أدنى 2 مليون درهم\n• يجب ألا يكون العقار مرهونًا\n• يجب الاحتفاظ بالاستثمار لمدة 3 سنوات على الأقل\n\nتستغرق عملية التقديم عادةً 4-6 أسابيع ويمكن إكمالها من خلال خدمة المساعدة الخبيرة للتأشيرة الذهبية.",
      "ru": "Golden Visa ОАЭ - это долгосрочная виза на жительство, которая позволяет иностранным талантам жить, работать и учиться в ОАЭ без необходимости в национальном спонсоре. Инвесторы в недвижимость могут претендовать на эту престижную визу, инвестировав минимум 2 миллиона дирхамов ОАЭ в недвижимость.\n\nОсновные преимущества:\n• 10-летнее продлеваемое проживание\n• Не требуется спонсор\n• Включена семейная спонсорская поддержка\n• 100% владение бизнесом на материковой части ОАЭ\n• Легкость путешествий и деловых операций\n\nКритерии приемлемости:\n• Инвестиции в недвижимость минимум 2 миллиона дирхамов\n• Недвижимость не должна быть заложена\n• Инвестиции должны быть сохранены не менее 3 лет\n\nПроцесс подачи заявки обычно занимает 4-6 недель и может быть завершен через нашу экспертную службу помощи Golden Visa.",
      "de": "Das UAE Golden Visa ist ein langfristiges Aufenthaltsvisum, das ausländischen Talenten ermöglicht, ohne nationalen Sponsor in den VAE zu leben, zu arbeiten und zu studieren. Immobilieninvestoren können sich für dieses prestigeträchtige Visum qualifizieren, indem sie mindestens 2 Millionen AED in Immobilien investieren.\n\nHauptvorteile:\n• 10 Jahre erneuerbarer Aufenthalt\n• Keine Sponsoranforderung\n• Familiensponsorschaft enthalten\n• 100% Geschäftseigentum auf dem VAE-Festland\n• Erleichterung von Reisen und Geschäftsoperationen\n\nZulassungskriterien:\n• Immobilieninvestition von mindestens 2 Millionen AED\n• Immobilie darf nicht belastet sein\n• Investition muss mindestens 3 Jahre gehalten werden\n\nDer Antragsprozess dauert in der Regel 4-6 Wochen und kann über unseren Expertenservice für Golden Visa-Unterstützung abgeschlossen werden.",
      "fr": "Le visa doré des EAU est un visa de résidence à long terme qui permet aux talents étrangers de vivre, travailler et étudier aux EAU sans avoir besoin d''un sponsor national. Les investisseurs immobiliers peuvent se qualifier pour ce visa prestigieux en investissant au minimum 2 millions d''AED dans l''immobilier.\n\nAvantages clés:\n• Résidence renouvelable de 10 ans\n• Aucune exigence de sponsor\n• Parrainage familial inclus\n• 100% de propriété d''entreprise sur le continent des EAU\n• Facilité de voyage et d''opérations commerciales\n\nCritères d''éligibilité:\n• Investissement immobilier minimum de 2 millions d''AED\n• La propriété ne doit pas être hypothéquée\n• L''investissement doit être conservé pendant au moins 3 ans\n\nLe processus de demande prend généralement 4 à 6 semaines et peut être complété via notre service d''assistance expert pour le visa doré.",
      "fa": "ویزای طلایی امارات یک ویزای اقامت بلندمدت است که استعدادهای خارجی را قادر می‌سازد بدون نیاز به اسپانسر ملی در امارات زندگی، کار و تحصیل کنند. سرمایه‌گذاران املاک می‌توانند با سرمایه‌گذاری حداقل 2 میلیون درهم در املاک برای این ویزای معتبر واجد شرایط شوند.\n\nمزایای کلیدی:\n• اقامت قابل تمدید 10 ساله\n• نیازی به اسپانسر نیست\n• اسپانسرشیپ خانواده شامل می‌شود\n• 100٪ مالکیت کسب‌وکار در سرزمین اصلی امارات\n• سهولت سفر و عملیات تجاری\n\nمعیارهای واجد شرایط بودن:\n• سرمایه‌گذاری ملک حداقل 2 میلیون درهم\n• ملک نباید رهن باشد\n• سرمایه‌گذاری باید حداقل 3 سال حفظ شود\n\nفرآیند درخواست معمولاً 4-6 هفته طول می‌کشد و می‌تواند از طریق خدمات کمک تخصصی ویزای طلایی ما انجام شود.",
      "hi": "यूएई गोल्डन वीजा एक दीर्घकालिक निवास वीजा है जो विदेशी प्रतिभाओं को राष्ट्रीय प्रायोजक की आवश्यकता के बिना यूएई में रहने, काम करने और अध्ययन करने में सक्षम बनाता है। संपत्ति निवेशक रियल एस्टेट में न्यूनतम AED 2 मिलियन का निवेश करके इस प्रतिष्ठित वीजा के लिए योग्य हो सकते हैं।\n\nमुख्य लाभ:\n• 10 साल की नवीकरणीय निवास\n• कोई प्रायोजक आवश्यकता नहीं\n• पारिवारिक प्रायोजन शामिल\n• यूएई मुख्य भूमि पर व्यवसाय का 100% स्वामित्व\n• यात्रा और व्यावसायिक संचालन में आसानी\n\nपात्रता मानदंड:\n• न्यूनतम AED 2 मिलियन की संपत्ति निवेश\n• संपत्ति बंधक नहीं होनी चाहिए\n• निवेश कम से कम 3 साल के लिए बनाए रखा जाना चाहिए\n\nआवेदन प्रक्रिया में आम तौर पर 4-6 सप्ताह लगते हैं और इसे हमारी विशेषज्ञ गोल्डन वीजा सहायता सेवा के माध्यम से पूरा किया जा सकता है।"
    }'::jsonb,
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
    '{
      "en": "Golden Visa",
      "tr": "Altın Vize",
      "ar": "التأشيرة الذهبية",
      "ru": "Золотая виза",
      "de": "Goldenes Visum",
      "fr": "Visa doré",
      "fa": "ویزای طلایی",
      "hi": "गोल्डन वीजा"
    }'::jsonb,
    'bg-amber-100 text-amber-700',
    'February 1, 2025',
    true,
    '2025-02-01T10:00:00Z',
    2
  );

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Multilingual seed data inserted successfully!';
  RAISE NOTICE '📊 Added 3 areas, 3 properties, and 2 blog posts';
  RAISE NOTICE '🌍 All content includes translations for 8 languages';
END $$;
