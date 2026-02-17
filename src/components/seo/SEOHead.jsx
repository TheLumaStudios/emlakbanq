import { APP_CONFIG } from '../../config/constants'

export default function SEOHead({ title, description }) {
  const fullTitle = title || `${APP_CONFIG.brand} | ${APP_CONFIG.tagline}`

  return (
    <>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
    </>
  )
}
