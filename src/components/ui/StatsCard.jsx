import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const colorClasses = {
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-emerald-50 text-emerald-600',
  violet: 'bg-violet-50 text-violet-600',
  rose: 'bg-rose-50 text-rose-600',
  amber: 'bg-amber-50 text-amber-600',
}

export default function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  color = 'blue', 
  trend, 
  trendValue, 
  delay = 0 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white rounded-2xl border border-slate-100 p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={cn('p-3 rounded-xl', colorClasses[color])}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <div className={cn(
            'flex items-center gap-1 text-xs font-medium',
            trend === 'up' ? 'text-emerald-600' : 'text-rose-600'
          )}>
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-900 mb-1">{value}</p>
        <p className="text-sm text-slate-500">{title}</p>
      </div>
    </motion.div>
  )
}

