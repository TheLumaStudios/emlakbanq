import { cn } from '../../utils/cn'

export default function Logo({ variant = 'dark', className, size = 'md' }) {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10',
    xl: 'h-12',
    '2xl': 'h-16',
    '3xl': 'h-20'
  }

  return (
    <img
      src="/logo.png"
      alt="EmlakBanq"
      className={cn(sizeClasses[size], 'w-auto', className)}
    />
  )
}
