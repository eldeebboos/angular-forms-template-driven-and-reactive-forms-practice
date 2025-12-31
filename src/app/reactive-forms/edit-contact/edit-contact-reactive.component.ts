import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Address,
  addressTypes,
  Contact,
  Phone,
  phoneTypes,
} from 'src/app/contacts/contact.model';
import { ContactsService } from 'src/app/contacts/contacts.service';
import { DateValueAccessorDirective } from 'src/app/custom-controles/date-value-accessor/date-value-accessor.directive';
import { RestrictedWordsValidatorReactiveForms } from '../validators/restricted-words-validator-reactive-forms';
import { ProfileIcon } from 'src/app/custom-controles/profile-icon/profile-icon';
import { distinctUntilChanged } from 'rxjs';

@Component({
  templateUrl: './edit-contact-reactive.component.html',
  styleUrls: ['./edit-contact-reactive.component.css'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    DateValueAccessorDirective,
    ProfileIcon,
  ],
})
export class EditContactReactiveComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = new FormBuilder();
  phoneTypes = phoneTypes;
  addressTypes = addressTypes;

  private contactService = inject(ContactsService);

  contactForm = this.fb.nonNullable.group({
    id: '',
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: '',
    dateOfBirth: <Date | null>null,
    favoritesRanking: <number | null>null,
    icon: '',
    notes: ['', RestrictedWordsValidatorReactiveForms(['foo', 'bar'])],
    personal: false,
    phones: this.fb.array([
      this.createPhoneGroup({
        phoneNumber: '',
        phoneType: '',
        preferred: false,
      }),
    ]),
    addresses: this.fb.array([
      this.createAddressGroups({
        addressType: '',
        city: '',
        postalCode: '',
        state: '',
        streetAddress: '',
      }),
    ]),
  });

  createPhoneGroup(phone: Phone) {
    const phoneGroup = this.fb.nonNullable.group({
      phoneNumber: [phone.phoneNumber || '', Validators.required],
      phoneType: phone.phoneType || '',
      preferred: false,
    });

    phoneGroup.controls.preferred.valueChanges
      .pipe(
        // Use distinctUntilChanged to prevent multiple triggers for same value to avoid inifinite loop
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
      )
      .subscribe((isPreferred) => {
        if (isPreferred) {
          phoneGroup.controls.phoneNumber.addValidators([Validators.required]);
          // Uncheck other preferred phones
          // this.contactForm.controls.phones.controls.forEach((pg) => {
          //   if (pg !== phoneGroup) {
          //     pg.controls.preferred.setValue(false, { emitEvent: false });
          //     // pg.controls.phoneNumber.updateValueAndValidity();
          //   }
          // });
        } else {
          phoneGroup.controls.phoneNumber.removeValidators([
            Validators.required,
          ]);
        }
        phoneGroup.controls.phoneNumber.updateValueAndValidity();
      });

    // phoneGroup.updateValueAndValidity();
    phoneGroup.valueChanges.subscribe((value) => {
      // console.log('Phone group value changed:', value);
    });

    //also we can subscribe to validity changes
    // phoneGroup.statusChanges.subscribe((status) => {
    //   console.log('Phone group status changed:', status);
    // });

    return phoneGroup;
  }
  createAddressGroups(address: Address) {
    return this.fb.nonNullable.group({
      streetAddress: [address.streetAddress || '', Validators.required],
      city: [address.city || '', Validators.required],
      state: [address.state || '', Validators.required],
      postalCode: [address.postalCode || '', Validators.required],
      addressType: address.addressType || '',
    });
  }

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return;

    this.contactService.getContact(contactId).subscribe((contact) => {
      if (contact) {
        // this.contactForm.controls.phones.clear();
        // contact.phones.forEach((phone) => {
        //   this.contactForm.controls.phones.push(this.getPhoneGroup(phone));
        // });
        // Or create empty phone group for eavery phonein contact and will be replaced by patchvalue
        for (let i = 1; i < contact.phones.length; i++) {
          this.contactForm.controls.phones.push(
            this.createPhoneGroup({
              phoneNumber: '',
              phoneType: '',
              preferred: false,
            })
          );
        }

        this.contactForm.controls.addresses.clear();
        contact.addresses.forEach((address) => {
          this.contactForm.controls.addresses.push(
            this.createAddressGroups(address)
          );
        });

        this.contactForm.patchValue(contact);
      }
    });
  }

  get notes() {
    return this.contactForm.get('notes');
  }

  get firstName() {
    return this.contactForm.get('firstName');
  }

  addnewPhone() {
    this.contactForm.controls.phones.push(
      this.createPhoneGroup({
        phoneNumber: '',
        phoneType: '',
        preferred: false,
      })
    );
  }

  addnewAddress() {
    this.contactForm.controls.addresses.push(
      this.createAddressGroups({
        addressType: '',
        city: '',
        postalCode: '',
        state: '',
        streetAddress: '',
      })
    );
  }
  saveContact() {
    console.log(this.contactForm.value);

    this.contactService.saveContact(this.contactForm.getRawValue()).subscribe({
      next: (savedContact) => {
        console.log('Contact saved:', savedContact);
        this.router.navigate(['/contacts']);
      },
    });
  }
}
