import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarConvidadosComponent } from './components/buscar-convidados/buscar-convidados.component';
import { HomeComponent } from './components/home/home.component';
import { ListaPresentesComponent } from './components/lista-presentes/lista-presentes.component';
import { InserirConvidadoComponent } from './components/inserir-convidado/inserir-convidado.component';
import { ConfirmacaoPresencaComponent } from './components/confirmacao-presenca/confirmacao-presenca.component';
import { ListaConfirmadosComponent } from './components/lista-confirmados/lista-confirmados.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'buscar-convidado', component: BuscarConvidadosComponent },
  { path: 'lista-presentes', component: ListaPresentesComponent },
  { path: 'inserir-convidado', component: InserirConvidadoComponent },
  { path: 'confirmacao-presenca', component: ConfirmacaoPresencaComponent },
  { path: 'lista-confirmados', component: ListaConfirmadosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
