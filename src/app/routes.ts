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
    path: 'admin-user',
    loadComponent: () =>
      import('./pages/admin-user/admin-user.page').then((c) => c.AdminUserPage),
  },
  {
    path: 'admin-user-add',
    loadComponent: () =>
      import('./pages/admin-user-add/admin-user-add.page').then(
        (c) => c.AdminUserAddPage
      ),
  },
  {
    path: 'employee',
    loadComponent: () =>
      import('./pages/employee/employee.page').then((c) => c.EmployeePage),
  },
  {
    path: 'employee-cabin-history',
    loadComponent: () =>
      import('./pages/employee-cabin-history/employee-cabin-history.page').then(
        (c) => c.EmployeeCabinHistoryPage
      ),
  },
  {
    path: 'employee-add',
    loadComponent: () =>
      import('./pages/employee-add/employee-add.page').then(
        (c) => c.EmployeeAddPage
      ),
  },
  {
    path: 'cabins',
    loadComponent: () =>
      import('./pages/cabins/cabins.page').then((c) => c.CabinsPage),
  },
  {
    path: 'cabin',
    loadComponent: () =>
      import('./pages/cabin/cabin.page').then((c) => c.CabinPage),
  },
];
