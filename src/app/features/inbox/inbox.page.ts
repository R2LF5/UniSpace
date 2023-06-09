import { Component, OnInit, ViewChild } from '@angular/core';

import { AlertController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { MembersPopoverComponent } from './members-popover/members-popover.component'; // Import MembersPopoverComponent
import { Router } from '@angular/router';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],

})
export class InboxPage implements OnInit {

  @ViewChild('myPopover', { static: false }) popover: any;
  messages: string[] = []; // array to hold messages
  newMessage: string = ''; // property to bind to input field

  constructor(public alertController: AlertController, public popoverController: PopoverController, private router: Router) {}

  ngOnInit() {
  }
  // View Members
  async viewMembers(ev: any) {
    const popover = await this.popoverController.create({
      component: MembersPopoverComponent,
      event: ev,
      translucent: true,
      cssClass: 'center-popover',
    });

    return await popover.present();
  }



  // LEAVE BUTTON
  async confirmLeave() {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure you want to leave this group?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Leave',
          handler: () => {
            // Handle leaving the group here
          }
        }
      ]
    });

    await alert.present();
  }

  sendMessage() {
    if (this.newMessage.trim()) { // check if new message is not empty
      this.messages.push(this.newMessage); // add new message to array
      this.newMessage = ''; // clear input field
    }
  }
  navigateToDashboard() {
    this.router.navigate(['/dashboard/UniRide']);
  }

}
