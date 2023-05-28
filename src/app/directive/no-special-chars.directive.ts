import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appNoSpecialChars]'
})
export class NoSpecialCharsDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initialValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initialValue.replace(/[^a-zA-Z ]*/g, '');
    if (initialValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }

  }
}
