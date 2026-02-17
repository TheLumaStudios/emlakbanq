import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SEOHead from '../components/seo/SEOHead'
import Container from '../components/common/Container'
import LoadingSkeleton from '../components/common/LoadingSkeleton'
import ErrorMessage from '../components/common/ErrorMessage'
import { useProperty } from '../hooks/useProperties'
import { ROUTES } from '../config/routes'

export default function PropertyDetail() {
  const { slug } = useParams()
  const { t } = useTranslation()
  const { data: property, loading, error } = useProperty(slug)

  if (loading) return <LoadingSkeleton variant="detail" />
  if (error || !property) return (
    <Container className="py-20">
      <ErrorMessage onRetry={() => window.location.reload()} />
    </Container>
  )

  return (
    <>
      <SEOHead title={`${property.name} | EmlakBanq`} description={property.description || property.location} />

      {/* Hero Image */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden bg-estate-900">
        <img src={property.image} alt={property.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-estate-900/80 via-estate-900/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 pb-10">
          <Container>
            <span className="rounded-full bg-gold-500 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
              {property.type_label}
            </span>
            <h1 className="mt-4 font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              {property.name}
            </h1>
            <p className="mt-2 text-lg text-estate-300">{property.location}</p>
          </Container>
        </div>
      </section>

      {/* Key Info Bar */}
      <section className="border-b border-estate-100 bg-white py-6">
        <Container>
          <div className="flex flex-wrap items-center gap-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-estate-400">{t('propertyDetail.price')}</p>
              <p className="mt-1 font-heading text-2xl font-bold text-estate-900">{property.price}</p>
            </div>
            {property.beds && (
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-estate-400">{t('propertyDetail.bedrooms')}</p>
                <p className="mt-1 font-heading text-2xl font-bold text-estate-900">{property.beds}</p>
              </div>
            )}
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-estate-400">{t('propertyDetail.size')}</p>
              <p className="mt-1 font-heading text-2xl font-bold text-estate-900">{t('propertyDetail.sqftValue', { value: property.sqft })}</p>
            </div>
            {property.developer && (
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-estate-400">{t('propertyDetail.developer')}</p>
                <p className="mt-1 font-heading text-2xl font-bold text-estate-900">{property.developer}</p>
              </div>
            )}
            {property.year && (
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-estate-400">{t('propertyDetail.completion')}</p>
                <p className="mt-1 font-heading text-2xl font-bold text-estate-900">{property.year}</p>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Description */}
      {property.description && (
        <section className="bg-white py-16 lg:py-20">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className="font-heading text-2xl font-bold text-estate-900">{t('propertyDetail.aboutProperty')}</h2>
              <p className="mt-6 text-base leading-relaxed text-estate-600">{property.description}</p>
            </div>
          </Container>
        </section>
      )}

      {/* Gallery */}
      {property.gallery?.length > 0 && (
        <section className="bg-cream-50 py-16 lg:py-20">
          <Container>
            <h2 className="font-heading text-2xl font-bold text-estate-900">{t('propertyDetail.gallery')}</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {property.gallery.map((img, i) => (
                <div key={i} className="overflow-hidden rounded-xl">
                  <img src={img} alt={`${property.name} ${i + 1}`} className="h-64 w-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Amenities */}
      {property.amenities?.length > 0 && (
        <section className="bg-white py-16 lg:py-20">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className="font-heading text-2xl font-bold text-estate-900">{t('propertyDetail.amenities')}</h2>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {property.amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-lg border border-estate-100 px-4 py-3">
                    <svg className="h-5 w-5 flex-shrink-0 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="text-sm text-estate-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="bg-estate-900 py-20 text-center text-white">
        <Container>
          <h2 className="font-heading text-3xl font-bold md:text-4xl">{t('propertyDetail.interestedTitle')}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-estate-300">
            {t('propertyDetail.interestedDescription')}
          </p>
          <Link
            to={ROUTES.CONTACT}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold-500 px-8 py-3.5 font-medium text-estate-900 transition-all duration-300 hover:bg-gold-400 hover:shadow-lg hover:shadow-gold-500/25"
          >
            {t('propertyDetail.contactUs')}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </Container>
      </section>
    </>
  )
}
