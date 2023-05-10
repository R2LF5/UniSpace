import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-addpool',
  templateUrl: './addpool.page.html',
  styleUrls: ['./addpool.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AddpoolPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
