import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  loginData: LoginData = {
    email: '',
    password: '',
    rememberMe: false
  };

  showPassword = false;
  isLoading = false;

  constructor(private router: Router) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  async onSubmit(): Promise<void> {
    if (this.isLoading) return;

    try {
      this.isLoading = true;
      // TODO: Implement your login logic here
      // Example:
      // const response = await this.authService.login(this.loginData);
      // if (response.success) {
      //   this.router.navigate(['/dashboard']);
      // }
      
      // Temporary navigation for testing
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Login error:', error);
      // TODO: Implement error handling
    } finally {
      this.isLoading = false;
    }
  }
} 