-- ============================================================================
-- EmlakBanq - Alanya Veri Doldurma Script'i
-- Bu script'i Supabase SQL Editor'de çalıştırın
-- Tüm Dubai/UAE verilerini siler ve Alanya verileriyle değiştirir
-- ============================================================================

-- ============================================================================
-- 0. MEVCUT VERİLERİ TEMİZLE (Dubai verileri dahil)
-- ============================================================================
DELETE FROM properties;
DELETE FROM areas;
DELETE FROM blog_posts;
DELETE FROM market_highlights;
DELETE FROM top_areas_roi;
DELETE FROM golden_visa_content;

-- ============================================================================
-- 1. PROPERTIES (20 ilan - Alanya genelinde)
-- ============================================================================

INSERT INTO properties (name, slug, location, price, type, type_label, beds, sqft, image, featured, description, gallery, amenities, developer, year, sort_order) VALUES
(
  '{"tr": "Deniz Manzaralı Lüks Villa", "en": "Sea View Luxury Villa", "de": "Luxusvilla mit Meerblick", "ru": "Роскошная вилла с видом на море", "bs": "Luksuzna vila s pogledom na more"}'::jsonb,
  'deniz-manzarali-luks-villa',
  '{"tr": "Kargıcak, Alanya", "en": "Kargicak, Alanya", "de": "Kargıcak, Alanya", "ru": "Каргыджак, Аланья", "bs": "Kargıcak, Alanya"}'::jsonb,
  '€485.000',
  'villa',
  '{"tr": "Villa", "en": "Villa", "de": "Villa", "ru": "Вилла", "bs": "Vila"}'::jsonb,
  4,
  '280 m²',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80&fit=crop',
  true,
  'Akdeniz''in büyüleyici manzarasına sahip bu muhteşem villa, modern mimari ve doğal güzelliği bir arada sunuyor. Özel havuz, geniş teras ve premium iç mekan tasarımı ile hayalinizdeki yaşam sizi bekliyor.',
  ARRAY['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80&fit=crop', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&fit=crop', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&fit=crop'],
  ARRAY['Özel Havuz', 'Deniz Manzarası', 'Merkezi Klima', 'Otopark', 'Güvenlik', 'Bahçe'],
  'Alanya Premium Yapı',
  '2024',
  0
),
(
  '{"tr": "Modern Residence Daire", "en": "Modern Residence Apartment", "de": "Moderne Residenz-Wohnung", "ru": "Современная резиденция", "bs": "Moderni stan u rezidenciji"}'::jsonb,
  'modern-residence-daire-mahmutlar',
  '{"tr": "Mahmutlar, Alanya", "en": "Mahmutlar, Alanya", "de": "Mahmutlar, Alanya", "ru": "Махмутлар, Аланья", "bs": "Mahmutlar, Alanya"}'::jsonb,
  '€89.000',
  'apartment',
  '{"tr": "Daire", "en": "Apartment", "de": "Wohnung", "ru": "Квартира", "bs": "Stan"}'::jsonb,
  2,
  '95 m²',
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fit=crop',
  true,
  'Mahmutlar''ın kalbinde, denize sadece 300 metre mesafede modern bir residence projesi. Tam teşekküllü sosyal alanlar, havuz, fitness merkezi ve 7/24 güvenlik sistemi ile konforlu yaşam.',
  ARRAY['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fit=crop', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80&fit=crop'],
  ARRAY['Havuz', 'Fitness', 'Sauna', 'Otopark', 'Güvenlik', 'Çocuk Parkı'],
  'Mahmutlar İnşaat',
  '2025',
  1
),
(
  '{"tr": "Premium Penthouse", "en": "Premium Penthouse", "de": "Premium-Penthouse", "ru": "Премиум пентхаус", "bs": "Premium penthaus"}'::jsonb,
  'premium-penthouse-oba',
  '{"tr": "Oba, Alanya", "en": "Oba, Alanya", "de": "Oba, Alanya", "ru": "Оба, Аланья", "bs": "Oba, Alanya"}'::jsonb,
  '€320.000',
  'penthouse',
  '{"tr": "Penthouse", "en": "Penthouse", "de": "Penthouse", "ru": "Пентхаус", "bs": "Penthaus"}'::jsonb,
  3,
  '210 m²',
  'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80&fit=crop',
  true,
  'Oba''nın en prestijli adresinde, 360 derece panoramik manzaraya sahip premium penthouse. Geniş teras alanı, jakuzi ve özel asansör ile lüksün doruklarında yaşam.',
  ARRAY['https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80&fit=crop', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80&fit=crop'],
  ARRAY['Panoramik Manzara', 'Özel Teras', 'Jakuzi', 'Özel Asansör', 'Akıllı Ev', 'Otopark'],
  'Oba Gayrimenkul',
  '2024',
  2
),
(
  '{"tr": "Sahil Villası", "en": "Beachfront Villa", "de": "Strandvilla", "ru": "Вилла на берегу моря", "bs": "Vila na obali"}'::jsonb,
  'sahil-villasi-kestel',
  '{"tr": "Kestel, Alanya", "en": "Kestel, Alanya", "de": "Kestel, Alanya", "ru": "Кестель, Аланья", "bs": "Kestel, Alanya"}'::jsonb,
  '€650.000',
  'villa',
  '{"tr": "Villa", "en": "Villa", "de": "Villa", "ru": "Вилла", "bs": "Vila"}'::jsonb,
  5,
  '350 m²',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&fit=crop',
  true,
  'Kestel sahilinde, denize sıfır konumda muhteşem bir villa. Özel plaj erişimi, infinity havuz, geniş bahçe ve tam donanımlı mutfak ile Akdeniz rüyası.',
  ARRAY['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&fit=crop', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fit=crop', 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80&fit=crop'],
  ARRAY['Denize Sıfır', 'Özel Plaj', 'Infinity Havuz', 'Bahçe', 'BBQ Alanı', 'Güvenlik'],
  'Kestel Yapı A.Ş.',
  '2023',
  3
),
(
  '{"tr": "Aile Dairesi", "en": "Family Apartment", "de": "Familienwohnung", "ru": "Семейная квартира", "bs": "Porodični stan"}'::jsonb,
  'aile-dairesi-tosmur',
  '{"tr": "Tosmur, Alanya", "en": "Tosmur, Alanya", "de": "Tosmur, Alanya", "ru": "Тосмур, Аланья", "bs": "Tosmur, Alanya"}'::jsonb,
  '€115.000',
  'apartment',
  '{"tr": "Daire", "en": "Apartment", "de": "Wohnung", "ru": "Квартира", "bs": "Stan"}'::jsonb,
  3,
  '120 m²',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&fit=crop',
  true,
  'Tosmur''un sakin ve huzurlu ortamında aileler için ideal bir daire. Geniş odalar, modern mutfak, balkon ve site içi sosyal alanlar ile konforlu aile yaşamı.',
  ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&fit=crop', 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80&fit=crop'],
  ARRAY['Site İçi Havuz', 'Çocuk Parkı', 'Otopark', 'Güvenlik', 'Jeneratör', 'Balkon'],
  'Tosmur Konutları',
  '2024',
  4
),
(
  '{"tr": "Havuzlu Residence", "en": "Pool Residence", "de": "Residenz mit Pool", "ru": "Резиденция с бассейном", "bs": "Rezidencija s bazenom"}'::jsonb,
  'havuzlu-residence-cikcilli',
  '{"tr": "Cikcilli, Alanya", "en": "Cikcilli, Alanya", "de": "Cikcilli, Alanya", "ru": "Джикджилли, Аланья", "bs": "Cikcilli, Alanya"}'::jsonb,
  '€135.000',
  'apartment',
  '{"tr": "Daire", "en": "Apartment", "de": "Wohnung", "ru": "Квартира", "bs": "Stan"}'::jsonb,
  2,
  '110 m²',
  'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80&fit=crop',
  true,
  'Cikcilli''nin gelişen bölgesinde, yatırım değeri yüksek modern bir residence. Açık ve kapalı havuz, SPA merkezi, fitness salonu ve geniş yeşil alanlar.',
  ARRAY['https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80&fit=crop', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80&fit=crop'],
  ARRAY['Açık Havuz', 'Kapalı Havuz', 'SPA', 'Fitness', 'Sauna', 'Otopark'],
  'Cikcilli Yapı',
  '2025',
  5
),
(
  '{"tr": "Doğa Manzaralı Villa", "en": "Nature View Villa", "de": "Villa mit Naturblick", "ru": "Вилла с видом на природу", "bs": "Vila s pogledom na prirodu"}'::jsonb,
  'doga-manzarali-villa-avsallar',
  '{"tr": "Avsallar, Alanya", "en": "Avsallar, Alanya", "de": "Avsallar, Alanya", "ru": "Авсаллар, Аланья", "bs": "Avsallar, Alanya"}'::jsonb,
  '€380.000',
  'villa',
  '{"tr": "Villa", "en": "Villa", "de": "Villa", "ru": "Вилла", "bs": "Vila"}'::jsonb,
  4,
  '250 m²',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80&fit=crop',
  false,
  'Avsallar''ın eşsiz doğası içinde, Toros Dağları ve Akdeniz manzarasını bir arada sunan villa. Geniş arazi, özel havuz ve doğa ile iç içe huzurlu yaşam.',
  ARRAY['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80&fit=crop', 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80&fit=crop'],
  ARRAY['Özel Havuz', 'Büyük Bahçe', 'Dağ Manzarası', 'Otopark', 'BBQ', 'Depo'],
  'Avsallar İnşaat',
  '2024',
  6
),
(
  '{"tr": "Stüdyo Daire", "en": "Studio Apartment", "de": "Studio-Wohnung", "ru": "Квартира-студия", "bs": "Garsonjera"}'::jsonb,
  'studyo-daire-mahmutlar',
  '{"tr": "Mahmutlar, Alanya", "en": "Mahmutlar, Alanya", "de": "Mahmutlar, Alanya", "ru": "Махмутлар, Аланья", "bs": "Mahmutlar, Alanya"}'::jsonb,
  '€65.000',
  'apartment',
  '{"tr": "Stüdyo", "en": "Studio", "de": "Studio", "ru": "Студия", "bs": "Studio"}'::jsonb,
  1,
  '55 m²',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80&fit=crop',
  false,
  'Mahmutlar''da denize 500 metre mesafede, yatırımlık stüdyo daire. Tam eşyalı, kiracılı teslim. Yüksek kira getirisi potansiyeli.',
  ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80&fit=crop'],
  ARRAY['Eşyalı', 'Havuz', 'Fitness', 'Güvenlik', 'Balkon'],
  'Mahmutlar Residence',
  '2023',
  7
),
(
  '{"tr": "Dubleks Penthouse", "en": "Duplex Penthouse", "de": "Duplex-Penthouse", "ru": "Двухуровневый пентхаус", "bs": "Dupleks penthaus"}'::jsonb,
  'dubleks-penthouse-oba',
  '{"tr": "Oba, Alanya", "en": "Oba, Alanya", "de": "Oba, Alanya", "ru": "Оба, Аланья", "bs": "Oba, Alanya"}'::jsonb,
  '€445.000',
  'penthouse',
  '{"tr": "Penthouse", "en": "Penthouse", "de": "Penthouse", "ru": "Пентхаус", "bs": "Penthaus"}'::jsonb,
  4,
  '280 m²',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&fit=crop',
  false,
  'Oba''da çift katlı, lüks dubleks penthouse. Alt katta yaşam alanları, üst katta yatak odaları ve özel teras. Deniz ve dağ manzarası bir arada.',
  ARRAY['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&fit=crop', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80&fit=crop'],
  ARRAY['Çift Kat', 'Özel Teras', 'Deniz Manzarası', 'Jakuzi', 'Akıllı Ev', 'Garaj'],
  'Oba Lüks Yapı',
  '2025',
  8
),
(
  '{"tr": "Denize Sıfır Daire", "en": "Beachfront Apartment", "de": "Wohnung am Strand", "ru": "Квартира на берегу моря", "bs": "Stan na plaži"}'::jsonb,
  'denize-sifir-daire-kestel',
  '{"tr": "Kestel, Alanya", "en": "Kestel, Alanya", "de": "Kestel, Alanya", "ru": "Кестель, Аланья", "bs": "Kestel, Alanya"}'::jsonb,
  '€175.000',
  'apartment',
  '{"tr": "Daire", "en": "Apartment", "de": "Wohnung", "ru": "Квартира", "bs": "Stan"}'::jsonb,
  2,
  '105 m²',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80&fit=crop',
  false,
  'Kestel sahilinde denize sıfır konumda daire. Balkondan direkt deniz manzarası, özel plaj erişimi ve tam donanımlı residence altyapısı.',
  ARRAY['https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80&fit=crop'],
  ARRAY['Denize Sıfır', 'Özel Plaj', 'Havuz', 'Fitness', 'Sauna', 'Otopark'],
  'Kestel Marina Yapı',
  '2024',
  9
),
(
  '{"tr": "Müstakil Villa", "en": "Detached Villa", "de": "Freistehende Villa", "ru": "Отдельная вилла", "bs": "Samostalna vila"}'::jsonb,
  'mustakil-villa-kargicak',
  '{"tr": "Kargıcak, Alanya", "en": "Kargicak, Alanya", "de": "Kargıcak, Alanya", "ru": "Каргыджак, Аланья", "bs": "Kargıcak, Alanya"}'::jsonb,
  '€520.000',
  'villa',
  '{"tr": "Villa", "en": "Villa", "de": "Villa", "ru": "Вилла", "bs": "Vila"}'::jsonb,
  5,
  '320 m²',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fit=crop',
  false,
  'Kargıcak''ın yüksek kesiminde, 180 derece deniz manzaralı müstakil villa. Geniş arazi üzerine kurulu, özel havuz, garaj ve tam bağımsız yaşam alanı.',
  ARRAY['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fit=crop', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&fit=crop'],
  ARRAY['Müstakil', 'Özel Havuz', '180° Deniz Manzarası', 'Garaj', 'Bahçe', 'Güvenlik'],
  'Kargıcak Villa Park',
  '2023',
  10
),
(
  '{"tr": "Lüks Residence Daire", "en": "Luxury Residence Apartment", "de": "Luxus-Residenz-Wohnung", "ru": "Роскошная резиденция", "bs": "Luksuzni stan u rezidenciji"}'::jsonb,
  'luks-residence-konakli',
  '{"tr": "Konaklı, Alanya", "en": "Konakli, Alanya", "de": "Konaklı, Alanya", "ru": "Конаклы, Аланья", "bs": "Konaklı, Alanya"}'::jsonb,
  '€155.000',
  'apartment',
  '{"tr": "Daire", "en": "Apartment", "de": "Wohnung", "ru": "Квартира", "bs": "Stan"}'::jsonb,
  3,
  '130 m²',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80&fit=crop',
  false,
  'Konaklı''nın merkezi konumunda, alışveriş ve ulaşım olanaklarına yakın lüks residence. Geniş balkon, modern tasarım ve zengin sosyal tesisler.',
  ARRAY['https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80&fit=crop'],
  ARRAY['Havuz', 'Fitness', 'Sauna', 'Türk Hamamı', 'Otopark', 'Güvenlik'],
  'Konaklı Yapı',
  '2024',
  11
),
(
  '{"tr": "Bahçeli Villa", "en": "Garden Villa", "de": "Villa mit Garten", "ru": "Вилла с садом", "bs": "Vila s vrtom"}'::jsonb,
  'bahceli-villa-tosmur',
  '{"tr": "Tosmur, Alanya", "en": "Tosmur, Alanya", "de": "Tosmur, Alanya", "ru": "Тосмур, Аланья", "bs": "Tosmur, Alanya"}'::jsonb,
  '€290.000',
  'villa',
  '{"tr": "Villa", "en": "Villa", "de": "Villa", "ru": "Вилла", "bs": "Vila"}'::jsonb,
  3,
  '200 m²',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80&fit=crop',
  false,
  'Tosmur''da geniş bahçeli, aileler için ideal villa. Meyve ağaçlı bahçe, özel havuz ve sakin bir çevrede huzurlu yaşam fırsatı.',
  ARRAY['https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80&fit=crop'],
  ARRAY['Özel Havuz', 'Geniş Bahçe', 'Otopark', 'BBQ', 'Depo', 'Teras'],
  'Tosmur Evleri',
  '2024',
  12
),
(
  '{"tr": "Smart Home Daire", "en": "Smart Home Apartment", "de": "Smart-Home-Wohnung", "ru": "Умная квартира", "bs": "Pametni stan"}'::jsonb,
  'smart-home-daire-mahmutlar',
  '{"tr": "Mahmutlar, Alanya", "en": "Mahmutlar, Alanya", "de": "Mahmutlar, Alanya", "ru": "Махмутлар, Аланья", "bs": "Mahmutlar, Alanya"}'::jsonb,
  '€98.000',
  'apartment',
  '{"tr": "Daire", "en": "Apartment", "de": "Wohnung", "ru": "Квартира", "bs": "Stan"}'::jsonb,
  2,
  '85 m²',
  'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80&fit=crop',
  false,
  'Mahmutlar''da son teknoloji akıllı ev sistemli daire. Aydınlatma, klima ve güvenlik uzaktan kontrol edilebilir. Modern yaşamın tüm konforu.',
  ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80&fit=crop'],
  ARRAY['Akıllı Ev', 'Havuz', 'Fitness', 'Otopark', 'Güvenlik', 'Wi-Fi'],
  'Smart Living',
  '2025',
  13
),
(
  '{"tr": "Panoramik Penthouse", "en": "Panoramic Penthouse", "de": "Panorama-Penthouse", "ru": "Панорамный пентхаус", "bs": "Panoramski penthaus"}'::jsonb,
  'panoramik-penthouse-cikcilli',
  '{"tr": "Cikcilli, Alanya", "en": "Cikcilli, Alanya", "de": "Cikcilli, Alanya", "ru": "Джикджилли, Аланья", "bs": "Cikcilli, Alanya"}'::jsonb,
  '€275.000',
  'penthouse',
  '{"tr": "Penthouse", "en": "Penthouse", "de": "Penthouse", "ru": "Пентхаус", "bs": "Penthaus"}'::jsonb,
  3,
  '185 m²',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80&fit=crop',
  false,
  'Cikcilli''de panoramik Akdeniz manzarasına sahip geniş penthouse. Büyük teras, açık plan mutfak-salon ve premium iç mekan.',
  ARRAY['https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80&fit=crop'],
  ARRAY['Panoramik Manzara', 'Geniş Teras', 'Açık Mutfak', 'Havuz', 'Fitness', 'Otopark'],
  'Cikcilli Premium',
  '2024',
  14
),
(
  '{"tr": "Tatil Villası", "en": "Holiday Villa", "de": "Ferienvilla", "ru": "Вилла для отдыха", "bs": "Vila za odmor"}'::jsonb,
  'tatil-villasi-avsallar',
  '{"tr": "Avsallar, Alanya", "en": "Avsallar, Alanya", "de": "Avsallar, Alanya", "ru": "Авсаллар, Аланья", "bs": "Avsallar, Alanya"}'::jsonb,
  '€340.000',
  'villa',
  '{"tr": "Villa", "en": "Villa", "de": "Villa", "ru": "Вилла", "bs": "Vila"}'::jsonb,
  3,
  '220 m²',
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80&fit=crop',
  false,
  'Avsallar''da tatil ve yatırım amaçlı mükemmel villa. Kiralama potansiyeli yüksek, denize yakın konum ve tam donanımlı yaşam alanı.',
  ARRAY['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80&fit=crop'],
  ARRAY['Özel Havuz', 'Bahçe', 'BBQ', 'Klima', 'Eşyalı', 'Otopark'],
  'Avsallar Holiday Homes',
  '2024',
  15
),
(
  '{"tr": "Yatırımlık Daire", "en": "Investment Apartment", "de": "Investment-Wohnung", "ru": "Инвестиционная квартира", "bs": "Investicioni stan"}'::jsonb,
  'yatirimlik-daire-mahmutlar',
  '{"tr": "Mahmutlar, Alanya", "en": "Mahmutlar, Alanya", "de": "Mahmutlar, Alanya", "ru": "Махмутлар, Аланья", "bs": "Mahmutlar, Alanya"}'::jsonb,
  '€72.000',
  'apartment',
  '{"tr": "Daire", "en": "Apartment", "de": "Wohnung", "ru": "Квартира", "bs": "Stan"}'::jsonb,
  1,
  '65 m²',
  'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80&fit=crop',
  false,
  'Mahmutlar''da uygun fiyatlı yatırımlık daire. Denize yakın konum, kira garantisi programı ve değer artış potansiyeli ile ideal yatırım fırsatı.',
  ARRAY['https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80&fit=crop'],
  ARRAY['Havuz', 'Güvenlik', 'Otopark', 'Balkon', 'Asansör'],
  'Mahmutlar Evleri',
  '2023',
  16
),
(
  '{"tr": "Teras Daire", "en": "Terrace Apartment", "de": "Terrassenwohnung", "ru": "Квартира с террасой", "bs": "Stan s terasom"}'::jsonb,
  'teras-daire-oba',
  '{"tr": "Oba, Alanya", "en": "Oba, Alanya", "de": "Oba, Alanya", "ru": "Оба, Аланья", "bs": "Oba, Alanya"}'::jsonb,
  '€145.000',
  'apartment',
  '{"tr": "Daire", "en": "Apartment", "de": "Wohnung", "ru": "Квартира", "bs": "Stan"}'::jsonb,
  2,
  '115 m²',
  'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80&fit=crop',
  false,
  'Oba''da geniş teraslı modern daire. Şehir merkezine yürüme mesafesinde, tüm altyapı olanaklarına yakın konumda.',
  ARRAY['https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80&fit=crop'],
  ARRAY['Geniş Teras', 'Havuz', 'Merkezi Konum', 'Otopark', 'Asansör', 'Güvenlik'],
  'Oba Konut',
  '2025',
  17
),
(
  '{"tr": "Lüks Müstakil Villa", "en": "Luxury Detached Villa", "de": "Luxus-Einzelvilla", "ru": "Роскошная отдельная вилла", "bs": "Luksuzna samostalna vila"}'::jsonb,
  'luks-mustakil-villa-kargicak',
  '{"tr": "Kargıcak, Alanya", "en": "Kargicak, Alanya", "de": "Kargıcak, Alanya", "ru": "Каргыджак, Аланья", "bs": "Kargıcak, Alanya"}'::jsonb,
  '€780.000',
  'villa',
  '{"tr": "Villa", "en": "Villa", "de": "Villa", "ru": "Вилла", "bs": "Vila"}'::jsonb,
  6,
  '420 m²',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&fit=crop',
  false,
  'Kargıcak''ta eşsiz deniz manzarasına sahip ultra lüks villa. Infinity havuz, özel sinema odası, şarap mahzeni ve tam akıllı ev sistemi.',
  ARRAY['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&fit=crop', 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80&fit=crop'],
  ARRAY['Infinity Havuz', 'Sinema Odası', 'Şarap Mahzeni', 'Akıllı Ev', 'Asansör', 'Helipad'],
  'Kargıcak Premium',
  '2024',
  18
),
(
  '{"tr": "Rezidans Daire", "en": "Residence Apartment", "de": "Residenz-Wohnung", "ru": "Квартира в резиденции", "bs": "Stan u rezidenciji"}'::jsonb,
  'rezidans-daire-konakli',
  '{"tr": "Konaklı, Alanya", "en": "Konakli, Alanya", "de": "Konaklı, Alanya", "ru": "Конаклы, Аланья", "bs": "Konaklı, Alanya"}'::jsonb,
  '€108.000',
  'apartment',
  '{"tr": "Daire", "en": "Apartment", "de": "Wohnung", "ru": "Квартира", "bs": "Stan"}'::jsonb,
  2,
  '90 m²',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80&fit=crop',
  false,
  'Konaklı''da uygun fiyatlı, modern rezidans daire. Denize 400 metre, market ve restoranlara yürüme mesafesinde.',
  ARRAY['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80&fit=crop'],
  ARRAY['Havuz', 'Fitness', 'Otopark', 'Güvenlik', 'Çocuk Parkı', 'Balkon'],
  'Konaklı Residence',
  '2025',
  19
);


-- ============================================================================
-- 2. AREAS (8 Alanya bölgesi)
-- ============================================================================

INSERT INTO areas (key, slug, name, description, description_long, avg_price, roi, image, highlights, featured, sort_order) VALUES
(
  'mahmutlar',
  'mahmutlar',
  '{"tr": "Mahmutlar", "en": "Mahmutlar", "de": "Mahmutlar", "ru": "Махмутлар", "bs": "Mahmutlar"}'::jsonb,
  '{"tr": "Alanya''nın en popüler yatırım bölgesi. Uygun fiyatlar ve yüksek kira getirisi.", "en": "Alanya''s most popular investment area. Affordable prices and high rental yields.", "de": "Alanyas beliebtestes Investitionsgebiet. Erschwingliche Preise und hohe Mietrenditen.", "ru": "Самый популярный инвестиционный район Аланьи. Доступные цены и высокая арендная доходность.", "bs": "Najpopularnija investiciona zona Alanje. Pristupačne cijene i visoki prinosi od najma."}'::jsonb,
  '{"tr": "Mahmutlar, Alanya''nın doğusunda yer alan en büyük ve en hızlı gelişen bölgelerden biridir. Denize yakın konumu, uygun fiyatları ve zengin altyapısıyla özellikle yabancı yatırımcıların ilgisini çekmektedir. Bölgede çok sayıda market, restoran, banka ve sağlık tesisi bulunmaktadır. Kış aylarında bile ılıman iklimi sayesinde yıl boyu yaşanabilir bir bölgedir.", "en": "Mahmutlar is one of the largest and fastest-growing districts east of Alanya. Its proximity to the sea, affordable prices, and rich infrastructure particularly attract foreign investors. The area has numerous supermarkets, restaurants, banks, and healthcare facilities. Thanks to its mild climate even in winter, it is a year-round livable area.", "de": "Mahmutlar ist einer der größten und am schnellsten wachsenden Stadtteile östlich von Alanya. Die Nähe zum Meer, erschwingliche Preise und eine reiche Infrastruktur ziehen besonders ausländische Investoren an.", "ru": "Махмутлар — один из крупнейших и наиболее быстро развивающихся районов к востоку от Аланьи. Близость к морю, доступные цены и развитая инфраструктура привлекают иностранных инвесторов.", "bs": "Mahmutlar je jedna od najvećih i najbrže rastućih četvrti istočno od Alanje. Blizina moru, pristupačne cijene i bogata infrastruktura posebno privlače strane investitore."}'::jsonb,
  '€65.000 - €180.000',
  '%8-12',
  'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80&fit=crop',
  ARRAY['Denize 300m mesafe', 'Zengin altyapı', 'Yabancı yatırımcı dostu', 'Uygun fiyat/performans', 'Yıl boyu yaşanabilir', 'Yüksek kira getirisi'],
  true,
  0
),
(
  'oba',
  'oba',
  '{"tr": "Oba", "en": "Oba", "de": "Oba", "ru": "Оба", "bs": "Oba"}'::jsonb,
  '{"tr": "Alanya''nın modern şehir merkezi. Premium projeler ve lüks yaşam.", "en": "Alanya''s modern city center. Premium projects and luxury living.", "de": "Alanyas modernes Stadtzentrum. Premium-Projekte und luxuriöses Wohnen.", "ru": "Современный центр Аланьи. Премиальные проекты и роскошная жизнь.", "bs": "Moderni centar Alanje. Premium projekti i luksuzan život."}'::jsonb,
  '{"tr": "Oba, Alanya''nın en merkezi ve prestijli bölgesidir. Modern alışveriş merkezleri, hastaneler, okullar ve restoranlarla çevrili olan Oba, şehir yaşamının tüm konforunu sunar. Bölgede inşa edilen yeni nesil projeler, akıllı ev teknolojileri ve premium tasarımlarıyla dikkat çekmektedir.", "en": "Oba is Alanya''s most central and prestigious district. Surrounded by modern shopping centers, hospitals, schools, and restaurants, Oba offers all the comforts of city living. New generation projects in the area stand out with smart home technologies and premium designs.", "de": "Oba ist der zentralste und prestigeträchtigste Stadtteil von Alanya. Umgeben von modernen Einkaufszentren, Krankenhäusern, Schulen und Restaurants bietet Oba allen Komfort des Stadtlebens.", "ru": "Оба — самый центральный и престижный район Аланьи. Окружённый современными торговыми центрами, больницами, школами и ресторанами, Оба предлагает все удобства городской жизни.", "bs": "Oba je najcentralnija i najprestižnija četvrt Alanje. Okružena modernim trgovačkim centrima, bolnicama, školama i restoranima."}'::jsonb,
  '€120.000 - €450.000',
  '%6-10',
  'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80&fit=crop',
  ARRAY['Şehir merkezi konumu', 'Premium projeler', 'Hastane ve okul yakınlığı', 'Alışveriş merkezleri', 'Restoran ve kafeler', 'Modern altyapı'],
  true,
  1
),
(
  'kestel',
  'kestel',
  '{"tr": "Kestel", "en": "Kestel", "de": "Kestel", "ru": "Кестель", "bs": "Kestel"}'::jsonb,
  '{"tr": "Denize sıfır konumu ve doğal güzelliğiyle öne çıkan sahil bölgesi.", "en": "Coastal district known for its beachfront location and natural beauty.", "de": "Küstengebiet bekannt für seine Strandlage und natürliche Schönheit.", "ru": "Прибрежный район, известный своим расположением на берегу моря и природной красотой.", "bs": "Obalna četvrt poznata po plaži i prirodnim ljepotama."}'::jsonb,
  '{"tr": "Kestel, Alanya merkezinin batısında yer alan sakin ve huzurlu bir sahil bölgesidir. Meşhur Kleopatra Plajı''na yakın konumu, temiz havası ve doğal güzellikleriyle bilinir. Bölge, hem yazlık hem de kalıcı konut arayanlar için ideal seçenekler sunmaktadır.", "en": "Kestel is a quiet and peaceful coastal district west of Alanya center. Known for its proximity to the famous Cleopatra Beach, clean air, and natural beauty. The area offers ideal options for both holiday and permanent residences.", "de": "Kestel ist ein ruhiger Küstenbezirk westlich des Zentrums von Alanya, bekannt für seine Nähe zum berühmten Kleopatra-Strand.", "ru": "Кестель — тихий прибрежный район к западу от центра Аланьи, известный близостью к знаменитому пляжу Клеопатры.", "bs": "Kestel je mirna obalna četvrt zapadno od centra Alanje, poznata po blizini čuvene plaže Kleopatra."}'::jsonb,
  '€100.000 - €650.000',
  '%7-11',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80&fit=crop',
  ARRAY['Denize sıfır projeler', 'Kleopatra Plajı yakınlığı', 'Doğal güzellik', 'Sakin ortam', 'Yüzme ve su sporları', 'Kalıcı konut seçenekleri'],
  true,
  2
),
(
  'kargicak',
  'kargicak',
  '{"tr": "Kargıcak", "en": "Kargicak", "de": "Kargıcak", "ru": "Каргыджак", "bs": "Kargıcak"}'::jsonb,
  '{"tr": "Lüks villaların adresi. Eşsiz deniz manzarası ve sakin yaşam.", "en": "Home of luxury villas. Unique sea views and peaceful living.", "de": "Heimat der Luxusvillen. Einzigartiger Meerblick und ruhiges Leben.", "ru": "Дом роскошных вилл. Уникальный вид на море и спокойная жизнь.", "bs": "Dom luksuznih vila. Jedinstveni pogled na more i miran život."}'::jsonb,
  '{"tr": "Kargıcak, Alanya''nın doğusunda yer alan, özellikle lüks villa projeleriyle tanınan prestijli bir bölgedir. Yüksek rakımlı konumu sayesinde eşsiz deniz ve doğa manzaraları sunar. Sakin yapısı ve özel yaşam alanlarıyla üst gelir grubunun tercihi haline gelmiştir.", "en": "Kargicak is a prestigious district east of Alanya, known for luxury villa projects. Its elevated position offers unique sea and nature views. With its peaceful atmosphere and private living spaces, it has become the choice of high-income groups.", "de": "Kargıcak ist ein prestigeträchtiger Stadtteil östlich von Alanya, bekannt für Luxus-Villaprojekte.", "ru": "Каргыджак — престижный район к востоку от Аланьи, известный проектами роскошных вилл.", "bs": "Kargıcak je prestižna četvrt istočno od Alanje, poznata po projektima luksuznih vila."}'::jsonb,
  '€350.000 - €800.000',
  '%5-9',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fit=crop',
  ARRAY['Lüks villa projeleri', 'Eşsiz deniz manzarası', 'Özel yaşam alanları', 'Doğa ile iç içe', 'Yüksek yatırım değeri', 'Premium konfor'],
  true,
  3
),
(
  'tosmur',
  'tosmur',
  '{"tr": "Tosmur", "en": "Tosmur", "de": "Tosmur", "ru": "Тосмур", "bs": "Tosmur"}'::jsonb,
  '{"tr": "Aileler için ideal, sakin ve huzurlu bir yaşam bölgesi.", "en": "Ideal for families, a quiet and peaceful residential area.", "de": "Ideal für Familien, ein ruhiges und friedliches Wohngebiet.", "ru": "Идеально для семей, тихий и спокойный жилой район.", "bs": "Idealna za porodice, mirna i spokojna stambena zona."}'::jsonb,
  '{"tr": "Tosmur, Alanya merkezine yakın konumuyla hem şehir hayatına yakın hem de sakin bir yaşam sunan ideal bir bölgedir. Dim Çayı''na yakınlığı, yeşil alanları ve aile dostu atmosferiyle özellikle aileler tarafından tercih edilmektedir.", "en": "Tosmur is an ideal district that offers both proximity to city life and quiet living, close to Alanya center. Its proximity to Dim River, green areas, and family-friendly atmosphere make it especially popular with families.", "de": "Tosmur ist ein idealer Stadtteil nahe dem Zentrum von Alanya, der sowohl Stadtnähe als auch ruhiges Wohnen bietet.", "ru": "Тосмур — идеальный район рядом с центром Аланьи, предлагающий как близость к городской жизни, так и тихое проживание.", "bs": "Tosmur je idealna četvrt blizu centra Alanje koja nudi blizinu gradskom životu i mirno stanovanje."}'::jsonb,
  '€90.000 - €300.000',
  '%7-10',
  'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80&fit=crop',
  ARRAY['Aile dostu ortam', 'Dim Çayı yakınlığı', 'Yeşil alanlar', 'Merkeze yakın', 'Uygun fiyatlar', 'Sakin çevre'],
  false,
  4
),
(
  'cikcilli',
  'cikcilli',
  '{"tr": "Cikcilli", "en": "Cikcilli", "de": "Cikcilli", "ru": "Джикджилли", "bs": "Cikcilli"}'::jsonb,
  '{"tr": "Hızla gelişen, yatırım potansiyeli yüksek modern bölge.", "en": "Rapidly developing area with high investment potential.", "de": "Schnell wachsendes Gebiet mit hohem Investitionspotenzial.", "ru": "Быстро развивающийся район с высоким инвестиционным потенциалом.", "bs": "Brzorastuća zona s visokim investicionim potencijalom."}'::jsonb,
  '{"tr": "Cikcilli, son yıllarda hızla gelişen ve yeni nesil residence projelerine ev sahipliği yapan modern bir bölgedir. Oba ile Tosmur arasındaki stratejik konumu, altyapı yatırımları ve cazip fiyatlarıyla yatırımcıların radarına girmiştir.", "en": "Cikcilli is a modern district that has been rapidly developing and hosting new-generation residence projects in recent years. Its strategic location between Oba and Tosmur, infrastructure investments, and attractive prices have put it on investors'' radar.", "de": "Cikcilli ist ein moderner Stadtteil, der sich in den letzten Jahren rasant entwickelt hat und neue Residenzprojekte beherbergt.", "ru": "Джикджилли — современный район, быстро развивающийся и принимающий жилые проекты нового поколения.", "bs": "Cikcilli je moderna četvrt koja se brzo razvija i ugošćuje rezidencijalne projekte nove generacije."}'::jsonb,
  '€80.000 - €280.000',
  '%9-14',
  'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=80&fit=crop',
  ARRAY['Hızlı değer artışı', 'Yeni nesil projeler', 'Stratejik konum', 'Uygun giriş fiyatları', 'Modern altyapı', 'Yüksek ROI potansiyeli'],
  false,
  5
),
(
  'avsallar',
  'avsallar',
  '{"tr": "Avsallar", "en": "Avsallar", "de": "Avsallar", "ru": "Авсаллар", "bs": "Avsallar"}'::jsonb,
  '{"tr": "Doğa, deniz ve huzurun buluştuğu tatil cenneti.", "en": "Holiday paradise where nature, sea, and peace come together.", "de": "Urlaubsparadies, wo Natur, Meer und Ruhe aufeinandertreffen.", "ru": "Райский уголок, где встречаются природа, море и покой.", "bs": "Raj za odmor gdje se susreću priroda, more i mir."}'::jsonb,
  '{"tr": "Avsallar, Alanya''nın batısında yer alan, İncekum Plajı ile ünlü doğal bir tatil bölgesidir. Toros Dağları''nın eteklerinde uzanan bölge, muhteşem doğası ve sakin atmosferiyle tatilcilerin ve emeklilerin gözdesidir. Kira getirisi yüksek villa ve daireleriyle yatırım açısından da cazip bir seçenektir.", "en": "Avsallar is a natural holiday district west of Alanya, famous for Incekum Beach. Located at the foothills of the Taurus Mountains, the area is popular with holidaymakers and retirees for its stunning nature and peaceful atmosphere.", "de": "Avsallar ist ein natürlicher Ferienort westlich von Alanya, berühmt für den Incekum-Strand.", "ru": "Авсаллар — природный курортный район к западу от Аланьи, известный пляжем Инджекум.", "bs": "Avsallar je prirodna turistička zona zapadno od Alanje, poznata po plaži Incekum."}'::jsonb,
  '€70.000 - €350.000',
  '%8-12',
  'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&q=80&fit=crop',
  ARRAY['İncekum Plajı', 'Doğal güzellik', 'Toros Dağları manzarası', 'Tatil ve emeklilik', 'Yüksek kira getirisi', 'Uygun fiyatlar'],
  false,
  6
),
(
  'konakli',
  'konakli',
  '{"tr": "Konaklı", "en": "Konakli", "de": "Konaklı", "ru": "Конаклы", "bs": "Konaklı"}'::jsonb,
  '{"tr": "Tarihi doku ve modern yaşamın harmonisi.", "en": "Harmony of historical texture and modern living.", "de": "Harmonie von historischem Charakter und modernem Leben.", "ru": "Гармония исторической текстуры и современной жизни.", "bs": "Harmonija historijskog tkiva i modernog života."}'::jsonb,
  '{"tr": "Konaklı, Alanya''nın batısında yer alan tarihi ve kültürel zenginliğe sahip bir bölgedir. Antik kalıntılar, yerel pazar ve geleneksel Türk atmosferi ile turistlerin ilgisini çekerken, yeni yapılan modern projeleriyle de yatırımcılara cazip fırsatlar sunmaktadır.", "en": "Konakli is a district west of Alanya with rich historical and cultural heritage. While attracting tourists with ancient ruins, local markets, and traditional Turkish atmosphere, it also offers attractive opportunities for investors with new modern projects.", "de": "Konaklı ist ein Stadtteil westlich von Alanya mit reichem historischen und kulturellen Erbe.", "ru": "Конаклы — район к западу от Аланьи с богатым историческим и культурным наследием.", "bs": "Konaklı je četvrt zapadno od Alanje s bogatim historijskim i kulturnim naslijeđem."}'::jsonb,
  '€75.000 - €200.000',
  '%7-11',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80&fit=crop',
  ARRAY['Tarihi kalıntılar', 'Yerel pazar', 'Geleneksel atmosfer', 'Uygun fiyatlar', 'Turizm potansiyeli', 'Modern projeler'],
  false,
  7
);


-- ============================================================================
-- 3. BLOG POSTS (6 makale)
-- ============================================================================

INSERT INTO blog_posts (slug, title, excerpt, content, date, published_at, category, category_color, image, published, sort_order) VALUES
(
  'alanyada-gayrimenkul-yatiriminin-5-avantaji',
  '{"tr": "Alanya''da Gayrimenkul Yatırımının 5 Avantajı", "en": "5 Advantages of Real Estate Investment in Alanya", "de": "5 Vorteile der Immobilieninvestition in Alanya", "ru": "5 преимуществ инвестиций в недвижимость Аланьи", "bs": "5 prednosti ulaganja u nekretnine u Alanji"}'::jsonb,
  '{"tr": "Alanya, Türkiye''nin en cazip gayrimenkul yatırım destinasyonlarından biri olmaya devam ediyor. İşte yatırım yapmanız için 5 güçlü neden.", "en": "Alanya continues to be one of Turkey''s most attractive real estate investment destinations. Here are 5 strong reasons to invest.", "de": "Alanya ist weiterhin eine der attraktivsten Immobilien-Investitionsdestinationen der Türkei.", "ru": "Аланья продолжает оставаться одним из самых привлекательных направлений для инвестиций в недвижимость Турции.", "bs": "Alanja nastavlja biti jedna od najatraktivnijih investicionih destinacija u Turskoj."}'::jsonb,
  '{"tr": "<h2>1. Uygun Fiyatlar ve Yüksek Değer Artışı</h2><p>Alanya, Akdeniz kıyısındaki diğer tatil beldelerine kıyasla çok daha uygun fiyatlarla gayrimenkul satın alma imkanı sunmaktadır. Son 5 yılda gayrimenkul değerleri ortalama %40-60 oranında artış göstermiştir.</p><h2>2. Yıl Boyu Yaşanabilir İklim</h2><p>300 günden fazla güneşli gün, ılıman kışlar ve sıcak yazlarla Alanya yıl boyunca yaşanabilir bir destinasyondur.</p><h2>3. Gelişen Altyapı</h2><p>Yeni hastaneler, alışveriş merkezleri, uluslararası okullar ve modern ulaşım altyapısı ile şehir hızla modernleşmektedir.</p><h2>4. Yüksek Kira Getirisi</h2><p>Turizm sezonunda kısa dönem kiralama ve yıl boyu uzun dönem kiralama ile yüksek getiri elde edebilirsiniz.</p><h2>5. Vatandaşlık İmkanı</h2><p>400.000 USD ve üzeri gayrimenkul alımıyla Türk vatandaşlığı edinme hakkı kazanabilirsiniz.</p>", "en": "<h2>1. Affordable Prices and High Appreciation</h2><p>Alanya offers much more affordable property prices compared to other Mediterranean coastal resorts.</p><h2>2. Year-Round Livable Climate</h2><p>With over 300 sunny days, mild winters and warm summers, Alanya is a year-round destination.</p><h2>3. Developing Infrastructure</h2><p>New hospitals, shopping malls, international schools and modern transport infrastructure.</p><h2>4. High Rental Yields</h2><p>Short-term tourism rentals and year-round long-term leasing provide excellent returns.</p><h2>5. Citizenship Opportunity</h2><p>Property purchases of $400,000+ qualify for Turkish citizenship.</p>"}'::jsonb,
  '2025-01-15',
  '2025-01-15T10:00:00Z',
  '{"tr": "Yatırım", "en": "Investment", "de": "Investment", "ru": "Инвестиции", "bs": "Investicije"}'::jsonb,
  'bg-blue-100 text-blue-800',
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80&fit=crop',
  true,
  0
),
(
  '2025te-alanya-emlak-piyasasi-trendleri',
  '{"tr": "2025''te Alanya Emlak Piyasası Trendleri", "en": "Alanya Real Estate Market Trends in 2025", "de": "Immobilienmarkttrends in Alanya 2025", "ru": "Тенденции рынка недвижимости Аланьи в 2025 году", "bs": "Trendovi tržišta nekretnina u Alanji 2025"}'::jsonb,
  '{"tr": "Alanya emlak piyasası 2025 yılında da büyümeye devam ediyor. En güncel trend ve verileri sizler için derledik.", "en": "Alanya''s real estate market continues to grow in 2025. We compiled the latest trends and data for you.", "de": "Alanyas Immobilienmarkt wächst auch 2025 weiter.", "ru": "Рынок недвижимости Аланьи продолжает расти в 2025 году.", "bs": "Tržište nekretnina u Alanji nastavlja rasti u 2025. godini."}'::jsonb,
  '{"tr": "<h2>Piyasa Genel Bakış</h2><p>2025 yılının ilk çeyreğinde Alanya gayrimenkul piyasası %15 oranında büyüme göstermiştir. Özellikle yabancı yatırımcılardan gelen talep artışı dikkat çekmektedir.</p><h2>En Çok Talep Gören Bölgeler</h2><p>Mahmutlar, Oba ve Kestel en çok talep gören bölgeler olmaya devam etmektedir. Cikcilli ise hızlı gelişimiyle yeni favori haline gelmiştir.</p><h2>Fiyat Trendleri</h2><p>Ortalama metrekare fiyatları bir önceki yıla göre %18 artış göstermiştir. Villa segmentinde bu artış %25''e kadar çıkmaktadır.</p><h2>Geleceğe Bakış</h2><p>Altyapı yatırımları, turizm potansiyeli ve vatandaşlık programı göz önüne alındığında, 2025''in ikinci yarısında da büyümenin devam etmesi beklenmektedir.</p>", "en": "<h2>Market Overview</h2><p>In the first quarter of 2025, Alanya''s real estate market grew by 15%.</p>"}'::jsonb,
  '2025-02-01',
  '2025-02-01T10:00:00Z',
  '{"tr": "Piyasa Analizi", "en": "Market Analysis", "de": "Marktanalyse", "ru": "Анализ рынка", "bs": "Analiza tržišta"}'::jsonb,
  'bg-emerald-100 text-emerald-800',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&fit=crop',
  true,
  1
),
(
  'yabancilar-icin-alanyada-mulk-satin-alma-rehberi',
  '{"tr": "Yabancılar İçin Alanya''da Mülk Satın Alma Rehberi", "en": "Guide to Buying Property in Alanya for Foreigners", "de": "Leitfaden zum Immobilienkauf in Alanya für Ausländer", "ru": "Руководство по покупке недвижимости в Аланье для иностранцев", "bs": "Vodič za kupovinu nekretnina u Alanji za strance"}'::jsonb,
  '{"tr": "Yabancı uyruklu alıcılar için Alanya''da mülk satın alma sürecinin A''dan Z''ye rehberi.", "en": "A comprehensive guide to buying property in Alanya for foreign buyers.", "de": "Ein umfassender Leitfaden zum Immobilienkauf in Alanya für ausländische Käufer.", "ru": "Полное руководство по покупке недвижимости в Аланье для иностранных покупателей.", "bs": "Sveobuhvatni vodič za kupovinu nekretnina u Alanji za strane kupce."}'::jsonb,
  '{"tr": "<h2>Yasal Süreç</h2><p>Türkiye''de yabancılar tapu alabilir. Askeri bölgeler dışında herhangi bir kısıtlama bulunmamaktadır. Süreç ortalama 3-5 iş günü sürmektedir.</p><h2>Gerekli Belgeler</h2><p>Pasaport, vergi numarası, banka hesabı ve zorunlu deprem sigortası (DASK) yeterlidir.</p><h2>Ödeme Yöntemleri</h2><p>Banka havalesi, taksitli ödeme planları ve bazı projelerde sıfır faizli seçenekler mevcuttur.</p><h2>Tapu İşlemleri</h2><p>Tapu Müdürlüğü''nde resmi devir işlemi gerçekleştirilir. Tüm masraflar şeffaf şekilde bildirilir.</p>", "en": "<h2>Legal Process</h2><p>Foreigners can purchase property in Turkey with no restrictions except in military zones.</p>"}'::jsonb,
  '2025-01-20',
  '2025-01-20T10:00:00Z',
  '{"tr": "Rehber", "en": "Guide", "de": "Ratgeber", "ru": "Руководство", "bs": "Vodič"}'::jsonb,
  'bg-violet-100 text-violet-800',
  'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=800&q=80&fit=crop',
  true,
  2
),
(
  'alanyanin-en-iyi-yatirim-bolgeleri',
  '{"tr": "Alanya''nın En İyi Yatırım Bölgeleri", "en": "Best Investment Areas in Alanya", "de": "Beste Investitionsgebiete in Alanya", "ru": "Лучшие инвестиционные районы Аланьи", "bs": "Najbolje investicione zone u Alanji"}'::jsonb,
  '{"tr": "Alanya''da hangi bölgeye yatırım yapmalısınız? Her bölgenin avantaj ve potansiyelini karşılaştırdık.", "en": "Which area should you invest in Alanya? We compared the advantages and potential of each district.", "de": "In welches Gebiet sollten Sie in Alanya investieren?", "ru": "В какой район Аланьи стоит инвестировать?", "bs": "U koju zonu u Alanji treba investirati?"}'::jsonb,
  '{"tr": "<h2>Mahmutlar - En İyi Fiyat/Performans</h2><p>Uygun giriş fiyatları ve yüksek kira getirisi ile Mahmutlar, özellikle ilk kez yatırım yapanlar için idealdir.</p><h2>Oba - Premium Segment</h2><p>Şehir merkezinde lüks yaşam arayanlar için Oba, en prestijli adres olmaya devam etmektedir.</p><h2>Cikcilli - Yükselen Yıldız</h2><p>Hızlı gelişimi ve cazip fiyatlarıyla Cikcilli, en yüksek değer artışı potansiyeline sahip bölgedir.</p><h2>Kargıcak - Villa Yatırımı</h2><p>Lüks villa segmentinde yatırım yapmak isteyenler için Kargıcak eşsiz fırsatlar sunmaktadır.</p>", "en": "<h2>Mahmutlar - Best Value</h2><p>Affordable entry prices and high rental yields make Mahmutlar ideal for first-time investors.</p>"}'::jsonb,
  '2025-02-10',
  '2025-02-10T10:00:00Z',
  '{"tr": "Yatırım", "en": "Investment", "de": "Investment", "ru": "Инвестиции", "bs": "Investicije"}'::jsonb,
  'bg-blue-100 text-blue-800',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&fit=crop',
  true,
  3
),
(
  'turkiyede-gayrimenkul-ile-vatandaslik',
  '{"tr": "Türkiye''de Gayrimenkul ile Vatandaşlık", "en": "Turkish Citizenship Through Real Estate", "de": "Türkische Staatsbürgerschaft durch Immobilien", "ru": "Гражданство Турции через недвижимость", "bs": "Tursko državljanstvo kroz nekretnine"}'::jsonb,
  '{"tr": "400.000 USD ve üzeri gayrimenkul alımıyla Türk vatandaşlığı edinme sürecinin tüm detayları.", "en": "All details of obtaining Turkish citizenship through property purchases of $400,000+.", "de": "Alle Details zur Erlangung der türkischen Staatsbürgerschaft durch Immobilienkauf ab 400.000 USD.", "ru": "Все подробности получения турецкого гражданства через покупку недвижимости от 400 000 долларов.", "bs": "Svi detalji o sticanju turskog državljanstva kupovinom nekretnina od 400.000 USD."}'::jsonb,
  '{"tr": "<h2>Program Hakkında</h2><p>Türkiye, 2018 yılından itibaren gayrimenkul yatırımcılarına vatandaşlık imkanı sunmaktadır. Minimum 400.000 USD değerinde gayrimenkul alımı ile başvuru yapılabilir.</p><h2>Şartlar</h2><p>Mülk en az 3 yıl satılamaz, resmi değerleme raporu gereklidir ve tapu tescili yapılmalıdır.</p><h2>Süreç</h2><p>Mülk seçimi, satın alma, tapu tescili, belge hazırlığı ve başvuru aşamalarından oluşur. Ortalama 3-6 ay içinde sonuçlanır.</p><h2>Avantajlar</h2><p>Tam vatandaşlık hakkı, aile dahil başvuru, vizesiz seyahat imkanı ve iş kurma özgürlüğü.</p>", "en": "<h2>About the Program</h2><p>Turkey has been offering citizenship to real estate investors since 2018.</p>"}'::jsonb,
  '2025-01-25',
  '2025-01-25T10:00:00Z',
  '{"tr": "Vatandaşlık", "en": "Citizenship", "de": "Staatsbürgerschaft", "ru": "Гражданство", "bs": "Državljanstvo"}'::jsonb,
  'bg-amber-100 text-amber-800',
  'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800&q=80&fit=crop',
  true,
  4
),
(
  'alanyada-kiralik-mulk-yatirimi',
  '{"tr": "Alanya''da Kiralık Mülk Yatırımı", "en": "Rental Property Investment in Alanya", "de": "Mietimmobilien-Investment in Alanya", "ru": "Инвестиции в арендную недвижимость в Аланье", "bs": "Investicije u iznajmljivanje nekretnina u Alanji"}'::jsonb,
  '{"tr": "Alanya''da kiralık mülk yatırımı yaparak pasif gelir elde etmenin yolları ve ipuçları.", "en": "Tips and strategies for earning passive income through rental property investment in Alanya.", "de": "Tipps und Strategien für passives Einkommen durch Mietimmobilien in Alanya.", "ru": "Советы и стратегии получения пассивного дохода от аренды недвижимости в Аланье.", "bs": "Savjeti i strategije za zaradu pasivnog prihoda kroz iznajmljivanje nekretnina u Alanji."}'::jsonb,
  '{"tr": "<h2>Kısa Dönem Kiralama</h2><p>Turizm sezonunda (Mayıs-Ekim) günlük ve haftalık kiralama ile yüksek getiri elde edebilirsiniz. Airbnb ve Booking.com gibi platformlar üzerinden kolay yönetim mümkündür.</p><h2>Uzun Dönem Kiralama</h2><p>Yıllık kira sözleşmeleriyle sabit gelir garantisi. Özellikle Rus, Alman ve Skandinav kiracılar kış aylarında uzun dönem kiralama tercih etmektedir.</p><h2>Getiri Oranları</h2><p>Mahmutlar ve Avsallar''da %8-12, Oba ve Kestel''de %6-10 yıllık kira getirisi beklentisi bulunmaktadır.</p><h2>Yönetim Hizmetleri</h2><p>EmlakBanq olarak mülk yönetimi, kiracı bulma ve bakım hizmetleri sunuyoruz.</p>", "en": "<h2>Short-Term Rental</h2><p>High returns through daily and weekly rentals during tourism season (May-October).</p>"}'::jsonb,
  '2025-02-15',
  '2025-02-15T10:00:00Z',
  '{"tr": "Kiralama", "en": "Rental", "de": "Vermietung", "ru": "Аренда", "bs": "Iznajmljivanje"}'::jsonb,
  'bg-rose-100 text-rose-800',
  'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=80&fit=crop',
  true,
  5
);


-- ============================================================================
-- 4. MARKET HIGHLIGHTS (Alanya piyasa verileri)
-- ============================================================================

INSERT INTO market_highlights (text, sort_order) VALUES
('{"tr": "Alanya gayrimenkul piyasası 2024''te %18 değer artışı kaydetti", "en": "Alanya real estate market recorded 18% value appreciation in 2024", "de": "Alanyas Immobilienmarkt verzeichnete 2024 eine Wertsteigerung von 18%", "ru": "Рынок недвижимости Аланьи вырос на 18% в 2024 году", "bs": "Tržište nekretnina u Alanji zabilježilo je rast od 18% u 2024"}'::jsonb, 0),
('{"tr": "Yabancı yatırımcı sayısı bir önceki yıla göre %25 arttı", "en": "Foreign investor numbers increased by 25% compared to previous year", "de": "Die Zahl ausländischer Investoren stieg um 25% im Vergleich zum Vorjahr", "ru": "Число иностранных инвесторов выросло на 25% по сравнению с предыдущим годом", "bs": "Broj stranih investitora porastao je za 25% u odnosu na prethodnu godinu"}'::jsonb, 1),
('{"tr": "Alanya''da ortalama kira getirisi %8-12 arasında seyrediyor", "en": "Average rental yield in Alanya ranges between 8-12%", "de": "Die durchschnittliche Mietrendite in Alanya liegt zwischen 8-12%", "ru": "Средняя арендная доходность в Аланье составляет 8-12%", "bs": "Prosječni prinos od najma u Alanji kreće se između 8-12%"}'::jsonb, 2),
('{"tr": "2025''te 5.000+ yeni konut projesi teslim edildi", "en": "5,000+ new residential units delivered in 2025", "de": "Über 5.000 neue Wohneinheiten wurden 2025 übergeben", "ru": "В 2025 году сдано более 5000 новых жилых единиц", "bs": "U 2025. godini isporučeno je više od 5.000 novih stambenih jedinica"}'::jsonb, 3),
('{"tr": "Alanya, Türkiye''de yabancılara en çok konut satılan 3. şehir", "en": "Alanya ranks 3rd in Turkey for property sales to foreigners", "de": "Alanya ist die drittgrößte Stadt der Türkei beim Immobilienverkauf an Ausländer", "ru": "Аланья занимает 3-е место в Турции по продаже недвижимости иностранцам", "bs": "Alanja je treći grad u Turskoj po prodaji nekretnina strancima"}'::jsonb, 4),
('{"tr": "Vatandaşlık programı ile 10.000+ yabancı yatırımcı Türk vatandaşlığı edindi", "en": "10,000+ foreign investors gained Turkish citizenship through the citizenship program", "de": "Über 10.000 ausländische Investoren erhielten die türkische Staatsbürgerschaft", "ru": "Более 10 000 иностранных инвесторов получили турецкое гражданство", "bs": "Više od 10.000 stranih investitora steklo je tursko državljanstvo"}'::jsonb, 5);


-- ============================================================================
-- 5. TOP AREAS ROI (Alanya bölgeleri ROI verileri)
-- ============================================================================

INSERT INTO top_areas_roi (area, roi, price_range, trend, sort_order) VALUES
('{"tr": "Cikcilli", "en": "Cikcilli", "de": "Cikcilli", "ru": "Джикджилли", "bs": "Cikcilli"}'::jsonb, '%9-14', '€80K - €280K', 'up', 0),
('{"tr": "Mahmutlar", "en": "Mahmutlar", "de": "Mahmutlar", "ru": "Махмутлар", "bs": "Mahmutlar"}'::jsonb, '%8-12', '€65K - €180K', 'up', 1),
('{"tr": "Avsallar", "en": "Avsallar", "de": "Avsallar", "ru": "Авсаллар", "bs": "Avsallar"}'::jsonb, '%8-12', '€70K - €350K', 'up', 2),
('{"tr": "Kestel", "en": "Kestel", "de": "Kestel", "ru": "Кестель", "bs": "Kestel"}'::jsonb, '%7-11', '€100K - €650K', 'up', 3),
('{"tr": "Konaklı", "en": "Konakli", "de": "Konaklı", "ru": "Конаклы", "bs": "Konaklı"}'::jsonb, '%7-11', '€75K - €200K', 'stable', 4),
('{"tr": "Tosmur", "en": "Tosmur", "de": "Tosmur", "ru": "Тосмур", "bs": "Tosmur"}'::jsonb, '%7-10', '€90K - €300K', 'stable', 5),
('{"tr": "Oba", "en": "Oba", "de": "Oba", "ru": "Оба", "bs": "Oba"}'::jsonb, '%6-10', '€120K - €450K', 'up', 6),
('{"tr": "Kargıcak", "en": "Kargicak", "de": "Kargıcak", "ru": "Каргыджак", "bs": "Kargıcak"}'::jsonb, '%5-9', '€350K - €800K', 'stable', 7);


-- ============================================================================
-- 6. GOLDEN VISA → TÜRK VATANDAŞLIĞI (UAE içeriği Türkiye ile değiştirildi)
-- ============================================================================

-- Mevcut UAE içeriğini sil
DELETE FROM golden_visa_content;

-- Türkiye odaklı vatandaşlık içeriği ekle
-- Benefits (section = 'benefit')
INSERT INTO golden_visa_content (section, key, title, description, sort_order) VALUES
('benefit', 'residency', 'Tam Vatandaşlık Hakkı', 'Kendiniz ve aileniz için kalıcı Türk vatandaşlığı edinin. Oturma izni değil, tam vatandaşlık hakkı ile Türkiye''de sınırsız yaşam ve çalışma imkanı.', 0),
('benefit', 'family', 'Aile Dahil Vatandaşlık', 'Eşiniz ve 18 yaşından küçük çocuklarınız da tek başvuru ile vatandaşlık hakkı kazanır. Ek mülk gereksinimi yoktur.', 1),
('benefit', 'business', 'İş Kurma Özgürlüğü', 'Türk vatandaşı olarak herhangi bir kısıtlama olmadan Türkiye genelinde şirket kurun ve yönetin.', 2),
('benefit', 'travel', 'Vizesiz Seyahat', 'Türk pasaportu ile 110''dan fazla ülkeye vizesiz veya kapıda vize ile seyahat edin. AB Schengen vize başvuru süreciniz kolaylaşır.', 3),
('benefit', 'tax', 'Avantajlı Vergi Sistemi', 'Rekabetçi vergi oranları, yabancı yatırımcılara özel teşvikler ve 80+ ülke ile çifte vergilendirmeyi önleyen anlaşmalar.', 4),
('benefit', 'healthcare', 'Kaliteli Yaşam Standartları', 'Türk vatandaşı olarak dünya standartlarında sağlık hizmetleri, kaliteli eğitim kurumları ve modern bankacılık hizmetlerine tam erişim.', 5);

-- Eligibility (section = 'eligibility')
INSERT INTO golden_visa_content (section, key, title, description, sort_order) VALUES
('eligibility', 'eligibility_1', NULL, 'Türkiye''de minimum 400.000 USD değerinde gayrimenkul satın alın.', 0),
('eligibility', 'eligibility_2', NULL, 'Mülk, satın alma tarihinden itibaren en az 3 yıl boyunca satılamaz.', 1),
('eligibility', 'eligibility_3', NULL, 'Mülk konut veya ticari olabilir; tamamlanmış veya yapım aşamasında projeler uygundur.', 2),
('eligibility', 'eligibility_4', NULL, 'Birden fazla mülk birleştirilerek minimum yatırım tutarına ulaşılabilir.', 3),
('eligibility', 'eligibility_5', NULL, 'Adli sicil kaydı temiz olmalı ve geçerli sağlık sigortası bulunmalıdır.', 4),
('eligibility', 'eligibility_6', NULL, 'Tapu Müdürlüğü''nden resmi değerleme raporu alınması zorunludur.', 5);

-- Process Steps (section = 'process_step')
INSERT INTO golden_visa_content (section, key, title, description, sort_order) VALUES
('process_step', 'step_1', 'Mülk Seçimi', 'Uzman danışmanlarımızla görüşerek uygunluğunuzu değerlendirin, mülk seçeneklerini inceleyin ve size özel bir yol haritası oluşturun.', 0),
('process_step', 'step_2', 'Satın Alma ve Tescil', 'Seçtiğiniz mülkü satın alın. Hukuki destek, gerekli özen ve belgelendirme süreçlerini biz yönetiyoruz.', 1),
('process_step', 'step_3', 'Belge Hazırlığı', 'Pasaport, doğum belgesi, tapu ve değerleme raporu dahil tüm gerekli belgeleri toplayın ve onaylayın.', 2),
('process_step', 'step_4', 'Vatandaşlık Onayı', 'Başvurunuzu yapın ve 3-6 ay içinde Türk vatandaşlığınızı edinin. Sorunsuz ve stressiz bir süreç için yanınızdayız.', 3);


-- ============================================================================
-- 7. ALANYA OFİSİ EKLE (mevcut İstanbul ofisine ek olarak)
-- ============================================================================

INSERT INTO offices (city, address, phone, image, lat, lng, sort_order) VALUES
(
  'Alanya',
  'Oba Mah., Alanya, Antalya, Türkiye',
  '+90 242 XXX XXXX',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&fit=crop',
  36.5432,
  31.9993,
  0
)
ON CONFLICT DO NOTHING;

-- İstanbul ofisinin sort_order'ını güncelle (Alanya birinci olsun)
UPDATE offices SET sort_order = 1 WHERE city = 'Istanbul';


-- ============================================================================
-- 8. SITE SETTINGS GÜNCELLE (tagline Alanya odaklı)
-- ============================================================================

UPDATE site_settings SET value = '"Alanya''nın Lider Gayrimenkul Danışmanlığı"' WHERE key = 'tagline';


-- ============================================================================
-- 9. BUYER GUIDES - UAE referanslarını Türkiye ile değiştir
-- ============================================================================

UPDATE buyer_guides SET
  title = '{"en": "Mortgage & Finance Options in Turkey", "tr": "Türkiye''de Kredi ve Finansman Seçenekleri", "ar": "خيارات الرهن العقاري والتمويل في تركيا", "ru": "Ипотека и финансирование в Турции", "de": "Hypotheken- und Finanzierungsoptionen in der Türkei", "fr": "Options de prêt hypothécaire en Turquie", "fa": "گزینه‌های وام مسکن در ترکیه", "hi": "तुर्की में बंधक और वित्त विकल्प"}'::jsonb,
  description = '{"en": "Navigate Turkish mortgage regulations, compare rates from leading banks, and understand the financing options available to residents and non-residents alike.", "tr": "Türkiye kredi düzenlemelerini anlayın, önde gelen bankalardan oranları karşılaştırın ve yerleşiklere ve yabancılara sunulan finansman seçeneklerini keşfedin.", "ar": "تعرف على لوائح الرهن العقاري في تركيا وقارن الأسعار من البنوك الرائدة", "ru": "Изучите ипотечное законодательство Турции, сравните ставки ведущих банков", "de": "Navigieren Sie durch die türkischen Hypothekenvorschriften und vergleichen Sie Zinssätze", "fr": "Naviguez dans les réglementations hypothécaires turques", "fa": "قوانین وام مسکن ترکیه را بررسی کنید", "hi": "तुर्की बंधक नियमों को समझें"}'::jsonb
WHERE slug = 'mortgage-and-finance';


-- ============================================================================
-- TAMAMLANDI!
-- ============================================================================
-- Eklenen veriler:
-- ✓ 20 gayrimenkul ilanı (6 öne çıkan)
-- ✓ 8 Alanya bölgesi (4 öne çıkan)
-- ✓ 6 blog yazısı
-- ✓ 6 piyasa veri noktası
-- ✓ 8 bölge ROI verisi
-- ✓ Türkiye odaklı vatandaşlık içeriği (UAE kaldırıldı)
-- ✓ Alanya ofisi
-- ✓ Site tagline güncellendi
