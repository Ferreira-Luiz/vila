import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { PropertiesData } from '../../models/interfaces/propertiesType';
import { moneyPipe } from '../../pipes/money.pipe';
import { crudHouseService } from '../../services/crudHouse.service';
import { HouseStateService } from './../../services/house-state.service';

@Component({
  selector: 'app-houses-list',
  standalone: true,
  imports: [moneyPipe, CommonModule],
  templateUrl: './houses-list.component.html',
  styleUrl: './houses-list.component.css'
})

export class HousesListComponent implements OnInit {
  houses$!: Observable<PropertiesData[] | []>;
  hasHouses$!: Observable<boolean>;
  page: number = 1;
  limit: number = 6;

  constructor(private crudHouseService: crudHouseService, private houseStateService: HouseStateService) {}

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties(): void {
    this.crudHouseService.getProperties(this.page, this.limit).subscribe();
    this.houses$ = this.houseStateService.houses$;
    this.hasHouses$ = this.houseStateService.hasHouses$;
  }

  nextPage(): void {
    this.page++;
    this.loadProperties();
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadProperties();
    }
  }
}
