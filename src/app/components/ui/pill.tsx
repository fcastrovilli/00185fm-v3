import { cn } from '@/app/lib/utils'

const Pill = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium outline outline-1 outline-[var(--theme-border-color)]',
        className,
      )}
    >
      {children}
    </span>
  )
}

export { Pill }
