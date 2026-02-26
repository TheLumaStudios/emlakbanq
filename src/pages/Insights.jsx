import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import SEOHead from '../components/seo/SEOHead'
import Container from '../components/common/Container'
import { ROUTES } from '../config/routes'
import { useMarketHighlights, useTopAreasRoi } from '../hooks/useMarketData'
import { useBlogPosts } from '../hooks/useBlogPosts'
import LoadingSkeleton from '../components/common/LoadingSkeleton'

export default function Insights() {
  const { t } = useTranslation()
  const { data: highlights, loading: loadingHighlights } = useMarketHighlights()
  const { data: areasRoi, loading: loadingRoi } = useTopAreasRoi()
  const { data: articles, loading: loadingArticles } = useBlogPosts(3)

  return (
    <>
      <SEOHead
        title={t('insights.meta.title')}
        description={t('insights.meta.description')}
      />

      {/* ── Page Header ─────────────────────────────────────────────── */}
      <section className="bg-estate-900 py-20 text-white lg:py-28">
        <Container>
          <p className="font-heading text-sm uppercase tracking-[0.25em] text-blue-400">
            {t('insights.label')}
          </p>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            {t('insights.heading')}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-estate-300">
            {t('insights.intro')}
          </p>
        </Container>
      </section>

      {/* ── Market Overview ─────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-estate-100 bg-gradient-to-br from-yellow-50 to-white p-8 shadow-sm md:p-10">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                  <svg
                    className="h-5 w-5 text-blue-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-bold text-estate-900">
                    {t('insights.overview.title')}
                  </h2>
                  <p className="text-sm text-estate-500">
                    {t('insights.overview.period')}
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {loadingHighlights ? (
                  <div className="animate-pulse space-y-4">
                    {[1,2,3,4,5].map(i => <div key={i} className="h-4 rounded bg-estate-100" />)}
                  </div>
                ) : highlights?.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                      <svg
                        className="h-3 w-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </div>
                    <p className="text-sm leading-relaxed text-estate-700">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Top Areas by ROI ────────────────────────────────────────── */}
      <section className="bg-yellow-50 py-20 lg:py-24">
        <Container>
          <div className="text-center">
            <p className="font-heading text-sm uppercase tracking-[0.25em] text-blue-600">
              {t('insights.roi.label')}
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-estate-900 md:text-4xl">
              {t('insights.roi.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-estate-500">
              {t('insights.roi.description')}
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl">
            {/* Table Header */}
            <div className="hidden rounded-t-xl bg-estate-900 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white sm:grid sm:grid-cols-4">
              <span>{t('insights.roi.area')}</span>
              <span className="text-center">{t('insights.roi.grossRoi')}</span>
              <span className="text-center">{t('insights.roi.priceRange')}</span>
              <span className="text-right">{t('insights.roi.trend')}</span>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-estate-100 overflow-hidden rounded-b-xl border border-t-0 border-estate-100 bg-white sm:rounded-t-none">
              {loadingRoi ? (
                <LoadingSkeleton variant="table" count={8} />
              ) : areasRoi?.map((item, index) => (
                <div
                  key={item.area}
                  className={`grid gap-2 px-6 py-4 transition-colors hover:bg-yellow-50 sm:grid-cols-4 sm:gap-0 ${
                    index === 0 ? 'sm:rounded-t-none' : ''
                  }`}
                >
                  <div className="font-medium text-estate-900">
                    <span className="mr-2 text-xs text-estate-400 sm:hidden">{t('insights.roi.area')}:</span>
                    {item.area}
                  </div>
                  <div className="text-center">
                    <span className="mr-2 text-xs text-estate-400 sm:hidden">{t('insights.roi.grossRoi')}:</span>
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-0.5 text-sm font-semibold text-emerald-700">
                      {item.roi}
                    </span>
                  </div>
                  <div className="text-center text-sm text-estate-600">
                    <span className="mr-2 text-xs text-estate-400 sm:hidden">{t('insights.roi.priceRange')}:</span>
                    {item.price_range}
                  </div>
                  <div className="text-right">
                    <span className="mr-2 text-xs text-estate-400 sm:hidden">{t('insights.roi.trend')}:</span>
                    {item.trend === 'up' ? (
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {t('insights.roi.rising')}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-estate-500">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 3a1 1 0 011 1v10.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {t('insights.roi.stable')}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-4 text-center text-xs text-estate-400">
              {t('insights.roi.disclaimer')}
            </p>
          </div>
        </Container>
      </section>

      {/* ── Recent Articles ─────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-24">
        <Container>
          <div className="flex items-end justify-between">
            <div>
              <p className="font-heading text-sm uppercase tracking-[0.25em] text-blue-600">
                {t('insights.articles.label')}
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold text-estate-900 md:text-4xl">
                {t('insights.articles.title')}
              </h2>
            </div>
            <Link
              to={ROUTES.BLOG}
              className="hidden items-center gap-2 text-sm font-medium text-blue-700 transition-colors hover:text-blue-800 md:flex"
            >
              {t('insights.articles.viewAll')}
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

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {loadingArticles ? (
              <LoadingSkeleton variant="card" count={3} columns={3} />
            ) : articles?.map((article) => (
              <Link
                key={article.slug}
                to={`/blog/${article.slug}`}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Article Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute bottom-4 left-4">
                    <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-estate-900 backdrop-blur-sm">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-xs text-estate-400">{article.date}</p>
                  <h3 className="mt-2 font-heading text-lg font-semibold leading-snug text-estate-900 transition-colors group-hover:text-blue-700">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-estate-500">
                    {article.excerpt}
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-sm font-medium text-blue-700 transition-colors group-hover:text-blue-800">
                    <span>{t('insights.articles.readArticle')}</span>
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

          {/* Mobile "View All" link */}
          <div className="mt-10 text-center md:hidden">
            <Link
              to={ROUTES.BLOG}
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-700"
            >
              {t('insights.articles.viewAll')}
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
