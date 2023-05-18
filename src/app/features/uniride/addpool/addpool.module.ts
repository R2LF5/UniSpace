import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddpoolPageRoutingModule } from './addpool-routing.module';

import { AddpoolPage } from './addpool.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddpoolPageRoutingModule
  ],
  declarations: [AddpoolPage]
})
export class AddpoolPageModule {}
