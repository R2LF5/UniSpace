import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UniridePageRoutingModule } from './uniride-routing.module';

import { UniridePage } from './uniride.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UniridePageRoutingModule
  ],
  declarations: [UniridePage]
})
export class UniridePageModule {}
