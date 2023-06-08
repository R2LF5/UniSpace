import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { EventService } from '../../services/event.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-eventlink',
  templateUrl: './eventlink.page.html',
  styleUrls: ['./eventlink.page.scss'],
})
export class EventlinkPage implements OnInit {
  formEve: FormGroup;
  constructor(private router: Router, private builder:FormBuilder,
    private eventService:EventService,
    private actionSheetController: ActionSheetController,
    private toastController: ToastController,
    public alertController: AlertController
    ) {
      this.formEve = this.builder.group({})

    }
  events: any[] = [];

  isMenuHidden = true;
  isMinimized = false;
  selectedEvent: any; // Add this line


  toggleMenu(event: any): void {
    this.selectedEvent = event;
    console.log(this.selectedEvent);  
    this.isMenuHidden = !this.isMenuHidden;
  }

  joinEvent(eventId: string): void {
    const userId = localStorage.getItem('id'); // Get the user ID from local storage
    console.log (eventId);
    if (userId) {
      this.eventService.joinEvent(eventId, userId).subscribe(response => {
        console.log(response);
      });
    } else {
      console.log('User ID not found in local storage');
    }
  }


  minimizeMenu() {
    this.isMenuHidden = true;
    this.isMinimized = true;
  }

  maximizeMenu() {
    this.isMinimized = false;
    this.isMenuHidden = false;
  }
  userRole: string = '';
  department: string = '';
  ngOnInit(): void {
    this.userRole = localStorage.getItem('role') || '';
    this.department = localStorage.getItem('department') || '';
    this.eventService.findAllEvents().subscribe(data => {
        console.log(data); // Add this line
        this.events = data;
    });
  }

  goToHomePage() {
    this.router.navigateByUrl('/home');
  }

  goToLoginPage() {
    this.router.navigateByUrl('/login');
  }
}
