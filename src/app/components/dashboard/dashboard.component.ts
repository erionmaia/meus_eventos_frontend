import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DashboardService } from '../../services/dashboard.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [RouterOutlet]
})
export class DashboardComponent {
  userName = '';
  userEmail = '';
  totalUserEventos = 0;
  totalUserConvidados = 0;
  dashboardData: any;
  loading = true;
  error = '';

  constructor(private auth: AuthService, private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getDashboardData().subscribe({
      next: (data) => {
        console.log('data: ', data);
        this.dashboardData = data.data;
        this.loading = false;
        console.log('dashboardData: ', this.dashboardData);
      },
      error: (err) => {
        this.error = 'Erro ao carregar dados do dashboard';
        this.loading = false;
      }
    });
  }

  logout() {
    this.auth.logout();
  }
}
