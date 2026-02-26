const SUPABASE_URL = 'https://ycrlkkkoxrsmugidznri.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inljcmxra2tveHJzbXVnaWR6bnJpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTE3MzEyOSwiZXhwIjoyMDg2NzQ5MTI5fQ.ZfgE4FEPU2p13nJC3np9OUOuBJeKqUDUYF0nka57ihc'

const areas = {
  mahmutlar: {
    highlights: [
      '{"tr":"Denize 300m mesafe","en":"300m to the sea","de":"300m zum Meer","ru":"300м до моря","bs":"300m do mora"}',
      '{"tr":"Zengin altyapı","en":"Rich infrastructure","de":"Gute Infrastruktur","ru":"Развитая инфраструктура","bs":"Bogata infrastruktura"}',
      '{"tr":"Yabancı yatırımcı dostu","en":"Foreign investor friendly","de":"Investorenfreundlich","ru":"Дружелюбен к инвесторам","bs":"Prijateljski za investitore"}',
      '{"tr":"Uygun fiyat/performans","en":"Great value for money","de":"Gutes Preis-Leistungs-Verhältnis","ru":"Отличное соотношение цена/качество","bs":"Odličan omjer cijene i kvaliteta"}',
      '{"tr":"Yıl boyu yaşanabilir","en":"Year-round living","de":"Ganzjährig bewohnbar","ru":"Круглогодичное проживание","bs":"Život tokom cijele godine"}',
      '{"tr":"Yüksek kira getirisi","en":"High rental yield","de":"Hohe Mietrendite","ru":"Высокая арендная доходность","bs":"Visoki prinos od najma"}'
    ],
    description: {
      tr: 'Alanya\'nın en popüler yatırım bölgesi. Uygun fiyatlar ve yüksek kira getirisi.',
      en: 'Alanya\'s most popular investment area with affordable prices and high rental yields.',
      de: 'Alanyas beliebtestes Investitionsgebiet mit erschwinglichen Preisen und hohen Mietrenditen.',
      ru: 'Самый популярный инвестиционный район Аланьи с доступными ценами и высокой арендной доходностью.',
      bs: 'Najpopularnija investiciona zona Alanje s povoljnim cijenama i visokim prinosom od najma.'
    },
    description_long: {
      tr: 'Mahmutlar, Alanya\'nın doğusunda yer alan en büyük ve en hızlı gelişen bölgelerden biridir. Denize yakın konumu, uygun fiyatları ve zengin altyapısıyla yabancı yatırımcıların ilgisini çekmektedir. Bölgede marketler, restoranlar, okullar ve sağlık merkezleri bulunmaktadır.',
      en: 'Mahmutlar is one of the largest and fastest-growing districts east of Alanya. Its proximity to the sea, affordable prices, and rich infrastructure attract foreign investors. The area has supermarkets, restaurants, schools, and healthcare centers.',
      de: 'Mahmutlar ist einer der größten und am schnellsten wachsenden Stadtteile östlich von Alanya. Die Nähe zum Meer, erschwingliche Preise und eine gute Infrastruktur ziehen ausländische Investoren an. Es gibt Supermärkte, Restaurants, Schulen und Gesundheitszentren.',
      ru: 'Махмутлар — один из крупнейших и наиболее быстро развивающихся районов к востоку от Аланьи. Близость к морю, доступные цены и развитая инфраструктура привлекают иностранных инвесторов. В районе есть супермаркеты, рестораны, школы и медицинские центры.',
      bs: 'Mahmutlar je jedna od najvećih i najbrže rastućih četvrti istočno od Alanje. Blizina mora, povoljne cijene i bogata infrastruktura privlače strane investitore. U području se nalaze supermarketi, restorani, škole i zdravstveni centri.'
    }
  },
  oba: {
    highlights: [
      '{"tr":"Şehir merkezi konumu","en":"City center location","de":"Zentrale Lage","ru":"Расположение в центре","bs":"Lokacija u centru grada"}',
      '{"tr":"Premium projeler","en":"Premium projects","de":"Premium-Projekte","ru":"Премиальные проекты","bs":"Premium projekti"}',
      '{"tr":"Hastane ve okul yakınlığı","en":"Near hospitals & schools","de":"Nahe Krankenhäuser & Schulen","ru":"Рядом больницы и школы","bs":"Blizu bolnica i škola"}',
      '{"tr":"Alışveriş merkezleri","en":"Shopping malls","de":"Einkaufszentren","ru":"Торговые центры","bs":"Trgovački centri"}',
      '{"tr":"Restoran ve kafeler","en":"Restaurants & cafes","de":"Restaurants & Cafés","ru":"Рестораны и кафе","bs":"Restorani i kafići"}',
      '{"tr":"Modern altyapı","en":"Modern infrastructure","de":"Moderne Infrastruktur","ru":"Современная инфраструктура","bs":"Moderna infrastruktura"}'
    ],
    description: {
      tr: 'Alanya\'nın modern şehir merkezi. Premium projeler ve lüks yaşam.',
      en: 'Alanya\'s modern city center with premium projects and luxury living.',
      de: 'Alanyas modernes Stadtzentrum mit Premium-Projekten und luxuriösem Wohnen.',
      ru: 'Современный центр Аланьи с премиальными проектами и роскошной жизнью.',
      bs: 'Moderni centar Alanje s premium projektima i luksuznim životom.'
    },
    description_long: {
      tr: 'Oba, Alanya\'nın en merkezi ve prestijli bölgesidir. Modern alışveriş merkezleri, hastaneler, okullar ve restoranlarla çevrilidir. Premium residence projeleri ve lüks yaşam alanlarıyla dikkat çekmektedir.',
      en: 'Oba is Alanya\'s most central and prestigious district. It is surrounded by modern shopping malls, hospitals, schools, and restaurants. It stands out with premium residence projects and luxury living spaces.',
      de: 'Oba ist der zentralste und prestigeträchtigste Stadtteil von Alanya. Er ist umgeben von modernen Einkaufszentren, Krankenhäusern, Schulen und Restaurants. Er zeichnet sich durch Premium-Residenzprojekte und luxuriöse Wohnräume aus.',
      ru: 'Оба — самый центральный и престижный район Аланьи. Он окружён современными торговыми центрами, больницами, школами и ресторанами. Район отличается премиальными жилыми проектами и роскошными жилыми пространствами.',
      bs: 'Oba je najcentralnija i najprestižnija četvrt Alanje. Okružena je modernim trgovačkim centrima, bolnicama, školama i restoranima. Ističe se premium rezidencijalnim projektima i luksuznim životnim prostorima.'
    }
  },
  kestel: {
    highlights: [
      '{"tr":"Denize sıfır projeler","en":"Beachfront projects","de":"Strandprojekte","ru":"Проекты на берегу моря","bs":"Projekti na plaži"}',
      '{"tr":"Kleopatra Plajı yakınlığı","en":"Near Cleopatra Beach","de":"Nahe Kleopatra-Strand","ru":"Рядом с пляжем Клеопатры","bs":"Blizu plaže Kleopatra"}',
      '{"tr":"Doğal güzellik","en":"Natural beauty","de":"Natürliche Schönheit","ru":"Природная красота","bs":"Prirodna ljepota"}',
      '{"tr":"Sakin ortam","en":"Peaceful environment","de":"Ruhige Umgebung","ru":"Спокойная обстановка","bs":"Mirno okruženje"}',
      '{"tr":"Su sporları","en":"Water sports","de":"Wassersport","ru":"Водные виды спорта","bs":"Vodeni sportovi"}',
      '{"tr":"Kalıcı konut","en":"Permanent residences","de":"Dauerhafte Wohnungen","ru":"Постоянное жильё","bs":"Stalni stanovi"}'
    ],
    description: {
      tr: 'Denize sıfır konumu ve doğal güzelliğiyle öne çıkan sahil bölgesi.',
      en: 'Coastal district known for its beachfront location and natural beauty.',
      de: 'Küstenbezirk, bekannt für seine Strandlage und natürliche Schönheit.',
      ru: 'Прибрежный район, известный своим расположением у моря и природной красотой.',
      bs: 'Obalna četvrt poznata po lokaciji na plaži i prirodnoj ljepoti.'
    },
    description_long: {
      tr: 'Kestel, Alanya merkezinin batısında yer alan sakin ve huzurlu bir sahil bölgesidir. Denize sıfır projeleri, doğal güzelliği ve Kleopatra Plajı\'na yakınlığıyla bilinir. Su sporları ve açık hava aktiviteleri için idealdir.',
      en: 'Kestel is a quiet and peaceful coastal district west of Alanya center. It is known for its beachfront projects, natural beauty, and proximity to Cleopatra Beach. Ideal for water sports and outdoor activities.',
      de: 'Kestel ist ein ruhiger Küstenbezirk westlich des Zentrums von Alanya. Er ist bekannt für Strandprojekte, natürliche Schönheit und die Nähe zum Kleopatra-Strand. Ideal für Wassersport und Outdoor-Aktivitäten.',
      ru: 'Кестель — тихий и спокойный прибрежный район к западу от центра Аланьи. Известен проектами на берегу моря, природной красотой и близостью к пляжу Клеопатры. Идеально подходит для водных видов спорта и активного отдыха.',
      bs: 'Kestel je mirna obalna četvrt zapadno od centra Alanje. Poznata je po projektima na plaži, prirodnoj ljepoti i blizini plaže Kleopatra. Idealna za vodene sportove i aktivnosti na otvorenom.'
    }
  },
  kargicak: {
    highlights: [
      '{"tr":"Lüks villa projeleri","en":"Luxury villa projects","de":"Luxus-Villaprojekte","ru":"Проекты роскошных вилл","bs":"Luksuzni projekti vila"}',
      '{"tr":"Eşsiz deniz manzarası","en":"Unique sea views","de":"Einzigartiger Meerblick","ru":"Уникальный вид на море","bs":"Jedinstveni pogled na more"}',
      '{"tr":"Özel yaşam alanları","en":"Private living areas","de":"Private Wohnbereiche","ru":"Частные жилые зоны","bs":"Privatni životni prostori"}',
      '{"tr":"Doğa ile iç içe","en":"Surrounded by nature","de":"Umgeben von Natur","ru":"В окружении природы","bs":"Okružen prirodom"}',
      '{"tr":"Yüksek yatırım değeri","en":"High investment value","de":"Hoher Investitionswert","ru":"Высокая инвестиционная ценность","bs":"Visoka investiciona vrijednost"}',
      '{"tr":"Premium konfor","en":"Premium comfort","de":"Premium-Komfort","ru":"Премиальный комфорт","bs":"Premium komfor"}'
    ],
    description: {
      tr: 'Lüks villaların adresi. Eşsiz deniz manzarası ve sakin yaşam.',
      en: 'Home of luxury villas with unique sea views and peaceful living.',
      de: 'Heimat der Luxusvillen mit einzigartigem Meerblick und ruhigem Wohnen.',
      ru: 'Дом роскошных вилл с уникальным видом на море и спокойной жизнью.',
      bs: 'Dom luksuznih vila s jedinstvenim pogledom na more i mirnim životom.'
    },
    description_long: {
      tr: 'Kargıcak, lüks villa projeleriyle tanınan prestijli bir bölgedir. Eşsiz deniz manzarası, doğayla iç içe yaşam ve özel konut projeleri sunar. Yüksek yatırım değeri ve premium konforuyla dikkat çeker.',
      en: 'Kargicak is a prestigious district known for luxury villa projects. It offers unique sea views, living in harmony with nature, and exclusive residential projects. It stands out with high investment value and premium comfort.',
      de: 'Kargıcak ist ein prestigeträchtiger Bezirk, bekannt für Luxus-Villaprojekte. Er bietet einzigartigen Meerblick, Leben im Einklang mit der Natur und exklusive Wohnprojekte. Er zeichnet sich durch hohen Investitionswert und Premium-Komfort aus.',
      ru: 'Каргыджак — престижный район, известный проектами роскошных вилл. Он предлагает уникальный вид на море, жизнь в гармонии с природой и эксклюзивные жилые проекты. Выделяется высокой инвестиционной ценностью и премиальным комфортом.',
      bs: 'Kargıcak je prestižna četvrt poznata po luksuznim projektima vila. Nudi jedinstveni pogled na more, život u harmoniji s prirodom i ekskluzivne stambene projekte. Ističe se visokom investicionom vrijednošću i premium komforom.'
    }
  },
  tosmur: {
    highlights: [
      '{"tr":"Aile dostu ortam","en":"Family-friendly environment","de":"Familienfreundlich","ru":"Семейная атмосфера","bs":"Porodično okruženje"}',
      '{"tr":"Dim Çayı yakınlığı","en":"Near Dim River","de":"Nahe Dim-Fluss","ru":"Рядом с рекой Дим","bs":"Blizu rijeke Dim"}',
      '{"tr":"Yeşil alanlar","en":"Green areas","de":"Grünflächen","ru":"Зелёные зоны","bs":"Zelene površine"}',
      '{"tr":"Merkeze yakın","en":"Close to center","de":"Zentrumsnah","ru":"Близко к центру","bs":"Blizu centra"}',
      '{"tr":"Uygun fiyatlar","en":"Affordable prices","de":"Erschwingliche Preise","ru":"Доступные цены","bs":"Povoljne cijene"}',
      '{"tr":"Sakin çevre","en":"Quiet surroundings","de":"Ruhige Umgebung","ru":"Тихая обстановка","bs":"Mirna okolina"}'
    ],
    description: {
      tr: 'Aileler için ideal, sakin ve huzurlu yaşam bölgesi.',
      en: 'Ideal for families, a peaceful and tranquil living area.',
      de: 'Ideal für Familien, ein friedlicher und ruhiger Wohnbereich.',
      ru: 'Идеально для семей, спокойная и тихая жилая зона.',
      bs: 'Idealna za porodice, mirna i spokojna zona za život.'
    },
    description_long: {
      tr: 'Tosmur, hem şehir hayatına yakın hem de sakin yaşam sunar. Dim Çayı\'na yakınlığı, yeşil alanları ve aile dostu ortamıyla öne çıkar. Uygun fiyatlarıyla hem yaşam hem de yatırım için cazip bir bölgedir.',
      en: 'Tosmur offers both city proximity and quiet living. It stands out with its proximity to Dim River, green areas, and family-friendly environment. With affordable prices, it is an attractive area for both living and investment.',
      de: 'Tosmur bietet sowohl Stadtnähe als auch ruhiges Wohnen. Es zeichnet sich durch die Nähe zum Dim-Fluss, Grünflächen und eine familienfreundliche Umgebung aus. Mit erschwinglichen Preisen ist es ein attraktives Gebiet zum Wohnen und Investieren.',
      ru: 'Тосмур предлагает как близость к городу, так и спокойную жизнь. Выделяется близостью к реке Дим, зелёными зонами и семейной атмосферой. Благодаря доступным ценам это привлекательный район для жизни и инвестиций.',
      bs: 'Tosmur nudi i blizinu grada i miran život. Ističe se blizinom rijeke Dim, zelenim površinama i porodičnim okruženjem. S povoljnim cijenama, to je privlačna zona za život i investicije.'
    }
  },
  cikcilli: {
    highlights: [
      '{"tr":"Hızlı değer artışı","en":"Rapid value increase","de":"Schneller Wertzuwachs","ru":"Быстрый рост стоимости","bs":"Brzi rast vrijednosti"}',
      '{"tr":"Yeni nesil projeler","en":"New-generation projects","de":"Projekte der neuen Generation","ru":"Проекты нового поколения","bs":"Projekti nove generacije"}',
      '{"tr":"Stratejik konum","en":"Strategic location","de":"Strategische Lage","ru":"Стратегическое расположение","bs":"Strateška lokacija"}',
      '{"tr":"Uygun giriş fiyatları","en":"Affordable entry prices","de":"Erschwingliche Einstiegspreise","ru":"Доступные начальные цены","bs":"Povoljne ulazne cijene"}',
      '{"tr":"Modern altyapı","en":"Modern infrastructure","de":"Moderne Infrastruktur","ru":"Современная инфраструктура","bs":"Moderna infrastruktura"}',
      '{"tr":"Yüksek ROI","en":"High ROI","de":"Hohe Rendite","ru":"Высокая рентабельность","bs":"Visoki ROI"}'
    ],
    description: {
      tr: 'Hızla gelişen, yatırım potansiyeli yüksek modern bölge.',
      en: 'Rapidly developing modern area with high investment potential.',
      de: 'Schnell wachsendes modernes Gebiet mit hohem Investitionspotenzial.',
      ru: 'Быстро развивающийся современный район с высоким инвестиционным потенциалом.',
      bs: 'Brzorastuća moderna zona s visokim investicionim potencijalom.'
    },
    description_long: {
      tr: 'Cikcilli, yeni nesil residence projelerine ev sahipliği yapan modern bölgedir. Stratejik konumu, uygun giriş fiyatları ve hızlı değer artışıyla yatırımcılar için cazip bir seçenektir. Modern altyapısı ve yüksek ROI oranlarıyla dikkat çeker.',
      en: 'Cikcilli is a modern district hosting new-generation residence projects. Its strategic location, affordable entry prices, and rapid value increase make it an attractive option for investors. It stands out with modern infrastructure and high ROI rates.',
      de: 'Cikcilli ist ein moderner Stadtteil mit Residenzprojekten der neuen Generation. Seine strategische Lage, erschwingliche Einstiegspreise und ein schneller Wertzuwachs machen ihn zu einer attraktiven Option für Investoren. Er überzeugt mit moderner Infrastruktur und hohen Renditen.',
      ru: 'Джикджилли — современный район с жилыми проектами нового поколения. Стратегическое расположение, доступные начальные цены и быстрый рост стоимости делают его привлекательным вариантом для инвесторов. Выделяется современной инфраструктурой и высокой рентабельностью.',
      bs: 'Cikcilli je moderna četvrt s rezidencijalnim projektima nove generacije. Strateška lokacija, povoljne ulazne cijene i brzi rast vrijednosti čine ga privlačnom opcijom za investitore. Ističe se modernom infrastrukturom i visokim stopama ROI.'
    }
  },
  avsallar: {
    highlights: [
      '{"tr":"İncekum Plajı","en":"Incekum Beach","de":"Incekum-Strand","ru":"Пляж Инджекум","bs":"Plaža Incekum"}',
      '{"tr":"Doğal güzellik","en":"Natural beauty","de":"Natürliche Schönheit","ru":"Природная красота","bs":"Prirodna ljepota"}',
      '{"tr":"Toros Dağları manzarası","en":"Taurus Mountains views","de":"Blick auf das Taurusgebirge","ru":"Виды на горы Таурус","bs":"Pogled na Taurus planine"}',
      '{"tr":"Tatil ve emeklilik","en":"Vacation & retirement","de":"Urlaub & Ruhestand","ru":"Отдых и пенсия","bs":"Odmor i penzija"}',
      '{"tr":"Yüksek kira getirisi","en":"High rental yield","de":"Hohe Mietrendite","ru":"Высокая арендная доходность","bs":"Visoki prinos od najma"}',
      '{"tr":"Uygun fiyatlar","en":"Affordable prices","de":"Erschwingliche Preise","ru":"Доступные цены","bs":"Povoljne cijene"}'
    ],
    description: {
      tr: 'Doğa, deniz ve huzurun buluştuğu tatil cenneti.',
      en: 'A holiday paradise where nature, sea, and peace meet.',
      de: 'Ein Urlaubsparadies, wo Natur, Meer und Ruhe aufeinandertreffen.',
      ru: 'Райский уголок, где встречаются природа, море и покой.',
      bs: 'Raj za odmor gdje se susreću priroda, more i mir.'
    },
    description_long: {
      tr: 'Avsallar, İncekum Plajı ile ünlü doğal tatil bölgesidir. Toros Dağları manzarası, doğal güzelliği ve uygun fiyatlarıyla hem tatil hem de emeklilik için ideal bir bölgedir. Yüksek kira getirisi sunar.',
      en: 'Avsallar is a natural holiday resort famous for Incekum Beach. With its Taurus Mountains views, natural beauty, and affordable prices, it is ideal for both vacation and retirement. It offers high rental yields.',
      de: 'Avsallar ist ein natürliches Urlaubsgebiet, berühmt für den Incekum-Strand. Mit Blick auf das Taurusgebirge, natürlicher Schönheit und erschwinglichen Preisen ist es ideal für Urlaub und Ruhestand. Es bietet hohe Mietrenditen.',
      ru: 'Авсаллар — природный курортный район, знаменитый пляжем Инджекум. С видами на горы Таурус, природной красотой и доступными ценами, это идеальное место для отдыха и пенсии. Предлагает высокую арендную доходность.',
      bs: 'Avsallar je prirodno odmaralište poznato po plaži Incekum. S pogledom na planine Taurus, prirodnom ljepotom i povoljnim cijenama, idealan je za odmor i penziju. Nudi visoki prinos od najma.'
    }
  },
  konakli: {
    highlights: [
      '{"tr":"Tarihi kalıntılar","en":"Historical ruins","de":"Historische Ruinen","ru":"Исторические руины","bs":"Historijske ruševine"}',
      '{"tr":"Yerel pazar","en":"Local market","de":"Lokaler Markt","ru":"Местный рынок","bs":"Lokalna tržnica"}',
      '{"tr":"Geleneksel atmosfer","en":"Traditional atmosphere","de":"Traditionelle Atmosphäre","ru":"Традиционная атмосфера","bs":"Tradicionalna atmosfera"}',
      '{"tr":"Uygun fiyatlar","en":"Affordable prices","de":"Erschwingliche Preise","ru":"Доступные цены","bs":"Povoljne cijene"}',
      '{"tr":"Turizm potansiyeli","en":"Tourism potential","de":"Tourismuspotenzial","ru":"Туристический потенциал","bs":"Turistički potencijal"}',
      '{"tr":"Modern projeler","en":"Modern projects","de":"Moderne Projekte","ru":"Современные проекты","bs":"Moderni projekti"}'
    ],
    description: {
      tr: 'Tarihi doku ve modern yaşamın harmonisi.',
      en: 'A harmony of historical heritage and modern living.',
      de: 'Eine Harmonie von historischem Erbe und modernem Leben.',
      ru: 'Гармония исторического наследия и современной жизни.',
      bs: 'Harmonija historijskog naslijeđa i modernog života.'
    },
    description_long: {
      tr: 'Konaklı, tarihi ve kültürel zenginliğe sahip bir bölgedir. Yerel pazarı, geleneksel atmosferi ve tarihi kalıntılarıyla dikkat çeker. Uygun fiyatları ve turizm potansiyeliyle yatırımcılar için cazip bir bölgedir.',
      en: 'Konakli is a district with rich historical and cultural heritage. It stands out with its local market, traditional atmosphere, and historical ruins. With affordable prices and tourism potential, it is an attractive area for investors.',
      de: 'Konaklı ist ein Bezirk mit reichem historischem und kulturellem Erbe. Er besticht durch seinen lokalen Markt, die traditionelle Atmosphäre und historische Ruinen. Mit erschwinglichen Preisen und Tourismuspotenzial ist er ein attraktives Gebiet für Investoren.',
      ru: 'Конаклы — район с богатым историческим и культурным наследием. Выделяется местным рынком, традиционной атмосферой и историческими руинами. Благодаря доступным ценам и туристическому потенциалу это привлекательный район для инвесторов.',
      bs: 'Konaklı je četvrt s bogatim historijskim i kulturnim naslijeđem. Ističe se lokalnom tržnicom, tradicionalnom atmosferom i historijskim ruševinama. S povoljnim cijenama i turističkim potencijalom, privlačna je zona za investitore.'
    }
  }
}

async function main() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/areas?select=id,name`, {
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
  })
  const dbAreas = await res.json()
  console.log(`Found ${dbAreas.length} areas in database`)

  for (const dbArea of dbAreas) {
    const enName = typeof dbArea.name === 'object' ? (dbArea.name.en || '') : dbArea.name
    const key = Object.keys(areas).find(k =>
      k.toLowerCase() === enName.toLowerCase() ||
      enName.toLowerCase().includes(k.toLowerCase()) ||
      k.toLowerCase().includes(enName.toLowerCase())
    )

    if (!key) {
      console.log(`No match for: ${enName}`)
      continue
    }

    const update = areas[key]
    const patchRes = await fetch(`${SUPABASE_URL}/rest/v1/areas?id=eq.${dbArea.id}`, {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({
        highlights: update.highlights,
        description: update.description,
        description_long: update.description_long
      })
    })
    console.log(`Updated ${enName} (${key}): ${patchRes.status}`)
    if (patchRes.status !== 204) {
      const text = await patchRes.text()
      console.log(`  Error: ${text}`)
    }
  }
}

main().catch(console.error)
