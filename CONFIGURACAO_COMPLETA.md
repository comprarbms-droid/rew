# ✅ Configuração Completa - Sistema de Remarketing

## 🎯 Status: PRONTO PARA USO!

O sistema está configurado e pronto para receber eventos do seu sistema de vendas.

---

## 📍 Endpoint Configurado

**URL:** `https://camelodochina.blog/api/remarketing-receive.php`

**Método:** `POST`

**Header obrigatório:**
```
X-API-Key: rmk_a8f3d9e2b7c4f1a6e9d2b5c8f1a4e7d0b3c6f9a2e5d8b1c4f7a0e3d6b9c2f5a8e1d4b7c0f3a6e9d2b5c8f1a4e7d0b3c6f9a2e5d8b1c4f7a0e3d6b9c2f5a8
```

---

## 📤 Como Enviar Eventos

### Exemplo: Pedido Criado

```php
$data = [
    'event_type' => 'order_created',
    'order' => [
        'id' => '12345',
        'value' => 299.90,
        'status' => 'pending'
    ],
    'customer' => [
        'name' => 'João Silva',
        'email' => 'joao@email.com',
        'phone' => '11999999999'
    ],
    'product' => [
        'name' => 'Produto Exemplo',
        'id' => 'PROD001'
    ],
    'tracking' => [
        'utm_source' => 'facebook',
        'utm_medium' => 'cpc',
        'fbclid' => 'abc123'
    ]
];

$ch = curl_init('https://camelodochina.blog/api/remarketing-receive.php');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'X-API-Key: rmk_a8f3d9e2b7c4f1a6e9d2b5c8f1a4e7d0b3c6f9a2e5d8b1c4f7a0e3d6b9c2f5a8e1d4b7c0f3a6e9d2b5c8f1a4e7d0b3c6f9a2e5d8b1c4f7a0e3d6b9c2f5a8'
]);

$response = curl_exec($ch);
curl_close($ch);
```

### Exemplo: Pedido Pago

```php
$data = [
    'event_type' => 'order_paid',
    'order' => [
        'id' => '12345',
        'value' => 299.90,
        'status' => 'paid'
    ],
    'customer' => [
        'name' => 'João Silva',
        'email' => 'joao@email.com'
    ],
    'product' => [
        'name' => 'Produto Exemplo'
    ]
];

// Mesmo código curl acima
```

### Exemplo: Carrinho Abandonado

```php
$data = [
    'event_type' => 'cart_abandoned',
    'customer' => [
        'name' => 'João Silva',
        'email' => 'joao@email.com'
    ],
    'cart' => [
        'value' => 199.90,
        'items' => [
            ['name' => 'Produto 1', 'price' => 99.90],
            ['name' => 'Produto 2', 'price' => 100.00]
        ]
    ]
];
```

---

## ✅ Resposta da API

### Sucesso (200):
```json
{
    "success": true,
    "message": "Order event processed",
    "event_type": "order_created",
    "email_id": "abc123xyz"
}
```

### Erro de Autenticação (401):
```json
{
    "error": "Unauthorized. Invalid API Key."
}
```

### Erro de Validação (400):
```json
{
    "error": "Missing event_type."
}
```

---

## 📋 Eventos Suportados

1. **`order_created`** - Pedido criado
   - Gera email tipo: `aguardando_pagamento`

2. **`order_paid`** - Pedido pago/aprovado
   - Gera email tipo: `pedido_aprovado`

3. **`cart_abandoned`** - Carrinho abandonado
   - Gera email tipo: `recuperacao_carrinho`

---

## 🔄 Integração com RemarketingSender.php

Se você já tem a classe `RemarketingSender.php`, ela deve enviar para:

```php
// No config.php do seu sistema
define('REMARKETING_API_URL', 'https://camelodochina.blog/api/remarketing-receive.php');
define('REMARKETING_API_KEY', 'rmk_a8f3d9e2b7c4f1a6e9d2b5c8f1a4e7d0b3c6f9a2e5d8b1c4f7a0e3d6b9c2f5a8e1d4b7c0f3a6e9d2b5c8f1a4e7d0b3c6f9a2e5d8b1c4f7a0e3d6b9c2f5a8');
define('REMARKETING_ENABLED', true);
```

---

## 📊 Onde os Dados São Salvos

Os dados são salvos em:
- `api/data/emails.json` - E-mails gerados
- `api/data/logs.json` - Logs de eventos

Esses arquivos são usados pelo dashboard React para exibir os dados.

---

## 🧪 Testar a API

Você pode testar usando curl ou Postman:

```bash
curl -X POST https://camelodochina.blog/api/remarketing-receive.php \
  -H "Content-Type: application/json" \
  -H "X-API-Key: rmk_a8f3d9e2b7c4f1a6e9d2b5c8f1a4e7d0b3c6f9a2e5d8b1c4f7a0e3d6b9c2f5a8e1d4b7c0f3a6e9d2b5c8f1a4e7d0b3c6f9a2e5d8b1c4f7a0e3d6b9c2f5a8" \
  -d '{
    "event_type": "order_created",
    "order": {"id": "123", "value": 299.90},
    "customer": {"name": "Teste", "email": "teste@email.com"}
  }'
```

---

## ✅ Checklist Final

- [x] Endpoint criado: `api/remarketing-receive.php`
- [x] API Key configurada
- [x] Validação de autenticação
- [x] Processamento de eventos
- [x] Salvamento de dados
- [x] Logs de eventos
- [ ] Testar envio de evento
- [ ] Verificar dados no dashboard

---

## 🎉 Pronto!

O sistema está configurado e pronto para receber eventos. 

**Próximo passo:** Teste enviando um evento e verifique se aparece no dashboard!

