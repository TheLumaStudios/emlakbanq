import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function SkeletonRow({ columns }) {
  return (
    <tr className="animate-pulse">
      {columns.map((col) => (
        <td key={col.key} className="px-4 py-3">
          <div className="h-4 w-3/4 rounded bg-estate-100" />
        </td>
      ))}
      <td className="px-4 py-3">
        <div className="flex items-center justify-end gap-2">
          <div className="h-7 w-14 rounded-lg bg-estate-100" />
          <div className="h-7 w-14 rounded-lg bg-estate-100" />
        </div>
      </td>
    </tr>
  )
}

function MobileCard({ columns, row, onEdit, onDelete, editPath, t }) {
  return (
    <div className="rounded-xl border border-estate-200 bg-white p-4 shadow-sm">
      <div className="space-y-2.5">
        {columns.map((col) => (
          <div key={col.key} className="flex items-start justify-between gap-4">
            <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-estate-400">
              {col.label}
            </span>
            <span className="text-right text-sm text-estate-700">
              {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '-')}
            </span>
          </div>
        ))}
      </div>
      {(onEdit || onDelete || editPath) && (
        <div className="mt-3 flex gap-2 border-t border-estate-100 pt-3">
          {editPath && (
            <Link
              to={editPath.replace(':id', row.id)}
              className="flex-1 rounded-lg bg-estate-50 px-3 py-2 text-center text-xs font-medium text-estate-700 transition-colors hover:bg-estate-100"
            >
              {t('admin.common.edit')}
            </Link>
          )}
          {onEdit && (
            <button
              onClick={() => onEdit(row)}
              className="flex-1 rounded-lg bg-estate-50 px-3 py-2 text-xs font-medium text-estate-700 transition-colors hover:bg-estate-100"
            >
              {t('admin.common.edit')}
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(row)}
              className="flex-1 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600 transition-colors hover:bg-red-100"
            >
              {t('admin.common.delete')}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

function SortIcon({ direction }) {
  if (!direction) {
    return (
      <svg className="ml-1 inline h-3.5 w-3.5 text-estate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
      </svg>
    )
  }
  return direction === 'asc' ? (
    <svg className="ml-1 inline h-3.5 w-3.5 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
    </svg>
  ) : (
    <svg className="ml-1 inline h-3.5 w-3.5 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  )
}

function Pagination({ page, totalPages, totalItems, pageSize, onPageChange, t }) {
  if (totalPages <= 1) return null

  const from = (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, totalItems)

  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5
    let start = Math.max(1, page - Math.floor(maxVisible / 2))
    let end = Math.min(totalPages, start + maxVisible - 1)
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1)
    }
    for (let i = start; i <= end; i++) pages.push(i)
    return pages
  }

  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-estate-100 px-4 py-3 sm:flex-row">
      <p className="text-xs text-estate-400">
        {from}–{to} / {totalItems}
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="rounded-md p-1.5 text-estate-400 transition-colors hover:bg-estate-100 hover:text-estate-700 disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        {getPageNumbers().map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`min-w-[32px] rounded-md px-2 py-1 text-xs font-medium transition-colors ${
              p === page
                ? 'bg-gold-500 text-white shadow-sm'
                : 'text-estate-500 hover:bg-estate-100 hover:text-estate-700'
            }`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="rounded-md p-1.5 text-estate-400 transition-colors hover:bg-estate-100 hover:text-estate-700 disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default function AdminTable({
  columns,
  data,
  onEdit,
  onDelete,
  editPath,
  loading,
  emptyMessage,
  pageSize = 10,
  sortKey: externalSortKey,
  sortDirection: externalSortDir,
  onSort: externalOnSort,
}) {
  const { t } = useTranslation()
  const [page, setPage] = useState(1)
  const [internalSortKey, setInternalSortKey] = useState(null)
  const [internalSortDir, setInternalSortDir] = useState(null)

  const sortKey = externalSortKey !== undefined ? externalSortKey : internalSortKey
  const sortDirection = externalSortDir !== undefined ? externalSortDir : internalSortDir

  const handleSort = (key) => {
    if (externalOnSort) {
      externalOnSort(key)
      return
    }
    if (internalSortKey === key) {
      if (internalSortDir === 'asc') setInternalSortDir('desc')
      else if (internalSortDir === 'desc') {
        setInternalSortKey(null)
        setInternalSortDir(null)
      }
    } else {
      setInternalSortKey(key)
      setInternalSortDir('asc')
    }
    setPage(1)
  }

  const sortedData = useMemo(() => {
    if (!data || !sortKey || !sortDirection) return data || []
    return [...data].sort((a, b) => {
      let aVal = a[sortKey]
      let bVal = b[sortKey]
      // Handle JSONB / objects — extract .en or first value
      if (aVal && typeof aVal === 'object') aVal = aVal.en || Object.values(aVal)[0] || ''
      if (bVal && typeof bVal === 'object') bVal = bVal.en || Object.values(bVal)[0] || ''
      // Null handling
      if (aVal == null) return 1
      if (bVal == null) return -1
      // Numeric comparison
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal
      }
      // String comparison
      const cmp = String(aVal).localeCompare(String(bVal), undefined, { sensitivity: 'base' })
      return sortDirection === 'asc' ? cmp : -cmp
    })
  }, [data, sortKey, sortDirection])

  const totalItems = sortedData.length
  const totalPages = Math.ceil(totalItems / pageSize)
  const currentPage = Math.min(page, totalPages || 1)
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  // Reset page when data changes
  const dataLength = data?.length || 0
  if (page > 1 && page > Math.ceil(dataLength / pageSize)) {
    // schedule a state update rather than calling during render
    setTimeout(() => setPage(1), 0)
  }

  if (loading) {
    return (
      <div className="overflow-hidden rounded-xl border border-estate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-estate-100 bg-estate-50">
              {columns.map((col) => (
                <th key={col.key} className="whitespace-nowrap px-4 py-3 font-semibold text-estate-600">
                  {col.label}
                </th>
              ))}
              <th className="px-4 py-3 text-right font-semibold text-estate-600">{t('admin.common.actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-estate-100">
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonRow key={i} columns={columns} />
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-estate-200 bg-white py-20">
        <svg className="mb-3 h-12 w-12 text-estate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-2.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <p className="text-sm text-estate-400">{emptyMessage || t('admin.common.noResults')}</p>
      </div>
    )
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-xl border border-estate-200 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-estate-100 bg-estate-50">
                {columns.map((col) => (
                  <th key={col.key} className="whitespace-nowrap px-4 py-3 font-semibold text-estate-600">
                    {col.sortable ? (
                      <button
                        onClick={() => handleSort(col.key)}
                        className="inline-flex items-center gap-0.5 transition-colors hover:text-gold-600"
                      >
                        {col.label}
                        <SortIcon direction={sortKey === col.key ? sortDirection : null} />
                      </button>
                    ) : (
                      col.label
                    )}
                  </th>
                ))}
                {(onEdit || onDelete || editPath) && (
                  <th className="px-4 py-3 text-right font-semibold text-estate-600">{t('admin.common.actions')}</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-estate-100">
              {paginatedData.map((row, i) => (
                <tr key={row.id || i} className="transition-colors hover:bg-yellow-50">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-estate-700">
                      {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '-')}
                    </td>
                  ))}
                  {(onEdit || onDelete || editPath) && (
                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {editPath && (
                          <Link
                            to={editPath.replace(':id', row.id)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-estate-200 bg-white px-3 py-1.5 text-xs font-medium text-estate-600 transition-colors hover:bg-estate-50 hover:text-estate-900"
                          >
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                            {t('admin.common.edit')}
                          </Link>
                        )}
                        {onEdit && (
                          <button
                            onClick={() => onEdit(row)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-estate-200 bg-white px-3 py-1.5 text-xs font-medium text-estate-600 transition-colors hover:bg-estate-50 hover:text-estate-900"
                          >
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                            {t('admin.common.edit')}
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(row)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
                          >
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                            {t('admin.common.delete')}
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={setPage}
          t={t}
        />
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {paginatedData.map((row, i) => (
          <MobileCard
            key={row.id || i}
            columns={columns}
            row={row}
            onEdit={onEdit}
            onDelete={onDelete}
            editPath={editPath}
            t={t}
          />
        ))}
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={setPage}
          t={t}
        />
      </div>
    </>
  )
}
