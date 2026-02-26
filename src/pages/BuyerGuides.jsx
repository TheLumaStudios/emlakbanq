import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import SEOHead from '../components/seo/SEOHead'
import Container from '../components/common/Container'
import { ROUTES } from '../config/routes'
import { useBuyerGuides } from '../hooks/useBuyerGuides'
import LoadingSkeleton from '../components/common/LoadingSkeleton'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

export default function BuyerGuides() {
  const { t } = useTranslation()
  const { data: guides, loading } = useBuyerGuides()
  const gridRef = useRevealOnScroll()

  return (
    <>
      <SEOHead
        title={t('buyerGuides.meta.title')}
        description={t('buyerGuides.meta.description')}
      />

      {/* ── Page Header ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-estate-900 pb-20 pt-36 text-white lg:pb-28 lg:pt-44">
        {/* Decorative elements */}
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-60 w-60 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
        <Container className="relative z-10">
          <p className="font-heading text-sm uppercase tracking-[0.25em] text-blue-400">
            {t('buyerGuides.subtitle', 'Knowledge Centre')}
          </p>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            {t('buyerGuides.heading', 'Buyer\'s Guides & Resources')}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-estate-300">
            {t(
              'buyerGuides.intro',
              'Expert-crafted guides designed to empower your property decisions. From first-time buyers to seasoned investors, gain the knowledge you need to invest with confidence.'
            )}
          </p>
        </Container>
      </section>

      {/* ── Guides Grid ─────────────────────────────────────────────── */}
      <section className="bg-estate-50 py-20 lg:py-24" ref={gridRef}>
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {loading && <LoadingSkeleton variant="card" count={6} columns={3} />}
            {!loading && guides?.map((guide, index) => (
              <Link
                key={guide.slug}
                to={ROUTES.BUYER_GUIDE_DETAIL.replace(':slug', guide.slug)}
                className={`reveal reveal-delay-${index % 3} group overflow-hidden rounded-2xl border-t-4 ${guide.border_color} bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
              >
                {/* Guide Image */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-7">
                  {/* Tag + Read Time */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${guide.tag_color}`}
                    >
                      {guide.tag}
                    </span>
                    <span className="text-xs text-estate-400">{guide.read_time}</span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-5 font-heading text-lg font-semibold leading-snug text-estate-900 transition-colors group-hover:text-blue-700">
                    {guide.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-relaxed text-estate-500">
                    {guide.description}
                  </p>

                  {/* Read Guide Link */}
                  <div className="mt-6 flex items-center gap-2 text-sm font-medium text-blue-700 transition-colors group-hover:text-blue-800">
                    <span>{t('buyerGuides.readGuide')}</span>
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

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 text-center lg:py-24">
        <Container>
          <div className="mx-auto max-w-2xl">
            <h2 className="font-heading text-3xl font-bold text-estate-900 md:text-4xl">
              {t('buyerGuides.cta.title', 'Need Personalised Advice?')}
            </h2>
            <p className="mt-4 text-lg text-estate-500">
              {t(
                'buyerGuides.cta.description',
                'Our consultants can create a bespoke investment strategy tailored to your financial goals, timeline, and risk appetite.'
              )}
            </p>
            <Link
              to={ROUTES.CONTACT}
              className="btn-glow mt-8 inline-flex items-center gap-2 rounded-full bg-blue-500 px-8 py-3.5 font-medium text-estate-900 transition-all duration-300 hover:bg-blue-400"
            >
              {t('buyerGuides.speakToExpert')}
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
          </div>
        </Container>
      </section>
    </>
  )
}
