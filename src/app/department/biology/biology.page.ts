import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-biology',
  templateUrl: './biology.page.html',
  styleUrls: ['./biology.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class BiologyPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
