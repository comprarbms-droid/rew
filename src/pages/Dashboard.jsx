import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { format, subDays, startOfDay, isToday } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { 
  Mail, 
  Eye, 
  MousePointer2, 
  AlertCircle,
  LayoutDashboard,
  ArrowRight,
  ExternalLink
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { createPageUrl } from '@/lib/utils'
import { api } from '@/api/client'

import StatsCard from '@/components/ui/StatsCard'
import PageHeader from '@/components/ui/PageHeader'
import DataTable from '@/components/ui/DataTable'
import StatusBadge from '@/components/ui/StatusBadge'
import EmailsChart from '@/components/charts/EmailsChart'
import RatesChart from '@/components/charts/RatesChart'
import { Button } from '@/components/ui/Button'

export default function Dashboard() {
  const { data: emails = [], isLoading } = useQuery({
    queryKey: ['emails'],
    queryFn: () => api.getEmails()
  })

  // Calculate stats
  const todayEmails = emails.filter(e => isToday(new Date(e.created_date)))
  const sentToday = todayEmails.length
  const openedEmails = emails.filter(e => e.status === 'opened' || e.status === 'clicked')
  const clickedEmails = emails.filter(e => e.status === 'clicked')
  const errorEmails = emails.filter(e => e.status === 'error' || e.status === 'bounced')
  
  const openRate = emails.length > 0 ? ((openedEmails.length / emails.length) * 100).toFixed(1) : 0
  const clickRate = emails.length > 0 ? ((clickedEmails.length / emails.length) * 100).toFixed(1) : 0

  // Generate chart data
  const last30Days = [...Array(30)].map((_, i) => {
    const date = subDays(new Date(), 29 - i)
    const dayEmails = emails.filter(e => {
      const emailDate = startOfDay(new Date(e.created_date))
      return emailDate.getTime() === startOfDay(date).getTime()
    })
    const dayOpened = dayEmails.filter(e => e.status === 'opened' || e.status === 'clicked')
    const dayClicked = dayEmails.filter(e => e.status === 'clicked')
    
    return {
      date: format(date, 'dd/MM', { locale: ptBR }),
      emails: dayEmails.length,
      openRate: dayEmails.length > 0 ? Math.round((dayOpened.length / dayEmails.length) * 100) : 0,
      clickRate: dayEmails.length > 0 ? Math.round((dayClicked.length / dayEmails.length) * 100) : 0
    }
  })

  const recentEmails = emails.slice(0, 8)

  const emailTypeLabels = {
    pedido_aprovado: 'Pedido Aprovado',
    aguardando_pagamento: 'Aguardando Pagamento',
    recuperacao_carrinho: 'Recuperação de Carrinho',
    rastreio: 'Rastreio',
    compra_cancelada: 'Compra Cancelada',
    custom: 'Personalizado'
  }

  const columns = [
    {
      header: 'Tipo',
      accessor: 'type',
      render: (row) => (
        <span className="text-sm font-medium text-slate-700">
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
        <span className="text-sm text-slate-600 max-w-[200px] truncate block">
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
      header: 'Data',
      accessor: 'created_date',
      render: (row) => (
        <span className="text-sm text-slate-500">
          {format(new Date(row.created_date), "dd/MM/yyyy HH:mm", { locale: ptBR })}
        </span>
      )
    },
    {
      header: '',
      accessor: 'actions',
      render: (row) => (
        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-blue-600">
          <ExternalLink className="w-4 h-4" />
        </Button>
      )
    }
  ]

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Visão geral do seu sistema de e-mails transacionais"
        icon={LayoutDashboard}
        actions={
          <Link to="/emails">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
              Ver todos os e-mails
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatsCard
          title="E-mails Enviados Hoje"
          value={sentToday}
          icon={Mail}
          color="blue"
          trend="up"
          trendValue="+12%"
          delay={0}
        />
        <StatsCard
          title="Taxa de Abertura"
          value={`${openRate}%`}
          icon={Eye}
          color="green"
          trend="up"
          trendValue="+5%"
          delay={0.1}
        />
        <StatsCard
          title="Taxa de Cliques"
          value={`${clickRate}%`}
          icon={MousePointer2}
          color="violet"
          trend="up"
          trendValue="+3%"
          delay={0.2}
        />
        <StatsCard
          title="E-mails com Erro"
          value={errorEmails.length}
          icon={AlertCircle}
          color="rose"
          trend="down"
          trendValue="-8%"
          delay={0.3}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EmailsChart 
          data={last30Days}
          title="Envios por Dia"
          subtitle="Últimos 30 dias"
        />
        <RatesChart
          data={last30Days.filter((_, i) => i % 3 === 0)}
          title="Taxas de Abertura e Clique"
          subtitle="Por período"
        />
      </div>

      {/* Recent Emails Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Últimos E-mails Enviados</h2>
          <Link 
            to="/emails"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            Ver todos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <DataTable
          columns={columns}
          data={recentEmails}
          isLoading={isLoading}
          emptyMessage="Nenhum e-mail enviado ainda"
        />
      </motion.div>
    </div>
  )
}

