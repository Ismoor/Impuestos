import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject: BehaviorSubject<boolean>;
  public isAuthenticated$: Observable<boolean>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
    this.checkAuthenticated();
  }

  private checkAuthenticated(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      const isAuthenticated = !!token;
      this.isAuthenticatedSubject.next(isAuthenticated);
    }
  }

  public login(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('authToken', token);
      this.isAuthenticatedSubject.next(true);
    }
  }

  public logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken');
      this.isAuthenticatedSubject.next(false);
    }
  }

  public isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
