import { Injectable } from '@angular/core';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  User,
} from '../../models/auth';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:5254/api/Auth';
  private user: User | null = null;

  constructor(private http: HttpClient) {
    // Load user from localStorage on service initialization
    this.loadUserFromLocalStorage();
  }

  public login(user: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, user).pipe(
      tap((response) => {
        this.user = {
          id: response.id,
          userName: response.userName,
          role: response.role,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        };
        this.saveUserToLocalStorage();
      })
    );
  }

  public register(user: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.baseUrl}/register`, user);
  }

  private saveUserToLocalStorage(): void {
    if (this.user) {
      localStorage.setItem('user', JSON.stringify(this.user));
    }
  }

  private loadUserFromLocalStorage(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        this.user = JSON.parse(userData);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        this.clearLocalStorage();
      }
    }
  }

  private clearLocalStorage(): void {
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    const userData = localStorage.getItem('user');
    if (!userData) return false;

    try {
      const user = JSON.parse(userData);
      // Check if user has required fields and token is not expired
      return !!(
        user &&
        user.accessToken &&
        !this.isTokenExpired(user.accessToken)
      );
    } catch {
      return false;
    }
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }

  logout(): void {
    this.user = null;
    this.clearLocalStorage();
  }

  getCurrentUser(): User | null {
    return this.user;
  }

  getUserName(): string {
    return this.user?.userName || '';
  }

  getUserId(): string {
    return this.user?.id || '';
  }

  getAccessToken(): string {
    return this.user?.accessToken || '';
  }

  getRefreshToken(): string {
    return this.user?.refreshToken || '';
  }
}
