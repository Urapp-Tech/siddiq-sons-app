import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { BackOfficeUserService } from 'src/app/services/back-office-user.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import {
  BackOfficeUser,
  Employee,
  GetBackOfficeUsersResponse,
  GetEmployeesResponse,
} from 'src/app/types/users.types';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { EmployeesComponent } from './employees/employees.component';

export type Tab = 'ADMIN_USERS' | 'EMPLOYEES';

@Component({
  selector: 'app-users',
  templateUrl: 'users.page.html',
  styleUrls: ['users.page.scss'],
  standalone: true,
  imports: [
    IonicSharedModule,
    HeaderComponent,
    SharedModule,
    AdminUsersComponent,
    EmployeesComponent,
  ],
})
export class UsersPage {
  constructor(
    private readonly loadingService: LoadingService,
    private readonly toastService: ToastService,
    private readonly backOfficeUserService: BackOfficeUserService,
    private readonly employeeService: EmployeeService,
    private readonly navController: NavController
  ) {}

  selectedTab: Tab = 'ADMIN_USERS';

  backOfficeUsersData: { items: Array<BackOfficeUser> } = {
    items: [],
  };

  employeesData: { items: Array<Employee> } = {
    items: [],
  };

  async ionViewWillEnter() {
    await this.getBackOfficeUsers(0, 2147483648);
    await this.getEmployees(0, 2147483648);
  }

  async navigateToAddUser() {
    if (this.selectedTab === 'ADMIN_USERS') {
      await this.navController.navigateForward('/admin-user-add');
      return;
    }
    await this.navController.navigateForward('/employee-add');
  }

  async getBackOfficeUsers(page = 0, size = 10, search = '') {
    await this.loadingService.show();
    const handleResponse = async (response: GetBackOfficeUsersResponse) => {
      await this.loadingService.hide();
      if (response.success) {
        this.backOfficeUsersData.items = response.data.list;
        return;
      }
      await this.toastService.show(response.message);
    };
    const handleError = async (error: HttpErrorResponse) => {
      await this.loadingService.hide();
      await this.toastService.show(error.message);
    };
    this.backOfficeUserService
      .getBackOfficeUsers(page, size, search)
      .subscribe({
        next: handleResponse,
        error: handleError,
      });
  }

  async getEmployees(page = 0, size = 10, search = '') {
    await this.loadingService.show();
    const handleResponse = async (response: GetEmployeesResponse) => {
      await this.loadingService.hide();
      if (response.success) {
        this.employeesData.items = response.data.list;
        return;
      }
      await this.toastService.show(response.message);
    };
    const handleError = async (error: HttpErrorResponse) => {
      await this.loadingService.hide();
      await this.toastService.show(error.message);
    };
    this.employeeService.getEmployees(page, size, search).subscribe({
      next: handleResponse,
      error: handleError,
    });
  }
}
