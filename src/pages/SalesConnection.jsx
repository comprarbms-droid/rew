import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { 
  Webhook, 
  Copy, 
  RefreshCw,
  Shield,
  AlertCircle,
  ExternalLink,
  Key,
  Link2,
  Check,
  X,
  Globe,
  Lock
} from 'lucide-react'
import { api } from '@/api/client'
import { toast } from 'sonner'

import PageHeader from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import StatusBadge from '@/components/ui/StatusBadge'

export default function SalesConnection() {
  const [webhookUrl, setWebhookUrl] = useState('')
  const [webhookToken, setWebhookToken] = useState('')
  
  const queryClient = useQueryClient()

  const { data: connection } = useQuery({
    queryKey: ['connection', 'sales_system'],
    queryFn: () => api.getConnection('sales_system')
  })

  const saveMutation = useMutation({
    mutationFn: async (data) => {
      return api.updateConnection('sales_system', data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['connection', 'sales_system'] })
      toast.success('Configuração salva com sucesso!')
    }
  })

  const testConnection = async () => {
    try {
      await api.testConnection('sales_system')
      saveMutation.mutate({
        webhook_url: webhookUrl || connection?.webhook_url,
        webhook_token: webhookToken || connection?.webhook_token,
        status: 'connected',
        last_test: new Date().toISOString()
      })
      toast.success('Conexão testada com sucesso!')
    } catch (error) {
      toast.error('Erro ao testar conexão')
    }
  }

  const generateToken = () => {
    const token = 'tk_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    setWebhookToken(token)
    toast.success('Token gerado com sucesso!')
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    toast.success('Copiado para a área de transferência!')
  }

  const receivingWebhookUrl = `${window.location.origin}/api/webhooks/sales/${connection?.id || 'xxx'}`

  const checklist = [
    { label: 'URL do webhook configurada', done: !!connection?.webhook_url },
    { label: 'Token de autenticação definido', done: !!connection?.webhook_token },
    { label: 'Conexão testada', done: connection?.status === 'connected' },
    { label: 'Eventos configurados', done: connection?.status === 'connected' }
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sistema de Vendas"
        description="Configure a conexão com seu sistema de vendas"
        icon={Webhook}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Webhook URL Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-slate-100 p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-blue-50">
                <Globe className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">URL do Webhook</h3>
                <p className="text-sm text-slate-400">Endpoint do seu sistema de vendas</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-xs text-slate-500 uppercase tracking-wider">URL de destino</Label>
                <Input
                  value={webhookUrl || connection?.webhook_url || ''}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://seu-sistema.com/api/webhook"
                  className="mt-1.5"
                />
                <p className="text-xs text-slate-400 mt-1.5">
                  URL para onde enviaremos as atualizações de status dos e-mails
                </p>
              </div>
            </div>
          </motion.div>

          {/* Token Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-slate-100 p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-amber-50">
                <Lock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">Token de Autenticação</h3>
                <p className="text-sm text-slate-400">Chave secreta para validar requisições</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-xs text-slate-500 uppercase tracking-wider">Token</Label>
                <div className="flex gap-2 mt-1.5">
                  <Input
                    type="password"
                    value={webhookToken || connection?.webhook_token || ''}
                    onChange={(e) => setWebhookToken(e.target.value)}
                    placeholder="tk_xxxxxxxxxxxxxxxx"
                    className="font-mono"
                  />
                  <Button
                    variant="outline"
                    onClick={generateToken}
                  >
                    Gerar Token
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={testConnection}
                  disabled={saveMutation.isPending}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {saveMutation.isPending ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Testando...
                    </>
                  ) : (
                    <>
                      <Link2 className="w-4 h-4 mr-2" />
                      Testar Conexão
                    </>
                  )}
                </Button>
              </div>

              {connection && (
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
                  <div className="flex items-center gap-3">
                    <StatusBadge status={connection.status} />
                    {connection.last_test && (
                      <span className="text-sm text-slate-400">
                        Último teste: {new Date(connection.last_test).toLocaleString('pt-BR')}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Receiving Webhook Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-slate-100 p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-violet-50">
                <Webhook className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">Receber Eventos</h3>
                <p className="text-sm text-slate-400">Configure seu sistema para enviar eventos para nós</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-xs text-slate-500 uppercase tracking-wider">Nossa URL de Webhook</Label>
                <div className="flex gap-2 mt-1.5">
                  <Input
                    value={receivingWebhookUrl}
                    readOnly
                    className="font-mono text-sm bg-slate-50"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(receivingWebhookUrl)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-indigo-900">Eventos suportados</p>
                    <ul className="text-sm text-indigo-700 mt-2 space-y-1">
                      <li>• <code className="px-1 py-0.5 bg-indigo-100 rounded">order.created</code> - Novo pedido</li>
                      <li>• <code className="px-1 py-0.5 bg-indigo-100 rounded">order.paid</code> - Pedido pago</li>
                      <li>• <code className="px-1 py-0.5 bg-indigo-100 rounded">order.shipped</code> - Pedido enviado</li>
                      <li>• <code className="px-1 py-0.5 bg-indigo-100 rounded">order.cancelled</code> - Pedido cancelado</li>
                      <li>• <code className="px-1 py-0.5 bg-indigo-100 rounded">cart.abandoned</code> - Carrinho abandonado</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-slate-100 p-6"
          >
            <h3 className="text-base font-semibold text-slate-900 mb-4">Checklist de Configuração</h3>
            
            <div className="space-y-3">
              {checklist.map((item, index) => (
                <div 
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                    item.done ? 'bg-emerald-50' : 'bg-slate-50'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    item.done ? 'bg-emerald-500' : 'bg-slate-200'
                  }`}>
                    {item.done ? (
                      <Check className="w-3 h-3 text-white" />
                    ) : (
                      <X className="w-3 h-3 text-slate-400" />
                    )}
                  </div>
                  <span className={`text-sm ${
                    item.done ? 'text-emerald-700 font-medium' : 'text-slate-500'
                  }`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

