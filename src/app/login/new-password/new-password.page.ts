import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { PasswordToggleComponent } from './password-toggle';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.page.html',
  styleUrls: ['./new-password.page.scss'],

})
export class NewPasswordPage implements OnInit {

  constructor(private router: Router) { // Inject Router in the constructor

  }



  // Define the function here
  goToLoginPage() {
    // Function logic
    this.router.navigateByUrl('/login')
  }
  goToHomePage() {
    this.router.navigateByUrl('/home');
  }

  ngOnInit() {
    // ngOnInit logic
  }


}
