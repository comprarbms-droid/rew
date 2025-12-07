# 📤 Como Enviar Arquivos para o GitHub

## 🎯 Passo a Passo Completo

### Passo 1: Criar Repositório no GitHub

1. **Saia da tela de Projects** (você está vendo "Projects", precisa ir para "Repositories")
2. **Clique no seu perfil** (canto superior direito)
3. **Clique em "Your repositories"**
4. **Clique no botão verde "New"** (ou "New repository")
5. **Preencha:**
   - **Repository name:** `remarketing-dashboard` (ou o nome que quiser)
   - **Description:** "Dashboard de Remarketing" (opcional)
   - **Público ou Privado:** Sua escolha
   - **NÃO marque** "Add a README file"
   - **NÃO marque** "Add .gitignore" (já temos)
   - **NÃO marque** "Choose a license"
6. **Clique em "Create repository"**

### Passo 2: Preparar os Arquivos Localmente

Abra o **PowerShell** ou **Terminal** e execute:

```powershell
# Navegar até a pasta do projeto
cd C:\Users\PC\Documents\Remarketing

# Verificar se já tem Git
git status
```

Se der erro "not a git repository", continue:

```powershell
# Inicializar Git
git init

# Adicionar todos os arquivos
git add .

# Fazer primeiro commit
git commit -m "Initial commit - Dashboard de Remarketing"
```

### Passo 3: Conectar com o GitHub

No GitHub, depois de criar o repositório, você verá uma página com instruções. 

**Copie a URL do repositório** (algo como: `https://github.com/comprarbms-droid/remarketing-dashboard.git`)

No terminal, execute:

```powershell
# Conectar com o GitHub (SUBSTITUA pela sua URL)
git remote add origin https://github.com/comprarbms-droid/remarketing-dashboard.git

# Renomear branch para main
git branch -M main

# Enviar arquivos
git push -u origin main
```

### Passo 4: Autenticação

O GitHub pode pedir login:
- Se pedir usuário/senha, use seu **Personal Access Token** (não a senha normal)
- Ou use **GitHub Desktop** (mais fácil)

---

## 🖥️ Opção Mais Fácil: GitHub Desktop

Se preferir interface gráfica:

### 1. Baixar GitHub Desktop
- Acesse: https://desktop.github.com
- Baixe e instale

### 2. Fazer Login
- Abra o GitHub Desktop
- Faça login com sua conta GitHub

### 3. Publicar Repositório
- **File** → **Add Local Repository**
- Escolha a pasta: `C:\Users\PC\Documents\Remarketing`
- Clique em **"Publish repository"**
- Escolha o nome: `remarketing-dashboard`
- Marque se quer público ou privado
- Clique em **"Publish repository"**

**Pronto! Arquivos enviados!** ✅

---

## 📋 Comandos Rápidos (PowerShell)

Se preferir usar terminal, cole tudo de uma vez:

```powershell
cd C:\Users\PC\Documents\Remarketing
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/remarketing-dashboard.git
git push -u origin main
```

**Substitua `SEU-USUARIO` pelo seu nome de usuário do GitHub!**

---

## ⚠️ Problemas Comuns

### Erro: "Authentication failed"

**Solução:**
1. Vá em GitHub → Settings → Developer settings → Personal access tokens
2. Crie um novo token com permissão `repo`
3. Use o token como senha quando pedir

### Erro: "Repository not found"

**Solução:**
- Verifique se o nome do repositório está correto
- Verifique se você tem permissão no repositório

### Erro: "Nothing to commit"

**Solução:**
- Os arquivos já foram commitados
- Pode fazer push direto: `git push -u origin main`

---

## ✅ Depois de Enviar

1. **Volte para o GitHub** e veja seus arquivos
2. **Vá para a Vercel** e conecte esse repositório
3. **Deploy automático!** 🚀

---

## 🎯 Resumo Rápido

1. ✅ Criar repositório no GitHub (New repository)
2. ✅ `git init` na pasta do projeto
3. ✅ `git add .` e `git commit -m "Initial commit"`
4. ✅ `git remote add origin [URL]`
5. ✅ `git push -u origin main`
6. ✅ Pronto!

**Ou use GitHub Desktop (mais fácil)!** 🖥️

