import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import SEOHead from '../components/seo/SEOHead'
import Container from '../components/common/Container'
import { ROUTES } from '../config/routes'
import { useAreas } from '../hooks/useAreas'
import LoadingSkeleton from '../components/common/LoadingSkeleton'
import ErrorMessage from '../components/common/ErrorMessage'

export default function Areas() {
  const { t } = useTranslation()
  const { data: areas, loading, error } = useAreas()

  return (
    <>
      <SEOHead
        title={t('areas.meta.title')}
        description={t('areas.meta.description')}
      />

      {/* ── Page Header ─────────────────────────────────────────────── */}
      <section className="bg-estate-900 py-20 text-white lg:py-28">
        <Container>
          <p className="font-heading text-sm uppercase tracking-[0.25em] text-gold-400">
            {t('areas.subtitle', 'Prime Locations')}
          </p>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            {t('areas.heading', 'Dubai\'s Most Coveted Neighbourhoods')}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-estate-300">
            {t(
              'areas.intro',
              'From iconic waterfront living to serene suburban retreats, explore the distinct character and investment potential of each neighbourhood.'
            )}
          </p>
        </Container>
      </section>

      {/* ── Area Grid ───────────────────────────────────────────────── */}
      <section className="bg-cream-50 py-20 lg:py-24">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {loading && <LoadingSkeleton variant="card" count={8} columns={4} />}
            {error && <ErrorMessage onRetry={() => window.location.reload()} />}
            {!loading && !error && areas?.map((area) => (
              <Link
                key={area.key}
                to={ROUTES.AREA_DETAIL.replace(':slug', area.slug)}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Zone Image */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={area.image}
                    alt={area.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Area name overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-5 pb-5 pt-12">
                    <h3 className="font-heading text-xl font-bold text-white">
                      {t(`areas.zones.${area.key}.name`, area.name)}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <p className="text-sm leading-relaxed text-estate-500">
                    {t(`areas.zones.${area.key}.description`, area.description)}
                  </p>

                  {/* Stats Badges */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-estate-50 px-3 py-1 text-xs font-medium text-estate-700">
                      <svg
                        className="h-3 w-3 text-gold-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                      {area.avg_price}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                      <svg
                        className="h-3 w-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                          clipRule="evenodd"
                        />
                      </svg>
                      ROI {area.roi}
                    </span>
                  </div>

                  {/* Explore Link */}
                  <div className="mt-5 flex items-center gap-2 text-sm font-medium text-gold-700 transition-colors group-hover:text-gold-800">
                    <span>{t('areas.explore')}</span>
                    <svg
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Bottom CTA ──────────────────────────────────────────────── */}
      <section className="bg-estate-900 py-20 text-center text-white">
        <Container>
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            {t('areas.cta.title', 'Not sure which area suits you?')}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-estate-300">
            {t(
              'areas.cta.description',
              'Our experts can help you identify the ideal neighbourhood based on your lifestyle, budget, and investment goals.'
            )}
          </p>
          <Link
            to={ROUTES.CONTACT}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold-500 px-8 py-3.5 font-medium text-estate-900 transition-all duration-300 hover:bg-gold-400 hover:shadow-lg hover:shadow-gold-500/25"
          >
            {t('areas.speakToExpert')}
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </Container>
      </section>
    </>
  )
}
