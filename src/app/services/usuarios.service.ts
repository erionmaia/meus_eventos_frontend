import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Usuario {
  id?: string;
  nome: string;
  email: string;
  telefone?: string;
  cpf?: string;
  dataNascimento?: string;
  endereco?: {
    rua?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
    cep?: string;
  };
  configuracoes?: {
    notificacoes?: boolean;
    tema?: string;
    idioma?: string;
  };
}

export interface AlterarSenhaRequest {
  senhaAtual: string;
  novaSenha: string;
  confirmarSenha: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) {}

  // Buscar perfil do usuário atual
  getPerfil(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/perfil`)
      .pipe(catchError(this.handleError));
  }

  // Atualizar perfil do usuário
  atualizarPerfil(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/perfil`, usuario)
      .pipe(catchError(this.handleError));
  }

  // Alterar senha
  alterarSenha(request: AlterarSenhaRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/alterar-senha`, request)
      .pipe(catchError(this.handleError));
  }

  // Upload de foto de perfil
  uploadFoto(foto: File): Observable<any> {
    const formData = new FormData();
    formData.append('foto', foto);
    
    return this.http.post(`${this.apiUrl}/foto`, formData)
      .pipe(catchError(this.handleError));
  }

  // Buscar estatísticas do usuário
  getEstatisticas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/estatisticas`)
      .pipe(catchError(this.handleError));
  }

  // Atualizar configurações do usuário
  atualizarConfiguracoes(configuracoes: any): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.apiUrl}/configuracoes`, configuracoes)
      .pipe(catchError(this.handleError));
  }

  // Deletar conta
  deletarConta(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/conta`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Erro ao comunicar com o servidor.';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      errorMessage = `Código: ${error.status}, Mensagem: ${error.message}`;
    }
    
    return throwError(() => errorMessage);
  }
} 