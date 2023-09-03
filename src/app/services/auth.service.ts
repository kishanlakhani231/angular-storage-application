import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isUserLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(this.isUserLoggedIn());

  constructor() { }

  login(credential: User): Observable<boolean> {
    console.log(credential, environment.credential)
    if (credential.email == environment.credential.email && credential.password == environment.credential.password) {
      localStorage.setItem('token', environment.token);
      this.setLoginStatus(true);
      return of(true);
    }
    return of(false);
  }

  isUserLoggedIn(): boolean {
    return (localStorage.getItem('token') && (localStorage.getItem('token') == environment.token)) ? true : false;
  }

  logout(): void {
    localStorage.clear();
    this.setLoginStatus(false);
  }

  getUserAuthLoginStatus() {
    return this.isUserLoggedIn$.asObservable();
  }

  setLoginStatus(status: boolean): void {
    this.isUserLoggedIn$.next(status);
  }
}
