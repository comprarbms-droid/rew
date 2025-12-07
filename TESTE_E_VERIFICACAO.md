# ✅ Teste e Verificação - Sistema de Remarketing

## 🎯 Status: Configuração Concluída!

### ✅ Arquivos Criados no Servidor:
- `api/remarketing-receive.php` - Endpoint que recebe os dados
- `api/remarketing.php` - API para visualizar/testar dados
- `api/remarketing-test.html` - Página de teste visual

### ✅ Configuração:
- **API URL:** `https://camelodochina.blog/api/remarketing-receive.php`
- **API KEY:** `rmk_a8f3d9e2b7c4f1a6e9d2b5c8f1a4e7d0b3c6f9a2e5d8b1c4f7a0e3d6b9c2f5a8e1d4b7c0f3a6e9d2b5c8f1a4e7d0b3c6f9a2e5d8b1c4f7a0e3d6b9c2f5a8`
- **Habilitado:** `true`

---

## 🧪 Como Testar

### Opção 1: Usar a Página de Teste

1. **Acesse:** `https://camelodochina.blog/api/remarketing-test.html`
2. **Preencha os campos:**
   - Event Type: `order_created` ou `order_paid`
   - Dados do pedido, cliente, etc.
3. **Clique em "Enviar"**
4. **Verifique a resposta**

### Opção 2: Teste via PHP

```php
// No seu sistema PHP
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
        'utm_medium' => 'cpc'
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
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "HTTP Code: " . $httpCode . "\n";
echo "Response: " . $response . "\n";
```

### Opção 3: Teste via cURL (Terminal)

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

## ✅ Respostas Esperadas

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

## 📊 Verificar Dados Recebidos

### Opção 1: Via API de Visualização

Acesse: `https://camelodochina.blog/api/remarketing.php`

Isso deve mostrar os dados recebidos.

### Opção 2: Verificar Arquivos JSON

Os dados são salvos em:
- `api/data/emails.json` - E-mails gerados
- `api/data/logs.json` - Logs de eventos

---

## 🔗 Conectar com Dashboard React

Para que os dados apareçam no dashboard React (`rew-zeta.vercel.app`):

### 1. Configurar URL da API no Dashboard

Na Vercel:
1. Vá em **Settings** → **Environment Variables**
2. Adicione:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://camelodochina.blog/api`
3. **Redeploy** o projeto

### 2. Atualizar API Client

O arquivo `src/api/client.js` já está configurado para usar a variável de ambiente.

---

## 📋 Checklist de Verificação

- [x] Arquivos criados no servidor
- [x] API URL configurada
- [x] API Key configurada
- [ ] Testar envio de evento
- [ ] Verificar resposta da API
- [ ] Verificar dados salvos
- [ ] Conectar dashboard React com API
- [ ] Verificar dados no dashboard

---

## 🎯 Próximos Passos

1. **Testar o endpoint:**
   - Use `remarketing-test.html` ou faça um teste via PHP
   - Verifique se retorna sucesso

2. **Verificar dados:**
   - Acesse `remarketing.php` para ver os dados recebidos
   - Ou verifique os arquivos JSON

3. **Conectar dashboard:**
   - Configure `VITE_API_URL` na Vercel
   - Redeploy o projeto
   - Verifique se os dados aparecem no dashboard

---

## 🆘 Problemas Comuns

### "Unauthorized"
- Verifique se a API Key está correta no header
- Verifique se está usando `X-API-Key` (não `X-API-Key:` com dois pontos)

### "Missing event_type"
- Certifique-se de enviar `event_type` no JSON
- Valores aceitos: `order_created`, `order_paid`, `cart_abandoned`

### Dados não aparecem no dashboard
- Verifique se `VITE_API_URL` está configurada na Vercel
- Verifique se a API retorna dados em `api/data/emails.json`
- Verifique CORS na API

---

## 🎉 Tudo Pronto!

O sistema está configurado e pronto para uso. Faça um teste e verifique se tudo está funcionando!



