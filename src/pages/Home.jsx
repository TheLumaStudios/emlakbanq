import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import SEOHead from '../components/seo/SEOHead'
import Container from '../components/common/Container'
import { ROUTES } from '../config/routes'
import { useFeaturedProperties } from '../hooks/useProperties'
import { useAreas } from '../hooks/useAreas'
import { useServices } from '../hooks/useServices'
import { useDataStore } from '../stores/useDataStore'
import LoadingSkeleton from '../components/common/LoadingSkeleton'
import ImageWithLoader from '../components/common/ImageWithLoader'

export default function Home() {
  const { t } = useTranslation()
  const { data: featured, loading: loadingFeatured } = useFeaturedProperties()
  const { data: zones, loading: loadingZones } = useAreas({ featured: true, limit: 4 })
  const { data: services, loading: loadingServices } = useServices()
  const heroImages = useDataStore((s) => s.heroImages)
  const fetchHeroImages = useDataStore((s) => s.fetchHeroImages)

  useEffect(() => { fetchHeroImages() }, [])

  return (
    <>
      <SEOHead
        title={t('home.meta.title')}
        description={t('home.meta.description')}
      />

      {/* ===== HERO SECTION ===== */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-estate-900 text-white">
        {/* Background Image */}
        <div className="absolute inset-0">
          <ImageWithLoader
            src={heroImages?.home || ''}
            alt="Dubai skyline"
            priority={true}
          />
          <div className="absolute inset-0 bg-estate-900/70" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

        <Container className="relative z-10 py-20">
          <div className="animate-fade-in">
            <span className="mb-6 inline-block font-body text-xs font-semibold uppercase tracking-[0.3em] text-gold-400">
              {t('common.tagline')}
            </span>
            <h1 className="max-w-4xl font-heading text-4xl leading-[1.1] font-bold tracking-tight md:text-5xl lg:text-7xl">
              {t('home.hero.title')}
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-estate-300 md:text-xl">
              {t('home.hero.subtitle')}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                to={ROUTES.PROPERTIES}
                className="inline-flex items-center justify-center rounded-sm bg-gold-500 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-gold-600 hover:shadow-lg hover:shadow-gold-500/20"
              >
                {t('common.cta.viewProperties')}
              </Link>
              <Link
                to={ROUTES.CONTACT}
                className="inline-flex items-center justify-center rounded-sm border border-white/20 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:border-gold-400 hover:text-gold-400"
              >
                {t('common.cta.bookConsultation')}
              </Link>
            </div>

            {/* Mini stats row */}
            <div className="mt-16 flex flex-wrap gap-8 border-t border-estate-700/50 pt-8 md:gap-16">
              <div>
                <p className="font-heading text-3xl font-bold text-gold-400">
                  {t('home.stats.experts')}
                </p>
                <p className="mt-1 text-sm text-estate-400">
                  {t('home.stats.expertsLabel')}
                </p>
              </div>
              <div>
                <p className="font-heading text-3xl font-bold text-gold-400">
                  {t('home.stats.properties')}
                </p>
                <p className="mt-1 text-sm text-estate-400">
                  {t('home.stats.propertiesLabel')}
                </p>
              </div>
              <div>
                <p className="font-heading text-3xl font-bold text-gold-400">
                  {t('home.stats.countries')}
                </p>
                <p className="mt-1 text-sm text-estate-400">
                  {t('home.stats.countriesLabel')}
                </p>
              </div>
              <div>
                <p className="font-heading text-3xl font-bold text-gold-400">
                  {t('home.stats.volume')}
                </p>
                <p className="mt-1 text-sm text-estate-400">
                  {t('home.stats.volumeLabel')}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== FEATURED PROPERTIES ===== */}
      <section className="bg-cream-50 py-20 md:py-28">
        <Container>
          <div className="animate-slide-up text-center">
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-gold-500">
              {t('common.cta.viewAll')}
            </span>
            <h2 className="font-heading text-3xl font-bold text-estate-900 md:text-4xl lg:text-5xl">
              {t('home.featured.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-estate-400 md:text-lg">
              {t('home.featured.subtitle')}
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {loadingFeatured && <LoadingSkeleton variant="card" count={6} columns={3} />}
            {!loadingFeatured && featured?.map((property) => (
              <Link
                key={property.id}
                to={ROUTES.PROPERTIES}
                className="group animate-slide-up overflow-hidden rounded-sm bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-estate-900/5"
              >
                {/* Property Image */}
                <div className="relative h-64 overflow-hidden">
                  <ImageWithLoader
                    src={property.image}
                    alt={property.name}
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Type badge */}
                  <span className="absolute left-4 top-4 rounded-sm bg-gold-500 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                    {property.type_label}
                  </span>
                  {/* Price overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-5 pb-4 pt-8">
                    <p className="font-heading text-xl font-bold text-white">
                      {property.price}
                    </p>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-heading text-lg font-bold text-estate-900 transition-colors group-hover:text-gold-600">
                    {property.name}
                  </h3>
                  <p className="mt-1 text-sm text-estate-400">
                    {property.location}
                  </p>
                  <div className="mt-4 flex items-center gap-6 border-t border-estate-100 pt-4 text-sm text-estate-500">
                    <span className="flex items-center gap-1.5">
                      <span className="inline-block h-1 w-1 rounded-full bg-gold-500" />
                      {property.beds} {t('common.bedrooms')}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="inline-block h-1 w-1 rounded-full bg-gold-500" />
                      {property.sqft} {t('common.sqft')}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to={ROUTES.PROPERTIES}
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold-600 transition-colors hover:text-gold-700"
            >
              {t('common.cta.viewAll')}
              <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>
        </Container>
      </section>

      {/* ===== PRIME INVESTMENT ZONES ===== */}
      <section className="bg-estate-900 py-20 md:py-28">
        <Container>
          <div className="animate-slide-up text-center">
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-gold-400">
              {t('common.cta.exploreAreas')}
            </span>
            <h2 className="font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              {t('home.areas.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-estate-400 md:text-lg">
              {t('home.areas.subtitle')}
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {loadingZones && <LoadingSkeleton variant="card" count={4} columns={4} />}
            {!loadingZones && zones?.map((zone) => (
              <Link
                key={zone.key}
                to={ROUTES.AREA_DETAIL.replace(':slug', zone.slug)}
                className="group relative animate-slide-up overflow-hidden rounded-sm"
              >
                {/* Zone background image */}
                <div className="relative flex min-h-[320px] flex-col justify-end p-6 transition-all duration-500">
                  <div className="absolute inset-0">
                    <ImageWithLoader
                      src={zone.image}
                      alt={zone.name}
                      className="scale-110 transition-transform duration-700 group-hover:scale-100"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/40 transition-all duration-500 group-hover:bg-black/30" />

                  {/* ROI badge */}
                  <span className="relative z-10 mb-auto ml-auto inline-block rounded-sm bg-gold-500/90 px-3 py-1 text-xs font-semibold text-white">
                    {t('common.roi')}: {zone.avg_roi}
                  </span>

                  <div className="relative z-10">
                    <h3 className="font-heading text-xl font-bold text-white md:text-2xl">
                      {zone.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/70">
                      {zone.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-sm text-gold-300">
                        {t('common.from')}{' '}
                        <span className="font-semibold text-gold-400">
                          {zone.avg_price}
                        </span>
                      </p>
                      <span className="text-sm text-gold-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
                        &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to={ROUTES.AREAS}
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold-400 transition-colors hover:text-gold-300"
            >
              {t('common.cta.exploreAreas')}
              <span>&rarr;</span>
            </Link>
          </div>
        </Container>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="bg-gold-500 py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4 md:gap-12">
            <div className="animate-fade-in">
              <p className="font-heading text-4xl font-bold text-white md:text-5xl">
                {t('home.stats.experts')}
              </p>
              <p className="mt-2 text-sm font-medium uppercase tracking-wider text-gold-100">
                {t('home.stats.expertsLabel')}
              </p>
            </div>
            <div className="animate-fade-in">
              <p className="font-heading text-4xl font-bold text-white md:text-5xl">
                {t('home.stats.properties')}
              </p>
              <p className="mt-2 text-sm font-medium uppercase tracking-wider text-gold-100">
                {t('home.stats.propertiesLabel')}
              </p>
            </div>
            <div className="animate-fade-in">
              <p className="font-heading text-4xl font-bold text-white md:text-5xl">
                {t('home.stats.countries')}
              </p>
              <p className="mt-2 text-sm font-medium uppercase tracking-wider text-gold-100">
                {t('home.stats.countriesLabel')}
              </p>
            </div>
            <div className="animate-fade-in">
              <p className="font-heading text-4xl font-bold text-white md:text-5xl">
                {t('home.stats.volume')}
              </p>
              <p className="mt-2 text-sm font-medium uppercase tracking-wider text-gold-100">
                {t('home.stats.volumeLabel')}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section className="bg-cream-50 py-20 md:py-28">
        <Container>
          <div className="animate-slide-up text-center">
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-gold-500">
              {t('common.cta.learnMore')}
            </span>
            <h2 className="font-heading text-3xl font-bold text-estate-900 md:text-4xl lg:text-5xl">
              {t('home.services.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-estate-400 md:text-lg">
              {t('home.services.subtitle')}
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {loadingServices && <LoadingSkeleton variant="card" count={4} columns={4} />}
            {!loadingServices && services?.map((service) => (
              <div
                key={service.key}
                className="animate-slide-up group rounded-sm border border-estate-100 bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold-200 hover:shadow-xl hover:shadow-gold-500/5"
              >
                {/* Icon circle with initials */}
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-full ${service.color} text-sm font-bold text-white transition-transform duration-300 group-hover:scale-110`}
                >
                  {service.initials}
                </div>

                <h3 className="mt-6 font-heading text-lg font-bold text-estate-900">
                  {t(`home.services.${service.key}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-estate-400">
                  {t(`home.services.${service.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="relative overflow-hidden bg-estate-900 py-20 md:py-28">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute -right-20 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-gold-500" />
          <div className="absolute -left-20 top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-gold-400" />
        </div>
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

        <Container className="relative z-10">
          <div className="animate-fade-in mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              {t('home.cta.title')}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-estate-300">
              {t('home.cta.subtitle')}
            </p>
            <Link
              to={ROUTES.CONTACT}
              className="mt-10 inline-flex items-center justify-center rounded-sm bg-gold-500 px-10 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-gold-600 hover:shadow-lg hover:shadow-gold-500/20"
            >
              {t('common.cta.bookConsultation')}
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
