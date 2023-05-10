import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AdminPage implements OnInit {

  constructor(public alertController: AlertController, public popoverController: PopoverController) {}

  ngOnInit() {
  }
  // LEAVE BUTTON
  async confirmLeave() {
    const alert = await this.alertController.create({
      
      mode: 'ios',
      header: 'Alert',
      message: 'Are you sure you want to delete this user?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          handler: () => {
            // Handle deleting the user
          },
        }
      ],
      
    });

    await alert.present();
  }
  


  async editUser() {
    const alert = await this.alertController.create({
      mode: 'ios',
      header: 'Edit User',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name'
        },
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email'
        },
        
        {
          name: 'role',
          type: 'text',
          placeholder: 'Role'
        },
       
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Save',
          handler: (data) => {
            // Handle the user input data here...
          }
        }
      ]
    });
    await alert.present();
  }
  async addUser() {
    const alert = await this.alertController.create({
      mode: 'ios',
      header: 'Add User',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name'
        },
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email'
        },
        
        {
          name: 'role',
          type: 'text',
          placeholder: 'Role'
        },
       
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: (data) => {
            // Handle the user input data here...
          }
        }
      ]
    });
    await alert.present();
  }

  async userNumbers() {
    //const userCount = await this.userService.getUserCount(); // Assuming the user count is retrieved from a UserService
  
    const alert = await this.alertController.create({
      mode: 'ios',
      header: 'User Numbers',
      subHeader: 'Total number of users',
      message: `There are currently users registered.`,
       //${userCount} backend shit//
      buttons: ['OK'],
    });
  
    await alert.present();
  }
 
  
}

