import { Component } from '@angular/core';
import { BannerComponent } from '../../../shared/ui_elements/banner/banner.component';
import { FormComponent } from '../../../shared/components/form/form.component';
import { CardContactsComponent } from '../../../shared/ui_elements/card-contacts/card-contacts.component';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [BannerComponent, FormComponent, CardContactsComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {

}
