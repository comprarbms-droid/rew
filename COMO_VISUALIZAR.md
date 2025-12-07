# 🚀 Como Visualizar o Site

## Passo a Passo

### 1. Abrir o Terminal/PowerShell

No Windows, pressione `Win + X` e escolha "Terminal" ou "PowerShell"

### 2. Navegar até a pasta do projeto

```bash
cd C:\Users\PC\Documents\Remarketing
```

### 3. Instalar dependências (se ainda não instalou)

```bash
npm install
```

### 4. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

### 5. Abrir no navegador

O Vite vai mostrar uma mensagem como:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

**Abra seu navegador e acesse:**
```
http://localhost:3000
```

## ⚠️ Importante

### Configurar API Key (opcional para testes)

Para que a API funcione, você precisa configurar uma API Key. Abra o Console do Navegador (F12) e execute:

```javascript
localStorage.setItem('api_key', 'test-key-123')
```

Ou simplesmente ignore os erros de API por enquanto - o site vai carregar mesmo assim!

## 🎨 O que você vai ver

- **Dashboard** com KPIs e gráficos
- **Menu lateral** com todas as páginas
- **Design moderno** estilo SaaS
- **Interface responsiva**

## 🔧 Se der erro

1. **Erro de módulos não encontrados:**
   ```bash
   npm install
   ```

2. **Porta 3000 já em uso:**
   - Feche outros programas usando a porta 3000
   - Ou altere a porta no `vite.config.js`

3. **Erro de API:**
   - Isso é normal se a API PHP não estiver configurada
   - O site vai carregar mesmo assim, só não vai ter dados reais

## 📝 Comandos Úteis

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 🎯 Próximos Passos

Depois de ver o site funcionando:
1. Configure a API PHP (pasta `api/`)
2. Configure a API Key no `config.php`
3. Teste as funcionalidades!

