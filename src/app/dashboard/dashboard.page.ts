import { OnInit, Component, ElementRef, Renderer2, ViewChild, HostListener, Inject  } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { ActionSheetController} from '@ionic/angular';
import { ThemeService } from '../services/theme.service'; // adjust the path as needed

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

  ){
    // initialize isMenuHidden based on screen size
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) { // md breakpoint in tailwind
      this.isMenuHidden = true;
    }
  }

ngOnInit() {

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

  logout() {
    // Remove tokens and user info from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('idLogin');

    // Navigate to login page
    this.router.navigate(['/login']);
  }

}
