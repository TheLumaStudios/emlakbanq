import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ycrlkkkoxrsmugidznri.supabase.co'
const supabaseKey = 'sb_publishable_H_b_GUihEZhLN3WYVfj-zg_HK2eyRLy'

const supabase = createClient(supabaseUrl, supabaseKey)

const email = 'admin@emlakbanq.com'
const password = 'Admin123!'

async function createAdmin() {
  console.log(`Creating admin user: ${email}`)

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    console.error('Error creating user:', error.message)
    process.exit(1)
  }

  console.log('Admin user created successfully!')
  console.log('User ID:', data.user?.id)
  console.log(`\nYou can now log in at /admin/login with:`)
  console.log(`  Email: ${email}`)
  console.log(`  Password: ${password}`)
}

createAdmin()
