
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EventlinkPageRoutingModule } from './eventlink-routing.module';
import { EventlinkPage } from './eventlink.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventlinkPageRoutingModule
  ],
  declarations: [EventlinkPage]
})
export class EventlinkPageModule {}
