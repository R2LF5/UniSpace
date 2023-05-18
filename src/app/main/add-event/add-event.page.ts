import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],

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
