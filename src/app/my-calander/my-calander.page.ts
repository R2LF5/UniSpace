import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-my-calander',
  templateUrl: './my-calander.page.html',
  styleUrls: ['./my-calander.page.scss'],

})
export class MyCalanderPage implements OnInit {

  constructor(private router: Router) {

  }
  goToLoginPage() {
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {

  }

}
