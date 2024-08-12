import { Component } from '@angular/core';
import { PageBannerComponent } from '../../shared/ui_elements/page-banner/page-banner.component';
import { SectionTitleComponent } from '../../shared/ui_elements/section-title/section-title.component';
import { FormComponent } from '../../shared/components/form/form.component';
import { CardContactsComponent } from '../../shared/ui_elements/card-contacts/card-contacts.component';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [PageBannerComponent, SectionTitleComponent, FormComponent, CardContactsComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {

}
