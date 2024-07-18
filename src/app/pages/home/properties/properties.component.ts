import { Component, OnInit } from '@angular/core';
import { HousesListComponent } from '../../../shared/components/houses-list/houses-list.component';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { Observable } from 'rxjs';
import { HouseStateService } from '../../../core/service/house-state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [HousesListComponent, SectionTitleComponent, CommonModule],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css'
})

export class PropertiesComponent implements OnInit {
  hasHouses$!: Observable<boolean>;

  constructor(private houseStateService: HouseStateService) {}

  ngOnInit(): void {
    this.hasHouses$ = this.houseStateService.hasHouses$;
  }


}
