import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar o título do formulário', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Crie sua conta');
  });

  it('deve validar CPF inválido', () => {
    component.formData.cpf = '123.456.789-00';
    component.validateCPF();
    expect(component.cpfError).toBe('CPF inválido');
  });

  it('deve validar senha forte', () => {
    component.formData.password = 'Abcdef1!';
    component.validatePassword();
    expect(Object.values(component.passwordValid).every(Boolean)).toBeTrue();
  });
});
