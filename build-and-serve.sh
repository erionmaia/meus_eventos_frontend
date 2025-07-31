#!/bin/bash

echo "🚀 Iniciando build do projeto Angular..."

# Instalar dependências se necessário
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
fi

# Fazer build do projeto
echo "🔨 Fazendo build..."
npm run build

# Verificar se o build foi bem-sucedido
if [ $? -eq 0 ]; then
    echo "✅ Build concluído com sucesso!"
    echo "📁 Arquivos gerados em: dist/meuseventos/"
    
    # Servir os arquivos estáticos
    echo "🌐 Iniciando servidor..."
    echo "📍 Acesse: http://localhost:8080"
    echo "🛑 Para parar: Ctrl+C"
    
    # Usar Python para servir os arquivos (se disponível)
    if command -v python3 &> /dev/null; then
        cd dist/meuseventos && python3 -m http.server 8080
    elif command -v python &> /dev/null; then
        cd dist/meuseventos && python -m http.server 8080
    else
        echo "❌ Python não encontrado. Instale Python ou use outro servidor."
        echo "💡 Alternativas:"
        echo "   - npx http-server dist/meuseventos -p 8080"
        echo "   - npm install -g http-server && http-server dist/meuseventos -p 8080"
    fi
else
    echo "❌ Erro no build. Verifique os logs acima."
    exit 1
fi 