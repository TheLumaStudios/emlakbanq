import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { supabase } from '../../utils/supabase'
import AdminFormField from '../../components/admin/AdminFormField'
import MultilingualInput from '../../components/admin/MultilingualInput'
import ImageUpload from '../../components/admin/ImageUpload'

const generateSlug = (title) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const getTypeOptions = (t) => [
  { value: 'apartment', label: t('admin.propertyForm.typeOptions.apartment') },
  { value: 'villa', label: t('admin.propertyForm.typeOptions.villa') },
  { value: 'penthouse', label: t('admin.propertyForm.typeOptions.penthouse') },
  { value: 'townhouse', label: t('admin.propertyForm.typeOptions.townhouse') },
]

const INITIAL_STATE = {
  name: {},
  slug: '',
  type: '',
  type_label: {},
  location: {},
  price: '',
  beds: '',
  sqft: '',
  developer: '',
  year: '',
  image: '',
  description: '',
  gallery: '',
  amenities: '',
  featured: false,
  sort_order: 0,
}

export default function PropertyForm() {
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
      fetchProperty()
    }
  }, [id])

  const fetchProperty = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching property:', error)
      setError(t('admin.properties.notFound'))
    } else if (data) {
      setFormData({
        name: data.name || {},
        slug: data.slug || '',
        type: data.type || '',
        type_label: data.type_label || {},
        location: data.location || {},
        price: data.price || '',
        beds: data.beds != null ? String(data.beds) : '',
        sqft: data.sqft || '',
        developer: data.developer || '',
        year: data.year || '',
        image: data.image || '',
        description: data.description || '',
        gallery: (data.gallery || []).join('\n'),
        amenities: (data.amenities || []).join('\n'),
        featured: data.featured || false,
        sort_order: data.sort_order || 0,
      })
    }
    setLoading(false)
  }

  const handleChange = (name, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [name]: value }
      // Auto-generate slug from English name if slug is empty or was auto-generated
      if (name === 'name' && value.en) {
        const prevEnglishName = prev.name?.en || ''
        if (!prev.slug || prev.slug === generateSlug(prevEnglishName)) {
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
      name: formData.name,
      slug: formData.slug,
      type: formData.type,
      type_label: formData.type_label,
      location: formData.location,
      price: formData.price,
      beds: formData.beds ? parseInt(formData.beds, 10) : null,
      sqft: formData.sqft,
      developer: formData.developer,
      year: formData.year,
      image: formData.image,
      description: formData.description,
      gallery: formData.gallery.split('\n').filter(Boolean),
      amenities: formData.amenities.split('\n').filter(Boolean),
      featured: formData.featured,
      sort_order: parseInt(formData.sort_order, 10) || 0,
    }

    let result
    if (isEdit) {
      result = await supabase
        .from('properties')
        .update(payload)
        .eq('id', id)
    } else {
      result = await supabase
        .from('properties')
        .insert(payload)
    }

    if (result.error) {
      console.error('Error saving property:', result.error)
      setError(result.error.message || t('admin.properties.failedToSave'))
      setSaving(false)
      return
    }

    navigate('/admin/properties')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-estate-200 border-t-gold-500" />
          <p className="text-sm text-estate-400">{t('admin.properties.loadingProperty')}</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Back Link */}
      <Link
        to="/admin/properties"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-estate-500 transition-colors hover:text-estate-700"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        {t('admin.properties.backToProperties')}
      </Link>

      {/* Title */}
      <h1 className="mb-6 font-heading text-2xl font-bold text-estate-900">
        {isEdit ? t('admin.properties.editProperty') : t('admin.properties.addProperty')}
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
          <h2 className="mb-4 font-heading text-lg font-semibold text-estate-900">{t('admin.propertyForm.basicInfo')}</h2>
          <div className="space-y-6">
            {/* Property Name - All Languages */}
            <MultilingualInput
              label={t('admin.propertyForm.propertyName')}
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder={t('admin.propertyForm.propertyNamePlaceholder')}
              help={t('admin.propertyForm.propertyNameHelp')}
            />

            {/* Slug */}
            <AdminFormField
              label={t('admin.propertyForm.slug')}
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              disabled
              placeholder={t('admin.propertyForm.slugPlaceholder')}
              help={t('admin.propertyForm.slugHelp')}
            />

            {/* Type */}
            <div className="grid gap-5 sm:grid-cols-2">
              <AdminFormField
                label={t('admin.propertyForm.type')}
                name="type"
                type="select"
                value={formData.type}
                onChange={handleChange}
                options={getTypeOptions(t)}
              />
              <div></div>
            </div>

            {/* Type Label - All Languages */}
            <MultilingualInput
              label={t('admin.propertyForm.typeLabel')}
              name="type_label"
              value={formData.type_label}
              onChange={handleChange}
              placeholder={t('admin.propertyForm.typeLabelPlaceholder')}
              help={t('admin.propertyForm.typeLabelHelp')}
            />

            {/* Location - All Languages */}
            <MultilingualInput
              label={t('admin.propertyForm.location')}
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder={t('admin.propertyForm.locationPlaceholder')}
              help={t('admin.propertyForm.locationHelp')}
            />

            {/* Other fields */}
            <div className="grid gap-5 sm:grid-cols-2">
              <AdminFormField
                label={t('admin.propertyForm.price')}
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder={t('admin.propertyForm.pricePlaceholder')}
              />
              <AdminFormField
                label={t('admin.propertyForm.beds')}
                name="beds"
                value={formData.beds}
                onChange={handleChange}
                placeholder={t('admin.propertyForm.bedsPlaceholder')}
              />
              <AdminFormField
                label={t('admin.propertyForm.sqft')}
                name="sqft"
                value={formData.sqft}
                onChange={handleChange}
                placeholder={t('admin.propertyForm.sqftPlaceholder')}
              />
              <AdminFormField
                label={t('admin.propertyForm.developer')}
                name="developer"
                value={formData.developer}
                onChange={handleChange}
                placeholder={t('admin.propertyForm.developerPlaceholder')}
              />
              <AdminFormField
                label={t('admin.propertyForm.year')}
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder={t('admin.propertyForm.yearPlaceholder')}
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-estate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-heading text-lg font-semibold text-estate-900">{t('admin.propertyForm.media')}</h2>
          <div className="space-y-5">
            <ImageUpload
              label={t('admin.propertyForm.image')}
              name="image"
              value={formData.image}
              onChange={handleChange}
              folder="properties"
            />
            <ImageUpload
              label={t('admin.propertyForm.gallery')}
              name="gallery"
              value={formData.gallery}
              onChange={handleChange}
              folder="properties"
              multiple
              help={t('admin.propertyForm.galleryHelp')}
            />
          </div>
        </div>

        <div className="rounded-xl border border-estate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-heading text-lg font-semibold text-estate-900">{t('admin.propertyForm.details')}</h2>
          <div className="space-y-5">
            <AdminFormField
              label={t('admin.propertyForm.description')}
              name="description"
              type="textarea"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              placeholder={t('admin.propertyForm.descriptionPlaceholder')}
            />
            <AdminFormField
              label={t('admin.propertyForm.amenities')}
              name="amenities"
              type="textarea"
              value={formData.amenities}
              onChange={handleChange}
              rows={4}
              placeholder={t('admin.propertyForm.amenitiesPlaceholder')}
              help={t('admin.propertyForm.amenitiesHelp')}
            />
          </div>
        </div>

        <div className="rounded-xl border border-estate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-heading text-lg font-semibold text-estate-900">{t('admin.propertyForm.settings')}</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <AdminFormField
              label={t('admin.propertyForm.sortOrder')}
              name="sort_order"
              type="number"
              value={formData.sort_order}
              onChange={handleChange}
              placeholder={t('admin.propertyForm.sortOrderPlaceholder')}
              help={t('admin.propertyForm.sortOrderHelp')}
            />
            <div className="flex items-end">
              <AdminFormField
                label={t('admin.propertyForm.featured')}
                name="featured"
                type="checkbox"
                value={formData.featured}
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
                {isEdit ? t('admin.propertyForm.updateProperty') : t('admin.propertyForm.createProperty')}
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/properties')}
            className="rounded-lg border border-estate-200 bg-white px-6 py-2.5 text-sm font-medium text-estate-700 transition-colors hover:bg-estate-50"
          >
            {t('admin.propertyForm.cancel')}
          </button>
        </div>
      </form>
    </div>
  )
}
