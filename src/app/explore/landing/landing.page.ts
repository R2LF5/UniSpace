import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],

})
export class LandingPage implements OnInit {
  slides: any [] = [];
  constructor(private router: Router) {

  }
  ngOnInit(): void {
      //this.slide =[
       //{slide: 'assets/shapes.svg'};
      //]
  }
  goToHomePage() {
    this.router.navigateByUrl('/home');
  }
  goToLoginPage() {
    this.router.navigateByUrl('/login');
  }
}
