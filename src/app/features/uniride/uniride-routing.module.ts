import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UniridePage } from './uniride.page';

const routes: Routes = [
  {
    path: '',
    component: UniridePage
  },
  {
    path: 'addpool',
    loadChildren: () => import('./addpool/addpool.module').then( m => m.AddpoolPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UniridePageRoutingModule {}
