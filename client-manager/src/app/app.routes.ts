import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { UserRole } from './core/models/auth.model';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'assembly'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'analytics',
    canActivate: [authGuard],
    data: { roles: [UserRole.Admin, UserRole.Manager] },
    loadComponent: () =>
      import('./pages/analytics/analytics.page').then((m) => m.AnalyticsPage),
  },
  {
    path: 'assembly',
    canActivate: [authGuard],
    data: { roles: [UserRole.Admin, UserRole.Manager, UserRole.Assembler] },
    loadComponent: () =>
      import('./pages/assembly/assembly.page').then((m) => m.AssemblyPage),
  },
  {
    path: 'delivery',
    canActivate: [authGuard],
    data: { roles: [UserRole.Admin, UserRole.Manager, UserRole.Courier] },
    loadComponent: () =>
      import('./pages/delivery/delivery.page').then((m) => m.DeliveryPage),
  },
  {
    path: 'products',
    canActivate: [authGuard],
    data: { roles: [UserRole.Admin, UserRole.Manager] },
    loadComponent: () =>
      import('./pages/products/products.page').then((m) => m.ProductsPage),
  },
  {
    path: 'settings/users',
    canActivate: [authGuard],
    data: { roles: [UserRole.Admin] },
    loadComponent: () =>
      import('./pages/settings/users/users.page').then((m) => m.UsersPage),
  },
  {
    path: 'settings',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/settings/settings.page').then((m) => m.SettingsPage),
  },
  {
    path: 'settings/profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/settings/profile/profile.page').then((m) => m.ProfilePage),
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
