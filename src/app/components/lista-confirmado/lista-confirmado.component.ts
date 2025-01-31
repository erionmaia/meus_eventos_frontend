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
    console.log('lista-confirmado');
    console.log("this.route.snapshot.queryParamMap", this.route.snapshot.queryParamMap);
    console.log("this.route.snapshot.queryParamMap.get('idConvidados')", this.route.snapshot.queryParamMap.get('idConvidados'));
    this.idEventos = this.route.snapshot.queryParamMap.get('idEventos') || '';
    const idConvidados = this.route.snapshot.queryParamMap.get('IdConvidados') || '';
    const idGrupoConvidados = this.route.snapshot.queryParamMap.get('IdGrupoConvidados') || '';
    console.log(`this.idEventos: ${this.idEventos}, idConvidados: ${idConvidados}, idGrupoConvidados: ${idGrupoConvidados}`);
    this.convidadosService.getConvidadoConfirmado(this.idEventos, idConvidados, idGrupoConvidados).subscribe(
      (data) => {
        this.convidados = data.convidados || [];
      },
      (error) => {
        this.erro = 'Erro ao buscar os convidados confirmados.';
      }
    );
  }
}
