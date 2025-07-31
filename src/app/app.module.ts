import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { ServicesComponent } from './components/services/services.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EventosComponent } from './components/dashboard/eventos/eventos.component';
import { ConvidadosComponent } from './components/dashboard/convidados/convidados.component';
import { ConvitesComponent } from './components/dashboard/convites/convites.component';
import { SitesComponent } from './components/dashboard/sites/sites.component';
import { UsuarioComponent } from './components/dashboard/usuario/usuario.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { AuthInterceptor } from './services/auth.interceptor';
import { NotificationComponent } from './components/notification/notification.component';
import { routes } from './app.routes';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    HomeComponent,
    PricingComponent,
    ServicesComponent,
    DashboardComponent,
    EventosComponent,
    ConvidadosComponent,
    ConvitesComponent,
    SitesComponent,
    UsuarioComponent,
    FooterComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AppModule { }