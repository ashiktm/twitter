import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
export const authGuard: CanActivateFn = (route, state) => {
  const oauthService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  if (oauthService.isAuthenticated()) {
    return true; // Allow access to the route
  } else {
    // If the user is not authenticated, redirect to the login page
    return router.parseUrl('/login');
  }
  return true;
};
