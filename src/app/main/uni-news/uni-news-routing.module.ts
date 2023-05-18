import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UniNewsPage } from './uni-news.page';

const routes: Routes = [
  {
    path: '',
    component: UniNewsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UniNewsPageRoutingModule {}
