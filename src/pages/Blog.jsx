import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import SEOHead from '../components/seo/SEOHead'
import Container from '../components/common/Container'
import { ROUTES } from '../config/routes'
import { useBlogPosts } from '../hooks/useBlogPosts'
import LoadingSkeleton from '../components/common/LoadingSkeleton'
import ImageWithLoader from '../components/common/ImageWithLoader'

export default function Blog() {
  const { t } = useTranslation()
  const { data: posts, loading } = useBlogPosts()

  return (
    <>
      <SEOHead
        title={t('blog.meta.title')}
        description={t('blog.meta.description')}
      />

      {/* ── Page Header ─────────────────────────────────────────────── */}
      <section className="bg-estate-900 py-20 text-white lg:py-28">
        <Container>
          <p className="font-heading text-sm uppercase tracking-[0.25em] text-gold-400">
            {t('blog.subtitle', 'Expert Commentary')}
          </p>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            {t('blog.heading', 'The EmlakBanq Journal')}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-estate-300">
            {t(
              'blog.intro',
              'In-depth articles, market commentary, and expert perspectives on Dubai\'s luxury real estate landscape. Written by our research team for discerning investors.'
            )}
          </p>
        </Container>
      </section>

      {/* ── Blog Grid ───────────────────────────────────────────────── */}
      <section className="bg-cream-50 py-20 lg:py-24">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {loading && <LoadingSkeleton variant="card" count={6} columns={3} />}
            {!loading && posts?.map((post) => (
              <Link
                key={post.slug}
                to={ROUTES.BLOG_POST.replace(':slug', post.slug)}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Blog Post Image */}
                <div className="relative h-56 overflow-hidden">
                  <ImageWithLoader
                    src={post.image}
                    alt={post.title}
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Card Body */}
                <div className="p-6">
                  {/* Date + Category */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-estate-400">{post.date}</span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${post.category_color}`}
                    >
                      {post.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-3 font-heading text-lg font-semibold leading-snug text-estate-900 transition-colors group-hover:text-gold-700">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-estate-500">
                    {post.excerpt}
                  </p>

                  {/* Read More */}
                  <div className="mt-5 flex items-center gap-2 text-sm font-medium text-gold-700 transition-colors group-hover:text-gold-800">
                    <span>{t('common.readMore', 'Read More')}</span>
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

      {/* ── Newsletter CTA ──────────────────────────────────────────── */}
      <section className="bg-estate-900 py-20 text-center text-white">
        <Container>
          <div className="mx-auto max-w-2xl">
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              {t('blog.newsletter.title', 'Stay Ahead of the Market')}
            </h2>
            <p className="mt-4 text-lg text-estate-300">
              {t(
                'blog.newsletter.description',
                'Subscribe to our weekly newsletter for exclusive market insights, new listings, and investment opportunities delivered straight to your inbox.'
              )}
            </p>
            <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder={t('footer.newsletter.placeholder', 'Enter your email')}
                className="flex-1 rounded-full border border-estate-700 bg-estate-800 px-5 py-3 text-sm text-white placeholder:text-estate-500 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
              />
              <button
                type="button"
                className="rounded-full bg-gold-500 px-6 py-3 text-sm font-medium text-estate-900 transition-all duration-300 hover:bg-gold-400 hover:shadow-lg hover:shadow-gold-500/25"
              >
                {t('footer.newsletter.subscribe', 'Subscribe')}
              </button>
            </div>
            <p className="mt-3 text-xs text-estate-500">
              {t(
                'blog.newsletter.privacy',
                'No spam, ever. Unsubscribe anytime. We respect your privacy.'
              )}
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
