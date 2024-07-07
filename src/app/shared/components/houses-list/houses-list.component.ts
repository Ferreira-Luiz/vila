import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, takeUntil } from 'rxjs';

import { PropertiesData } from '../../models/interfaces/propertiesType';
import { moneyPipe } from '../../pipes/money.pipe';
import { crudHouseService } from '../../services/crudHouse.service';
import { SkeletonComponent } from '../../utils/skeleton/skeleton.component';
import { FilterHousesService } from './../../services/filter-houses.service';
import { HouseStateService } from './../../services/house-state.service';
import { unsub } from '../../utils/unsub';

@Component({
  selector: 'app-houses-list',
  standalone: true,
  imports: [moneyPipe, CommonModule, SkeletonComponent],
  templateUrl: './houses-list.component.html',
  styleUrl: './houses-list.component.css'
})

export class HousesListComponent extends unsub implements OnInit {
  houses$!: Observable<PropertiesData[] | []>;
  hasHouses$!: Observable<boolean>;
  @Input() showPagination: boolean = false;
  @Input() showFilter: boolean = false;
  page: number = 1;
  limit: number = 6;
  totalPages!: number;
  isLoading: boolean = false;

  constructor(
    private crudHouseService: crudHouseService,
    private houseStateService: HouseStateService,
    private filterHousesService: FilterHousesService
  ) { super(); }

  ngOnInit(): void {
    this.loadProperties();
  }

  byType(type: string): void {
    this.isLoading = true;
    this.filterHousesService.filterByType(type)
    .pipe(takeUntil(this.unsub$))
    .subscribe(properties => {
    this.houseStateService.setHouses(properties);
    this.isLoading = false;
   })
  }

  loadProperties(): void {
    this.isLoading = true;
    this.crudHouseService.getProperties(this.page, this.limit)
    .pipe(takeUntil(this.unsub$))
    .subscribe(houses => {
      this.totalPages = Math.ceil(houses.total / this.limit);
      this.isLoading = false;
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
