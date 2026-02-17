import { useTranslation } from 'react-i18next'

export default function ErrorMessage({ onRetry }) {
  const { t } = useTranslation()

  return (
    <div className="py-20 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
        <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
      </div>
      <p className="mt-4 text-lg font-medium text-estate-900">
        {t('common.error', 'Something went wrong')}
      </p>
      <p className="mt-2 text-sm text-estate-500">
        {t('common.errorDescription', 'Please try again later.')}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 rounded-full bg-estate-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-estate-800"
        >
          {t('common.retry', 'Try Again')}
        </button>
      )}
    </div>
  )
}
