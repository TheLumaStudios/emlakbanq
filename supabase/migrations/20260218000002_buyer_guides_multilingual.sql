-- Migration: Convert buyer_guides text fields to JSONB multilingual
-- Created: 2026-02-18
-- Description: Converts title, description, tag, read_time to JSONB for 8-language support
-- Languages: en, tr, ar, ru, de, fr, fa, hi

-- ============================================
-- 1. Convert columns from text to jsonb
-- ============================================

ALTER TABLE buyer_guides
  ALTER COLUMN title TYPE jsonb USING jsonb_build_object('en', title);

ALTER TABLE buyer_guides
  ALTER COLUMN description TYPE jsonb USING jsonb_build_object('en', description);

ALTER TABLE buyer_guides
  ALTER COLUMN tag TYPE jsonb USING jsonb_build_object('en', tag);

ALTER TABLE buyer_guides
  ALTER COLUMN read_time TYPE jsonb USING jsonb_build_object('en', read_time);

-- ============================================
-- 2. Update with all translations
-- ============================================

-- Guide 1: Complete Buyer's Guide
UPDATE buyer_guides SET
  title = '{
    "en": "Complete Buyer''s Guide to Dubai Real Estate",
    "tr": "Dubai Gayrimenkulüne Eksiksiz Alıcı Rehberi",
    "ar": "الدليل الشامل لشراء العقارات في دبي",
    "ru": "Полное руководство покупателя недвижимости в Дубае",
    "de": "Vollständiger Käuferleitfaden für Immobilien in Dubai",
    "fr": "Guide complet de l''acheteur immobilier à Dubaï",
    "fa": "راهنمای کامل خرید ملک در دبی",
    "hi": "दुबई रियल एस्टेट के लिए संपूर्ण खरीदार गाइड"
  }'::jsonb,
  description = '{
    "en": "Everything you need to know about purchasing property in Dubai -- from choosing the right area to completing your transaction with confidence.",
    "tr": "Dubai''da mülk satın alma hakkında bilmeniz gereken her şey -- doğru bölge seçiminden işleminizi güvenle tamamlamaya kadar.",
    "ar": "كل ما تحتاج معرفته حول شراء العقارات في دبي -- من اختيار المنطقة المناسبة إلى إتمام معاملتك بثقة.",
    "ru": "Всё, что нужно знать о покупке недвижимости в Дубае — от выбора района до уверенного завершения сделки.",
    "de": "Alles, was Sie über den Immobilienkauf in Dubai wissen müssen — von der Wahl des richtigen Gebiets bis zum sicheren Abschluss Ihrer Transaktion.",
    "fr": "Tout ce que vous devez savoir sur l''achat immobilier à Dubaï — du choix du quartier à la finalisation de votre transaction en toute confiance.",
    "fa": "همه آنچه باید درباره خرید ملک در دبی بدانید -- از انتخاب منطقه مناسب تا تکمیل معامله با اطمینان.",
    "hi": "दुबई में संपत्ति खरीदने के बारे में वह सब कुछ जो आपको जानना चाहिए -- सही क्षेत्र चुनने से लेकर आत्मविश्वास के साथ अपना लेनदेन पूरा करने तक।"
  }'::jsonb,
  tag = '{
    "en": "Essential",
    "tr": "Temel",
    "ar": "أساسي",
    "ru": "Основное",
    "de": "Grundlegend",
    "fr": "Essentiel",
    "fa": "ضروری",
    "hi": "आवश्यक"
  }'::jsonb,
  read_time = '{
    "en": "15 min read",
    "tr": "15 dk okuma",
    "ar": "15 دقيقة قراءة",
    "ru": "15 мин чтения",
    "de": "15 Min. Lesezeit",
    "fr": "15 min de lecture",
    "fa": "۱۵ دقیقه مطالعه",
    "hi": "15 मिनट पढ़ने का समय"
  }'::jsonb
WHERE slug = 'complete-buyers-guide';

-- Guide 2: First-Time Buyer Tips
UPDATE buyer_guides SET
  title = '{
    "en": "First-Time Buyer Tips for the Dubai Market",
    "tr": "Dubai Piyasası İçin İlk Kez Alıcı İpuçları",
    "ar": "نصائح للمشتري لأول مرة في سوق دبي",
    "ru": "Советы для начинающих покупателей на рынке Дубая",
    "de": "Tipps für Erstkäufer auf dem Immobilienmarkt in Dubai",
    "fr": "Conseils pour les primo-accédants sur le marché de Dubaï",
    "fa": "نکات خرید برای اولین بار در بازار دبی",
    "hi": "दुबई बाजार के लिए पहली बार खरीदार सुझाव"
  }'::jsonb,
  description = '{
    "en": "New to Dubai property? Avoid common pitfalls and learn the insider strategies that experienced investors use to maximise returns.",
    "tr": "Dubai''da mülk alımında yeni misiniz? Yaygın tuzaklardan kaçının ve deneyimli yatırımcıların getirilerini en üst düzeye çıkarmak için kullandığı stratejileri öğrenin.",
    "ar": "جديد في عقارات دبي؟ تجنب الأخطاء الشائعة وتعلم الاستراتيجيات التي يستخدمها المستثمرون المحترفون لتعظيم العوائد.",
    "ru": "Впервые на рынке недвижимости Дубая? Избегайте типичных ошибок и изучите стратегии опытных инвесторов для максимизации прибыли.",
    "de": "Neu auf dem Immobilienmarkt in Dubai? Vermeiden Sie häufige Fehler und lernen Sie die Strategien erfahrener Investoren zur Maximierung der Rendite.",
    "fr": "Nouveau dans l''immobilier à Dubaï ? Évitez les pièges courants et découvrez les stratégies que les investisseurs expérimentés utilisent pour maximiser les rendements.",
    "fa": "تازه‌وارد بازار ملک دبی هستید؟ از اشتباهات رایج دوری کنید و استراتژی‌های سرمایه‌گذاران باتجربه را بیاموزید.",
    "hi": "दुबई संपत्ति में नए हैं? सामान्य गलतियों से बचें और अनुभवी निवेशकों की रणनीतियां सीखें।"
  }'::jsonb,
  tag = '{
    "en": "Beginner",
    "tr": "Başlangıç",
    "ar": "مبتدئ",
    "ru": "Начинающим",
    "de": "Anfänger",
    "fr": "Débutant",
    "fa": "مبتدی",
    "hi": "शुरुआती"
  }'::jsonb,
  read_time = '{
    "en": "10 min read",
    "tr": "10 dk okuma",
    "ar": "10 دقائق قراءة",
    "ru": "10 мин чтения",
    "de": "10 Min. Lesezeit",
    "fr": "10 min de lecture",
    "fa": "۱۰ دقیقه مطالعه",
    "hi": "10 मिनट पढ़ने का समय"
  }'::jsonb
WHERE slug = 'first-time-buyer-tips';

-- Guide 3: Mortgage & Finance
UPDATE buyer_guides SET
  title = '{
    "en": "Mortgage & Finance Options in the UAE",
    "tr": "BAE''de İpotek ve Finansman Seçenekleri",
    "ar": "خيارات الرهن العقاري والتمويل في الإمارات",
    "ru": "Ипотека и финансирование в ОАЭ",
    "de": "Hypotheken- und Finanzierungsoptionen in den VAE",
    "fr": "Options de prêt hypothécaire et de financement aux EAU",
    "fa": "گزینه‌های وام مسکن و تأمین مالی در امارات",
    "hi": "UAE में बंधक और वित्त विकल्प"
  }'::jsonb,
  description = '{
    "en": "Navigate UAE mortgage regulations, compare rates from leading banks, and understand the financing options available to residents and non-residents alike.",
    "tr": "BAE ipotek düzenlemelerini anlayın, önde gelen bankalardan oranları karşılaştırın ve yerleşiklere ve yabancılara sunulan finansman seçeneklerini keşfedin.",
    "ar": "تعرف على لوائح الرهن العقاري في الإمارات، وقارن الأسعار من البنوك الرائدة، وافهم خيارات التمويل المتاحة للمقيمين وغير المقيمين.",
    "ru": "Изучите ипотечное законодательство ОАЭ, сравните ставки ведущих банков и узнайте о доступных вариантах финансирования для резидентов и нерезидентов.",
    "de": "Navigieren Sie durch die Hypothekenvorschriften der VAE, vergleichen Sie Zinssätze führender Banken und verstehen Sie die verfügbaren Finanzierungsoptionen.",
    "fr": "Naviguez dans les réglementations hypothécaires des EAU, comparez les taux des banques leaders et comprenez les options de financement disponibles.",
    "fa": "قوانین وام مسکن امارات را بررسی کنید، نرخ‌های بانک‌های پیشرو را مقایسه کنید و گزینه‌های تأمین مالی موجود را درک کنید.",
    "hi": "UAE बंधक नियमों को समझें, प्रमुख बैंकों की दरों की तुलना करें और निवासियों और गैर-निवासियों के लिए उपलब्ध वित्तपोषण विकल्प जानें।"
  }'::jsonb,
  tag = '{
    "en": "Finance",
    "tr": "Finans",
    "ar": "تمويل",
    "ru": "Финансы",
    "de": "Finanzen",
    "fr": "Finance",
    "fa": "مالی",
    "hi": "वित्त"
  }'::jsonb,
  read_time = '{
    "en": "12 min read",
    "tr": "12 dk okuma",
    "ar": "12 دقيقة قراءة",
    "ru": "12 мин чтения",
    "de": "12 Min. Lesezeit",
    "fr": "12 min de lecture",
    "fa": "۱۲ دقیقه مطالعه",
    "hi": "12 मिनट पढ़ने का समय"
  }'::jsonb
WHERE slug = 'mortgage-and-finance';

-- Guide 4: Legal Framework
UPDATE buyer_guides SET
  title = '{
    "en": "Legal Framework for Foreign Property Owners",
    "tr": "Yabancı Mülk Sahipleri İçin Yasal Çerçeve",
    "ar": "الإطار القانوني لملاك العقارات الأجانب",
    "ru": "Правовая база для иностранных владельцев недвижимости",
    "de": "Rechtsrahmen für ausländische Immobilieneigentümer",
    "fr": "Cadre juridique pour les propriétaires étrangers",
    "fa": "چارچوب حقوقی برای مالکان خارجی املاک",
    "hi": "विदेशी संपत्ति मालिकों के लिए कानूनी ढांचा"
  }'::jsonb,
  description = '{
    "en": "Understand freehold vs. leasehold zones, RERA regulations, escrow protections, and your legal rights as a foreign property owner in Dubai.",
    "tr": "Tam mülkiyet ve kiralık bölgeler arasındaki farkları, RERA düzenlemelerini, emanet korumalarını ve Dubai''da yabancı mülk sahibi olarak yasal haklarınızı anlayın.",
    "ar": "افهم مناطق التملك الحر مقابل الإيجار، ولوائح ريرا، وحماية الضمان، وحقوقك القانونية كمالك عقار أجنبي في دبي.",
    "ru": "Разберитесь в зонах фрихолд и лизхолд, регулировании RERA, защите эскроу и ваших правах как иностранного владельца недвижимости в Дубае.",
    "de": "Verstehen Sie Freehold- vs. Leasehold-Zonen, RERA-Vorschriften, Treuhandschutz und Ihre Rechte als ausländischer Immobilieneigentümer in Dubai.",
    "fr": "Comprenez les zones en pleine propriété vs. bail, les réglementations RERA, les protections séquestre et vos droits en tant que propriétaire étranger à Dubaï.",
    "fa": "تفاوت مناطق مالکیت آزاد و اجاره‌ای، قوانین ریرا، حمایت‌های امانی و حقوق قانونی شما به عنوان مالک خارجی ملک در دبی را درک کنید.",
    "hi": "फ्रीहोल्ड बनाम लीजहोल्ड ज़ोन, RERA नियम, एस्क्रो सुरक्षा और दुबई में विदेशी संपत्ति मालिक के रूप में आपके कानूनी अधिकारों को समझें।"
  }'::jsonb,
  tag = '{
    "en": "Legal",
    "tr": "Hukuki",
    "ar": "قانوني",
    "ru": "Юридическое",
    "de": "Rechtlich",
    "fr": "Juridique",
    "fa": "حقوقی",
    "hi": "कानूनी"
  }'::jsonb,
  read_time = '{
    "en": "14 min read",
    "tr": "14 dk okuma",
    "ar": "14 دقيقة قراءة",
    "ru": "14 мин чтения",
    "de": "14 Min. Lesezeit",
    "fr": "14 min de lecture",
    "fa": "۱۴ دقیقه مطالعه",
    "hi": "14 मिनट पढ़ने का समय"
  }'::jsonb
WHERE slug = 'legal-framework';

-- Guide 5: Off-Plan Guide
UPDATE buyer_guides SET
  title = '{
    "en": "Off-Plan Property Investment Guide",
    "tr": "Proje Aşamasında Gayrimenkul Yatırım Rehberi",
    "ar": "دليل الاستثمار في العقارات على الخارطة",
    "ru": "Руководство по инвестициям в строящуюся недвижимость",
    "de": "Leitfaden für Off-Plan-Immobilieninvestitionen",
    "fr": "Guide d''investissement immobilier sur plan",
    "fa": "راهنمای سرمایه‌گذاری در املاک پیش‌فروش",
    "hi": "ऑफ-प्लान संपत्ति निवेश गाइड"
  }'::jsonb,
  description = '{
    "en": "Learn how to evaluate off-plan opportunities, assess developer credibility, understand payment plans, and manage risk for maximum capital appreciation.",
    "tr": "Proje aşamasındaki fırsatları değerlendirmeyi, geliştirici güvenilirliğini ölçmeyi, ödeme planlarını anlamayı ve maksimum sermaye artışı için risk yönetimini öğrenin.",
    "ar": "تعلم كيفية تقييم فرص العقارات على الخارطة، وتقييم مصداقية المطور، وفهم خطط الدفع، وإدارة المخاطر لتحقيق أقصى عائد.",
    "ru": "Научитесь оценивать возможности строящейся недвижимости, проверять надёжность застройщиков, разбираться в планах оплаты и управлять рисками.",
    "de": "Lernen Sie, Off-Plan-Chancen zu bewerten, die Glaubwürdigkeit von Entwicklern einzuschätzen, Zahlungspläne zu verstehen und Risiken zu managen.",
    "fr": "Apprenez à évaluer les opportunités sur plan, à vérifier la crédibilité des promoteurs, à comprendre les plans de paiement et à gérer les risques.",
    "fa": "نحوه ارزیابی فرصت‌های پیش‌فروش، اعتبارسنجی سازنده، درک طرح‌های پرداخت و مدیریت ریسک برای حداکثر سود سرمایه را بیاموزید.",
    "hi": "ऑफ-प्लान अवसरों का मूल्यांकन, डेवलपर विश्वसनीयता, भुगतान योजनाओं को समझना और अधिकतम पूंजी वृद्धि के लिए जोखिम प्रबंधन सीखें।"
  }'::jsonb,
  tag = '{
    "en": "Investment",
    "tr": "Yatırım",
    "ar": "استثمار",
    "ru": "Инвестиции",
    "de": "Investition",
    "fr": "Investissement",
    "fa": "سرمایه‌گذاری",
    "hi": "निवेश"
  }'::jsonb,
  read_time = '{
    "en": "11 min read",
    "tr": "11 dk okuma",
    "ar": "11 دقيقة قراءة",
    "ru": "11 мин чтения",
    "de": "11 Min. Lesezeit",
    "fr": "11 min de lecture",
    "fa": "۱۱ دقیقه مطالعه",
    "hi": "11 मिनट पढ़ने का समय"
  }'::jsonb
WHERE slug = 'off-plan-guide';

-- Guide 6: Property Tax & Fees
UPDATE buyer_guides SET
  title = '{
    "en": "Property Tax & Fees Breakdown",
    "tr": "Emlak Vergisi ve Ücretlerin Dökümü",
    "ar": "تفصيل ضرائب ورسوم العقارات",
    "ru": "Разбор налогов и сборов на недвижимость",
    "de": "Aufschlüsselung von Immobiliensteuern und Gebühren",
    "fr": "Détail des taxes et frais immobiliers",
    "fa": "تفکیک مالیات و هزینه‌های ملکی",
    "hi": "संपत्ति कर और शुल्क विवरण"
  }'::jsonb,
  description = '{
    "en": "A transparent breakdown of all costs involved in buying Dubai property -- DLD fees, agent commissions, NOC charges, service charges, and more.",
    "tr": "Dubai''da mülk satın alırken karşılaşacağınız tüm maliyetlerin şeffaf dökümü -- DLD ücretleri, acente komisyonları, NOC masrafları, hizmet bedelleri ve daha fazlası.",
    "ar": "تحليل شفاف لجميع التكاليف المتعلقة بشراء العقارات في دبي -- رسوم دائرة الأراضي، عمولات الوكلاء، رسوم شهادة عدم الممانعة، رسوم الخدمات والمزيد.",
    "ru": "Прозрачный разбор всех расходов при покупке недвижимости в Дубае — сборы DLD, комиссии агентов, платежи NOC, сервисные сборы и другое.",
    "de": "Eine transparente Aufschlüsselung aller Kosten beim Immobilienkauf in Dubai — DLD-Gebühren, Maklerprovisionen, NOC-Gebühren, Servicegebühren und mehr.",
    "fr": "Un détail transparent de tous les coûts liés à l''achat immobilier à Dubaï — frais DLD, commissions d''agents, frais NOC, charges de service et plus.",
    "fa": "تفکیک شفاف تمام هزینه‌های مرتبط با خرید ملک در دبی -- هزینه‌های DLD، کمیسیون نماینده، هزینه‌های NOC، هزینه‌های خدمات و موارد دیگر.",
    "hi": "दुबई संपत्ति खरीदने में शामिल सभी लागतों का पारदर्शी विवरण -- DLD शुल्क, एजेंट कमीशन, NOC शुल्क, सेवा शुल्क और अधिक।"
  }'::jsonb,
  tag = '{
    "en": "Tax & Fees",
    "tr": "Vergi ve Ücretler",
    "ar": "الضرائب والرسوم",
    "ru": "Налоги и сборы",
    "de": "Steuern & Gebühren",
    "fr": "Taxes & Frais",
    "fa": "مالیات و هزینه‌ها",
    "hi": "कर और शुल्क"
  }'::jsonb,
  read_time = '{
    "en": "8 min read",
    "tr": "8 dk okuma",
    "ar": "8 دقائق قراءة",
    "ru": "8 мин чтения",
    "de": "8 Min. Lesezeit",
    "fr": "8 min de lecture",
    "fa": "۸ دقیقه مطالعه",
    "hi": "8 मिनट पढ़ने का समय"
  }'::jsonb
WHERE slug = 'property-tax-and-fees';
