import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = authService.isAuthenticated();
  const user = authService.currentUser();

  if (isAuthenticated && user) {
    const requiredRoles = route.data['roles'] as any[];
    if (requiredRoles && !authService.hasRole(requiredRoles)) {
      if (state.url !== '/assembly' && state.url !== '/') {
        router.navigate(['/assembly']);
      }
      return false;
    }
    return true;
  }

  if (state.url !== '/login') {
    router.navigate(['/login']);
  }
  return false;
};
