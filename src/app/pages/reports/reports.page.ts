import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { CustomSelectComponent } from 'src/app/components/custom-select/custom-select.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { EmployeeService } from 'src/app/services/employee.service';
import { LoadingService } from 'src/app/services/loading.service';
import { OperationCategoryItemService } from 'src/app/services/operation-category-item.service';
import { OperationCategoryService } from 'src/app/services/operation-category.service';
import { OperationReportService } from 'src/app/services/operation-report.service';
import { ToastService } from 'src/app/services/toast.service';
import { Employee, GetEmployeesResponse } from 'src/app/types/employee.types';
import {
  GetOperationCategoryItemsResponse,
  OperationCategoryItem,
} from 'src/app/types/operation-category-item.types';
import {
  GetOperationCategoriesResponse,
  OperationCategory,
} from 'src/app/types/operation-category.types';
import {
  CreateOperationReportPayload,
  CreateOperationReportResponse,
} from 'src/app/types/operation-report.types';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';

@Component({
  selector: 'app-reports',
  templateUrl: 'reports.page.html',
  styleUrls: ['reports.page.scss'],
  standalone: true,
  imports: [
    IonicSharedModule,
    HeaderComponent,
    SharedModule,
    CustomSelectComponent,
  ],
})
export class ReportsPage {
  constructor(
    private readonly operationCategoryService: OperationCategoryService,
    private readonly operationCategoryItemService: OperationCategoryItemService,
    private readonly loadingService: LoadingService,
    private readonly toastService: ToastService,
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly employeeService: EmployeeService,
    private readonly operationReportService: OperationReportService
  ) {}

  employees: Array<Employee> = [];

  selectedEmployee: Employee | null = null;

  categories: Array<OperationCategory> = [];

  selectedCategory: OperationCategory | null = null;

  items: Array<OperationCategoryItem> = [];

  selectedItem: OperationCategoryItem | null = null;

  addActivityForm = this.formBuilder.group({
    batchNumber: ['', [Validators.required, Validators.pattern(/[\d+]/gm)]],
    quantity: ['', [Validators.required, Validators.pattern(/[\d+]/gm)]],
  });

  async ionViewWillEnter() {
    this.addActivityForm.disable();
    await this.getOperationCategories(0, 2147483648);
    await this.getEmployees(0, 2147483648);
  }

  async selectEmployee(employee: Employee) {
    this.selectedEmployee = employee;
  }

  async selectCategory(category: OperationCategory) {
    this.items = [];
    this.selectedItem = null;
    this.addActivityForm.reset();
    this.addActivityForm.disable();
    this.selectedCategory = category;
    await this.getOperationCategoryItems(
      this.selectedCategory.id,
      0,
      2147483648
    );
  }

  async selectItem(item: OperationCategoryItem) {
    this.addActivityForm.reset();
    this.selectedItem = item;
    this.addActivityForm.enable();
  }

  async submit() {
    if (!this.selectedEmployee) {
      this.toastService.show('employee is required');
      return;
    }
    if (!this.selectedCategory) {
      this.toastService.show('category is required');
      return;
    }
    if (!this.selectedItem) {
      this.toastService.show('item is required');
      return;
    }
    if (this.addActivityForm.invalid) {
      this.addActivityForm.markAllAsTouched();
      return;
    }
    const { batchNumber: bno, quantity: qty } =
      this.addActivityForm.getRawValue();

    const payload = {
      employee: this.selectedEmployee.id,
      operationCategory: this.selectedCategory.id,
      operationCategoryItem: this.selectedItem.id,
      bno,
      qty,
    };

    await this.createOperationReport(payload);
  }

  controlHasError(control: FormControl) {
    return Boolean(control.touched && control.errors);
  }

  async getEmployees(page = 0, size = 10, search = '') {
    await this.loadingService.show();
    const handleResponse = async (response: GetEmployeesResponse) => {
      await this.loadingService.hide();
      if (response.success) {
        this.employees = response.data.list;
        return;
      }
      await this.toastService.show(response.message);
    };
    const handleError = async (error: HttpErrorResponse) => {
      await this.loadingService.hide();
      await this.toastService.show(error.error.message);
    };
    this.employeeService.getEmployees(page, size, search).subscribe({
      next: handleResponse,
      error: handleError,
    });
  }

  async getOperationCategories(page = 0, size = 10, search = '') {
    await this.loadingService.show();
    const handleResponse = async (response: GetOperationCategoriesResponse) => {
      await this.loadingService.hide();
      if (response.success) {
        this.categories = response.data.list;
        return;
      }
      await this.toastService.show(response.message);
    };
    const handleError = async (error: HttpErrorResponse) => {
      await this.loadingService.hide();
      await this.toastService.show(error.error.message);
    };
    this.operationCategoryService
      .getOperationCategories(page, size, search)
      .subscribe({
        next: handleResponse,
        error: handleError,
      });
  }

  async getOperationCategoryItems(
    categoryId: string,
    page = 0,
    size = 10,
    search = ''
  ) {
    await this.loadingService.show();
    const handleResponse = async (
      response: GetOperationCategoryItemsResponse
    ) => {
      await this.loadingService.hide();
      if (response.success) {
        this.items = response.data.list;
        return;
      }
      await this.toastService.show(response.message);
    };
    const handleError = async (error: HttpErrorResponse) => {
      await this.loadingService.hide();
      await this.toastService.show(error.error.message);
    };
    this.operationCategoryItemService
      .getOperationCategoryItems(categoryId, page, size, search)
      .subscribe({
        next: handleResponse,
        error: handleError,
      });
  }

  async createOperationReport(payload: CreateOperationReportPayload) {
    await this.loadingService.show();
    const handleResponse = async (response: CreateOperationReportResponse) => {
      await this.loadingService.hide();
      if (response.success) {
        this.selectedEmployee = null;
        this.selectedCategory = null;
        this.selectedItem = null;
        this.addActivityForm.reset();
        return;
      }
      await this.toastService.show(response.message);
    };
    const handleError = async (error: HttpErrorResponse) => {
      await this.loadingService.hide();
      await this.toastService.show(error.error.message);
    };
    this.operationReportService.createOperationReport(payload).subscribe({
      next: handleResponse,
      error: handleError,
    });
  }
}
