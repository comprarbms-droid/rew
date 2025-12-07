import React from 'react'
import { cn } from '@/lib/utils'

const Slider = React.forwardRef(({ className, value, onValueChange, min = 0, max = 100, step = 1, ...props }, ref) => {
  const handleChange = (e) => {
    const newValue = parseInt(e.target.value)
    onValueChange?.([newValue])
  }

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value?.[0] || min}
      onChange={handleChange}
      className={cn(
        'w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer',
        'accent-blue-600',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Slider.displayName = 'Slider'

export { Slider }

