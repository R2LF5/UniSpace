import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./login/forgot-password/forgot-password.page').then( m => m.ForgotPasswordPage)
  },
  {
    path: 'new-password',
    loadComponent: () => import('./login/new-password/new-password.page').then( m => m.NewPasswordPage)
  },
  {
    path: 'landing',
    loadComponent: () => import('./explore/landing/landing.page').then( m => m.LandingPage)
  },
  {
    path: 'eventlink',
    loadComponent: () => import('./main/eventlink/eventlink.page').then( m => m.EventlinkPage)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.page').then( m => m.DashboardPage)
  },



];
