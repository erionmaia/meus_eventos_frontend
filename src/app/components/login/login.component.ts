import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, RouterLink]
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error = '';
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    const { email, password } = this.loginForm.value;

    this.loginService.login(email, password).subscribe({
      next: (response) => {
        console.log('response: ', response);
        this.authService.setSession(response);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.error = 'Email ou senha inválidos';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
} 