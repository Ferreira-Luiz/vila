import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { CrudHouseService } from '../../core/service/crudHouse.service';
import { PageBannerComponent } from '../../shared/components/page-banner/page-banner.component';

@Component({
  selector: 'app-properties-details',
  standalone: true,
  imports: [CommonModule, PageBannerComponent],
  templateUrl: './properties-details.component.html',
  styleUrls: ['./properties-details.component.css']
})
export class PropertiesDetailsComponent implements OnInit {
  house$!: Observable<any>;
  private route = inject(ActivatedRoute);

  constructor( private crudHouseService: CrudHouseService ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.house$ = this.crudHouseService.getPropertyById(id);
  }


}
