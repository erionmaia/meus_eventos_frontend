import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ConvidadosService } from './services/convidados.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { BuscarConvidadosComponent } from './components/buscar-convidados/buscar-convidados.component';
import { ListaPresentesComponent } from './components/lista-presentes/lista-presentes.component';
import { InserirConvidadoComponent } from './components/inserir-convidado/inserir-convidado.component';
import { AppRoutingModule } from './app-routing.module';
import { NavigationMenuComponent } from './components/navigation-menu/navigation-menu.component';
import { ConfirmacaoPresencaComponent } from './components/confirmacao-presenca/confirmacao-presenca.component';
import { ListaConfirmadosComponent } from './components/lista-confirmados/lista-confirmados.component';
import { ListaConfirmadoComponent } from './components/lista-confirmado/lista-confirmado.component';

@NgModule({
  declarations: [
    AppComponent,
    BuscarConvidadosComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ListaPresentesComponent,
    InserirConvidadoComponent,
    NavigationMenuComponent,
    ConfirmacaoPresencaComponent,
    ListaConfirmadosComponent,
    ListaConfirmadoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ConvidadosService],
  bootstrap: [AppComponent]
})
export class AppModule { }