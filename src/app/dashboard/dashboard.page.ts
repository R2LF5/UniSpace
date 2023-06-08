import { OnInit, Component, ElementRef, Renderer2, ViewChild, HostListener, Inject  } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { ActionSheetController} from '@ionic/angular';
import { ThemeService } from '../services/theme.service'; // adjust the path as needed
import { AlertController, ToastController } from '@ionic/angular';
// import useruniservice
import { UserUniService } from '../services/user-uni.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {
  isMenuHidden: boolean = false; // new variable
  menuType: string = 'overlay';

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    public toastController: ToastController,
    // add useruniservice
    public userUniService: UserUniService

  ){
    // initialize isMenuHidden based on screen size
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) { // md breakpoint in tailwind
      this.isMenuHidden = true;
    }
  }
  userRole: string = '';
  loginToken: string ='';

  ngOnInit() {
    // get id from localstorage
    this.userRole = localStorage.getItem('role') || '';
    this.loginToken=  localStorage.getItem('token') || '';
    // if loginToken is empty route to login
    if(this.loginToken == ''){
      this.router.navigate(['/login']);
    }


  }


  onFileSelected(event: any) {
    const file = event.target.files[0];
    console.log(file); // Do something with the selected file
  }
  isAsideHidden: boolean = false;
  showSecondAside: boolean = false;

  hideAside() {
    this.isAsideHidden = true;
    this.showSecondAside = false;
  }

  toggleAside() {
    if (this.showSecondAside) {
      this.showSecondAside = false;
      this.hideAside();
    } else {
      this.showSecondAside = true;
    }
  }


  hideSecondAside() {
    this.showSecondAside = false;
    this.isAsideHidden = false;
  }
  @ViewChild('dropdownTop', { static: false }) dropdownTop!: ElementRef;

  toggleDropdown() {
    this.dropdownTop.nativeElement.classList.toggle('hidden');
  }

  onClickOutside(event: MouseEvent) {
    if (!this.dropdownTop.nativeElement.contains(event.target)) {
      this.dropdownTop.nativeElement.classList.add('hidden');
    }
  }


  showThemeSelector() {
    this.themeService.showThemeSelector();
  }

  toggleAsideMenu() { // new method
    this.isMenuHidden = !this.isMenuHidden;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const screenWidth = event.target.innerWidth;
    if (screenWidth >= 1024) { // lg breakpoint in tailwind
      this.isMenuHidden = false;
    } else if (screenWidth < 640) { // sm breakpoint in tailwind
      this.isMenuHidden = true;
    }
  }
  edit(){
    // route to setup
    this.router.navigate(['/setup']);
  }
  navigateToUniNews() {
    this.router.navigateByUrl('/dashboard/UniNews');
  }

  navigateToEventLink() {
    this.router.navigateByUrl('/dashboard/EventLink');
  }
  navigateToCourseMate() {
    this.router.navigateByUrl('/dashboard/CourseMate');
  }
  navigateToInbox() {
    this.router.navigateByUrl('/dashboard/Inbox');
  }
  navigateToProfile() {
    this.router.navigateByUrl('/dashboard/Profile');
  }
  navigateToCalendar() {
    this.router.navigateByUrl('/dashboard/Calendar');
  }
  navigateToUniRide() {
    this.router.navigateByUrl('/dashboard/UniRide');
  }
  navigateToAdmin(){
    this.router.navigateByUrl('/dashboard/admin');
  }

  logout() {
    // Remove tokens and user info from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('idLogin');

    // Navigate to login page
    this.router.navigate(['/login']);
  }





  async ChangePassword() {
    const id=localStorage.getItem('id');
    if (id === null) {
      console.error('ID not found in local storage');
      return;
    }
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      mode: 'ios',
      header: 'Change Password',
      inputs: [
        {
          name: 'oldPassword',
          type: 'password',
          placeholder: 'Old Password'
        },
        {
          name: 'newPassword',
          type: 'password',
          placeholder: 'New Password'
        },
        {
          name: 'repeatPassword',
          type: 'password',
          placeholder: 'Repeat New Password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Ok',
          handler: async (alertData) => {
            // Check if any input is empty
            if (!alertData.oldPassword || !alertData.newPassword || !alertData.repeatPassword) {
              const toast = await this.toastController.create({
                message: 'Please fill in all fields.',
                duration: 2000
              });
              toast.present();
              return false;
            }

            // Check if old password matches

            // Check if new passwords match
            if (alertData.newPassword !== alertData.repeatPassword) {
              const toast = await this.toastController.create({
                message: 'New passwords do not match.',
                duration: 2000
              });
              toast.present();
              return false;
            }

            // Check if new password is at least 8 characters long
            if (alertData.newPassword.length < 8) {
              const toast = await this.toastController.create({
                message: 'New password must be at least 8 characters long.',
                duration: 2000
              });
              toast.present();
              return false;
            }

            // Password change is successful

            this.userUniService.changePasswordService(id.toString(), alertData.oldPassword, alertData.newPassword).subscribe(
                res => {
                    console.log('Response:', res);
                },
                err => {
                    console.error('Error:', err);
                }
            );




            return true;
          }
        }
      ]
    });

    await alert.present();
  }


  async Settings() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Options',
      mode: 'ios',  // Force iOS look

      buttons: [
        {
          text: 'Edit Profile',
          icon: 'person',
          handler: () => {
            this.router.navigateByUrl('/Setup');
          }
        }, {
          text: 'Change Password',
          icon: 'key',
          handler: () => {
            this.ChangePassword();
          }
        }, {
          text: 'Switch Appearance',
          icon: 'moon',
          handler: () => {
            console.log('Switch appearance clicked');
            // Add your logic for switching appearance here
          }
        }, {
          text: 'Sign Out',
          icon: 'log-out',
          handler: () => {
            console.log('Sign out clicked');
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }

}

