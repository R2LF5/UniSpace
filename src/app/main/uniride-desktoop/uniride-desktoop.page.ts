import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-uniride-desktoop',
  templateUrl: './uniride-desktoop.page.html',
  styleUrls: ['./uniride-desktoop.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class UnirideDesktoopPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
