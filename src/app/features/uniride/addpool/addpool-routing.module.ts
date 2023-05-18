import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddpoolPage } from './addpool.page';

const routes: Routes = [
  {
    path: '',
    component: AddpoolPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddpoolPageRoutingModule {}
