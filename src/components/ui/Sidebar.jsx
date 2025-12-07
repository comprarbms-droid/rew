import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Mail, 
  FileText, 
  Zap, 
  Webhook, 
  ShoppingCart, 
  MessageCircle,
  Settings, 
  FileWarning,
  User,
  LogOut,
  Moon,
  Sun
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './Button'

const menuItems = [
  { path: '/', name: 'Dashboard', icon: LayoutDashboard },
  { path: '/emails', name: 'E-mails Enviados', icon: Mail },
  { path: '/templates', name: 'Templates', icon: FileText },
  { path: '/brevo', name: 'Conexão Brevo', icon: Zap },
  { path: '/sales', name: 'Sistema de Vendas', icon: Webhook },
  { path: '/cart-recovery', name: 'Recuperação de Carrinho', icon: ShoppingCart },
  { path: '/whatsapp-recovery', name: 'Recuperação WhatsApp', icon: MessageCircle },
  { path: '/settings', name: 'Configurações', icon: Settings },
  { path: '/logs', name: 'Logs', icon: FileWarning },
  { path: '/account', name: 'Minha Conta', icon: User },
]

export default function Sidebar({ onLogout, theme, onToggleTheme }) {
  const location = useLocation()

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-100 flex flex-col z-30">
      {/* Logo */}
      <div className="p-6 border-b border-slate-100">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Remarketing
        </h1>
        <p className="text-xs text-slate-400 mt-1">Dashboard</p>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path
          const Icon = item.icon

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              )}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-100 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={onToggleTheme}
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-4 h-4" />
              Tema Claro
            </>
          ) : (
            <>
              <Moon className="w-4 h-4" />
              Tema Escuro
            </>
          )}
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-rose-600 hover:text-rose-700 hover:bg-rose-50"
          onClick={onLogout}
        >
          <LogOut className="w-4 h-4" />
          Sair
        </Button>
      </div>
    </div>
  )
}

