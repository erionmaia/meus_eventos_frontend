import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
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

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.userName = 'Erion'; //this.auth.getUserName();
  }

  logout() {
    this.auth.logout();
  }
}
