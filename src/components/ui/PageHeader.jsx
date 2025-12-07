import React from 'react'

export default function PageHeader({ title, description, icon: Icon, actions }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        {Icon && (
          <div className="p-3 rounded-xl bg-blue-50">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          {description && (
            <p className="text-sm text-slate-500 mt-1">{description}</p>
          )}
        </div>
      </div>
      {actions && <div>{actions}</div>}
    </div>
  )
}

