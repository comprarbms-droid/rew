# 🌐 Guia de Hospedagem - Dashboard de Remarketing

## ⚠️ Diferença Importante

**PHP tradicional:**
- Você sobe os arquivos `.php` diretamente
- O servidor processa e mostra o site

**React (este projeto):**
- Precisa ser **compilado** primeiro (build)
- Gera arquivos estáticos (HTML, CSS, JS)
- Precisa de um servidor web para servir esses arquivos

## 📦 Opções de Hospedagem

### Opção 1: Hostinger (Recomendado para iniciantes)

A Hostinger suporta React, mas precisa de configuração especial:

#### Passo a Passo:

1. **Fazer o Build do Projeto:**
   ```bash
   npm run build
   ```
   Isso cria uma pasta `dist/` com os arquivos prontos.

2. **Subir na Hostinger:**
   - Acesse o File Manager ou use FTP
   - Suba o conteúdo da pasta `dist/` para a raiz do domínio
   - **IMPORTANTE:** Configure o `.htaccess` (veja abaixo)

3. **Configurar API:**
   - Suba a pasta `api/` também
   - Configure o PHP para processar a API
   - Ajuste as URLs no código

#### Arquivo `.htaccess` necessário:

Crie um arquivo `.htaccess` na raiz com:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Opção 2: Vercel (GRÁTIS e Mais Fácil) ⭐ RECOMENDADO

A Vercel é especializada em React e é **100% gratuita**:

1. **Instalar Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Fazer Deploy:**
   ```bash
   vercel
   ```
   Siga as instruções na tela.

3. **Pronto!** 
   - Site no ar em segundos
   - URL automática (ex: `seu-projeto.vercel.app`)
   - HTTPS automático
   - Deploy automático a cada push no Git

**Vantagens:**
- ✅ Grátis
- ✅ Muito fácil
- ✅ Otimizado para React
- ✅ CDN global
- ✅ HTTPS automático

### Opção 3: Netlify (GRÁTIS - Alternativa)

Similar à Vercel:

1. **Instalar Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Fazer Deploy:**
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

### Opção 4: Hostinger + VPS (Avançado)

Se você já tem Hostinger e quer mais controle:

1. **Contratar VPS na Hostinger**
2. **Instalar Node.js no servidor**
3. **Usar PM2 para manter o servidor rodando:**
   ```bash
   npm install -g pm2
   pm2 start npm --name "remarketing" -- run dev
   ```

## 🔧 Configuração da API PHP

Independente da opção escolhida, você precisa hospedar a API PHP:

### Na Hostinger:

1. **Suba a pasta `api/` para o servidor**
2. **Configure o domínio/subdomínio:**
   - Ex: `api.seudominio.com` apontando para a pasta `api/`
3. **Ajuste o `vite.config.js` ou crie arquivo `.env`:**
   ```env
   VITE_API_URL=https://api.seudominio.com
   ```

### Estrutura Recomendada:

```
seudominio.com/
├── index.html (do build React)
├── assets/ (JS, CSS do React)
└── api/
    ├── index.php
    └── data/
```

## 📝 Checklist de Deploy

### Antes de Subir:

- [ ] Fazer build: `npm run build`
- [ ] Testar localmente: `npm run preview`
- [ ] Configurar variáveis de ambiente (API URL)
- [ ] Criar arquivo `.htaccess` (se usar Hostinger)
- [ ] Subir pasta `dist/` para o servidor
- [ ] Subir pasta `api/` para o servidor
- [ ] Configurar permissões da pasta `api/data/` (chmod 755)
- [ ] Testar API separadamente
- [ ] Configurar CORS na API (se necessário)

## 🚀 Deploy Rápido (Vercel - Recomendado)

```bash
# 1. Instalar Vercel
npm install -g vercel

# 2. No diretório do projeto
vercel

# 3. Seguir instruções
# 4. Pronto! Site no ar
```

## 🔐 Configuração de API Key

Após o deploy, configure a API Key:

1. **No código PHP (`config.php`):**
   ```php
   define('REMARKETING_API_KEY', 'sua-chave-super-secreta-aqui');
   ```

2. **No frontend (localStorage):**
   ```javascript
   localStorage.setItem('api_key', 'sua-chave-super-secreta-aqui');
   ```

## 💡 Recomendação Final

**Para iniciantes:** Use **Vercel** (grátis e fácil)
**Para quem já tem Hostinger:** Use Hostinger para a API PHP + Vercel para o frontend React

## 📞 Suporte

Se tiver dúvidas sobre:
- **Vercel:** https://vercel.com/docs
- **Netlify:** https://docs.netlify.com
- **Hostinger:** Suporte deles

