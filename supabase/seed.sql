-- ============================================================================
-- EmlakBanq Seed Data - Alanya Gayrimenkul
-- Tüm veriler Alanya, Türkiye odaklıdır
-- ============================================================================


-- ============================================================================
-- 1. PROPERTIES (20 ilan - Alanya genelinde, 6 öne çıkan)
-- ============================================================================

INSERT INTO properties (name, slug, location, price, type, type_label, beds, sqft, image, featured, description, gallery, amenities, developer, year, sort_order) VALUES
(
  '{"tr": "Deniz Manzaralı Lüks Villa", "en": "Sea View Luxury Villa", "de": "Luxusvilla mit Meerblick", "ru": "Роскошная вилла с видом на море", "bs": "Luksuzna vila s pogledom na more"}'::jsonb,
  'deniz-manzarali-luks-villa',
  '{"tr": "Kargıcak, Alanya", "en": "Kargicak, Alanya", "de": "Kargıcak, Alanya", "ru": "Каргыджак, Аланья", "bs": "Kargıcak, Alanya"}'::jsonb,
  '₺18.500.000',
  'villa',
  '{"tr": "Villa", "en": "Villa", "de": "Villa", "ru": "Вилла", "bs": "Vila"}'::jsonb,
  4,
  '280 m²',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80&fit=crop',
  true,
  'Akdeniz''in büyüleyici manzarasına sahip bu muhteşem villa, modern mimari ve doğal güzelliği bir arada sunuyor.',
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
  '₺3.400.000',
  'apartment',
  '{"tr": "Daire", "en": "Apartment", "de": "Wohnung", "ru": "Квартира", "bs": "Stan"}'::jsonb,
  2,
  '95 m²',
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&fit=crop',
  true,
  'Mahmutlar''ın kalbinde, denize sadece 300 metre mesafede modern bir residence projesi.',
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
  '₺12.200.000',
  'penthouse',
  '{"tr": "Penthouse", "en": "Penthouse", "de": "Penthouse", "ru": "Пентхаус", "bs": "Penthaus"}'::jsonb,
  3,
  '210 m²',
  'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80&fit=crop',
  true,
  'Oba''nın en prestijli adresinde, 360 derece panoramik manzaraya sahip premium penthouse.',
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
  '₺24.700.000',
  'villa',
  '{"tr": "Villa", "en": "Villa", "de": "Villa", "ru": "Вилла", "bs": "Vila"}'::jsonb,
  5,
  '350 m²',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&fit=crop',
  true,
  'Kestel sahilinde, denize sıfır konumda muhteşem bir villa. Özel plaj erişimi ve infinity havuz.',
  ARRAY['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&fit=crop', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fit=crop'],
  ARRAY['Denize Sıfır', 'Özel Plaj', 'Infinity Havuz', 'Bahçe', 'BBQ Alanı', 'Güvenlik'],
  'Kestel Yapı A.Ş.',
  '2023',
  3
),
(
  '{"tr": "Aile Dairesi", "en": "Family Apartment", "de": "Familienwohnung", "ru": "Семейная квартира", "bs": "Porodični stan"}'::jsonb,
  'aile-dairesi-tosmur',
  '{"tr": "Tosmur, Alanya", "en": "Tosmur, Alanya", "de": "Tosmur, Alanya", "ru": "Тосмур, Аланья", "bs": "Tosmur, Alanya"}'::jsonb,
  '₺4.400.000',
  'apartment',
  '{"tr": "Daire", "en": "Apartment", "de": "Wohnung", "ru": "Квартира", "bs": "Stan"}'::jsonb,
  3,
  '120 m²',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&fit=crop',
  true,
  'Tosmur''un sakin ortamında aileler için ideal daire. Geniş odalar ve site içi sosyal alanlar.',
  ARRAY['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&fit=crop'],
  ARRAY['Site İçi Havuz', 'Çocuk Parkı', 'Otopark', 'Güvenlik', 'Jeneratör', 'Balkon'],
  'Tosmur Konutları',
  '2024',
  4
),
(
  '{"tr": "Havuzlu Residence", "en": "Pool Residence", "de": "Residenz mit Pool", "ru": "Резиденция с бассейном", "bs": "Rezidencija s bazenom"}'::jsonb,
  'havuzlu-residence-cikcilli',
  '{"tr": "Cikcilli, Alanya", "en": "Cikcilli, Alanya", "de": "Cikcilli, Alanya", "ru": "Джикджилли, Аланья", "bs": "Cikcilli, Alanya"}'::jsonb,
  '₺5.100.000',
  'apartment',
  '{"tr": "Daire", "en": "Apartment", "de": "Wohnung", "ru": "Квартира", "bs": "Stan"}'::jsonb,
  2,
  '110 m²',
  'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80&fit=crop',
  true,
  'Cikcilli''nin gelişen bölgesinde modern bir residence. Açık/kapalı havuz ve SPA merkezi.',
  ARRAY['https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80&fit=crop'],
  ARRAY['Açık Havuz', 'Kapalı Havuz', 'SPA', 'Fitness', 'Sauna', 'Otopark'],
  'Cikcilli Yapı',
  '2025',
  5
),
(
  '{"tr": "Doğa Manzaralı Villa", "en": "Nature View Villa", "de": "Villa mit Naturblick", "ru": "Вилла с видом на природу", "bs": "Vila s pogledom na prirodu"}'::jsonb,
  'doga-manzarali-villa-avsallar',
  '{"tr": "Avsallar, Alanya", "en": "Avsallar, Alanya", "de": "Avsallar, Alanya", "ru": "Авсаллар, Аланья", "bs": "Avsallar, Alanya"}'::jsonb,
  '₺14.500.000',
  'villa',
  '{"tr": "Villa", "en": "Villa", "de": "Villa", "ru": "Вилла", "bs": "Vila"}'::jsonb,
  4,
  '250 m²',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80&fit=crop',
  false,
  'Toros Dağları ve Akdeniz manzarasını bir arada sunan villa. Doğa ile iç içe huzurlu yaşam.',
  ARRAY['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80&fit=crop'],
  ARRAY['Özel Havuz', 'Büyük Bahçe', 'Dağ Manzarası', 'Otopark', 'BBQ', 'Depo'],
  'Avsallar İnşaat',
  '2024',
  6
),
(
  '{"tr": "Stüdyo Daire", "en": "Studio Apartment", "de": "Studio-Wohnung", "ru": "Квартира-студия", "bs": "Garsonjera"}'::jsonb,
  'studyo-daire-mahmutlar',
  '{"tr": "Mahmutlar, Alanya", "en": "Mahmutlar, Alanya", "de": "Mahmutlar, Alanya", "ru": "Махмутлар, Аланья", "bs": "Mahmutlar, Alanya"}'::jsonb,
  '₺2.500.000',
  'apartment',
  '{"tr": "Stüdyo", "en": "Studio", "de": "Studio", "ru": "Студия", "bs": "Studio"}'::jsonb,
  1,
  '55 m²',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80&fit=crop',
  false,
  'Mahmutlar''da yatırımlık stüdyo daire. Tam eşyalı, yüksek kira getirisi potansiyeli.',
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
  '₺16.900.000',
  'penthouse',
  '{"tr": "Penthouse", "en": "Penthouse", "de": "Penthouse", "ru": "Пентхаус", "bs": "Penthaus"}'::jsonb,
  4,
  '280 m²',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&fit=crop',
  false,
  'Çift katlı lüks dubleks penthouse. Deniz ve dağ manzarası bir arada.',
  ARRAY['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&fit=crop'],
  ARRAY['Çift Kat', 'Özel Teras', 'Deniz Manzarası', 'Jakuzi', 'Akıllı Ev', 'Garaj'],
  'Oba Lüks Yapı',
  '2025',
  8
),
(
  '{"tr": "Denize Sıfır Daire", "en": "Beachfront Apartment", "de": "Wohnung am Strand", "ru": "Квартира на берегу моря", "bs": "Stan na plaži"}'::jsonb,
  'denize-sifir-daire-kestel',
  '{"tr": "Kestel, Alanya", "en": "Kestel, Alanya", "de": "Kestel, Alanya", "ru": "Кестель, Аланья", "bs": "Kestel, Alanya"}'::jsonb,
  '₺6.650.000',
  'apartment',
  '{"tr": "Daire", "en": "Apartment", "de": "Wohnung", "ru": "Квартира", "bs": "Stan"}'::jsonb,
  2,
  '105 m²',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80&fit=crop',
  false,
  'Kestel sahilinde denize sıfır konumda daire. Balkondan direkt deniz manzarası.',
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
  '₺19.800.000',
  'villa',
  '{"tr": "Villa", "en": "Villa", "de": "Villa", "ru": "Вилла", "bs": "Vila"}'::jsonb,
  5,
  '320 m²',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fit=crop',
  false,
  'Kargıcak''ın yüksek kesiminde, 180 derece deniz manzaralı müstakil villa.',
  ARRAY['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fit=crop'],
  ARRAY['Müstakil', 'Özel Havuz', '180° Deniz Manzarası', 'Garaj', 'Bahçe', 'Güvenlik'],
  'Kargıcak Villa Park',
  '2023',
  10
),
(
  '{"tr": "Lüks Residence Daire", "en": "Luxury Residence Apartment", "de": "Luxus-Residenz-Wohnung", "ru": "Роскошная резиденция", "bs": "Luksuzni stan u rezidenciji"}'::jsonb,
  'luks-residence-konakli',
  '{"tr": "Konaklı, Alanya", "en": "Konakli, Alanya", "de": "Konaklı, Alanya", "ru": "Конаклы, Аланья", "bs": "Konaklı, Alanya"}'::jsonb,
  '₺5.900.000',
  'apartment',
  '{"tr": "Daire", "en": "Apartment", "de": "Wohnung", "ru": "Квартира", "bs": "Stan"}'::jsonb,
  3,
  '130 m²',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80&fit=crop',
  false,
  'Konaklı''nın merkezi konumunda lüks residence. Zengin sosyal tesisler.',
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
  '₺11.000.000',
  'villa',
  '{"tr": "Villa", "en": "Villa", "de": "Villa", "ru": "Вилла", "bs": "Vila"}'::jsonb,
  3,
  '200 m²',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80&fit=crop',
  false,
  'Geniş bahçeli, aileler için ideal villa. Meyve ağaçlı bahçe ve özel havuz.',
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
  '₺3.700.000',
  'apartment',
  '{"tr": "Daire", "en": "Apartment", "de": "Wohnung", "ru": "Квартира", "bs": "Stan"}'::jsonb,
  2,
  '85 m²',
  'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80&fit=crop',
  false,
  'Son teknoloji akıllı ev sistemli daire. Uzaktan kontrol edilebilir modern yaşam.',
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
  '₺10.500.000',
  'penthouse',
  '{"tr": "Penthouse", "en": "Penthouse", "de": "Penthouse", "ru": "Пентхаус", "bs": "Penthaus"}'::jsonb,
  3,
  '185 m²',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80&fit=crop',
  false,
  'Panoramik Akdeniz manzarasına sahip geniş penthouse. Büyük teras ve premium iç mekan.',
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
  '₺12.900.000',
  'villa',
  '{"tr": "Villa", "en": "Villa", "de": "Villa", "ru": "Вилла", "bs": "Vila"}'::jsonb,
  3,
  '220 m²',
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80&fit=crop',
  false,
  'Tatil ve yatırım amaçlı mükemmel villa. Kiralama potansiyeli yüksek.',
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
  '₺2.700.000',
  'apartment',
  '{"tr": "Daire", "en": "Apartment", "de": "Wohnung", "ru": "Квартира", "bs": "Stan"}'::jsonb,
  1,
  '65 m²',
  'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80&fit=crop',
  false,
  'Uygun fiyatlı yatırımlık daire. Yüksek kira getirisi potansiyeli.',
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
  '₺5.500.000',
  'apartment',
  '{"tr": "Daire", "en": "Apartment", "de": "Wohnung", "ru": "Квартира", "bs": "Stan"}'::jsonb,
  2,
  '115 m²',
  'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80&fit=crop',
  false,
  'Geniş teraslı modern daire. Şehir merkezine yürüme mesafesinde.',
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
  '₺29.600.000',
  'villa',
  '{"tr": "Villa", "en": "Villa", "de": "Villa", "ru": "Вилла", "bs": "Vila"}'::jsonb,
  6,
  '420 m²',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&fit=crop',
  false,
  'Ultra lüks villa. Infinity havuz, sinema odası, şarap mahzeni ve tam akıllı ev sistemi.',
  ARRAY['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&fit=crop'],
  ARRAY['Infinity Havuz', 'Sinema Odası', 'Şarap Mahzeni', 'Akıllı Ev', 'Asansör', 'Helipad'],
  'Kargıcak Premium',
  '2024',
  18
),
(
  '{"tr": "Rezidans Daire", "en": "Residence Apartment", "de": "Residenz-Wohnung", "ru": "Квартира в резиденции", "bs": "Stan u rezidenciji"}'::jsonb,
  'rezidans-daire-konakli',
  '{"tr": "Konaklı, Alanya", "en": "Konakli, Alanya", "de": "Konaklı, Alanya", "ru": "Конаклы, Аланья", "bs": "Konaklı, Alanya"}'::jsonb,
  '₺4.100.000',
  'apartment',
  '{"tr": "Daire", "en": "Apartment", "de": "Wohnung", "ru": "Квартира", "bs": "Stan"}'::jsonb,
  2,
  '90 m²',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80&fit=crop',
  false,
  'Uygun fiyatlı, modern rezidans daire. Denize 400 metre.',
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
('mahmutlar', 'mahmutlar',
  '{"tr": "Mahmutlar", "en": "Mahmutlar", "de": "Mahmutlar", "ru": "Махмутлар", "bs": "Mahmutlar"}'::jsonb,
  '{"tr": "Alanya''nın en popüler yatırım bölgesi. Uygun fiyatlar ve yüksek kira getirisi.", "en": "Alanya''s most popular investment area. Affordable prices and high rental yields.", "de": "Alanyas beliebtestes Investitionsgebiet.", "ru": "Самый популярный инвестиционный район Аланьи.", "bs": "Najpopularnija investiciona zona Alanje."}'::jsonb,
  '{"tr": "Mahmutlar, Alanya''nın doğusunda yer alan en büyük ve en hızlı gelişen bölgelerden biridir. Denize yakın konumu, uygun fiyatları ve zengin altyapısıyla özellikle yabancı yatırımcıların ilgisini çekmektedir.", "en": "Mahmutlar is one of the largest and fastest-growing districts east of Alanya.", "de": "Mahmutlar ist einer der größten Stadtteile östlich von Alanya.", "ru": "Махмутлар — один из крупнейших районов к востоку от Аланьи.", "bs": "Mahmutlar je jedna od najvećih četvrti istočno od Alanje."}'::jsonb,
  '₺2.500.000 - ₺6.800.000', '%8-12',
  'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80&fit=crop',
  ARRAY['Denize 300m mesafe', 'Zengin altyapı', 'Yabancı yatırımcı dostu', 'Uygun fiyat/performans', 'Yıl boyu yaşanabilir', 'Yüksek kira getirisi'],
  true, 0),
('oba', 'oba',
  '{"tr": "Oba", "en": "Oba", "de": "Oba", "ru": "Оба", "bs": "Oba"}'::jsonb,
  '{"tr": "Alanya''nın modern şehir merkezi. Premium projeler ve lüks yaşam.", "en": "Alanya''s modern city center. Premium projects and luxury living.", "de": "Alanyas modernes Stadtzentrum.", "ru": "Современный центр Аланьи.", "bs": "Moderni centar Alanje."}'::jsonb,
  '{"tr": "Oba, Alanya''nın en merkezi ve prestijli bölgesidir. Modern alışveriş merkezleri, hastaneler ve okullarla çevrilidir.", "en": "Oba is Alanya''s most central and prestigious district.", "de": "Oba ist der zentralste Stadtteil von Alanya.", "ru": "Оба — самый центральный район Аланьи.", "bs": "Oba je najcentralnija četvrt Alanje."}'::jsonb,
  '₺4.600.000 - ₺17.100.000', '%6-10',
  'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80&fit=crop',
  ARRAY['Şehir merkezi konumu', 'Premium projeler', 'Hastane ve okul yakınlığı', 'Alışveriş merkezleri', 'Restoran ve kafeler', 'Modern altyapı'],
  true, 1),
('kestel', 'kestel',
  '{"tr": "Kestel", "en": "Kestel", "de": "Kestel", "ru": "Кестель", "bs": "Kestel"}'::jsonb,
  '{"tr": "Denize sıfır konumu ve doğal güzelliğiyle öne çıkan sahil bölgesi.", "en": "Coastal district known for its beachfront location and natural beauty.", "de": "Küstengebiet bekannt für seine Strandlage.", "ru": "Прибрежный район с расположением на берегу моря.", "bs": "Obalna četvrt poznata po plaži."}'::jsonb,
  '{"tr": "Kestel, Alanya merkezinin batısında sakin ve huzurlu bir sahil bölgesidir. Kleopatra Plajı''na yakınlığıyla bilinir.", "en": "Kestel is a peaceful coastal district west of Alanya center.", "de": "Kestel ist ein ruhiger Küstenbezirk.", "ru": "Кестель — тихий прибрежный район.", "bs": "Kestel je mirna obalna četvrt."}'::jsonb,
  '₺3.800.000 - ₺24.700.000', '%7-11',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80&fit=crop',
  ARRAY['Denize sıfır projeler', 'Kleopatra Plajı yakınlığı', 'Doğal güzellik', 'Sakin ortam', 'Su sporları', 'Kalıcı konut seçenekleri'],
  true, 2),
('kargicak', 'kargicak',
  '{"tr": "Kargıcak", "en": "Kargicak", "de": "Kargıcak", "ru": "Каргыджак", "bs": "Kargıcak"}'::jsonb,
  '{"tr": "Lüks villaların adresi. Eşsiz deniz manzarası ve sakin yaşam.", "en": "Home of luxury villas. Unique sea views and peaceful living.", "de": "Heimat der Luxusvillen.", "ru": "Дом роскошных вилл.", "bs": "Dom luksuznih vila."}'::jsonb,
  '{"tr": "Kargıcak, lüks villa projeleriyle tanınan prestijli bir bölgedir. Yüksek rakımlı konumu eşsiz deniz manzaraları sunar.", "en": "Kargicak is a prestigious district known for luxury villa projects.", "de": "Kargıcak ist ein prestigeträchtiger Villen-Stadtteil.", "ru": "Каргыджак — престижный район вилл.", "bs": "Kargıcak je prestižna četvrt vila."}'::jsonb,
  '₺13.300.000 - ₺30.400.000', '%5-9',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fit=crop',
  ARRAY['Lüks villa projeleri', 'Eşsiz deniz manzarası', 'Özel yaşam alanları', 'Doğa ile iç içe', 'Yüksek yatırım değeri', 'Premium konfor'],
  true, 3),
('tosmur', 'tosmur',
  '{"tr": "Tosmur", "en": "Tosmur", "de": "Tosmur", "ru": "Тосмур", "bs": "Tosmur"}'::jsonb,
  '{"tr": "Aileler için ideal, sakin ve huzurlu bir yaşam bölgesi.", "en": "Ideal for families, quiet and peaceful.", "de": "Ideal für Familien.", "ru": "Идеально для семей.", "bs": "Idealna za porodice."}'::jsonb,
  '{"tr": "Tosmur, hem şehir hayatına yakın hem de sakin bir yaşam sunar. Dim Çayı''na yakınlığıyla bilinir.", "en": "Tosmur offers proximity to city life and quiet living. Known for Dim River.", "de": "Tosmur bietet Stadtnähe und ruhiges Wohnen.", "ru": "Тосмур предлагает близость к городу и тихое проживание.", "bs": "Tosmur nudi blizinu gradu i miran život."}'::jsonb,
  '₺3.400.000 - ₺11.400.000', '%7-10',
  'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80&fit=crop',
  ARRAY['Aile dostu ortam', 'Dim Çayı yakınlığı', 'Yeşil alanlar', 'Merkeze yakın', 'Uygun fiyatlar', 'Sakin çevre'],
  false, 4),
('cikcilli', 'cikcilli',
  '{"tr": "Cikcilli", "en": "Cikcilli", "de": "Cikcilli", "ru": "Джикджилли", "bs": "Cikcilli"}'::jsonb,
  '{"tr": "Hızla gelişen, yatırım potansiyeli yüksek modern bölge.", "en": "Rapidly developing area with high investment potential.", "de": "Schnell wachsendes Investitionsgebiet.", "ru": "Быстро развивающийся район.", "bs": "Brzorastuća investiciona zona."}'::jsonb,
  '{"tr": "Cikcilli, yeni nesil residence projelerine ev sahipliği yapan modern bir bölgedir. Cazip fiyatlarıyla yatırımcıların radarındadır.", "en": "Cikcilli hosts new-generation residence projects with attractive prices.", "de": "Cikcilli beherbergt neue Residenzprojekte.", "ru": "Джикджилли принимает жилые проекты нового поколения.", "bs": "Cikcilli ugošćuje rezidencijalne projekte nove generacije."}'::jsonb,
  '₺3.000.000 - ₺10.600.000', '%9-14',
  'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=80&fit=crop',
  ARRAY['Hızlı değer artışı', 'Yeni nesil projeler', 'Stratejik konum', 'Uygun giriş fiyatları', 'Modern altyapı', 'Yüksek ROI potansiyeli'],
  false, 5),
('avsallar', 'avsallar',
  '{"tr": "Avsallar", "en": "Avsallar", "de": "Avsallar", "ru": "Авсаллар", "bs": "Avsallar"}'::jsonb,
  '{"tr": "Doğa, deniz ve huzurun buluştuğu tatil cenneti.", "en": "Holiday paradise where nature, sea, and peace meet.", "de": "Urlaubsparadies.", "ru": "Райский уголок для отдыха.", "bs": "Raj za odmor."}'::jsonb,
  '{"tr": "Avsallar, İncekum Plajı ile ünlü doğal bir tatil bölgesidir. Kira getirisi yüksek mülkleriyle yatırım açısından cazip.", "en": "Avsallar is famous for Incekum Beach, a natural holiday district.", "de": "Avsallar ist berühmt für den Incekum-Strand.", "ru": "Авсаллар известен пляжем Инджекум.", "bs": "Avsallar je poznat po plaži Incekum."}'::jsonb,
  '₺2.700.000 - ₺13.300.000', '%8-12',
  'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&q=80&fit=crop',
  ARRAY['İncekum Plajı', 'Doğal güzellik', 'Toros Dağları manzarası', 'Tatil ve emeklilik', 'Yüksek kira getirisi', 'Uygun fiyatlar'],
  false, 6),
('konakli', 'konakli',
  '{"tr": "Konaklı", "en": "Konakli", "de": "Konaklı", "ru": "Конаклы", "bs": "Konaklı"}'::jsonb,
  '{"tr": "Tarihi doku ve modern yaşamın harmonisi.", "en": "Harmony of history and modern living.", "de": "Harmonie von Geschichte und modernem Leben.", "ru": "Гармония истории и современной жизни.", "bs": "Harmonija historije i modernog života."}'::jsonb,
  '{"tr": "Konaklı, tarihi ve kültürel zenginliğe sahip bir bölgedir. Yeni modern projeleriyle yatırımcılara cazip fırsatlar sunar.", "en": "Konakli has rich historical heritage and offers new modern projects.", "de": "Konaklı hat reiches historisches Erbe.", "ru": "Конаклы имеет богатое историческое наследие.", "bs": "Konaklı ima bogato historijsko naslijeđe."}'::jsonb,
  '₺2.900.000 - ₺7.600.000', '%7-11',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80&fit=crop',
  ARRAY['Tarihi kalıntılar', 'Yerel pazar', 'Geleneksel atmosfer', 'Uygun fiyatlar', 'Turizm potansiyeli', 'Modern projeler'],
  false, 7);


-- ============================================================================
-- 3. BLOG POSTS (6 makale)
-- ============================================================================

INSERT INTO blog_posts (slug, title, excerpt, content, date, published_at, category, category_color, image, published, sort_order) VALUES
('alanyada-gayrimenkul-yatiriminin-5-avantaji',
  '{"tr": "Alanya''da Gayrimenkul Yatırımının 5 Avantajı", "en": "5 Advantages of Real Estate Investment in Alanya", "de": "5 Vorteile der Immobilieninvestition in Alanya", "ru": "5 преимуществ инвестиций в недвижимость Аланьи", "bs": "5 prednosti ulaganja u nekretnine u Alanji"}'::jsonb,
  '{"tr": "Alanya, Türkiye''nin en cazip gayrimenkul yatırım destinasyonlarından biri. İşte 5 güçlü neden.", "en": "Alanya is one of Turkey''s most attractive real estate investment destinations.", "de": "Alanya ist eine der attraktivsten Immobilien-Investitionsdestinationen.", "ru": "Аланья — одно из самых привлекательных направлений.", "bs": "Alanja je jedna od najatraktivnijih investicionih destinacija."}'::jsonb,
  '{"tr": "<h2>1. Uygun Fiyatlar ve Yüksek Değer Artışı</h2><p>Alanya, Akdeniz kıyısındaki diğer tatil beldelerine kıyasla çok daha uygun fiyatlarla gayrimenkul satın alma imkanı sunmaktadır.</p><h2>2. Yıl Boyu Yaşanabilir İklim</h2><p>300 günden fazla güneşli gün ile yıl boyunca yaşanabilir bir destinasyondur.</p><h2>3. Gelişen Altyapı</h2><p>Yeni hastaneler, alışveriş merkezleri ve modern ulaşım altyapısı.</p><h2>4. Yüksek Kira Getirisi</h2><p>Turizm sezonunda kısa dönem kiralama ile yüksek getiri elde edebilirsiniz.</p><h2>5. Vatandaşlık İmkanı</h2><p>400.000 USD ve üzeri gayrimenkul alımıyla Türk vatandaşlığı.</p>", "en": "<h2>1. Affordable Prices</h2><p>Alanya offers much more affordable property prices compared to other Mediterranean resorts.</p>"}'::jsonb,
  '2025-01-15', '2025-01-15T10:00:00Z',
  '{"tr": "Yatırım", "en": "Investment", "de": "Investment", "ru": "Инвестиции", "bs": "Investicije"}'::jsonb,
  'bg-blue-100 text-blue-800',
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80&fit=crop',
  true, 0),
('2025te-alanya-emlak-piyasasi-trendleri',
  '{"tr": "2025''te Alanya Emlak Piyasası Trendleri", "en": "Alanya Real Estate Market Trends in 2025", "de": "Immobilienmarkttrends in Alanya 2025", "ru": "Тенденции рынка Аланьи 2025", "bs": "Trendovi tržišta u Alanji 2025"}'::jsonb,
  '{"tr": "Alanya emlak piyasası 2025 yılında büyümeye devam ediyor.", "en": "Alanya real estate market continues to grow in 2025.", "de": "Alanyas Immobilienmarkt wächst 2025 weiter.", "ru": "Рынок Аланьи продолжает расти в 2025.", "bs": "Tržište u Alanji nastavlja rasti u 2025."}'::jsonb,
  '{"tr": "<h2>Piyasa Genel Bakış</h2><p>2025 yılının ilk çeyreğinde Alanya gayrimenkul piyasası %15 büyüme gösterdi.</p><h2>En Çok Talep Gören Bölgeler</h2><p>Mahmutlar, Oba ve Kestel en popüler bölgeler.</p><h2>Fiyat Trendleri</h2><p>Ortalama metrekare fiyatları %18 arttı.</p>", "en": "<h2>Market Overview</h2><p>Alanya''s real estate market grew by 15% in Q1 2025.</p>"}'::jsonb,
  '2025-02-01', '2025-02-01T10:00:00Z',
  '{"tr": "Piyasa Analizi", "en": "Market Analysis", "de": "Marktanalyse", "ru": "Анализ рынка", "bs": "Analiza tržišta"}'::jsonb,
  'bg-emerald-100 text-emerald-800',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&fit=crop',
  true, 1),
('yabancilar-icin-alanyada-mulk-satin-alma-rehberi',
  '{"tr": "Yabancılar İçin Alanya''da Mülk Satın Alma Rehberi", "en": "Guide to Buying Property in Alanya for Foreigners", "de": "Leitfaden zum Immobilienkauf in Alanya", "ru": "Руководство по покупке недвижимости для иностранцев", "bs": "Vodič za kupovinu nekretnina za strance"}'::jsonb,
  '{"tr": "Yabancı alıcılar için Alanya''da mülk satın alma sürecinin A''dan Z''ye rehberi.", "en": "A comprehensive guide for foreign buyers.", "de": "Ein umfassender Leitfaden für ausländische Käufer.", "ru": "Полное руководство для иностранных покупателей.", "bs": "Sveobuhvatni vodič za strane kupce."}'::jsonb,
  '{"tr": "<h2>Yasal Süreç</h2><p>Türkiye''de yabancılar tapu alabilir. Süreç 3-5 iş günü sürer.</p><h2>Gerekli Belgeler</h2><p>Pasaport, vergi numarası, banka hesabı ve DASK.</p><h2>Ödeme Yöntemleri</h2><p>Banka havalesi ve taksitli ödeme planları mevcuttur.</p>", "en": "<h2>Legal Process</h2><p>Foreigners can purchase property in Turkey with no restrictions except in military zones.</p>"}'::jsonb,
  '2025-01-20', '2025-01-20T10:00:00Z',
  '{"tr": "Rehber", "en": "Guide", "de": "Ratgeber", "ru": "Руководство", "bs": "Vodič"}'::jsonb,
  'bg-violet-100 text-violet-800',
  'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=800&q=80&fit=crop',
  true, 2),
('alanyanin-en-iyi-yatirim-bolgeleri',
  '{"tr": "Alanya''nın En İyi Yatırım Bölgeleri", "en": "Best Investment Areas in Alanya", "de": "Beste Investitionsgebiete in Alanya", "ru": "Лучшие районы для инвестиций", "bs": "Najbolje investicione zone u Alanji"}'::jsonb,
  '{"tr": "Hangi bölgeye yatırım yapmalısınız? Her bölgenin avantaj ve potansiyelini karşılaştırdık.", "en": "Which area should you invest in?", "de": "In welches Gebiet sollten Sie investieren?", "ru": "В какой район стоит инвестировать?", "bs": "U koju zonu treba investirati?"}'::jsonb,
  '{"tr": "<h2>Mahmutlar - En İyi Fiyat/Performans</h2><p>Uygun giriş fiyatları ve yüksek kira getirisi.</p><h2>Oba - Premium Segment</h2><p>Şehir merkezinde lüks yaşam.</p><h2>Cikcilli - Yükselen Yıldız</h2><p>En yüksek değer artışı potansiyeli.</p>", "en": "<h2>Mahmutlar - Best Value</h2><p>Affordable entry prices and high rental yields.</p>"}'::jsonb,
  '2025-02-10', '2025-02-10T10:00:00Z',
  '{"tr": "Yatırım", "en": "Investment", "de": "Investment", "ru": "Инвестиции", "bs": "Investicije"}'::jsonb,
  'bg-blue-100 text-blue-800',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&fit=crop',
  true, 3),
('turkiyede-gayrimenkul-ile-vatandaslik',
  '{"tr": "Türkiye''de Gayrimenkul ile Vatandaşlık", "en": "Turkish Citizenship Through Real Estate", "de": "Türkische Staatsbürgerschaft durch Immobilien", "ru": "Гражданство Турции через недвижимость", "bs": "Tursko državljanstvo kroz nekretnine"}'::jsonb,
  '{"tr": "400.000 USD ve üzeri gayrimenkul alımıyla Türk vatandaşlığı edinme sürecinin detayları.", "en": "Details of obtaining Turkish citizenship through property purchases of $400,000+.", "de": "Details zur türkischen Staatsbürgerschaft durch Immobilienkauf.", "ru": "Подробности получения турецкого гражданства.", "bs": "Detalji o turskom državljanstvu kroz nekretnine."}'::jsonb,
  '{"tr": "<h2>Program Hakkında</h2><p>Minimum 400.000 USD gayrimenkul alımı ile vatandaşlık başvurusu.</p><h2>Şartlar</h2><p>Mülk en az 3 yıl satılamaz.</p><h2>Süreç</h2><p>3-6 ay içinde sonuçlanır.</p>", "en": "<h2>About the Program</h2><p>Turkey offers citizenship to real estate investors since 2018.</p>"}'::jsonb,
  '2025-01-25', '2025-01-25T10:00:00Z',
  '{"tr": "Vatandaşlık", "en": "Citizenship", "de": "Staatsbürgerschaft", "ru": "Гражданство", "bs": "Državljanstvo"}'::jsonb,
  'bg-amber-100 text-amber-800',
  'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800&q=80&fit=crop',
  true, 4),
('alanyada-kiralik-mulk-yatirimi',
  '{"tr": "Alanya''da Kiralık Mülk Yatırımı", "en": "Rental Property Investment in Alanya", "de": "Mietimmobilien-Investment in Alanya", "ru": "Инвестиции в аренду в Аланье", "bs": "Investicije u iznajmljivanje u Alanji"}'::jsonb,
  '{"tr": "Kiralık mülk yatırımı yaparak pasif gelir elde etmenin yolları.", "en": "Tips for earning passive income through rental investment.", "de": "Tipps für passives Einkommen durch Mietimmobilien.", "ru": "Советы по пассивному доходу от аренды.", "bs": "Savjeti za zaradu pasivnog prihoda od najma."}'::jsonb,
  '{"tr": "<h2>Kısa Dönem Kiralama</h2><p>Turizm sezonunda günlük/haftalık kiralama ile yüksek getiri.</p><h2>Uzun Dönem Kiralama</h2><p>Yıllık kira sözleşmeleriyle sabit gelir.</p><h2>Getiri Oranları</h2><p>Mahmutlar ve Avsallar''da %8-12 yıllık kira getirisi.</p>", "en": "<h2>Short-Term Rental</h2><p>High returns through tourism season rentals.</p>"}'::jsonb,
  '2025-02-15', '2025-02-15T10:00:00Z',
  '{"tr": "Kiralama", "en": "Rental", "de": "Vermietung", "ru": "Аренда", "bs": "Iznajmljivanje"}'::jsonb,
  'bg-rose-100 text-rose-800',
  'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=80&fit=crop',
  true, 5);


-- ============================================================================
-- 4. BUYER_GUIDES (Alanya odaklı alıcı rehberleri)
-- ============================================================================

INSERT INTO buyer_guides (slug, tag, tag_color, border_color, title, description, read_time, image, sort_order) VALUES
('complete-buyers-guide',
  '{"tr": "Temel", "en": "Essential"}'::jsonb,
  'bg-blue-100 text-blue-800', 'border-t-blue-500',
  '{"tr": "Alanya Gayrimenkul Alıcı Rehberi", "en": "Complete Buyer''s Guide to Alanya Real Estate"}'::jsonb,
  '{"tr": "Alanya''da mülk satın alma hakkında bilmeniz gereken her şey -- doğru bölge seçiminden işlem tamamlamaya kadar.", "en": "Everything you need to know about purchasing property in Alanya."}'::jsonb,
  '{"tr": "15 dk okuma", "en": "15 min read"}'::jsonb,
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80&fit=crop', 0),
('first-time-buyer-tips',
  '{"tr": "Başlangıç", "en": "Beginner"}'::jsonb,
  'bg-blue-100 text-blue-800', 'border-t-blue-500',
  '{"tr": "İlk Kez Alıcı Rehberi", "en": "First-Time Buyer Tips"}'::jsonb,
  '{"tr": "Gayrimenkul yatırımında yeni misiniz? Deneyimli yatırımcıların stratejilerini öğrenin.", "en": "New to property investment? Learn insider strategies."}'::jsonb,
  '{"tr": "10 dk okuma", "en": "10 min read"}'::jsonb,
  'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=800&q=80&fit=crop', 1),
('mortgage-and-finance',
  '{"tr": "Finans", "en": "Finance"}'::jsonb,
  'bg-emerald-100 text-emerald-800', 'border-t-emerald-500',
  '{"tr": "Kredi ve Finans Seçenekleri", "en": "Mortgage & Finance Options"}'::jsonb,
  '{"tr": "Türkiye''de kredi düzenlemelerini öğrenin, banka oranlarını karşılaştırın.", "en": "Navigate Turkish mortgage regulations, compare bank rates."}'::jsonb,
  '{"tr": "12 dk okuma", "en": "12 min read"}'::jsonb,
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&fit=crop', 2),
('legal-framework',
  '{"tr": "Hukuki", "en": "Legal"}'::jsonb,
  'bg-violet-100 text-violet-800', 'border-t-violet-500',
  '{"tr": "Yabancı Mülk Sahipleri İçin Hukuki Çerçeve", "en": "Legal Framework for Foreign Property Owners"}'::jsonb,
  '{"tr": "Tapu türleri, yönetmelikler ve yabancı mülk sahibi olarak haklarınızı anlayın.", "en": "Understand title deed types, regulations, and your legal rights."}'::jsonb,
  '{"tr": "14 dk okuma", "en": "14 min read"}'::jsonb,
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&fit=crop', 3),
('off-plan-guide',
  '{"tr": "Yatırım", "en": "Investment"}'::jsonb,
  'bg-amber-100 text-amber-800', 'border-t-amber-500',
  '{"tr": "Yapım Aşamasındaki Projeler Rehberi", "en": "Off-Plan Property Investment Guide"}'::jsonb,
  '{"tr": "Yapım aşamasındaki fırsatları değerlendirin, müteahhit güvenilirliğini analiz edin.", "en": "Evaluate off-plan opportunities and assess developer credibility."}'::jsonb,
  '{"tr": "11 dk okuma", "en": "11 min read"}'::jsonb,
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&fit=crop', 4),
('property-tax-and-fees',
  '{"tr": "Vergi", "en": "Tax & Fees"}'::jsonb,
  'bg-rose-100 text-rose-800', 'border-t-rose-500',
  '{"tr": "Gayrimenkul Vergi ve Masrafları", "en": "Property Tax & Fees Breakdown"}'::jsonb,
  '{"tr": "Mülk satın almadaki tüm masrafların şeffaf dökümü -- harçlar, komisyonlar ve daha fazlası.", "en": "A transparent breakdown of all costs involved in buying property."}'::jsonb,
  '{"tr": "8 dk okuma", "en": "8 min read"}'::jsonb,
  'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800&q=80&fit=crop', 5);


-- ============================================================================
-- 5. SERVICES
-- ============================================================================

INSERT INTO services (key, initials, color, sort_order) VALUES
('investment', 'IC', 'bg-blue-500', 0),
('legal', 'LF', 'bg-estate-600', 1),
('visa', 'GV', 'bg-blue-700', 2),
('afterSales', 'AS', 'bg-estate-500', 3);


-- ============================================================================
-- 6. MARKET HIGHLIGHTS (Alanya piyasa verileri)
-- ============================================================================

INSERT INTO market_highlights (text, sort_order) VALUES
('{"tr": "Alanya gayrimenkul piyasası 2024''te %18 değer artışı kaydetti", "en": "Alanya real estate market recorded 18% appreciation in 2024"}'::jsonb, 0),
('{"tr": "Yabancı yatırımcı sayısı bir önceki yıla göre %25 arttı", "en": "Foreign investor numbers increased by 25% year-over-year"}'::jsonb, 1),
('{"tr": "Alanya''da ortalama kira getirisi %8-12 arasında", "en": "Average rental yield in Alanya ranges between 8-12%"}'::jsonb, 2),
('{"tr": "2025''te 5.000+ yeni konut projesi teslim edildi", "en": "5,000+ new residential units delivered in 2025"}'::jsonb, 3),
('{"tr": "Alanya, yabancılara en çok konut satılan 3. şehir", "en": "Alanya ranks 3rd in Turkey for property sales to foreigners"}'::jsonb, 4),
('{"tr": "Vatandaşlık programı ile 10.000+ yatırımcı Türk vatandaşı oldu", "en": "10,000+ investors gained Turkish citizenship"}'::jsonb, 5);


-- ============================================================================
-- 7. TOP AREAS ROI
-- ============================================================================

INSERT INTO top_areas_roi (area, roi, price_range, trend, sort_order) VALUES
('{"tr": "Cikcilli", "en": "Cikcilli"}'::jsonb, '%9-14', '₺3M - ₺10.6M', 'up', 0),
('{"tr": "Mahmutlar", "en": "Mahmutlar"}'::jsonb, '%8-12', '₺2.5M - ₺6.8M', 'up', 1),
('{"tr": "Avsallar", "en": "Avsallar"}'::jsonb, '%8-12', '₺2.7M - ₺13.3M', 'up', 2),
('{"tr": "Kestel", "en": "Kestel"}'::jsonb, '%7-11', '₺3.8M - ₺24.7M', 'up', 3),
('{"tr": "Konaklı", "en": "Konakli"}'::jsonb, '%7-11', '₺2.9M - ₺7.6M', 'stable', 4),
('{"tr": "Tosmur", "en": "Tosmur"}'::jsonb, '%7-10', '₺3.4M - ₺11.4M', 'stable', 5),
('{"tr": "Oba", "en": "Oba"}'::jsonb, '%6-10', '₺4.6M - ₺17.1M', 'up', 6),
('{"tr": "Kargıcak", "en": "Kargicak"}'::jsonb, '%5-9', '₺13.3M - ₺30.4M', 'stable', 7);


-- ============================================================================
-- 8. GOLDEN VISA → TÜRK VATANDAŞLIĞI (Türkiye odaklı)
-- ============================================================================

INSERT INTO golden_visa_content (section, key, title, description, sort_order) VALUES
('benefit', 'residency', 'Tam Vatandaşlık Hakkı', 'Kendiniz ve aileniz için kalıcı Türk vatandaşlığı edinin. Tam vatandaşlık hakkı ile Türkiye''de sınırsız yaşam ve çalışma imkanı.', 0),
('benefit', 'family', 'Aile Dahil Vatandaşlık', 'Eşiniz ve 18 yaşından küçük çocuklarınız da tek başvuru ile vatandaşlık hakkı kazanır.', 1),
('benefit', 'business', 'İş Kurma Özgürlüğü', 'Türk vatandaşı olarak herhangi bir kısıtlama olmadan Türkiye genelinde şirket kurun ve yönetin.', 2),
('benefit', 'travel', 'Vizesiz Seyahat', 'Türk pasaportu ile 110''dan fazla ülkeye vizesiz veya kapıda vize ile seyahat edin.', 3),
('benefit', 'tax', 'Avantajlı Vergi Sistemi', 'Rekabetçi vergi oranları, yabancı yatırımcılara özel teşvikler ve çifte vergilendirmeyi önleyen anlaşmalar.', 4),
('benefit', 'healthcare', 'Kaliteli Yaşam Standartları', 'Dünya standartlarında sağlık hizmetleri, kaliteli eğitim kurumları ve modern bankacılık hizmetlerine tam erişim.', 5),
('eligibility', 'eligibility_1', NULL, 'Türkiye''de minimum 400.000 USD değerinde gayrimenkul satın alın.', 0),
('eligibility', 'eligibility_2', NULL, 'Mülk, satın alma tarihinden itibaren en az 3 yıl boyunca satılamaz.', 1),
('eligibility', 'eligibility_3', NULL, 'Mülk konut veya ticari olabilir; tamamlanmış veya yapım aşamasında projeler uygundur.', 2),
('eligibility', 'eligibility_4', NULL, 'Birden fazla mülk birleştirilerek minimum yatırım tutarına ulaşılabilir.', 3),
('eligibility', 'eligibility_5', NULL, 'Adli sicil kaydı temiz olmalı ve geçerli sağlık sigortası bulunmalıdır.', 4),
('eligibility', 'eligibility_6', NULL, 'Tapu Müdürlüğü''nden resmi değerleme raporu alınması zorunludur.', 5),
('process_step', 'step_1', 'Mülk Seçimi', 'Uzman danışmanlarımızla uygunluğunuzu değerlendirin ve size özel yol haritası oluşturun.', 0),
('process_step', 'step_2', 'Satın Alma ve Tescil', 'Mülkü satın alın. Hukuki destek ve belgelendirme süreçlerini biz yönetiyoruz.', 1),
('process_step', 'step_3', 'Belge Hazırlığı', 'Pasaport, doğum belgesi, tapu ve değerleme raporu dahil tüm belgeleri toplayın.', 2),
('process_step', 'step_4', 'Vatandaşlık Onayı', 'Başvurunuzu yapın ve 3-6 ay içinde Türk vatandaşlığınızı edinin.', 3);


-- ============================================================================
-- 9. OFFICES
-- ============================================================================

INSERT INTO offices (city, address, phone, image, lat, lng, sort_order) VALUES
('Alanya', 'Oba Mah., Alanya, Antalya, Türkiye', '+90 242 XXX XXXX',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&fit=crop', 36.5432, 31.9993, 0),
('Istanbul', 'Skyland Istanbul, Türkiye', '+90 212 XXX XXXX',
  'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80&fit=crop', 41.0766, 28.9864, 1);


-- ============================================================================
-- 10. COMPANY STATS
-- ============================================================================

INSERT INTO company_stats (value, label, sort_order) VALUES
('50+', 'Uzman Danışman', 0),
('500+', 'Premium Mülk', 1),
('40+', 'Hizmet Verilen Ülke', 2),
('₺5M+', 'İşlem Hacmi', 3);


-- ============================================================================
-- 11. HERO IMAGES
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
-- 12. SITE SETTINGS
-- ============================================================================

INSERT INTO site_settings (key, value) VALUES
('brand', '"EmlakBanq"'),
('domain', '"emlakbanq.com"'),
('tagline', '"Alanya''nın Lider Gayrimenkul Danışmanlığı"'),
('social', '{"instagram":"https://instagram.com/emlakbanq","youtube":"https://youtube.com/@emlakbanq","linkedin":"https://linkedin.com/company/emlakbanq","twitter":"https://twitter.com/emlakbanq"}');
