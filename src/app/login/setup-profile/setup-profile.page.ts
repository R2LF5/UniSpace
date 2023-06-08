import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { UserUniService } from '../../services/user-uni.service';
import { SectionService } from '../../services/section.service';
import { ToastController } from '@ionic/angular';
import {User} from '../../models/user.model'
@Component({
  selector: 'app-setup-profile',
  templateUrl: './setup-profile.page.html',
  styleUrls: ['./setup-profile.page.scss'],

})
export class SetupProfilePage implements OnInit {

  formUpdate: FormGroup;
  role: string | null = null;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private builder:FormBuilder,
    private useruniService: UserUniService,
    private sectionService: SectionService,
    private toastController: ToastController
  ) {
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
    this.role = localStorage.getItem('role')||'';
    const FL = localStorage.getItem('firstLogin') || '';
    if(FL==="false"){
      // route to dashboard
      this.router.navigateByUrl('/dashboard');
    }
    const storedFirstName = localStorage.getItem('firstName') || '';
    const storedLastName = localStorage.getItem('lastName') || '';
    const storedPhoneNubmer = localStorage.getItem('PhoneNumber') || '';
    this.role = localStorage.getItem('role');
    this.firstName = storedFirstName.charAt(0).toUpperCase() + storedFirstName.slice(1);
    this.lastName = storedLastName.charAt(0).toUpperCase() + storedLastName.slice(1);
    this.phoneNumber = storedPhoneNubmer.charAt(0).toUpperCase() + storedPhoneNubmer.slice(1);
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

    if (this.unformattedPhoneNumber.length !== 8 || this.unformattedPhoneNumber.length > 1 ) {
      this.showAlert('Phone number must be 8 digits long');
    }
  }




  imageSrc :any;

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
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (e: any) => {
        console.log('fileReader.result');
        console.log(fileReader.result);
        this.imageSrc=fileReader.result;
        localStorage.setItem('photo', this.imageSrc)


      };

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

  async update(){
    // Create the form group
    this.formUpdate = this.builder.group({
      firstName: [this.firstName],
      lastName: [this.lastName],
      phoneNumber: [this.unformattedPhoneNumber]
    });

    // Retrieve the form values
    let formValues = this.formUpdate.value;

    // Check if first name and last name meet the requirements
    if(formValues.firstName && formValues.lastName){
      // If they do, store them in the local storage
      localStorage.setItem('firstName', formValues.firstName);
      localStorage.setItem('lastName', formValues.lastName);

      // Check if phone number is not empty and meets the requirements
      if(formValues.phoneNumber.length>1){
      if (formValues.phoneNumber && formValues.phoneNumber.length === 8) {
        localStorage.setItem('phoneNumber', formValues.phoneNumber);
      }
      }
      // Update admin
      if( this.role==='Admin'){
        let userId: string | null = localStorage.getItem('id');
        const user: User = {
          id: userId ? parseInt(userId) : 0,
          firstName: this.firstName,
          lastName: this.lastName,
          photo: this.imageSrc,
          role: this.role,
        };
        this.useruniService.updateUserFirstLogin(user.id.toString(), user).subscribe(response => {
          console.log(response);
          // route to dashboard
          this.router.navigate(['/dashboard']);
        });

      }
      // Update Other Roles
      else{
        this.router.navigateByUrl('/setup/department');
      }
    } else {
      // If they don't, show a toast message
      let message = '';
      if (!formValues.firstName || !formValues.lastName) {
        message += 'First name and last name should not be empty. ';
      }
      if (formValues.phoneNumber && formValues.phoneNumber.length !== 8) {
        message += 'Phone number must be 8 digits long.';
      }
      const toast = await this.toastController.create({
        message: message,
        duration: 2000
      });
      toast.present();
    }
  }




}

  // update() {
  //   this.formUpdate= this.builder.group({
  //     id:[localStorage.getItem('id')],
  //     firstName: [this.firstName],
  //     lastName:[this.lastName],
  //     phoneNumber:[this.phoneNumber]
  //   })
  //   this.useruniService.updateUser(this.formUpdate.value).subscribe(res=>{
  //     // clear local storage
  //     localStorage.removeItem('firstName')
  //     localStorage.removeItem('lastName')
  //   })

  // }
