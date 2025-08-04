import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Convidado {
  id?: string;
  eventId: string;
  name: string;
  groupId?: string;
  email?: string;
  phone?: string;
  sent?: boolean;
  confirmed?: boolean;
  sendMethod?: string;
  confirmationToken?: string;
  sentAt?: string;
}

@Injectable({
  providedIn: 'root'
})

export class ConvidadosService {
  private apiUrl = 'https://meus-eventos-backend.onrender.com/api-eventomeu/';

  constructor(private http: HttpClient) {}

  getConvidados(): Observable<Convidado[]> {
    console.log('EventosService: Retornando dados mock');
    
    const mockConvidados: Convidado[] = [
      {
          id: '1',
          eventId: '1',
          name: 'Maria',
          groupId: '1',
          email: 'maria@gmail.com',
          phone: '1234567890',
          sent: true,
          confirmed: true,
          sendMethod: 'email',
          confirmationToken: '1234567890',
          sentAt: '2024-02-15'
      },
      {
        id: '2',
        eventId: '1',
        name: 'João',
        groupId: '1',
        email: 'joao@gmail.com',
        phone: '1234567890',
        sent: true,
        confirmed: false,
        sendMethod: 'email',
        confirmationToken: '1234567890',
        sentAt: '2024-02-15'
      },
      {
        id: '3',
        eventId: '1',
        name: 'Pedro',
        groupId: '2',
        email: 'pedro@gmail.com',
        phone: '551193013910',
        sent: false,
        confirmed: false,
        sendMethod: 'email',
        confirmationToken: '1234567890',
        sentAt: '2024-02-15'
      },
      {
        id: '4',
        eventId: '1',
        name: 'Ana',
        groupId: '3',
        email: 'ana@gmail.com',
        phone: '551189787397',
        sent: false,
        confirmed: false,
        sendMethod: 'email',
        confirmationToken: '1234567890',
        sentAt: '2024-02-15'
      },
      {
        id: '5',
        eventId: '2',
        name: 'Joana',
        email: 'joana@gmail.com',
        phone: '551189765432',
        sent: true,
        confirmed: false,
        sendMethod: 'email',
        confirmationToken: '0987654321',
        sentAt: '2024-02-15'
      }
    ];
    
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(mockConvidados);
        observer.complete();
      }, 500); // Simular delay de rede
    });
    
    // Descomente a linha abaixo quando quiser usar o backend real
    // return this.http.get<Evento[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  getConvidadoById(idConvidados: string, idEventos: string, idGrupoConvidados?: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/eventos/${idEventos}/convidados/${idConvidados}${idGrupoConvidados ? '?idGrupoConvidados='+idGrupoConvidados : ''}`)
      .pipe(catchError(this.handleError));
  }

  getConvidadoConfirmado(idConvidados: string, idEventos: string, idGrupoConvidado?: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/eventos/${idEventos}/listarConfirmados/${idConvidados}${idGrupoConvidado ? '?idGrupoConvidado='+idGrupoConvidado : ''}`)
      .pipe(catchError(this.handleError));
  }

  getConvidadosConfirmados(idEventos: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/eventos/${idEventos}/listarConfirmados`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error.error || 'Erro ao comunicar com o servidor.');
  }

  // Confirmar presenças
  confirmarPresenca(convidados: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/confirmacao-presenca`, { convidados });
  }
}
