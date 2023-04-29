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
    path: 'reset-code',
    loadComponent: () => import('./login/reset-code/reset-code.page').then( m => m.ResetCodePage)
  },
  {
    path: 'news',
    loadComponent: () => import('./features/news/news.page').then( m => m.NewsPage)
  },
  {
    path: 'news',
    loadComponent: () => import('./features/news/news.page').then( m => m.NewsPage)
  },
  {
    path: 'uniride',
    loadComponent: () => import('./features/uniride/uniride.page').then( m => m.UniridePage)
  },
  {
    path: 'customize-profile',
    loadComponent: () => import('./login/customize-profile/customize-profile.page').then( m => m.CustomizeProfilePage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'my-calander',
    loadComponent: () => import('./my-calander/my-calander.page').then( m => m.MyCalanderPage)
  },

 
];
