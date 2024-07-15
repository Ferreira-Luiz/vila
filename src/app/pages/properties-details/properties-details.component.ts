import { crudHouseService } from './../../shared/services/crudHouse.service';
import { Component, OnInit } from '@angular/core';
import { getParamsID } from '../../shared/utils/getParamsID';
import { Observable, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BestDealComponent } from '../../shared/components/best-deal/best-deal.component';

@Component({
  selector: 'app-properties-details',
  standalone: true,
  imports: [CommonModule, BestDealComponent],
  templateUrl: './properties-details.component.html',
  styleUrl: './properties-details.component.css'
})
export class PropertiesDetailsComponent{

  constructor(private crudHouseService : crudHouseService) {}

  house$ = getParamsID().pipe(
    switchMap((id) => this.crudHouseService.getPropertyById(id))
  );

}
