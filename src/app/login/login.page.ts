import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';

import { Router } from '@angular/router';
import { UserUniService } from '../services/user-uni.service';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [{provide: JWT_OPTIONS , useValue:JWT_OPTIONS}, JwtHelperService]
})
export class LoginPage implements OnInit {

  formLogin: FormGroup;
  constructor(private router: Router,
    private builder:FormBuilder,
    private useruniService: UserUniService,
    private jwtHelper:JwtHelperService,
    private toastController: ToastController) {
    this.formLogin= this.builder.group({
      email: [''],
      password:['']
    });
}

  ngOnInit() {
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const firstLogin = localStorage.getItem('firstLogin');

    if(id && token && firstLogin) {
      firstLogin === "false" ? this.router.navigate(['/dashboard']) : this.router.navigate(['/setup']);
    }
  }

  passwordType: string = 'password';
  password: string = '';
  email: string = '';

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  goToForgotPasswordPage() {
    this.router.navigateByUrl('/forgotPassword');
  }

  goToHomePage() {
    this.router.navigateByUrl('/home');
  }

  login() {
    this.formLogin= this.builder.group({
      email: [this.email],
      password:[this.password]
    });
    this.useruniService.loginService(this.formLogin.value).subscribe(res => {
      localStorage.setItem('token',res.token);
      localStorage.setItem('role',this.jwtHelper.decodeToken(res.token).role);
      const id = this.jwtHelper.decodeToken(res.token).id;
      localStorage.setItem('id', id.toString());

      this.useruniService.findUserById(Number(id)).subscribe(user => {
        if(user.firstName) {
          localStorage.setItem('firstName', user.firstName);
      }
      if(user.lastName) {
          localStorage.setItem('lastName', user.lastName);
      }
      if(user.firstLogin) {
          localStorage.setItem('firstLogin', user.firstLogin);
      }
      else{
        localStorage.setItem('firstLogin', "false");
      }

      if(user.firstLogin==="false")
        { this.router.navigate(['/dashboard']);
      }
      else{
        this.router.navigate(['/setup']);
      }
      });
    }, err => {
      // Handle error
      this.presentToast('Wrong email or password');
    });
}

}
