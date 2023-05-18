import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';


@Component({
  selector: 'app-setup-profile',
  templateUrl: './setup-profile.page.html',
  styleUrls: ['./setup-profile.page.scss'],

})
export class SetupProfilePage implements OnInit {

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
  imageSrc = '';

  uploadImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (!target || !target.files || !target.files[0]) {
        return;
      }
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.src = reader.result as string;
        image.onload = () => {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          if (!context) {
            return;
          }
          const minDimension = Math.min(image.width, image.height);
          canvas.width = minDimension;
          canvas.height = minDimension;
          context.drawImage(
            image,
            (image.width - minDimension) / 2,
            (image.height - minDimension) / 2,
            minDimension,
            minDimension,
            0,
            0,
            minDimension,
            minDimension
          );
          this.imageSrc = canvas.toDataURL('image/jpeg', 0.8);
        };
      };
      reader.readAsDataURL(file);
    });
    input.click();
  }

  }


