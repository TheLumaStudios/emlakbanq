import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function ImageWithLoader({
  src,
  alt = '',
  className = '',
  wrapperClassName = '',
  aspectRatio = '16/9',
  objectFit = 'cover',
  priority = false,
  onLoad,
  ...props
}) {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = (e) => {
    setIsLoading(false)
    if (onLoad) onLoad(e)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  const wrapperStyle = aspectRatio && aspectRatio !== 'auto' ? { aspectRatio } : {}

  return (
    <div className={`relative h-full w-full ${wrapperClassName}`} style={wrapperStyle}>
      {/* Loading Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-estate-100 via-estate-200 to-estate-100 bg-[length:200%_100%]" />
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-estate-100">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-estate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
            <p className="mt-2 text-xs text-estate-500">{t('components.imageWithLoader.errorMessage')}</p>
          </div>
        </div>
      )}

      {/* Actual Image */}
      {src && (
        <img
          src={src}
          alt={alt}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          } ${className}`}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          {...props}
        />
      )}
    </div>
  )
}
