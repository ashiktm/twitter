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

  isAuthenticated(): boolean {
    // Get the JWT token from localStorage
    const token = this.getToken();

    // Check if the token exists and is not expired (if applicable)
    // Replace 'decodeToken' with your function to decode the JWT token

    // && !this.isTokenExpired(token)
    if (token) {
      return true; // User is authenticated
    }

    return false; // User is not authenticated
  }

  private isTokenExpired(token: string): boolean {
    // Implement the logic to check if the token is expired
    // For example, parse the token and check the expiration date against the current date
    // Return true if expired, false if not expired
    // Note: This is a simplified example, and you should use a proper library for JWT token handling and validation
    const decodedToken = this.decodeToken(token);
    const expirationDate = decodedToken.exp * 1000; // Convert expiration time to milliseconds
    return Date.now() >= expirationDate;
  }

  private decodeToken(token: string): any {
    // Replace this with your actual JWT token decoding logic
    // You can use libraries like 'jwt-decode' or 'jsonwebtoken' to decode the token
    // For example: return jwt_decode(token);
    // Here, we use a placeholder function to return an empty object for simplicity
    return {};
  }
}
