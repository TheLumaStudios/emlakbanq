const SUPABASE_URL = 'https://ycrlkkkoxrsmugidznri.supabase.co'
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inljcmxra2tveHJzbXVnaWR6bnJpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTE3MzEyOSwiZXhwIjoyMDg2NzQ5MTI5fQ.ZfgE4FEPU2p13nJC3np9OUOuBJeKqUDUYF0nka57ihc'

async function updateGuide(slug, content) {
  const url = `${SUPABASE_URL}/rest/v1/buyer_guides?slug=eq.${slug}`
  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'Prefer': 'return=minimal',
    },
    body: JSON.stringify({ content }),
  })
  if (!res.ok) {
    const text = await res.text()
    console.error(`FAILED ${slug}: ${res.status} ${text}`)
  } else {
    console.log(`OK ${slug}`)
  }
}

const guides = {
  'complete-buyers-guide': {
    tr: `<h2>Alanya'da Gayrimenkul Satın Alma Rehberi</h2>
<p>Alanya, Türkiye'nin Akdeniz kıyısında yer alan, yabancı yatırımcılar için en popüler gayrimenkul destinasyonlarından biridir. Bu kapsamlı rehber, Alanya'da mülk satın alma sürecinin her aşamasında size yol gösterecektir.</p>

<h3>1. Neden Alanya?</h3>
<p>Alanya, yılda 300 günü aşan güneşli havası, turkuaz denizi, zengin tarihi ve modern altyapısıyla hem yaşamak hem de yatırım yapmak için ideal bir şehirdir. Son yıllarda gayrimenkul fiyatlarındaki istikrarlı artış, Alanya'yı uluslararası yatırımcılar için cazip kılmaktadır.</p>
<ul>
  <li>Yılda ortalama %15-25 değer artışı</li>
  <li>Güçlü kira getirisi potansiyeli (%6-9 brüt)</li>
  <li>Türk vatandaşlığı için uygun mülk yatırımı imkanı</li>
  <li>Düşük yaşam maliyeti ve yüksek yaşam kalitesi</li>
</ul>

<h3>2. Satın Alma Süreci</h3>
<p>Alanya'da gayrimenkul satın alma süreci, doğru adımlar takip edildiğinde oldukça basittir:</p>
<ol>
  <li><strong>Mülk Araştırması:</strong> İhtiyaçlarınıza ve bütçenize uygun mülkleri belirleyin</li>
  <li><strong>Yerinde İnceleme:</strong> Mülkleri bizzat veya sanal tur ile inceleyin</li>
  <li><strong>Fiyat Müzakeresi:</strong> Satıcı ile fiyat ve ödeme koşullarını görüşün</li>
  <li><strong>Ön Sözleşme:</strong> Kapora ödeyerek mülkü rezerve edin</li>
  <li><strong>Askeri İzin:</strong> Yabancı alıcılar için askeri izin süreci (ortalama 1-4 hafta)</li>
  <li><strong>Tapu Devri:</strong> Tapu ve Kadastro Müdürlüğü'nde resmi devir işlemi</li>
</ol>

<h3>3. Gerekli Belgeler</h3>
<ul>
  <li>Geçerli pasaport ve noter tasdikli tercümesi</li>
  <li>Vergi numarası (Türk vergi dairesinden alınır)</li>
  <li>Banka hesap bilgileri</li>
  <li>Biometrik fotoğraflar (2 adet)</li>
  <li>Mülk değerleme raporu (SPK lisanslı eksper)</li>
</ul>

<h3>4. Maliyetler ve Vergiler</h3>
<p>Mülk satın alma sürecinde karşılaşacağınız ek maliyetler:</p>
<ul>
  <li><strong>Tapu Harcı:</strong> Mülk değerinin %4'ü</li>
  <li><strong>Döner Sermaye:</strong> Yaklaşık ₺3.000-5.000</li>
  <li><strong>Deprem Sigortası (DASK):</strong> Yıllık ₺500-1.500</li>
  <li><strong>Noter ve Tercüme Masrafları:</strong> Yaklaşık ₺2.000-4.000</li>
</ul>

<h3>5. EmlakBanq ile Avantajlarınız</h3>
<p>EmlakBanq olarak, satın alma sürecinizin her aşamasında yanınızdayız. Ücretsiz danışmanlık, hukuki destek, vergi numarası alma, banka hesabı açma ve tapu devri işlemlerinde tam destek sağlıyoruz.</p>`,

    en: `<h2>Complete Guide to Buying Property in Alanya</h2>
<p>Alanya, located on Turkey's Mediterranean coast, is one of the most popular real estate destinations for international investors. This comprehensive guide will walk you through every stage of the property buying process in Alanya.</p>

<h3>1. Why Alanya?</h3>
<p>With over 300 sunny days per year, turquoise waters, rich history, and modern infrastructure, Alanya is ideal for both living and investing. Steady property price appreciation in recent years has made Alanya highly attractive to international investors.</p>
<ul>
  <li>Average annual price appreciation of 15-25%</li>
  <li>Strong rental yield potential (6-9% gross)</li>
  <li>Eligible property investment for Turkish citizenship</li>
  <li>Low cost of living with high quality of life</li>
</ul>

<h3>2. The Buying Process</h3>
<p>Purchasing property in Alanya is straightforward when you follow the right steps:</p>
<ol>
  <li><strong>Property Research:</strong> Identify properties matching your needs and budget</li>
  <li><strong>Site Inspection:</strong> View properties in person or via virtual tours</li>
  <li><strong>Price Negotiation:</strong> Discuss price and payment terms with the seller</li>
  <li><strong>Preliminary Contract:</strong> Reserve the property with a deposit</li>
  <li><strong>Military Clearance:</strong> Foreign buyers require military clearance (typically 1-4 weeks)</li>
  <li><strong>Title Deed Transfer:</strong> Official transfer at the Land Registry Office</li>
</ol>

<h3>3. Required Documents</h3>
<ul>
  <li>Valid passport with notarized Turkish translation</li>
  <li>Tax identification number (obtained from Turkish tax office)</li>
  <li>Bank account details</li>
  <li>Biometric photographs (2 copies)</li>
  <li>Property valuation report (licensed appraiser)</li>
</ul>

<h3>4. Costs and Taxes</h3>
<p>Additional costs you'll encounter during the purchase:</p>
<ul>
  <li><strong>Title Deed Fee:</strong> 4% of the property value</li>
  <li><strong>Revolving Fund Fee:</strong> Approximately ₺3,000-5,000</li>
  <li><strong>Earthquake Insurance (DASK):</strong> Annual ₺500-1,500</li>
  <li><strong>Notary and Translation Fees:</strong> Approximately ₺2,000-4,000</li>
</ul>

<h3>5. Your Advantages with EmlakBanq</h3>
<p>At EmlakBanq, we support you at every stage of your purchase. We provide free consultation, legal support, tax number acquisition, bank account opening, and full assistance with title deed transfer.</p>`,

    de: `<h2>Vollständiger Leitfaden zum Immobilienkauf in Alanya</h2>
<p>Alanya an der türkischen Mittelmeerküste ist eines der beliebtesten Immobilienziele für internationale Investoren. Dieser umfassende Leitfaden führt Sie durch jede Phase des Immobilienkaufprozesses in Alanya.</p>

<h3>1. Warum Alanya?</h3>
<p>Mit über 300 Sonnentagen im Jahr, türkisfarbenem Wasser, reicher Geschichte und moderner Infrastruktur ist Alanya ideal zum Leben und Investieren. Die stetige Preissteigerung in den letzten Jahren macht Alanya für internationale Investoren sehr attraktiv.</p>
<ul>
  <li>Durchschnittliche jährliche Wertsteigerung von 15-25%</li>
  <li>Starkes Mietrenditepotenzial (6-9% brutto)</li>
  <li>Qualifizierende Immobilieninvestition für die türkische Staatsbürgerschaft</li>
  <li>Niedrige Lebenshaltungskosten bei hoher Lebensqualität</li>
</ul>

<h3>2. Der Kaufprozess</h3>
<p>Der Immobilienkauf in Alanya ist unkompliziert, wenn Sie die richtigen Schritte befolgen:</p>
<ol>
  <li><strong>Immobilienrecherche:</strong> Identifizieren Sie passende Immobilien</li>
  <li><strong>Besichtigung:</strong> Besichtigen Sie Immobilien persönlich oder virtuell</li>
  <li><strong>Preisverhandlung:</strong> Besprechen Sie Preis und Zahlungsbedingungen</li>
  <li><strong>Vorvertrag:</strong> Reservieren Sie die Immobilie mit einer Anzahlung</li>
  <li><strong>Militärische Freigabe:</strong> Für ausländische Käufer erforderlich (1-4 Wochen)</li>
  <li><strong>Eigentumsübertragung:</strong> Offizielle Übertragung beim Grundbuchamt</li>
</ol>

<h3>3. Erforderliche Dokumente</h3>
<ul>
  <li>Gültiger Reisepass mit notariell beglaubigter türkischer Übersetzung</li>
  <li>Steueridentifikationsnummer (vom türkischen Finanzamt)</li>
  <li>Bankverbindung</li>
  <li>Biometrische Fotos (2 Stück)</li>
  <li>Immobilienbewertungsbericht (lizenzierter Gutachter)</li>
</ul>

<h3>4. Kosten und Steuern</h3>
<ul>
  <li><strong>Grundbuchgebühr:</strong> 4% des Immobilienwertes</li>
  <li><strong>Umlauffondsgebühr:</strong> Ca. ₺3.000-5.000</li>
  <li><strong>Erdbebenversicherung (DASK):</strong> Jährlich ₺500-1.500</li>
  <li><strong>Notar- und Übersetzungskosten:</strong> Ca. ₺2.000-4.000</li>
</ul>

<h3>5. Ihre Vorteile mit EmlakBanq</h3>
<p>Bei EmlakBanq unterstützen wir Sie in jeder Phase Ihres Kaufs. Wir bieten kostenlose Beratung, rechtliche Unterstützung, Steuerregistrierung, Kontoeröffnung und vollständige Hilfe bei der Eigentumsübertragung.</p>`,

    ru: `<h2>Полное руководство по покупке недвижимости в Аланье</h2>
<p>Аланья, расположенная на средиземноморском побережье Турции, является одним из самых популярных направлений для международных инвесторов в недвижимость. Это руководство проведёт вас через каждый этап процесса покупки.</p>

<h3>1. Почему Аланья?</h3>
<p>Более 300 солнечных дней в году, бирюзовые воды, богатая история и современная инфраструктура делают Аланью идеальной для жизни и инвестиций.</p>
<ul>
  <li>Средний ежегодный рост цен 15-25%</li>
  <li>Высокий потенциал арендной доходности (6-9% брутто)</li>
  <li>Возможность получения турецкого гражданства через инвестиции</li>
  <li>Низкая стоимость жизни при высоком качестве</li>
</ul>

<h3>2. Процесс покупки</h3>
<ol>
  <li><strong>Поиск недвижимости:</strong> Определите объекты, соответствующие вашим потребностям</li>
  <li><strong>Осмотр:</strong> Посетите объекты лично или виртуально</li>
  <li><strong>Переговоры о цене:</strong> Обсудите цену и условия оплаты</li>
  <li><strong>Предварительный договор:</strong> Забронируйте объект с задатком</li>
  <li><strong>Военное разрешение:</strong> Для иностранцев (обычно 1-4 недели)</li>
  <li><strong>Передача права собственности:</strong> Официальная регистрация в Кадастровом управлении</li>
</ol>

<h3>3. Необходимые документы</h3>
<ul>
  <li>Действующий паспорт с нотариально заверенным переводом</li>
  <li>Налоговый номер (получается в налоговой инспекции Турции)</li>
  <li>Банковские реквизиты</li>
  <li>Биометрические фотографии (2 шт.)</li>
  <li>Отчёт об оценке недвижимости</li>
</ul>

<h3>4. Расходы и налоги</h3>
<ul>
  <li><strong>Пошлина за ТАПУ:</strong> 4% от стоимости</li>
  <li><strong>Оборотный фонд:</strong> Примерно ₺3.000-5.000</li>
  <li><strong>Страхование от землетрясений (DASK):</strong> ₺500-1.500/год</li>
  <li><strong>Нотариальные и переводческие расходы:</strong> Примерно ₺2.000-4.000</li>
</ul>

<h3>5. Ваши преимущества с EmlakBanq</h3>
<p>EmlakBanq поддерживает вас на каждом этапе покупки: бесплатные консультации, юридическая поддержка, получение налогового номера, открытие банковского счёта и полное сопровождение при передаче права собственности.</p>`,

    bs: `<h2>Kompletni vodič za kupovinu nekretnina u Alanji</h2>
<p>Alanja, smještena na mediteranskoj obali Turske, jedno je od najpopularnijih odredišta za međunarodne investitore u nekretnine. Ovaj sveobuhvatni vodič će vas provesti kroz svaku fazu procesa kupovine.</p>

<h3>1. Zašto Alanja?</h3>
<p>Sa više od 300 sunčanih dana godišnje, tirkiznim morem, bogatom historijom i modernom infrastrukturom, Alanja je idealna za život i investiranje.</p>
<ul>
  <li>Prosječni godišnji rast cijena 15-25%</li>
  <li>Jak potencijal prinosa od iznajmljivanja (6-9% bruto)</li>
  <li>Mogućnost sticanja turskog državljanstva kroz investiciju</li>
  <li>Niski troškovi života uz visok kvalitet</li>
</ul>

<h3>2. Proces kupovine</h3>
<ol>
  <li><strong>Istraživanje:</strong> Identifikujte nekretnine prema vašim potrebama</li>
  <li><strong>Pregled:</strong> Posjetite nekretnine lično ili virtualno</li>
  <li><strong>Pregovaranje o cijeni:</strong> Dogovorite cijenu i uslove plaćanja</li>
  <li><strong>Prethodni ugovor:</strong> Rezervišite nekretninu s depozitom</li>
  <li><strong>Vojna dozvola:</strong> Za strane kupce (obično 1-4 sedmice)</li>
  <li><strong>Prijenos vlasništva:</strong> Službena registracija u Katastarskom uredu</li>
</ol>

<h3>3. Potrebni dokumenti</h3>
<ul>
  <li>Važeći pasoš s ovjerenim prijevodom</li>
  <li>Poreski identifikacioni broj</li>
  <li>Bankovni podaci</li>
  <li>Biometrijske fotografije (2 kom.)</li>
  <li>Izvještaj o procjeni nekretnine</li>
</ul>

<h3>4. Troškovi i porezi</h3>
<ul>
  <li><strong>Naknada za tapiju:</strong> 4% vrijednosti nekretnine</li>
  <li><strong>Fond za obrt:</strong> Oko ₺3.000-5.000</li>
  <li><strong>Osiguranje od zemljotresa (DASK):</strong> ₺500-1.500/godišnje</li>
  <li><strong>Notarski i prevoditeljski troškovi:</strong> Oko ₺2.000-4.000</li>
</ul>

<h3>5. Vaše prednosti s EmlakBanq</h3>
<p>EmlakBanq vas podržava u svakoj fazi kupovine: besplatne konsultacije, pravna podrška, dobijanje poreskog broja, otvaranje bankovnog računa i potpuna pomoć pri prijenosu vlasništva.</p>`,
  },

  'first-time-buyer-tips': {
    tr: `<h2>İlk Kez Alıcılar İçin Rehber</h2>
<p>Alanya'da ilk mülkünüzü satın almak heyecan verici bir deneyimdir. Bu rehber, ilk kez alıcılara özel ipuçları ve dikkat edilmesi gereken noktaları sunar.</p>

<h3>Doğru Bölgeyi Seçin</h3>
<p>Alanya'nın her bölgesinin kendine özgü karakteri vardır. Yaşam tarzınıza ve bütçenize göre doğru bölgeyi seçmek, yatırımınızın başarısının anahtarıdır.</p>
<ul>
  <li><strong>Mahmutlar:</strong> Uygun fiyatlı, denize yakın, uluslararası topluluk</li>
  <li><strong>Oba:</strong> Prestijli, şehir merkezine yakın, yeşil alan</li>
  <li><strong>Kleopatra:</strong> Plaj yaşamı, canlı gece hayatı, merkezi konum</li>
  <li><strong>Kestel:</strong> Huzurlu, aile dostu, panoramik deniz manzarası</li>
</ul>

<h3>Bütçenizi Planlayın</h3>
<p>Mülk fiyatının yanı sıra ek maliyetleri de hesaba katın:</p>
<ul>
  <li>Tapu harcı (%4)</li>
  <li>Emlak komisyonu (genellikle alıcıdan alınmaz)</li>
  <li>Yıllık emlak vergisi</li>
  <li>Aidat (site ücretleri)</li>
  <li>Sigorta masrafları</li>
</ul>

<h3>Kontrol Listesi</h3>
<ol>
  <li>Bütçenizi ve finansman seçeneklerinizi belirleyin</li>
  <li>Güvenilir bir emlak danışmanı ile çalışın</li>
  <li>Mülkün tapu durumunu kontrol edin</li>
  <li>İmar durumunu ve yapı izinlerini doğrulayın</li>
  <li>Bağımsız bir değerleme yaptırın</li>
  <li>Satış sözleşmesini avukatınıza inceletin</li>
</ol>

<h3>Sık Yapılan Hatalar</h3>
<ul>
  <li>Acele karar vermek — araştırmanızı yapın</li>
  <li>Ek masrafları hesaplamamak</li>
  <li>Mülkü görmeden satın almak</li>
  <li>Bağımsız hukuki danışmanlık almamak</li>
  <li>Kira potansiyelini göz ardı etmek</li>
</ul>`,

    en: `<h2>First-Time Buyer's Guide</h2>
<p>Buying your first property in Alanya is an exciting experience. This guide offers tips and key points specifically for first-time buyers.</p>

<h3>Choose the Right Location</h3>
<p>Each area of Alanya has its own unique character. Selecting the right location based on your lifestyle and budget is key to a successful investment.</p>
<ul>
  <li><strong>Mahmutlar:</strong> Affordable, close to the sea, international community</li>
  <li><strong>Oba:</strong> Prestigious, near city center, green spaces</li>
  <li><strong>Kleopatra:</strong> Beach lifestyle, vibrant nightlife, central location</li>
  <li><strong>Kestel:</strong> Peaceful, family-friendly, panoramic sea views</li>
</ul>

<h3>Plan Your Budget</h3>
<p>Factor in additional costs beyond the property price:</p>
<ul>
  <li>Title deed fee (4%)</li>
  <li>Real estate commission (typically not charged to buyer)</li>
  <li>Annual property tax</li>
  <li>Maintenance fees (building management)</li>
  <li>Insurance costs</li>
</ul>

<h3>Checklist</h3>
<ol>
  <li>Determine your budget and financing options</li>
  <li>Work with a reputable real estate consultant</li>
  <li>Verify the property's title deed status</li>
  <li>Check zoning and building permits</li>
  <li>Get an independent valuation</li>
  <li>Have your lawyer review the sales contract</li>
</ol>

<h3>Common Mistakes to Avoid</h3>
<ul>
  <li>Rushing decisions — do your research</li>
  <li>Not accounting for additional costs</li>
  <li>Buying without visiting the property</li>
  <li>Skipping independent legal advice</li>
  <li>Ignoring rental potential</li>
</ul>`,

    de: `<h2>Leitfaden für Erstkäufer</h2>
<p>Der Kauf Ihrer ersten Immobilie in Alanya ist ein aufregendes Erlebnis. Dieser Leitfaden bietet Tipps speziell für Erstkäufer.</p>

<h3>Den richtigen Standort wählen</h3>
<p>Jedes Gebiet von Alanya hat seinen eigenen Charakter. Die Wahl des richtigen Standorts ist der Schlüssel zu einer erfolgreichen Investition.</p>
<ul>
  <li><strong>Mahmutlar:</strong> Erschwinglich, meeresnah, internationale Gemeinschaft</li>
  <li><strong>Oba:</strong> Prestigeträchtig, zentrumsnah, Grünflächen</li>
  <li><strong>Kleopatra:</strong> Strandleben, pulsierendes Nachtleben, zentrale Lage</li>
  <li><strong>Kestel:</strong> Ruhig, familienfreundlich, Panorama-Meerblick</li>
</ul>

<h3>Budget planen</h3>
<ul>
  <li>Grundbuchgebühr (4%)</li>
  <li>Maklerprovision (wird in der Regel nicht dem Käufer berechnet)</li>
  <li>Jährliche Grundsteuer</li>
  <li>Nebenkosten (Hausverwaltung)</li>
  <li>Versicherungskosten</li>
</ul>

<h3>Checkliste</h3>
<ol>
  <li>Budget und Finanzierungsoptionen festlegen</li>
  <li>Mit einem seriösen Immobilienberater zusammenarbeiten</li>
  <li>Grundbuchstatus der Immobilie prüfen</li>
  <li>Bebauungsplan und Baugenehmigungen überprüfen</li>
  <li>Unabhängiges Wertgutachten einholen</li>
  <li>Kaufvertrag vom Anwalt prüfen lassen</li>
</ol>

<h3>Häufige Fehler</h3>
<ul>
  <li>Übereilte Entscheidungen — recherchieren Sie gründlich</li>
  <li>Zusätzliche Kosten nicht einkalkulieren</li>
  <li>Kauf ohne Besichtigung</li>
  <li>Keine unabhängige Rechtsberatung</li>
  <li>Mietpotenzial ignorieren</li>
</ul>`,

    ru: `<h2>Руководство для начинающих покупателей</h2>
<p>Покупка первой недвижимости в Аланье — захватывающий опыт. Это руководство содержит советы специально для начинающих покупателей.</p>

<h3>Выберите правильный район</h3>
<ul>
  <li><strong>Махмутлар:</strong> Доступный, близко к морю, международное сообщество</li>
  <li><strong>Оба:</strong> Престижный, рядом с центром, зелёные зоны</li>
  <li><strong>Клеопатра:</strong> Пляжный образ жизни, ночная жизнь, центральное расположение</li>
  <li><strong>Кестель:</strong> Спокойный, семейный, панорамный вид на море</li>
</ul>

<h3>Спланируйте бюджет</h3>
<ul>
  <li>Пошлина за ТАПУ (4%)</li>
  <li>Комиссия (обычно не взимается с покупателя)</li>
  <li>Ежегодный налог на недвижимость</li>
  <li>Коммунальные платежи</li>
  <li>Страхование</li>
</ul>

<h3>Чек-лист</h3>
<ol>
  <li>Определите бюджет и варианты финансирования</li>
  <li>Работайте с надёжным консультантом</li>
  <li>Проверьте статус документов на собственность</li>
  <li>Проверьте разрешения на строительство</li>
  <li>Получите независимую оценку</li>
  <li>Попросите юриста проверить договор</li>
</ol>

<h3>Распространённые ошибки</h3>
<ul>
  <li>Поспешные решения — проведите исследование</li>
  <li>Не учитывать дополнительные расходы</li>
  <li>Покупка без осмотра</li>
  <li>Отсутствие независимой юридической консультации</li>
  <li>Игнорирование арендного потенциала</li>
</ul>`,

    bs: `<h2>Vodič za kupce početnike</h2>
<p>Kupovina prve nekretnine u Alanji je uzbudljivo iskustvo. Ovaj vodič nudi savjete posebno za kupce početnike.</p>

<h3>Odaberite pravu lokaciju</h3>
<ul>
  <li><strong>Mahmutlar:</strong> Pristupačan, blizu mora, međunarodna zajednica</li>
  <li><strong>Oba:</strong> Prestižan, blizu centra, zelene površine</li>
  <li><strong>Kleopatra:</strong> Plažni život, živahan noćni život, centralna lokacija</li>
  <li><strong>Kestel:</strong> Miran, porodičan, panoramski pogled na more</li>
</ul>

<h3>Planirajte budžet</h3>
<ul>
  <li>Naknada za tapiju (4%)</li>
  <li>Provizija (obično se ne naplaćuje kupcu)</li>
  <li>Godišnji porez na nekretnine</li>
  <li>Troškovi održavanja</li>
  <li>Osiguranje</li>
</ul>

<h3>Kontrolna lista</h3>
<ol>
  <li>Odredite budžet i opcije finansiranja</li>
  <li>Radite s pouzdanim savjetnikom</li>
  <li>Provjerite status tapije nekretnine</li>
  <li>Provjerite građevinske dozvole</li>
  <li>Zatražite nezavisnu procjenu</li>
  <li>Neka vaš advokat pregleda ugovor</li>
</ol>

<h3>Česte greške</h3>
<ul>
  <li>Ishitrene odluke — istražite temeljito</li>
  <li>Ne računajte samo na cijenu nekretnine</li>
  <li>Kupovina bez posjete</li>
  <li>Preskakanje pravnog savjeta</li>
  <li>Ignorisanje potencijala iznajmljivanja</li>
</ul>`,
  },

  'mortgage-and-finance': {
    tr: `<h2>Türkiye'de Kredi ve Finansman Seçenekleri</h2>
<p>Yabancı alıcılar için Türkiye'de mülk satın alma finansmanı hakkında bilmeniz gereken her şeyi bu rehberde bulabilirsiniz.</p>

<h3>Yabancılar İçin Banka Kredisi</h3>
<p>Türk bankaları, yabancı vatandaşlara gayrimenkul alımı için kredi sağlamaktadır. Temel koşullar:</p>
<ul>
  <li>Mülk değerinin %50-70'ine kadar kredi imkanı</li>
  <li>Vade: 5 ile 20 yıl arası</li>
  <li>Sabit veya değişken faiz oranları</li>
  <li>EUR, USD veya TL cinsinden kredi seçenekleri</li>
</ul>

<h3>Gerekli Belgeler</h3>
<ul>
  <li>Geçerli pasaport</li>
  <li>Gelir belgesi veya banka ekstresi (son 6 ay)</li>
  <li>Vergi numarası</li>
  <li>Mülk değerleme raporu</li>
  <li>İş sözleşmesi veya şirket kayıtları</li>
</ul>

<h3>Alternatif Finansman Yöntemleri</h3>
<p>Banka kredisi dışındaki seçenekler:</p>
<ul>
  <li><strong>Müteahhit Taksitlendirme:</strong> Birçok geliştirici, inşaat süresince faizsiz taksit imkanı sunar</li>
  <li><strong>Ülkenizdeki Mortgage:</strong> Kendi ülkenizdeki mülkünüz üzerinden kredi</li>
  <li><strong>Öz Sermaye:</strong> Nakit ödeme ile genellikle %5-10 indirim</li>
</ul>

<h3>Ödeme Planı Örnekleri</h3>
<p>Tipik taksit planları:</p>
<ul>
  <li><strong>%30 Peşinat + 24 Ay Taksit:</strong> Yapım aşamasındaki projeler için popüler</li>
  <li><strong>%50 Peşinat + 12 Ay Taksit:</strong> Hazır mülkler için standart</li>
  <li><strong>%100 Nakit:</strong> En iyi fiyat avantajı</li>
</ul>

<h3>Döviz Kuru Stratejileri</h3>
<p>Türk Lirası'nın dalgalanması, yatırımınızı etkileyebilir. Uzman danışmanlarımız, kur riskini minimize etmeniz için size rehberlik eder.</p>`,

    en: `<h2>Mortgage & Finance Options in Turkey</h2>
<p>Everything you need to know about financing your property purchase in Turkey as a foreign buyer.</p>

<h3>Bank Mortgages for Foreigners</h3>
<p>Turkish banks provide mortgages to foreign nationals for property purchases. Key terms:</p>
<ul>
  <li>Loan-to-value ratio up to 50-70%</li>
  <li>Terms: 5 to 20 years</li>
  <li>Fixed or variable interest rates</li>
  <li>EUR, USD, or TRY denominated loans</li>
</ul>

<h3>Required Documents</h3>
<ul>
  <li>Valid passport</li>
  <li>Income proof or bank statements (last 6 months)</li>
  <li>Tax identification number</li>
  <li>Property valuation report</li>
  <li>Employment contract or company registration</li>
</ul>

<h3>Alternative Financing Methods</h3>
<ul>
  <li><strong>Developer Payment Plans:</strong> Many developers offer interest-free installments during construction</li>
  <li><strong>Home Country Mortgage:</strong> Leverage equity in your existing property</li>
  <li><strong>Cash Purchase:</strong> Typically 5-10% discount for full cash payment</li>
</ul>

<h3>Payment Plan Examples</h3>
<ul>
  <li><strong>30% Down + 24 Month Installments:</strong> Popular for off-plan projects</li>
  <li><strong>50% Down + 12 Month Installments:</strong> Standard for ready properties</li>
  <li><strong>100% Cash:</strong> Best price advantage</li>
</ul>

<h3>Currency Exchange Strategies</h3>
<p>Turkish Lira fluctuations can impact your investment. Our expert advisors guide you on minimizing currency risk.</p>`,

    de: `<h2>Hypotheken- und Finanzierungsoptionen in der Türkei</h2>
<p>Alles, was Sie über die Finanzierung Ihres Immobilienkaufs in der Türkei als ausländischer Käufer wissen müssen.</p>

<h3>Bankkredite für Ausländer</h3>
<ul>
  <li>Beleihungsquote bis zu 50-70%</li>
  <li>Laufzeiten: 5 bis 20 Jahre</li>
  <li>Feste oder variable Zinssätze</li>
  <li>Kredite in EUR, USD oder TRY</li>
</ul>

<h3>Erforderliche Dokumente</h3>
<ul>
  <li>Gültiger Reisepass</li>
  <li>Einkommensnachweis oder Kontoauszüge (letzte 6 Monate)</li>
  <li>Steueridentifikationsnummer</li>
  <li>Immobilienbewertungsbericht</li>
  <li>Arbeitsvertrag oder Handelsregisterauszug</li>
</ul>

<h3>Alternative Finanzierungsmethoden</h3>
<ul>
  <li><strong>Ratenzahlung beim Bauträger:</strong> Viele Bauträger bieten zinslose Raten während der Bauphase</li>
  <li><strong>Hypothek im Heimatland:</strong> Nutzen Sie das Eigenkapital Ihrer bestehenden Immobilie</li>
  <li><strong>Barkauf:</strong> In der Regel 5-10% Rabatt</li>
</ul>

<h3>Zahlungsplanbeispiele</h3>
<ul>
  <li><strong>30% Anzahlung + 24 Monatsraten:</strong> Beliebt für Off-Plan-Projekte</li>
  <li><strong>50% Anzahlung + 12 Monatsraten:</strong> Standard für bezugsfertige Immobilien</li>
  <li><strong>100% Bar:</strong> Bester Preisvorteil</li>
</ul>`,

    ru: `<h2>Ипотека и финансирование в Турции</h2>
<p>Всё о финансировании покупки недвижимости в Турции для иностранных покупателей.</p>

<h3>Банковская ипотека для иностранцев</h3>
<ul>
  <li>Кредит до 50-70% стоимости объекта</li>
  <li>Срок: от 5 до 20 лет</li>
  <li>Фиксированная или плавающая процентная ставка</li>
  <li>Кредиты в EUR, USD или TRY</li>
</ul>

<h3>Необходимые документы</h3>
<ul>
  <li>Действующий паспорт</li>
  <li>Подтверждение дохода или выписки из банка (за 6 месяцев)</li>
  <li>Налоговый номер</li>
  <li>Отчёт об оценке недвижимости</li>
  <li>Трудовой договор или регистрация компании</li>
</ul>

<h3>Альтернативные способы финансирования</h3>
<ul>
  <li><strong>Рассрочка от застройщика:</strong> Многие застройщики предлагают беспроцентную рассрочку</li>
  <li><strong>Ипотека в своей стране:</strong> Используйте имеющуюся недвижимость</li>
  <li><strong>Оплата наличными:</strong> Обычно скидка 5-10%</li>
</ul>

<h3>Примеры платёжных планов</h3>
<ul>
  <li><strong>30% аванс + 24 месяца рассрочки:</strong> Для строящихся объектов</li>
  <li><strong>50% аванс + 12 месяцев рассрочки:</strong> Для готовых объектов</li>
  <li><strong>100% наличными:</strong> Лучшая цена</li>
</ul>`,

    bs: `<h2>Opcije hipoteke i finansiranja u Turskoj</h2>
<p>Sve što trebate znati o finansiranju kupovine nekretnine u Turskoj kao strani kupac.</p>

<h3>Bankarski krediti za strance</h3>
<ul>
  <li>Kredit do 50-70% vrijednosti nekretnine</li>
  <li>Rok: od 5 do 20 godina</li>
  <li>Fiksna ili varijabilna kamatna stopa</li>
  <li>Krediti u EUR, USD ili TRY</li>
</ul>

<h3>Potrebni dokumenti</h3>
<ul>
  <li>Važeći pasoš</li>
  <li>Dokaz o prihodima ili bankovni izvodi (posljednjih 6 mjeseci)</li>
  <li>Poreski identifikacioni broj</li>
  <li>Izvještaj o procjeni nekretnine</li>
  <li>Ugovor o radu ili registracija firme</li>
</ul>

<h3>Alternativni načini finansiranja</h3>
<ul>
  <li><strong>Rate kod developera:</strong> Mnogi developeri nude beskamatne rate tokom gradnje</li>
  <li><strong>Hipoteka u svojoj zemlji:</strong> Iskoristite postojeću nekretninu</li>
  <li><strong>Gotovinsko plaćanje:</strong> Obično popust 5-10%</li>
</ul>

<h3>Primjeri planova plaćanja</h3>
<ul>
  <li><strong>30% avans + 24 mjesečne rate:</strong> Za projekte u izgradnji</li>
  <li><strong>50% avans + 12 mjesečnih rata:</strong> Za gotove nekretnine</li>
  <li><strong>100% gotovina:</strong> Najbolja cijena</li>
</ul>`,
  },

  'legal-framework': {
    tr: `<h2>Yabancı Mülk Sahipleri İçin Hukuki Çerçeve</h2>
<p>Türkiye'de yabancı olarak gayrimenkul satın almanın hukuki boyutlarını ve haklarınızı bu rehberde detaylı olarak ele alıyoruz.</p>

<h3>Yabancıların Mülk Edinme Hakkı</h3>
<p>2012 yılında yapılan yasal düzenlemelerle, çoğu yabancı uyruklu kişi Türkiye'de gayrimenkul satın alabilmektedir. Temel kurallar:</p>
<ul>
  <li>Askeri bölgelerde mülk satın alınamaz</li>
  <li>Bir kişi en fazla 30 hektar arazi satın alabilir</li>
  <li>Toplam alan, ilçe yüzölçümünün %10'unu geçemez</li>
  <li>Karşılıklılık ilkesine tabi bazı ülke vatandaşları kısıtlamalara tabidir</li>
</ul>

<h3>Tapu Türleri</h3>
<ul>
  <li><strong>Kat Mülkiyeti (Tam Tapu):</strong> En güvenli tapu türü, bağımsız bölüm mülkiyeti</li>
  <li><strong>Kat İrtifakı:</strong> İnşaat devam ederken verilen geçici tapu</li>
  <li><strong>Hisseli Tapu:</strong> Arsa üzerinde hisse sahipliği — DİKKAT gerektirir</li>
</ul>

<h3>Askeri İzin Süreci</h3>
<p>Yabancı alıcıların mülk satın alabilmesi için askeri izin alınması gerekmektedir:</p>
<ul>
  <li>Süre: Genellikle 1-4 hafta</li>
  <li>Başvuru tapu müdürlüğü tarafından yapılır</li>
  <li>Mülkün askeri bölge dışında olduğunun teyidi</li>
</ul>

<h3>Oturma İzni</h3>
<p>Mülk sahibi yabancılar, kısa dönem ikamet izni başvurusu yapabilir:</p>
<ul>
  <li>Tapu belgesi ile başvuru</li>
  <li>1-2 yıllık ikamet izni</li>
  <li>Yenilenebilir</li>
  <li>Sağlık sigortası gereklidir</li>
</ul>

<h3>Vatandaşlık Yolu</h3>
<p>400.000 USD ve üzeri gayrimenkul yatırımı ile Türk vatandaşlığı başvurusu yapılabilir. Mülk en az 3 yıl boyunca satılmamalıdır.</p>

<h3>Avukat Tutma</h3>
<p>Yabancı alıcıların bağımsız bir Türk avukatı tutması şiddetle tavsiye edilir. EmlakBanq, güvenilir hukuki ortaklarımız aracılığıyla bu hizmeti sağlamaktadır.</p>`,

    en: `<h2>Legal Framework for Foreign Property Owners</h2>
<p>This guide covers the legal aspects and your rights as a foreign property buyer in Turkey.</p>

<h3>Foreign Property Ownership Rights</h3>
<p>Following 2012 legal reforms, most foreign nationals can purchase property in Turkey. Key rules:</p>
<ul>
  <li>Properties in military zones cannot be purchased</li>
  <li>Maximum 30 hectares of land per individual</li>
  <li>Total area cannot exceed 10% of the district</li>
  <li>Some nationalities face restrictions based on reciprocity</li>
</ul>

<h3>Title Deed Types</h3>
<ul>
  <li><strong>Kat Mülkiyeti (Full Title):</strong> The most secure type, independent unit ownership</li>
  <li><strong>Kat İrtifakı:</strong> Temporary title issued during construction</li>
  <li><strong>Shared Title (Hisseli Tapu):</strong> Share ownership on land — requires CAUTION</li>
</ul>

<h3>Military Clearance Process</h3>
<ul>
  <li>Duration: Typically 1-4 weeks</li>
  <li>Application made by the Land Registry</li>
  <li>Confirms property is outside military zones</li>
</ul>

<h3>Residence Permit</h3>
<p>Foreign property owners can apply for a short-term residence permit:</p>
<ul>
  <li>Application with title deed</li>
  <li>1-2 year residence permit</li>
  <li>Renewable</li>
  <li>Health insurance required</li>
</ul>

<h3>Path to Citizenship</h3>
<p>Property investment of $400,000+ qualifies for Turkish citizenship application. The property must not be sold for at least 3 years.</p>

<h3>Hiring a Lawyer</h3>
<p>Independent legal counsel is strongly recommended for foreign buyers. EmlakBanq provides this through our trusted legal partners.</p>`,

    de: `<h2>Rechtlicher Rahmen für ausländische Immobilienbesitzer</h2>
<p>Dieser Leitfaden behandelt die rechtlichen Aspekte und Ihre Rechte als ausländischer Immobilienkäufer in der Türkei.</p>

<h3>Eigentumsrecht für Ausländer</h3>
<ul>
  <li>Immobilien in Militärgebieten können nicht erworben werden</li>
  <li>Maximal 30 Hektar Land pro Person</li>
  <li>Gesamtfläche darf 10% des Bezirks nicht überschreiten</li>
  <li>Einige Nationalitäten unterliegen Reziprozitätsbeschränkungen</li>
</ul>

<h3>Arten von Eigentumsurkunden</h3>
<ul>
  <li><strong>Kat Mülkiyeti:</strong> Sicherste Form, eigenständige Einheit</li>
  <li><strong>Kat İrtifakı:</strong> Vorläufige Urkunde während der Bauphase</li>
  <li><strong>Geteilter Titel:</strong> Anteilseigentum — VORSICHT geboten</li>
</ul>

<h3>Militärische Freigabe</h3>
<ul>
  <li>Dauer: Typischerweise 1-4 Wochen</li>
  <li>Antrag durch das Grundbuchamt</li>
  <li>Bestätigung, dass die Immobilie außerhalb von Militärzonen liegt</li>
</ul>

<h3>Aufenthaltserlaubnis</h3>
<ul>
  <li>Antrag mit Eigentumsurkunde</li>
  <li>1-2 Jahre Aufenthaltserlaubnis, verlängerbar</li>
  <li>Krankenversicherung erforderlich</li>
</ul>

<h3>Weg zur Staatsbürgerschaft</h3>
<p>Immobilieninvestition ab 400.000 USD qualifiziert für die türkische Staatsbürgerschaft. Die Immobilie darf mindestens 3 Jahre nicht verkauft werden.</p>`,

    ru: `<h2>Правовая база для иностранных владельцев недвижимости</h2>
<p>Это руководство охватывает юридические аспекты и ваши права как иностранного покупателя недвижимости в Турции.</p>

<h3>Права иностранцев на владение недвижимостью</h3>
<ul>
  <li>Нельзя покупать в военных зонах</li>
  <li>Максимум 30 гектаров на человека</li>
  <li>Общая площадь не может превышать 10% района</li>
  <li>Для некоторых национальностей действуют ограничения</li>
</ul>

<h3>Типы правоустанавливающих документов</h3>
<ul>
  <li><strong>Kat Mülkiyeti:</strong> Самый надёжный тип — независимая единица</li>
  <li><strong>Kat İrtifakı:</strong> Временный документ во время строительства</li>
  <li><strong>Долевая собственность:</strong> Требует ОСТОРОЖНОСТИ</li>
</ul>

<h3>Военное разрешение</h3>
<ul>
  <li>Срок: обычно 1-4 недели</li>
  <li>Заявка подаётся Кадастровым управлением</li>
  <li>Подтверждает, что объект вне военных зон</li>
</ul>

<h3>Вид на жительство</h3>
<ul>
  <li>Заявка с правоустанавливающим документом</li>
  <li>ВНЖ на 1-2 года, продлеваемый</li>
  <li>Требуется медицинская страховка</li>
</ul>

<h3>Путь к гражданству</h3>
<p>Инвестиция от $400.000 даёт право на подачу заявки на турецкое гражданство. Недвижимость нельзя продавать минимум 3 года.</p>`,

    bs: `<h2>Pravni okvir za strane vlasnike nekretnina</h2>
<p>Ovaj vodič pokriva pravne aspekte i vaša prava kao stranog kupca nekretnina u Turskoj.</p>

<h3>Pravo stranaca na vlasništvo</h3>
<ul>
  <li>Nekretnine u vojnim zonama se ne mogu kupiti</li>
  <li>Maksimalno 30 hektara po osobi</li>
  <li>Ukupna površina ne može prelaziti 10% okruga</li>
  <li>Neke nacionalnosti imaju ograničenja</li>
</ul>

<h3>Vrste tapija</h3>
<ul>
  <li><strong>Kat Mülkiyeti:</strong> Najsigurniji tip — nezavisna jedinica</li>
  <li><strong>Kat İrtifakı:</strong> Privremena tapija tokom gradnje</li>
  <li><strong>Dijeljena tapija:</strong> Zahtijeva OPREZ</li>
</ul>

<h3>Vojna dozvola</h3>
<ul>
  <li>Trajanje: obično 1-4 sedmice</li>
  <li>Prijavu podnosi Katastarski ured</li>
  <li>Potvrda da je nekretnina izvan vojnih zona</li>
</ul>

<h3>Boravišna dozvola</h3>
<ul>
  <li>Prijava s tapijom</li>
  <li>Boravišna dozvola na 1-2 godine, obnovljiva</li>
  <li>Potrebno zdravstveno osiguranje</li>
</ul>

<h3>Put do državljanstva</h3>
<p>Investicija od $400.000+ kvalifikuje za tursko državljanstvo. Nekretnina se ne smije prodati najmanje 3 godine.</p>`,
  },

  'off-plan-guide': {
    tr: `<h2>Yapım Aşamasındaki Projeler Rehberi</h2>
<p>Tamamlanmadan satış (off-plan) yatırımları, Alanya'da en yüksek getiri potansiyeline sahip yatırım türlerinden biridir. Bu rehber, off-plan yatırımının avantajlarını ve dikkat edilmesi gereken noktaları ele almaktadır.</p>

<h3>Off-Plan Yatırımın Avantajları</h3>
<ul>
  <li><strong>Düşük Giriş Fiyatı:</strong> Hazır mülklere göre %15-30 daha uygun fiyat</li>
  <li><strong>Taksit İmkanı:</strong> İnşaat süresince faizsiz taksit planları</li>
  <li><strong>Değer Artışı:</strong> Teslim tarihine kadar %20-40 değer artışı potansiyeli</li>
  <li><strong>Kişiselleştirme:</strong> Daire planı, malzeme ve dekorasyonda tercih hakkı</li>
  <li><strong>Modern Tasarım:</strong> En son mimari trendler ve akıllı ev teknolojileri</li>
</ul>

<h3>Dikkat Edilmesi Gerekenler</h3>
<ul>
  <li><strong>Müteahhit Güvenilirliği:</strong> Geliştirici firmanın geçmiş projelerini inceleyin</li>
  <li><strong>İnşaat İzinleri:</strong> Tüm izinlerin alındığını teyit edin</li>
  <li><strong>Teslim Tarihi:</strong> Gerçekçi teslim tarihi ve gecikme koşullarını sorgulayın</li>
  <li><strong>Escrow Hesabı:</strong> Ödemelerin güvenceli hesapta tutulması</li>
  <li><strong>Sözleşme Detayları:</strong> Tüm teknik şartname ve teslim standartları yazılı olmalı</li>
</ul>

<h3>Alanya'daki Off-Plan Pazar</h3>
<p>Alanya, özellikle Mahmutlar, Avsallar ve Kargıcak bölgelerinde aktif bir off-plan pazarına sahiptir. Yeni projeler modern konseptler, ortak alanlar ve sosyal tesisler sunmaktadır.</p>

<h3>Yatırım Stratejisi</h3>
<ol>
  <li>Bütçe ve hedef getiri belirleyin</li>
  <li>Güvenilir geliştiricilerin projelerini karşılaştırın</li>
  <li>Lokasyon analizini bağımsız olarak yapın</li>
  <li>Ödeme planını nakit akışınıza göre planlayın</li>
  <li>Teslim öncesi satış veya teslim sonrası kiralama stratejisi belirleyin</li>
</ol>`,

    en: `<h2>Off-Plan Investment Guide</h2>
<p>Off-plan investments offer some of the highest return potential in Alanya. This guide covers the advantages and key considerations of off-plan investing.</p>

<h3>Advantages of Off-Plan</h3>
<ul>
  <li><strong>Lower Entry Price:</strong> 15-30% below completed property prices</li>
  <li><strong>Payment Plans:</strong> Interest-free installments during construction</li>
  <li><strong>Capital Appreciation:</strong> 20-40% value increase potential by completion</li>
  <li><strong>Customization:</strong> Choice in floor plans, materials, and finishes</li>
  <li><strong>Modern Design:</strong> Latest architectural trends and smart home technology</li>
</ul>

<h3>Key Considerations</h3>
<ul>
  <li><strong>Developer Reliability:</strong> Research the developer's track record</li>
  <li><strong>Building Permits:</strong> Confirm all permits are in place</li>
  <li><strong>Completion Date:</strong> Ask about realistic timelines and delay clauses</li>
  <li><strong>Escrow Account:</strong> Ensure payments are held in a secure account</li>
  <li><strong>Contract Details:</strong> All specifications and standards should be written</li>
</ul>

<h3>Alanya's Off-Plan Market</h3>
<p>Alanya has an active off-plan market, especially in Mahmutlar, Avsallar, and Kargicak. New projects feature modern concepts, communal spaces, and social amenities.</p>

<h3>Investment Strategy</h3>
<ol>
  <li>Define budget and target returns</li>
  <li>Compare projects from reliable developers</li>
  <li>Conduct independent location analysis</li>
  <li>Plan payments around your cash flow</li>
  <li>Decide on pre-completion resale or post-completion rental strategy</li>
</ol>`,

    de: `<h2>Leitfaden für Off-Plan-Investitionen</h2>
<p>Off-Plan-Investitionen bieten einige der höchsten Renditepotenziale in Alanya.</p>

<h3>Vorteile von Off-Plan</h3>
<ul>
  <li><strong>Niedrigerer Einstiegspreis:</strong> 15-30% unter fertigen Immobilienpreisen</li>
  <li><strong>Ratenzahlung:</strong> Zinslose Raten während der Bauphase</li>
  <li><strong>Wertsteigerung:</strong> 20-40% Wertzuwachs bis zur Fertigstellung</li>
  <li><strong>Individualisierung:</strong> Auswahl bei Grundrissen und Ausstattung</li>
  <li><strong>Modernes Design:</strong> Neueste Architekturtrends und Smart-Home-Technik</li>
</ul>

<h3>Wichtige Überlegungen</h3>
<ul>
  <li><strong>Zuverlässigkeit des Bauträgers:</strong> Referenzprojekte prüfen</li>
  <li><strong>Baugenehmigungen:</strong> Alle Genehmigungen bestätigen</li>
  <li><strong>Fertigstellungstermin:</strong> Realistische Fristen und Verzugsklauseln</li>
  <li><strong>Treuhandkonto:</strong> Sicherstellung der Zahlungen</li>
  <li><strong>Vertragsdetails:</strong> Alle Spezifikationen schriftlich festhalten</li>
</ul>

<h3>Off-Plan-Markt in Alanya</h3>
<p>Alanya hat einen aktiven Off-Plan-Markt, besonders in Mahmutlar, Avsallar und Kargicak.</p>

<h3>Investitionsstrategie</h3>
<ol>
  <li>Budget und Zielrendite definieren</li>
  <li>Projekte zuverlässiger Bauträger vergleichen</li>
  <li>Unabhängige Standortanalyse durchführen</li>
  <li>Zahlungen an Ihren Cashflow anpassen</li>
  <li>Wiederverkaufs- oder Vermietungsstrategie festlegen</li>
</ol>`,

    ru: `<h2>Руководство по инвестициям в строящиеся объекты</h2>
<p>Инвестиции в строящиеся объекты (off-plan) предлагают один из самых высоких потенциалов доходности в Аланье.</p>

<h3>Преимущества off-plan</h3>
<ul>
  <li><strong>Низкая начальная цена:</strong> На 15-30% ниже готовых объектов</li>
  <li><strong>Рассрочка:</strong> Беспроцентные платежи во время строительства</li>
  <li><strong>Рост стоимости:</strong> Потенциал роста 20-40% к сдаче</li>
  <li><strong>Индивидуализация:</strong> Выбор планировки и отделки</li>
  <li><strong>Современный дизайн:</strong> Последние архитектурные тренды</li>
</ul>

<h3>На что обратить внимание</h3>
<ul>
  <li><strong>Надёжность застройщика:</strong> Изучите прошлые проекты</li>
  <li><strong>Разрешения:</strong> Убедитесь в наличии всех разрешений</li>
  <li><strong>Срок сдачи:</strong> Реалистичные сроки и условия задержки</li>
  <li><strong>Эскроу-счёт:</strong> Безопасное хранение платежей</li>
  <li><strong>Детали контракта:</strong> Все спецификации должны быть прописаны</li>
</ul>

<h3>Стратегия инвестирования</h3>
<ol>
  <li>Определите бюджет и целевую доходность</li>
  <li>Сравните проекты надёжных застройщиков</li>
  <li>Проведите независимый анализ локации</li>
  <li>Спланируйте платежи под ваш денежный поток</li>
  <li>Выберите стратегию: перепродажа или аренда</li>
</ol>`,

    bs: `<h2>Vodič za investicije u projekte u izgradnji</h2>
<p>Off-plan investicije nude jedan od najvećih potencijala povrata u Alanji.</p>

<h3>Prednosti off-plan</h3>
<ul>
  <li><strong>Niža ulazna cijena:</strong> 15-30% ispod cijena gotovih nekretnina</li>
  <li><strong>Plan plaćanja:</strong> Beskamatne rate tokom gradnje</li>
  <li><strong>Rast vrijednosti:</strong> Potencijal rasta 20-40% do završetka</li>
  <li><strong>Prilagođavanje:</strong> Izbor planova i materijala</li>
  <li><strong>Moderan dizajn:</strong> Najnoviji arhitektonski trendovi</li>
</ul>

<h3>Šta treba razmotriti</h3>
<ul>
  <li><strong>Pouzdanost developera:</strong> Istražite prethodne projekte</li>
  <li><strong>Građevinske dozvole:</strong> Potvrdite sve dozvole</li>
  <li><strong>Datum završetka:</strong> Realni rokovi i uslovi kašnjenja</li>
  <li><strong>Escrow račun:</strong> Osiguranje plaćanja</li>
  <li><strong>Detalji ugovora:</strong> Sve specifikacije moraju biti pisane</li>
</ul>

<h3>Strategija investiranja</h3>
<ol>
  <li>Definirajte budžet i ciljani povrat</li>
  <li>Uporedite projekte pouzdanih developera</li>
  <li>Provedite nezavisnu analizu lokacije</li>
  <li>Planirajte plaćanja prema vašem novčanom toku</li>
  <li>Odlučite: preprodaja ili iznajmljivanje</li>
</ol>`,
  },

  'property-tax-and-fees': {
    tr: `<h2>Gayrimenkul Vergi ve Masrafları</h2>
<p>Alanya'da mülk sahibi olmanın vergi yükümlülükleri ve yıllık masrafları hakkında kapsamlı bilgi.</p>

<h3>Satın Alma Masrafları</h3>
<ul>
  <li><strong>Tapu Harcı:</strong> Mülk değerinin %4'ü (genellikle alıcı ve satıcı arasında paylaşılır)</li>
  <li><strong>Döner Sermaye:</strong> ₺3.000-5.000 arası</li>
  <li><strong>Değerleme Raporu:</strong> ₺5.000-8.000</li>
  <li><strong>Noter ve Tercüme:</strong> ₺2.000-4.000</li>
  <li><strong>Deprem Sigortası (DASK):</strong> ₺500-1.500/yıl</li>
</ul>

<h3>Yıllık Vergiler</h3>
<ul>
  <li><strong>Emlak Vergisi:</strong> Konutlar için mülk değerinin %0.2'si (büyükşehirlerde %0.4)</li>
  <li><strong>Çevre Temizlik Vergisi:</strong> Yıllık sabit tutar, belediyeye göre değişir</li>
</ul>

<h3>Aidat ve İşletme Giderleri</h3>
<p>Site veya apartman sakinlerinin aylık ortak giderleri:</p>
<ul>
  <li><strong>Havuzlu Site:</strong> ₺1.500-4.000/ay</li>
  <li><strong>Standart Apartman:</strong> ₺500-1.500/ay</li>
  <li><strong>Lüks Rezidans:</strong> ₺3.000-8.000/ay</li>
</ul>
<p>Aidatlar genellikle güvenlik, temizlik, bahçe bakımı, havuz bakımı, asansör bakımı ve ortak alan aydınlatmasını kapsar.</p>

<h3>Kira Geliri Vergisi</h3>
<p>Mülkünüzü kiraya verirseniz:</p>
<ul>
  <li>Yıllık kira geliri beyannamesi verilmelidir</li>
  <li>İstisna tutarı altında kalan gelirler vergiden muaftır</li>
  <li>Götürü gider usulü ile %15 masraf indirimi yapılabilir</li>
  <li>Vergi oranı: %15 ile %40 arası gelire göre artan oranlı</li>
</ul>

<h3>Satış Vergisi</h3>
<ul>
  <li>5 yıl içinde satışta: Değer artış kazancı vergisine tabi</li>
  <li>5 yıl sonra satışta: Değer artış kazancı vergisi yok</li>
  <li>Tapu harcı yine %4 olarak uygulanır</li>
</ul>

<h3>Faydalı İpuçları</h3>
<ul>
  <li>Vergi numaranızı mutlaka alın</li>
  <li>Mali müşavir ile çalışmak maliyetleri optimize eder</li>
  <li>Çifte vergilendirmeyi önleme anlaşmalarını kontrol edin</li>
  <li>EmlakBanq vergi danışmanlığı ortaklarımız ile iletişime geçin</li>
</ul>`,

    en: `<h2>Property Tax & Fees Guide</h2>
<p>Comprehensive information about tax obligations and annual costs of property ownership in Alanya.</p>

<h3>Purchase Costs</h3>
<ul>
  <li><strong>Title Deed Fee:</strong> 4% of property value (usually split between buyer and seller)</li>
  <li><strong>Revolving Fund Fee:</strong> ₺3,000-5,000</li>
  <li><strong>Valuation Report:</strong> ₺5,000-8,000</li>
  <li><strong>Notary and Translation:</strong> ₺2,000-4,000</li>
  <li><strong>Earthquake Insurance (DASK):</strong> ₺500-1,500/year</li>
</ul>

<h3>Annual Taxes</h3>
<ul>
  <li><strong>Property Tax:</strong> 0.2% of property value for residential (0.4% in metropolitan areas)</li>
  <li><strong>Environmental Tax:</strong> Fixed annual amount, varies by municipality</li>
</ul>

<h3>Maintenance & Service Fees</h3>
<ul>
  <li><strong>Complex with Pool:</strong> ₺1,500-4,000/month</li>
  <li><strong>Standard Apartment:</strong> ₺500-1,500/month</li>
  <li><strong>Luxury Residence:</strong> ₺3,000-8,000/month</li>
</ul>
<p>Fees typically cover security, cleaning, garden maintenance, pool maintenance, elevator service, and common area lighting.</p>

<h3>Rental Income Tax</h3>
<ul>
  <li>Annual rental income declaration required</li>
  <li>Income below exemption threshold is tax-free</li>
  <li>15% flat expense deduction available</li>
  <li>Tax rate: Progressive 15% to 40%</li>
</ul>

<h3>Capital Gains Tax</h3>
<ul>
  <li>Sale within 5 years: Subject to capital gains tax</li>
  <li>Sale after 5 years: No capital gains tax</li>
  <li>Title deed fee of 4% still applies</li>
</ul>

<h3>Useful Tips</h3>
<ul>
  <li>Always obtain your tax identification number</li>
  <li>Working with a tax advisor optimizes costs</li>
  <li>Check double taxation treaties with your country</li>
  <li>Contact EmlakBanq's tax advisory partners</li>
</ul>`,

    de: `<h2>Leitfaden zu Immobiliensteuern und Gebühren</h2>
<p>Umfassende Informationen zu Steuerpflichten und jährlichen Kosten des Immobilienbesitzes in Alanya.</p>

<h3>Kaufkosten</h3>
<ul>
  <li><strong>Grundbuchgebühr:</strong> 4% des Immobilienwertes</li>
  <li><strong>Umlauffondsgebühr:</strong> ₺3.000-5.000</li>
  <li><strong>Bewertungsbericht:</strong> ₺5.000-8.000</li>
  <li><strong>Notar und Übersetzung:</strong> ₺2.000-4.000</li>
  <li><strong>Erdbebenversicherung:</strong> ₺500-1.500/Jahr</li>
</ul>

<h3>Jährliche Steuern</h3>
<ul>
  <li><strong>Grundsteuer:</strong> 0,2% für Wohnimmobilien (0,4% in Großstädten)</li>
  <li><strong>Umweltsteuer:</strong> Fester jährlicher Betrag</li>
</ul>

<h3>Nebenkosten</h3>
<ul>
  <li><strong>Anlage mit Pool:</strong> ₺1.500-4.000/Monat</li>
  <li><strong>Standard-Apartment:</strong> ₺500-1.500/Monat</li>
  <li><strong>Luxus-Residenz:</strong> ₺3.000-8.000/Monat</li>
</ul>

<h3>Mieteinkommensteuer</h3>
<ul>
  <li>Jährliche Erklärung erforderlich</li>
  <li>Einkommen unter dem Freibetrag steuerfrei</li>
  <li>15% Pauschalabzug verfügbar</li>
  <li>Steuersatz: Progressiv 15% bis 40%</li>
</ul>

<h3>Kapitalertragssteuer</h3>
<ul>
  <li>Verkauf innerhalb von 5 Jahren: Steuerpflichtig</li>
  <li>Verkauf nach 5 Jahren: Steuerfrei</li>
</ul>`,

    ru: `<h2>Руководство по налогам и сборам на недвижимость</h2>
<p>Полная информация о налоговых обязательствах и ежегодных расходах на владение недвижимостью в Аланье.</p>

<h3>Расходы при покупке</h3>
<ul>
  <li><strong>Пошлина за ТАПУ:</strong> 4% от стоимости</li>
  <li><strong>Оборотный фонд:</strong> ₺3.000-5.000</li>
  <li><strong>Отчёт об оценке:</strong> ₺5.000-8.000</li>
  <li><strong>Нотариус и перевод:</strong> ₺2.000-4.000</li>
  <li><strong>Страхование от землетрясений:</strong> ₺500-1.500/год</li>
</ul>

<h3>Ежегодные налоги</h3>
<ul>
  <li><strong>Налог на недвижимость:</strong> 0,2% для жилья (0,4% в мегаполисах)</li>
  <li><strong>Экологический налог:</strong> Фиксированная годовая сумма</li>
</ul>

<h3>Коммунальные платежи</h3>
<ul>
  <li><strong>Комплекс с бассейном:</strong> ₺1.500-4.000/месяц</li>
  <li><strong>Стандартные апартаменты:</strong> ₺500-1.500/месяц</li>
  <li><strong>Люксовая резиденция:</strong> ₺3.000-8.000/месяц</li>
</ul>

<h3>Налог на арендный доход</h3>
<ul>
  <li>Требуется ежегодная декларация</li>
  <li>Доход ниже порога освобождается от налога</li>
  <li>Доступен вычет расходов 15%</li>
  <li>Ставка: прогрессивная от 15% до 40%</li>
</ul>

<h3>Налог на прирост капитала</h3>
<ul>
  <li>Продажа в течение 5 лет: облагается налогом</li>
  <li>Продажа после 5 лет: без налога</li>
</ul>`,

    bs: `<h2>Vodič za poreze i naknade na nekretnine</h2>
<p>Sveobuhvatne informacije o poreskim obavezama i godišnjim troškovima vlasništva nad nekretninom u Alanji.</p>

<h3>Troškovi kupovine</h3>
<ul>
  <li><strong>Naknada za tapiju:</strong> 4% vrijednosti nekretnine</li>
  <li><strong>Fond za obrt:</strong> ₺3.000-5.000</li>
  <li><strong>Izvještaj o procjeni:</strong> ₺5.000-8.000</li>
  <li><strong>Notar i prevod:</strong> ₺2.000-4.000</li>
  <li><strong>Osiguranje od zemljotresa:</strong> ₺500-1.500/godišnje</li>
</ul>

<h3>Godišnji porezi</h3>
<ul>
  <li><strong>Porez na nekretnine:</strong> 0,2% za stambene (0,4% u velikim gradovima)</li>
  <li><strong>Porez na okoliš:</strong> Fiksni godišnji iznos</li>
</ul>

<h3>Troškovi održavanja</h3>
<ul>
  <li><strong>Kompleks s bazenom:</strong> ₺1.500-4.000/mjesečno</li>
  <li><strong>Standardni stan:</strong> ₺500-1.500/mjesečno</li>
  <li><strong>Luksuzna rezidencija:</strong> ₺3.000-8.000/mjesečno</li>
</ul>

<h3>Porez na prihod od iznajmljivanja</h3>
<ul>
  <li>Potrebna godišnja prijava</li>
  <li>Prihod ispod praga oslobođen poreza</li>
  <li>Dostupan paušalni odbitak 15%</li>
  <li>Stopa: progresivna od 15% do 40%</li>
</ul>

<h3>Porez na kapitalni dobitak</h3>
<ul>
  <li>Prodaja unutar 5 godina: oporeziva</li>
  <li>Prodaja nakon 5 godina: bez poreza</li>
</ul>`,
  },
}

async function main() {
  console.log('Updating 6 buyer guides with multilingual content...')
  for (const [slug, content] of Object.entries(guides)) {
    await updateGuide(slug, content)
  }
  console.log('Done!')
}

main().catch(console.error)
