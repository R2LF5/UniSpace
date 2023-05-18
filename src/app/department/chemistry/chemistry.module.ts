import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChemistryPageRoutingModule } from './chemistry-routing.module';

import { ChemistryPage } from './chemistry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChemistryPageRoutingModule
  ],
  declarations: [ChemistryPage]
})
export class ChemistryPageModule {}
