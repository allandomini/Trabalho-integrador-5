// src/app/services/auth.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth/login'; // Substitua pela URL do seu backend
  private isAuthenticated = false;
  private user: string | null = null;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: any) {
    // Verificar se há um token ou estado salvo no localStorage
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        this.isAuthenticated = true;
        this.user = localStorage.getItem('user');
      }
    }
  }

  login(username: string, password: string): Observable<any> {
    // Simulação de login (substitua por uma chamada real ao backend)
    // Para testes, assumimos que o login é bem-sucedido se username === "admin" e password === "admin123"
    if (username === 'admin' && password === 'admin123') {
      this.isAuthenticated = true;
      this.user = username;
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('authToken', 'fake-token'); // Simula um token
        localStorage.setItem('user', username);
      }
      return of({ success: true }).pipe(
        tap(() => console.log('Login successful'))
      );
    } else {
      return throwError(() => new Error('Invalid username or password'));
    }

    // Descomente para usar uma chamada real ao backend
    /*
    return this.http.post<any>(this.apiUrl, { username, password }).pipe(
      tap(response => {
        this.isAuthenticated = true;
        this.user = username;
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('user', username);
        }
      }),
      catchError(err => {
        this.isAuthenticated = false;
        this.user = null;
        if (isPlatformBrowser(this.platformId)) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
        }
        return throwError(() => new Error('Login failed'));
      })
    );
    */
  }

  logout(): void {
    this.isAuthenticated = false;
    this.user = null;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getUser(): string | null {
    return this.user;
  }
}