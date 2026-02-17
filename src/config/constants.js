export const APP_CONFIG = {
  brand: 'EmlakBanq',
  domain: 'emlakbanq.com',
  tagline: "Dubai's Premier Luxury Real Estate",

  offices: {
    dubai: {
      city: 'Dubai',
      address: 'Business Bay, Bay Square, Dubai, UAE',
      coordinates: { lat: 25.1865, lng: 55.2622 },
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

  dubaiZones: [
    'downtown',
    'marina',
    'palmJumeirah',
    'businessBay',
    'jbr',
    'creekHarbour',
    'dubaiHills',
    'jumeirahVillage',
  ],
}
