import { Component, Input } from '@angular/core';

@Component({
  selector: 'password-toggle',
  template: `

  `,
})
export class PasswordToggleComponent {
  @Input() showPassword: boolean = false;
}
