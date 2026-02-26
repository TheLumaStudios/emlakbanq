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
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

export default function Home() {
  const { t } = useTranslation()
  const { data: featured, loading: loadingFeatured } = useFeaturedProperties()
  const { data: zones, loading: loadingZones } = useAreas({ featured: true, limit: 5 })
  const { data: services, loading: loadingServices } = useServices()
  const heroImages = useDataStore((s) => s.heroImages)
  const fetchHeroImages = useDataStore((s) => s.fetchHeroImages)

  const featuredRef = useRevealOnScroll()
  const zonesRef = useRevealOnScroll()
  const servicesRef = useRevealOnScroll()
  const ctaRef = useRevealOnScroll()

  useEffect(() => { fetchHeroImages() }, [])

  return (
    <>
      <SEOHead
        title={t('home.meta.title')}
        description={t('home.meta.description')}
      />

      {/* ===== HERO SECTION ===== */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-estate-900 text-white">
        {/* Background Image */}
        <div className="absolute inset-0">
          <ImageWithLoader
            src={heroImages?.home || ''}
            alt="Alanya skyline"
            priority={true}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-estate-950/80 via-estate-900/60 to-estate-950/90" />
          {/* Subtle radial accent */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(26,167,215,0.08),transparent_60%)]" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />

        {/* Top-left corner accent */}
        <div className="absolute left-0 top-0 h-48 w-px bg-gradient-to-b from-blue-400/50 to-transparent" />
        <div className="absolute left-0 top-0 h-px w-48 bg-gradient-to-r from-blue-400/50 to-transparent" />
        {/* Bottom-right corner accent */}
        <div className="absolute bottom-0 right-0 h-48 w-px bg-gradient-to-t from-blue-400/30 to-transparent" />
        <div className="absolute bottom-0 right-0 h-px w-48 bg-gradient-to-l from-blue-400/30 to-transparent" />

        <Container className="relative z-10 py-20">
          <div className="animate-fade-in">
            <span className="mb-6 inline-flex items-center gap-3 font-body text-xs font-semibold uppercase tracking-[0.3em] text-blue-400">
              <span className="inline-block h-px w-12 bg-gradient-to-r from-blue-400/60 to-blue-300/30" />
              {t('common.tagline')}
            </span>
            <h1 className="max-w-4xl text-3xl leading-[1.1] font-light tracking-tight text-white md:text-4xl lg:text-6xl" style={{ fontFamily: '"Montserrat", sans-serif' }}>
              {t('home.hero.title')}
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-estate-300 md:text-xl">
              {t('home.hero.subtitle')}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                to={ROUTES.PROPERTIES}
                className="btn-glow inline-flex items-center justify-center gap-2 rounded-md bg-blue-500 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-500 hover:bg-blue-400"
              >
                {t('common.cta.viewProperties')}
                <span className="text-base">&rarr;</span>
              </Link>
              <Link
                to={ROUTES.CONTACT}
                className="btn-glow-outline inline-flex items-center justify-center rounded-md border border-white/20 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm transition-all duration-500 hover:border-blue-400/60 hover:bg-white/5 hover:text-blue-400"
              >
                {t('common.cta.bookConsultation')}
              </Link>
            </div>

            {/* Mini stats row */}
            <div className="mt-16 flex flex-wrap gap-8 pt-8 md:gap-0">
              {[
                { value: t('home.stats.experts'), label: t('home.stats.expertsLabel') },
                { value: t('home.stats.properties'), label: t('home.stats.propertiesLabel') },
                { value: t('home.stats.countries'), label: t('home.stats.countriesLabel') },
                { value: t('home.stats.volume'), label: t('home.stats.volumeLabel') },
              ].map((stat, index) => (
                <div key={index} className="flex items-center gap-8 md:gap-0">
                  {index > 0 && (
                    <div className="hidden h-12 w-px bg-gradient-to-b from-transparent via-blue-500/30 to-transparent md:mx-10 md:block" />
                  )}
                  <div>
                    <p className="font-heading text-3xl font-bold text-blue-400 lg:text-4xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-estate-400">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>

      </section>

      {/* ===== FEATURED PROPERTIES ===== */}
      <section className="bg-yellow-50 py-24 md:py-32" ref={featuredRef}>
        <Container>
          <div className="reveal flex flex-col items-start md:flex-row md:items-end md:justify-between">
            <div>
              <span className="mb-4 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-blue-600">
                <span className="inline-block h-px w-12 bg-gradient-to-r from-blue-500 to-blue-300" />
                {t('common.cta.viewAll')}
              </span>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-estate-900 md:text-4xl lg:text-5xl">
                {t('home.featured.title')}
              </h2>
              <p className="mt-4 max-w-xl text-base text-estate-400 md:text-lg">
                {t('home.featured.subtitle')}
              </p>
            </div>
            <Link
              to={ROUTES.PROPERTIES}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-blue-600 transition-colors hover:text-blue-700 md:mt-0"
            >
              {t('common.cta.viewAll')}
              <span>&rarr;</span>
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12">
            {loadingFeatured && <LoadingSkeleton variant="card" count={6} columns={3} />}
            {!loadingFeatured && featured?.map((property, index) => (
              <Link
                key={property.id}
                to={ROUTES.PROPERTY_DETAIL.replace(':slug', property.slug)}
                className={`reveal reveal-delay-${(index % 3) + 1} card-premium group overflow-hidden rounded-2xl ${
                  index === 0
                    ? 'lg:col-span-7 lg:row-span-2'
                    : index < 3
                      ? 'lg:col-span-5'
                      : 'lg:col-span-4'
                }`}
              >
                {/* Property Image */}
                <div className={`relative overflow-hidden ${index === 0 ? 'h-72 lg:h-full lg:min-h-[420px]' : 'h-56'}`}>
                  <ImageWithLoader
                    src={property.image}
                    alt={property.name}
                    className="transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  {/* Type badge */}
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-estate-800 backdrop-blur-sm">
                    {property.type_label}
                  </span>
                  {/* Year badge */}
                  {property.year && (
                    <span className="absolute right-4 top-4 rounded-full bg-blue-500/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                      {property.year}
                    </span>
                  )}
                  {/* Price overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-5 pb-5 pt-12">
                    <p className="font-heading text-xl font-bold text-white">
                      {property.price}
                    </p>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-heading text-lg font-bold text-estate-900 transition-colors duration-300 group-hover:text-blue-600">
                    {property.name}
                  </h3>
                  <div className="mt-1 flex items-center gap-2">
                    <svg className="h-3.5 w-3.5 shrink-0 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                    <p className="text-sm text-estate-400">
                      {property.location}
                    </p>
                  </div>
                  {property.description && (
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-estate-500">
                      {property.description}
                    </p>
                  )}
                  {property.developer && (
                    <p className="mt-2 text-xs text-estate-400">
                      <span className="font-medium text-estate-500">{t('common.developer', 'Yapımcı')}:</span> {property.developer}
                    </p>
                  )}
                  <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-estate-100 pt-4 text-sm text-estate-500">
                    <span className="flex items-center gap-1.5">
                      <svg className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
                      {property.beds} {t('common.bedrooms')}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>
                      {property.sqft}
                    </span>
                  </div>
                  {/* Amenities preview */}
                  {property.amenities?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {property.amenities.slice(0, 3).map((amenity, i) => (
                        <span key={i} className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-medium text-blue-700">
                          {amenity}
                        </span>
                      ))}
                      {property.amenities.length > 3 && (
                        <span className="rounded-full bg-estate-100 px-2.5 py-0.5 text-[11px] font-medium text-estate-500">
                          +{property.amenities.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== PRIME INVESTMENT ZONES ===== */}
      <section className="relative bg-estate-900 py-24 md:py-32" ref={zonesRef}>
        {/* Subtle dot pattern texture */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(26,167,215,0.4) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>

        <Container className="relative z-10">
          <div className="reveal flex flex-col items-start md:flex-row md:items-end md:justify-between">
            <div>
              <span className="mb-4 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-blue-400">
                <span className="inline-block h-px w-12 bg-gradient-to-r from-blue-400/60 to-blue-300/30" />
                {t('common.cta.exploreAreas')}
              </span>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
                {t('home.areas.title')}
              </h2>
              <p className="mt-4 max-w-xl text-base text-estate-400 md:text-lg">
                {t('home.areas.subtitle')}
              </p>
            </div>
            <Link
              to={ROUTES.AREAS}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-blue-400 transition-colors hover:text-blue-300 md:mt-0"
            >
              {t('common.cta.exploreAreas')}
              <span>&rarr;</span>
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
            {loadingZones && <LoadingSkeleton variant="card" count={4} columns={4} />}
            {!loadingZones && zones?.map((zone, index) => (
              <Link
                key={zone.key}
                to={ROUTES.AREA_DETAIL.replace(':slug', zone.slug)}
                className={`reveal reveal-delay-${(index % 4) + 1} group relative overflow-hidden rounded-2xl ring-1 ring-white/10 transition-all duration-500 hover:ring-blue-400/30 ${
                  index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
                }`}
              >
                {/* Zone background image */}
                <div className={`relative flex flex-col justify-end p-6 transition-all duration-500 ${
                  index === 0 ? 'min-h-[320px] lg:min-h-full' : 'min-h-[260px]'
                }`}>
                  <div className="absolute inset-0">
                    <ImageWithLoader
                      src={zone.image}
                      alt={zone.name}
                      className="scale-105 transition-transform duration-1000 ease-out group-hover:scale-100"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 transition-all duration-500 group-hover:from-black/60 group-hover:via-black/20" />

                  {/* ROI badge */}
                  <span className="relative z-10 mb-auto ml-auto inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm ring-1 ring-white/20">
                    {t('common.roi')}: {zone.roi}
                  </span>

                  <div className="relative z-10">
                    <h3 className={`font-heading font-bold text-white ${index === 0 ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}`}>
                      {zone.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/70">
                      {zone.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-sm text-blue-300">
                        {t('common.from')}{' '}
                        <span className="font-semibold text-blue-400">
                          {zone.avg_price}
                        </span>
                      </p>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-sm text-white opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100">
                        &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section className="relative overflow-hidden bg-yellow-50 py-24 md:py-32" ref={servicesRef}>
        {/* Decorative gradient orb */}
        <div className="absolute -right-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-blue-200/20 blur-3xl" />

        <Container className="relative z-10">
          <div className="reveal flex flex-col items-start md:flex-row md:items-end md:justify-between">
            <div>
              <span className="mb-4 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-blue-600">
                <span className="inline-block h-px w-12 bg-gradient-to-r from-blue-500 to-blue-300" />
                {t('common.cta.learnMore')}
              </span>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-estate-900 md:text-4xl lg:text-5xl">
                {t('home.services.title')}
              </h2>
              <p className="mt-4 max-w-xl text-base text-estate-400 md:text-lg">
                {t('home.services.subtitle')}
              </p>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            {loadingServices && <LoadingSkeleton variant="card" count={4} columns={2} />}
            {!loadingServices && services?.map((service, index) => (
              <div
                key={service.key}
                className={`reveal reveal-delay-${(index % 2) + 1} card-premium group flex gap-6 rounded-2xl p-8`}
              >
                {/* Number indicator */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-estate-900 to-estate-800 font-heading text-lg font-bold text-blue-400 shadow-lg shadow-estate-900/20 transition-all duration-500 group-hover:from-blue-500 group-hover:to-blue-600 group-hover:text-white group-hover:shadow-blue-500/20">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <div>
                  <h3 className="font-heading text-lg font-bold text-estate-900">
                    {t(`home.services.${service.key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-estate-400">
                    {t(`home.services.${service.key}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="relative overflow-hidden bg-estate-900 py-24 md:py-32" ref={ctaRef}>
        {/* Decorative ring elements */}
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute -right-32 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full border border-blue-400" />
          <div className="absolute -right-20 top-1/2 h-[350px] w-[350px] -translate-y-1/2 rounded-full border border-blue-400" />
          <div className="absolute -left-32 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full border border-blue-400" />
        </div>
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

        <Container className="relative z-10">
          <div className="reveal mx-auto max-w-3xl text-center">
            <span className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-blue-400">
              <span className="inline-block h-px w-12 bg-blue-400/60" />
              {t('common.cta.bookConsultation')}
              <span className="inline-block h-px w-12 bg-blue-400/60" />
            </span>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
              {t('home.cta.title')}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-estate-300">
              {t('home.cta.subtitle')}
            </p>
            <Link
              to={ROUTES.CONTACT}
              className="btn-glow mt-10 inline-flex items-center justify-center gap-2 rounded-md bg-blue-500 px-10 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-500 hover:bg-blue-400"
            >
              {t('common.cta.bookConsultation')}
              <span className="text-base">&rarr;</span>
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
