# 🎯 Usar Git Direto no Cursor - Guia Completo

## ✅ Sim! Você pode fazer TUDO pelo Cursor!

O Cursor tem integração completa com Git. Não precisa de terminal ou GitHub Desktop!

---

## 🚀 Passo a Passo no Cursor

### Passo 1: Inicializar Git

1. **Abra o Cursor** na pasta do projeto
2. **Clique no ícone de Git** na barra lateral esquerda (ou `Ctrl+Shift+G`)
3. **Clique em "Initialize Repository"** (se aparecer)
   - Ou vá em: **Source Control** → **Initialize Repository**

### Passo 2: Adicionar Arquivos

1. **Na aba Source Control** (ícone Git)
2. Você verá todos os arquivos como "Changes"
3. **Clique no "+"** ao lado de cada arquivo (ou "Stage All Changes")
4. Ou use o atalho: `Ctrl+Enter` para adicionar tudo

### Passo 3: Fazer Commit

1. **Na caixa de texto** no topo da aba Source Control
2. **Digite:** `Initial commit - Dashboard de Remarketing`
3. **Clique em "Commit"** (ou `Ctrl+Enter`)
4. **Marque:** "Always" se quiser pular a confirmação

### Passo 4: Conectar com GitHub

1. **Na aba Source Control**, clique nos **"..."** (três pontos)
2. **Vá em:** "Remote" → "Add Remote"
3. **Nome:** `origin`
4. **URL:** Cole a URL do seu repositório GitHub
   - Exemplo: `https://github.com/comprarbms-droid/remarketing-dashboard.git`
5. **Clique em "Add"**

### Passo 5: Enviar (Push)

1. **Na aba Source Control**, clique nos **"..."** novamente
2. **Vá em:** "Push" → "Push to..."
3. **Escolha:** `origin`
4. **Branch:** `main` (ou `master`)
5. **Pronto!** Arquivos enviados!

---

## 🎨 Interface Visual do Cursor

### Aba Source Control (`Ctrl+Shift+G`)

Você verá:
- **Changes:** Arquivos modificados/não commitados
- **Staged Changes:** Arquivos prontos para commit
- **Branches:** Suas branches
- **Remotes:** Repositórios remotos (GitHub)

### Ícones Importantes:

- **+** = Adicionar ao stage
- **✓** = Commit
- **↗** = Push (enviar)
- **↘** = Pull (baixar)
- **...** = Mais opções

---

## 🔄 Workflow Completo no Cursor

### Primeira Vez (Setup):

1. **Source Control** (`Ctrl+Shift+G`)
2. **Initialize Repository** (se necessário)
3. **Stage All Changes** (+ ao lado de "Changes")
4. **Commit** (digite mensagem e clique em ✓)
5. **...** → **Remote** → **Add Remote**
6. **...** → **Push** → **Push to origin**

### Depois (Atualizações):

1. **Fazer alterações** nos arquivos
2. **Source Control** (`Ctrl+Shift+G`)
3. **Stage All Changes** (+)
4. **Commit** (mensagem + ✓)
5. **...** → **Push** → **Push**

**Muito mais fácil que terminal!** 🎉

---

## 🔐 Autenticação GitHub

Na primeira vez que fizer Push, o Cursor vai pedir:

1. **Login no GitHub**
2. **Autorizar o Cursor**
3. **Pronto!** Não precisa mais fazer login

**Ou use Personal Access Token:**
- GitHub → Settings → Developer settings → Personal access tokens
- Crie um token com permissão `repo`
- Use como senha quando pedir

---

## 📋 Atalhos Úteis

| Ação | Atalho |
|------|--------|
| Abrir Source Control | `Ctrl+Shift+G` |
| Commit | `Ctrl+Enter` (na mensagem) |
| Stage All | `Ctrl+Shift+A` |
| Ver Diff | Clique no arquivo |

---

## 🎯 Criar Repositório no GitHub (Pelo Navegador)

Antes de conectar, você precisa criar o repositório:

1. **Acesse:** github.com
2. **Clique em:** "New repository" (botão verde)
3. **Nome:** `remarketing-dashboard`
4. **NÃO marque:** README, .gitignore, license
5. **Clique em:** "Create repository"
6. **Copie a URL** que aparece
7. **Use essa URL** no Passo 4 acima

---

## ✅ Checklist Rápido

- [ ] Abrir Cursor na pasta do projeto
- [ ] Source Control (`Ctrl+Shift+G`)
- [ ] Initialize Repository (se necessário)
- [ ] Stage All Changes (+)
- [ ] Commit (mensagem + ✓)
- [ ] Criar repositório no GitHub (navegador)
- [ ] Add Remote (URL do GitHub)
- [ ] Push to origin
- [ ] Pronto! 🎉

---

## 🆘 Problemas Comuns

### "Not a git repository"
→ Clique em "Initialize Repository" na Source Control

### "Authentication failed"
→ Use Personal Access Token como senha

### "Remote already exists"
→ Vá em Remote → Remove Remote → Add Remote novamente

### Não aparece o ícone de Git
→ Instale extensão Git (já vem instalada, mas verifique)

---

## 💡 Dica Pro

**Configure o Cursor para fazer commit automático:**
- Settings → Git → Auto Stage
- Agora todo arquivo salvo já vai para stage!

---

## 🎉 Vantagens de Usar Cursor

✅ **Interface visual** (não precisa decorar comandos)  
✅ **Ver mudanças** antes de commitar  
✅ **Diff visual** (ver o que mudou)  
✅ **Tudo em um lugar** (código + Git)  
✅ **Mais rápido** que terminal  

**Perfeito para quem está começando!** 🚀

---

**Agora você pode controlar TUDO pelo Cursor!** 🎯

