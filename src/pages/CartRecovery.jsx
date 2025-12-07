import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { 
  ShoppingCart, 
  Settings2,
  Mail,
  TrendingUp,
  AlertCircle,
  Play,
  Pause,
  RefreshCw
} from 'lucide-react'
import { api } from '@/api/client'
import { toast } from 'sonner'

import PageHeader from '@/components/ui/PageHeader'
import StatsCard from '@/components/ui/StatsCard'
import DataTable from '@/components/ui/DataTable'
import StatusBadge from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'
import { Label } from '@/components/ui/Label'
import { Switch } from '@/components/ui/Switch'
import { Slider } from '@/components/ui/Slider'

export default function CartRecovery() {
  const queryClient = useQueryClient()

  const { data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: () => api.getSettings()
  })

  const { data: emails = [] } = useQuery({
    queryKey: ['recovery-emails'],
    queryFn: () => api.getCartRecoveryEmails()
  })

  const [isEnabled, setIsEnabled] = useState(settings?.cart_recovery_enabled || false)
  const [delay, setDelay] = useState([settings?.cart_recovery_delay || 60])

  const saveMutation = useMutation({
    mutationFn: async (data) => {
      return api.updateCartRecoverySettings(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] })
      toast.success('Configurações salvas!')
    }
  })

  const handleSave = () => {
    saveMutation.mutate({
      cart_recovery_enabled: isEnabled,
      cart_recovery_delay: delay[0]
    })
  }

  const recoveredEmails = emails.filter(e => e.status === 'clicked')
  const conversionRate = emails.length > 0 ? ((recoveredEmails.length / emails.length) * 100).toFixed(1) : 0

  const columns = [
    {
      header: 'Cliente',
      accessor: 'customer_name',
      render: (row) => (
        <div>
          <p className="text-sm font-medium text-slate-900">{row.customer_name || 'N/A'}</p>
          <p className="text-xs text-slate-400">{row.customer_email}</p>
        </div>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status} />
    },
    {
      header: 'Enviado em',
      accessor: 'created_date',
      render: (row) => (
        <span className="text-sm text-slate-500">
          {format(new Date(row.created_date), "dd/MM/yyyy HH:mm", { locale: ptBR })}
        </span>
      )
    },
    {
      header: 'Aberto em',
      accessor: 'opened_at',
      render: (row) => (
        <span className="text-sm text-slate-500">
          {row.opened_at ? format(new Date(row.opened_at), "dd/MM/yyyy HH:mm", { locale: ptBR }) : '-'}
        </span>
      )
    },
    {
      header: 'Clicado em',
      accessor: 'clicked_at',
      render: (row) => (
        <span className="text-sm text-slate-500">
          {row.clicked_at ? format(new Date(row.clicked_at), "dd/MM/yyyy HH:mm", { locale: ptBR }) : '-'}
        </span>
      )
    }
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Recuperação de Carrinho"
        description="Configure e monitore a recuperação automática de carrinhos abandonados"
        icon={ShoppingCart}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="E-mails Enviados"
          value={emails.length}
          icon={Mail}
          color="blue"
          delay={0}
        />
        <StatsCard
          title="Taxa de Abertura"
          value={`${emails.length > 0 ? ((emails.filter(e => e.status === 'opened' || e.status === 'clicked').length / emails.length) * 100).toFixed(1) : 0}%`}
          icon={TrendingUp}
          color="green"
          delay={0.1}
        />
        <StatsCard
          title="Taxa de Conversão"
          value={`${conversionRate}%`}
          icon={ShoppingCart}
          color="violet"
          delay={0.2}
        />
        <StatsCard
          title="Carrinhos Recuperados"
          value={recoveredEmails.length}
          icon={RefreshCw}
          color="rose"
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-slate-100 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-emerald-50">
              <Settings2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">Configurações</h3>
              <p className="text-sm text-slate-400">Ajuste o comportamento</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Enable/Disable */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
              <div className="flex items-center gap-3">
                {isEnabled ? (
                  <div className="p-2 rounded-lg bg-emerald-100">
                    <Play className="w-4 h-4 text-emerald-600" />
                  </div>
                ) : (
                  <div className="p-2 rounded-lg bg-slate-200">
                    <Pause className="w-4 h-4 text-slate-500" />
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    {isEnabled ? 'Ativo' : 'Desativado'}
                  </p>
                  <p className="text-xs text-slate-400">
                    {isEnabled ? 'Enviando e-mails automaticamente' : 'Nenhum e-mail será enviado'}
                  </p>
                </div>
              </div>
              <Switch
                checked={isEnabled}
                onCheckedChange={setIsEnabled}
              />
            </div>

            {/* Delay */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <Label className="text-sm text-slate-700">Tempo de espera</Label>
                <span className="text-sm font-medium text-blue-600">{delay[0]} min</span>
              </div>
              <Slider
                value={delay}
                onValueChange={setDelay}
                max={180}
                min={15}
                step={15}
                className="w-full"
              />
              <p className="text-xs text-slate-400 mt-2">
                Tempo após abandono do carrinho antes de enviar o e-mail
              </p>
            </div>

            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={handleSave}
              disabled={saveMutation.isPending}
            >
              {saveMutation.isPending ? 'Salvando...' : 'Salvar Configurações'}
            </Button>
          </div>
        </motion.div>

        {/* Logs Table */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-slate-900">Histórico de Envios</h3>
            </div>
            <DataTable
              columns={columns}
              data={emails}
              emptyMessage="Nenhum e-mail de recuperação enviado"
            />
          </motion.div>
        </div>
      </div>

      {/* Info Banner */}
      {!isEnabled && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-50 border border-amber-100 rounded-2xl p-6"
        >
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-amber-100">
              <AlertCircle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-amber-900">Recuperação desativada</h3>
              <p className="text-sm text-amber-700 mt-1">
                Ative a recuperação de carrinho para começar a enviar e-mails automaticamente quando um cliente abandonar o carrinho.
              </p>
              <Button 
                size="sm" 
                className="mt-3 bg-amber-600 hover:bg-amber-700"
                onClick={() => setIsEnabled(true)}
              >
                <Play className="w-4 h-4 mr-2" />
                Ativar Agora
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

