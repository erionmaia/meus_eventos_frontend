# Deploy em Produção - Solução para "Cannot GET /"

## 🔍 **Problema Identificado**

O erro "Cannot GET /" acontece porque o servidor web não está configurado para **Single Page Applications (SPA)** do Angular.

## ✅ **Soluções Implementadas**

### 1. **Arquivos de Configuração Criados**

#### **Para Apache (.htaccess)**
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

#### **Para IIS (web.config)**
```xml
<rule name="Angular Routes" stopProcessing="true">
  <match url=".*" />
  <conditions logicalGrouping="MatchAll">
    <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
    <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
  </conditions>
  <action type="Rewrite" url="/" />
</rule>
```

### 2. **Script de Build e Deploy**

Execute o script criado:
```bash
./build-and-serve.sh
```

## 🚀 **Como Fazer o Deploy**

### **Opção 1: Usando o Script Automático**
```bash
# No diretório do projeto
./build-and-serve.sh
```

### **Opção 2: Manual**
```bash
# 1. Fazer build
npm run build

# 2. Entrar na pasta dist
cd dist/meuseventos

# 3. Servir os arquivos
python3 -m http.server 8080
# ou
npx http-server -p 8080
```

### **Opção 3: Para Produção Real**

#### **Apache**
1. Fazer build: `npm run build`
2. Copiar arquivos de `dist/meuseventos/` para o servidor
3. Copiar `.htaccess` para a raiz do servidor
4. Configurar o Apache para usar o `.htaccess`

#### **Nginx**
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

#### **IIS**
1. Fazer build: `npm run build`
2. Copiar arquivos de `dist/meuseventos/` para o servidor
3. Copiar `web.config` para a raiz do servidor

## 🔧 **Verificações Importantes**

### **1. Build de Produção**
```bash
# Verificar se o build funciona
npm run build

# Verificar se os arquivos foram gerados
ls -la dist/meuseventos/
```

### **2. Estrutura de Arquivos**
Após o build, você deve ter:
```
dist/meuseventos/
├── index.html
├── main.js
├── polyfills.js
├── runtime.js
├── styles.css
└── assets/
```

### **3. Teste Local**
```bash
# Testar localmente antes do deploy
cd dist/meuseventos
python3 -m http.server 8080
# Acesse: http://localhost:8080
```

## 🐛 **Troubleshooting**

### **Erro: "Cannot GET /"**
- ✅ Verificar se o `.htaccess` ou `web.config` está na raiz
- ✅ Verificar se o servidor suporta rewrite rules
- ✅ Verificar se o `index.html` existe na raiz

### **Erro: "404 Not Found"**
- ✅ Verificar se todos os arquivos foram copiados
- ✅ Verificar permissões de arquivo
- ✅ Verificar configuração do servidor

### **Erro: "500 Internal Server Error"**
- ✅ Verificar logs do servidor
- ✅ Verificar sintaxe do `.htaccess` ou `web.config`
- ✅ Verificar se o mod_rewrite está habilitado (Apache)

## 📋 **Checklist de Deploy**

- [ ] Build executado com sucesso
- [ ] Arquivos copiados para o servidor
- [ ] `.htaccess` ou `web.config` na raiz
- [ ] Servidor configurado para SPA
- [ ] Teste de todas as rotas
- [ ] Verificação de assets (CSS, JS, imagens)

## 🌐 **URLs de Teste**

Após o deploy, teste estas rotas:
- ✅ `/` - Página inicial
- ✅ `/login` - Página de login
- ✅ `/register` - Página de registro (em manutenção)
- ✅ `/dashboard` - Dashboard (requer login)
- ✅ `/pricing` - Página de preços
- ✅ `/services` - Página de serviços

## 📞 **Suporte**

Se ainda houver problemas:
1. Verificar logs do servidor
2. Testar localmente primeiro
3. Verificar configuração do servidor web
4. Consultar documentação do Angular sobre deploy 