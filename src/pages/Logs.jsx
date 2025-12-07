import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FileWarning, 
  RefreshCw,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Info,
  AlertTriangle,
  Webhook,
  Mail,
  Clock,
  Link2
} from 'lucide-react'
import { api } from '@/api/client'

import PageHeader from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

const logTypeIcons = {
  webhook_brevo: Webhook,
  send: Mail,
  cron_recovery: Clock,
  integration_error: Link2,
  event: Info
}

const logTypeLabels = {
  webhook_brevo: 'Webhook Brevo',
  send: 'Envio',
  cron_recovery: 'Cron Recuperação',
  integration_error: 'Erro de Integração',
  event: 'Evento'
}

const logLevelConfig = {
  info: {
    icon: Info,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100'
  },
  success: {
    icon: CheckCircle2,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100'
  },
  warning: {
    icon: AlertTriangle,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100'
  },
  error: {
    icon: AlertCircle,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-100'
  }
}

function LogItem({ log, isExpanded, onToggle }) {
  const config = logLevelConfig[log.level] || logLevelConfig.info
  const TypeIcon = logTypeIcons[log.type] || Info
  const LevelIcon = config.icon

  let parsedDetails = null
  if (log.details) {
    try {
      parsedDetails = JSON.parse(log.details)
    } catch {
      parsedDetails = log.details
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="relative"
    >
      <div className="absolute left-6 top-12 bottom-0 w-px bg-slate-100" />
      
      <div 
        className={cn(
          "relative flex gap-4 p-4 rounded-xl cursor-pointer transition-all",
          "hover:bg-slate-50",
          isExpanded && "bg-slate-50"
        )}
        onClick={onToggle}
      >
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 relative z-10",
          config.bg
        )}>
          <LevelIcon className={cn("w-5 h-5", config.color)} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="text-xs gap-1">
                  <TypeIcon className="w-3 h-3" />
                  {logTypeLabels[log.type]}
                </Badge>
                <span className="text-xs text-slate-400">
                  {format(new Date(log.created_date), "dd/MM/yyyy 'às' HH:mm:ss", { locale: ptBR })}
                </span>
              </div>
              <p className="text-sm font-medium text-slate-900">{log.message}</p>
              {log.source && (
                <p className="text-xs text-slate-400 mt-1">Origem: {log.source}</p>
              )}
            </div>
            <ChevronRight className={cn(
              "w-5 h-5 text-slate-300 transition-transform shrink-0",
              isExpanded && "rotate-90"
            )} />
          </div>

          <AnimatePresence>
            {isExpanded && parsedDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 overflow-hidden"
              >
                <pre className="p-4 rounded-lg bg-slate-900 text-slate-100 text-xs overflow-x-auto">
                  {typeof parsedDetails === 'object' 
                    ? JSON.stringify(parsedDetails, null, 2)
                    : parsedDetails
                  }
                </pre>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

export default function Logs() {
  const [activeTab, setActiveTab] = useState('all')
  const [expandedLog, setExpandedLog] = useState(null)

  const { data: logs = [], isLoading, refetch } = useQuery({
    queryKey: ['logs'],
    queryFn: () => api.getLogs()
  })

  const filterLogs = (type) => {
    if (type === 'all') return logs
    return logs.filter(log => log.type === type)
  }

  const filteredLogs = filterLogs(activeTab)

  const tabCounts = {
    all: logs.length,
    webhook_brevo: logs.filter(l => l.type === 'webhook_brevo').length,
    send: logs.filter(l => l.type === 'send').length,
    cron_recovery: logs.filter(l => l.type === 'cron_recovery').length,
    integration_error: logs.filter(l => l.type === 'integration_error').length
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Logs do Sistema"
        description="Monitore todos os eventos e atividades"
        icon={FileWarning}
        actions={
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => refetch()}
          >
            <RefreshCw className="w-4 h-4" />
            Atualizar
          </Button>
        }
      />

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-slate-100 p-2">
        <div className="flex flex-wrap gap-2">
          {['all', 'webhook_brevo', 'send', 'cron_recovery', 'integration_error'].map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab(tab)}
              className={activeTab === tab ? 'bg-slate-100' : ''}
            >
              {tab === 'all' ? 'Todos' :
               tab === 'webhook_brevo' ? 'Webhook Brevo' :
               tab === 'send' ? 'Envios' :
               tab === 'cron_recovery' ? 'Cron Recovery' : 'Erros'}
              <Badge variant="secondary" className="ml-2 bg-slate-200">
                {tabCounts[tab] || 0}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      {/* Logs Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-slate-100 overflow-hidden"
      >
        {isLoading ? (
          <div className="p-8 text-center">
            <RefreshCw className="w-6 h-6 text-slate-300 animate-spin mx-auto mb-3" />
            <p className="text-sm text-slate-400">Carregando logs...</p>
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="p-12 text-center">
            <FileWarning className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400">Nenhum log encontrado</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {filteredLogs.map((log) => (
              <LogItem
                key={log.id}
                log={log}
                isExpanded={expandedLog === log.id}
                onToggle={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}

