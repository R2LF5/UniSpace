import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetCodePageRoutingModule } from './reset-code-routing.module';

import { ResetCodePage } from './reset-code.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResetCodePageRoutingModule
  ],
  declarations: [ResetCodePage]
})
export class ResetCodePageModule {}
