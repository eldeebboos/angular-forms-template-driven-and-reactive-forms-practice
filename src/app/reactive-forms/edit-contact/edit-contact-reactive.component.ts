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
      this.getPhoneGroup({ phoneNumber: '', phoneType: '' }),
    ]),
    addresses: this.fb.array([
      this.getAddressGroups({
        addressType: '',
        city: '',
        postalCode: '',
        state: '',
        streetAddress: '',
      }),
    ]),
  });

  getPhoneGroup(phone: Phone) {
    return this.fb.nonNullable.group({
      phoneNumber: [phone.phoneNumber || '', Validators.required],
      phoneType: phone.phoneType || '',
    });
  }
  getAddressGroups(address: Address) {
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
            this.getPhoneGroup({ phoneNumber: '', phoneType: '' })
          );
        }

        this.contactForm.controls.addresses.clear();
        contact.addresses.forEach((address) => {
          this.contactForm.controls.addresses.push(
            this.getAddressGroups(address)
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
      this.getPhoneGroup({ phoneNumber: '', phoneType: '' })
    );
  }

  addnewAddress() {
    this.contactForm.controls.addresses.push(
      this.getAddressGroups({
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
