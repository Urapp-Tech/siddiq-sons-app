import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((c) => c.LoginPage),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.page').then((c) => c.DashboardPage),
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./pages/users/users.page').then((c) => c.UsersPage),
  },
  {
    path: 'cabins',
    loadComponent: () =>
      import('./pages/cabins/cabins.page').then((c) => c.CabinsPage),
  },
];
