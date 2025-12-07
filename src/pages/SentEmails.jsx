import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { format, subDays, isWithinInterval, startOfDay, endOfDay } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { 
  Mail, 
  Filter, 
  Search, 
  Eye,
  RotateCcw,
  Code,
  Calendar,
  X
} from 'lucide-react'
import { api } from '@/api/client'

import PageHeader from '@/components/ui/PageHeader'
import DataTable from '@/components/ui/DataTable'
import StatusBadge from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { toast } from 'sonner'

export default function SentEmails() {
  const [dateFilter, setDateFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedEmail, setSelectedEmail] = useState(null)

  const { data: emails = [], isLoading, refetch } = useQuery({
    queryKey: ['emails'],
    queryFn: () => api.getEmails()
  })

  const filterByDate = (email) => {
    const emailDate = new Date(email.created_date)
    const today = new Date()
    
    switch (dateFilter) {
      case 'today':
        return isWithinInterval(emailDate, { 
          start: startOfDay(today), 
          end: endOfDay(today) 
        })
      case 'yesterday':
        const yesterday = subDays(today, 1)
        return isWithinInterval(emailDate, { 
          start: startOfDay(yesterday), 
          end: endOfDay(yesterday) 
        })
      case '7days':
        return isWithinInterval(emailDate, { 
          start: startOfDay(subDays(today, 7)), 
          end: endOfDay(today) 
        })
      case '30days':
        return isWithinInterval(emailDate, { 
          start: startOfDay(subDays(today, 30)), 
          end: endOfDay(today) 
        })
      default:
        return true
    }
  }

  const filteredEmails = emails.filter(email => {
    const matchesDate = filterByDate(email)
    const matchesStatus = statusFilter === 'all' || email.status === statusFilter
    const matchesType = typeFilter === 'all' || email.type === typeFilter
    const matchesSearch = !searchQuery || 
      email.customer_email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.subject?.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesDate && matchesStatus && matchesType && matchesSearch
  })

  const emailTypeLabels = {
    pedido_aprovado: 'Pedido Aprovado',
    aguardando_pagamento: 'Aguardando Pagamento',
    recuperacao_carrinho: 'Recuperação de Carrinho',
    rastreio: 'Rastreio',
    compra_cancelada: 'Compra Cancelada',
    custom: 'Personalizado'
  }

  const handleResend = async (email) => {
    try {
      await api.resendEmail(email.id)
      toast.success('E-mail reenviado com sucesso!')
      refetch()
    } catch (error) {
      toast.error('Erro ao reenviar e-mail')
    }
  }

  const columns = [
    {
      header: 'Tipo',
      accessor: 'type',
      render: (row) => (
        <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-50 text-sm font-medium text-slate-700">
          {emailTypeLabels[row.type] || row.type}
        </span>
      )
    },
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
      header: 'Assunto',
      accessor: 'subject',
      render: (row) => (
        <span className="text-sm text-slate-600 max-w-[250px] truncate block">
          {row.subject}
        </span>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status} />
    },
    {
      header: 'Data/Hora',
      accessor: 'created_date',
      render: (row) => (
        <span className="text-sm text-slate-500">
          {format(new Date(row.created_date), "dd/MM/yyyy HH:mm", { locale: ptBR })}
        </span>
      )
    },
    {
      header: 'Ações',
      accessor: 'actions',
      render: (row) => (
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-slate-400 hover:text-blue-600"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedEmail(row)
            }}
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-slate-400 hover:text-emerald-600"
            onClick={(e) => {
              e.stopPropagation()
              handleResend(row)
            }}
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="E-mails Enviados"
        description="Histórico completo de e-mails transacionais"
        icon={Mail}
      />

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Date Filter */}
          <div className="flex gap-2 flex-wrap">
            {['all', 'today', 'yesterday', '7days', '30days'].map((filter) => (
              <Button
                key={filter}
                variant={dateFilter === filter ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDateFilter(filter)}
                className={dateFilter === filter ? 'bg-blue-600' : ''}
              >
                {filter === 'all' ? 'Todos' : 
                 filter === 'today' ? 'Hoje' :
                 filter === 'yesterday' ? 'Ontem' :
                 filter === '7days' ? '7 dias' : '30 dias'}
              </Button>
            ))}
          </div>

          <div className="flex flex-1 gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Buscar por cliente ou assunto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-50 border-0"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 px-3 rounded-lg border border-slate-200 bg-white text-sm"
            >
              <option value="all">Todos Status</option>
              <option value="sent">Enviado</option>
              <option value="delivered">Entregue</option>
              <option value="opened">Aberto</option>
              <option value="clicked">Clicado</option>
              <option value="bounced">Bounced</option>
              <option value="error">Erro</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="h-10 px-3 rounded-lg border border-slate-200 bg-white text-sm"
            >
              <option value="all">Todos Tipos</option>
              <option value="pedido_aprovado">Pedido Aprovado</option>
              <option value="aguardando_pagamento">Aguardando Pagamento</option>
              <option value="recuperacao_carrinho">Recuperação de Carrinho</option>
              <option value="rastreio">Rastreio</option>
              <option value="compra_cancelada">Compra Cancelada</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            {filteredEmails.length} e-mails encontrados
          </p>
          <Button variant="ghost" size="sm" onClick={() => refetch()}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredEmails}
        isLoading={isLoading}
        emptyMessage="Nenhum e-mail encontrado"
        onRowClick={setSelectedEmail}
      />

      {/* Email Detail Modal */}
      {selectedEmail && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-50">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold">Detalhes do E-mail</h2>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSelectedEmail(null)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Cliente</p>
                  <p className="text-sm font-medium text-slate-900">{selectedEmail.customer_name || 'N/A'}</p>
                  <p className="text-sm text-slate-500">{selectedEmail.customer_email}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Status</p>
                  <StatusBadge status={selectedEmail.status} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Tipo</p>
                  <p className="text-sm font-medium text-slate-700">
                    {emailTypeLabels[selectedEmail.type] || selectedEmail.type}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Data de Envio</p>
                  <p className="text-sm text-slate-700">
                    {format(new Date(selectedEmail.created_date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Assunto</p>
                <p className="text-sm font-medium text-slate-900">{selectedEmail.subject}</p>
              </div>

              {selectedEmail.opened_at && (
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Aberto em</p>
                  <p className="text-sm text-slate-700">
                    {format(new Date(selectedEmail.opened_at), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                  </p>
                </div>
              )}

              {selectedEmail.error_message && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-100">
                  <p className="text-xs text-rose-600 uppercase tracking-wider mb-1">Erro</p>
                  <p className="text-sm text-rose-700">{selectedEmail.error_message}</p>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={() => handleResend(selectedEmail)}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reenviar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

