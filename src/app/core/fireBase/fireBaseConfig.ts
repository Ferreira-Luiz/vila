import { importProvidersFrom } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { getAuth } from '@angular/fire/auth';
import { environment } from '../../../environments/environment.development';

export const firebaseProviders = [
  importProvidersFrom([
    AngularFireModule.initializeApp(environment),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
  ]),
  { provide: 'auth', useFactory: () => getAuth() }
];
