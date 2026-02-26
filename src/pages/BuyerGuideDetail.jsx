import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SEOHead from '../components/seo/SEOHead'
import Container from '../components/common/Container'
import LoadingSkeleton from '../components/common/LoadingSkeleton'
import ErrorMessage from '../components/common/ErrorMessage'
import { useBuyerGuide, useBuyerGuides } from '../hooks/useBuyerGuides'
import { ROUTES } from '../config/routes'

export default function BuyerGuideDetail() {
  const { slug } = useParams()
  const { t } = useTranslation()
  const { data: guide, loading, error } = useBuyerGuide(slug)
  const { data: allGuides, loading: loadingAll } = useBuyerGuides()

  if (loading) return <LoadingSkeleton variant="detail" />
  if (error || !guide) return (
    <Container className="py-20">
      <ErrorMessage onRetry={() => window.location.reload()} />
    </Container>
  )

  const otherGuides = allGuides?.filter((g) => g.slug !== slug)?.slice(0, 3) || []

  return (
    <>
      <SEOHead
        title={`${guide.title} | EmlakBanq`}
        description={guide.description || guide.title}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-estate-900 pb-24 pt-36 lg:pb-32 lg:pt-44">
        <img
          src={guide.image}
          alt={guide.title}
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-estate-900 via-estate-900/70 to-estate-900/30" />
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-blue-500/8 blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />

        <Container className="relative z-10">
          <div className="mx-auto max-w-4xl">
            {/* Breadcrumb */}
            <nav className="mb-8 flex items-center gap-2 text-sm text-estate-400">
              <Link to={ROUTES.HOME} className="transition-colors hover:text-white">
                {t('common.home', 'Home')}
              </Link>
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
              <Link to={ROUTES.BUYER_GUIDES} className="transition-colors hover:text-white">
                {t('nav.buyerGuides', 'Buyer Guides')}
              </Link>
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
              <span className="text-estate-300">{guide.tag}</span>
            </nav>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3">
              {guide.tag && (
                <span className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider shadow-lg ${guide.tag_color}`}>
                  {guide.tag}
                </span>
              )}
              {guide.read_time && (
                <span className="flex items-center gap-1.5 text-sm text-estate-300">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {guide.read_time}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="mt-6 font-heading text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl lg:leading-tight">
              {guide.title}
            </h1>

            {/* Description */}
            {guide.description && (
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-estate-300">
                {guide.description}
              </p>
            )}
          </div>
        </Container>
      </section>

      {/* Article Content */}
      <section className="relative bg-white py-16 lg:py-20">
        <div className="absolute left-0 top-0 hidden h-full w-px bg-gradient-to-b from-blue-100 via-transparent to-blue-100 lg:block" style={{ left: 'calc(50% - 400px)' }} />
        <div className="absolute right-0 top-0 hidden h-full w-px bg-gradient-to-b from-blue-100 via-transparent to-blue-100 lg:block" style={{ left: 'calc(50% + 400px)' }} />

        <Container>
          <div className="mx-auto max-w-3xl">
            {/* Featured Image */}
            <div className="-mt-28 mb-12 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5">
              <img
                src={guide.image}
                alt={guide.title}
                className="h-64 w-full object-cover sm:h-80 lg:h-96"
              />
            </div>

            {/* Article body */}
            {guide.content ? (
              <article
                className="blog-article"
                dangerouslySetInnerHTML={{ __html: guide.content }}
              />
            ) : guide.description ? (
              <p className="text-lg leading-relaxed text-estate-600">{guide.description}</p>
            ) : null}

            {/* Back */}
            <div className="mt-16 flex items-center border-t border-estate-100 pt-8">
              <Link
                to={ROUTES.BUYER_GUIDES}
                className="group flex items-center gap-2 text-sm font-medium text-estate-500 transition-colors hover:text-blue-700"
              >
                <svg className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                {t('buyerGuides.backToGuides', 'All Guides')}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-14">
        <Container>
          <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
            <div>
              <h3 className="font-heading text-2xl font-bold text-white">
                {t('buyerGuides.cta.title', 'Need Personalised Advice?')}
              </h3>
              <p className="mt-2 max-w-lg text-blue-100">
                {t('buyerGuides.cta.description', 'Our consultants can create a bespoke investment strategy tailored to your financial goals.')}
              </p>
            </div>
            <Link
              to={ROUTES.CONTACT}
              className="flex-shrink-0 rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-lg transition-all hover:bg-blue-50 hover:shadow-xl"
            >
              {t('buyerGuides.speakToExpert', 'Speak to an Expert')}
            </Link>
          </div>
        </Container>
      </section>

      {/* Other Guides */}
      {otherGuides.length > 0 && (
        <section className="bg-estate-50 py-16 lg:py-20">
          <Container>
            <div className="mb-10 text-center">
              <p className="font-heading text-sm uppercase tracking-[0.25em] text-blue-600">
                {t('buyerGuides.otherLabel', 'Keep Reading')}
              </p>
              <h2 className="mt-3 font-heading text-2xl font-bold text-estate-900 md:text-3xl">
                {t('buyerGuides.otherGuides', 'Other Guides')}
              </h2>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {loadingAll ? (
                <LoadingSkeleton variant="card" count={3} columns={3} />
              ) : otherGuides.map((other) => (
                <Link
                  key={other.slug}
                  to={`/buyer-guides/${other.slug}`}
                  className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-estate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-blue-200"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={other.image}
                      alt={other.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {other.tag && (
                      <div className="absolute left-4 top-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${other.tag_color}`}>
                          {other.tag}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-lg font-bold leading-snug text-estate-900 transition-colors group-hover:text-blue-700">
                      {other.title}
                    </h3>
                    {other.description && (
                      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-estate-500">
                        {other.description}
                      </p>
                    )}
                    <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors group-hover:text-blue-700">
                      <span>{t('buyerGuides.readGuide', 'Read Guide')}</span>
                      <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  )
}
