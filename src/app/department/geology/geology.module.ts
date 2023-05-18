import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeologyPageRoutingModule } from './geology-routing.module';

import { GeologyPage } from './geology.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeologyPageRoutingModule
  ],
  declarations: [GeologyPage]
})
export class GeologyPageModule {}
