import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-dep-section',
  templateUrl: './dep-section.page.html',
  styleUrls: ['./dep-section.page.scss'],

})
export class DepSectionPage implements OnInit {

  constructor(private router: Router) {

  }
  buttonsState: boolean[] = [false, false, false, false, false, false];
  departmentPages = [  'math',  'physics',  'computer',  'biology',  'geology',  'chemistry'];

  ngOnInit() {
  }


  goToForgotPasswordPage() {
    this.router.navigateByUrl('/forgot-password');
  }
  goToHomePage() {
    this.router.navigateByUrl('/home');
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
  selectedButtonIndex: number = 0;

  navigateToSelectedDepartment() {
    if (this.selectedButtonIndex >= 0) {
      this.router.navigate([this.departmentPages[this.selectedButtonIndex]]);
    }
  }
}
// document.addEventListener('DOMContentLoaded', () => {
//   const checkboxes = document.querySelectorAll('.checkbox-btn');

//   checkboxes.forEach(checkbox => {
//     checkbox.addEventListener('click', () => {
//       checkboxes.forEach(otherCheckbox => {
//         otherCheckbox.classList.remove('border-2', 'border-orange-500');
//       });
//       checkbox.classList.add('border-2', 'border-orange-500');
//     });
//   });
// });




