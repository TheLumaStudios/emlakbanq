import { APP_CONFIG } from '../../config/constants'
import { useDataStore } from '../../stores/useDataStore'

export default function SEOHead({ title, description }) {
  const siteSettings = useDataStore((s) => s.siteSettings)
  const brand = siteSettings?.brand || APP_CONFIG.brand
  const tagline = siteSettings?.tagline || APP_CONFIG.tagline
  const fullTitle = title || `${brand} | ${tagline}`

  return (
    <>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
    </>
  )
}
