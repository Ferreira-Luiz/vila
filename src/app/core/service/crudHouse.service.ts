import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, catchError, from, map, of, switchMap } from 'rxjs';
import { PropertiesData } from '../../shared/models/interfaces/propertiesType';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CrudHouseService {

  constructor(private firestore: AngularFirestore, private authService : AuthService) {}

  getAllProperties(): Observable<PropertiesData[]> {
    return this.firestore.collection<PropertiesData>('houses').valueChanges();
  }

  getPropertyById(id: string): Observable<PropertiesData | undefined> {
    return this.firestore.collection<PropertiesData>('houses').doc(id).valueChanges().pipe(
      map(doc => doc as PropertiesData | undefined),
      catchError(() => of(undefined))
    );
  }

  addHouse(house: PropertiesData): Observable<void> {
    return this.authService.getCurrentUser().pipe(
      switchMap(user => {
        if (user) {
          house.userId = user.uid;
          const houseId = this.firestore.createId();
          house.id = houseId;
          return from(this.firestore.collection('houses').doc(houseId).set(house)).pipe(
            map(() => void 0),
            catchError((error) => {
              throw error;
            })
          );
        } else {
          throw new Error('User not authenticated');
        }
      })
    );
  }

  getHousesByUser(userId: string): Observable<PropertiesData[]> {
    return this.firestore.collection<PropertiesData>('houses', ref => ref.where('userId', '==', userId)).valueChanges({ idField: 'id' });
  }

  updateProperty(id: string, property: Partial<PropertiesData>): Observable<void> {
    return from(this.firestore.collection<PropertiesData>('houses').doc(id).update(property)).pipe(
      catchError(err => {
        console.error('Error updating property:', err);
        return of(void 0);
      })
    );
  }

  deleteProperty(id: string): Observable<void> {
    return from(this.firestore.collection<PropertiesData>('houses').doc(id).delete()).pipe(
      catchError(err => {
        console.error('Error deleting property:', err);
        return of(void 0);
      })
    );
  }

}
