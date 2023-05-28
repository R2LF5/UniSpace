import { Component, OnInit } from '@angular/core';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserUniService } from '../../services/user-uni.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.page.html',
  styleUrls: ['./new-password.page.scss'],
  providers: [{provide: JWT_OPTIONS , useValue:JWT_OPTIONS}, JwtHelperService]
})
export class NewPasswordPage implements OnInit {
  formNewPass: FormGroup;
  constructor(private activateroute: ActivatedRoute,private router: Router, public toastController: ToastController, private builder:FormBuilder, private useruniService: UserUniService,private jwtHelper:JwtHelperService) {
    this.formNewPass= this.builder.group({
      password:['']
    })
  }
  passwordType: string = 'password';
  pass1: string = '';
  pass2: string = '';
  // toast trigger
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
  // function to check if passwords match
  checkPasswords() {
    if (this.pass1 !== this.pass2) {
      this.presentToast('Passwords do not match');
    }
    else if (this.pass1.length < 8) {
      this.presentToast('Password is too short');
    }
    // check if password has at least 1 lowercase letter
    else if (this.pass1.match(/[a-z]/) == null) {
      this.presentToast('Password must contain at least 1 lowercase letter');
    }
    // check if password has at least 1 capital letter
    else if (this.pass1.search(/[A-Z]/) < 0) {
      this.presentToast('Password must contain at least 1 Uppercase letter');
    }
    // check if password hast at least 1 number
    else if (this.pass1.search(/\d/) < 0) {
      this.presentToast('Password must contain at least 1 number');
    }
  }

  // route to login page
  goToLoginPage() {
    // Function logic
    this.router.navigateByUrl('/login')
  }
  // route to homepage
  goToHomePage() {
    this.router.navigateByUrl('/home');
  }

  ngOnInit() {
    // ngOnInit logic

    console.log( this.activateroute.snapshot.params['token']);
  }
  // Function to toggle password visibility
  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  Reset(){
    this.checkPasswords()
    this.formNewPass= this.builder.group({
      token:[this.activateroute.snapshot.params['token']],
      newPassword:[this.pass1],
      confirmedPassword:[this.pass2]
    })
    this.useruniService.newPasswordService(this.formNewPass.value).subscribe(res=>{

      this.presentToast('Password Reset Successfully').then(()=>{
        this.goToLoginPage();
      });

    })
  }

}
