import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { BiologyPageRoutingModule } from './biology-routing.module';
import { BiologyPage } from './biology.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BiologyPageRoutingModule
  ],
  declarations: [BiologyPage]
})
export class BiologyPageModule {}
