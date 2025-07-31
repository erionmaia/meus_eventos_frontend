import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Evento {
  id?: string;
  titulo: string;
  descricao?: string;
  data: string;
  hora?: string;
  local?: string;
  tipo?: string;
  status?: string;
  userId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private apiUrl = `${environment.apiUrl}/eventos`;

  constructor(private http: HttpClient) {}

  // Listar todos os eventos do usuário
  getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  // Buscar evento por ID
  getEventoById(id: string): Observable<Evento> {
    return this.http.get<Evento>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Criar novo evento
  criarEvento(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(this.apiUrl, evento)
      .pipe(catchError(this.handleError));
  }

  // Atualizar evento
  atualizarEvento(id: string, evento: Evento): Observable<Evento> {
    return this.http.put<Evento>(`${this.apiUrl}/${id}`, evento)
      .pipe(catchError(this.handleError));
  }

  // Deletar evento
  deletarEvento(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Buscar eventos por status
  getEventosPorStatus(status: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.apiUrl}/status/${status}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Erro ao comunicar com o servidor.';
    
    if (error.error instanceof ErrorEvent) {
      // Erro do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do servidor
      errorMessage = `Código: ${error.status}, Mensagem: ${error.message}`;
    }
    
    return throwError(() => errorMessage);
  }
} 