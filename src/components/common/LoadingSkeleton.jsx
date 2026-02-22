export default function LoadingSkeleton({ variant = 'card', count = 3, columns = 3 }) {
  const gridClass =
    columns === 4
      ? 'grid gap-8 sm:grid-cols-2 lg:grid-cols-4'
      : columns === 2
        ? 'grid gap-8 md:grid-cols-2'
        : 'grid gap-8 sm:grid-cols-2 lg:grid-cols-3'

  if (variant === 'page') {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="flex flex-col items-center gap-4">
          <img
            src="/logo.png"
            alt="Loading..."
            className="h-16 w-auto animate-pulse"
          />
          <div className="flex gap-1">
            <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500" style={{ animationDelay: '0ms' }} />
            <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500" style={{ animationDelay: '150ms' }} />
            <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'detail') {
    return (
      <div className="animate-pulse">
        <div className="h-80 bg-estate-100" />
        <div className="mx-auto max-w-4xl px-6 py-12">
          <div className="h-8 w-3/4 rounded bg-estate-100" />
          <div className="mt-4 h-5 w-1/2 rounded bg-estate-100" />
          <div className="mt-8 space-y-3">
            <div className="h-4 rounded bg-estate-100" />
            <div className="h-4 rounded bg-estate-100" />
            <div className="h-4 w-5/6 rounded bg-estate-100" />
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'table') {
    return (
      <div className="animate-pulse space-y-3">
        <div className="h-10 rounded-t-xl bg-estate-200" />
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="h-14 rounded bg-estate-50" />
        ))}
      </div>
    )
  }

  // card variant (default)
  return (
    <div className={gridClass}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="h-56 bg-estate-100" />
          <div className="space-y-3 p-6">
            <div className="h-5 w-3/4 rounded bg-estate-100" />
            <div className="h-4 w-1/2 rounded bg-estate-100" />
            <div className="h-4 w-2/3 rounded bg-estate-100" />
          </div>
        </div>
      ))}
    </div>
  )
}
