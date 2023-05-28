import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumberOnly]'
})
export class NumberOnlyDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const maxLength = 8;
    let initialValue = this.el.nativeElement.value;
    let newValue = initialValue.replace(/\D/g, ''); // Replace non-digit characters
    newValue = newValue.slice(0, maxLength); // Limit the value to maximum length

    // Update the unformatted phone number
    this.el.nativeElement.dispatchEvent(new CustomEvent('unformattedInput', { detail: newValue }));

    // Format the phone number
    if (newValue.length > 2) {
      const parts = [];
      parts.push(newValue.slice(0, 2));
      if (newValue.length > 5) {
        parts.push(newValue.slice(2, 5));
        parts.push(newValue.slice(5));
      } else {
        parts.push(newValue.slice(2));
      }
      newValue = parts.join(' ');
    }

    this.el.nativeElement.value = newValue;

    if (initialValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }

}
