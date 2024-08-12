import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

import { IconsModule } from '../../../icons/icons.module';
import { PropertiesData } from '../../../shared/models/interfaces/propertiesType';
import { SectionTitleComponent } from '../../../shared/ui_elements/section-title/section-title.component';
import { CrudHouseService } from './../../../core/service/crudHouse.service';


@Component({
  selector: 'app-best-deal',
  standalone: true,
  imports: [SectionTitleComponent, IconsModule, CommonModule, RouterModule],
  templateUrl: './best-deal.component.html',
  styleUrl: './best-deal.component.css'
})

export class BestDealComponent implements OnInit {
  filteredProperties$!: Observable<PropertiesData[]>;
  selectedType$: BehaviorSubject<string> = new BehaviorSubject<string>('Appartment');
  selectedProperty$!: Observable<PropertiesData | undefined>;

  @ViewChild('appartment', { static: true }) appartment!: ElementRef;
  @ViewChild('villa', { static: true }) villa!: ElementRef;
  @ViewChild('penthouse', { static: true }) penthouse!: ElementRef;

  constructor( private crudHouseService: CrudHouseService) { }

  ngOnInit(): void {
    this.loadFilteredProperties();
    this.selectedProperty$ = combineLatest([this.filteredProperties$, this.selectedType$]).pipe(
      map(([properties, selectedType]) => properties.find(property => property.type === selectedType))
    );
  }

  loadFilteredProperties(): void {
    this.filteredProperties$ = this.crudHouseService.getAllProperties().pipe(
      map(properties => this.filterOneOfEachType(properties))
    );
  }

  filterOneOfEachType(properties: PropertiesData[]): PropertiesData[] {
    const filteredProperties: PropertiesData[] = [];

    const apartment = properties.find(property => property.type === 'Appartment');
    if (apartment) {
      filteredProperties.push(apartment);
    }

    const villaHouse = properties.find(property => property.type === 'Villa House');
    if (villaHouse) {
      filteredProperties.push(villaHouse);
    }

    const penthouse = properties.find(property => property.type === 'Penthouse');
    if (penthouse) {
      filteredProperties.push(penthouse);
    }

    return filteredProperties;
  }

  onSelectType(type: string): void {
    this.selectedType$.next(type);
    this.updateClass(type);
  }

  private updateClass(type: string): void {
    const elements: { [key: string]: ElementRef<any> } = {
      'Appartment': this.appartment,
      'Villa House': this.villa,
      'Penthouse': this.penthouse
    };

    for (const E in elements) {
      if (elements.hasOwnProperty(E)) {
        const element = elements[E];
        if (E === type) {
          element.nativeElement.classList.add('active');
        } else {
          element.nativeElement.classList.remove('active');
        }
      }
    }
  }

toTop() {
  window.scrollTo(0, 0);
}

}
