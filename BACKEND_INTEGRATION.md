# Integração Backend-Frontend

## Status da Conexão

✅ **Configuração Completa**

### Estrutura Implementada

#### 1. **Configuração de Proxy**
- Arquivo: `proxy.conf.json`
- Redireciona chamadas `/api-eventomeu` para `http://localhost:3000`
- Configurado no `angular.json`

#### 2. **Environment Files**
- `src/environments/environment.ts` (desenvolvimento)
- `src/environments/environment.prod.ts` (produção)

#### 3. **Serviços HTTP Implementados**

##### Autenticação
- `AuthService`: Gerenciamento de tokens e sessão
- `LoginService`: Login com backend
- `AuthInterceptor`: Adiciona token automaticamente nas requisições

##### Funcionalidades do Dashboard
- `EventosService`: CRUD de eventos
- `SitesService`: Gerenciamento de sites de eventos
- `UsuariosService`: Perfil e configurações do usuário
- `ConvidadosService`: Gerenciamento de convidados
- `DashboardService`: Dados gerais do dashboard

##### Utilitários
- `NotificationService`: Sistema de notificações
- `AuthGuard`: Proteção de rotas

## Como Usar

### 1. **Fazer Requisições HTTP**

```typescript
// Exemplo de uso em um componente
import { EventosService } from '../services/eventos.service';

export class MeuComponente {
  constructor(private eventosService: EventosService) {}

  carregarEventos() {
    this.eventosService.getEventos().subscribe({
      next: (eventos) => {
        console.log('Eventos carregados:', eventos);
      },
      error: (erro) => {
        console.error('Erro ao carregar eventos:', erro);
      }
    });
  }
}
```

### 2. **Sistema de Notificações**

```typescript
import { NotificationService } from '../services/notification.service';

export class MeuComponente {
  constructor(private notificationService: NotificationService) {}

  mostrarSucesso() {
    this.notificationService.success('Operação realizada com sucesso!');
  }

  mostrarErro() {
    this.notificationService.error('Erro ao realizar operação');
  }
}
```

### 3. **Autenticação Automática**

O `AuthInterceptor` adiciona automaticamente o token em todas as requisições:

```typescript
// Não precisa adicionar manualmente o token
this.http.get('/api-eventomeu/eventos'); // Token adicionado automaticamente
```

## Endpoints Esperados no Backend

### Autenticação
- `POST /api-eventomeu/login` - Login
- `POST /api-eventomeu/register` - Registro

### Eventos
- `GET /api-eventomeu/eventos` - Listar eventos
- `POST /api-eventomeu/eventos` - Criar evento
- `PUT /api-eventomeu/eventos/:id` - Atualizar evento
- `DELETE /api-eventomeu/eventos/:id` - Deletar evento

### Sites
- `GET /api-eventomeu/sites` - Listar sites
- `POST /api-eventomeu/sites` - Criar site
- `PUT /api-eventomeu/sites/:id` - Atualizar site
- `DELETE /api-eventomeu/sites/:id` - Deletar site

### Usuários
- `GET /api-eventomeu/usuarios/perfil` - Perfil do usuário
- `PUT /api-eventomeu/usuarios/perfil` - Atualizar perfil
- `POST /api-eventomeu/usuarios/alterar-senha` - Alterar senha

### Convidados
- `GET /api-eventomeu/eventos/:id/convidados` - Listar convidados
- `POST /api-eventomeu/eventos/:id/convidados` - Adicionar convidado
- `PUT /api-eventomeu/eventos/:id/convidados/:convidadoId` - Atualizar convidado

## Configuração do Backend

### 1. **CORS**
Configure o CORS no backend para aceitar requisições do frontend:

```javascript
// Express.js
app.use(cors({
  origin: 'http://localhost:4200', // URL do Angular
  credentials: true
}));
```

### 2. **Autenticação JWT**
O frontend espera tokens JWT no formato:
```
Authorization: Bearer <token>
```

### 3. **Respostas Padrão**
O frontend espera respostas no formato:
```json
{
  "success": true,
  "data": { ... },
  "message": "Operação realizada com sucesso"
}
```

## Testando a Conexão

### 1. **Iniciar o Backend**
```bash
# No diretório do backend
npm start
# ou
node server.js
```

### 2. **Iniciar o Frontend**
```bash
# No diretório meuseventos
ng serve
```

### 3. **Verificar Proxy**
As requisições para `/api-eventomeu/*` serão automaticamente redirecionadas para `http://localhost:3000/api-eventomeu/*`

## Troubleshooting

### Erro de CORS
- Verifique se o backend está configurado para aceitar requisições do `http://localhost:4200`
- Confirme se o proxy está funcionando corretamente

### Token não enviado
- Verifique se o `AuthInterceptor` está registrado no `app.module.ts`
- Confirme se o token está sendo salvo corretamente no `AuthService`

### Erro 401 (Unauthorized)
- O interceptor automaticamente redireciona para `/login`
- Verifique se o token não expirou

## Próximos Passos

1. **Implementar os endpoints no backend** seguindo a estrutura documentada
2. **Testar cada funcionalidade** individualmente
3. **Adicionar validações** nos formulários
4. **Implementar upload de arquivos** para fotos de perfil
5. **Adicionar testes unitários** para os serviços 