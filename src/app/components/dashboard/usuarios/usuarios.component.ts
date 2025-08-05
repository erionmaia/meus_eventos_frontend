import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

interface NovoUsuario {
  name: string;
  email: string;
  password: string;
  role: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class UsuariosComponent implements OnInit {
  usuariosForm: FormGroup;
  loading = false;
  successMessage = '';
  errorMessage = '';
  showForm = false;
  usuarios: any[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.usuariosForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      role: ['user', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    // Verificar se é super admin
    if (!this.authService.isSuperAdmin()) {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.carregarUsuarios();
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    return null;
  }

  carregarUsuarios(): void {
    // Mock de dados - em produção viria da API
    this.usuarios = [
      { id: 1, name: 'João Silva', email: 'joao@exemplo.com', role: 'user', createdAt: '2024-01-15' },
      { id: 2, name: 'Maria Santos', email: 'maria@exemplo.com', role: 'admin', createdAt: '2024-01-10' },
      { id: 3, name: 'Pedro Costa', email: 'pedro@exemplo.com', role: 'user', createdAt: '2024-01-05' }
    ];
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.usuariosForm.reset({
      role: 'user'
    });
    this.successMessage = '';
    this.errorMessage = '';
  }

  onSubmit(): void {
    if (this.usuariosForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const usuarioData: NovoUsuario = this.usuariosForm.value;

      // Simular chamada para API
      setTimeout(() => {
        // Mock de sucesso
        const novoUsuario = {
          id: this.usuarios.length + 1,
          name: usuarioData.name,
          email: usuarioData.email,
          role: usuarioData.role,
          createdAt: new Date().toISOString().split('T')[0]
        };

        this.usuarios.unshift(novoUsuario);
        this.successMessage = 'Usuário cadastrado com sucesso!';
        this.loading = false;
        this.resetForm();
        this.showForm = false;

        // Limpar mensagem após 3 segundos
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      }, 1000);
    } else {
      this.errorMessage = 'Por favor, corrija os erros no formulário.';
    }
  }

  deletarUsuario(id: number): void {
    if (confirm('Tem certeza que deseja deletar este usuário?')) {
      this.usuarios = this.usuarios.filter(u => u.id !== id);
      this.successMessage = 'Usuário deletado com sucesso!';
      
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    }
  }

  getRoleText(role: string): string {
    switch (role) {
      case 'superAdmin': return 'Super Admin';
      case 'admin': return 'Administrador';
      case 'user': return 'Usuário';
      default: return role;
    }
  }

  getRoleClass(role: string): string {
    switch (role) {
      case 'superAdmin': return 'role-super-admin';
      case 'admin': return 'role-admin';
      case 'user': return 'role-user';
      default: return 'role-user';
    }
  }
} 