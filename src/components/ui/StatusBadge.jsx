import React from 'react'
import { Badge } from './Badge'
import { CheckCircle2, XCircle, Mail, Eye, MousePointer2, AlertCircle } from 'lucide-react'

const statusConfig = {
  sent: {
    label: 'Enviado',
    icon: Mail,
    variant: 'default',
  },
  delivered: {
    label: 'Entregue',
    icon: CheckCircle2,
    variant: 'success',
  },
  opened: {
    label: 'Aberto',
    icon: Eye,
    variant: 'success',
  },
  clicked: {
    label: 'Clicado',
    icon: MousePointer2,
    variant: 'success',
  },
  bounced: {
    label: 'Bounced',
    icon: XCircle,
    variant: 'error',
  },
  error: {
    label: 'Erro',
    icon: AlertCircle,
    variant: 'error',
  },
  read: {
    label: 'Lido',
    icon: Eye,
    variant: 'success',
  },
  replied: {
    label: 'Respondido',
    icon: CheckCircle2,
    variant: 'success',
  },
  failed: {
    label: 'Falhou',
    icon: XCircle,
    variant: 'error',
  },
  pending: {
    label: 'Pendente',
    icon: AlertCircle,
    variant: 'warning',
  },
  paid: {
    label: 'Pago',
    icon: CheckCircle2,
    variant: 'success',
  },
}

export default function StatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig.sent
  const Icon = config.icon

  return (
    <Badge variant={config.variant} className="gap-1.5">
      <Icon className="w-3 h-3" />
      {config.label}
    </Badge>
  )
}

