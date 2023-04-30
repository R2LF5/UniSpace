import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
//import function to register swiper custom elements
import {register} from "swiper/element/bundle";

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class AppComponent {
  constructor() {}
}