import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from '@/components/ui/Layout'

// Pages
import Dashboard from '@/pages/Dashboard'
import SentEmails from '@/pages/SentEmails'
import Templates from '@/pages/Templates'
import BrevoConnection from '@/pages/BrevoConnection'
import SalesConnection from '@/pages/SalesConnection'
import CartRecovery from '@/pages/CartRecovery'
import WhatsAppRecovery from '@/pages/WhatsAppRecovery'
import Settings from '@/pages/Settings'
import Logs from '@/pages/Logs'
import Account from '@/pages/Account'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout currentPageName="Dashboard"><Dashboard /></Layout>} />
        <Route path="/emails" element={<Layout currentPageName="E-mails Enviados"><SentEmails /></Layout>} />
        <Route path="/templates" element={<Layout currentPageName="Templates"><Templates /></Layout>} />
        <Route path="/brevo" element={<Layout currentPageName="Conexão Brevo"><BrevoConnection /></Layout>} />
        <Route path="/sales" element={<Layout currentPageName="Sistema de Vendas"><SalesConnection /></Layout>} />
        <Route path="/cart-recovery" element={<Layout currentPageName="Recuperação de Carrinho"><CartRecovery /></Layout>} />
        <Route path="/whatsapp-recovery" element={<Layout currentPageName="Recuperação WhatsApp"><WhatsAppRecovery /></Layout>} />
        <Route path="/settings" element={<Layout currentPageName="Configurações"><Settings /></Layout>} />
        <Route path="/logs" element={<Layout currentPageName="Logs"><Logs /></Layout>} />
        <Route path="/account" element={<Layout currentPageName="Minha Conta"><Account /></Layout>} />
      </Routes>
    </Router>
  )
}

export default App

