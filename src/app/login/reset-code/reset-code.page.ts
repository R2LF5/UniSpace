import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-code',
  templateUrl: './reset-code.page.html',
  styleUrls: ['./reset-code.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ResetCodePage implements OnInit {

  constructor(private router: Router) {

  }

  goToHomePage() {
    this.router.navigateByUrl('/home');
  }
  ngOnInit() {
  }

}


