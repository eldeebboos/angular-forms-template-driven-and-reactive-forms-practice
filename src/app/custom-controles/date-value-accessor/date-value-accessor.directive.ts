import { Directive, ElementRef, forwardRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const DATE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  //forwardref is used here to refer to a class that is not yet defined
  // we use it when we declare the provider before the class definition
  useExisting: forwardRef(() => DateValueAccessorDirective),
  multi: true,
};

@Directive({
  selector:
    'input([type=date])[ngModel],[input([type=date])[formControl],[input([type=date])[formControlName]',
  providers: [DATE_VALUE_ACCESSOR],
  standalone: true,
})
export class DateValueAccessorDirective implements ControlValueAccessor {
  constructor(private element: ElementRef) {}

  // Listen to input and blur events on the host element
  // HostListner is used to fire methods when events occur on the host element (date input) and update the date model in order to notify angular forms about changes (in template driven and reactive forms )
  @HostListener('input', ['$event.target.valueAsDate'])
  private onChange!: Function;
  @HostListener('blur', []) private onTouched!: Function;

  writeValue(newvalue: any): void {
    if (newvalue instanceof Date) {
      this.element.nativeElement.value = newvalue
        ? newvalue.toISOString().split('T')[0]
        : '';
    }
  }
  registerOnChange(fn: Function): void {
    this.onChange = (valueAsDate: Date | null) => {
      fn(valueAsDate);
    };
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
