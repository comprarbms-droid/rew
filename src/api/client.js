const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    // Adicionar API Key se disponível
    const apiKey = localStorage.getItem('api_key')
    if (apiKey) {
      config.headers['X-API-Key'] = apiKey
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Erro na requisição' }))
        throw new Error(error.message || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }

  // Emails
  async getEmails(filters = {}) {
    const params = new URLSearchParams(filters)
    return this.request(`/emails.php?${params}`)
  }

  async getEmail(id) {
    return this.request(`/emails/${id}`)
  }

  async resendEmail(id) {
    return this.request(`/emails/${id}/resend`, { method: 'POST' })
  }

  // Templates
  async getTemplates() {
    return this.request('/templates.php')
  }

  async getTemplate(id) {
    return this.request(`/templates/${id}`)
  }

  async createTemplate(data) {
    return this.request('/templates', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateTemplate(id, data) {
    return this.request(`/templates/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteTemplate(id) {
    return this.request(`/templates/${id}`, { method: 'DELETE' })
  }

  async sendTestEmail(templateId, email) {
    return this.request(`/templates/${templateId}/test`, {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  }

  // Connections
  async getConnections() {
    return this.request('/connections')
  }

  async getConnection(type) {
    return this.request(`/connections/${type}`)
  }

  async updateConnection(type, data) {
    return this.request(`/connections/${type}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async testConnection(type) {
    return this.request(`/connections/${type}/test`, { method: 'POST' })
  }

  // Settings
  async getSettings() {
    return this.request('/settings')
  }

  async updateSettings(data) {
    return this.request('/settings', {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  // Cart Recovery
  async getCartRecoveryEmails() {
    return this.request('/cart-recovery/emails')
  }

  async updateCartRecoverySettings(data) {
    return this.request('/cart-recovery/settings', {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  // WhatsApp
  async getWhatsAppConfig() {
    return this.request('/whatsapp/config')
  }

  async updateWhatsAppConfig(data) {
    return this.request('/whatsapp/config', {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async getWhatsAppMessages() {
    return this.request('/whatsapp/messages')
  }

  async sendTestWhatsApp(phone, message) {
    return this.request('/whatsapp/test', {
      method: 'POST',
      body: JSON.stringify({ phone, message }),
    })
  }

  // Orders
  async getOrders(filters = {}) {
    const params = new URLSearchParams(filters)
    return this.request(`/orders.php?${params}`)
  }

  // Remarketing actions
  async getRemarketingOrder(id) {
    return this.request(`/remarketing.php?action=order&id=${id}`)
  }

  async testRemarketingOrder(id) {
    return this.request(`/remarketing.php?action=test&id=${id}`)
  }

  async sendRemarketingOrder(id, type = 'created') {
    return this.request(`/remarketing.php?action=send&id=${id}&type=${type}`)
  }

  async listRemarketingOrders(status = 'pending') {
    return this.request(`/remarketing.php?action=list&status=${status}`)
  }

  // Logs
  async getLogs(filters = {}) {
    const params = new URLSearchParams(filters)
    return this.request(`/logs?${params}`)
  }

  // Stats
  async getStats(period = '30days') {
    return this.request(`/stats?period=${period}`)
  }
}

export const api = new ApiClient()

