import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthResponse {
  user: User;
  token: string;
  expiresIn: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_data';
  private readonly TOKEN_EXPIRY_KEY = 'token_expiry';

  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private router: Router) {
    this.loadStoredUser();
  }

  private loadStoredUser(): void {
    const userData = localStorage.getItem(this.USER_KEY);
    try {
      if (userData && userData !== 'undefined') {
        this.userSubject.next(JSON.parse(userData));
      }
    } catch (e) {
      localStorage.removeItem(this.USER_KEY);
      this.userSubject.next(null);
    }
  }

  public get currentUser(): User | null {
    return this.userSubject.value;
  }

  public get token(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public isAuthenticated(): boolean {
    const token = this.token;
    const expiry = localStorage.getItem(this.TOKEN_EXPIRY_KEY);
    
    if (!token || !expiry) return false;
    
    // Verifica se o token expirou
    return new Date().getTime() < parseInt(expiry);
  }

  public setSession(authResult: AuthResponse): void {
    const expiresAt = new Date().getTime() + (authResult.expiresIn * 1000);
    localStorage.setItem(this.TOKEN_KEY, authResult.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(authResult.user));
    localStorage.setItem(this.TOKEN_EXPIRY_KEY, expiresAt.toString());
    this.userSubject.next(authResult.user);
  }

  public logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.TOKEN_EXPIRY_KEY);
    
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  public updateUserData(userData: Partial<User>): void {
    const currentUser = this.currentUser;
    if (currentUser) {
      const updatedUser = { ...currentUser, ...userData };
      localStorage.setItem(this.USER_KEY, JSON.stringify(updatedUser));
      this.userSubject.next(updatedUser);
    }
  }
} 