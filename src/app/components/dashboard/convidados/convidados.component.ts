import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConvidadosService, Convidado } from '../../../services/convidados.service';
import { AuthService } from '../../../services/auth.service';
import { ThemeService } from '../../../services/theme.service';

interface Evento {
  id: string;
  titulo: string;
  data: string;
}

interface ConvidadosPorEvento {
  evento: Evento;
  convidados: Convidado[];
}

@Component({
  selector: 'app-convidados',
  templateUrl: './convidados.component.html',
  styleUrls: ['./convidados.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class ConvidadosComponent implements OnInit { 

  convidados: Convidado[] = [];
  convidadosForm: FormGroup;
  showForm = false;
  loading = false;
  error = '';
  success = '';
  isEditing = false;
  convidadosEmEdicao: Convidado | null = null;
  
  // Propriedades para agrupamento por evento
  eventos: Evento[] = [];
  convidadosPorEvento: ConvidadosPorEvento[] = [];
  eventoSelecionado: string = '';

  constructor(
    private convidadosService: ConvidadosService,
    private authService: AuthService,
    private themeService: ThemeService,
    private fb: FormBuilder
  ) {
      console.log('=== ConvidadosComponent constructor ===');
      this.convidadosForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: [''],
        phone: [''],
        groupId: [''],
        eventId: ['', Validators.required]
      });
      console.log('Formulário criado no constructor:', this.convidadosForm);
    }

    ngOnInit(): void {
      console.log('=== ConvidadosComponent inicializado ===');
      console.log('URL atual:', window.location.href);
      console.log('Usuário atual:', this.authService.currentUser);
      console.log('Formulário:', this.convidadosForm);
      this.carregarEventos();
      this.carregarConvidados();
    }

    carregarEventos(): void {
      // Mock de eventos - em produção viria do serviço de eventos
      this.eventos = [
        { id: '1', titulo: 'Aniversário da Maria', data: '2024-03-15' },
        { id: '2', titulo: 'Casamento João e Ana', data: '2024-06-20' },
        { id: '3', titulo: 'Formatura Pedro', data: '2024-12-10' }
      ];
    }

    carregarConvidados(): void {
      console.log('Carregando convidados...');
      this.loading = true;
      this.convidadosService.getConvidados().subscribe({
        next: (convidados) => {
          console.log('Convidados carregados:', convidados);
          this.convidados = convidados;
          this.agruparConvidadosPorEvento();
          this.loading = false;
        },
        error: (err) => {
          console.error('Erro ao carregar convidados:', err);
          this.error = 'Erro ao carregar convidados: ' + err;
          this.loading = false;
        }
      });
    }

    agruparConvidadosPorEvento(): void {
      this.convidadosPorEvento = [];
      
      // Agrupar convidados por evento
      const convidadosPorEventoMap = new Map<string, Convidado[]>();
      
      this.convidados.forEach(convidado => {
        if (!convidadosPorEventoMap.has(convidado.eventId)) {
          convidadosPorEventoMap.set(convidado.eventId, []);
        }
        convidadosPorEventoMap.get(convidado.eventId)!.push(convidado);
      });

      // Criar array de grupos
      this.eventos.forEach(evento => {
        const convidadosDoEvento = convidadosPorEventoMap.get(evento.id) || [];
        if (convidadosDoEvento.length > 0) {
          this.convidadosPorEvento.push({
            evento: evento,
            convidados: convidadosDoEvento
          });
        }
      });

      // Ordenar por data do evento
      this.convidadosPorEvento.sort((a, b) => 
        new Date(a.evento.data).getTime() - new Date(b.evento.data).getTime()
      );
    }

    getConvidadosFiltrados(): Convidado[] {
      if (this.eventoSelecionado) {
        return this.convidados.filter(c => c.eventId === this.eventoSelecionado);
      }
      
      return this.convidados;
    }

    getEventoById(eventId: string): Evento | undefined {
      return this.eventos.find(e => e.id === eventId);
    }

    getHeaderTitle(): string {
      return this.isEditing ? 'Editar Convidado' : 'Gerenciar Convidados';
    }

    // Métodos para estatísticas
    getConvidadosConfirmados(): number {
      return this.getConvidadosFiltrados().filter(c => c.confirmed).length;
    }

    getConvidadosPendentes(): number {
      return this.getConvidadosFiltrados().filter(c => !c.confirmed).length;
    }

    getConvidadosEnviados(): number {
      return this.getConvidadosFiltrados().filter(c => c.sent).length;
    }

    // Métodos para status e grupos
    getStatusClass(convidado: Convidado): string {
      if (convidado.confirmed) return 'status-confirmed';
      if (convidado.sent) return 'status-sent';
      return 'status-pending';
    }

    getStatusText(convidado: Convidado): string {
      if (convidado.confirmed) return 'Confirmado';
      if (convidado.sent) return 'Convite Enviado';
      return 'Pendente';
    }

    getGrupoText(groupId?: string): string {
      const grupos: { [key: string]: string } = {
        '1': 'Família',
        '2': 'Amigos',
        '3': 'Trabalho',
        '4': 'Outros'
      };
      return grupos[groupId || ''] || 'Não definido';
    }

    formatarData(data: string): string {
      if (!data) return '';
      const date = new Date(data);
      return date.toLocaleDateString('pt-BR');
    }

          // Métodos de filtro
      onEventoChange(): void {
        // Método chamado quando o filtro muda
      }

      limparFiltro(): void {
        this.eventoSelecionado = '';
      }

    // Métodos de ações
    editarConvidado(convidado: Convidado): void {
      this.isEditing = true;
      this.convidadosEmEdicao = convidado;
      this.convidadosForm.patchValue({
        name: convidado.name,
        email: convidado.email || '',
        phone: convidado.phone || '',
        groupId: convidado.groupId || '',
        eventId: convidado.eventId
      });
      this.showForm = true;
      this.themeService.setEventFormOpen(true);
    }

    deletarConvidado(id: string): void {
      if (confirm('Tem certeza que deseja deletar este convidado?')) {
        // Implementar lógica de deleção
        this.convidados = this.convidados.filter(c => c.id !== id);
        this.agruparConvidadosPorEvento();
        this.success = 'Convidado deletado com sucesso!';
        setTimeout(() => this.success = '', 3000);
      }
    }

    toggleConfirmacao(convidado: Convidado): void {
      convidado.confirmed = !convidado.confirmed;
      // Implementar lógica de atualização no backend
      this.success = `Presença ${convidado.confirmed ? 'confirmada' : 'desmarcada'} com sucesso!`;
      setTimeout(() => this.success = '', 3000);
    }

    enviarConvite(convidado: Convidado): void {
      convidado.sent = true;
      convidado.sentAt = new Date().toISOString();
      // Implementar lógica de envio de convite
      this.success = 'Convite enviado com sucesso!';
      setTimeout(() => this.success = '', 3000);
    }

    reenviarConvite(convidado: Convidado): void {
      convidado.sentAt = new Date().toISOString();
      // Implementar lógica de reenvio de convite
      this.success = 'Convite reenviado com sucesso!';
      setTimeout(() => this.success = '', 3000);
    }

    onSubmit(): void {
      if (this.convidadosForm.valid) {
        this.loading = true;
        const formData = this.convidadosForm.value;
        
        if (this.isEditing && this.convidadosEmEdicao) {
          // Atualizar convidado existente
          const index = this.convidados.findIndex(c => c.id === this.convidadosEmEdicao?.id);
          if (index !== -1) {
            this.convidados[index] = { ...this.convidadosEmEdicao, ...formData };
          }
          this.success = 'Convidado atualizado com sucesso!';
        } else {
          // Adicionar novo convidado
          const novoConvidado: Convidado = {
            id: Date.now().toString(),
            ...formData,
            sent: false,
            confirmed: false
          };
          this.convidados.push(novoConvidado);
          this.success = 'Convidado adicionado com sucesso!';
        }
        
        this.loading = false;
        this.agruparConvidadosPorEvento();
        this.resetForm();
        setTimeout(() => this.success = '', 3000);
      }
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
      this.convidadosForm.reset();
      this.isEditing = false;
      this.convidadosEmEdicao = null;
      this.error = '';
      this.success = '';
      // Comunicar que o formulário foi fechado
      this.themeService.setEventFormOpen(false);
    }
}
