import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AddEventPage implements OnInit {

  constructor(private router: Router){ }

  ngOnInit() {
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    console.log(file); // Do something with the selected file
  }
  isAsideHidden = false;

  hideAside() {
    this.isAsideHidden = true;
  }
}
