import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms'; // import ReactiveFormsModule here
import { MathPageRoutingModule } from './math-routing.module';

import { MathPage } from './math.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MathPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MathPage]
})
export class MathPageModule {}
