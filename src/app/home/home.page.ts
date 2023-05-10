import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class HomePage {
  constructor(private router: Router) {

  }
  goToLoginPage() {
    this.router.navigateByUrl('/login');
  }
  goToExplorePage() {
    this.router.navigateByUrl('/explore');
  }
}
