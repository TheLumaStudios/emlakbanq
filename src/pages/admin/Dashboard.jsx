import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { supabase } from '../../utils/supabase'
import { useAuthStore } from '../../stores/useAuthStore'
import { useToast } from '../../hooks/useToast'

const getLocalizedValue = (field, lang = 'en') => {
  if (!field) return ''
  if (typeof field === 'string') return field
  return field[lang] || field.en || Object.values(field)[0] || ''
}

function getRelativeTime(dateStr) {
  if (!dateStr) return ''
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const diffMs = now - then
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHr = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHr / 24)

  if (diffSec < 60) return 'Just now'
  if (diffMin < 60) return `${diffMin}m ago`
  if (diffHr < 24) return `${diffHr}h ago`
  return `${diffDay}d ago`
}

const ACTIVITY_CONFIG = {
  properties: { dotColor: 'bg-amber-400', label: 'Property', editBase: '/admin/properties' },
  blog_posts: { dotColor: 'bg-green-500', label: 'Blog', editBase: '/admin/blog' },
  areas: { dotColor: 'bg-blue-500', label: 'Area', editBase: '/admin/areas' },
  buyer_guides: { dotColor: 'bg-purple-500', label: 'Guide', editBase: '/admin/buyer-guides' },
}

function StatCard({ label, value, icon, loading, color = 'gold' }) {
  const colorClasses = {
    gold: 'bg-blue-50 text-blue-600',
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    amber: 'bg-amber-50 text-amber-600',
    rose: 'bg-rose-50 text-rose-600',
  }

  return (
    <div className="rounded-xl border border-estate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-estate-500">{label}</p>
          {loading ? (
            <div className="mt-2 h-8 w-16 animate-pulse rounded bg-estate-100" />
          ) : (
            <p className="mt-1 text-3xl font-bold text-estate-900">{value}</p>
          )}
        </div>
        <div className={`rounded-lg p-2.5 ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { t, i18n } = useTranslation()
  const session = useAuthStore((s) => s.session)
  const [stats, setStats] = useState({ properties: 0, areas: 0, blogs: 0, messages: 0, guides: 0, goldenVisa: 0 })
  const [recentMessages, setRecentMessages] = useState([])
  const [recentActivity, setRecentActivity] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMessages, setLoadingMessages] = useState(true)
  const [loadingActivity, setLoadingActivity] = useState(true)

  useEffect(() => {
    fetchStats()
    fetchRecentMessages()
    fetchRecentActivity()
  }, [])

  async function fetchStats() {
    setLoading(true)
    const [propertiesRes, areasRes, blogsRes, messagesRes, guidesRes, goldenVisaRes] = await Promise.all([
      supabase.from('properties').select('id', { count: 'exact', head: true }),
      supabase.from('areas').select('id', { count: 'exact', head: true }),
      supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
      supabase.from('contact_submissions').select('id', { count: 'exact', head: true }).eq('read', false),
      supabase.from('buyer_guides').select('id', { count: 'exact', head: true }),
      supabase.from('golden_visa_content').select('id', { count: 'exact', head: true }),
    ])

    setStats({
      properties: propertiesRes.count ?? 0,
      areas: areasRes.count ?? 0,
      blogs: blogsRes.count ?? 0,
      messages: messagesRes.count ?? 0,
      guides: guidesRes.count ?? 0,
      goldenVisa: goldenVisaRes.count ?? 0,
    })
    setLoading(false)
  }

  async function fetchRecentMessages() {
    setLoadingMessages(true)
    const { data } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)

    setRecentMessages(data || [])
    setLoadingMessages(false)
  }

  async function fetchRecentActivity() {
    setLoadingActivity(true)
    const [propertiesRes, blogsRes, areasRes, guidesRes] = await Promise.all([
      supabase.from('properties').select('id, name, updated_at, created_at').order('updated_at', { ascending: false }).limit(3),
      supabase.from('blog_posts').select('id, title, updated_at, created_at').order('updated_at', { ascending: false }).limit(3),
      supabase.from('areas').select('id, name, updated_at, created_at').order('updated_at', { ascending: false }).limit(3),
      supabase.from('buyer_guides').select('id, title, updated_at, created_at').order('updated_at', { ascending: false }).limit(3),
    ])

    const all = [
      ...(propertiesRes.data || []).map((item) => ({ ...item, _type: 'properties', _name: item.name })),
      ...(blogsRes.data || []).map((item) => ({ ...item, _type: 'blog_posts', _name: item.title })),
      ...(areasRes.data || []).map((item) => ({ ...item, _type: 'areas', _name: item.name })),
      ...(guidesRes.data || []).map((item) => ({ ...item, _type: 'buyer_guides', _name: item.title })),
    ]

    all.sort((a, b) => new Date(b.updated_at || b.created_at).getTime() - new Date(a.updated_at || a.created_at).getTime())

    setRecentActivity(all.slice(0, 8))
    setLoadingActivity(false)
  }

  const firstName = session?.user?.email?.split('@')[0] || 'Admin'

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-estate-900">
          {t('admin.dashboard.welcomeBack', { name: firstName })}
        </h1>
        <p className="mt-1 text-sm text-estate-500">
          {t('admin.dashboard.overview')}
        </p>
        <p className="mt-2 text-xs text-estate-400">
          {new Date().toLocaleDateString(i18n.language, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          label={t('admin.dashboard.totalProperties')}
          value={stats.properties}
          loading={loading}
          color="gold"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
            </svg>
          }
        />
        <StatCard
          label={t('admin.dashboard.totalAreas')}
          value={stats.areas}
          loading={loading}
          color="blue"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
          }
        />
        <StatCard
          label={t('admin.dashboard.blogPosts')}
          value={stats.blogs}
          loading={loading}
          color="green"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          }
        />
        <StatCard
          label={t('admin.dashboard.unreadMessages')}
          value={stats.messages}
          loading={loading}
          color="purple"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          }
        />
        <StatCard
          label={t('admin.dashboard.buyerGuides', 'Buyer Guides')}
          value={stats.guides}
          loading={loading}
          color="amber"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          }
        />
        <StatCard
          label={t('admin.dashboard.goldenVisaItems', 'Turkish Citizenship Items')}
          value={stats.goldenVisa}
          loading={loading}
          color="rose"
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
          }
        />
      </div>

      {/* Quick Links + Recent Messages */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick Links */}
        <div className="rounded-xl border border-estate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-heading text-lg font-semibold text-estate-900">{t('admin.dashboard.quickActions')}</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/admin/properties/new"
              className="flex items-center gap-3 rounded-lg border border-estate-200 p-4 transition-colors hover:border-blue-300 hover:bg-blue-50/50"
            >
              <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-estate-800">{t('admin.dashboard.newProperty')}</p>
                <p className="text-xs text-estate-400">{t('admin.dashboard.addListing')}</p>
              </div>
            </Link>
            <Link
              to="/admin/blog/new"
              className="flex items-center gap-3 rounded-lg border border-estate-200 p-4 transition-colors hover:border-blue-300 hover:bg-blue-50/50"
            >
              <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-estate-800">{t('admin.dashboard.newBlogPost')}</p>
                <p className="text-xs text-estate-400">{t('admin.dashboard.writeArticle')}</p>
              </div>
            </Link>
            <Link
              to="/admin/areas/new"
              className="flex items-center gap-3 rounded-lg border border-estate-200 p-4 transition-colors hover:border-blue-300 hover:bg-blue-50/50"
            >
              <div className="rounded-lg bg-green-50 p-2 text-green-600">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-estate-800">{t('admin.dashboard.newArea')}</p>
                <p className="text-xs text-estate-400">{t('admin.dashboard.addLocation')}</p>
              </div>
            </Link>
            <Link
              to="/admin/contact"
              className="flex items-center gap-3 rounded-lg border border-estate-200 p-4 transition-colors hover:border-blue-300 hover:bg-blue-50/50"
            >
              <div className="rounded-lg bg-purple-50 p-2 text-purple-600">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-estate-800">{t('admin.dashboard.viewMessages')}</p>
                <p className="text-xs text-estate-400">{t('admin.dashboard.viewSubmissions')}</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Messages */}
        <div className="rounded-xl border border-estate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold text-estate-900">{t('admin.dashboard.recentMessages')}</h2>
            <Link
              to="/admin/contact"
              className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
            >
              {t('admin.dashboard.viewAll')}
            </Link>
          </div>
          {loadingMessages ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse rounded-lg border border-estate-100 p-3">
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-full bg-estate-100" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-3/4 rounded bg-estate-100" />
                      <div className="h-3 w-full rounded bg-estate-100" />
                      <div className="h-3 w-1/2 rounded bg-estate-100" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : recentMessages.length === 0 ? (
            <p className="py-8 text-center text-sm text-estate-400">{t('admin.dashboard.noMessages')}</p>
          ) : (
            <div className="space-y-3">
              {recentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="flex items-start gap-3 rounded-lg border border-estate-100 p-3 transition-colors hover:bg-estate-50/50"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-estate-100 text-sm font-semibold text-estate-600">
                    {(msg.name || msg.email || '?')[0].toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-medium text-estate-800">
                        {msg.name || msg.email}
                      </p>
                      {!msg.read && (
                        <span className="inline-block h-2 w-2 rounded-full bg-blue-500" />
                      )}
                    </div>
                    <p className="mt-0.5 truncate text-xs text-estate-500">
                      {msg.message || msg.subject || t('admin.dashboard.noMessageContent')}
                    </p>
                    <p className="mt-1 text-xs text-estate-400">
                      {msg.created_at
                        ? new Date(msg.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl border border-estate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-heading text-lg font-semibold text-estate-900">
          {t('admin.dashboard.recentActivity', 'Recent Activity')}
        </h2>
        {loadingActivity ? (
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse rounded-lg border border-estate-100 px-3 py-2.5">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-estate-100" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-4 w-1/3 rounded bg-estate-100" />
                    <div className="h-3 w-1/4 rounded bg-estate-100" />
                  </div>
                  <div className="h-4 w-8 rounded bg-estate-100" />
                </div>
              </div>
            ))}
          </div>
        ) : recentActivity.length === 0 ? (
          <p className="py-8 text-center text-sm text-estate-400">
            {t('admin.dashboard.noActivity', 'No recent activity')}
          </p>
        ) : (
          <div className="space-y-2">
            {recentActivity.map((item) => {
              const config = ACTIVITY_CONFIG[item._type]
              const displayName = getLocalizedValue(item._name, i18n.language)
              const relativeTime = getRelativeTime(item.updated_at || item.created_at)
              const editPath = `${config.editBase}/${item.id}`

              return (
                <div
                  key={`${item._type}-${item.id}`}
                  className="flex items-center gap-3 rounded-lg border border-estate-100 px-3 py-2.5 transition-colors hover:bg-estate-50/50"
                >
                  <span className={`h-2 w-2 shrink-0 rounded-full ${config.dotColor}`} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-estate-800">{displayName}</p>
                    <p className="text-xs text-estate-400">{config.label} · {relativeTime}</p>
                  </div>
                  <Link to={editPath} className="text-xs font-medium text-blue-600 hover:text-blue-700">Edit</Link>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
