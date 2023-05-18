import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

import { DashboardPage } from './dashboard.page';
import { UniNewsPage } from '../main/uni-news/uni-news.page';
import { UniridePage } from '../features/uniride/uniride.page';
import { EventlinkPage } from '../main/eventlink/eventlink.page';
import { CourseMatePage } from '../features/course-mate/course-mate.page';

const routes: Routes = [
  { path: '', component: DashboardPage },
  // { path: 'UniNews', component: UniNewsPage },
  // { path: 'UniRide', component: UniridePage },
  // { path: 'EventLink', component: EventlinkPage },
  // { path: 'CourseMate', component: CourseMatePage },
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardPage
    // UniNewsPage, UniridePage, EventlinkPage, CourseMatePage
  ]
})
export class DashboardModule { }
