import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface User {
  id: number;
  email: string;
  full_name: string;
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  full_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<{ token: string; user: User | null } | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    const params = new URLSearchParams();
    params.append('username', credentials.username);
    params.append('password', credentials.password);

    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/token`, params.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).pipe(
      tap(response => {
        const userData = {
          token: response.access_token,
          user: null
        };
        localStorage.setItem('currentUser', JSON.stringify(userData));
        this.currentUserSubject.next(userData);
      })
    );
  }

  signup(credentials: SignupCredentials): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/auth/register`, credentials)
      .pipe(
        tap(user => {
          this.login({
            username: credentials.email,
            password: credentials.password
          }).subscribe();
        })
      );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value?.token;
  }

  getToken(): string | null {
    return this.currentUserSubject.value?.token || null;
  }
} 