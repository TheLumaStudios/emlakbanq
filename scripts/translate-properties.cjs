const https = require('https')

const SUPABASE_URL = 'https://ycrlkkkoxrsmugidznri.supabase.co'
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inljcmxra2tveHJzbXVnaWR6bnJpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTE3MzEyOSwiZXhwIjoyMDg2NzQ5MTI5fQ.ZfgE4FEPU2p13nJC3np9OUOuBJeKqUDUYF0nka57ihc'

function request(method, path, body) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, SUPABASE_URL)
    const options = {
      method,
      hostname: url.hostname,
      path: url.pathname + url.search,
      headers: {
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': method === 'PATCH' ? 'return=minimal' : 'return=representation',
      },
    }
    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        if (res.statusCode >= 400) reject(new Error(`${res.statusCode}: ${data}`))
        else resolve(data ? JSON.parse(data) : null)
      })
    })
    req.on('error', reject)
    if (body) req.write(JSON.stringify(body))
    req.end()
  })
}

// All 19 property translations
const TRANSLATIONS = {
  'deniz-manzarali-luks-villa': {
    description: {
      tr: "Akdeniz'in büyüleyici manzarasına sahip muhteşem villa, modern mimari ve doğal güzelliği bir arada sunuyor.",
      en: "A stunning villa with breathtaking Mediterranean views, combining modern architecture with natural beauty.",
      de: "Eine atemberaubende Villa mit faszinierenden Aussichten auf das Mittelmeer, die moderne Architektur und natürliche Schönheit vereint.",
      ru: "Потрясающая вилла с захватывающим видом на Средиземное море, сочетающая современную архитектуру и природную красоту.",
      bs: "Zadivljujuća vila s prekrasnim pogledom na Mediteran, spajajući modernu arhitekturu i prirodnu ljepotu."
    },
    amenities: [
      JSON.stringify({ tr: "Özel Havuz", en: "Private Pool", de: "Privatpool", ru: "Частный бассейн", bs: "Privatni bazen" }),
      JSON.stringify({ tr: "Deniz Manzarası", en: "Sea View", de: "Meerblick", ru: "Вид на море", bs: "Pogled na more" }),
      JSON.stringify({ tr: "Merkezi Klima", en: "Central Air Conditioning", de: "Zentralklimaanlage", ru: "Центральное кондиционирование", bs: "Centralna klima" }),
      JSON.stringify({ tr: "Otopark", en: "Parking", de: "Parkplatz", ru: "Парковка", bs: "Parking" }),
      JSON.stringify({ tr: "Güvenlik", en: "Security", de: "Sicherheitsdienst", ru: "Охрана", bs: "Sigurnost" }),
      JSON.stringify({ tr: "Bahçe", en: "Garden", de: "Garten", ru: "Сад", bs: "Bašta" }),
    ]
  },
  'modern-residence-daire-mahmutlar': {
    description: {
      tr: "Mahmutlar'ın kalbinde, denize sadece 300 metre mesafede modern bir residence projesi.",
      en: "A modern residential project in the heart of Mahmutlar, just 300 meters from the sea.",
      de: "Ein modernes Wohnprojekt im Herzen von Mahmutlar, nur 300 Meter vom Meer entfernt.",
      ru: "Современный жилой комплекс в самом сердце Махмутлара, всего в 300 метрах от моря.",
      bs: "Moderni rezidencijalni projekat u srcu Mahmutlara, samo 300 metara od mora."
    },
    amenities: [
      JSON.stringify({ tr: "Havuz", en: "Pool", de: "Pool", ru: "Бассейн", bs: "Bazen" }),
      JSON.stringify({ tr: "Fitness", en: "Fitness Center", de: "Fitnessstudio", ru: "Фитнес-зал", bs: "Fitnes centar" }),
      JSON.stringify({ tr: "Sauna", en: "Sauna", de: "Sauna", ru: "Сауна", bs: "Sauna" }),
      JSON.stringify({ tr: "Otopark", en: "Parking", de: "Parkplatz", ru: "Парковка", bs: "Parking" }),
      JSON.stringify({ tr: "Güvenlik", en: "Security", de: "Sicherheitsdienst", ru: "Охрана", bs: "Sigurnost" }),
      JSON.stringify({ tr: "Çocuk Parkı", en: "Children's Playground", de: "Kinderspielplatz", ru: "Детская площадка", bs: "Dječje igralište" }),
    ]
  },
  'premium-penthouse-oba': {
    description: {
      tr: "Oba'nın en prestijli adresinde, 360 derece panoramik manzaraya sahip premium penthouse.",
      en: "A premium penthouse with 360-degree panoramic views at Oba's most prestigious address.",
      de: "Ein Premium-Penthouse mit 360-Grad-Panoramablick an der prestigeträchtigsten Adresse von Oba.",
      ru: "Премиальный пентхаус с панорамным видом на 360 градусов по самому престижному адресу Обы.",
      bs: "Premium penthaus s panoramskim pogledom od 360 stepeni na najprestižnijoj adresi u Obi."
    },
    amenities: [
      JSON.stringify({ tr: "Panoramik Manzara", en: "Panoramic View", de: "Panoramablick", ru: "Панорамный вид", bs: "Panoramski pogled" }),
      JSON.stringify({ tr: "Özel Teras", en: "Private Terrace", de: "Privatterrasse", ru: "Частная терраса", bs: "Privatna terasa" }),
      JSON.stringify({ tr: "Jakuzi", en: "Jacuzzi", de: "Whirlpool", ru: "Джакузи", bs: "Đakuzi" }),
      JSON.stringify({ tr: "Özel Asansör", en: "Private Elevator", de: "Privataufzug", ru: "Личный лифт", bs: "Privatni lift" }),
      JSON.stringify({ tr: "Akıllı Ev", en: "Smart Home", de: "Smart Home", ru: "Умный дом", bs: "Pametna kuća" }),
      JSON.stringify({ tr: "Otopark", en: "Parking", de: "Parkplatz", ru: "Парковка", bs: "Parking" }),
    ]
  },
  'sahil-villasi-kestel': {
    description: {
      tr: "Kestel sahilinde, denize sıfır konumda muhteşem bir villa.",
      en: "A magnificent beachfront villa on the Kestel coastline.",
      de: "Eine prächtige Villa direkt am Strand an der Küste von Kestel.",
      ru: "Великолепная вилла на первой береговой линии побережья Кестель.",
      bs: "Veličanstvena vila na samoj obali Kestela."
    },
    amenities: [
      JSON.stringify({ tr: "Denize Sıfır", en: "Beachfront", de: "Direkt am Strand", ru: "На первой линии", bs: "Uz more" }),
      JSON.stringify({ tr: "Özel Plaj", en: "Private Beach", de: "Privatstrand", ru: "Частный пляж", bs: "Privatna plaža" }),
      JSON.stringify({ tr: "Infinity Havuz", en: "Infinity Pool", de: "Infinity-Pool", ru: "Бассейн инфинити", bs: "Infinity bazen" }),
      JSON.stringify({ tr: "Bahçe", en: "Garden", de: "Garten", ru: "Сад", bs: "Bašta" }),
      JSON.stringify({ tr: "BBQ Alanı", en: "BBQ Area", de: "Grillplatz", ru: "Зона барбекю", bs: "BBQ zona" }),
      JSON.stringify({ tr: "Güvenlik", en: "Security", de: "Sicherheitsdienst", ru: "Охрана", bs: "Sigurnost" }),
    ]
  },
  'aile-dairesi-tosmur': {
    description: {
      tr: "Tosmur'un sakin ortamında aileler için ideal daire.",
      en: "An ideal apartment for families in the peaceful setting of Tosmur.",
      de: "Eine ideale Wohnung für Familien in der ruhigen Umgebung von Tosmur.",
      ru: "Идеальная квартира для семей в спокойной обстановке Тосмура.",
      bs: "Idealan stan za porodice u mirnom okruženju Tosmura."
    },
    amenities: [
      JSON.stringify({ tr: "Site İçi Havuz", en: "On-site Pool", de: "Pool im Komplex", ru: "Бассейн на территории", bs: "Bazen u sklopu" }),
      JSON.stringify({ tr: "Çocuk Parkı", en: "Children's Playground", de: "Kinderspielplatz", ru: "Детская площадка", bs: "Dječje igralište" }),
      JSON.stringify({ tr: "Otopark", en: "Parking", de: "Parkplatz", ru: "Парковка", bs: "Parking" }),
      JSON.stringify({ tr: "Güvenlik", en: "Security", de: "Sicherheitsdienst", ru: "Охрана", bs: "Sigurnost" }),
      JSON.stringify({ tr: "Jeneratör", en: "Generator", de: "Generator", ru: "Генератор", bs: "Generator" }),
      JSON.stringify({ tr: "Balkon", en: "Balcony", de: "Balkon", ru: "Балкон", bs: "Balkon" }),
    ]
  },
  'havuzlu-residence-cikcilli': {
    description: {
      tr: "Cikcilli'nin gelişen bölgesinde yatırım değeri yüksek modern residence.",
      en: "A high-investment-value modern residence in Cikcilli's developing area.",
      de: "Eine moderne Residenz mit hohem Investitionswert in der aufstrebenden Region von Cikcilli.",
      ru: "Современная резиденция с высокой инвестиционной ценностью в развивающемся районе Джикджилли.",
      bs: "Moderna rezidencija visoke investicione vrijednosti u rastućem dijelu Cikcillija."
    },
    amenities: [
      JSON.stringify({ tr: "Açık Havuz", en: "Outdoor Pool", de: "Außenpool", ru: "Открытый бассейн", bs: "Otvoreni bazen" }),
      JSON.stringify({ tr: "Kapalı Havuz", en: "Indoor Pool", de: "Innenpool", ru: "Крытый бассейн", bs: "Zatvoreni bazen" }),
      JSON.stringify({ tr: "SPA", en: "SPA", de: "SPA", ru: "СПА", bs: "SPA" }),
      JSON.stringify({ tr: "Fitness", en: "Fitness Center", de: "Fitnessstudio", ru: "Фитнес-зал", bs: "Fitnes centar" }),
      JSON.stringify({ tr: "Sauna", en: "Sauna", de: "Sauna", ru: "Сауна", bs: "Sauna" }),
      JSON.stringify({ tr: "Otopark", en: "Parking", de: "Parkplatz", ru: "Парковка", bs: "Parking" }),
    ]
  },
  'doga-manzarali-villa-avsallar': {
    description: {
      tr: "Avsallar'ın eşsiz doğası içinde Toros Dağları ve Akdeniz manzaralı villa.",
      en: "A villa with Taurus Mountains and Mediterranean views amidst the unique nature of Avsallar.",
      de: "Eine Villa mit Blick auf das Taurusgebirge und das Mittelmeer inmitten der einzigartigen Natur von Avsallar.",
      ru: "Вилла с видом на Таврские горы и Средиземное море в окружении уникальной природы Авсаллара.",
      bs: "Vila s pogledom na Taurus planine i Mediteran usred jedinstvene prirode Avsallara."
    },
    amenities: [
      JSON.stringify({ tr: "Özel Havuz", en: "Private Pool", de: "Privatpool", ru: "Частный бассейн", bs: "Privatni bazen" }),
      JSON.stringify({ tr: "Büyük Bahçe", en: "Large Garden", de: "Großer Garten", ru: "Большой сад", bs: "Velika bašta" }),
      JSON.stringify({ tr: "Dağ Manzarası", en: "Mountain View", de: "Bergblick", ru: "Вид на горы", bs: "Pogled na planine" }),
      JSON.stringify({ tr: "Otopark", en: "Parking", de: "Parkplatz", ru: "Парковка", bs: "Parking" }),
      JSON.stringify({ tr: "BBQ", en: "BBQ", de: "Grill", ru: "Барбекю", bs: "BBQ" }),
      JSON.stringify({ tr: "Depo", en: "Storage", de: "Abstellraum", ru: "Кладовая", bs: "Ostava" }),
    ]
  },
  'studyo-daire-mahmutlar': {
    description: {
      tr: "Mahmutlar'da denize 500 metre mesafede yatırımlık stüdyo daire.",
      en: "An investment studio apartment in Mahmutlar, 500 meters from the sea.",
      de: "Ein Investmentstudio-Apartment in Mahmutlar, 500 Meter vom Meer entfernt.",
      ru: "Инвестиционная квартира-студия в Махмутларе, в 500 метрах от моря.",
      bs: "Investicijski studio stan u Mahmutlaru, 500 metara od mora."
    },
    amenities: [
      JSON.stringify({ tr: "Eşyalı", en: "Furnished", de: "Möbliert", ru: "Меблированная", bs: "Namješten" }),
      JSON.stringify({ tr: "Havuz", en: "Pool", de: "Pool", ru: "Бассейн", bs: "Bazen" }),
      JSON.stringify({ tr: "Fitness", en: "Fitness Center", de: "Fitnessstudio", ru: "Фитнес-зал", bs: "Fitnes centar" }),
      JSON.stringify({ tr: "Güvenlik", en: "Security", de: "Sicherheitsdienst", ru: "Охрана", bs: "Sigurnost" }),
      JSON.stringify({ tr: "Balkon", en: "Balcony", de: "Balkon", ru: "Балкон", bs: "Balkon" }),
    ]
  },
  'dubleks-penthouse-oba': {
    description: {
      tr: "Oba'da çift katlı lüks dubleks penthouse.",
      en: "A luxury duplex penthouse in Oba with double floors.",
      de: "Ein luxuriöses Duplex-Penthouse in Oba mit zwei Etagen.",
      ru: "Роскошный двухуровневый пентхаус-дуплекс в Обе.",
      bs: "Luksuzni dupleks penthaus na dva sprata u Obi."
    },
    amenities: [
      JSON.stringify({ tr: "Çift Kat", en: "Duplex", de: "Duplex", ru: "Дуплекс", bs: "Dupleks" }),
      JSON.stringify({ tr: "Özel Teras", en: "Private Terrace", de: "Privatterrasse", ru: "Частная терраса", bs: "Privatna terasa" }),
      JSON.stringify({ tr: "Deniz Manzarası", en: "Sea View", de: "Meerblick", ru: "Вид на море", bs: "Pogled na more" }),
      JSON.stringify({ tr: "Jakuzi", en: "Jacuzzi", de: "Whirlpool", ru: "Джакузи", bs: "Đakuzi" }),
      JSON.stringify({ tr: "Akıllı Ev", en: "Smart Home", de: "Smart Home", ru: "Умный дом", bs: "Pametna kuća" }),
      JSON.stringify({ tr: "Garaj", en: "Garage", de: "Garage", ru: "Гараж", bs: "Garaža" }),
    ]
  },
  'denize-sifir-daire-kestel': {
    description: {
      tr: "Kestel sahilinde denize sıfır daire.",
      en: "A beachfront apartment on the Kestel coastline.",
      de: "Eine Wohnung direkt am Strand an der Küste von Kestel.",
      ru: "Квартира на первой береговой линии побережья Кестель.",
      bs: "Stan na samoj obali Kestela."
    },
    amenities: [
      JSON.stringify({ tr: "Denize Sıfır", en: "Beachfront", de: "Direkt am Strand", ru: "На первой линии", bs: "Uz more" }),
      JSON.stringify({ tr: "Özel Plaj", en: "Private Beach", de: "Privatstrand", ru: "Частный пляж", bs: "Privatna plaža" }),
      JSON.stringify({ tr: "Havuz", en: "Pool", de: "Pool", ru: "Бассейн", bs: "Bazen" }),
      JSON.stringify({ tr: "Fitness", en: "Fitness Center", de: "Fitnessstudio", ru: "Фитнес-зал", bs: "Fitnes centar" }),
      JSON.stringify({ tr: "Sauna", en: "Sauna", de: "Sauna", ru: "Сауна", bs: "Sauna" }),
      JSON.stringify({ tr: "Otopark", en: "Parking", de: "Parkplatz", ru: "Парковка", bs: "Parking" }),
    ]
  },
  'mustakil-villa-kargicak': {
    description: {
      tr: "Kargıcak'ın yüksek kesiminde 180 derece deniz manzaralı müstakil villa.",
      en: "A detached villa with 180-degree sea views in the highlands of Kargicak.",
      de: "Eine freistehende Villa mit 180-Grad-Meerblick in den Höhen von Kargicak.",
      ru: "Отдельная вилла с видом на море на 180 градусов на возвышенностях Каргыджака.",
      bs: "Samostalna vila s pogledom na more od 180 stepeni na visinama Kargidžaka."
    },
    amenities: [
      JSON.stringify({ tr: "Müstakil", en: "Detached", de: "Freistehend", ru: "Отдельная", bs: "Samostalna" }),
      JSON.stringify({ tr: "Özel Havuz", en: "Private Pool", de: "Privatpool", ru: "Частный бассейн", bs: "Privatni bazen" }),
      JSON.stringify({ tr: "180° Deniz Manzarası", en: "180° Sea View", de: "180° Meerblick", ru: "Панорама моря 180°", bs: "180° pogled na more" }),
      JSON.stringify({ tr: "Garaj", en: "Garage", de: "Garage", ru: "Гараж", bs: "Garaža" }),
      JSON.stringify({ tr: "Bahçe", en: "Garden", de: "Garten", ru: "Сад", bs: "Bašta" }),
      JSON.stringify({ tr: "Güvenlik", en: "Security", de: "Sicherheitsdienst", ru: "Охрана", bs: "Sigurnost" }),
    ]
  },
  'luks-residence-konakli': {
    description: {
      tr: "Konaklı'nın merkezi konumunda lüks residence.",
      en: "A luxury residence in the central location of Konakli.",
      de: "Eine Luxusresidenz in zentraler Lage von Konakli.",
      ru: "Роскошная резиденция в центральной части Конаклы.",
      bs: "Luksuzna rezidencija na centralnoj lokaciji Konaklija."
    },
    amenities: [
      JSON.stringify({ tr: "Havuz", en: "Pool", de: "Pool", ru: "Бассейн", bs: "Bazen" }),
      JSON.stringify({ tr: "Fitness", en: "Fitness Center", de: "Fitnessstudio", ru: "Фитнес-зал", bs: "Fitnes centar" }),
      JSON.stringify({ tr: "Sauna", en: "Sauna", de: "Sauna", ru: "Сауна", bs: "Sauna" }),
      JSON.stringify({ tr: "Türk Hamamı", en: "Turkish Bath", de: "Türkisches Bad", ru: "Турецкая баня", bs: "Tursko kupatilo" }),
      JSON.stringify({ tr: "Otopark", en: "Parking", de: "Parkplatz", ru: "Парковка", bs: "Parking" }),
      JSON.stringify({ tr: "Güvenlik", en: "Security", de: "Sicherheitsdienst", ru: "Охрана", bs: "Sigurnost" }),
    ]
  },
  'bahceli-villa-tosmur': {
    description: {
      tr: "Tosmur'da geniş bahçeli aileler için ideal villa.",
      en: "An ideal villa for families with a large garden in Tosmur.",
      de: "Eine ideale Villa für Familien mit großem Garten in Tosmur.",
      ru: "Идеальная вилла для семей с большим садом в Тосмуре.",
      bs: "Idealna vila za porodice s velikom baštom u Tosmuru."
    },
    amenities: [
      JSON.stringify({ tr: "Özel Havuz", en: "Private Pool", de: "Privatpool", ru: "Частный бассейн", bs: "Privatni bazen" }),
      JSON.stringify({ tr: "Geniş Bahçe", en: "Large Garden", de: "Großer Garten", ru: "Большой сад", bs: "Velika bašta" }),
      JSON.stringify({ tr: "Otopark", en: "Parking", de: "Parkplatz", ru: "Парковка", bs: "Parking" }),
      JSON.stringify({ tr: "BBQ", en: "BBQ", de: "Grill", ru: "Барбекю", bs: "BBQ" }),
      JSON.stringify({ tr: "Depo", en: "Storage", de: "Abstellraum", ru: "Кладовая", bs: "Ostava" }),
      JSON.stringify({ tr: "Teras", en: "Terrace", de: "Terrasse", ru: "Терраса", bs: "Terasa" }),
    ]
  },
  'panoramik-penthouse-cikcilli': {
    description: {
      tr: "Cikcilli'de panoramik Akdeniz manzaralı geniş penthouse.",
      en: "A spacious penthouse with panoramic Mediterranean views in Cikcilli.",
      de: "Ein großzügiges Penthouse mit Panoramablick auf das Mittelmeer in Cikcilli.",
      ru: "Просторный пентхаус с панорамным видом на Средиземное море в Джикджилли.",
      bs: "Prostrani penthaus s panoramskim pogledom na Mediteran u Cikcilliju."
    },
    amenities: [
      JSON.stringify({ tr: "Panoramik Manzara", en: "Panoramic View", de: "Panoramablick", ru: "Панорамный вид", bs: "Panoramski pogled" }),
      JSON.stringify({ tr: "Geniş Teras", en: "Large Terrace", de: "Große Terrasse", ru: "Большая терраса", bs: "Velika terasa" }),
      JSON.stringify({ tr: "Açık Mutfak", en: "Open Kitchen", de: "Offene Küche", ru: "Открытая кухня", bs: "Otvorena kuhinja" }),
      JSON.stringify({ tr: "Havuz", en: "Pool", de: "Pool", ru: "Бассейн", bs: "Bazen" }),
      JSON.stringify({ tr: "Fitness", en: "Fitness Center", de: "Fitnessstudio", ru: "Фитнес-зал", bs: "Fitnes centar" }),
      JSON.stringify({ tr: "Otopark", en: "Parking", de: "Parkplatz", ru: "Парковка", bs: "Parking" }),
    ]
  },
  'tatil-villasi-avsallar': {
    description: {
      tr: "Avsallar'da tatil ve yatırım amaçlı mükemmel villa.",
      en: "A perfect villa in Avsallar for both holiday and investment purposes.",
      de: "Eine perfekte Villa in Avsallar für Urlaubs- und Investitionszwecke.",
      ru: "Идеальная вилла в Авсалларе для отдыха и инвестиций.",
      bs: "Savršena vila u Avsallaru za odmor i investiciju."
    },
    amenities: [
      JSON.stringify({ tr: "Özel Havuz", en: "Private Pool", de: "Privatpool", ru: "Частный бассейн", bs: "Privatni bazen" }),
      JSON.stringify({ tr: "Bahçe", en: "Garden", de: "Garten", ru: "Сад", bs: "Bašta" }),
      JSON.stringify({ tr: "BBQ", en: "BBQ", de: "Grill", ru: "Барбекю", bs: "BBQ" }),
      JSON.stringify({ tr: "Klima", en: "Air Conditioning", de: "Klimaanlage", ru: "Кондиционер", bs: "Klima" }),
      JSON.stringify({ tr: "Eşyalı", en: "Furnished", de: "Möbliert", ru: "Меблированная", bs: "Namješten" }),
      JSON.stringify({ tr: "Otopark", en: "Parking", de: "Parkplatz", ru: "Парковка", bs: "Parking" }),
    ]
  },
  'yatirimlik-daire-mahmutlar': {
    description: {
      tr: "Mahmutlar'da uygun fiyatlı yatırımlık daire.",
      en: "An affordable investment apartment in Mahmutlar.",
      de: "Eine erschwingliche Investmentwohnung in Mahmutlar.",
      ru: "Доступная инвестиционная квартира в Махмутларе.",
      bs: "Pristupačan investicijski stan u Mahmutlaru."
    },
    amenities: [
      JSON.stringify({ tr: "Havuz", en: "Pool", de: "Pool", ru: "Бассейн", bs: "Bazen" }),
      JSON.stringify({ tr: "Güvenlik", en: "Security", de: "Sicherheitsdienst", ru: "Охрана", bs: "Sigurnost" }),
      JSON.stringify({ tr: "Otopark", en: "Parking", de: "Parkplatz", ru: "Парковка", bs: "Parking" }),
      JSON.stringify({ tr: "Balkon", en: "Balcony", de: "Balkon", ru: "Балкон", bs: "Balkon" }),
      JSON.stringify({ tr: "Asansör", en: "Elevator", de: "Aufzug", ru: "Лифт", bs: "Lift" }),
    ]
  },
  'teras-daire-oba': {
    description: {
      tr: "Oba'da geniş teraslı modern daire.",
      en: "A modern apartment with a spacious terrace in Oba.",
      de: "Eine moderne Wohnung mit großer Terrasse in Oba.",
      ru: "Современная квартира с просторной террасой в Обе.",
      bs: "Moderan stan s prostranom terasom u Obi."
    },
    amenities: [
      JSON.stringify({ tr: "Geniş Teras", en: "Large Terrace", de: "Große Terrasse", ru: "Большая терраса", bs: "Velika terasa" }),
      JSON.stringify({ tr: "Havuz", en: "Pool", de: "Pool", ru: "Бассейн", bs: "Bazen" }),
      JSON.stringify({ tr: "Merkezi Konum", en: "Central Location", de: "Zentrale Lage", ru: "Центральное расположение", bs: "Centralna lokacija" }),
      JSON.stringify({ tr: "Otopark", en: "Parking", de: "Parkplatz", ru: "Парковка", bs: "Parking" }),
      JSON.stringify({ tr: "Asansör", en: "Elevator", de: "Aufzug", ru: "Лифт", bs: "Lift" }),
      JSON.stringify({ tr: "Güvenlik", en: "Security", de: "Sicherheitsdienst", ru: "Охрана", bs: "Sigurnost" }),
    ]
  },
  'luks-mustakil-villa-kargicak': {
    description: {
      tr: "Kargıcak'ta eşsiz deniz manzarasına sahip ultra lüks villa.",
      en: "An ultra-luxury villa with unparalleled sea views in Kargicak.",
      de: "Eine Ultra-Luxus-Villa mit einzigartigem Meerblick in Kargicak.",
      ru: "Ультра-роскошная вилла с непревзойдённым видом на море в Каргыджаке.",
      bs: "Ultra luksuzna vila s nenadmašnim pogledom na more u Kargidžaku."
    },
    amenities: [
      JSON.stringify({ tr: "Infinity Havuz", en: "Infinity Pool", de: "Infinity-Pool", ru: "Бассейн инфинити", bs: "Infinity bazen" }),
      JSON.stringify({ tr: "Sinema Odası", en: "Cinema Room", de: "Kinoraum", ru: "Кинозал", bs: "Kino soba" }),
      JSON.stringify({ tr: "Şarap Mahzeni", en: "Wine Cellar", de: "Weinkeller", ru: "Винный погреб", bs: "Vinski podrum" }),
      JSON.stringify({ tr: "Akıllı Ev", en: "Smart Home", de: "Smart Home", ru: "Умный дом", bs: "Pametna kuća" }),
      JSON.stringify({ tr: "Asansör", en: "Elevator", de: "Aufzug", ru: "Лифт", bs: "Lift" }),
      JSON.stringify({ tr: "Helipad", en: "Helipad", de: "Hubschrauberlandeplatz", ru: "Вертолётная площадка", bs: "Helipad" }),
    ]
  },
  'rezidans-daire-konakli': {
    description: {
      tr: "Konaklı'da uygun fiyatlı modern rezidans daire.",
      en: "An affordable modern residence apartment in Konakli.",
      de: "Eine erschwingliche moderne Residenzwohnung in Konakli.",
      ru: "Доступная современная квартира-резиденция в Конаклы.",
      bs: "Pristupačan moderan rezidencijski stan u Konakliju."
    },
    amenities: [
      JSON.stringify({ tr: "Havuz", en: "Pool", de: "Pool", ru: "Бассейн", bs: "Bazen" }),
      JSON.stringify({ tr: "Fitness", en: "Fitness Center", de: "Fitnessstudio", ru: "Фитнес-зал", bs: "Fitnes centar" }),
      JSON.stringify({ tr: "Otopark", en: "Parking", de: "Parkplatz", ru: "Парковка", bs: "Parking" }),
      JSON.stringify({ tr: "Güvenlik", en: "Security", de: "Sicherheitsdienst", ru: "Охрана", bs: "Sigurnost" }),
      JSON.stringify({ tr: "Çocuk Parkı", en: "Children's Playground", de: "Kinderspielplatz", ru: "Детская площадка", bs: "Dječje igralište" }),
      JSON.stringify({ tr: "Balkon", en: "Balcony", de: "Balkon", ru: "Балкон", bs: "Balkon" }),
    ]
  },
}

async function main() {
  console.log('Updating property translations...')
  let success = 0
  let failed = 0

  for (const [slug, data] of Object.entries(TRANSLATIONS)) {
    try {
      const body = {
        description: data.description,
        amenities: data.amenities,
      }
      await request('PATCH', `/rest/v1/properties?slug=eq.${slug}`, body)
      console.log(`  ✓ ${slug}`)
      success++
    } catch (err) {
      console.error(`  ✗ ${slug}: ${err.message}`)
      failed++
    }
  }

  console.log(`\nDone: ${success} updated, ${failed} failed`)
}

main().catch(console.error)
