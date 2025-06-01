import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { ContactComponent } from './components/contact/contact.component';
import { TermsComponent } from './components/terms/terms.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { FaqComponent } from './components/faq/faq.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { RegisterComponent } from './components/register/register.component';
import { ServicesComponent } from './components/services/services.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './services/auth.guard';
import { EventosComponent } from './components/dashboard/eventos/eventos.component';
import { ConvidadosComponent } from './components/dashboard/convidados/convidados.component';
import { ConvitesComponent } from './components/dashboard/convites/convites.component';
import { SitesComponent } from './components/dashboard/sites/sites.component';
import { UsuarioComponent } from './components/dashboard/usuario/usuario.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'termos', component: TermsComponent },
  { path: 'privacidade', component: PrivacyComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'services', component: ServicesComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'eventos', component: EventosComponent },
      { path: 'convidados', component: ConvidadosComponent },
      { path: 'convites', component: ConvitesComponent },
      { path: 'sites', component: SitesComponent },
      { path: 'usuario', component: UsuarioComponent },
      { path: '', redirectTo: 'eventos', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
