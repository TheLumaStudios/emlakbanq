-- Migration: Convert market_highlights and top_areas_roi to JSONB multilingual
-- Created: 2026-02-18
-- Description: Converts plain text fields to JSONB for 8-language support
-- Languages: en, tr, ar, ru, de, fr, fa, hi

-- ============================================
-- 1. MARKET_HIGHLIGHTS - Convert text to JSONB
-- ============================================

-- Convert the text column from text to jsonb
ALTER TABLE market_highlights
  ALTER COLUMN text TYPE jsonb
  USING jsonb_build_object('en', text);

-- Now update with all translations
UPDATE market_highlights SET text = '{
  "en": "Dubai property transactions exceeded AED 528 billion in 2024, a record year",
  "tr": "Dubai emlak işlemleri 2024 yılında rekor kırarak 528 milyar AED''yi aştı",
  "ar": "تجاوزت معاملات العقارات في دبي 528 مليار درهم في عام 2024، وهو عام قياسي",
  "ru": "Объём сделок с недвижимостью в Дубае превысил 528 миллиардов дирхамов в 2024 году — рекордный показатель",
  "de": "Die Immobilientransaktionen in Dubai überstiegen 2024 mit 528 Milliarden AED einen Rekordwert",
  "fr": "Les transactions immobilières à Dubaï ont dépassé 528 milliards AED en 2024, une année record",
  "fa": "معاملات ملکی دبی در سال ۲۰۲۴ از ۵۲۸ میلیارد درهم فراتر رفت، یک سال بی‌سابقه",
  "hi": "दुबई संपत्ति लेनदेन 2024 में 528 अरब AED को पार कर गया, जो एक रिकॉर्ड वर्ष रहा"
}'::jsonb
WHERE sort_order = 0;

UPDATE market_highlights SET text = '{
  "en": "Off-plan sales grew 60% year-over-year, driven by international investor demand",
  "tr": "Uluslararası yatırımcı talebiyle proje aşamasındaki satışlar yıllık %60 büyüdü",
  "ar": "نمت مبيعات العقارات على الخارطة بنسبة 60% سنوياً مدفوعة بطلب المستثمرين الدوليين",
  "ru": "Продажи на стадии строительства выросли на 60% в годовом исчислении благодаря спросу международных инвесторов",
  "de": "Off-Plan-Verkäufe stiegen um 60% im Jahresvergleich, angetrieben durch internationale Investorennachfrage",
  "fr": "Les ventes sur plan ont augmenté de 60% en glissement annuel, portées par la demande des investisseurs internationaux",
  "fa": "فروش پیش‌فروش با رشد ۶۰ درصدی سالانه، ناشی از تقاضای سرمایه‌گذاران بین‌المللی",
  "hi": "अंतरराष्ट्रीय निवेशक मांग से प्रेरित होकर ऑफ-प्लान बिक्री में साल-दर-साल 60% की वृद्धि हुई"
}'::jsonb
WHERE sort_order = 1;

UPDATE market_highlights SET text = '{
  "en": "Average rental yields remain among the highest globally at 6-8%",
  "tr": "Ortalama kira getirisi %6-8 ile küresel düzeyde en yüksekler arasında kalmaya devam ediyor",
  "ar": "لا تزال عائدات الإيجار المتوسطة من بين الأعلى عالمياً بنسبة 6-8%",
  "ru": "Средняя доходность от аренды остаётся одной из самых высоких в мире — 6-8%",
  "de": "Die durchschnittlichen Mietrenditen gehören mit 6-8% weiterhin zu den höchsten weltweit",
  "fr": "Les rendements locatifs moyens restent parmi les plus élevés au monde, à 6-8%",
  "fa": "میانگین بازده اجاره با ۶ تا ۸ درصد همچنان در بالاترین سطح جهانی باقی مانده است",
  "hi": "औसत किराया प्रतिफल 6-8% पर वैश्विक स्तर पर सबसे अधिक में बना हुआ है"
}'::jsonb
WHERE sort_order = 2;

UPDATE market_highlights SET text = '{
  "en": "New visa reforms and economic diversification continue to attract long-term residents",
  "tr": "Yeni vize reformları ve ekonomik çeşitlendirme uzun vadeli yerleşimcileri çekmeye devam ediyor",
  "ar": "تستمر إصلاحات التأشيرات الجديدة والتنويع الاقتصادي في جذب المقيمين على المدى الطويل",
  "ru": "Новые визовые реформы и диверсификация экономики продолжают привлекать долгосрочных резидентов",
  "de": "Neue Visareformen und wirtschaftliche Diversifizierung ziehen weiterhin Langzeitbewohner an",
  "fr": "Les nouvelles réformes des visas et la diversification économique continuent d''attirer des résidents à long terme",
  "fa": "اصلاحات جدید ویزا و تنوع اقتصادی همچنان ساکنان بلندمدت را جذب می‌کند",
  "hi": "नई वीजा सुधार और आर्थिक विविधीकरण दीर्घकालिक निवासियों को आकर्षित करना जारी रखे हुए हैं"
}'::jsonb
WHERE sort_order = 3;

UPDATE market_highlights SET text = '{
  "en": "Prime areas saw 15-25% capital appreciation over the last 12 months",
  "tr": "Birincil bölgelerde son 12 ayda %15-25 sermaye değer artışı görüldü",
  "ar": "شهدت المناطق الرئيسية ارتفاعاً في رأس المال بنسبة 15-25% خلال الأشهر الـ 12 الماضية",
  "ru": "В премиальных районах за последние 12 месяцев рост стоимости составил 15-25%",
  "de": "Erstklassige Lagen verzeichneten in den letzten 12 Monaten eine Wertsteigerung von 15-25%",
  "fr": "Les zones prime ont connu une appréciation du capital de 15 à 25% au cours des 12 derniers mois",
  "fa": "مناطق ممتاز در ۱۲ ماه گذشته شاهد ۱۵ تا ۲۵ درصد افزایش سرمایه بودند",
  "hi": "प्रमुख क्षेत्रों में पिछले 12 महीनों में 15-25% पूंजी मूल्य वृद्धि देखी गई"
}'::jsonb
WHERE sort_order = 4;

-- ============================================
-- 2. TOP_AREAS_ROI - Convert area to JSONB
-- ============================================

-- Convert the area column from text to jsonb
ALTER TABLE top_areas_roi
  ALTER COLUMN area TYPE jsonb
  USING jsonb_build_object('en', area);

-- Update with all translations
UPDATE top_areas_roi SET area = '{
  "en": "Jumeirah Village Circle",
  "tr": "Jumeirah Village Circle",
  "ar": "قرية جميرا الدائرية",
  "ru": "Джумейра Вилладж Сёркл",
  "de": "Jumeirah Village Circle",
  "fr": "Jumeirah Village Circle",
  "fa": "جمیرا ویلج سیرکل",
  "hi": "जुमेराह विलेज सर्कल"
}'::jsonb
WHERE sort_order = 0;

UPDATE top_areas_roi SET area = '{
  "en": "Dubai Creek Harbour",
  "tr": "Dubai Creek Harbour",
  "ar": "ميناء خور دبي",
  "ru": "Дубай Крик Харбор",
  "de": "Dubai Creek Harbour",
  "fr": "Dubai Creek Harbour",
  "fa": "بندر کریک دبی",
  "hi": "दुबई क्रीक हार्बर"
}'::jsonb
WHERE sort_order = 1;

UPDATE top_areas_roi SET area = '{
  "en": "Business Bay",
  "tr": "Business Bay",
  "ar": "الخليج التجاري",
  "ru": "Бизнес Бей",
  "de": "Business Bay",
  "fr": "Business Bay",
  "fa": "بیزینس بی",
  "hi": "बिजनेस बे"
}'::jsonb
WHERE sort_order = 2;

UPDATE top_areas_roi SET area = '{
  "en": "Dubai Hills Estate",
  "tr": "Dubai Hills Estate",
  "ar": "دبي هيلز استيت",
  "ru": "Дубай Хиллс Эстейт",
  "de": "Dubai Hills Estate",
  "fr": "Dubai Hills Estate",
  "fa": "دبی هیلز استیت",
  "hi": "दुबई हिल्स एस्टेट"
}'::jsonb
WHERE sort_order = 3;

UPDATE top_areas_roi SET area = '{
  "en": "Dubai Marina",
  "tr": "Dubai Marina",
  "ar": "دبي مارينا",
  "ru": "Дубай Марина",
  "de": "Dubai Marina",
  "fr": "Dubai Marina",
  "fa": "دبی مارینا",
  "hi": "दुबई मरीना"
}'::jsonb
WHERE sort_order = 4;

UPDATE top_areas_roi SET area = '{
  "en": "JBR",
  "tr": "JBR",
  "ar": "شاطئ جميرا ريزيدنس",
  "ru": "ДжБиАр",
  "de": "JBR",
  "fr": "JBR",
  "fa": "جی‌بی‌آر",
  "hi": "जेबीआर"
}'::jsonb
WHERE sort_order = 5;

UPDATE top_areas_roi SET area = '{
  "en": "Downtown Dubai",
  "tr": "Downtown Dubai",
  "ar": "وسط مدينة دبي",
  "ru": "Даунтаун Дубай",
  "de": "Downtown Dubai",
  "fr": "Centre-ville de Dubaï",
  "fa": "داون‌تاون دبی",
  "hi": "डाउनटाउन दुबई"
}'::jsonb
WHERE sort_order = 6;

UPDATE top_areas_roi SET area = '{
  "en": "Palm Jumeirah",
  "tr": "Palm Jumeirah",
  "ar": "نخلة جميرا",
  "ru": "Пальм Джумейра",
  "de": "Palm Jumeirah",
  "fr": "Palm Jumeirah",
  "fa": "پالم جمیرا",
  "hi": "पाम जुमेराह"
}'::jsonb
WHERE sort_order = 7;
