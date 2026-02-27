import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { supabase } from '../../utils/supabase'
import AdminFormField from '../../components/admin/AdminFormField'
import MultilingualInput from '../../components/admin/MultilingualInput'
import FormSectionHeader from '../../components/admin/FormSectionHeader'
import ConfirmDialog from '../../components/admin/ConfirmDialog'
import { useToast } from '../../hooks/useToast'
import { useUnsavedChanges } from '../../hooks/useUnsavedChanges'

const INITIAL_STATE = {
  full_name: '',
  email: '',
  phone: '',
  id_number: '',
  current_address: {},
  profession: '',
  employer: '',
  monthly_income: '',
  tenant_references: '[]',
  notes: {},
  status: 'active',
}

export default function TenantForm() {
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const isEdit = Boolean(id)

  const [formData, setFormData] = useState(INITIAL_STATE)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [references, setReferences] = useState([])

  const { isDirty, markClean, blocker } = useUnsavedChanges(formData, INITIAL_STATE)

  useEffect(() => {
    if (isEdit) {
      fetchTenant()
    }
  }, [id])

  const fetchTenant = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('tenants').select('*').eq('id', id).single()

    if (error) {
      console.error('Error fetching tenant:', error)
      setError(t('admin.tenants.notFound', 'Kiracı bulunamadı'))
    } else if (data) {
      const loaded = {
        full_name: data.full_name || '',
        email: data.email || '',
        phone: data.phone || '',
        id_number: data.id_number || '',
        current_address: data.current_address || {},
        profession: data.profession || '',
        employer: data.employer || '',
        monthly_income: data.monthly_income != null ? String(data.monthly_income) : '',
        tenant_references: '[]',
        notes: data.notes || {},
        status: data.status || 'active',
      }
      setFormData(loaded)
      setReferences(data.tenant_references || [])
      markClean(loaded)
    }
    setLoading(false)
  }

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const addReference = () => {
    setReferences([...references, { name: '', phone: '', relation: '' }])
  }

  const removeReference = (index) => {
    setReferences(references.filter((_, i) => i !== index))
  }

  const updateReference = (index, field, value) => {
    const updated = [...references]
    updated[index][field] = value
    setReferences(updated)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const payload = {
      full_name: formData.full_name,
      email: formData.email || null,
      phone: formData.phone,
      id_number: formData.id_number || null,
      current_address: formData.current_address,
      profession: formData.profession || null,
      employer: formData.employer || null,
      monthly_income: formData.monthly_income ? parseFloat(formData.monthly_income) : null,
      tenant_references: references.filter(r => r.name || r.phone || r.relation),
      notes: formData.notes,
      status: formData.status,
    }

    let result
    if (isEdit) {
      result = await supabase.from('tenants').update(payload).eq('id', id)
    } else {
      result = await supabase.from('tenants').insert(payload)
    }

    if (result.error) {
      console.error('Error saving tenant:', result.error)
      setError(result.error.message || t('admin.tenants.failedToSave', 'Kiracı kaydedilemedi'))
      setSaving(false)
      return
    }

    toast.success(t('admin.common.savedSuccessfully', 'Başarıyla kaydedildi'))
    markClean()
    setSaving(false)
    navigate('/admin/tenants')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-estate-200 border-t-blue-500" />
          <p className="text-sm text-estate-400">{t('admin.tenants.loadingTenant', 'Kiracı yükleniyor...')}</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Back Link */}
      <Link
        to="/admin/tenants"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-estate-500 transition-colors hover:text-estate-700"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        {t('admin.tenants.backToTenants', 'Kiracılara Dön')}
      </Link>

      {/* Title */}
      <h1 className="mb-6 font-heading text-2xl font-bold text-estate-900">
        {isEdit ? t('admin.tenants.editTenant', 'Kiracı Düzenle') : t('admin.tenants.addTenant', 'Yeni Kiracı')}
      </h1>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="rounded-xl border border-estate-200 bg-white p-6 shadow-sm">
          <FormSectionHeader
            icon={
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            }
            title={t('admin.tenantForm.basicInfo', 'Temel Bilgiler')}
          />
          <div className="space-y-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <AdminFormField
                label={t('admin.tenantForm.fullName', 'Ad Soyad')}
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                placeholder={t('admin.tenantForm.fullNamePlaceholder', 'Örn: Ahmet Yılmaz')}
              />
              <AdminFormField
                label={t('admin.tenantForm.phone', 'Telefon')}
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder={t('admin.tenantForm.phonePlaceholder', 'Örn: +90 555 123 45 67')}
              />
              <AdminFormField
                label={t('admin.tenantForm.email', 'E-posta')}
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('admin.tenantForm.emailPlaceholder', 'Örn: ahmet@example.com')}
              />
              <AdminFormField
                label={t('admin.tenantForm.idNumber', 'Kimlik No')}
                name="id_number"
                value={formData.id_number}
                onChange={handleChange}
                placeholder={t('admin.tenantForm.idNumberPlaceholder', 'TC Kimlik veya Pasaport No')}
              />
            </div>

            <MultilingualInput
              label={t('admin.tenantForm.currentAddress', 'Adres')}
              name="current_address"
              type="textarea"
              value={formData.current_address}
              onChange={handleChange}
              rows={3}
              placeholder={t('admin.tenantForm.currentAddressPlaceholder', 'Güncel adres bilgisi')}
            />

            <AdminFormField
              label={t('admin.tenantForm.status', 'Durum')}
              name="status"
              type="select"
              value={formData.status}
              onChange={handleChange}
              options={[
                { value: 'active', label: t('admin.tenants.active', 'Aktif') },
                { value: 'inactive', label: t('admin.tenants.inactive', 'Pasif') },
                { value: 'blacklisted', label: t('admin.tenants.blacklisted', 'Kara Liste') },
              ]}
            />
          </div>
        </div>

        {/* Professional Information */}
        <div className="rounded-xl border border-estate-200 bg-white p-6 shadow-sm">
          <FormSectionHeader
            icon={
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
              </svg>
            }
            title={t('admin.tenantForm.professionalInfo', 'Meslek Bilgileri')}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <AdminFormField
              label={t('admin.tenantForm.profession', 'Meslek')}
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              placeholder={t('admin.tenantForm.professionPlaceholder', 'Örn: Mühendis')}
            />
            <AdminFormField
              label={t('admin.tenantForm.employer', 'İşveren')}
              name="employer"
              value={formData.employer}
              onChange={handleChange}
              placeholder={t('admin.tenantForm.employerPlaceholder', 'Şirket adı')}
            />
            <AdminFormField
              label={t('admin.tenantForm.monthlyIncome', 'Aylık Gelir')}
              name="monthly_income"
              type="number"
              value={formData.monthly_income}
              onChange={handleChange}
              placeholder={t('admin.tenantForm.monthlyIncomePlaceholder', 'Örn: 50000')}
            />
          </div>
        </div>

        {/* References */}
        <div className="rounded-xl border border-estate-200 bg-white p-6 shadow-sm">
          <FormSectionHeader
            icon={
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            }
            title={t('admin.tenantForm.references', 'Referanslar')}
          />

          <div className="space-y-4">
            {references.map((reference, index) => (
              <div key={index} className="rounded-lg border border-estate-200 bg-estate-50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-estate-700">
                    {t('admin.tenantForm.referenceNumber', 'Referans')} #{index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeReference(index)}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-estate-700">
                      {t('admin.tenantForm.referenceName', 'Ad Soyad')}
                    </label>
                    <input
                      type="text"
                      value={reference.name}
                      onChange={(e) => updateReference(index, 'name', e.target.value)}
                      className="w-full rounded-lg border border-estate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder={t('admin.tenantForm.referenceNamePlaceholder', 'Örn: Ali Veli')}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-estate-700">
                      {t('admin.tenantForm.referencePhone', 'Telefon')}
                    </label>
                    <input
                      type="text"
                      value={reference.phone}
                      onChange={(e) => updateReference(index, 'phone', e.target.value)}
                      className="w-full rounded-lg border border-estate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder={t('admin.tenantForm.referencePhonePlaceholder', '+90 555 111 22 33')}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-estate-700">
                      {t('admin.tenantForm.referenceRelation', 'İlişki')}
                    </label>
                    <input
                      type="text"
                      value={reference.relation}
                      onChange={(e) => updateReference(index, 'relation', e.target.value)}
                      className="w-full rounded-lg border border-estate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder={t('admin.tenantForm.referenceRelationPlaceholder', 'Örn: İşveren')}
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addReference}
              className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-estate-300 bg-white px-4 py-3 text-sm font-medium text-estate-600 transition-colors hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              {t('admin.tenantForm.addReference', 'Referans Ekle')}
            </button>
          </div>
        </div>

        {/* Notes */}
        <div className="rounded-xl border border-estate-200 bg-white p-6 shadow-sm">
          <FormSectionHeader
            icon={
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            }
            title={t('admin.tenantForm.notes', 'Notlar')}
          />
          <MultilingualInput
            label={t('admin.tenantForm.notesLabel', 'Kiracı Notları')}
            name="notes"
            type="textarea"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            placeholder={t('admin.tenantForm.notesPlaceholder', 'Kiracı hakkında notlar')}
          />
        </div>

        {/* Sticky Actions Bar */}
        <div className="sticky bottom-0 z-10 -mx-6 mt-6 border-t border-estate-200 bg-white/95 px-6 py-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-600 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  {t('admin.common.saving', 'Kaydediliyor...')}
                </>
              ) : (
                <>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {isEdit ? t('admin.tenantForm.updateTenant', 'Kiracıyı Güncelle') : t('admin.tenantForm.createTenant', 'Kiracı Oluştur')}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/tenants')}
              className="rounded-lg border border-estate-200 bg-white px-6 py-2.5 text-sm font-medium text-estate-700 transition-colors hover:bg-estate-50"
            >
              {t('admin.common.cancel', 'İptal')}
            </button>
            {isDirty && (
              <span className="flex items-center gap-1.5 text-xs text-amber-600">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                {t('admin.common.unsavedChanges', 'Kaydedilmemiş değişiklikler')}
              </span>
            )}
          </div>
        </div>
      </form>

      {/* Unsaved Changes Confirmation Dialog */}
      <ConfirmDialog
        open={blocker.state === 'blocked'}
        title={t('admin.common.unsavedChangesTitle', 'Kaydedilmemiş Değişiklikler')}
        message={t('admin.common.unsavedChangesMessage', 'Sayfadan ayrılırsanız değişiklikler kaybolacak.')}
        confirmLabel={t('admin.common.discardChanges', 'Değişiklikleri At')}
        cancelLabel={t('admin.common.keepEditing', 'Düzenlemeye Devam Et')}
        variant="danger"
        onConfirm={() => blocker.proceed()}
        onCancel={() => blocker.reset()}
      />
    </div>
  )
}
