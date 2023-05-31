import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserUniService } from '../../services/user-uni.service';
import { ToastController } from '@ionic/angular'; // <-- Add this import
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  providers: [{provide: JWT_OPTIONS , useValue:JWT_OPTIONS}, JwtHelperService]
})
export class ForgotPasswordPage implements OnInit {
  formReset: FormGroup;

  constructor(private router: Router, private builder: FormBuilder, private useruniService: UserUniService, private jwtHelper: JwtHelperService, private toastController: ToastController) { // <-- Inject ToastController
    this.formReset = this.builder.group({
      email: ['']
    });
  }

  goToHomePage() {
    this.router.navigateByUrl('/home');
  }

  ngOnInit() {
  }

  email: string = '';

  reset() {
    this.formReset = this.builder.group({
      email: [this.email],
    })
    console.log(this.formReset.value);
    this.useruniService.resetService(this.formReset.value).subscribe(res => {
      console.log(res);
      this.presentToast('A link was sent to your email'); // <-- Add toast for success
    }, err => {
      console.error(err);  // Add this line to log the error details
      this.presentToast('Email does not exist'); // <-- Add toast for error
    });
  }

  async presentToast(message: string) { // <-- Add this method to display toast
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
