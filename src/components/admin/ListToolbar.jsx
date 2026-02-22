import { useTranslation } from 'react-i18next'

export default function ListToolbar({
  search,
  onSearchChange,
  filters = [],
  pageSize,
  onPageSizeChange,
  children,
}) {
  const { t } = useTranslation()

  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-estate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t('admin.common.search') + '...'}
            className="w-full rounded-lg border border-estate-200 bg-white py-2 pl-10 pr-4 text-sm text-estate-800 placeholder-estate-400 transition-colors focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
          />
        </div>

        {/* Filters */}
        {filters.map((filter) => (
          <select
            key={filter.key}
            value={filter.value}
            onChange={(e) => filter.onChange(e.target.value)}
            className="rounded-lg border border-estate-200 bg-white px-3 py-2 text-sm text-estate-700 transition-colors focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
          >
            {filter.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ))}

        {children}
      </div>

      {/* Items per page */}
      {onPageSizeChange && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-estate-400">{t('admin.common.show')}</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="rounded-lg border border-estate-200 bg-white px-2 py-1.5 text-xs text-estate-700 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
      )}
    </div>
  )
}
