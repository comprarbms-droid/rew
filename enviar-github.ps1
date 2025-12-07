# Script para enviar arquivos para o GitHub
# Execute este arquivo no PowerShell

Write-Host "🚀 Preparando arquivos para GitHub..." -ForegroundColor Green

# Navegar para a pasta do projeto
Set-Location "C:\Users\PC\Documents\Remarketing"

# Verificar se já é um repositório Git
if (Test-Path .git) {
    Write-Host "✅ Git já inicializado" -ForegroundColor Green
} else {
    Write-Host "📦 Inicializando Git..." -ForegroundColor Yellow
    git init
}

# Adicionar todos os arquivos
Write-Host "📝 Adicionando arquivos..." -ForegroundColor Yellow
git add .

# Fazer commit
Write-Host "💾 Fazendo commit..." -ForegroundColor Yellow
git commit -m "Initial commit - Dashboard de Remarketing"

# Renomear branch para main
Write-Host "🌿 Configurando branch main..." -ForegroundColor Yellow
git branch -M main

Write-Host ""
Write-Host "✅ Arquivos preparados!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 PRÓXIMOS PASSOS:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Crie um repositório no GitHub:" -ForegroundColor White
Write-Host "   - Vá em github.com" -ForegroundColor Gray
Write-Host "   - Clique em 'New repository'" -ForegroundColor Gray
Write-Host "   - Nome: remarketing-dashboard" -ForegroundColor Gray
Write-Host "   - NÃO marque README, .gitignore ou license" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Depois de criar, copie a URL do repositório" -ForegroundColor White
Write-Host "   (algo como: https://github.com/SEU-USUARIO/remarketing-dashboard.git)" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Execute estes comandos (substitua SEU-USUARIO):" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/SEU-USUARIO/remarketing-dashboard.git" -ForegroundColor Yellow
Write-Host "   git push -u origin main" -ForegroundColor Yellow
Write-Host ""
Write-Host "OU use GitHub Desktop (mais fácil):" -ForegroundColor Cyan
Write-Host "   - Baixe: https://desktop.github.com" -ForegroundColor Gray
Write-Host "   - File → Add Local Repository" -ForegroundColor Gray
Write-Host "   - Publish repository" -ForegroundColor Gray
Write-Host ""

