import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { supabase } from '../../utils/supabase'
import AdminFormField from '../../components/admin/AdminFormField'
import MultilingualInput from '../../components/admin/MultilingualInput'
import ImageUpload from '../../components/admin/ImageUpload'

const generateSlug = (title) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const INITIAL_STATE = {
  title: {},
  slug: '',
  excerpt: {},
  content: {},
  image: '',
  category: {},
  category_color: '',
  date: '',
  published: true,
  published_at: '',
  sort_order: 0,
}

export default function BlogForm() {
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [formData, setFormData] = useState(INITIAL_STATE)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (isEdit) {
      fetchPost()
    }
  }, [id])

  const fetchPost = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching blog post:', error)
      setError(t('admin.blog.notFound'))
    } else if (data) {
      setFormData({
        title: data.title || {},
        slug: data.slug || '',
        excerpt: data.excerpt || {},
        content: data.content || {},
        image: data.image || '',
        category: data.category || {},
        category_color: data.category_color || '',
        date: data.date || '',
        published: data.published ?? true,
        published_at: data.published_at || '',
        sort_order: data.sort_order || 0,
      })
    }
    setLoading(false)
  }

  const handleChange = (name, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [name]: value }
      // Auto-generate slug from English title
      if (name === 'title' && value.en) {
        const prevEnglishTitle = prev.title?.en || ''
        if (!prev.slug || prev.slug === generateSlug(prevEnglishTitle)) {
          updated.slug = generateSlug(value.en)
        }
      }
      return updated
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const payload = {
      title: formData.title,
      slug: formData.slug,
      excerpt: formData.excerpt,
      content: formData.content,
      image: formData.image,
      category: formData.category,
      category_color: formData.category_color,
      date: formData.date,
      published: formData.published,
      published_at: formData.published_at || null,
      sort_order: parseInt(formData.sort_order, 10) || 0,
    }

    let result
    if (isEdit) {
      result = await supabase
        .from('blog_posts')
        .update(payload)
        .eq('id', id)
    } else {
      result = await supabase
        .from('blog_posts')
        .insert(payload)
    }

    if (result.error) {
      console.error('Error saving blog post:', result.error)
      setError(result.error.message || t('admin.blog.failedToSave'))
      setSaving(false)
      return
    }

    navigate('/admin/blog')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-estate-200 border-t-gold-500" />
          <p className="text-sm text-estate-400">{t('admin.blog.loadingPost')}</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Back Link */}
      <Link
        to="/admin/blog"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-estate-500 transition-colors hover:text-estate-700"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        {t('admin.blog.backToBlog')}
      </Link>

      {/* Title */}
      <h1 className="mb-6 font-heading text-2xl font-bold text-estate-900">
        {isEdit ? t('admin.blog.editPost') : t('admin.blog.addPost')}
      </h1>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-xl border border-estate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-heading text-lg font-semibold text-estate-900">{t('admin.blogForm.basicInfo')}</h2>
          <div className="space-y-6">
            {/* Blog Title - All Languages */}
            <MultilingualInput
              label={t('admin.blogForm.title')}
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder={t('admin.blogForm.titlePlaceholder')}
              help={t('admin.blogForm.titleHelp')}
            />

            {/* Slug */}
            <AdminFormField
              label={t('admin.blogForm.slug')}
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              disabled
              placeholder={t('admin.blogForm.slugPlaceholder')}
              help={t('admin.blogForm.slugHelp')}
            />

            {/* Category - All Languages */}
            <MultilingualInput
              label={t('admin.blogForm.category')}
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder={t('admin.blogForm.categoryPlaceholder')}
              help={t('admin.blogForm.categoryHelp')}
            />

            {/* Other fields */}
            <div className="grid gap-5 sm:grid-cols-2">
              <AdminFormField
                label={t('admin.blogForm.categoryColor')}
                name="category_color"
                value={formData.category_color}
                onChange={handleChange}
                placeholder={t('admin.blogForm.categoryColorPlaceholder')}
                help={t('admin.blogForm.categoryColorHelp')}
              />
              <AdminFormField
                label={t('admin.blogForm.date')}
                name="date"
                value={formData.date}
                onChange={handleChange}
                placeholder={t('admin.blogForm.datePlaceholder')}
                help={t('admin.blogForm.dateHelp')}
              />
              <ImageUpload
                label={t('admin.blogForm.imageUrl')}
                name="image"
                value={formData.image}
                onChange={handleChange}
                folder="blog"
              />
              <AdminFormField
                label={t('admin.blogForm.publishedAt')}
                name="published_at"
                value={formData.published_at}
                onChange={handleChange}
                placeholder={t('admin.blogForm.publishedAtPlaceholder')}
                help={t('admin.blogForm.publishedAtHelp')}
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-estate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-heading text-lg font-semibold text-estate-900">{t('admin.blogForm.content')}</h2>
          <div className="space-y-6">
            {/* Excerpt - All Languages */}
            <MultilingualInput
              label={t('admin.blogForm.excerpt')}
              name="excerpt"
              type="textarea"
              value={formData.excerpt}
              onChange={handleChange}
              rows={3}
              placeholder={t('admin.blogForm.excerptPlaceholder')}
              help={t('admin.blogForm.excerptHelp')}
            />

            {/* Content - All Languages */}
            <MultilingualInput
              label={t('admin.blogForm.fullContent')}
              name="content"
              type="textarea"
              value={formData.content}
              onChange={handleChange}
              rows={12}
              placeholder={t('admin.blogForm.contentPlaceholder')}
              help={t('admin.blogForm.contentHelp')}
            />
          </div>
        </div>

        <div className="rounded-xl border border-estate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-heading text-lg font-semibold text-estate-900">{t('admin.blogForm.settings')}</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <AdminFormField
              label={t('admin.blogForm.sortOrder')}
              name="sort_order"
              type="number"
              value={formData.sort_order}
              onChange={handleChange}
              placeholder={t('admin.blogForm.sortOrderPlaceholder')}
              help={t('admin.blogForm.sortOrderHelp')}
            />
            <div className="flex items-end">
              <AdminFormField
                label={t('admin.blogForm.published')}
                name="published"
                type="checkbox"
                value={formData.published}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 border-t border-estate-200 pt-6">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-gold-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-gold-600 disabled:opacity-50"
          >
            {saving ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                {t('admin.common.saving')}
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {isEdit ? t('admin.blogForm.updatePost') : t('admin.blogForm.createPost')}
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/blog')}
            className="rounded-lg border border-estate-200 bg-white px-6 py-2.5 text-sm font-medium text-estate-700 transition-colors hover:bg-estate-50"
          >
            {t('admin.blogForm.cancel')}
          </button>
        </div>
      </form>
    </div>
  )
}
