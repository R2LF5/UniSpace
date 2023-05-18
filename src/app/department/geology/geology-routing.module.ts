import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeologyPage } from './geology.page';

const routes: Routes = [
  {
    path: '',
    component: GeologyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeologyPageRoutingModule {}
