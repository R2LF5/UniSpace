import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-members-popover',
  templateUrl: './members-popover.component.html',
  styleUrls: ['./members-popover.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class MembersPopoverComponent  implements OnInit {

  constructor(private popoverController: PopoverController) {}

  ngOnInit() {}
  members = [
    { name: 'Member 1', profilePictureUrl: 'url-to-member1-avatar' },
    { name: 'Member 2', profilePictureUrl: 'url-to-member2-avatar' },
    { name: 'Member 3', profilePictureUrl: 'url-to-member3-avatar' }
  ];
  close() {
    this.popoverController.dismiss();
  }

  closePopover() {
    this.close();
  }

}


