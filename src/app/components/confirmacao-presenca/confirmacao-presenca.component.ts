import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConvidadosService } from '../../services/convidados.service';

@Component({
  selector: 'app-confirmacao-presenca',
  templateUrl: './confirmacao-presenca.component.html',
  styleUrls: ['./confirmacao-presenca.component.css'],
})
export class ConfirmacaoPresencaComponent implements OnInit {
  convidados: any = null;
  tamanhosSandalia: number[] = Array.from({ length: 11 }, (_, i) => i + 33); // [33, 34, ..., 43]
  idEvento: string = '';
  erro: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private convidadosService: ConvidadosService
  ) {}

  ngOnInit(): void {
    // Obtém os parâmetros da URL
    this.idEvento = this.route.snapshot.queryParamMap.get('idEvento') || '';
    const idConvidado = this.route.snapshot.queryParamMap.get('idConvidado') || '';
    const idGrupoConvidados = this.route.snapshot.queryParamMap.get('idGrupoConvidados') || '';

    // Busca os convidados
    this.convidadosService.getConvidadoById(idConvidado, this.idEvento, idGrupoConvidados).subscribe(
      (data) => {
        this.convidados = data.convidados || data.convidado;
      },
      (error) => {
        this.erro = 'Erro ao buscar o convidado. Verifique o ID.';
      }
    );
  }

  confirmarPresenca(): void {
    if (this.convidados.some((convidado: {statusConfirmacao: boolean, sexo: string, adulto: boolean, tamanhoSandalia: number}) => convidado.statusConfirmacao && convidado.sexo === 'feminino' && convidado.adulto && !convidado.tamanhoSandalia)) {
      this.erro = 'Você deve preencher o tamanho dos calçados';
      return;
    }
    const presencas = this.convidados.map((convidado: { idEventos: any, id: any; statusConfirmacao: any; tamanhoSandalia: any; }) => ({
      idEventos: convidado.idEventos,
      idConvidados: convidado.id,
      statusConfirmacao: convidado.statusConfirmacao || false,
      tamanhoSandalia: convidado.tamanhoSandalia || null,
    }));

    this.convidadosService.confirmarPresenca(presencas).subscribe({
      next: () => {
        alert('Presença confirmada com sucesso!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Erro ao confirmar presença:', err);
        alert('Erro ao confirmar presença.');
      },
    });
  }
}
