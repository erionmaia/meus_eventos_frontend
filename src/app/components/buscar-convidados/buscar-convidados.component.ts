import { Component } from '@angular/core';
import { ConvidadosService } from '../../services/convidados.service';

@Component({
  selector: 'app-buscar-convidados',
  templateUrl: './buscar-convidados.component.html',
  styleUrls: ['./buscar-convidados.component.css'],
})
export class BuscarConvidadosComponent {
  showingResponse = false;
  idConvidado: string = '';
  idEvento: string = '';
  idGrupoConvidados: string = '';
  convidado: any = null;
  convidados: any = null;
  erro: string = '';

  constructor(private convidadosService: ConvidadosService) {}

  buscarConvidado() {
    if (!this.idConvidado && !this.idGrupoConvidados) {
      this.erro = 'Por favor, insira um ID do convidado ou do grupo de convidados válido.';
      return;
    }
    if (!this.idEvento) {
      this.erro = 'Por favor, insira um ID para o evento válido.';
      return;
    }

    this.erro = '';
    this.convidado = null;

    this.convidadosService.getConvidadoById(this.idConvidado, this.idEvento, this.idGrupoConvidados).subscribe(
      (data) => {
        if (data.convidado) this.convidado = data.convidado;
        if (data.convidados) this.convidados = data.convidados;
        this.showingResponse = true;
      },
      (error) => {
        this.erro = 'Erro ao buscar o convidado. Verifique o ID.';
      }
    );
  }

  resetarBusca() {
    this.convidado = null;
    this.convidados = null;
    this.showingResponse = false;
    this.idConvidado = '';
    this.idEvento = '';
    this.idGrupoConvidados = '';
  }
}
