import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'pricing',
    loadComponent: () => import('./components/pricing/pricing.component').then(m => m.PricingComponent)
  },
  {
    path: 'services',
    loadComponent: () => import('./components/services/services.component').then(m => m.ServicesComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./components/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'eventos',
        pathMatch: 'full'
      },
      {
        path: 'eventos',
        loadComponent: () => import('./components/dashboard/eventos/eventos.component').then(m => m.EventosComponent)
      },
      {
        path: 'convidados',
        loadComponent: () => import('./components/dashboard/convidados/convidados.component').then(m => m.ConvidadosComponent)
      },
      {
        path: 'convites',
        loadComponent: () => import('./components/dashboard/convites/convites.component').then(m => m.ConvitesComponent)
      },
      {
        path: 'sites',
        loadComponent: () => import('./components/dashboard/sites/sites.component').then(m => m.SitesComponent)
      },
      {
        path: 'usuario',
        loadComponent: () => import('./components/dashboard/usuario/usuario.component').then(m => m.UsuarioComponent)
      }
    ]
  },
  {
    path: 'about',
    loadComponent: () => import('./components/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'termos',
    loadComponent: () => import('./components/terms/terms.component').then(m => m.TermsComponent)
  },
  {
    path: 'privacidade',
    loadComponent: () => import('./components/privacy/privacy.component').then(m => m.PrivacyComponent)
  },
  {
    path: 'faq',
    loadComponent: () => import('./components/faq/faq.component').then(m => m.FaqComponent)
  }
]; 