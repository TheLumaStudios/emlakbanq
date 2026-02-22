import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const ROUTE_MAP = {
  properties: 'admin.nav.properties',
  areas: 'admin.nav.areas',
  blog: 'admin.nav.blog',
  'buyer-guides': 'admin.nav.buyerGuides',
  'golden-visa': 'admin.nav.goldenVisa',
  insights: 'admin.nav.insights',
  contact: 'admin.nav.messages',
  settings: 'admin.nav.settings',
}

export default function Breadcrumbs() {
  const { t } = useTranslation()
  const { pathname } = useLocation()

  const segments = pathname.replace(/^\/admin\/?/, '').split('/').filter(Boolean)

  // Don't show breadcrumbs on dashboard
  if (segments.length === 0) return null

  const crumbs = [
    { label: t('admin.nav.dashboard'), to: '/admin' },
  ]

  let currentPath = '/admin'

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const isLast = index === segments.length - 1

    if (index === 0 && ROUTE_MAP[segment]) {
      crumbs.push({
        label: t(ROUTE_MAP[segment]),
        to: isLast ? null : currentPath,
      })
    } else if (segment === 'new') {
      crumbs.push({ label: t('admin.common.create'), to: null })
    } else if (index === 1 && /^[0-9a-f-]+$/i.test(segment)) {
      crumbs.push({ label: t('admin.common.edit'), to: null })
    } else {
      crumbs.push({ label: segment, to: isLast ? null : currentPath })
    }
  })

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center gap-1.5 text-sm">
        {crumbs.map((crumb, index) => (
          <li key={index} className="flex items-center gap-1.5">
            {index > 0 && (
              <svg className="h-3.5 w-3.5 shrink-0 text-estate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            )}
            {crumb.to ? (
              <Link
                to={crumb.to}
                className="text-estate-400 transition-colors hover:text-estate-700"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="font-medium text-estate-700">{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
