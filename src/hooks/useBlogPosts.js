import { useSupabaseQuery } from './useSupabaseQuery'
import { useTranslation } from 'react-i18next'

// Helper function to get translation from JSONB field
function getTranslation(jsonbField, lang, fallbackLang = 'en') {
  if (!jsonbField || typeof jsonbField !== 'object') return jsonbField
  return jsonbField[lang] || jsonbField[fallbackLang] || jsonbField['en'] || ''
}

// Helper function to map database fields to current language
function mapBlogPostFields(post, lang) {
  if (!post) return null

  return {
    ...post,
    title: getTranslation(post.title, lang),
    excerpt: getTranslation(post.excerpt, lang),
    content: getTranslation(post.content, lang),
    category: getTranslation(post.category, lang),
  }
}

export function useBlogPosts(limit) {
  const { i18n } = useTranslation()
  const lang = i18n.language

  const result = useSupabaseQuery(
    (sb) => {
      let query = sb.from('blog_posts').select('*').eq('published', true).order('sort_order')
      if (limit) query = query.limit(limit)
      return query
    },
    [limit]
  )

  return {
    ...result,
    data: result.data?.map(post => mapBlogPostFields(post, lang))
  }
}

export function useBlogPost(slug) {
  const { i18n } = useTranslation()
  const lang = i18n.language

  const result = useSupabaseQuery(
    (sb) => sb.from('blog_posts').select('*').eq('slug', slug).single(),
    [slug]
  )

  return {
    ...result,
    data: mapBlogPostFields(result.data, lang)
  }
}
