import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { 
  MessageCircle, 
  Send,
  Settings2,
  Phone,
  Key,
  Clock,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Play,
  Pause,
  Save
} from 'lucide-react'
import { api } from '@/api/client'
import { toast } from 'sonner'

import PageHeader from '@/components/ui/PageHeader'
import StatsCard from '@/components/ui/StatsCard'
import DataTable from '@/components/ui/DataTable'
import StatusBadge from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Switch } from '@/components/ui/Switch'
import { Slider } from '@/components/ui/Slider'
import { Textarea } from '@/components/ui/Textarea'

export default function WhatsAppRecovery() {
  const queryClient = useQueryClient()
  const [testPhone, setTestPhone] = useState('')
  const [showTestDialog, setShowTestDialog] = useState(false)

  const { data: config } = useQuery({
    queryKey: ['whatsapp-config'],
    queryFn: () => api.getWhatsAppConfig()
  })

  const { data: messages = [] } = useQuery({
    queryKey: ['whatsapp-messages'],
    queryFn: () => api.getWhatsAppMessages()
  })

  const [formData, setFormData] = useState({
    enabled: false,
    phone_number: '',
    api_token: '',
    delay_minutes: 120,
    message_template: 'Olá {{nome}}! Você esqueceu itens no seu carrinho no valor de {{valor}}. Acesse: {{link_carrinho}}',
    include_cart_link: true,
    max_attempts: 1
  })

  React.useEffect(() => {
    if (config) {
      setFormData({
        enabled: config.enabled || false,
        phone_number: config.phone_number || '',
        api_token: config.api_token || '',
        delay_minutes: config.delay_minutes || 120,
        message_template: config.message_template || formData.message_template,
        include_cart_link: config.include_cart_link !== false,
        max_attempts: config.max_attempts || 1
      })
    }
  }, [config])

  const saveMutation = useMutation({
    mutationFn: async (data) => {
      return api.updateWhatsAppConfig(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['whatsapp-config'] })
      toast.success('Configurações salvas!')
    }
  })

  const handleSave = () => {
    saveMutation.mutate(formData)
  }

  const deliveredMessages = messages.filter(m => m.status === 'delivered' || m.status === 'read' || m.status === 'replied')
  const readMessages = messages.filter(m => m.status === 'read' || m.status === 'replied')
  const repliedMessages = messages.filter(m => m.status === 'replied')

  const deliveryRate = messages.length > 0 ? ((deliveredMessages.length / messages.length) * 100).toFixed(1) : 0
  const readRate = messages.length > 0 ? ((readMessages.length / messages.length) * 100).toFixed(1) : 0
  const replyRate = messages.length > 0 ? ((repliedMessages.length / messages.length) * 100).toFixed(1) : 0

  const columns = [
    {
      header: 'Cliente',
      accessor: 'customer_name',
      render: (row) => (
        <div>
          <p className="text-sm font-medium text-slate-900">{row.customer_name || 'N/A'}</p>
          <p className="text-xs text-slate-400">{row.customer_phone}</p>
        </div>
      )
    },
    {
      header: 'Valor',
      accessor: 'cart_value',
      render: (row) => (
        <span className="text-sm font-medium text-slate-900">
          R$ {row.cart_value?.toFixed(2) || '0.00'}
        </span>
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
      header: 'Lido em',
      accessor: 'read_at',
      render: (row) => (
        <span className="text-sm text-slate-500">
          {row.read_at ? format(new Date(row.read_at), "dd/MM/yyyy HH:mm", { locale: ptBR }) : '-'}
        </span>
      )
    },
    {
      header: 'Tentativa',
      accessor: 'attempt_number',
      render: (row) => (
        <span className="text-sm text-slate-500">#{row.attempt_number || 1}</span>
      )
    }
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Recuperação WhatsApp"
        description="Configure e monitore a recuperação de carrinho via WhatsApp"
        icon={MessageCircle}
        actions={
          <Button 
            className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
            onClick={() => setShowTestDialog(true)}
          >
            <Send className="w-4 h-4" />
            Enviar Teste
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Mensagens Enviadas"
          value={messages.length}
          icon={MessageCircle}
          color="blue"
          delay={0}
        />
        <StatsCard
          title="Taxa de Entrega"
          value={`${deliveryRate}%`}
          icon={CheckCircle2}
          color="green"
          delay={0.1}
        />
        <StatsCard
          title="Taxa de Leitura"
          value={`${readRate}%`}
          icon={TrendingUp}
          color="violet"
          delay={0.2}
        />
        <StatsCard
          title="Taxa de Resposta"
          value={`${replyRate}%`}
          icon={MessageCircle}
          color="rose"
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Card */}
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
                <h3 className="text-base font-semibold text-slate-900">Status</h3>
                <p className="text-sm text-slate-400">Ativar/desativar recuperação WhatsApp</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
              <div className="flex items-center gap-3">
                {formData.enabled ? (
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
                    {formData.enabled ? 'Ativo' : 'Desativado'}
                  </p>
                  <p className="text-xs text-slate-400">
                    {formData.enabled ? 'Enviando mensagens automaticamente' : 'Nenhuma mensagem será enviada'}
                  </p>
                </div>
              </div>
              <Switch
                checked={formData.enabled}
                onCheckedChange={(checked) => setFormData({ ...formData, enabled: checked })}
              />
            </div>
          </motion.div>

          {/* Connection Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-slate-100 p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-blue-50">
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">Conexão</h3>
                <p className="text-sm text-slate-400">Configurações da API WhatsApp</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-xs text-slate-500 uppercase tracking-wider">Número WhatsApp Business</Label>
                <Input
                  value={formData.phone_number}
                  onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                  placeholder="5511999999999"
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label className="text-xs text-slate-500 uppercase tracking-wider">API Token</Label>
                <Input
                  type="password"
                  value={formData.api_token}
                  onChange={(e) => setFormData({ ...formData, api_token: e.target.value })}
                  placeholder="seu_token_aqui"
                  className="mt-1.5 font-mono"
                />
              </div>
            </div>
          </motion.div>

          {/* Timing Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-slate-100 p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-violet-50">
                <Clock className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">Timing</h3>
                <p className="text-sm text-slate-400">Configurações de tempo e tentativas</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-sm text-slate-700">Delay (minutos)</Label>
                  <span className="text-sm font-medium text-blue-600">{formData.delay_minutes} min</span>
                </div>
                <Slider
                  value={[formData.delay_minutes]}
                  onValueChange={(value) => setFormData({ ...formData, delay_minutes: value[0] })}
                  max={480}
                  min={30}
                  step={30}
                  className="w-full"
                />
              </div>

              <div>
                <Label className="text-xs text-slate-500 uppercase tracking-wider">Tentativas Máximas</Label>
                <Input
                  type="number"
                  value={formData.max_attempts}
                  onChange={(e) => setFormData({ ...formData, max_attempts: parseInt(e.target.value) || 1 })}
                  className="mt-1.5"
                  min="1"
                  max="3"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
                <div>
                  <p className="text-sm font-medium text-slate-700">Incluir link do carrinho</p>
                  <p className="text-xs text-slate-400">Adiciona link para retomar compra</p>
                </div>
                <Switch
                  checked={formData.include_cart_link}
                  onCheckedChange={(checked) => setFormData({ ...formData, include_cart_link: checked })}
                />
              </div>
            </div>
          </motion.div>

          {/* Message Template Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl border border-slate-100 p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-amber-50">
                <MessageCircle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">Template de Mensagem</h3>
                <p className="text-sm text-slate-400">Personalize a mensagem enviada</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-xs text-slate-500 uppercase tracking-wider">Mensagem</Label>
                <Textarea
                  value={formData.message_template}
                  onChange={(e) => setFormData({ ...formData, message_template: e.target.value })}
                  className="mt-1.5 h-32"
                  placeholder="Olá {{nome}}! Você esqueceu itens no seu carrinho..."
                />
              </div>

              <div className="p-3 rounded-lg bg-amber-50 border border-amber-100">
                <p className="text-xs font-medium text-amber-800 mb-1">Variáveis disponíveis:</p>
                <div className="flex flex-wrap gap-1.5">
                  {['{{nome}}', '{{valor}}', '{{link_carrinho}}', '{{produtos}}'].map(v => (
                    <code key={v} className="px-2 py-0.5 rounded bg-amber-100 text-amber-700 text-xs">
                      {v}
                    </code>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Pré-visualização</p>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-slate-700 whitespace-pre-wrap">
                    {formData.message_template
                      .replace('{{nome}}', 'João Silva')
                      .replace('{{valor}}', 'R$ 299,90')
                      .replace('{{link_carrinho}}', 'https://loja.com/carrinho/abc123')
                      .replace('{{produtos}}', '2 produtos')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={handleSave}
            disabled={saveMutation.isPending}
          >
            <Save className="w-4 h-4 mr-2" />
            {saveMutation.isPending ? 'Salvando...' : 'Salvar Configurações'}
          </Button>
        </div>

        {/* Messages Table */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-slate-900">Histórico de Mensagens</h3>
            </div>
            <DataTable
              columns={columns}
              data={messages}
              emptyMessage="Nenhuma mensagem enviada"
            />
          </motion.div>
        </div>
      </div>

      {/* Test Dialog */}
      {showTestDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-emerald-50">
                <Send className="w-5 h-5 text-emerald-600" />
              </div>
              <h2 className="text-lg font-semibold">Enviar Mensagem de Teste</h2>
              <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setShowTestDialog(false)}>
                <AlertCircle className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-xs text-slate-500 uppercase tracking-wider">Número de telefone</Label>
                <Input
                  value={testPhone}
                  onChange={(e) => setTestPhone(e.target.value)}
                  className="mt-1.5"
                  placeholder="5511999999999"
                />
              </div>

              <Button 
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                onClick={async () => {
                  if (testPhone) {
                    try {
                      await api.sendTestWhatsApp(testPhone, formData.message_template)
                      toast.success('Mensagem de teste enviada!')
                      setShowTestDialog(false)
                      setTestPhone('')
                    } catch (error) {
                      toast.error('Erro ao enviar mensagem de teste')
                    }
                  }
                }}
              >
                <Send className="w-4 h-4 mr-2" />
                Enviar Teste
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

