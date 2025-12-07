import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Mail,
  Shield,
  LogOut,
  Moon,
  Sun,
  Bell,
  Key,
  Calendar
} from 'lucide-react'

import PageHeader from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function Account() {
  const [user, setUser] = useState({ full_name: 'Admin', email: 'admin@example.com', created_date: new Date() })
  const [theme, setTheme] = useState('light')

  const handleLogout = () => {
    localStorage.removeItem('api_key')
    window.location.href = '/login'
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Minha Conta"
        description="Gerencie suas informações e preferências"
        icon={User}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6"
        >
          <div className="flex items-start gap-6 mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-lg">
              {user?.full_name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-xl font-bold text-slate-900">{user?.full_name || 'Usuário'}</h2>
                <Badge className="bg-blue-50 text-blue-600 border-0">
                  {user?.role === 'admin' ? 'Administrador' : 'Usuário'}
                </Badge>
              </div>
              <p className="text-slate-400">{user?.email}</p>
              {user?.created_date && (
                <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Membro desde {format(new Date(user.created_date), "MMMM 'de' yyyy", { locale: ptBR })}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-500 uppercase tracking-wider">Nome Completo</label>
                <Input
                  value={user?.full_name || ''}
                  readOnly
                  className="mt-1.5 bg-slate-50"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 uppercase tracking-wider">E-mail</label>
                <Input
                  value={user?.email || ''}
                  readOnly
                  className="mt-1.5 bg-slate-50"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          {/* Theme Toggle */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {theme === 'dark' ? (
                  <div className="p-2 rounded-lg bg-slate-800">
                    <Moon className="w-5 h-5 text-slate-100" />
                  </div>
                ) : (
                  <div className="p-2 rounded-lg bg-amber-50">
                    <Sun className="w-5 h-5 text-amber-600" />
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-slate-900">Tema</p>
                  <p className="text-xs text-slate-400">{theme === 'dark' ? 'Escuro' : 'Claro'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <Button 
            variant="outline" 
            className="w-full justify-start gap-3 h-auto p-5 border-rose-100 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200"
            onClick={handleLogout}
          >
            <div className="p-2 rounded-lg bg-rose-50">
              <LogOut className="w-5 h-5 text-rose-600" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium">Sair da Conta</p>
              <p className="text-xs text-slate-400">Encerrar sessão atual</p>
            </div>
          </Button>
        </motion.div>
      </div>

      {/* Security Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl border border-slate-100 p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-emerald-50">
            <Shield className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900">Segurança</h3>
            <p className="text-sm text-slate-400">Gerenciar configurações de segurança</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50">
            <div className="flex items-center gap-3 mb-2">
              <Key className="w-5 h-5 text-slate-400" />
              <span className="text-sm font-medium text-slate-700">Senha</span>
            </div>
            <p className="text-xs text-slate-400 mb-3">Última alteração há 30 dias</p>
            <Button variant="outline" size="sm" className="w-full">
              Alterar Senha
            </Button>
          </div>

          <div className="p-4 rounded-xl bg-slate-50">
            <div className="flex items-center gap-3 mb-2">
              <Mail className="w-5 h-5 text-slate-400" />
              <span className="text-sm font-medium text-slate-700">E-mail Verificado</span>
            </div>
            <p className="text-xs text-slate-400 mb-3">{user?.email}</p>
            <Badge className="bg-emerald-50 text-emerald-600 border-0">Verificado</Badge>
          </div>

          <div className="p-4 rounded-xl bg-slate-50">
            <div className="flex items-center gap-3 mb-2">
              <Bell className="w-5 h-5 text-slate-400" />
              <span className="text-sm font-medium text-slate-700">Notificações</span>
            </div>
            <p className="text-xs text-slate-400 mb-3">Alertas por e-mail ativos</p>
            <Badge className="bg-blue-50 text-blue-600 border-0">Ativo</Badge>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

