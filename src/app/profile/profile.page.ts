import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Clipboard } from '@capacitor/clipboard';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],

})
export class ProfilePage implements OnInit {
  bioText: string = 'An artist of considerable range, Jenna the name taken by Melbourne-raised, Brooklyn-based Nick Murphy writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. An artist of considerable range.';
  showFullBio: boolean = false;
  screenWidth: number = 0;

  constructor(private router: Router, private clipboard: Clipboard, private toastController: ToastController) {}

  goToForgotPasswordPage() {
    this.router.navigateByUrl('/forgot-password');
  }

  goToHomePage() {
    this.router.navigateByUrl('/home');
  }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.screenWidth = window.innerWidth;
  }

  toggleBio() {
    this.showFullBio = !this.showFullBio;
  }
  //replace with the database value
  phoneNumber = '12345678';
  Email = 'example@gmail.com';
  async copyPhoneNumber() {
    await Clipboard.write({
      string: this.phoneNumber
    });

    const toast = await this.toastController.create({
      message: 'Phone number copied to clipboard',
      duration: 2000
    });

    toast.present();
  }
  async copyEmail() {
    await Clipboard.write({
      string: this.Email
    });

    const toast = await this.toastController.create({
      message: 'Email copied to clipboard',
      duration: 2000
    });

    toast.present();
  }
}
