import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-calander',
  templateUrl: './my-calander.page.html',
  styleUrls: ['./my-calander.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
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
