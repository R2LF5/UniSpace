import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-physics',
  templateUrl: './physics.page.html',
  styleUrls: ['./physics.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PhysicsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
