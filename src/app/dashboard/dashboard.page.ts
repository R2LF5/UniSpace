import { OnInit, Component, ElementRef, Renderer2, ViewChild, HostListener, Inject  } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { ActionSheetController, Platform } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {
  isMenuHidden: boolean = false; // new variable
  menuType: string = 'overlay';

  constructor(
    private router: Router,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    public actionSheetController: ActionSheetController,
    private platform: Platform
  ) {
    // initialize isMenuHidden based on screen size
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) { // md breakpoint in tailwind
      this.isMenuHidden = true;
    }
  }

ngOnInit() {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'dark') {
    this.document.body.classList.add('dark');
  } else if (storedTheme === 'light') {
    this.document.body.classList.remove('dark');
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      this.document.body.classList.add('dark');
    } else {
      this.document.body.classList.remove('dark');
    }
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

// set theme
async presentActionSheet() {
  const actionSheet = await this.actionSheetController.create({
    header: 'Select Theme',
    buttons: [
      {
        text: 'Light Theme',
        icon: 'sunny', // Ionic icon for sun
        handler: () => {
          this.setTheme('light');
        },
      },
      {
        text: 'Dark Theme',
        icon: 'moon', // Ionic icon for moon
        handler: () => {
          this.setTheme('dark');
        },
      },
      {
        text: 'System Default',
        icon: 'cog', // Ionic icon for cogwheel
        handler: () => {
          this.setTheme('system');
        },
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
      },
    ],
  });
  await actionSheet.present();
}

setTheme(theme: 'dark' | 'light' | 'system') {
  switch (theme) {
    case 'dark':
      this.document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark'); // Store user preference
      break;
    case 'light':
      this.document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light'); // Store user preference
      break;
    case 'system':
      localStorage.removeItem('theme'); // Clear stored preference
      // Adapt to system theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        this.document.body.classList.add('dark');
      } else {
        this.document.body.classList.remove('dark');
      }
      break;
  }
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
}
