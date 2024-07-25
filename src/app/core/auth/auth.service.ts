import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '@firebase/auth-types';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private afAuth: AngularFireAuth) {}

  user$: Observable<User | null> = this.afAuth.authState.pipe(
    map(user => user),
    catchError(() => of(null))
  );

  login(email: string, password: string) {
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      catchError(err => {
        console.error('Erro ao fazer login:', err);
        return of({ error: err });
      })
    );
  }

  register(email: string, password: string, displayName: string, photoURL: string) {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password)).pipe(
      switchMap(({ user }) => {
        if (user) {
          return from(user.updateProfile({ displayName, photoURL })).pipe(
            switchMap(() => this.logout()),
            map(() => user),
            catchError(err => {
              console.error('Erro ao atualizar perfil:', err);
              return of({ error: err });
            })
          );
        } else {
          throw new Error('Erro ao criar usuário');
        }
      }),
      catchError(err => {
        console.error('Erro ao registrar usuário:', err);
        return of({ error: err });
      })
    );
  }


  logout() {
    return from(this.afAuth.signOut()).pipe(
      catchError(err => {
        console.error('Erro ao fazer logout:', err);
        return of({ error: err });
      })
    );
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.user$.pipe(
      map(user => !!user)
    );
  }

  getCurrentUser(): Observable<User | null> {
    return this.user$;
  }

  getCurrentUserProfile(): Observable<{ displayName: string | null, photoURL: string | null, email: string | null } | null> {
    return this.user$.pipe(
      map(user => {
        if (user) {
          return { displayName: user.displayName, photoURL: user.photoURL, email: user.email};
        } else {
          return null;
        }
      }),
      catchError(() => of(null))
    );
  }


}
