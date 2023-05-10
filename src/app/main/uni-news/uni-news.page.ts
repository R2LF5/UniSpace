import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-uni-news',
  templateUrl: './uni-news.page.html',
  styleUrls: ['./uni-news.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class UniNewsPage implements OnInit {

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
