import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConvidadosService } from '../../services/convidados.service';

@Component({
  selector: 'app-lista-confirmado',
  templateUrl: './lista-confirmado.component.html',
  styleUrls: ['./lista-confirmado.component.css']
})
export class ListaConfirmadoComponent implements OnInit {

  convidados: any = null;
  groupedConvidados: { [key: string]: any[] } = {};
  idEventos: string = '';

  erro: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private convidadosService: ConvidadosService
  ) { }

  ngOnInit(): void {
    this.idEventos = this.route.snapshot.queryParamMap.get('idEventos') || '2';
    const idConvidados = this.route.snapshot.queryParamMap.get('idConvidados') || '';
    const idGrupoConvidados = this.route.snapshot.queryParamMap.get('idGrupoConvidados') || '';
    this.convidadosService.getConvidadoConfirmado(idConvidados, this.idEventos, idGrupoConvidados).subscribe(
      (data) => {
        this.convidados = data.convidados || [];
      },
      (error) => {
        this.erro = 'Erro ao buscar os convidados confirmados.';
      }
    );
  }
}
