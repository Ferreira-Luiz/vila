import { Component } from '@angular/core';
import { PageBannerComponent } from '../../shared/components/page-banner/page-banner.component';
import { HousesListComponent } from '../../shared/components/houses-list/houses-list.component';

@Component({
  selector: 'app-listHousePagecomponent',
  standalone: true,
  imports: [PageBannerComponent, HousesListComponent],
  templateUrl: './listHousePage.component.html',
  styleUrl: './listHousePage.component.css'
})
export class listHousePagecomponent  {

}
