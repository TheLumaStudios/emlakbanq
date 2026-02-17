import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { uploadToStorage } from '../../utils/supabase'

export default function ImageUpload({
  value,
  onChange,
  name,
  label,
  folder = 'uploads',
  multiple = false,
  maxSizeMB = 5,
  required = false,
  help,
}) {
  const { t } = useTranslation()
  const fileRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState(null)

  const handleFiles = async (files) => {
    if (!files || files.length === 0) return
    setError(null)
    setUploading(true)

    try {
      if (multiple) {
        const urls = value ? value.split('\n').filter(Boolean) : []
        for (const file of files) {
          if (!file.type.startsWith('image/')) {
            setError(t('admin.common.invalidFormat'))
            continue
          }
          if (file.size > maxSizeMB * 1024 * 1024) {
            setError(t('admin.common.fileTooLarge'))
            continue
          }
          const url = await uploadToStorage(file, folder)
          urls.push(url)
        }
        onChange(name, urls.join('\n'))
      } else {
        const file = files[0]
        if (!file.type.startsWith('image/')) {
          setError(t('admin.common.invalidFormat'))
          setUploading(false)
          return
        }
        if (file.size > maxSizeMB * 1024 * 1024) {
          setError(t('admin.common.fileTooLarge'))
          setUploading(false)
          return
        }
        const url = await uploadToStorage(file, folder)
        onChange(name, url)
      }
    } catch (err) {
      console.error('Upload error:', err)
      setError(err.message || 'Upload failed')
    }
    setUploading(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleFiles(e.dataTransfer.files)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }

  const removeImage = (urlToRemove) => {
    if (multiple) {
      const urls = value.split('\n').filter((u) => u && u !== urlToRemove)
      onChange(name, urls.join('\n'))
    } else {
      onChange(name, '')
    }
  }

  const images = multiple ? (value || '').split('\n').filter(Boolean) : value ? [value] : []

  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-estate-700">
          {label}
          {required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
      )}

      {/* Drop zone */}
      <div
        onClick={() => fileRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={() => setDragOver(false)}
        className={`cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-colors ${
          dragOver
            ? 'border-gold-500 bg-gold-50/30'
            : 'border-estate-300 bg-estate-50 hover:border-gold-500 hover:bg-gold-50/20'
        }`}
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-estate-300 border-t-gold-500" />
            <span className="text-sm text-estate-500">{t('admin.common.uploading')}</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <svg className="h-8 w-8 text-estate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
            </svg>
            <span className="text-sm font-medium text-estate-600">{t('admin.common.dragDrop')}</span>
            <span className="text-xs text-estate-400">Max {maxSizeMB}MB</span>
          </div>
        )}
      </div>

      {/* URL input fallback */}
      <div className="mt-2 flex items-center gap-2">
        <span className="text-xs text-estate-400">{t('admin.common.orEnterUrl')}</span>
        <input
          type="text"
          value={multiple ? '' : (value || '')}
          onChange={(e) => {
            if (multiple) {
              if (e.target.value) {
                const urls = value ? value.split('\n').filter(Boolean) : []
                urls.push(e.target.value)
                onChange(name, urls.join('\n'))
              }
            } else {
              onChange(name, e.target.value)
            }
          }}
          placeholder="https://..."
          className="flex-1 rounded-lg border border-estate-200 bg-white px-3 py-1.5 text-sm text-estate-800 placeholder-estate-400 transition-colors focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
        />
      </div>

      {/* Error */}
      {error && (
        <p className="mt-1.5 text-xs text-red-600">{error}</p>
      )}

      {/* Help text */}
      {help && (
        <p className="mt-1 text-xs text-estate-400">{help}</p>
      )}

      {/* Preview */}
      {images.length > 0 && (
        <div className={`mt-3 ${multiple ? 'grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6' : ''}`}>
          {images.map((url, i) => (
            <div key={i} className={`group relative overflow-hidden rounded-lg border border-estate-200 ${multiple ? 'aspect-square' : 'h-40 w-60'}`}>
              <img src={url} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  removeImage(url)
                }}
                className="absolute right-1 top-1 rounded-full bg-red-500 p-0.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
