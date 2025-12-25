import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { addressTypes, Contact, phoneTypes } from '../contacts/contact.model';
import { FormsModule, NgForm } from '@angular/forms';
import { ContactsService } from '../contacts/contacts.service';
import { RestrictedWordsValidator } from '../validators/restricted-words-validator.directive';
import { DateValueAccessorDirective } from '../custom-controles/date-value-accessor/date-value-accessor.directive';
import { ProfileIcon } from '../custom-controles/profile-icon/profile-icon';

@Component({
  imports: [
    CommonModule,
    FormsModule,
    RestrictedWordsValidator,
    DateValueAccessorDirective,
    ProfileIcon,
  ],
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css'],
})
export class EditContactComponent implements OnInit {
  phoneTypes = phoneTypes;
  addressTypes = addressTypes;
  contact: Contact = {
    id: '',
    icon: '',
    firstName: '',
    lastName: '',
    dateOfBirth: null,
    favoritesRanking: 0,
    personal: false,
    notes: '',
    phone: {
      phoneNumber: '',
      phoneType: '',
    },
    address: {
      streetAddress: '',
      city: '',
      state: '',
      postalCode: '',
      addressType: '',
    },
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactsService
  ) {}

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return;

    this.contactService.getContact(contactId).subscribe((contact) => {
      if (contact) this.contact = contact;
    });
  }

  saveContact(form: NgForm) {
    console.log(form.value);

    this.contactService.saveContact(this.contact).subscribe({
      next: () => this.router.navigate(['/contacts']),
    });
  }
}
