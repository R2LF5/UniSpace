import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { UserUniService } from '../../services/user-uni.service';

@Component({
  selector: 'app-setup-profile',
  templateUrl: './setup-profile.page.html',
  styleUrls: ['./setup-profile.page.scss'],

})
export class SetupProfilePage implements OnInit {

  formUpdate: FormGroup;

  constructor(private router: Router, private alertController: AlertController, private builder:FormBuilder, private useruniService: UserUniService) {
    this.formUpdate= this.builder.group({
      id:[''],
      firstName: [''],
      lastName:[''],
      phoneNumber:['']
    })
  }
  firstName: string = '';
  lastName: string = '';

  @ViewChild('firstNameInput') firstNameInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('lastNameInput') lastNameInput: ElementRef<HTMLInputElement> | undefined;

  ngOnInit() {
    const storedFirstName = localStorage.getItem('firstName') || '';
    const storedLastName = localStorage.getItem('lastName') || '';
    this.firstName = storedFirstName.charAt(0).toUpperCase() + storedFirstName.slice(1);
    this.lastName = storedLastName.charAt(0).toUpperCase() + storedLastName.slice(1);
  }


  capitalizeInputValue(input: HTMLInputElement) {
    const initialValue = input.value;
    input.value = initialValue.charAt(0).toUpperCase() + initialValue.slice(1);
  }

  onFirstNameChange(event: any) {
    this.firstName = event;
  }

  onLastNameChange(event: any) {
    this.lastName = event;
  }

  phoneNumber: string = '';


  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
  handleUnformattedInput(event: any) {
    this.unformattedPhoneNumber = event.detail;
  }

  unformattedPhoneNumber: string = '';


  validatePhoneNumber() {
    if (this.unformattedPhoneNumber.length !== 8) {
      this.showAlert('Phone number must be 8 digits long');
    }
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
  update() {
    this.formUpdate= this.builder.group({
      id:[localStorage.getItem('id')],
      firstName: [this.firstName],
      lastName:[this.lastName],
      phoneNumber:[this.phoneNumber]
    })
    this.useruniService.updateUser(this.formUpdate.value).subscribe(res=>{
      // clear local storage
      localStorage.removeItem('firstName')
      localStorage.removeItem('lastName')
    })

  }

}
