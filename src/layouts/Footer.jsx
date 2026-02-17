import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '../config/routes'
import { APP_CONFIG } from '../config/constants'
import Logo from '../components/common/Logo'

const SOCIAL_ICONS = {
  instagram: (
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  ),
  youtube: (
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  ),
  linkedin: (
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  ),
  twitter: (
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  ),
}

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-estate-900 text-estate-300">
      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo variant="light" size="lg" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-estate-400">
              {t('footer.description')}
            </p>
            <div className="mt-6 flex gap-4">
              {Object.entries(APP_CONFIG.social).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-estate-700 text-estate-400 transition-all duration-200 hover:border-gold-500 hover:bg-gold-500 hover:text-white"
                  aria-label={platform}
                >
                  <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="currentColor">
                    {SOCIAL_ICONS[platform]}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-3">
              <li><Link to={ROUTES.PROPERTIES} className="text-sm transition-colors hover:text-gold-400">{t('nav.properties')}</Link></li>
              <li><Link to={ROUTES.AREAS} className="text-sm transition-colors hover:text-gold-400">{t('nav.areas')}</Link></li>
              <li><Link to={ROUTES.GOLDEN_VISA} className="text-sm transition-colors hover:text-gold-400">{t('nav.goldenVisa')}</Link></li>
              <li><Link to={ROUTES.INSIGHTS} className="text-sm transition-colors hover:text-gold-400">{t('nav.insights')}</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
              {t('footer.services')}
            </h3>
            <ul className="space-y-3">
              <li><Link to={ROUTES.BUYER_GUIDES} className="text-sm transition-colors hover:text-gold-400">{t('nav.buyerGuides')}</Link></li>
              <li><Link to={ROUTES.ABOUT} className="text-sm transition-colors hover:text-gold-400">{t('nav.about')}</Link></li>
              <li><Link to={ROUTES.BLOG} className="text-sm transition-colors hover:text-gold-400">{t('nav.blog')}</Link></li>
              <li><Link to={ROUTES.CONTACT} className="text-sm transition-colors hover:text-gold-400">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
              {t('footer.newsletter.title')}
            </h3>
            <p className="mb-5 text-sm text-estate-500">
              {t('footer.newsletter.subtitle')}
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={t('footer.newsletter.placeholder')}
                className="flex-1 rounded-md border border-estate-700 bg-estate-800/50 px-4 py-3 text-sm text-white placeholder:text-estate-500 transition-colors focus:border-gold-500 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 rounded-md bg-gold-500 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-gold-600 hover:shadow-lg"
              >
                {t('footer.newsletter.subscribe')}
              </button>
            </form>

            <div className="mt-8 space-y-2 text-sm text-estate-500">
              <p>info@emlakbanq.com</p>
              <p>+971 4 XXX XXXX</p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-estate-800 pt-8 md:flex-row">
          <p className="text-xs text-estate-500">
            &copy; {t('footer.copyright')}
          </p>
          <div className="flex gap-8">
            <Link to={ROUTES.PRIVACY} className="text-xs text-estate-500 transition-colors hover:text-gold-400">
              {t('footer.privacy')}
            </Link>
            <Link to={ROUTES.TERMS} className="text-xs text-estate-500 transition-colors hover:text-gold-400">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
