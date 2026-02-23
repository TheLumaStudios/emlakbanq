import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SEOHead from '../components/seo/SEOHead'
import Container from '../components/common/Container'
import LoadingSkeleton from '../components/common/LoadingSkeleton'
import ErrorMessage from '../components/common/ErrorMessage'
import ImageWithLoader from '../components/common/ImageWithLoader'
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

      {/* Hero Gallery Section */}
      <section className="relative bg-estate-900 pt-20">
        <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
          <ImageWithLoader
            src={property.image}
            alt={property.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-estate-900 via-estate-900/50 to-transparent" />

          {/* Floating Price Badge */}
          <div className="absolute right-6 top-6">
            <div className="rounded-2xl bg-white px-6 py-4 shadow-2xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-estate-500">
                {t('propertyDetail.price', 'Price')}
              </p>
              <p className="mt-1 font-heading text-3xl font-bold text-estate-900">{property.price}</p>
            </div>
          </div>

          {/* Property Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 pb-8">
            <Container>
              <div className="max-w-3xl">
                <div className="mb-4 flex items-center gap-3">
                  <span className="rounded-full bg-blue-500 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg">
                    {property.type_label}
                  </span>
                  {property.featured && (
                    <span className="rounded-full bg-yellow-400 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-estate-900 shadow-lg">
                      {t('common.featured', 'Featured')}
                    </span>
                  )}
                </div>
                <h1 className="font-heading text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                  {property.name}
                </h1>
                <div className="mt-3 flex items-center gap-2 text-lg text-estate-200">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span>{property.location}</span>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="sticky top-0 z-10 border-b border-estate-200 bg-white/95 backdrop-blur-lg">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4 py-4">
            <div className="flex flex-wrap items-center gap-6 lg:gap-8">
              {property.beds && (
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-estate-500">{t('propertyDetail.bedrooms', 'Bedrooms')}</p>
                    <p className="font-semibold text-estate-900">{property.beds}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                  <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-estate-500">{t('propertyDetail.size', 'Size')}</p>
                  <p className="font-semibold text-estate-900">{property.sqft}</p>
                </div>
              </div>
              {property.developer && (
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-estate-500">{t('propertyDetail.developer', 'Developer')}</p>
                    <p className="font-semibold text-estate-900">{property.developer}</p>
                  </div>
                </div>
              )}
              {property.year && (
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-estate-500">{t('propertyDetail.completion', 'Completion')}</p>
                    <p className="font-semibold text-estate-900">{property.year}</p>
                  </div>
                </div>
              )}
            </div>
            <Link
              to={ROUTES.CONTACT}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-700"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              {t('propertyDetail.inquire', 'Inquire Now')}
            </Link>
          </div>
        </Container>
      </section>

      <div className="bg-yellow-50 py-12 lg:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Description */}
              {property.description && (
                <div className="rounded-2xl bg-white p-8 shadow-sm">
                  <h2 className="font-heading text-2xl font-bold text-estate-900">
                    {t('propertyDetail.aboutProperty', 'About This Property')}
                  </h2>
                  <p className="mt-6 whitespace-pre-line text-base leading-relaxed text-estate-600">
                    {property.description}
                  </p>
                </div>
              )}

              {/* Amenities */}
              {property.amenities?.length > 0 && (
                <div className="mt-6 rounded-2xl bg-white p-8 shadow-sm">
                  <h2 className="font-heading text-2xl font-bold text-estate-900">
                    {t('propertyDetail.amenities', 'Amenities & Features')}
                  </h2>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {property.amenities.map((amenity, i) => (
                      <div key={i} className="flex items-center gap-3 rounded-xl border border-estate-100 bg-estate-50/50 px-4 py-3 transition-colors hover:border-blue-200 hover:bg-blue-50/50">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
                          <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-estate-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery */}
              {property.gallery?.length > 0 && (
                <div className="mt-6 rounded-2xl bg-white p-8 shadow-sm">
                  <h2 className="font-heading text-2xl font-bold text-estate-900">
                    {t('propertyDetail.gallery', 'Photo Gallery')}
                  </h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {property.gallery.map((img, i) => (
                      <div key={i} className="group relative overflow-hidden rounded-xl">
                        <img
                          src={img}
                          alt={`${property.name} ${i + 1}`}
                          className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-estate-900/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - Contact Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl border border-estate-200 bg-white p-6 shadow-lg">
                <div className="mb-6 text-center">
                  <p className="text-sm font-medium text-estate-500">
                    {t('propertyDetail.interestedTitle', 'Interested in this property?')}
                  </p>
                  <p className="mt-2 font-heading text-3xl font-bold text-estate-900">{property.price}</p>
                </div>

                <div className="space-y-3">
                  <Link
                    to={ROUTES.CONTACT}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 font-semibold text-white transition-all hover:bg-blue-700"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    {t('propertyDetail.sendInquiry', 'Send Inquiry')}
                  </Link>

                  <a
                    href="https://wa.me/905551234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-green-600 bg-white px-6 py-3.5 font-semibold text-green-600 transition-all hover:bg-green-50"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    {t('propertyDetail.whatsapp', 'WhatsApp')}
                  </a>

                  <a
                    href="tel:+905551234567"
                    className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-estate-300 bg-white px-6 py-3.5 font-semibold text-estate-700 transition-all hover:border-estate-400 hover:bg-estate-50"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    {t('propertyDetail.call', 'Call Us')}
                  </a>
                </div>

                <div className="mt-6 border-t border-estate-100 pt-6">
                  <p className="text-center text-xs leading-relaxed text-estate-400">
                    {t('propertyDetail.disclaimer', 'Our team will respond within 24 hours')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Back to Properties */}
      <section className="border-t border-estate-200 bg-white py-8">
        <Container>
          <Link
            to={ROUTES.PROPERTIES}
            className="inline-flex items-center gap-2 text-sm font-medium text-estate-600 transition-colors hover:text-blue-600"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {t('propertyDetail.backToProperties', 'Back to All Properties')}
          </Link>
        </Container>
      </section>
    </>
  )
}
