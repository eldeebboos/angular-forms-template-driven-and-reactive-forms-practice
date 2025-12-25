import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[restrictedWords]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: RestrictedWordsValidator,
      multi: true,
    },
  ],
})
export class RestrictedWordsValidator implements Validator {
  @Input('restrictedWords') restrictedWords: string[] = [];

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    console.log('ttt');
    const invalidWords = this.restrictedWords
      .map((word) => (control.value.includes(word) ? word : null))
      .filter((word) => word !== null);

    return invalidWords.length > 0
      ? { restrictedWords: invalidWords.join(', ') }
      : null;
  }
}

// export function RestrictedWordsValidator(
//   restrictedWords: string[] = ['foo']
// ): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     if (!control.value) {
//       return null;
//     }
//     const invalidWords = restrictedWords
//       .map((word) => (control.value.includes(word) ? word : null))
//       .filter((word) => word !== null);
//     return invalidWords.length > 0 ? { restrictedWords: invalidWords } : null;
//   };
// }
