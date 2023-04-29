import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { SlidesComponent } from './slides/slides.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SlidesComponent]
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
