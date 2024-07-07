import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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
  @Input() showPagination: boolean = false;
  page: number = 1;
  limit: number = 6;
  totalPages!: number;

  constructor(private crudHouseService: crudHouseService, private houseStateService: HouseStateService) {}

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties(): void {
    this.crudHouseService.getProperties(this.page, this.limit).subscribe(houses => {
      this.totalPages = Math.ceil(houses.total / this.limit);
    });
      this.houses$ = this.houseStateService.houses$;
      this.hasHouses$ = this.houseStateService.hasHouses$;
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadProperties();
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadProperties();
    }
  }
}
