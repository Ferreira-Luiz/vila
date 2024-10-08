import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { HousesListComponent } from '../../../shared/components/houses-list/houses-list.component';
import { SectionTitleComponent } from '../../../shared/ui_elements/section-title/section-title.component';
import { SkeletonComponent } from "../../../shared/utils/skeleton/skeleton.component";

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [HousesListComponent, SectionTitleComponent, CommonModule, SkeletonComponent],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css'
})

export class PropertiesComponent  {}
