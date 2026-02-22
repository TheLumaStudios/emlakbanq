import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SEOHead from '../components/seo/SEOHead'
import Container from '../components/common/Container'
import LoadingSkeleton from '../components/common/LoadingSkeleton'
import ErrorMessage from '../components/common/ErrorMessage'
import { useBlogPost } from '../hooks/useBlogPosts'
import { useBlogPosts } from '../hooks/useBlogPosts'
import { ROUTES } from '../config/routes'

export default function BlogPost() {
  const { slug } = useParams()
  const { t } = useTranslation()
  const { data: post, loading, error } = useBlogPost(slug)
  const { data: relatedPosts, loading: loadingRelated } = useBlogPosts(3)

  if (loading) return <LoadingSkeleton variant="detail" />
  if (error || !post) return (
    <Container className="py-20">
      <ErrorMessage onRetry={() => window.location.reload()} />
    </Container>
  )

  // Filter out current post from related posts
  const filteredRelated = relatedPosts?.filter((p) => p.slug !== slug) || []

  return (
    <>
      <SEOHead
        title={`${post.title} | EmlakBanq Blog`}
        description={post.excerpt || post.title}
      />

      {/* Hero Image */}
      <section className="relative overflow-hidden bg-estate-900 pb-20 pt-36 lg:pb-28 lg:pt-44">
        <img src={post.image} alt={post.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-estate-900/90 via-estate-900/40 to-transparent" />
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-60 w-60 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
        <Container className="relative z-10">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-3">
              {post.category && (
                <span className="rounded-full bg-blue-500 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
                  {post.category}
                </span>
              )}
              {post.date && (
                <span className="text-sm text-estate-300">{post.date}</span>
              )}
            </div>
            <h1 className="mt-4 font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              {post.title}
            </h1>
          </div>
        </Container>
      </section>

      {/* Author & Meta Bar */}
      {(post.author || post.read_time) && (
        <section className="border-b border-estate-100 bg-white py-5">
          <Container>
            <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-6">
              {post.author && (
                <div className="flex items-center gap-3">
                  {post.author_image && (
                    <img
                      src={post.author_image}
                      alt={post.author}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="text-sm font-medium text-estate-900">{post.author}</p>
                    {post.author_role && (
                      <p className="text-xs text-estate-400">{post.author_role}</p>
                    )}
                  </div>
                </div>
              )}
              {post.read_time && (
                <div className="flex items-center gap-1.5 text-sm text-estate-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{post.read_time}</span>
                </div>
              )}
            </div>
          </Container>
        </section>
      )}

      {/* Article Content */}
      <section className="bg-white py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            {post.content ? (
              <div
                className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-estate-900 prose-p:text-estate-600 prose-a:text-blue-700 prose-a:no-underline hover:prose-a:underline prose-strong:text-estate-900 prose-img:rounded-xl"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            ) : post.excerpt ? (
              <p className="text-base leading-relaxed text-estate-600">{post.excerpt}</p>
            ) : null}
          </div>
        </Container>
      </section>

      {/* Tags */}
      {post.tags?.length > 0 && (
        <section className="border-t border-estate-100 bg-white pb-16">
          <Container>
            <div className="mx-auto max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-estate-400">Tags:</span>
                {post.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-estate-100 px-3 py-1 text-xs font-medium text-estate-500 transition-colors hover:border-blue-200 hover:text-blue-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Related Posts */}
      {filteredRelated.length > 0 && (
        <section className="bg-yellow-50 py-16 lg:py-20">
          <Container>
            <h2 className="font-heading text-2xl font-bold text-estate-900">
              {t('blog.related', 'Related Articles')}
            </h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {loadingRelated ? (
                <LoadingSkeleton variant="card" count={3} columns={3} />
              ) : filteredRelated.map((related) => (
                <Link
                  key={related.slug}
                  to={`/blog/${related.slug}`}
                  className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {related.category && (
                      <div className="absolute left-4 top-4">
                        <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-estate-900 backdrop-blur-sm">
                          {related.category}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    {related.date && (
                      <p className="text-xs text-estate-400">{related.date}</p>
                    )}
                    <h3 className="mt-2 font-heading text-lg font-semibold text-estate-900 transition-colors group-hover:text-blue-700">
                      {related.title}
                    </h3>
                    {related.excerpt && (
                      <p className="mt-2 line-clamp-2 text-sm text-estate-500">{related.excerpt}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="bg-estate-900 py-20 text-center text-white">
        <Container>
          <div className="mx-auto max-w-2xl">
            <svg className="mx-auto h-12 w-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <h2 className="mt-6 font-heading text-3xl font-bold md:text-4xl">
              {t('blog.newsletter.title', 'Stay Informed')}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-estate-300">
              {t(
                'blog.newsletter.description',
                'Subscribe to our newsletter for the latest market insights, investment tips, and exclusive property listings delivered straight to your inbox.'
              )}
            </p>
            <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder={t('blog.newsletter.placeholder', 'Enter your email')}
                className="flex-1 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm text-white placeholder:text-estate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <button className="btn-glow rounded-full bg-blue-500 px-8 py-3.5 text-sm font-medium text-estate-900 transition-all duration-300 hover:bg-blue-400">
                {t('blog.newsletter.subscribe', 'Subscribe')}
              </button>
            </div>
            <p className="mt-4 text-xs text-estate-400">
              {t('blog.newsletter.privacy', 'No spam. Unsubscribe anytime. We respect your privacy.')}
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
