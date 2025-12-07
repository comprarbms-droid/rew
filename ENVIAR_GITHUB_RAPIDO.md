# ⚡ Enviar para GitHub - Método Rápido

## 🎯 Você está vendo "Projects"? Precisa ir para "Repositories"!

### Passo 1: Criar Repositório

1. **Clique no seu perfil** (canto superior direito do GitHub)
2. **Clique em "Your repositories"**
3. **Clique no botão verde "New"**
4. **Nome:** `remarketing-dashboard`
5. **NÃO marque nada** (README, .gitignore, license)
6. **Clique em "Create repository"**

### Passo 2: Executar Script Automático

**Opção A: PowerShell (Fácil)**

1. Abra PowerShell na pasta do projeto
2. Execute:
   ```powershell
   .\enviar-github.ps1
   ```
3. Siga as instruções que aparecerem

**Opção B: Comandos Manuais**

Cole tudo no PowerShell:

```powershell
cd C:\Users\PC\Documents\Remarketing
git init
git add .
git commit -m "Initial commit"
git branch -M main
```

### Passo 3: Conectar e Enviar

**No GitHub**, depois de criar o repositório, você verá uma página com comandos.

**Copie a URL** (algo como: `https://github.com/comprarbms-droid/remarketing-dashboard.git`)

**No PowerShell**, execute (SUBSTITUA pela sua URL):

```powershell
git remote add origin https://github.com/comprarbms-droid/remarketing-dashboard.git
git push -u origin main
```

### Passo 4: Autenticação

Se pedir login:
- **Usuário:** seu nome de usuário do GitHub
- **Senha:** use um **Personal Access Token** (não a senha normal)

**Como criar token:**
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token
3. Marque `repo` (todas as permissões de repositório)
4. Copie o token e use como senha

---

## 🖥️ MÉTODO MAIS FÁCIL: GitHub Desktop

**Se preferir interface gráfica (RECOMENDADO):**

1. **Baixe:** https://desktop.github.com
2. **Instale e faça login**
3. **File → Add Local Repository**
4. **Escolha:** `C:\Users\PC\Documents\Remarketing`
5. **Clique em "Publish repository"**
6. **Nome:** `remarketing-dashboard`
7. **Público/Privado:** Sua escolha
8. **Clique em "Publish repository"**

**PRONTO! Arquivos enviados!** ✅

---

## ✅ Depois de Enviar

1. **Volte para o GitHub** e veja seus arquivos
2. **Vá para a Vercel**
3. **Import Git Repository**
4. **Selecione seu repositório**
5. **Deploy!** 🚀

---

## 🆘 Problemas?

### "Authentication failed"
→ Use Personal Access Token como senha

### "Repository not found"  
→ Verifique se criou o repositório e se a URL está correta

### "Nothing to commit"
→ Já está tudo commitado, pode fazer push direto

---

**Recomendação: Use GitHub Desktop (muito mais fácil!)** 🖥️

