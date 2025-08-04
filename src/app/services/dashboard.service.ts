import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getDashboardData(): Observable<any> {
    // TEMPORÁRIO: Mock de dados para testes
    console.log('DashboardService: Retornando dados mock');
    
    const mockData = {
      data: {
        total_eventos_futuros: 3,
        total_convidados: 25,
        totalUserConvidados: 8,
        totalUserEventos: 2
      }
    };
    
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(mockData);
        observer.complete();
      }, 300);
    });
    
    // Descomente as linhas abaixo quando quiser usar o backend real
    // const token = this.authService.token;
    // const headers = new HttpHeaders({
    //   Authorization: `Bearer ${token}`
    // });
    // return this.http.get<any>(`${environment.apiUrl}/dashboard`, { headers });
  }
}