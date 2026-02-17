import { useTranslation } from 'react-i18next'

export default function AdminFormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
  disabled = false,
  placeholder = '',
  options = [],
  rows = 4,
  help,
}) {
  const { t } = useTranslation()
  const id = `field-${name}`

  const baseInputClasses =
    `w-full rounded-lg border border-estate-200 px-4 py-2.5 text-sm text-estate-800 placeholder-estate-400 transition-colors focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20 ${disabled ? 'bg-estate-50 text-estate-500 cursor-not-allowed' : 'bg-white'}`

  const handleChange = (e) => {
    const val = type === 'checkbox' ? e.target.checked : e.target.value
    onChange(name, val)
  }

  return (
    <div className={type === 'checkbox' ? 'flex items-center gap-3' : ''}>
      {type === 'checkbox' ? (
        <>
          <input
            id={id}
            name={name}
            type="checkbox"
            checked={!!value}
            onChange={handleChange}
            className="h-4 w-4 rounded border-estate-300 text-gold-500 focus:ring-gold-500"
          />
          <label htmlFor={id} className="text-sm font-medium text-estate-700">
            {label}
          </label>
        </>
      ) : (
        <>
          <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-estate-700">
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>

          {type === 'textarea' ? (
            <textarea
              id={id}
              name={name}
              value={value || ''}
              onChange={handleChange}
              required={required}
              disabled={disabled}
              placeholder={placeholder}
              rows={rows}
              className={baseInputClasses + ' resize-y'}
            />
          ) : type === 'select' ? (
            <select
              id={id}
              name={name}
              value={value || ''}
              onChange={handleChange}
              required={required}
              disabled={disabled}
              className={baseInputClasses}
            >
              <option value="">{t('components.adminFormField.selectPlaceholder')}</option>
              {options.map((opt) => (
                <option key={typeof opt === 'string' ? opt : opt.value} value={typeof opt === 'string' ? opt : opt.value}>
                  {typeof opt === 'string' ? opt : opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={id}
              name={name}
              type={type}
              value={value || ''}
              onChange={handleChange}
              required={required}
              disabled={disabled}
              placeholder={placeholder}
              className={baseInputClasses}
            />
          )}

          {help && <p className="mt-1 text-xs text-estate-400">{help}</p>}
        </>
      )}
    </div>
  )
}
