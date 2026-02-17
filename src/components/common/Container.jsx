import { cn } from '../../utils/cn'

export default function Container({ children, className, as: Tag = 'div' }) {
  return (
    <Tag className={cn('mx-auto w-full max-w-[1400px] px-6', className)}>
      {children}
    </Tag>
  )
}
