import { Routes } from '@angular/router';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { EditContactReactiveComponent } from './reactive-forms/edit-contact/edit-contact-reactive.component';

export const routes: Routes = [
  {
    path: 'contacts',
    component: ContactListComponent,
    title: 'Contacts',
  },
  {
    path: 'contacts/edit/:id',
    component: EditContactReactiveComponent,
    title: 'Contacts - Edit',
  },
  {
    path: 'contacts/edit',
    component: EditContactReactiveComponent,
    title: 'Contacts - Edit',
  },
  //  {
  //   path: 'contacts/edit/:id',
  //   component: EditContactComponent,
  //   title: 'Contacts - Edit'
  // },
  // {
  //   path: 'contacts/edit',
  //   component: EditContactComponent,
  //   title: 'Contacts - Edit'
  // },
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
];
