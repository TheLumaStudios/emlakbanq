const SUPABASE_URL = 'https://ycrlkkkoxrsmugidznri.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inljcmxra2tveHJzbXVnaWR6bnJpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTE3MzEyOSwiZXhwIjoyMDg2NzQ5MTI5fQ.ZfgE4FEPU2p13nJC3np9OUOuBJeKqUDUYF0nka57ihc'

const updates = [
  {
    oldLabel: 'Expert Advisors',
    label: { tr: 'Uzman Danışman', en: 'Expert Advisors', de: 'Fachberater', ru: 'Экспертов-консультантов', bs: 'Stručnih savjetnika' }
  },
  {
    oldLabel: 'Premium Properties',
    label: { tr: 'Premium Mülk', en: 'Premium Properties', de: 'Premium-Immobilien', ru: 'Премиальных объектов', bs: 'Premium nekretnina' }
  },
  {
    oldLabel: 'Countries Served',
    label: { tr: 'Hizmet Verilen Ülke', en: 'Countries Served', de: 'Betreute Länder', ru: 'Обслуживаемых стран', bs: 'Zemalja kojima služimo' }
  },
  {
    oldLabel: 'Transaction Volume',
    label: { tr: 'İşlem Hacmi', en: 'Transaction Volume', de: 'Transaktionsvolumen', ru: 'Объём транзакций', bs: 'Obim transakcija' }
  }
]

async function main() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/company_stats?select=id,label&order=sort_order`, {
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
  })
  const stats = await res.json()
  console.log(`Found ${stats.length} stats`)

  for (const stat of stats) {
    const match = updates.find(u => u.oldLabel === stat.label)
    if (!match) {
      console.log(`No match for: ${stat.label}`)
      continue
    }

    const patchRes = await fetch(`${SUPABASE_URL}/rest/v1/company_stats?id=eq.${stat.id}`, {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({ label: match.label })
    })
    console.log(`Updated "${stat.label}": ${patchRes.status}`)
    if (patchRes.status !== 204) {
      const text = await patchRes.text()
      console.log(`  Error: ${text}`)
    }
  }
}

main().catch(console.error)
