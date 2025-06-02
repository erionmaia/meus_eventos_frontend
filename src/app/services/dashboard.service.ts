import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getDashboardData(): Observable<any> {
    const token = this.authService.token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any>(`${environment.apiUrl}/dashboard`, { headers });
  }
}