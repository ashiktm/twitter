import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError, catchError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { HttpContextToken } from '@angular/common/http';

export const IS_PUBLIC_API = new HttpContextToken<boolean>(() => false);
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 1. Check if the request is marked as Public
    if (request.context.get(IS_PUBLIC_API)) {
      return next.handle(request);
    }

    const token = this.authService.getToken();

    // 2. No Token Case: Strict Enforcement
    if (!token) {
      this.handleAuthError();
      return throwError(() => new Error('No authentication token available.'));
    }

    // 3. Inject Token
    const authRequest = request.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });

    // 4. Global Error Handling (The "Catch-All")
    return next.handle(authRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.handleAuthError();
        }
        return throwError(() => error);
      })
    );
  }

  private handleAuthError() {
    this.router.navigate(['/login'], { 
      queryParams: { returnUrl: this.router.url } // UX: Send them back where they were
    });
  }
}