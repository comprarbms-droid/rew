import React, { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { 
  Settings as SettingsIcon, 
  Mail,
  Globe,
  Bell,
  Shield,
  Save,
  Check,
  AlertCircle
} from 'lucide-react'
import { api } from '@/api/client'
import { toast } from 'sonner'

import PageHeader from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Switch } from '@/components/ui/Switch'

export default function Settings() {
  const queryClient = useQueryClient()

  const { data: settings, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: () => api.getSettings()
  })

  const [formData, setFormData] = useState({
    sender_name: '',
    sender_email: '',
    verified_domain: '',
    notifications_enabled: true,
    notify_on_error: true,
    notify_email: ''
  })

  useEffect(() => {
    if (settings) {
      setFormData({
        sender_name: settings.sender_name || '',
        sender_email: settings.sender_email || '',
        verified_domain: settings.verified_domain || '',
        notifications_enabled: settings.notifications_enabled ?? true,
        notify_on_error: settings.notify_on_error ?? true,
        notify_email: settings.notify_email || ''
      })
    }
  }, [settings])

  const saveMutation = useMutation({
    mutationFn: async (data) => {
      return api.updateSettings(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] })
      toast.success('Configurações salvas com sucesso!')
    }
  })

  const handleSave = () => {
    saveMutation.mutate(formData)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Configurações Gerais"
        description="Configure as preferências do seu sistema de e-mails"
        icon={SettingsIcon}
        actions={
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
            onClick={handleSave}
            disabled={saveMutation.isPending}
          >
            <Save className="w-4 h-4" />
            {saveMutation.isPending ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sender Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-slate-100 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-blue-50">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">Remetente</h3>
              <p className="text-sm text-slate-400">Configurações do remetente dos e-mails</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-xs text-slate-500 uppercase tracking-wider">Nome do Remetente</Label>
              <Input
                value={formData.sender_name}
                onChange={(e) => setFormData({ ...formData, sender_name: e.target.value })}
                placeholder="Minha Loja"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label className="text-xs text-slate-500 uppercase tracking-wider">E-mail do Remetente</Label>
              <Input
                type="email"
                value={formData.sender_email}
                onChange={(e) => setFormData({ ...formData, sender_email: e.target.value })}
                placeholder="contato@minhaloja.com"
                className="mt-1.5"
              />
            </div>
          </div>
        </motion.div>

        {/* Domain Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-slate-100 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-emerald-50">
              <Globe className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">Domínio</h3>
              <p className="text-sm text-slate-400">Verificação do domínio de envio</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-xs text-slate-500 uppercase tracking-wider">Domínio Verificado</Label>
              <Input
                value={formData.verified_domain}
                onChange={(e) => setFormData({ ...formData, verified_domain: e.target.value })}
                placeholder="minhaloja.com"
                className="mt-1.5"
              />
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-900">Verificação pendente</p>
                  <p className="text-sm text-amber-700 mt-1">
                    Configure os registros DNS para verificar seu domínio e melhorar a entregabilidade.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-slate-100 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-violet-50">
              <Bell className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">Notificações</h3>
              <p className="text-sm text-slate-400">Alertas e notificações do sistema</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
              <div>
                <p className="text-sm font-medium text-slate-700">Notificações ativas</p>
                <p className="text-xs text-slate-400">Receber alertas sobre o sistema</p>
              </div>
              <Switch
                checked={formData.notifications_enabled}
                onCheckedChange={(checked) => setFormData({ ...formData, notifications_enabled: checked })}
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
              <div>
                <p className="text-sm font-medium text-slate-700">Alertar em erros</p>
                <p className="text-xs text-slate-400">Notificar quando um e-mail falhar</p>
              </div>
              <Switch
                checked={formData.notify_on_error}
                onCheckedChange={(checked) => setFormData({ ...formData, notify_on_error: checked })}
              />
            </div>

            <div>
              <Label className="text-xs text-slate-500 uppercase tracking-wider">E-mail para notificações</Label>
              <Input
                type="email"
                value={formData.notify_email}
                onChange={(e) => setFormData({ ...formData, notify_email: e.target.value })}
                placeholder="admin@minhaloja.com"
                className="mt-1.5"
              />
            </div>
          </div>
        </motion.div>

        {/* Security Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-slate-100 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-rose-50">
              <Shield className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">Segurança</h3>
              <p className="text-sm text-slate-400">Configurações de segurança</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-emerald-900">SSL/TLS Ativo</p>
                <p className="text-xs text-emerald-700">Todas as comunicações são criptografadas</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-emerald-900">DKIM Configurado</p>
                <p className="text-xs text-emerald-700">Autenticação de e-mails ativa</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-slate-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700">SPF Pendente</p>
                <p className="text-xs text-slate-500">Configure o registro SPF no seu DNS</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

