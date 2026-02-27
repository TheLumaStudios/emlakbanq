import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { supabase } from '../../utils/supabase'
import { useTenants } from '../../hooks/useTenants'
import { useProperties } from '../../hooks/useProperties'
import { useRentalContracts } from '../../hooks/useRentalContracts'
import AdminFormField from '../../components/admin/AdminFormField'
import MultilingualInput from '../../components/admin/MultilingualInput'
import FormSectionHeader from '../../components/admin/FormSectionHeader'
import ConfirmDialog from '../../components/admin/ConfirmDialog'
import { useToast } from '../../hooks/useToast'
import { useUnsavedChanges } from '../../hooks/useUnsavedChanges'

const INITIAL_STATE = {
  tenant_id: '',
  property_id: '',
  start_date: '',
  end_date: '',
  monthly_rent: '',
  deposit_amount: '',
  currency: 'TRY',
  payment_day: '1',
  payment_method: '',
  terms: {},
  status: 'active',
}

export default function RentalContractForm() {
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const isEdit = Boolean(id)

  const [formData, setFormData] = useState(INITIAL_STATE)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const { isDirty, markClean, blocker } = useUnsavedChanges(formData, INITIAL_STATE)
  const { tenants } = useTenants({ status: 'active' })
  const { data: properties } = useProperties()
  const { generatePayments } = useRentalContracts()

  useEffect(() => {
    if (isEdit) {
      fetchContract()
    }
  }, [id])

  const fetchContract = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('rental_contracts')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching contract:', error)
      setError(t('admin.contracts.notFound', 'Sözleşme bulunamadı'))
    } else if (data) {
      const loaded = {
        tenant_id: data.tenant_id || '',
        property_id: data.property_id || '',
        start_date: data.start_date || '',
        end_date: data.end_date || '',
        monthly_rent: data.monthly_rent != null ? String(data.monthly_rent) : '',
        deposit_amount: data.deposit_amount != null ? String(data.deposit_amount) : '',
        currency: data.currency || 'TRY',
        payment_day: data.payment_day != null ? String(data.payment_day) : '1',
        payment_method: data.payment_method || '',
        terms: data.terms || {},
        status: data.status || 'active',
      }
      setFormData(loaded)
      markClean(loaded)
    }
    setLoading(false)
  }

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    // Validate dates
    if (formData.start_date && formData.end_date) {
      const startDate = new Date(formData.start_date)
      const endDate = new Date(formData.end_date)
      if (endDate <= startDate) {
        setError(t('admin.contracts.invalidDates', 'Bitiş tarihi başlangıç tarihinden sonra olmalı'))
        setSaving(false)
        return
      }
    }

    const payload = {
      tenant_id: formData.tenant_id,
      property_id: formData.property_id,
      start_date: formData.start_date,
      end_date: formData.end_date,
      monthly_rent: formData.monthly_rent ? parseFloat(formData.monthly_rent) : 0,
      deposit_amount: formData.deposit_amount ? parseFloat(formData.deposit_amount) : 0,
      currency: formData.currency,
      payment_day: formData.payment_day ? parseInt(formData.payment_day, 10) : 1,
      payment_method: formData.payment_method || null,
      terms: formData.terms,
      status: formData.status,
    }

    let result
    if (isEdit) {
      result = await supabase.from('rental_contracts').update(payload).eq('id', id).select().single()
    } else {
      result = await supabase.from('rental_contracts').insert(payload).select().single()
    }

    if (result.error) {
      console.error('Error saving contract:', result.error)
      setError(result.error.message || t('admin.contracts.failedToSave', 'Sözleşme kaydedilemedi'))
      setSaving(false)
      return
    }

    // Generate payments for new contracts (only if not editing)
    if (!isEdit && result.data) {
      const { error: paymentError } = await generatePayments(
        result.data.id,
        formData.start_date,
        formData.end_date,
        parseFloat(formData.monthly_rent),
        parseInt(formData.payment_day, 10),
        formData.currency
      )

      if (paymentError) {
        console.error('Error generating payments:', paymentError)
        toast.error(t('admin.contracts.paymentGenerationError', 'Ödemeler oluşturulamadı'))
      } else {
        toast.success(t('admin.contracts.paymentGenerationSuccess', 'Sözleşme ve ödemeler oluşturuldu'))
      }
    } else {
      toast.success(t('admin.common.savedSuccessfully', 'Başarıyla kaydedildi'))
    }

    markClean()
    setSaving(false)
    navigate('/admin/contracts')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-estate-200 border-t-blue-500" />
          <p className="text-sm text-estate-400">{t('admin.contracts.loadingContract', 'Sözleşme yükleniyor...')}</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Back Link */}
      <Link
        to="/admin/contracts"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-estate-500 transition-colors hover:text-estate-700"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        {t('admin.contracts.backToContracts', 'Sözleşmelere Dön')}
      </Link>

      {/* Title */}
      <h1 className="mb-6 font-heading text-2xl font-bold text-estate-900">
        {isEdit ? t('admin.contracts.editContract', 'Sözleşme Düzenle') : t('admin.contracts.addContract', 'Yeni Sözleşme')}
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            }
            title={t('admin.contractForm.basicInfo', 'Temel Bilgiler')}
          />
          <div className="space-y-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <AdminFormField
                label={t('admin.contractForm.tenant', 'Kiracı')}
                name="tenant_id"
                type="select"
                value={formData.tenant_id}
                onChange={handleChange}
                required
                options={[
                  { value: '', label: t('admin.contractForm.selectTenant', 'Kiracı Seçin') },
                  ...tenants.map((t) => ({ value: t.id, label: `${t.full_name} (${t.phone})` })),
                ]}
              />
              <AdminFormField
                label={t('admin.contractForm.property', 'Mülk')}
                name="property_id"
                type="select"
                value={formData.property_id}
                onChange={handleChange}
                required
                options={[
                  { value: '', label: t('admin.contractForm.selectProperty', 'Mülk Seçin') },
                  ...(properties || []).map((p) => ({ value: p.id, label: `${p.name} - ${p.location}` })),
                ]}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <AdminFormField
                label={t('admin.contractForm.startDate', 'Başlangıç Tarihi')}
                name="start_date"
                type="date"
                value={formData.start_date}
                onChange={handleChange}
                required
              />
              <AdminFormField
                label={t('admin.contractForm.endDate', 'Bitiş Tarihi')}
                name="end_date"
                type="date"
                value={formData.end_date}
                onChange={handleChange}
                required
              />
            </div>

            <AdminFormField
              label={t('admin.contractForm.status', 'Durum')}
              name="status"
              type="select"
              value={formData.status}
              onChange={handleChange}
              options={[
                { value: 'draft', label: t('admin.contracts.draft', 'Taslak') },
                { value: 'active', label: t('admin.contracts.active', 'Aktif') },
                { value: 'expired', label: t('admin.contracts.expired', 'Süresi Dolmuş') },
                { value: 'terminated', label: t('admin.contracts.terminated', 'Feshedilmiş') },
              ]}
            />
          </div>
        </div>

        {/* Financial Details */}
        <div className="rounded-xl border border-estate-200 bg-white p-6 shadow-sm">
          <FormSectionHeader
            icon={
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            title={t('admin.contractForm.financialDetails', 'Finansal Detaylar')}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <AdminFormField
              label={t('admin.contractForm.monthlyRent', 'Aylık Kira')}
              name="monthly_rent"
              type="number"
              value={formData.monthly_rent}
              onChange={handleChange}
              required
              placeholder="50000"
            />
            <AdminFormField
              label={t('admin.contractForm.depositAmount', 'Depozito Tutarı')}
              name="deposit_amount"
              type="number"
              value={formData.deposit_amount}
              onChange={handleChange}
              placeholder="100000"
            />
            <AdminFormField
              label={t('admin.contractForm.currency', 'Para Birimi')}
              name="currency"
              type="select"
              value={formData.currency}
              onChange={handleChange}
              options={[
                { value: 'TRY', label: 'TRY - Türk Lirası' },
                { value: 'USD', label: 'USD - Amerikan Doları' },
                { value: 'EUR', label: 'EUR - Euro' },
                { value: 'GBP', label: 'GBP - İngiliz Sterlini' },
              ]}
            />
            <AdminFormField
              label={t('admin.contractForm.paymentDay', 'Ödeme Günü (1-28)')}
              name="payment_day"
              type="number"
              value={formData.payment_day}
              onChange={handleChange}
              required
              min="1"
              max="28"
              help={t('admin.contractForm.paymentDayHelp', 'Her ayın hangi gününde kira ödenecek (1-28 arası)')}
            />
          </div>
          <div className="mt-5">
            <AdminFormField
              label={t('admin.contractForm.paymentMethod', 'Ödeme Yöntemi')}
              name="payment_method"
              type="select"
              value={formData.payment_method}
              onChange={handleChange}
              options={[
                { value: '', label: t('admin.contractForm.selectPaymentMethod', 'Seçiniz') },
                { value: 'bank_transfer', label: t('admin.contractForm.bankTransfer', 'Banka Transferi') },
                { value: 'cash', label: t('admin.contractForm.cash', 'Nakit') },
                { value: 'check', label: t('admin.contractForm.check', 'Çek') },
              ]}
            />
          </div>
        </div>

        {/* Terms */}
        <div className="rounded-xl border border-estate-200 bg-white p-6 shadow-sm">
          <FormSectionHeader
            icon={
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            }
            title={t('admin.contractForm.terms', 'Özel Şartlar')}
          />
          <MultilingualInput
            label={t('admin.contractForm.termsLabel', 'Sözleşme Özel Şartları')}
            name="terms"
            type="textarea"
            value={formData.terms}
            onChange={handleChange}
            rows={5}
            placeholder={t('admin.contractForm.termsPlaceholder', 'Sözleşmeye özel şartlar ve notlar')}
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
                  {isEdit
                    ? t('admin.contractForm.updateContract', 'Sözleşmeyi Güncelle')
                    : t('admin.contractForm.createContract', 'Sözleşme Oluştur')}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/contracts')}
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
