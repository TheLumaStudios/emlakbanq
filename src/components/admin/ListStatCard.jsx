const COLOR_CLASSES = {
  gold: 'bg-gold-50 text-gold-600',
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-green-50 text-green-600',
  purple: 'bg-purple-50 text-purple-600',
  red: 'bg-red-50 text-red-600',
  estate: 'bg-estate-100 text-estate-600',
}

export default function ListStatCard({ label, value, icon, color = 'gold' }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-estate-200 bg-white px-4 py-3 shadow-sm">
      {icon && (
        <div className={`shrink-0 rounded-lg p-2 ${COLOR_CLASSES[color] || COLOR_CLASSES.gold}`}>
          {icon}
        </div>
      )}
      <div className="min-w-0">
        <p className="text-xs font-medium text-estate-400">{label}</p>
        <p className="text-lg font-bold text-estate-900">{value}</p>
      </div>
    </div>
  )
}
