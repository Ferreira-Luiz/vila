import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { map, Observable, takeUntil } from 'rxjs';

import { CrudHouseService } from '../../../core/service/crudHouse.service';
import { FilterService } from '../../../core/service/filter.service';
import { PropertiesData } from '../../models/interfaces/propertiesType';
import { moneyPipe } from '../../pipes/money.pipe';
import { SkeletonComponent } from '../../utils/skeleton/skeleton.component';
import { unsub } from '../../utils/unsub';

@Component({
  selector: 'app-houses-list',
  standalone: true,
  imports: [moneyPipe, CommonModule, SkeletonComponent, RouterModule],
  templateUrl: './houses-list.component.html',
  styleUrl: './houses-list.component.css',
})

export class HousesListComponent extends unsub implements OnInit {
  houses$!: Observable<PropertiesData[] | []>;
  page: number = 1;
  limit: number = 6;
  totalPages!: number ;
  isLoading: boolean = false;
  hasHouses: boolean = false;
  selectedType: string = 'Appartment';
  @Input() showPagination: boolean = false;
  @Input() showFilter: boolean = false;
  @ViewChild('appartment', { static: false }) appartment!: ElementRef;
  @ViewChild('villa', { static: false }) villa!: ElementRef;
  @ViewChild('penthouse', { static: false }) penthouse!: ElementRef;

  constructor(
    private crudHouseService: CrudHouseService,
    private filterService: FilterService
  ) { super(); }

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties() {
    this.isLoading = true;
    this.houses$ = this.crudHouseService.getAllProperties().pipe(
      map((houses) => {
        this.totalPages = Math.ceil(houses.length / this.limit);
        return houses.slice((this.page - 1) * this.limit, this.page * this.limit);
      })
    );

    this.houses$.pipe(takeUntil(this.unsub$)).subscribe({
      next: (houses) => {
        this.isLoading = false;
        this.hasHouses = houses.length > 0;
      },
      error: () => {
        this.isLoading = false;
        this.hasHouses = false;
      }
    });
  }

  byType(type: string): void {
    this.isLoading = true;
    this.page = 1;
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

    this.houses$ = this.filterService.filterByType(type).pipe(
      map((houses) => {
        this.totalPages = Math.ceil(houses.length / this.limit);
        return houses.slice((this.page - 1) * this.limit, this.page * this.limit);
      })
    );

    this.houses$.pipe(takeUntil(this.unsub$)).subscribe({
      next: (houses) => {
        this.isLoading = false;
        this.hasHouses = houses.length > 0;
      },
      error: () => {
        this.isLoading = false;
        this.hasHouses = false;
      }
    });
  }

  onNextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadProperties();
    }
  }

  onPreviousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadProperties();
    }
  }
}







