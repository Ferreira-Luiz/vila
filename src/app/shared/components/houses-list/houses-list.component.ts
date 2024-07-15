import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, takeUntil } from 'rxjs';

import { PropertiesData } from '../../models/interfaces/propertiesType';
import { moneyPipe } from '../../pipes/money.pipe';
import { crudHouseService } from '../../services/crudHouse.service';
import { SkeletonComponent } from '../../utils/skeleton/skeleton.component';
import { unsub } from '../../utils/unsub';
import { FilterHousesService } from './../../services/filter-houses.service';
import { HouseStateService } from './../../services/house-state.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-houses-list',
  standalone: true,
  imports: [moneyPipe, CommonModule, SkeletonComponent,RouterModule],
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
  @ViewChild('appartment') appartment!: ElementRef;
  @ViewChild('villa') villa!: ElementRef;
  @ViewChild('penthouse') penthouse!: ElementRef;

  constructor(
    private crudHouseService: crudHouseService,
    private houseStateService: HouseStateService,
    private filterHousesService: FilterHousesService
  ) { super(); }

  ngOnInit(): void {
    this.loadProperties();
  }

   typeToElements = {
    'Appartment': this.appartment,
    'Villa House': this.villa,
    'Penthouse': this.penthouse
  }

  removeActiveClass(): void {
    const typeToElementMap: { [key: string]: ElementRef<any> | undefined } = {
        'Appartment': this.appartment,
        'Villa House': this.villa,
        'Penthouse': this.penthouse
    };
    Object.values(typeToElementMap).forEach(element => {
        if (element) {
            element.nativeElement.classList.remove('active');
        }
    });
}

byType(type: string): void {
    this.isLoading = true;
    const typeToElementMap: { [key: string]: ElementRef<any> | undefined } = {
        'Appartment': this.appartment,
        'Villa House': this.villa,
        'Penthouse': this.penthouse
    };
    Object.values(typeToElementMap).forEach(element => {
      if (element) {
        element.nativeElement.classList.remove('active');
    }
  });
    const selectedElement = typeToElementMap[type];
    if (selectedElement) {
        selectedElement.nativeElement.classList.add('active');
    }
    this.filterHousesService.filterByType(type, this.page, this.limit)
      .pipe(takeUntil(this.unsub$))
      .subscribe(response => {
        this.houseStateService.setHouses(response.data);
        this.houses$ = this.houseStateService.houses$;
        this.totalPages = Math.ceil(response.total / this.limit);
        this.isLoading = false;
      });
  }

  loadProperties(): void {
    this.isLoading = true;
    this.crudHouseService.getProperties(this.page, this.limit)
      .pipe(takeUntil(this.unsub$))
      .subscribe(response => {
        this.houseStateService.setHouses(response.data);
        this.totalPages = Math.ceil(response.total / this.limit);
        this.isLoading = false;
        this.houses$ = this.houseStateService.houses$;
        this.hasHouses$ = this.houseStateService.hasHouses$;
        this.isLoading = false;
      })
      this.removeActiveClass();
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
