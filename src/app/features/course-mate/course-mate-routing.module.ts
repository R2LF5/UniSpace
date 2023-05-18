import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseMatePage } from './course-mate.page';

const routes: Routes = [
  {
    path: '',
    component: CourseMatePage
  },
  {
    path: 'course',
    loadChildren: () => import('./course/course.module').then( m => m.CoursePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseMatePageRoutingModule {}
