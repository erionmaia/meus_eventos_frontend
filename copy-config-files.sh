#!/bin/bash

echo "📁 Copiando arquivos de configuração para o build..."

# Aguardar um pouco para garantir que o build terminou
sleep 3

# Verificar se o build existe
if [ ! -d "dist/meuseventos" ]; then
    echo "❌ Diretório dist/meuseventos não encontrado. Execute 'npm run build' primeiro."
    exit 1
fi

# Copiar arquivos de configuração
echo "📋 Copiando _redirects..."
cp _redirects dist/meuseventos/

echo "📋 Copiando _headers..."
cp _headers dist/meuseventos/

echo "📋 Copiando .htaccess..."
cp .htaccess dist/meuseventos/

echo "📋 Copiando web.config..."
cp web.config dist/meuseventos/

echo "✅ Arquivos de configuração copiados com sucesso!"
echo "📁 Localização: dist/meuseventos/"
echo ""
echo "📋 Arquivos copiados:"
ls -la dist/meuseventos/_redirects dist/meuseventos/_headers dist/meuseventos/.htaccess dist/meuseventos/web.config 2>/dev/null || echo "Alguns arquivos podem não existir" 