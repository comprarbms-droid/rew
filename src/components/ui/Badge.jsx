import React from 'react'
import { cn } from '@/lib/utils'

const Badge = React.forwardRef(({ className, variant = 'default', ...props }, ref) => {
  const variants = {
    default: 'bg-slate-100 text-slate-700',
    secondary: 'bg-slate-200 text-slate-900',
    success: 'bg-emerald-50 text-emerald-600',
    warning: 'bg-amber-50 text-amber-600',
    error: 'bg-rose-50 text-rose-600',
    outline: 'border border-slate-200 text-slate-700',
  }

  return (
    <div
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-lg px-2.5 py-0.5 text-xs font-medium',
        variants[variant],
        className
      )}
      {...props}
    />
  )
})

Badge.displayName = 'Badge'

export { Badge }

