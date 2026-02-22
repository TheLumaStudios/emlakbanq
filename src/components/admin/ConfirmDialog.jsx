import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  cancelLabel,
  variant = 'danger',
  onConfirm,
  onCancel,
  loading = false,
}) {
  const { t } = useTranslation()
  const dialogRef = useRef(null)

  const defaultTitle = title || t('components.confirmDialog.title')
  const defaultMessage = message || t('components.confirmDialog.message')
  const defaultConfirmLabel = confirmLabel || t('components.confirmDialog.confirm')
  const defaultCancelLabel = cancelLabel || t('components.confirmDialog.cancel')

  useEffect(() => {
    if (open) {
      dialogRef.current?.focus()
    }
  }, [open])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && open && !loading) {
        onCancel()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onCancel, loading])

  if (!open) return null

  const confirmColors =
    variant === 'danger'
      ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
      : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-estate-900/60 backdrop-blur-sm"
        onClick={loading ? undefined : onCancel}
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-2xl"
      >
        <div className="flex items-start gap-4">
          {variant === 'danger' && (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50">
              <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-estate-900">{defaultTitle}</h3>
            <p className="mt-2 text-sm text-estate-500">{defaultMessage}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border border-estate-200 px-4 py-2 text-sm font-medium text-estate-700 transition-colors hover:bg-estate-50 focus:outline-none focus:ring-2 focus:ring-estate-300 disabled:opacity-50"
          >
            {defaultCancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 ${confirmColors}`}
          >
            {loading && (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            )}
            {defaultConfirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
