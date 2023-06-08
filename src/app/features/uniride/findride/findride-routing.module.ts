import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindridePage } from './findride.page';

const routes: Routes = [
  {
    path: '',
    component: FindridePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindridePageRoutingModule {}
