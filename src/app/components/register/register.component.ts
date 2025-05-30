import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  formData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    cpf: '',
    birthdate: ''
  };
  cpfError: string | null = null;
  birthdateError: string | null = null;
  serverError: string | null = null;
  passwordValid = {
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false
  };
  confirmPasswordError: string | null = null;
  showPassword = false;
  showConfirmPassword = false;

  // Validação local do CPF (formato e dígitos verificadores)
  validateCPF() {
    const cpf = this.formData.cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      this.cpfError = 'CPF inválido';
      return false;
    }
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) {
      this.cpfError = 'CPF inválido';
      return false;
    }
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[10])) {
      this.cpfError = 'CPF inválido';
      return false;
    }
    this.cpfError = null;
    return true;
  }

  // Máscara para data de nascimento no formato dd/mm/aaaa
  onBirthdateInput() {
    let v = this.formData.birthdate.replace(/\D/g, '').slice(0, 8);
    if (v.length >= 5) v = v.replace(/(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3');
    else if (v.length >= 3) v = v.replace(/(\d{2})(\d{0,2})/, '$1/$2');
    this.formData.birthdate = v;
  }

  // Validação da data de nascimento (maior de 18 anos, formato dd/mm/aaaa)
  validateBirthdate() {
    if (!this.formData.birthdate) {
      this.birthdateError = 'Data de nascimento obrigatória';
      return false;
    }
    const parts = this.formData.birthdate.split('/');
    if (parts.length !== 3 || parts[0].length !== 2 || parts[1].length !== 2 || parts[2].length !== 4) {
      this.birthdateError = 'Data inválida. Use o formato dd/mm/aaaa';
      return false;
    }
    const [day, month, year] = parts.map(Number);
    const birth = new Date(year, month - 1, day);
    if (isNaN(birth.getTime()) || birth.getDate() !== day || birth.getMonth() !== month - 1 || birth.getFullYear() !== year) {
      this.birthdateError = 'Data inválida.';
      return false;
    }
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    if (
      age < 18 ||
      (age === 18 &&
        (today.getMonth() < birth.getMonth() ||
          (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())))
    ) {
      this.birthdateError = 'Você deve ter pelo menos 18 anos';
      return false;
    }
    this.birthdateError = null;
    return true;
  }

  validatePassword() {
    const pwd = this.formData.password || '';
    this.passwordValid.length = pwd.length >= 8;
    this.passwordValid.upper = /[A-Z]/.test(pwd);
    this.passwordValid.lower = /[a-z]/.test(pwd);
    this.passwordValid.number = /[0-9]/.test(pwd);
    this.passwordValid.special = /[^A-Za-z0-9]/.test(pwd);
    this.validateConfirmPassword();
  }

  validateConfirmPassword() {
    if (!this.formData.confirmPassword) {
      this.confirmPasswordError = null;
      return;
    }
    if (this.formData.password !== this.formData.confirmPassword) {
      this.confirmPasswordError = 'As senhas não coincidem';
    } else {
      this.confirmPasswordError = null;
    }
  }

  togglePasswordVisibility(field: 'password' | 'confirm') {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  // Simulação de envio para o backend
  onSubmit() {
    this.serverError = null;
    this.validatePassword();
    this.validateConfirmPassword();
    if (
      !this.validateCPF() ||
      !this.validateBirthdate() ||
      Object.values(this.passwordValid).includes(false) ||
      this.confirmPasswordError
    ) return;
    // Aqui você faria a chamada HTTP para o backend
    alert('Cadastro enviado! (Aqui faria a validação real no backend)');
  }
}
