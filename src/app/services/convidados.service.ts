import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ConvidadosService {
  private apiUrl = 'https://meus-eventos-backend.onrender.com/daisyEArthur';

  constructor(private http: HttpClient) {}

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
