import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FindridePageRoutingModule } from './findride-routing.module';

import { FindridePage } from './findride.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FindridePageRoutingModule
  ],
  declarations: [FindridePage]
})
export class FindridePageModule {}
