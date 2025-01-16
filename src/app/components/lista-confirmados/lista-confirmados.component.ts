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
        console.log('this.convidados', this.convidados);
      },
      (error) => {
        this.erro = 'Erro ao buscar os convidados confirmados.';
      }
    );
  }

}
