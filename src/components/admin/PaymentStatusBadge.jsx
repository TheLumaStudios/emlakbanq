import { useTranslation } from 'react-i18next'

export default function PaymentStatusBadge({ status }) {
  const { t } = useTranslation()

  const statusConfig = {
    pending: {
      label: t('admin.payments.status.pending', 'Beklemede'),
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-700',
    },
    paid: {
      label: t('admin.payments.status.paid', 'Ödendi'),
      bgColor: 'bg-green-100',
      textColor: 'text-green-700',
    },
    overdue: {
      label: t('admin.payments.status.overdue', 'Gecikmiş'),
      bgColor: 'bg-red-100',
      textColor: 'text-red-700',
    },
    partial: {
      label: t('admin.payments.status.partial', 'Kısmi'),
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-700',
    },
    waived: {
      label: t('admin.payments.status.waived', 'Vazgeçildi'),
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-700',
    },
  }

  const config = statusConfig[status] || statusConfig.pending

  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${config.bgColor} ${config.textColor}`}
    >
      {config.label}
    </span>
  )
}
