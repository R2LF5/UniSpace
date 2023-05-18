import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepSectionPageRoutingModule } from './dep-section-routing.module';

import { DepSectionPage } from './dep-section.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepSectionPageRoutingModule
  ],
  declarations: [DepSectionPage]
})
export class DepSectionPageModule {}
