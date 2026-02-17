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

export default function AdminTable({ columns, data, onEdit, onDelete, editPath, loading, emptyMessage }) {
  const { t } = useTranslation()

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
                    {col.label}
                  </th>
                ))}
                {(onEdit || onDelete || editPath) && (
                  <th className="px-4 py-3 text-right font-semibold text-estate-600">{t('admin.common.actions')}</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-estate-100">
              {data.map((row, i) => (
                <tr key={row.id || i} className="transition-colors hover:bg-cream-50">
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
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {data.map((row, i) => (
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
      </div>
    </>
  )
}
