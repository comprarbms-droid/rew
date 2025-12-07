# 🚀 Deploy na Vercel - Passo a Passo

## ✅ Você já tem conta? Perfeito!

## Opção 1: Via Interface Web (Mais Fácil)

### Passo 1: Preparar o Projeto

1. **Certifique-se de que o projeto está no Git:**
   ```bash
   # Se ainda não inicializou o Git
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Criar repositório no GitHub/GitLab/Bitbucket:**
   - Vá para GitHub.com
   - Crie um novo repositório
   - Siga as instruções para fazer push do código

### Passo 2: Conectar na Vercel

1. **Na tela que você está vendo:**
   - Clique em **"Import Git Repository"**
   - Escolha seu provedor (GitHub, GitLab ou Bitbucket)
   - Autorize a Vercel a acessar seus repositórios
   - Selecione o repositório do projeto Remarketing

2. **Ou use o botão "Continue with GitHub"** (se já tiver o código no GitHub)

### Passo 3: Configurar o Projeto

A Vercel vai detectar automaticamente que é um projeto Vite/React. Você verá:

- **Framework Preset:** Vite (já detectado)
- **Root Directory:** `./` (deixe assim)
- **Build Command:** `npm run build` (já configurado)
- **Output Directory:** `dist` (já configurado)

**Clique em "Deploy"**

### Passo 4: Aguardar o Deploy

- A Vercel vai instalar dependências
- Fazer o build
- Deploy automático
- Você verá o progresso em tempo real

### Passo 5: Pronto! 🎉

Você receberá uma URL tipo: `seu-projeto.vercel.app`

---

## Opção 2: Via CLI (Terminal)

Se preferir usar o terminal:

### Passo 1: Instalar Vercel CLI

```bash
npm install -g vercel
```

### Passo 2: Fazer Login

```bash
vercel login
```

Isso vai abrir o navegador para você fazer login.

### Passo 3: Deploy

```bash
# No diretório do projeto
cd C:\Users\PC\Documents\Remarketing

# Deploy
vercel
```

### Passo 4: Seguir as Perguntas

A Vercel vai perguntar:
- **Set up and deploy?** → Digite `Y` (Yes)
- **Which scope?** → Escolha sua conta
- **Link to existing project?** → Digite `N` (No) se for novo
- **Project name?** → Digite `remarketing-dashboard` (ou o nome que quiser)
- **Directory?** → Pressione Enter (deixa padrão `./`)
- **Override settings?** → Digite `N` (No)

### Passo 5: Pronto!

Você receberá a URL do site.

---

## ⚙️ Configurações Importantes

### Variáveis de Ambiente (Opcional)

Se precisar configurar a URL da API:

1. **No painel da Vercel:**
   - Vá em **Settings** → **Environment Variables**
   - Adicione:
     - **Name:** `VITE_API_URL`
     - **Value:** `https://sua-api.com/api` (sua URL da API PHP)

2. **Ou via CLI:**
   ```bash
   vercel env add VITE_API_URL
   ```

### Configuração de Build

O arquivo `vercel.json` já está criado e configurado! Ele:
- ✅ Configura rotas para React Router
- ✅ Configura CORS para a API
- ✅ Otimiza o deploy

---

## 🔄 Deploy Automático

Depois do primeiro deploy, **toda vez que você fizer push no Git**, a Vercel faz deploy automático!

```bash
git add .
git commit -m "Atualização"
git push
# Deploy automático! 🚀
```

---

## 📝 Checklist Rápido

- [ ] Código no Git (GitHub/GitLab/Bitbucket)
- [ ] Conta Vercel criada ✅ (você já tem)
- [ ] Conectar repositório na Vercel
- [ ] Clicar em "Deploy"
- [ ] Aguardar (2-3 minutos)
- [ ] Site no ar! 🎉

---

## 🐛 Problemas Comuns

### Erro: "Build Failed"

**Solução:**
- Verifique se todas as dependências estão no `package.json`
- Execute `npm install` localmente primeiro
- Verifique os logs de build na Vercel

### Erro: "Module not found"

**Solução:**
- Certifique-se de que `node_modules` está no `.gitignore`
- Não faça commit do `node_modules`

### Site carrega mas API não funciona

**Solução:**
- Configure a variável de ambiente `VITE_API_URL`
- Ou ajuste o `vite.config.js` antes do deploy

---

## 🎯 Próximos Passos

Depois do deploy:

1. **Testar o site:** Acesse a URL fornecida
2. **Configurar domínio customizado** (opcional):
   - Settings → Domains
   - Adicione seu domínio
3. **Configurar API PHP separadamente** (na Hostinger ou outro servidor)

---

## 💡 Dica Pro

Use **deploy preview** para testar antes de publicar:
- Cada Pull Request gera uma URL de preview
- Teste sem afetar o site principal
- Perfeito para revisar mudanças!

---

**Pronto para fazer o deploy? Siga a Opção 1 (Interface Web) que é mais fácil!** 🚀

