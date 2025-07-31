import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Site {
  id?: string;
  eventoId: string;
  titulo: string;
  descricao?: string;
  tema?: string;
  corPrimaria?: string;
  corSecundaria?: string;
  url?: string;
  ativo?: boolean;
  configuracoes?: any;
}

@Injectable({
  providedIn: 'root'
})
export class SitesService {
  private apiUrl = `${environment.apiUrl}/sites`;

  constructor(private http: HttpClient) {}

  // Listar sites do usuário
  getSites(): Observable<Site[]> {
    return this.http.get<Site[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  // Buscar site por ID
  getSiteById(id: string): Observable<Site> {
    return this.http.get<Site>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Buscar site por evento
  getSitePorEvento(eventoId: string): Observable<Site> {
    return this.http.get<Site>(`${this.apiUrl}/evento/${eventoId}`)
      .pipe(catchError(this.handleError));
  }

  // Criar novo site
  criarSite(site: Site): Observable<Site> {
    return this.http.post<Site>(this.apiUrl, site)
      .pipe(catchError(this.handleError));
  }

  // Atualizar site
  atualizarSite(id: string, site: Site): Observable<Site> {
    return this.http.put<Site>(`${this.apiUrl}/${id}`, site)
      .pipe(catchError(this.handleError));
  }

  // Deletar site
  deletarSite(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Ativar/desativar site
  toggleSiteStatus(id: string, ativo: boolean): Observable<Site> {
    return this.http.patch<Site>(`${this.apiUrl}/${id}/status`, { ativo })
      .pipe(catchError(this.handleError));
  }

  // Atualizar configurações do site
  atualizarConfiguracoes(id: string, configuracoes: any): Observable<Site> {
    return this.http.patch<Site>(`${this.apiUrl}/${id}/configuracoes`, { configuracoes })
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