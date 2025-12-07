# Dashboard de Remarketing

Sistema completo de remarketing com dashboard React moderno e integração com sistema PHP.

## 🚀 Funcionalidades

- **Dashboard** com KPIs, gráficos e métricas
- **Gestão de E-mails** com histórico completo e filtros avançados
- **Templates de E-mail** com editor HTML e pré-visualização
- **Conexão Brevo** para envio de e-mails transacionais
- **Sistema de Vendas** com webhooks bidirecionais
- **Recuperação de Carrinho** via e-mail e WhatsApp
- **Logs do Sistema** com timeline organizada
- **Configurações** gerais do sistema

## 📦 Instalação

### Frontend (React)

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build
```

### Backend (PHP)

1. Configure as constantes no `config.php`:
```php
define('REMARKETING_API_URL', 'https://seu-sistema.com/api');
define('REMARKETING_API_KEY', 'sua-api-key-secreta');
define('REMARKETING_ENABLED', true);
```

2. Configure o servidor web para apontar para a pasta `api/`

3. Certifique-se de que a pasta `api/data/` tem permissões de escrita

## 🔧 Configuração

### API Key

O front-end precisa de uma API Key para autenticação. Configure no localStorage:

```javascript
localStorage.setItem('api_key', 'sua-api-key-secreta');
```

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```
VITE_API_URL=http://localhost/api
```

## 📁 Estrutura do Projeto

```
Remarketing/
├── api/
│   ├── index.php          # Endpoint principal da API
│   └── data/              # Arquivos JSON (simulação de banco)
├── src/
│   ├── components/        # Componentes React
│   ├── pages/            # Páginas do dashboard
│   ├── api/              # Cliente API
│   └── lib/               # Utilitários
├── package.json
└── vite.config.js
```

## 🔌 Integração com Sistema PHP

O sistema PHP existente (`RemarketingSender.php`) envia eventos para a API:

- `order_created` - Quando um pedido é criado
- `order_paid` - Quando um pedido é aprovado

A API recebe esses eventos e processa conforme a configuração.

## 📊 Entidades

- **Email**: E-mails enviados
- **EmailTemplate**: Templates de e-mail
- **Connection**: Conexões (Brevo, Sistema de Vendas)
- **Settings**: Configurações gerais
- **Log**: Logs do sistema
- **WhatsAppConfig**: Configurações WhatsApp
- **WhatsAppMessage**: Mensagens WhatsApp enviadas

## 🎨 Design

Interface moderna estilo SaaS com:
- Cores suaves e gradientes
- Bordas arredondadas
- Microanimações (Framer Motion)
- Responsivo (mobile-first)
- Dark mode (preparado)

## 📝 Próximos Passos

1. Integrar com banco de dados real (substituir arquivos JSON)
2. Implementar autenticação completa
3. Adicionar testes automatizados
4. Configurar CI/CD
5. Adicionar mais métricas e relatórios

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto é privado e proprietário.

