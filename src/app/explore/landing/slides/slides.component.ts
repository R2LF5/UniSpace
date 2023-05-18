import { Component, Input, OnInit } from '@angular/core';
import { IonicSlides } from '@ionic/angular';
@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss'],
  standalone: true,
})
export class SlidesComponent  implements OnInit {

  @Input() slides: any[] = [];
  SwiperModules = [IonicSlides]
  constructor() { }

  ngOnInit() {}

}
