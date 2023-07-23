import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginForm, signUpData } from '../models/auth-interface';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private TOKEN_KEY = 'jwtToken';
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  signUp(data: signUpData) {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }

  login(data: signUpData) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  saveToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token); // Use sessionStorage instead of localStorage
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY); // Use sessionStorage instead of localStorage
  }

  removeToken(): void {
    sessionStorage.removeItem(this.TOKEN_KEY); // Use sessionStorage instead of localStorage
  }
}
