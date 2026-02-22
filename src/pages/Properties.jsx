import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import SEOHead from '../components/seo/SEOHead'
import Container from '../components/common/Container'
import { ROUTES } from '../config/routes'
import { useProperties } from '../hooks/useProperties'
import LoadingSkeleton from '../components/common/LoadingSkeleton'
import ErrorMessage from '../components/common/ErrorMessage'
import ImageWithLoader from '../components/common/ImageWithLoader'

export default function Properties() {
  const { t } = useTranslation()
  const [activeFilter, setActiveFilter] = useState('all')
  const { data: properties, loading, error } = useProperties(activeFilter)

  const FILTER_TYPES = [
    { key: 'all', label: t('properties.filters.all', 'All Properties') },
    { key: 'offPlan', label: t('properties.types.offPlan', 'Off-Plan') },
    { key: 'ready', label: t('properties.types.ready', 'Ready') },
    { key: 'villa', label: t('properties.types.villa', 'Villa') },
    { key: 'penthouse', label: t('properties.types.penthouse', 'Penthouse') },
    { key: 'branded', label: t('properties.types.brandedResidence', 'Branded') },
    { key: 'commercial', label: t('properties.types.commercial', 'Commercial') },
  ]

  return (
    <>
      <SEOHead
        title={t('properties.meta.title')}
        description={t('properties.meta.description')}
      />

      {/* ── Page Header ─────────────────────────────────────────────── */}
      <section className="bg-estate-900 py-20 text-white lg:py-28">
        <Container>
          <p className="font-heading text-sm uppercase tracking-[0.25em] text-blue-400">
            {t('properties.subtitle', 'Exclusive Portfolio')}
          </p>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            {t('properties.heading', 'Properties in Alanya')}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-estate-300">
            {t(
              'properties.intro',
              'Discover an unparalleled collection of residences, penthouses, villas, and investment opportunities across Alanya\'s most desirable locations.'
            )}
          </p>
        </Container>
      </section>

      {/* ── Filter Bar ──────────────────────────────────────────────── */}
      <section className="border-b border-estate-100 bg-white py-6">
        <Container>
          <div className="flex flex-wrap gap-2">
            {FILTER_TYPES.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter.key
                    ? 'bg-estate-900 text-white shadow-lg shadow-estate-900/20'
                    : 'bg-estate-50 text-estate-600 hover:bg-estate-100 hover:text-estate-900'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Property Grid ───────────────────────────────────────────── */}
      <section className="bg-yellow-50 py-20 lg:py-24">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {loading && <LoadingSkeleton variant="card" count={6} columns={3} />}
            {error && <ErrorMessage onRetry={() => window.location.reload()} />}
            {!loading && !error && properties?.length === 0 && (
              <div className="col-span-full py-20 text-center">
                <p className="text-lg text-estate-500">
                  {t('properties.noResults', 'No properties found for this filter. Please try another category.')}
                </p>
              </div>
            )}
            {!loading && !error && properties?.map((property) => (
              <Link
                key={property.id}
                to={ROUTES.PROPERTY_DETAIL.replace(':slug', property.slug)}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Property Image */}
                <div className="relative h-64 overflow-hidden">
                  <ImageWithLoader
                    src={property.image}
                    alt={property.name}
                    className="transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Type Badge */}
                  <div className="absolute left-4 top-4">
                    <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-estate-900 backdrop-blur-sm">
                      {property.type_label}
                    </span>
                  </div>

                  {/* Price Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-5 pb-4 pt-10">
                    <span className="font-heading text-xl font-bold text-white">
                      {property.price}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <h3 className="font-heading text-lg font-semibold text-estate-900 transition-colors group-hover:text-blue-700">
                    {property.name}
                  </h3>
                  <p className="mt-1 text-sm text-estate-500">
                    {property.location}
                  </p>

                  {/* Property Details */}
                  <div className="mt-4 flex items-center gap-4 border-t border-estate-100 pt-4">
                    {property.beds && (
                      <div className="flex items-center gap-1.5 text-sm text-estate-600">
                        <svg
                          className="h-4 w-4 text-blue-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                          />
                        </svg>
                        <span>
                          {property.beds} {property.beds === 1 ? t('common.bed', 'Bed') : t('common.beds', 'Beds')}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 text-sm text-estate-600">
                      <svg
                        className="h-4 w-4 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                        />
                      </svg>
                      <span>{property.sqft} {t('common.sqft', 'sqft')}</span>
                    </div>
                  </div>

                  {/* Learn More */}
                  <div className="mt-4 flex items-center gap-2 text-sm font-medium text-blue-700 transition-colors group-hover:text-blue-800">
                    <span>{t('common.cta.learnMore', 'Learn More')}</span>
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

      {/* ── Disclaimer ──────────────────────────────────────────────── */}
      <section className="border-t border-estate-100 bg-white py-12">
        <Container>
          <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-estate-400">
            {t(
              'properties.disclaimer',
              'All prices, specifications, and availability are subject to change without notice. Renders and images are for illustrative purposes only. EmlakBanq acts as an authorized intermediary and does not guarantee the accuracy of third-party information. Please contact our team for verified, up-to-date details.'
            )}
          </p>
        </Container>
      </section>
    </>
  )
}
