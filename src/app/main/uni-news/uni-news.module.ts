import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { UniNewsRoutingModule } from '../uni-news-routing.module';
import { UniNewsPage } from './uni-news.page';  // Assuming this is the correct path

@NgModule({
  declarations: [UniNewsPage],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UniNewsRoutingModule
  ]
})
export class UniNewsModule { }
