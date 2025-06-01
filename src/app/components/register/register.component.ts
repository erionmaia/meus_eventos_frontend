import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

function maskCPF(value: string): string {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    .slice(0, 14);
}

function maskDate(value: string): string {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .slice(0, 10);
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, RouterLink]
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  error = '';
  showPassword = false;
  showConfirmPassword = false;

  passwordTouched = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      birthDate: ['', [Validators.required, Validators.pattern(/^\d{2}\/\d{2}\/\d{4}$/)]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)
      ]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  // Máscara CPF
  onCPFInput(event: any) {
    const value = event.target.value;
    this.registerForm.get('cpf')?.setValue(maskCPF(value), { emitEvent: false });
  }

  // Máscara Data
  onBirthDateInput(event: any) {
    const value = event.target.value;
    this.registerForm.get('birthDate')?.setValue(maskDate(value), { emitEvent: false });
  }

  // Requisitos de senha
  get passwordValue(): string {
    return this.registerForm.get('password')?.value || '';
  }
  get passwordHasMinLength(): boolean {
    return this.passwordValue.length >= 8;
  }
  get passwordHasUpper(): boolean {
    return /[A-Z]/.test(this.passwordValue);
  }
  get passwordHasLower(): boolean {
    return /[a-z]/.test(this.passwordValue);
  }
  get passwordHasNumber(): boolean {
    return /\d/.test(this.passwordValue);
  }
  get passwordHasSpecial(): boolean {
    return /[^A-Za-z0-9]/.test(this.passwordValue);
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onPasswordInput(): void {
    this.passwordTouched = true;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.error = '';
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/login']);
    }, 1000);
  }
}
