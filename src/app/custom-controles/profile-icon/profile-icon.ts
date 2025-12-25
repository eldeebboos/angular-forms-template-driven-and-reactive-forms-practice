import { CommonModule } from '@angular/common';
import { Component, forwardRef, Provider } from '@angular/core';
import { ProfileIconNames } from './profile-icon-names';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const PROFILE_ICON_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ProfileIcon),
  multi: true,
};

@Component({
  selector: 'con-profile-icon',
  imports: [CommonModule],
  templateUrl: './profile-icon.html',
  styleUrl: './profile-icon.css',
  providers: [PROFILE_ICON_VALUE_ACCESSOR],
})
export class ProfileIcon implements ControlValueAccessor {
  profileIcons = ProfileIconNames;
  showAllIcons = true;
  selectedIcon!: string | null;

  selectIcon(icon: string) {
    this.showAllIcons = false;
    this.selectedIcon = icon;
    this.onChange(icon);
  }

  onChange!: Function;
  onTouched!: Function;

  writeValue(icon: string | null): void {
    this.selectedIcon = icon;
    console.log('iconnnnnnnnnn');

    if (icon && icon !== '') {
      this.showAllIcons = false;
    } else {
      this.showAllIcons = true;
    }
  }

  registerOnChange(fn: Function): void {
    this.onChange = (icon: string) => {
      fn(icon);
    };
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }
}
