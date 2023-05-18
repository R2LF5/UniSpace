import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyCalanderPage } from './my-calander.page';

const routes: Routes = [
  {
    path: '',
    component: MyCalanderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyCalanderPageRoutingModule {}
