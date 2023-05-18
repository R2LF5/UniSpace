import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhysicsPage } from './physics.page';

const routes: Routes = [
  {
    path: '',
    component: PhysicsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhysicsPageRoutingModule {}
