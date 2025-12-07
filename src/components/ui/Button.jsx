import React from 'react'
import { cn } from '@/lib/utils'

const Button = React.forwardRef(({ 
  className, variant = 'default', 
  size = 'default', 
  children, 
  ...props 
}, ref) => {
  const variants = {
    default: 'bg-blue-600 hover:bg-blue-700 text-white',
    outline: 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-900',
    ghost: 'hover:bg-slate-100 text-slate-700',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-900',
  }

  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-8 px-3 text-sm',
    lg: 'h-12 px-6 text-base',
    icon: 'h-10 w-10',
  }

  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
        'disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export { Button }

