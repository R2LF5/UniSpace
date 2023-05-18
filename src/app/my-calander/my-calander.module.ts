import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyCalanderPageRoutingModule } from './my-calander-routing.module';

import { MyCalanderPage } from './my-calander.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyCalanderPageRoutingModule
  ],
  declarations: [MyCalanderPage]
})
export class MyCalanderPageModule {}
