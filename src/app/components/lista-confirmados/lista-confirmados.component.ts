import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConvidadosService } from '../../services/convidados.service';

@Component({
  selector: 'app-lista-confirmados',
  templateUrl: './lista-confirmados.component.html',
  styleUrls: ['./lista-confirmados.component.css']
})
export class ListaConfirmadosComponent implements OnInit {

  convidados: any = null;
  groupedConvidados: { [key: string]: any[] } = {};
  individualConvidados: any[] = [];
  idEventos: string = '';
  erro: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private convidadosService: ConvidadosService
  ) { }

  ngOnInit(): void {
    this.idEventos = this.route.snapshot.queryParamMap.get('idEventos') || '2';

    this.convidadosService.getConvidadosConfirmados(this.idEventos).subscribe(
      (data) => {
        this.convidados = data.convidados || [];
        this.separateConvidados();
      },
      (error) => {
        this.erro = 'Erro ao buscar os convidados confirmados.';
      }
    );
  }

  separateConvidados(): void {
    this.convidados.forEach((convidado: any) => {
      if (convidado.idGrupoConvidados) {
        if (!this.groupedConvidados[convidado.idGrupoConvidados]) {
          this.groupedConvidados[convidado.idGrupoConvidados] = [];
        }
        this.groupedConvidados[convidado.idGrupoConvidados].push(convidado);
      } else {
        this.individualConvidados.push(convidado);
      }
    });
  }

}
