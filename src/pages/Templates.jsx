import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FileText, 
  Plus, 
  Pencil, 
  Save,
  Send,
  X,
  Code2,
  Smartphone,
  Monitor
} from 'lucide-react'
import { api } from '@/api/client'
import { toast } from 'sonner'

import PageHeader from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Badge } from '@/components/ui/Badge'
import { Switch } from '@/components/ui/Switch'
import { Textarea } from '@/components/ui/Textarea'

const templateTypeLabels = {
  pedido_aprovado: 'Pedido Aprovado',
  aguardando_pagamento: 'Aguardando Pagamento / Pix',
  recuperacao_carrinho: 'Recuperação de Carrinho',
  rastreio: 'Rastreio',
  compra_cancelada: 'Compra Cancelada',
  custom: 'Personalizado'
}

const defaultTemplates = [
  { name: 'Pedido Aprovado', type: 'pedido_aprovado', subject: 'Seu pedido foi aprovado! 🎉' },
  { name: 'Aguardando Pagamento / Pix', type: 'aguardando_pagamento', subject: 'Aguardando seu pagamento' },
  { name: 'Recuperação de Carrinho', type: 'recuperacao_carrinho', subject: 'Você esqueceu algo no carrinho!' },
  { name: 'Rastreio', type: 'rastreio', subject: 'Seu pedido está a caminho! 📦' },
  { name: 'Compra Cancelada', type: 'compra_cancelada', subject: 'Pedido cancelado' }
]

export default function Templates() {
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState(null)
  const [previewMode, setPreviewMode] = useState('desktop')
  const [testEmail, setTestEmail] = useState('')
  const [showTestDialog, setShowTestDialog] = useState(false)

  const queryClient = useQueryClient()

  const { data: templates = [], isLoading } = useQuery({
    queryKey: ['templates'],
    queryFn: () => api.getTemplates()
  })

  const saveMutation = useMutation({
    mutationFn: async (template) => {
      if (template.id) {
        return api.updateTemplate(template.id, template)
      }
      return api.createTemplate(template)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] })
      setIsEditorOpen(false)
      setEditingTemplate(null)
      toast.success('Template salvo com sucesso!')
    }
  })

  const openEditor = (template = null) => {
    if (template) {
      setEditingTemplate({ ...template })
    } else {
      setEditingTemplate({
        name: '',
        type: 'custom',
        subject: '',
        html_content: getDefaultHtmlTemplate(),
        is_active: true,
        variables: ['{{nome}}', '{{email}}', '{{pedido_id}}']
      })
    }
    setIsEditorOpen(true)
  }

  const getDefaultHtmlTemplate = () => `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden;">
          <tr>
            <td style="padding: 40px; text-align: center; background: linear-gradient(135deg, #0061FF 0%, #4338CA 100%);">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Sua Loja</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <h2 style="color: #1a1a1a; margin: 0 0 20px; font-size: 20px;">Olá, {{nome}}!</h2>
              <p style="color: #52525b; line-height: 1.6; margin: 0 0 20px;">
                Seu conteúdo aqui...
              </p>
              <a href="#" style="display: inline-block; padding: 14px 28px; background-color: #0061FF; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600;">
                Botão de Ação
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 40px; background-color: #f9fafb; text-align: center;">
              <p style="color: #71717a; font-size: 12px; margin: 0;">
                © 2024 Sua Loja. Todos os direitos reservados.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  const allTemplates = [
    ...defaultTemplates.map(dt => {
      const existing = templates.find(t => t.type === dt.type)
      return existing || { ...dt, is_placeholder: true }
    }),
    ...templates.filter(t => t.type === 'custom')
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Templates de E-mail"
        description="Gerencie seus templates de e-mail transacional"
        icon={FileText}
        actions={
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
            onClick={() => openEditor()}
          >
            <Plus className="w-4 h-4" />
            Novo Template
          </Button>
        }
      />

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {allTemplates.map((template, index) => (
            <motion.div
              key={template.id || template.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-lg hover:shadow-slate-100/50 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-50 to-indigo-50">
                  <FileText className="w-5 h-5 text-violet-600" />
                </div>
                <div className="flex items-center gap-2">
                  {template.is_active !== false && !template.is_placeholder && (
                    <Badge className="bg-emerald-50 text-emerald-600 border-0">Ativo</Badge>
                  )}
                  {template.is_placeholder && (
                    <Badge className="bg-slate-50 text-slate-500 border-0">Não configurado</Badge>
                  )}
                </div>
              </div>

              <h3 className="text-base font-semibold text-slate-900 mb-1">
                {template.name}
              </h3>
              <p className="text-sm text-slate-400 mb-4">
                {templateTypeLabels[template.type] || 'Personalizado'}
              </p>

              {template.updated_date && (
                <p className="text-xs text-slate-400 mb-4">
                  Editado em {format(new Date(template.updated_date), "dd/MM/yyyy", { locale: ptBR })}
                </p>
              )}

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 gap-1.5"
                  onClick={() => openEditor(template.is_placeholder ? { ...template, is_placeholder: undefined } : template)}
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Editar
                </Button>
                {!template.is_placeholder && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-slate-400 hover:text-violet-600"
                    onClick={() => {
                      setEditingTemplate(template)
                      setShowTestDialog(true)
                    }}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Template Editor Modal */}
      {isEditorOpen && editingTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-6xl w-full h-[90vh] flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-violet-50">
                  <Code2 className="w-5 h-5 text-violet-600" />
                </div>
                <h2 className="text-lg font-semibold">
                  {editingTemplate?.id ? 'Editar Template' : 'Novo Template'}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex gap-2 bg-slate-100 rounded-lg p-1">
                  <Button
                    variant={previewMode === 'desktop' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setPreviewMode('desktop')}
                  >
                    <Monitor className="w-3.5 h-3.5 mr-1.5" />
                    Desktop
                  </Button>
                  <Button
                    variant={previewMode === 'mobile' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setPreviewMode('mobile')}
                  >
                    <Smartphone className="w-3.5 h-3.5 mr-1.5" />
                    Mobile
                  </Button>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsEditorOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
              {/* Editor Side */}
              <div className="w-1/2 border-r border-slate-100 flex flex-col overflow-hidden">
                <div className="p-4 space-y-4 overflow-y-auto flex-1">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-slate-500 uppercase tracking-wider">Nome</Label>
                      <Input
                        value={editingTemplate.name}
                        onChange={(e) => setEditingTemplate({ ...editingTemplate, name: e.target.value })}
                        className="mt-1.5"
                        placeholder="Nome do template"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-slate-500 uppercase tracking-wider">Tipo</Label>
                      <select
                        value={editingTemplate.type}
                        onChange={(e) => setEditingTemplate({ ...editingTemplate, type: e.target.value })}
                        className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
                      >
                        {Object.entries(templateTypeLabels).map(([key, label]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs text-slate-500 uppercase tracking-wider">Assunto</Label>
                    <Input
                      value={editingTemplate.subject}
                      onChange={(e) => setEditingTemplate({ ...editingTemplate, subject: e.target.value })}
                      className="mt-1.5"
                      placeholder="Assunto do e-mail"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                    <div>
                      <p className="text-sm font-medium text-slate-700">Template Ativo</p>
                      <p className="text-xs text-slate-400">Habilita o envio automático</p>
                    </div>
                    <Switch
                      checked={editingTemplate.is_active}
                      onCheckedChange={(checked) => setEditingTemplate({ ...editingTemplate, is_active: checked })}
                    />
                  </div>

                  <div className="flex-1">
                    <Label className="text-xs text-slate-500 uppercase tracking-wider">HTML do Template</Label>
                    <Textarea
                      value={editingTemplate.html_content}
                      onChange={(e) => setEditingTemplate({ ...editingTemplate, html_content: e.target.value })}
                      className="mt-1.5 font-mono text-xs h-[300px] resize-none"
                      placeholder="Cole o HTML do template aqui..."
                    />
                  </div>

                  <div className="p-3 rounded-lg bg-amber-50 border border-amber-100">
                    <p className="text-xs font-medium text-amber-800 mb-1">Variáveis disponíveis:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {['{{nome}}', '{{email}}', '{{pedido_id}}', '{{valor}}', '{{link}}'].map(v => (
                        <code key={v} className="px-2 py-0.5 rounded bg-amber-100 text-amber-700 text-xs">
                          {v}
                        </code>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-slate-100 flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setShowTestDialog(true)
                    }}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Teste
                  </Button>
                  <Button
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    onClick={() => saveMutation.mutate(editingTemplate)}
                    disabled={saveMutation.isPending}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {saveMutation.isPending ? 'Salvando...' : 'Salvar Template'}
                  </Button>
                </div>
              </div>

              {/* Preview Side */}
              <div className="w-1/2 bg-slate-50 p-4 overflow-auto flex items-start justify-center">
                <div 
                  className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
                    previewMode === 'mobile' ? 'w-[375px]' : 'w-full max-w-[600px]'
                  }`}
                >
                  <div className="bg-slate-100 px-3 py-2 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-rose-400" />
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    </div>
                    <div className="flex-1 text-center">
                      <span className="text-xs text-slate-400">Pré-visualização</span>
                    </div>
                  </div>
                  <iframe
                    srcDoc={editingTemplate.html_content || '<p style="padding: 20px; color: #999;">Comece a editar o HTML...</p>'}
                    className="w-full h-[500px] border-0"
                    title="Email Preview"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Test Email Dialog */}
      {showTestDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-blue-50">
                <Send className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-lg font-semibold">Enviar E-mail de Teste</h2>
              <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setShowTestDialog(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-xs text-slate-500 uppercase tracking-wider">E-mail de destino</Label>
                <Input
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  className="mt-1.5"
                  placeholder="seu@email.com"
                />
              </div>

              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={async () => {
                  if (editingTemplate?.id && testEmail) {
                    try {
                      await api.sendTestEmail(editingTemplate.id, testEmail)
                      toast.success('E-mail de teste enviado!')
                      setShowTestDialog(false)
                      setTestEmail('')
                    } catch (error) {
                      toast.error('Erro ao enviar e-mail de teste')
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

