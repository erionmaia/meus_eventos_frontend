import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    // TEMPORÁRIO: Permitir acesso para testes
    console.log('AuthGuard: Verificando autenticação...');
    console.log('AuthGuard: isAuthenticated =', this.auth.isAuthenticated());
    
    if (this.auth.isAuthenticated()) {
      console.log('AuthGuard: Usuário autenticado, permitindo acesso');
      return true;
    }

    // Para testes, vamos simular um usuário autenticado
    console.log('AuthGuard: Usuário não autenticado, mas permitindo acesso para testes');
    
    // Simular dados de usuário para testes
    const mockUser = {
      id: 1,
      name: 'Usuário Teste',
      email: 'teste@exemplo.com',
      role: 'user'
    };
    
    const mockAuthResponse = {
      user: mockUser,
      token: 'mock-token-123',
      expiresIn: 3600
    };
    
    this.auth.setSession(mockAuthResponse);
    return true;
    
    // Descomente as linhas abaixo quando quiser reativar a autenticação real
    // this.router.navigate(['/login']);
    // return false;
  }
} 