import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { 
  Zap, 
  Check, 
  X, 
  Copy, 
  RefreshCw,
  Shield,
  AlertCircle,
  ExternalLink,
  Key,
  Webhook,
  Mail,
  Clock
} from 'lucide-react'
import { api } from '@/api/client'
import { toast } from 'sonner'

import PageHeader from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import StatusBadge from '@/components/ui/StatusBadge'

export default function BrevoConnection() {
  const [apiKey, setApiKey] = useState('')
  
  const queryClient = useQueryClient()

  const { data: connection } = useQuery({
    queryKey: ['connection', 'brevo'],
    queryFn: () => api.getConnection('brevo')
  })

  const saveMutation = useMutation({
    mutationFn: async (data) => {
      return api.updateConnection('brevo', data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['connection', 'brevo'] })
      toast.success('Configuração salva com sucesso!')
    }
  })

  const testConnection = async () => {
    try {
      await api.testConnection('brevo')
      saveMutation.mutate({
        api_key: apiKey || connection?.api_key,
        status: 'connected',
        daily_limit: 300,
        last_test: new Date().toISOString()
      })
      toast.success('Conexão testada com sucesso!')
    } catch (error) {
      toast.error('Erro ao testar conexão')
    }
  }

  const webhookUrl = `${window.location.origin}/api/webhooks/brevo/${connection?.id || 'xxx'}`

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    toast.success('Copiado para a área de transferência!')
  }

  const checklist = [
    { label: 'API Key configurada', done: !!connection?.api_key },
    { label: 'Conexão testada', done: connection?.status === 'connected' },
    { label: 'Webhook configurado', done: !!connection?.webhook_url },
    { label: 'Domínio verificado', done: false }
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Conexão Brevo"
        description="Configure sua integração com a API da Brevo (Sendinblue)"
        icon={Zap}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* API Key Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-slate-100 p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-amber-50">
                <Key className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">API Key</h3>
                <p className="text-sm text-slate-400">Chave de autenticação da Brevo</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-xs text-slate-500 uppercase tracking-wider">Sua API Key</Label>
                <div className="flex gap-3 mt-1.5">
                  <Input
                    type="password"
                    value={apiKey || connection?.api_key || ''}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="xkeysib-xxxxxxxxxxxx"
                    className="font-mono"
                  />
                  <Button
                    onClick={testConnection}
                    disabled={saveMutation.isPending}
                    className="bg-blue-600 hover:bg-blue-700 min-w-[140px]"
                  >
                    {saveMutation.isPending ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Testando...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Testar Conexão
                      </>
                    )}
                  </Button>
                </div>
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

          {/* Webhook Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-slate-100 p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-violet-50">
                <Webhook className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">Webhooks</h3>
                <p className="text-sm text-slate-400">Receba eventos de abertura, clique e bounce</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-xs text-slate-500 uppercase tracking-wider">URL do Webhook</Label>
                <div className="flex gap-2 mt-1.5">
                  <Input
                    value={webhookUrl}
                    readOnly
                    className="font-mono text-sm bg-slate-50"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(webhookUrl)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Como configurar</p>
                    <p className="text-sm text-blue-700 mt-1">
                      Acesse o painel da Brevo → Settings → Webhooks e adicione esta URL para receber eventos de e-mail.
                    </p>
                    <a 
                      href="https://app.brevo.com/settings/keys" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 mt-2"
                    >
                      Abrir painel Brevo
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
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
            <h3 className="text-base font-semibold text-slate-900 mb-4">Status da Integração</h3>
            
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

