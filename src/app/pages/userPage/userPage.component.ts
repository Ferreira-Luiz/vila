import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { switchMap, takeUntil } from 'rxjs';

import { AuthService } from '../../core/auth/auth.service';
import { CrudHouseService } from '../../core/service/crudHouse.service';
import { IconsModule } from '../../icons/icons.module';
import { PropertiesData } from '../../shared/models/interfaces/propertiesType';
import { moneyPipe } from '../../shared/pipes/money.pipe';
import { ImageURLRegexValidator } from '../../shared/utils/imageURLvalidator';
import { unsub } from '../../shared/utils/unsub';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'userPage',
  standalone: true,
  imports: [
  CommonModule, ReactiveFormsModule,
  IconsModule, moneyPipe, RouterModule
],
  templateUrl: './userPage.component.html',
  styleUrls: ['./userPage.component.css']
})
export class userPage extends unsub implements OnInit {
  private formBuilderService = inject(FormBuilder);

  houses: PropertiesData[] = [];
  showMore: boolean = false;
  editMode: boolean = false;
  editingPropertyId: string | null = null;
  hasError: boolean = false;
  showHouses: boolean = false;
  showHouseDetails: boolean = false;

  protected houseForm = this.formBuilderService.group({
    title: ['', [Validators.required]],
    floor: [0 , [Validators.required, Validators.max(10)]],
    rooms: [0 , [Validators.required, Validators.max(10)]],
    area: [50 , [Validators.required, Validators.min(50)]],
    bedrooms: [0 , [Validators.required, Validators.max(20)]],
    bathrooms: [0 , [Validators.required, Validators.max(20)]],
    image: ['' , [Validators.required, Validators.pattern(ImageURLRegexValidator)]],
    description: [''],
    parkingSpots: [0 , [Validators.required, Validators.max(20)]],
    paymentProcess: ['' , [Validators.required, Validators.pattern(/^(Credit Card|Money|Bank)$/)]],
    price: [0 , [Validators.required, Validators.min(0)]],
    type: ['', [Validators.required, Validators.pattern(/^(Penthouse|Villa House|Appartment)$/)]],
  });

  constructor( private crudHouseService: CrudHouseService, private authService: AuthService) {
    super();
  }

  ngOnInit() {
    this.loadUserProperties();
  }

  toogleShowHouseDetails() {
    this.showHouseDetails = !this.showHouseDetails;
  }

  loadUserProperties() {
    this.authService.getCurrentUser().pipe(
      switchMap(user => {
        if (user) {
          return this.crudHouseService.getHousesByUser(user.uid);
        } else {
          throw new Error('User not authenticated');
        }
      })
    )
    .pipe(takeUntil(this.unsub$))
    .subscribe(houses => {
      this.houses = houses;
    });
  }

  addProperty() {
    if (this.houseForm.valid) {
      const house  = this.houseForm.value;
      this.crudHouseService.addHouse(house as PropertiesData)
      .pipe(takeUntil(this.unsub$))
      .subscribe(() => {
        this.houseForm.reset();
        this.loadUserProperties();
      });
    }
  }

  cancelEditMode() {
    this.editMode = false;
    this.editingPropertyId = null;
    this.houseForm.reset();
  }

  updateProperty() {
    if (this.editMode && this.editingPropertyId && this.houseForm.valid) {
      const house = this.houseForm.value;
      this.crudHouseService.updateProperty(this.editingPropertyId, house as PropertiesData)
      .pipe(takeUntil(this.unsub$))
      .subscribe(() => {
        this.houseForm.reset();
        this.editMode = false;
        this.editingPropertyId = null;
        this.loadUserProperties();
      });
    }
  }

  editProperty(property: PropertiesData) {
    this.houseForm.patchValue(property);
    this.editMode = true;
    this.editingPropertyId = property.id || null;
  }

  deleteProperty(id: string) {
    this.crudHouseService.deleteProperty(id)
    .pipe(takeUntil(this.unsub$))
    .subscribe(() => {
      this.loadUserProperties();
    });
  }

  toogleShowHouses() {
    if (this.houses.length > 0) {
    this.showHouses = !this.showHouses;
    }
  }
}
