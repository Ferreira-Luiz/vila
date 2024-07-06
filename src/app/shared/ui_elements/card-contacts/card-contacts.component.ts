import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-contacts',
  standalone: true,
  imports: [],
  templateUrl: './card-contacts.component.html',
  styleUrl: './card-contacts.component.css'
})
export class CardContactsComponent {
  @Input() cardImage: string = '';
  @Input() cardTitle: string = '';
  @Input() cardSubtitle: string = '';
}
