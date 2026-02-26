import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SEOHead from '../components/seo/SEOHead'
import Container from '../components/common/Container'
import LoadingSkeleton from '../components/common/LoadingSkeleton'
import ErrorMessage from '../components/common/ErrorMessage'
import ImageWithLoader from '../components/common/ImageWithLoader'
import { useBlogPost } from '../hooks/useBlogPosts'
import { useBlogPosts } from '../hooks/useBlogPosts'
import { ROUTES } from '../config/routes'

export default function BlogPost() {
  const { slug } = useParams()
  const { t } = useTranslation()
  const { data: post, loading, error } = useBlogPost(slug)
  const { data: relatedPosts, loading: loadingRelated } = useBlogPosts(4)

  if (loading) return <LoadingSkeleton variant="detail" />
  if (error || !post) return (
    <Container className="py-20">
      <ErrorMessage onRetry={() => window.location.reload()} />
    </Container>
  )

  const filteredRelated = relatedPosts?.filter((p) => p.slug !== slug)?.slice(0, 3) || []

  return (
    <>
      <SEOHead
        title={`${post.title} | EmlakBanq Blog`}
        description={post.excerpt || post.title}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-estate-900 pb-24 pt-36 lg:pb-32 lg:pt-44">
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
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
              <Link to={ROUTES.BLOG} className="transition-colors hover:text-white">
                {t('nav.blog', 'Blog')}
              </Link>
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
              <span className="text-estate-300">{post.category}</span>
            </nav>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3">
              {post.category && (
                <span className="rounded-full bg-blue-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-500/25">
                  {post.category}
                </span>
              )}
              {post.date && (
                <span className="flex items-center gap-1.5 text-sm text-estate-300">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  {post.date}
                </span>
              )}
              {post.read_time && (
                <span className="flex items-center gap-1.5 text-sm text-estate-300">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {post.read_time}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="mt-6 font-heading text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl lg:leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-estate-300">
                {post.excerpt}
              </p>
            )}
          </div>
        </Container>
      </section>

      {/* Article Content */}
      <section className="relative bg-white py-16 lg:py-20">
        {/* Decorative side lines */}
        <div className="absolute left-0 top-0 hidden h-full w-px bg-gradient-to-b from-blue-100 via-transparent to-blue-100 lg:block" style={{ left: 'calc(50% - 400px)' }} />
        <div className="absolute right-0 top-0 hidden h-full w-px bg-gradient-to-b from-blue-100 via-transparent to-blue-100 lg:block" style={{ left: 'calc(50% + 400px)' }} />

        <Container>
          <div className="mx-auto max-w-3xl">
            {/* Featured Image in content */}
            <div className="-mt-28 mb-12 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5">
              <img
                src={post.image}
                alt={post.title}
                className="h-64 w-full object-cover sm:h-80 lg:h-96"
              />
            </div>

            {/* Article body */}
            {post.content ? (
              <article
                className="blog-article"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            ) : post.excerpt ? (
              <p className="text-lg leading-relaxed text-estate-600">{post.excerpt}</p>
            ) : null}

            {/* Share & Back */}
            <div className="mt-16 flex items-center justify-between border-t border-estate-100 pt-8">
              <Link
                to={ROUTES.BLOG}
                className="group flex items-center gap-2 text-sm font-medium text-estate-500 transition-colors hover:text-blue-700"
              >
                <svg className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                {t('blog.backToList', 'All Articles')}
              </Link>

              {/* Share buttons placeholder */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium uppercase tracking-wider text-estate-400">
                  {t('blog.share', 'Share')}
                </span>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: post.title, url: window.location.href })
                    } else {
                      navigator.clipboard.writeText(window.location.href)
                    }
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-estate-200 text-estate-400 transition-all hover:border-blue-300 hover:text-blue-600"
                  title="Share"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                  </svg>
                </button>
              </div>
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
                {t('blog.cta.title', 'Ready to Invest in Alanya?')}
              </h3>
              <p className="mt-2 max-w-lg text-blue-100">
                {t('blog.cta.description', 'Our expert advisors are ready to help you find the perfect property. Get personalized recommendations today.')}
              </p>
            </div>
            <div className="flex flex-shrink-0 gap-3">
              <Link
                to={ROUTES.PROPERTIES}
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-lg transition-all hover:bg-blue-50 hover:shadow-xl"
              >
                {t('blog.cta.viewProperties', 'View Properties')}
              </Link>
              <Link
                to={ROUTES.CONTACT}
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                {t('blog.cta.contact', 'Contact Us')}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Posts */}
      {filteredRelated.length > 0 && (
        <section className="bg-estate-50 py-16 lg:py-20">
          <Container>
            <div className="mb-10 text-center">
              <p className="font-heading text-sm uppercase tracking-[0.25em] text-blue-600">
                {t('blog.relatedLabel', 'Keep Reading')}
              </p>
              <h2 className="mt-3 font-heading text-2xl font-bold text-estate-900 md:text-3xl">
                {t('blog.related', 'Related Articles')}
              </h2>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {loadingRelated ? (
                <LoadingSkeleton variant="card" count={3} columns={3} />
              ) : filteredRelated.map((related) => (
                <Link
                  key={related.slug}
                  to={`/blog/${related.slug}`}
                  className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-estate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-blue-200"
                >
                  <div className="relative h-52 overflow-hidden">
                    <ImageWithLoader
                      src={related.image}
                      alt={related.title}
                      className="transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    {related.category && (
                      <div className="absolute left-4 top-4">
                        <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-estate-900 shadow-sm backdrop-blur-sm">
                          {related.category}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-estate-400">
                      {related.date && <span>{related.date}</span>}
                      {related.read_time && (
                        <>
                          <span className="h-1 w-1 rounded-full bg-estate-300" />
                          <span>{related.read_time}</span>
                        </>
                      )}
                    </div>
                    <h3 className="mt-3 font-heading text-lg font-bold leading-snug text-estate-900 transition-colors group-hover:text-blue-700">
                      {related.title}
                    </h3>
                    {related.excerpt && (
                      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-estate-500">
                        {related.excerpt}
                      </p>
                    )}
                    <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors group-hover:text-blue-700">
                      <span>{t('common.readMore', 'Read More')}</span>
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
