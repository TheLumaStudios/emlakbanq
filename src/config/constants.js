export const APP_CONFIG = {
  brand: 'EmlakBanq',
  domain: 'emlakbanq.com',
  tagline: "Alanya's Premier Real Estate",

  offices: {
    alanya: {
      city: 'Alanya',
      address: 'Oba Mah., Alanya, Antalya, Türkiye',
      coordinates: { lat: 36.5432, lng: 31.9993 },
    },
    istanbul: {
      city: 'Istanbul',
      address: 'Skyland Istanbul, Turkey',
      coordinates: { lat: 41.0766, lng: 28.9864 },
    },
  },

  social: {
    instagram: 'https://instagram.com/emlakbanq',
    youtube: 'https://youtube.com/@emlakbanq',
    linkedin: 'https://linkedin.com/company/emlakbanq',
    twitter: 'https://twitter.com/emlakbanq',
  },

  propertyTypes: [
    'offPlan',
    'ready',
    'penthouse',
    'villa',
    'brandedResidence',
    'commercial',
  ],

  alanyaZones: [
    'mahmutlar',
    'kestel',
    'oba',
    'tosmur',
    'cikcilli',
    'kargicak',
    'avsallar',
    'konaklı',
  ],
}
