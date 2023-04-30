import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-uniride',
  templateUrl: './uniride.page.html',
  styleUrls: ['./uniride.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class UniridePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
