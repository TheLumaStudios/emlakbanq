import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import SEOHead from '../components/seo/SEOHead'
import Container from '../components/common/Container'
import { ROUTES } from '../config/routes'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'
import { useGoldenVisa } from '../hooks/useGoldenVisa'
import LoadingSkeleton from '../components/common/LoadingSkeleton'

export default function GoldenVisa() {
  const { t } = useTranslation()
  const benefitsRef = useRevealOnScroll()

  const { data: benefits, loading: loadingBenefits } = useGoldenVisa('benefit')
  const { data: eligibility, loading: loadingEligibility } = useGoldenVisa('eligibility')
  const { data: processSteps, loading: loadingProcess } = useGoldenVisa('process_step')

  return (
    <>
      <SEOHead
        title={t('goldenVisa.meta.title')}
        description={t('goldenVisa.meta.description')}
      />

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-estate-900 pb-24 pt-36 text-white lg:pb-32 lg:pt-44">
        {/* Decorative elements */}
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-60 w-60 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
        <Container className="relative z-10">
          <p className="font-heading text-sm uppercase tracking-[0.25em] text-blue-400">
            {t('goldenVisa.subtitle', 'Turkish Citizenship')}
          </p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            {t('goldenVisa.heading', 'Your Gateway to Turkish Citizenship Through Property Investment')}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-estate-300">
            {t(
              'goldenVisa.hero.subtitle',
              'Turkey\'s Citizenship by Investment programme offers full citizenship to property investors, providing a world-class lifestyle at the crossroads of Europe and Asia.'
            )}
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-estate-400">
            {t(
              'goldenVisa.hero.intro',
              'EmlakBanq provides end-to-end citizenship assistance -- from identifying qualifying properties to completing your application. Our dedicated team has helped hundreds of families secure their Turkish citizenship with confidence.'
            )}
          </p>
        </Container>
      </section>

      {/* ── Benefits ────────────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-24" ref={benefitsRef}>
        <Container>
          <div className="text-center">
            <p className="font-heading text-sm uppercase tracking-[0.25em] text-blue-600">
              {t('goldenVisa.benefits.label', 'Why Turkish Citizenship?')}
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-estate-900 md:text-4xl">
              {t('goldenVisa.benefits.title', 'Benefits of Turkish Citizenship by Investment')}
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loadingBenefits ? (
              <LoadingSkeleton variant="card" count={6} columns={3} />
            ) : benefits?.map((item) => (
              <div
                key={item.id}
                className="card-premium reveal group rounded-2xl bg-white p-7 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Green checkmark indicator */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50">
                  <svg
                    className="h-5 w-5 text-emerald-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </div>

                <h3 className="mt-4 font-heading text-lg font-semibold text-estate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-estate-500">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Eligibility ─────────────────────────────────────────────── */}
      <section className="bg-yellow-50 py-20 lg:py-24">
        <Container>
          <div className="mx-auto" style={{ maxWidth: '48rem' }}>
            <div className="text-center">
              <p className="font-heading text-sm uppercase tracking-[0.25em] text-blue-600">
                {t('goldenVisa.eligibility.label', 'Requirements')}
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold text-estate-900 md:text-4xl">
                {t('goldenVisa.eligibility.title', 'Eligibility Criteria')}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-estate-500">
                {t(
                  'goldenVisa.eligibility.description',
                  'The following criteria apply to the property investor route of the Turkish Citizenship by Investment programme.'
                )}
              </p>
            </div>

            <div className="mt-12 space-y-4">
              {loadingEligibility ? (
                <div className="space-y-4">
                  {[1,2,3,4,5,6].map((i) => (
                    <div key={i} className="h-14 animate-pulse rounded-xl bg-estate-100" />
                  ))}
                </div>
              ) : eligibility?.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-start gap-4 rounded-xl border border-estate-100 bg-white px-6 py-4 transition-all duration-300 hover:border-blue-200 hover:shadow-sm"
                >
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-800">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-relaxed text-estate-700">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Process Steps ───────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-24">
        <Container>
          <div className="text-center">
            <p className="font-heading text-sm uppercase tracking-[0.25em] text-blue-600">
              {t('goldenVisa.process.label', 'How It Works')}
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-estate-900 md:text-4xl">
              {t('goldenVisa.process.title', 'Your Path to Turkish Citizenship')}
            </h2>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-4">
            {loadingProcess ? (
              <LoadingSkeleton variant="card" count={4} columns={4} />
            ) : processSteps?.map((item, index) => (
              <div key={item.id} className="relative text-center">
                {/* Step Number */}
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-500/20">
                  <span className="font-heading text-2xl font-bold text-white">
                    {index + 1}
                  </span>
                </div>

                {/* Connector line (hidden on last item and mobile) */}
                {index < (processSteps?.length || 0) - 1 && (
                  <div className="absolute left-[calc(50%+2.5rem)] top-8 hidden h-px w-[calc(100%-3rem)] bg-gradient-to-r from-blue-300 to-blue-100 lg:block" />
                )}

                <h3 className="mt-6 font-heading text-lg font-semibold text-estate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-estate-500">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-estate-900 via-estate-800 to-estate-900 py-24 text-center text-white">
        <Container>
          <div className="mx-auto max-w-2xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/20">
              <svg
                className="h-8 w-8 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                />
              </svg>
            </div>

            <h2 className="mt-6 font-heading text-3xl font-bold md:text-4xl lg:text-5xl">
              {t('goldenVisa.cta.title', 'Start Your Citizenship Journey')}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-estate-300">
              {t(
                'goldenVisa.cta.description',
                'Our dedicated visa specialists will guide you from property selection to visa approval. Book a free consultation today.'
              )}
            </p>
            <Link
              to={ROUTES.CONTACT}
              className="btn-glow mt-8 inline-flex items-center gap-2 rounded-full bg-blue-500 px-8 py-4 text-lg font-medium text-estate-900 transition-all duration-300 hover:bg-blue-400"
            >
              {t('goldenVisa.cta.button', 'Book Free Consultation')}
              <svg
                className="h-5 w-5"
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
