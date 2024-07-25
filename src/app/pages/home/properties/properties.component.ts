import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { HousesListComponent } from '../../../shared/components/houses-list/houses-list.component';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [HousesListComponent, SectionTitleComponent, CommonModule],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css'
})

export class PropertiesComponent  {}
