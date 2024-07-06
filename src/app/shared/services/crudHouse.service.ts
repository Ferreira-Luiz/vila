import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environments';
import { PropertiesData } from '../models/interfaces/propertiesType';
import { HouseStateService } from './house-state.service';

@Injectable({
  providedIn: 'root'
})

export class crudHouseService {
  private readonly APIurl = `${environment.API}`;

  constructor(private http: HttpClient, private houseStateService: HouseStateService) {}

  getProperties(page: number, limit: number): Observable<PropertiesData[]> {
    let params = new HttpParams();
    params = params.append('_page', page.toString());
    params = params.append('_limit', limit.toString());

    return this.http.get<PropertiesData[]>(`${this.APIurl}properties`, { params }).pipe(
      tap(houses => this.houseStateService.setHouses(houses)),
      catchError((error) => this.handleError<PropertiesData[]>(error, []))
    );
  }

  getPropertyById(id: string): Observable<PropertiesData> {
    return this.http.get<PropertiesData>(`${this.APIurl}properties/${id}`).pipe(
      catchError((error) => this.handleError<PropertiesData>(error))
    );
  }

  createProperties(properties: PropertiesData): Observable<PropertiesData> {
    return this.http.post<PropertiesData>(`${this.APIurl}properties`, properties).pipe(
      catchError((error) => this.handleError<PropertiesData>(error))
    );
  }

  updateProperty(id: string, properties: PropertiesData): Observable<PropertiesData> {
    return this.http.put<PropertiesData>(`${this.APIurl}properties/${id}`, properties).pipe(
      catchError((error) => this.handleError<PropertiesData>(error))
    );
  }

  deleteProperty(id: string): Observable<void> {
    return this.http.delete<void>(`${this.APIurl}properties/${id}`).pipe(
      catchError((error) => this.handleError<void>(error))
    );
  }

  private handleError<T>(error: HttpErrorResponse, result?: T): Observable<T> {
    console.error('An error occurred:', error.message);
    return of(result as T);
  }
}
