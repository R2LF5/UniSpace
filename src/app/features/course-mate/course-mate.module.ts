
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CourseMatePageRoutingModule } from './course-mate-routing.module';
import { CourseMatePage } from './course-mate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CourseMatePageRoutingModule
  ],
  declarations: [CourseMatePage]
})
export class CourseMatePageModule {}
