import { AbstractControl, ValidationErrors } from '@angular/forms';

export function RestrictedWordsValidatorReactiveForms(words: string[] = []) {
  return (control: AbstractControl): ValidationErrors | null => {
    if (words.length === 0) return null;
    if (!control.value) return null;

    const invalidWords = words.filter((word) => control.value.includes(word));
    return invalidWords.length > 0
      ? { restrictedWords: invalidWords.join(', ') }
      : null;
  };
}
