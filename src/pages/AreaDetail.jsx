import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SEOHead from '../components/seo/SEOHead'
import Container from '../components/common/Container'
import LoadingSkeleton from '../components/common/LoadingSkeleton'
import ErrorMessage from '../components/common/ErrorMessage'
import { useArea } from '../hooks/useAreas'
import { ROUTES } from '../config/routes'

export default function AreaDetail() {
  const { slug } = useParams()
  const { t } = useTranslation()
  const { data: area, loading, error } = useArea(slug)

  if (loading) return <LoadingSkeleton variant="detail" />
  if (error || !area) return (
    <Container className="py-20">
      <ErrorMessage onRetry={() => window.location.reload()} />
    </Container>
  )

  return (
    <>
      <SEOHead
        title={`${area.name} | EmlakBanq`}
        description={area.description_long || area.description || `Explore ${area.name} - one of Dubai's premier neighborhoods.`}
      />

      {/* Hero Image */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden bg-estate-900">
        <img src={area.image} alt={area.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-estate-900/80 via-estate-900/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 pb-10">
          <Container>
            <p className="font-heading text-sm uppercase tracking-[0.25em] text-gold-400">
              {t('areas.detail.explore', 'Explore Area')}
            </p>
            <h1 className="mt-4 font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              {area.name}
            </h1>
            {area.description && (
              <p className="mt-3 max-w-2xl text-lg text-estate-300">{area.description}</p>
            )}
          </Container>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-estate-100 bg-white py-8">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-12 md:justify-start">
            {area.avg_price && (
              <div className="text-center md:text-left">
                <p className="text-xs font-medium uppercase tracking-wider text-estate-400">
                  {t('areas.detail.avgPrice', 'Average Price')}
                </p>
                <p className="mt-1 font-heading text-2xl font-bold text-estate-900">{area.avg_price}</p>
              </div>
            )}
            {area.roi && (
              <div className="text-center md:text-left">
                <p className="text-xs font-medium uppercase tracking-wider text-estate-400">
                  {t('areas.detail.roi', 'Expected ROI')}
                </p>
                <p className="mt-1 font-heading text-2xl font-bold text-gold-700">{area.roi}</p>
              </div>
            )}
            {area.property_count && (
              <div className="text-center md:text-left">
                <p className="text-xs font-medium uppercase tracking-wider text-estate-400">
                  {t('areas.detail.properties', 'Properties Available')}
                </p>
                <p className="mt-1 font-heading text-2xl font-bold text-estate-900">{area.property_count}</p>
              </div>
            )}
            {area.population && (
              <div className="text-center md:text-left">
                <p className="text-xs font-medium uppercase tracking-wider text-estate-400">
                  {t('areas.detail.population', 'Population')}
                </p>
                <p className="mt-1 font-heading text-2xl font-bold text-estate-900">{area.population}</p>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Description Long */}
      {area.description_long && (
        <section className="bg-white py-16 lg:py-20">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className="font-heading text-2xl font-bold text-estate-900">
                {t('areas.detail.aboutTitle', 'About')} {area.name}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-estate-600">{area.description_long}</p>
            </div>
          </Container>
        </section>
      )}

      {/* Highlights */}
      {area.highlights?.length > 0 && (
        <section className="bg-cream-50 py-16 lg:py-20">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className="font-heading text-2xl font-bold text-estate-900">
                {t('areas.detail.highlights', 'Area Highlights')}
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {area.highlights.map((highlight, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-estate-100 bg-white px-5 py-4 transition-all duration-300 hover:border-gold-200 hover:shadow-sm"
                  >
                    <svg
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                    <span className="text-sm font-medium text-estate-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Gallery */}
      {area.gallery?.length > 0 && (
        <section className="bg-white py-16 lg:py-20">
          <Container>
            <h2 className="font-heading text-2xl font-bold text-estate-900">
              {t('areas.detail.gallery', 'Gallery')}
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {area.gallery.map((img, i) => (
                <div key={i} className="overflow-hidden rounded-xl">
                  <img
                    src={img}
                    alt={`${area.name} ${i + 1}`}
                    className="h-64 w-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="bg-estate-900 py-20 text-center text-white">
        <Container>
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            {t('areas.detail.cta.title', 'Invest in')} {area.name}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-estate-300">
            {t(
              'areas.detail.cta.description',
              'Discover exclusive properties and investment opportunities in one of Dubai\'s most sought-after neighborhoods.'
            )}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to={ROUTES.PROPERTIES}
              className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-8 py-3.5 font-medium text-estate-900 transition-all duration-300 hover:bg-gold-400 hover:shadow-lg hover:shadow-gold-500/25"
            >
              {t('areas.detail.cta.viewProperties', 'View Properties')}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              to={ROUTES.CONTACT}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 font-medium text-white transition-all duration-300 hover:bg-white/10"
            >
              {t('areas.detail.cta.contact', 'Contact Us')}
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
