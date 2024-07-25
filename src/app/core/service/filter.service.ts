import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { PropertiesData } from '../../shared/models/interfaces/propertiesType';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private firestore: AngularFirestore) { }

  filterByType(type: string): Observable<PropertiesData[]> {
    const collectionRef = this.firestore.collection<PropertiesData>('houses', ref => ref.where('type', '==', type));
    return collectionRef.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as PropertiesData;
          const docId = a.payload.doc.id;
          return { ...data, docId };
        });
      })
    );
  }
}
