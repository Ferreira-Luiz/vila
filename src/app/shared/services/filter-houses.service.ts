import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PropertiesData } from '../models/interfaces/propertiesType';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class FilterHousesService {
  private readonly APIurl = `${environment.API}`;

  constructor(private http: HttpClient) { }

  filterByType(type: string): Observable<PropertiesData[]> {
    let params = new HttpParams().set('type', type);
    return this.http.get<PropertiesData[]>(this.APIurl, { params });
  }

  filterByPriceRange(minPrice: number, maxPrice: number): Observable<PropertiesData[]> {
    let params = new HttpParams()
      .set('minPrice', minPrice.toString())
      .set('maxPrice', maxPrice.toString());
    return this.http.get<PropertiesData[]>(this.APIurl, { params });
  }

  getFilteredProperty(): Observable<PropertiesData[]> {
    return this.http.get<PropertiesData[]>(`${this.APIurl}properties`).pipe(
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
}
