import { OnInit, Component, ElementRef, Renderer2, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DashboardPage implements OnInit {
  menuType: string = 'overlay';
  constructor(private router: Router, private renderer: Renderer2) {

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
}

