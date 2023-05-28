import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  constructor(private router: Router, private builder:FormBuilder, private useruniService: UserUniService,private jwtHelper:JwtHelperService) {
    this.formLogin= this.builder.group({
      email: [''],
      password:['']
    })
  }

  goToForgotPasswordPage() {
    this.router.navigateByUrl('/forgotPassword');
  }
  goToHomePage() {
    this.router.navigateByUrl('/home');
  }
  ngOnInit() {
  }


  passwordType: string = 'password';
  password: string = '';
  email: string = '';

// show password button
  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }




  login(){
    this.formLogin= this.builder.group({
      email: [this.email],
      password:[this.password]
    })
    this.useruniService.loginService(this.formLogin.value).subscribe(res=>{
      localStorage.setItem('token',res.token);
      localStorage.setItem('role',this.jwtHelper.decodeToken(res.token).role);
      const id = this.jwtHelper.decodeToken(res.token).id;
      localStorage.setItem('idLogin', id);

      // Check if it's the first login
      if (res.firstLogin) {
        // If it's the first login, navigate to the dashboard
        this.router.navigate(['/dashboard']);
      } else {
        // If it's not the first login, fetch the user's details
        this.useruniService.findUserById(id).subscribe(user => {
          // Store the first name and last name in local storage
          localStorage.setItem('firstName', user.firstName);
          localStorage.setItem('lastName', user.lastName);

          // Navigate to the setup page
          this.router.navigate(['/setup']);
        });
      }

      console.log(res);
    })
  }


}
