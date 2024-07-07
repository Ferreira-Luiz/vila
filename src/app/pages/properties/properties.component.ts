import { Component } from '@angular/core';
import { PageBannerComponent } from '../../shared/components/page-banner/page-banner.component';
import { HousesListComponent } from '../../shared/components/houses-list/houses-list.component';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [PageBannerComponent, HousesListComponent],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css'
})
export class PropertiesComponent {

}
