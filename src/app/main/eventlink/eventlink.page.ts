import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eventlink',
  templateUrl: './eventlink.page.html',
  styleUrls: ['./eventlink.page.scss'],
})
export class EventlinkPage implements OnInit {

  constructor(private router: Router) {}

  isMenuHidden = true;
  isMinimized = false;

  toggleMenu() {
    this.isMenuHidden = !this.isMenuHidden;
  }

  minimizeMenu() {
    this.isMenuHidden = true;
    this.isMinimized = true;
  }

  maximizeMenu() {
    this.isMinimized = false;
    this.isMenuHidden = false;
  }

  ngOnInit(): void {}

  goToHomePage() {
    this.router.navigateByUrl('/home');
  }

  goToLoginPage() {
    this.router.navigateByUrl('/login');
  }
}
