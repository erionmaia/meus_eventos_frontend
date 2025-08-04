import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EventosService, Evento } from '../../../services/eventos.service';
import { AuthService } from '../../../services/auth.service';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class EventosComponent implements OnInit {
  eventos: Evento[] = [];
  eventoForm: FormGroup;
  showForm = false;
  loading = false;
  error = '';
  success = '';
  isEditing = false;
  eventoEmEdicao: Evento | null = null;

  constructor(
    private eventosService: EventosService,
    private authService: AuthService,
    private themeService: ThemeService,
    private fb: FormBuilder
  ) {
    console.log('=== EventosComponent constructor ===');
    this.eventoForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      descricao: [''],
      data: ['', Validators.required],
      hora: [''],
      local: [''],
      tipo: ['', Validators.required]
    });
    console.log('Formulário criado no constructor:', this.eventoForm);
  }

  ngOnInit(): void {
    console.log('=== EventosComponent inicializado ===');
    console.log('URL atual:', window.location.href);
    console.log('Usuário atual:', this.authService.currentUser);
    console.log('Formulário criado:', this.eventoForm);
    console.log('Show form:', this.showForm);
    this.carregarEventos();
  }

  carregarEventos(): void {
    console.log('Carregando eventos...');
    this.loading = true;
    this.eventosService.getEventos().subscribe({
      next: (eventos) => {
        console.log('Eventos carregados:', eventos);
        this.eventos = eventos;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar eventos:', err);
        this.error = 'Erro ao carregar eventos: ' + err;
        this.loading = false;
      }
    });
  }

  getHeaderTitle(): string {
    if (this.showForm) {
      if (this.isEditing && this.eventoEmEdicao) {
        return `Meus Eventos - ${this.eventoEmEdicao.titulo}`;
      } else {
        return 'Meus Eventos - Novo Evento';
      }
    }
    return 'Meus Eventos';
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    // Comunicar o estado do formulário para o dashboard
    this.themeService.setEventFormOpen(this.showForm);
    
    if (!this.showForm) {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.eventoForm.reset();
    this.isEditing = false;
    this.eventoEmEdicao = null;
    this.error = '';
    this.success = '';
    // Comunicar que o formulário foi fechado
    this.themeService.setEventFormOpen(false);
  }

  editarEvento(evento: Evento): void {
    this.isEditing = true;
    this.eventoEmEdicao = evento;
    this.showForm = true;
    // Comunicar que o formulário foi aberto
    this.themeService.setEventFormOpen(true);
    
    // Preencher o formulário com os dados do evento
    this.eventoForm.patchValue({
      titulo: evento.titulo,
      descricao: evento.descricao || '',
      data: evento.data,
      hora: evento.hora || '',
      local: evento.local || '',
      tipo: evento.tipo
    });
  }

  onSubmit(): void {
    console.log('Tentando salvar evento...');
    console.log('Formulário válido:', this.eventoForm.valid);
    console.log('Valores do formulário:', this.eventoForm.value);
    
    if (this.eventoForm.valid) {
      this.loading = true;
      this.error = '';
      this.success = '';

      const eventoData: Evento = {
        ...this.eventoForm.value,
        status: 'ativo',
        userId: this.authService.currentUser?.id?.toString()
      };

      if (this.isEditing && this.eventoEmEdicao) {
        // Atualizar evento existente
        eventoData.id = this.eventoEmEdicao.id;
        console.log('Atualizando evento:', eventoData);

        this.eventosService.atualizarEvento(this.eventoEmEdicao!.id!, eventoData).subscribe({
          next: (eventoAtualizado) => {
            console.log('Evento atualizado com sucesso:', eventoAtualizado);
            const index = this.eventos.findIndex(e => e.id === eventoAtualizado.id);
            if (index !== -1) {
              this.eventos[index] = eventoAtualizado;
            }
            this.success = 'Evento atualizado com sucesso!';
            this.resetForm();
            this.showForm = false;
            this.loading = false;
          },
          error: (err) => {
            console.error('Erro ao atualizar evento:', err);
            this.error = 'Erro ao atualizar evento: ' + err;
            this.loading = false;
          }
        });
      } else {
        // Criar novo evento
        console.log('Criando novo evento:', eventoData);

        this.eventosService.criarEvento(eventoData).subscribe({
          next: (evento) => {
            console.log('Evento criado com sucesso:', evento);
            this.eventos.unshift(evento);
            this.success = 'Evento criado com sucesso!';
            this.resetForm();
            this.showForm = false;
            this.loading = false;
          },
          error: (err) => {
            console.error('Erro ao criar evento:', err);
            this.error = 'Erro ao criar evento: ' + err;
            this.loading = false;
          }
        });
      }
    } else {
      console.log('Formulário inválido, marcando campos como touched');
      this.markFormGroupTouched();
    }
  }

  deletarEvento(id: string): void {
    if (confirm('Tem certeza que deseja deletar este evento?')) {
      this.eventosService.deletarEvento(id).subscribe({
        next: () => {
          this.eventos = this.eventos.filter(e => e.id !== id);
          this.success = 'Evento deletado com sucesso!';
        },
        error: (err) => {
          this.error = 'Erro ao deletar evento: ' + err;
        }
      });
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.eventoForm.controls).forEach(key => {
      const control = this.eventoForm.get(key);
      control?.markAsTouched();
    });
  }

  getEventoStatusClass(status: string): string {
    switch (status) {
      case 'ativo': return 'status-ativo';
      case 'cancelado': return 'status-cancelado';
      case 'finalizado': return 'status-finalizado';
      default: return 'status-padrao';
    }
  }

  formatarData(data: string): string {
    return new Date(data).toLocaleDateString('pt-BR');
  }

  formatarHora(hora: string): string {
    if (!hora) return '';
    return hora.substring(0, 5);
  }
}
