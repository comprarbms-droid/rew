# ⚙️ Configurar API no Sistema PHP

## 📋 Valores para Configurar

### 1. REMARKETING_API_URL

**Use a URL do seu site na Vercel:**

```
https://rew-zeta.vercel.app/api
```

**OU se você configurou um domínio customizado:**
```
https://seudominio.com/api
```

### 2. REMARKETING_API_KEY

**Crie uma chave secreta forte:**

Exemplo:
```php
define('REMARKETING_API_KEY', 'rk_2024_abc123xyz789_secret_key_secure');
```

**Dica:** Use uma chave longa e aleatória. Exemplo:
- `rk_remarketing_2024_` + caracteres aleatórios
- Ou gere uma: https://randomkeygen.com/

### 3. REMARKETING_ENABLED

**Deixe como `true` para ativar:**

```php
define('REMARKETING_ENABLED', true);
```

---

## 📝 Exemplo Completo no config.php

```php
// Configurações do Sistema de Remarketing
define('REMARKETING_API_URL', 'https://rew-zeta.vercel.app/api');
define('REMARKETING_API_KEY', 'rk_remarketing_2024_abc123xyz789_secret');
define('REMARKETING_ENABLED', true);
```

---

## ⚠️ IMPORTANTE: A API Precisa Estar Hospedada

**Atenção:** A pasta `api/` precisa estar hospedada em um servidor PHP!

### Opções:

1. **Hospedar na Hostinger:**
   - Suba a pasta `api/` para o servidor
   - Configure um subdomínio: `api.seudominio.com`
   - Use essa URL no `REMARKETING_API_URL`

2. **Ou usar a Vercel (com Serverless Functions):**
   - Mais complexo, mas possível
   - Requer configuração especial

**Recomendação:** Hospede a API na Hostinger (mais simples para PHP).

---

## 🔐 Segurança da API Key

1. **Nunca exponha a API Key:**
   - Não coloque no código frontend
   - Não commite no Git (use `.env` ou `config.php` fora do Git)

2. **Use a mesma chave em dois lugares:**
   - No `config.php` do sistema PHP (quem envia)
   - Na API PHP (`api/index.php`) para validar

---

## 🔄 Configurar a API para Validar a Key

No arquivo `api/index.php`, já está configurado para validar:

```php
$apiKey = $_SERVER['HTTP_X_API_Key'] ?? '';
$validApiKey = defined('REMARKETING_API_KEY') ? REMARKETING_API_KEY : '';

if (!empty($validApiKey) && $apiKey !== $validApiKey) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}
```

**Mas você precisa definir a constante na API também!**

Crie um arquivo `api/config.php`:

```php
<?php
define('REMARKETING_API_KEY', 'rk_remarketing_2024_abc123xyz789_secret');
```

E inclua no `api/index.php`:

```php
require_once __DIR__ . '/config.php';
```

---

## ✅ Checklist

- [ ] Definir `REMARKETING_API_URL` = URL da Vercel + `/api`
- [ ] Criar `REMARKETING_API_KEY` (chave secreta forte)
- [ ] Definir `REMARKETING_ENABLED` = `true`
- [ ] Hospedar pasta `api/` em servidor PHP
- [ ] Configurar mesma API Key na API PHP
- [ ] Testar envio de dados

---

## 🧪 Testar a Configuração

Depois de configurar, teste enviando um evento:

```php
// No seu sistema PHP
$remarketing = new RemarketingSender();
$remarketing->sendOrderCreated($pedido);
```

Verifique:
1. Se aparece no dashboard
2. Se os logs mostram sucesso
3. Se não há erros de autenticação

---

## 📍 Resumo Rápido

```php
// No config.php do seu sistema
define('REMARKETING_API_URL', 'https://rew-zeta.vercel.app/api');
define('REMARKETING_API_KEY', 'SUA_CHAVE_SECRETA_AQUI');
define('REMARKETING_ENABLED', true);
```

**Lembre-se:** A API precisa estar hospedada em servidor PHP separado!


