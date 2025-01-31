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
    this.idEventos = this.route.snapshot.queryParamMap.get('idEventos') || '';
    const idConvidados = this.route.snapshot.queryParamMap.get('IdConvidados') || '';
    const idGrupoConvidados = this.route.snapshot.queryParamMap.get('IdGrupoConvidados') || '';
    this.convidadosService.getConvidadoConfirmado(idConvidados, this.idEventos, idGrupoConvidados).subscribe(
      (data) => {
        console.log('data', data);
        this.convidados = data.convidados || [];
        console.log('this.convidados', this.convidados);
      },
      (error) => {
        this.erro = 'Erro ao buscar os convidados confirmados.';
      }
    );
  }
}
