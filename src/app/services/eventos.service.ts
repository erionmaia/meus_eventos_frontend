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
    // TEMPORÁRIO: Mock de dados para testes
    console.log('EventosService: Retornando dados mock');
    
    const mockEventos: Evento[] = [
      {
        id: '1',
        titulo: 'Aniversário da Maria',
        descricao: 'Festa de aniversário da Maria com tema tropical',
        data: '2024-02-15',
        hora: '19:00',
        local: 'Casa da Maria',
        tipo: 'aniversario',
        status: 'ativo',
        userId: '1'
      },
      {
        id: '2',
        titulo: 'Reunião Corporativa',
        descricao: 'Reunião trimestral da empresa',
        data: '2024-02-20',
        hora: '14:00',
        local: 'Sala de Conferências',
        tipo: 'corporativo',
        status: 'ativo',
        userId: '1'
      }
    ];
    
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(mockEventos);
        observer.complete();
      }, 500); // Simular delay de rede
    });
    
    // Descomente a linha abaixo quando quiser usar o backend real
    // return this.http.get<Evento[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  // Buscar evento por ID
  getEventoById(id: string): Observable<Evento> {
    return this.http.get<Evento>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Criar novo evento
  criarEvento(evento: Evento): Observable<Evento> {
    // TEMPORÁRIO: Mock para testes
    console.log('EventosService: Criando evento mock:', evento);
    
    const novoEvento: Evento = {
      ...evento,
      id: Date.now().toString(), // Gerar ID único
      status: evento.status || 'ativo',
      userId: evento.userId || '1'
    };
    
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(novoEvento);
        observer.complete();
      }, 300); // Simular delay de rede
    });
    
    // Descomente a linha abaixo quando quiser usar o backend real
    // return this.http.post<Evento>(this.apiUrl, evento).pipe(catchError(this.handleError));
  }

  // Atualizar evento
  atualizarEvento(id: string, evento: Evento): Observable<Evento> {
    // TEMPORÁRIO: Mock para testes
    console.log('EventosService: Atualizando evento mock:', { id, evento });
    
    const eventoAtualizado: Evento = {
      ...evento,
      id: id,
      status: evento.status || 'ativo',
      userId: evento.userId || '1'
    };
    
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(eventoAtualizado);
        observer.complete();
      }, 300); // Simular delay de rede
    });
    
    // Descomente a linha abaixo quando quiser usar o backend real
    // return this.http.put<Evento>(`${this.apiUrl}/${id}`, evento).pipe(catchError(this.handleError));
  }

  // Deletar evento
  deletarEvento(id: string): Observable<any> {
    // TEMPORÁRIO: Mock para testes
    console.log('EventosService: Deletando evento mock com ID:', id);
    
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({ success: true, message: 'Evento deletado com sucesso' });
        observer.complete();
      }, 200); // Simular delay de rede
    });
    
    // Descomente a linha abaixo quando quiser usar o backend real
    // return this.http.delete(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
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