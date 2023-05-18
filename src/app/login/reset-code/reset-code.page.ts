import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-code',
  templateUrl: './reset-code.page.html',
  styleUrls: ['./reset-code.page.scss'],

})
export class ResetCodePage implements OnInit {

  @ViewChild('digit1') digit1!: ElementRef;

  constructor(private router: Router) {

  }

  goToHomePage() {
    this.router.navigateByUrl('/home');
  }
  ngOnInit() {
  }

  //**if the current input field has reached its maximum length, it moves the focus to the next input field**
  onDigitInput(event: any, nextInput: any) {
    const input = event.target;
    const length = input.value.length;
    const maxLength = input.getAttribute('maxlength');

    if (length >= maxLength) {
      nextInput.focus();
    }
  }

  //**This function handles the keyboard events for an input field and allows only the delete key and numeric values**
  onKeyDown(event: KeyboardEvent): boolean {
    // Allow the delete key
    if (event.key === "Backspace") {
      return true;
    }
    // Allow only numbers
    else if (event.key < "0" || event.key > "9") {
      event.preventDefault();
      return false;
    }
    return true;
  }

}


