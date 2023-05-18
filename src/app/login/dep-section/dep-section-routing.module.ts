import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepSectionPage } from './dep-section.page';

const routes: Routes = [
  {
    path: '',
    component: DepSectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepSectionPageRoutingModule {}
