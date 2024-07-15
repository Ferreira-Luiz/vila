import { FilterHousesService } from './../../services/filter-houses.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SectionTitleComponent } from '../section-title/section-title.component';
import { IconsModule } from '../../../icons/icons.module';
import { PropertiesData } from '../../models/interfaces/propertiesType';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


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
  @ViewChild('appartment') appartment!: ElementRef;
  @ViewChild('villa') villa!: ElementRef;
  @ViewChild('penthouse') penthouse!: ElementRef;

  constructor(private filterHousesService: FilterHousesService) { }

  ngOnInit(): void {
    this.filteredProperties$ = this.filterHousesService.getFilteredProperty();
    this.selectedProperty$ = combineLatest([this.filteredProperties$, this.selectedType$]).pipe(
      map(([properties, selectedType]) => properties.find(property => property.type === selectedType))
    );
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
