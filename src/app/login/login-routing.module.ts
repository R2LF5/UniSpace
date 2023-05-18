import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'new-password',
    loadChildren: () => import('./new-password/new-password.module').then( m => m.NewPasswordPageModule)
  },
  {
    path: 'reset-code',
    loadChildren: () => import('./reset-code/reset-code.module').then( m => m.ResetCodePageModule)
  },
  {
    path: 'customize-profile',
    loadChildren: () => import('./customize-profile/customize-profile.module').then( m => m.CustomizeProfilePageModule)
  },
  {
    path: 'setup-profile',
    loadChildren: () => import('./setup-profile/setup-profile.module').then( m => m.SetupProfilePageModule)
  },
  {
    path: 'dep-section',
    loadChildren: () => import('./dep-section/dep-section.module').then( m => m.DepSectionPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
