import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetupProfilePageRoutingModule } from './setup-profile-routing.module';

import { SetupProfilePage } from './setup-profile.page';
import {  NoSpecialCharsDirective} from '../../directive/no-special-chars.directive';
import { NumberOnlyDirective } from '../../directive/number-only.directive';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetupProfilePageRoutingModule
  ],
  declarations: [SetupProfilePage, NoSpecialCharsDirective, NumberOnlyDirective]
})
export class SetupProfilePageModule {}
