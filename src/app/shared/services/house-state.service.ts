import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PropertiesData } from '../models/interfaces/propertiesType';

@Injectable({
  providedIn: 'root'
})
export class HouseStateService {
  private housesSubject = new BehaviorSubject<PropertiesData[] | []>([]);
  private hasHousesSubject = new BehaviorSubject<boolean>(true);

  houses$ = this.housesSubject.asObservable();
  hasHouses$ = this.hasHousesSubject.asObservable();


  setHouses(houses: PropertiesData[] | null | undefined): void {
    if (!houses) {
      houses = [];
      this.hasHousesSubject.next(false);
    }
    this.housesSubject.next(houses);
    this.hasHousesSubject.next(houses.length > 0);
  }
}
