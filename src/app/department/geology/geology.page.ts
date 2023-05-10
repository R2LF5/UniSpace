import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-geology',
  templateUrl: './geology.page.html',
  styleUrls: ['./geology.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class GeologyPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
