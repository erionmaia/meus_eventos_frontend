import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { DashboardService } from '../../services/dashboard.service';
import { ThemeService } from '../../services/theme.service';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule]
})
export class DashboardComponent {
  userEmail = '';
  totalUserEventos = 0;
  totalUserConvidados = 0;
  dashboardData: any;
  loading = true;
  error = '';
  isEventFormOpen = false;
  window = window; // Para debug
  console = console; // Para debug

  constructor(
    private auth: AuthService, 
    private dashboardService: DashboardService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    console.log('=== DashboardComponent inicializado ===');
    console.log('URL atual:', window.location.href);
    
    this.dashboardService.getDashboardData().subscribe({
      next: (data) => {
        console.log('data: ', data);
        this.dashboardData = data.data;
        this.loading = false;
        console.log('dashboardData: ', this.dashboardData);
      },
      error: (err) => {
        console.error('Erro no dashboard:', err);
        this.error = 'Erro ao carregar dados do dashboard';
        this.loading = false;
      }
    });

    // Escutar mudanças no estado do formulário de eventos
    this.themeService.isEventFormOpen$.subscribe(isOpen => {
      console.log('Estado do formulário de eventos mudou:', isOpen);
      this.isEventFormOpen = isOpen;
    });
  }
}
