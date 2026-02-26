// Test if we can insert via REST API directly
const url = 'https://ycrlkkkoxrsmugidznri.supabase.co'
const key = 'sb_publishable_H_b_GUihEZhLN3WYVfj-zg_HK2eyRLy'

// Try inserting one row to test
const res = await fetch(`${url}/rest/v1/market_highlights`, {
  method: 'POST',
  headers: {
    'apikey': key,
    'Authorization': `Bearer ${key}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal'
  },
  body: JSON.stringify({
    text: {"tr": "Test", "en": "Test"},
    sort_order: 99
  })
})

console.log('Status:', res.status)
const text = await res.text()
console.log('Response:', text)

if (res.status === 201) {
  console.log('INSERT WORKS! Cleaning up test row...')
  await fetch(`${url}/rest/v1/market_highlights?sort_order=eq.99`, {
    method: 'DELETE',
    headers: {
      'apikey': key,
      'Authorization': `Bearer ${key}`,
    }
  })
}
