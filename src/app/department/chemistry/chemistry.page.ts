import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-chemistry',
  templateUrl: './chemistry.page.html',
  styleUrls: ['./chemistry.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ChemistryPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
