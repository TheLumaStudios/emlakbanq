import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import SEOHead from '../components/seo/SEOHead'
import Container from '../components/common/Container'
import { ROUTES } from '../config/routes'
import { useBlogPosts } from '../hooks/useBlogPosts'
import LoadingSkeleton from '../components/common/LoadingSkeleton'
import ImageWithLoader from '../components/common/ImageWithLoader'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

export default function Blog() {
  const { t } = useTranslation()
  const { data: posts, loading } = useBlogPosts()
  const gridRef = useRevealOnScroll()

  const featuredPost = posts?.[0]
  const remainingPosts = posts?.slice(1)

  return (
    <>
      <SEOHead
        title={t('blog.meta.title')}
        description={t('blog.meta.description')}
      />

      {/* ── Page Header ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-estate-900 pb-20 pt-36 text-white lg:pb-28 lg:pt-44">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-60 w-60 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
        <Container className="relative z-10">
          <p className="font-heading text-sm uppercase tracking-[0.25em] text-blue-400">
            {t('blog.subtitle', 'Expert Commentary')}
          </p>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            {t('blog.heading', 'The EmlakBanq Journal')}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-estate-300">
            {t(
              'blog.intro',
              'In-depth articles, market commentary, and expert perspectives on Alanya\'s real estate landscape. Written by our research team for discerning investors.'
            )}
          </p>
        </Container>
      </section>

      {/* ── Featured Post ──────────────────────────────────────────── */}
      {!loading && featuredPost && (
        <section className="bg-white py-16 lg:py-20">
          <Container>
            <Link
              to={ROUTES.BLOG_POST.replace(':slug', featuredPost.slug)}
              className="group grid overflow-hidden rounded-2xl bg-estate-900 shadow-2xl ring-1 ring-estate-800 transition-all duration-500 hover:shadow-blue-900/20 lg:grid-cols-2"
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden lg:h-auto lg:min-h-[420px]">
                <ImageWithLoader
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-estate-900/20 lg:bg-gradient-to-l lg:from-estate-900/30 lg:to-transparent" />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center p-8 lg:p-12">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-blue-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                    {featuredPost.category}
                  </span>
                  <span className="text-sm text-estate-400">{featuredPost.date}</span>
                  {featuredPost.read_time && (
                    <>
                      <span className="h-1 w-1 rounded-full bg-estate-600" />
                      <span className="text-sm text-estate-400">{featuredPost.read_time}</span>
                    </>
                  )}
                </div>
                <h2 className="mt-5 font-heading text-2xl font-bold leading-tight text-white transition-colors group-hover:text-blue-300 md:text-3xl lg:text-4xl">
                  {featuredPost.title}
                </h2>
                <p className="mt-4 line-clamp-3 text-base leading-relaxed text-estate-300">
                  {featuredPost.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-400 transition-colors group-hover:text-blue-300">
                  <span>{t('common.readMore', 'Read More')}</span>
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </Link>
          </Container>
        </section>
      )}

      {/* ── Blog Grid ───────────────────────────────────────────────── */}
      <section className="bg-estate-50 py-16 lg:py-20" ref={gridRef}>
        <Container>
          {loading && (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <LoadingSkeleton variant="card" count={6} columns={3} />
            </div>
          )}

          {!loading && remainingPosts?.length > 0 && (
            <>
              <div className="mb-10 text-center">
                <p className="font-heading text-sm uppercase tracking-[0.25em] text-blue-600">
                  {t('blog.moreLabel', 'Explore')}
                </p>
                <h2 className="mt-3 font-heading text-2xl font-bold text-estate-900 md:text-3xl">
                  {t('blog.moreTitle', 'All Articles')}
                </h2>
              </div>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {remainingPosts.map((post, index) => (
                  <Link
                    key={post.slug}
                    to={ROUTES.BLOG_POST.replace(':slug', post.slug)}
                    className={`reveal reveal-delay-${index % 3} group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-estate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-blue-200`}
                  >
                    {/* Blog Post Image */}
                    <div className="relative h-56 overflow-hidden">
                      <ImageWithLoader
                        src={post.image}
                        alt={post.title}
                        className="transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      {post.category && (
                        <div className="absolute left-4 top-4">
                          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-estate-900 shadow-sm backdrop-blur-sm">
                            {post.category}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="p-6">
                      {/* Date + Read Time */}
                      <div className="flex items-center gap-3 text-xs text-estate-400">
                        <span>{post.date}</span>
                        {post.read_time && (
                          <>
                            <span className="h-1 w-1 rounded-full bg-estate-300" />
                            <span>{post.read_time}</span>
                          </>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="mt-3 font-heading text-lg font-bold leading-snug text-estate-900 transition-colors group-hover:text-blue-700">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-estate-500">
                        {post.excerpt}
                      </p>

                      {/* Read More */}
                      <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors group-hover:text-blue-700">
                        <span>{t('common.readMore', 'Read More')}</span>
                        <svg
                          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
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
            </>
          )}
        </Container>
      </section>
    </>
  )
}
