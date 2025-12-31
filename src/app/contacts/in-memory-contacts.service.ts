import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Contact } from './contact.model';

export class InMemoryContactsApi implements InMemoryDbService {
  createDb() {
    let contacts: Contact[] = [
      {
        id: '5CehW',
        icon: 'person-01.png',
        firstName: 'Percival',
        lastName: 'Doodleplumb',
        dateOfBirth: new Date('1994/05/05'),
        favoritesRanking: 3,
        personal: false,
        notes: '',
        phones: [
          { phoneNumber: '555-765-4321', phoneType: 'work', preferred: true },
          { phoneNumber: '555-333-555', phoneType: 'mobile', preferred: false },
        ],
        addresses: [
          {
            streetAddress: '777 Whimsy Lane',
            city: 'Gleeberg City',
            state: 'Colohoma',
            postalCode: 'A4321',
            addressType: 'home',
          },
          {
            streetAddress: '99 Whimsy Lane',
            city: 'Cairo',
            state: 'ddd',
            postalCode: '345gh',
            addressType: 'work',
          },
        ],
      },
      {
        id: 'A6rwe',
        icon: 'person-05.png',
        firstName: 'Mortimer',
        lastName: 'Flungford',
        dateOfBirth: new Date('1988/10/05'),
        favoritesRanking: 0,
        personal: false,
        notes: '',
        phones: [
          {
            phoneNumber: '555-877-5678',
            phoneType: 'mobile',
            preferred: false,
          },
        ],
        addresses: [
          {
            streetAddress: '543 Lullaby Lane',
            city: 'Sleepytown',
            state: 'Ulaska',
            postalCode: 'F2231',
            addressType: 'other',
          },
        ],
      },
      {
        id: '3bNGA',
        icon: 'person-14.png',
        firstName: 'Wanda',
        lastName: 'Giggleworth',
        dateOfBirth: new Date('1986/11/08'),
        favoritesRanking: 1,
        personal: false,
        notes: '',
        phones: [
          {
            phoneNumber: '555-123-4567',
            phoneType: 'mobile',
            preferred: false,
          },
        ],
        addresses: [
          {
            streetAddress: '123 Merriment Avenue',
            city: 'Dorado City',
            state: 'Mezona',
            postalCode: 'Z2345',
            addressType: 'work',
          },
        ],
      },
    ];

    return { contacts };
  }
}
