export default function FormSectionHeader({ icon, title, subtitle }) {
  return (
    <div className="mb-5 flex items-center gap-3 border-l-2 border-blue-500 pl-3">
      {icon && (
        <div className="shrink-0 rounded-lg bg-blue-50 p-2 text-blue-600">
          {icon}
        </div>
      )}
      <div>
        <h2 className="font-heading text-lg font-semibold text-estate-900">{title}</h2>
        {subtitle && <p className="mt-0.5 text-xs text-estate-400">{subtitle}</p>}
      </div>
    </div>
  )
}
