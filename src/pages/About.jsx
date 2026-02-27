import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import SEOHead from '../components/seo/SEOHead'
import Container from '../components/common/Container'
import LoadingSkeleton from '../components/common/LoadingSkeleton'
import { ROUTES } from '../config/routes'
import { useCompanyStats } from '../hooks/useCompanyStats'
import { useOffices } from '../hooks/useOffices'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

const VALUES = [
  {
    key: 'transparency',
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.64 0 8.577 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.64 0-8.577-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    key: 'expertise',
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
      </svg>
    ),
  },
  {
    key: 'global',
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    key: 'client',
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
]

export default function About() {
  const { t } = useTranslation()
  const { data: stats, loading: loadingStats } = useCompanyStats()
  const { data: offices, loading: loadingOffices } = useOffices()
  const valuesRef = useRevealOnScroll()
  const officesRef = useRevealOnScroll()

  return (
    <>
      <SEOHead
        title={t('about.meta.title')}
        description={t('about.meta.description')}
      />

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-estate-900 pb-24 pt-36 text-white lg:pb-32 lg:pt-44">
        {/* Decorative elements */}
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-60 w-60 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
        <Container className="relative z-10">
          <p className="font-heading text-sm uppercase tracking-[0.25em] text-blue-400">
            {t('about.subtitle', 'Our Legacy')}
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            {t('about.heading', 'Redefining Real Estate in Alanya')}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-estate-300">
            {t(
              'about.hero.subtitle',
              'Bridging continents, connecting investors with the world\'s most dynamic property market through unmatched expertise and unwavering integrity.'
            )}
          </p>
        </Container>
      </section>

      {/* ── Our Story ───────────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-24">
        <Container>
          <div className="mx-auto" style={{ maxWidth: '48rem' }}>
            <h2 className="font-heading text-3xl font-bold text-estate-900 md:text-4xl">
              {t('about.story.title', 'Built on Passion, Driven by Excellence')}
            </h2>

            <div className="mt-10 space-y-6 text-base leading-relaxed text-estate-600">
              <p>
                {t(
                  'about.story.p1',
                  'EmlakBanq was founded with a singular vision: to create a bespoke real estate experience that transcends borders and exceeds expectations. What began as a boutique consultancy in Alanya has grown into a recognized brand, trusted by discerning investors and homeowners from over 40 countries.'
                )}
              </p>
              <p>
                {t(
                  'about.story.p2',
                  'Our team comprises seasoned professionals who bring together decades of combined experience in luxury real estate, finance, and international law. We don\'t simply list properties -- we curate lifestyles. Every recommendation is backed by rigorous market analysis, on-the-ground insight, and a deep understanding of each client\'s unique aspirations.'
                )}
              </p>
              <p>
                {t(
                  'about.story.p3',
                  'With our office in Alanya, we operate at the heart of the Turkish Riviera, offering our clients privileged access to off-market opportunities, pre-launch allocations, and exclusive developer partnerships that are simply unavailable elsewhere.'
                )}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Stats Row ───────────────────────────────────────────────── */}
      <section className="border-y border-estate-100 bg-yellow-50 py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
            {loadingStats ? (
              <LoadingSkeleton variant="card" count={4} columns={4} />
            ) : stats?.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading text-4xl font-bold text-blue-700 md:text-5xl">
                  {stat.value}
                </div>
                <p className="mt-2 text-sm font-medium uppercase tracking-wider text-estate-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Values ──────────────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-24" ref={valuesRef}>
        <Container>
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold text-estate-900 md:text-4xl">
              {t('about.values.title', 'The Principles That Guide Us')}
            </h2>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value) => (
              <div
                key={value.key}
                className="card-premium reveal group rounded-2xl bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition-colors group-hover:bg-blue-100">
                  {value.icon}
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold text-estate-900">
                  {t(`about.values.${value.key}.title`, value.key)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-estate-500">
                  {t(
                    `about.values.${value.key}.description`,
                    'We uphold the highest standards in everything we do.'
                  )}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Offices ─────────────────────────────────────────────────── */}
      <section className="bg-yellow-50 py-20 lg:py-24" ref={officesRef}>
        <Container>
          <div className="text-center">
            <p className="font-heading text-sm uppercase tracking-[0.25em] text-blue-600">
              {t('about.offices.label', 'Global Presence')}
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-tight tracking-widest text-estate-900 md:text-4xl md:leading-tight">
              {t('about.offices.title', 'Our Offices')}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-estate-500">
              {t(
                'about.offices.description',
                'Strategically positioned at the heart of the Mediterranean coast, our offices are your gateway to Alanya\'s thriving property market.'
              )}
            </p>
          </div>

          <div className="mx-auto mt-14 flex max-w-4xl justify-center gap-8">
            {loadingOffices ? (
              <LoadingSkeleton variant="card" count={2} columns={2} />
            ) : offices?.map((office) => (
              <div
                key={office.city}
                className="card-premium reveal group w-full max-w-md overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Office Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={office.image}
                    alt={`${office.city} office`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-5 left-6">
                    <span className="rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                      {office.city} {t('about.offices.officeLabel', 'Office')}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="bg-white p-6">
                  <h3 className="font-heading text-xl font-bold text-estate-900">
                    {office.city}
                  </h3>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-start gap-2 text-sm text-estate-600">
                      <svg
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                        />
                      </svg>
                      <span>{office.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-estate-600">
                      <svg
                        className="h-4 w-4 flex-shrink-0 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                        />
                      </svg>
                      <span>{office.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="bg-estate-900 py-20 text-center text-white">
        <Container>
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            {t('about.cta.title', 'Ready to Begin Your Journey?')}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-estate-300">
            {t(
              'about.cta.description',
              'Connect with our team of experts and discover the perfect property for your lifestyle and investment goals.'
            )}
          </p>
          <Link
            to={ROUTES.CONTACT}
            className="btn-glow mt-8 inline-flex items-center gap-2 rounded-full bg-blue-500 px-8 py-3.5 font-medium text-estate-900 transition-all duration-300 hover:bg-blue-400"
          >
            {t('about.cta.button')}
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
