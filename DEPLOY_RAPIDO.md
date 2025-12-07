# 🚀 Deploy Rápido - 3 Opções

## ⚡ Opção 1: Vercel (MAIS FÁCIL - 2 minutos)

```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Fazer login
vercel login

# 3. Deploy
vercel

# Pronto! Site no ar em segundos
```

**Vantagens:**
- ✅ Grátis
- ✅ HTTPS automático
- ✅ CDN global
- ✅ Deploy automático via Git

---

## 🌐 Opção 2: Hostinger (Tradicional)

### Passo a Passo:

1. **Fazer Build:**
   ```bash
   npm run build
   ```

2. **Subir arquivos:**
   - Acesse File Manager ou FTP
   - Suba **todo o conteúdo** da pasta `dist/` para a raiz do domínio
   - Suba também a pasta `api/` para o servidor

3. **Configurar:**
   - O arquivo `.htaccess` já está criado (vai junto com o build)
   - Configure permissões da pasta `api/data/` (chmod 755)

4. **Ajustar API URL:**
   - Edite `vite.config.js` antes do build:
   ```js
   // Altere para sua URL
   VITE_API_URL=https://seudominio.com/api
   ```

---

## 🆓 Opção 3: Netlify (Alternativa Grátis)

```bash
# 1. Instalar Netlify CLI
npm install -g netlify-cli

# 2. Build
npm run build

# 3. Deploy
netlify deploy --prod --dir=dist
```

---

## 📋 Checklist Rápido

- [ ] `npm run build` (gera pasta `dist/`)
- [ ] Testar local: `npm run preview`
- [ ] Escolher plataforma (Vercel/Hostinger/Netlify)
- [ ] Fazer deploy
- [ ] Configurar API PHP separadamente
- [ ] Testar site no ar

---

## 💡 Qual escolher?

| Plataforma | Dificuldade | Custo | Melhor Para |
|------------|-------------|-------|-------------|
| **Vercel** | ⭐ Fácil | Grátis | Iniciantes |
| **Netlify** | ⭐ Fácil | Grátis | Alternativa |
| **Hostinger** | ⭐⭐ Média | Pago | Quem já tem conta |

**Recomendação:** Comece com **Vercel** (mais fácil) e depois migre se necessário.

