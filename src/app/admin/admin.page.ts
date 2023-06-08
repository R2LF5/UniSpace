import { Component, OnInit } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { UserUniService } from '../services/user-uni.service';
import { User, UserExcel } from '../models/user.model';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss']
})
export class AdminPage implements OnInit {
  constructor(
    public alertController: AlertController,
    public popoverController: PopoverController,
    private userUniService: UserUniService,
    private router: Router,
  ) {}

  users: User[] = [];
  userRole: string = '';

  loginToken: string='';
  ngOnInit() {
    this.getUsers();
    this.loginToken=  localStorage.getItem('token') || '';
    this.userRole = localStorage.getItem('role')|| '';
    if(this.loginToken == '' && this.userRole !== 'Admin'){
      this.router.navigate(['/login']);
    }
  }

  getUsers() {
    this.userUniService.getAllUsers().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // LEAVE BUTTON
  async confirmLeave(id: number) {
    if (id === undefined || id === null) {
      console.error('Invalid id');
      return;
    }
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
            this.userUniService.deactivateUserService(id.toString()).subscribe(res => {
              console.log("success delete");
            });
          },
        }
      ],
    });

    await alert.present();
  }

  // activate BUTTON
  async Activate(id: number) {
    if (id === undefined || id === null) {
      console.error('Invalid id');
      return;
    }
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
            this.userUniService.deactivateUserService(id.toString()).subscribe(res => {
              console.log("success delete");
            });
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


  readFile(event: any){
    const target: DataTransfer = <DataTransfer>(event.target);
    const reader: FileReader = new FileReader();
    console.log('read from excel');
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
          console.log('read from excel');

      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      let data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
      // Print the Excel Data
      console.log(data);
      let i = 0;
      data.forEach(element => {
        console.log('for ',element)
        i=i+1;

       let user = new UserExcel();
       user.email=ws['A'+i].v;
       user.password=ws['B'+i].v;
       user.role=ws['C'+i].v;
       console.log(user);
       this.userUniService.registerUser(user).subscribe
       (res=>{
        console.log(res);
       })
      });
    }


  }

}

