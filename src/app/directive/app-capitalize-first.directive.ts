import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appAppCapitalizeFirst]'
})
export class AppCapitalizeFirstDirective implements OnInit {

  constructor(private el: ElementRef) { }

  ngOnInit() {
    const initialValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initialValue.charAt(0).toUpperCase() + initialValue.slice(1);
  }
}
