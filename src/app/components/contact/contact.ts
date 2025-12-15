import { Component } from '@angular/core';
import { ExternButton } from '../extern-button/extern-button';
import { ContactForm } from '../contact-form/contact-form';

@Component({
  selector: 'app-contact',
  imports: [ExternButton, ContactForm],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {

}
