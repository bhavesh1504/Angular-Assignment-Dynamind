import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appNumberOnly]'
})
export class NumberOnlyDirective {

  constructor(private control: NgControl) {}

  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    const inputValue = event.target.value;

    // Remove any non-numeric characters
    const sanitizedValue = inputValue.replace(/[^0-9]/g, '');

    // Update the form control with the sanitized value
    this.control.control?.setValue(sanitizedValue);
  }
}
