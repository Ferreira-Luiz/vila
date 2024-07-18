import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { PropertiesData } from '../../shared/models/interfaces/propertiesType';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})

export class FilterHousesService {
  private readonly APIurl = `${environment.API}`;

  constructor(private http: HttpClient) { }

  filterByType(type: string, page: number, limit: number): Observable<any> {
    let params = new HttpParams()
      .set('type', type)
      .set('_page', page.toString())
      .set('_limit', limit.toString());

    return this.http.get<PropertiesData[]>(`${this.APIurl}properties`, { observe: 'response', params }).pipe(
      map((response: HttpResponse<PropertiesData[]>) => {
        const total = parseInt(response.headers.get('X-Total-Count') || '0', 10);
        const data = response.body || [];
        return { data, total };
      }),
      catchError((error) => of([error]))
    );
  }

  getFilteredProperty(): Observable<PropertiesData[]> {
    return this.http.get<PropertiesData[]>(`${this.APIurl}properties`).pipe(
      map(properties => this.filterOneOfEachType(properties)),
      catchError((error) => of([error]))
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
