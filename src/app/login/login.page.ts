import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],

})
export class LoginPage implements OnInit {

  constructor(private router: Router) {

  }

  goToForgotPasswordPage() {
    this.router.navigateByUrl('/forgot-password');
  }
  goToHomePage() {
    this.router.navigateByUrl('/home');
  }
  ngOnInit() {
  }


  passwordType: string = 'password';
  password: string = '';
  isInputFocused: boolean = false;

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  onInputFocus() {
    this.isInputFocused = true;
  }

  onInputBlur() {
    this.isInputFocused = false;
  }
  isInputDirty = false;


}
