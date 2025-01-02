import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { EmployeeService } from 'src/app/services/employee.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import {
  CreateEmployeePayload,
  CreateEmployeeResponse,
} from 'src/app/types/employee.types';
import { ionGoBack } from 'src/app/utilities/ion-go-back';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';

const EMPTY_FILE: File | null = null;

@Component({
  selector: 'app-employee-add',
  templateUrl: 'employee-add.page.html',
  styleUrls: ['employee-add.page.scss'],
  standalone: true,
  imports: [IonicSharedModule, HeaderComponent, SharedModule],
})
export class EmployeeAddPage {
  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly loadingService: LoadingService,
    private readonly toastService: ToastService,
    private readonly employeeService: EmployeeService
  ) {}

  addEmployeeForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$/
        ),
      ],
    ],
    address: ['', []],
    avatar: [EMPTY_FILE, []],
  });

  passwordVisible = false;

  imageName = 'Choose Image';

  goBack = ionGoBack();

  controlHasError(control: FormControl) {
    return Boolean(control.touched && control.errors);
  }

  imageChanged(e: Event) {
    const target = e.target as HTMLInputElement;
    const fileList = target.files;
    if (!fileList) {
      this.imageName = 'Choose Image';
      return;
    }
    const file = fileList[0];
    if (!file) {
      this.imageName = 'Choose Image';
      return;
    }
    this.addEmployeeForm.patchValue({ avatar: file });
    const { name } = file;
    const extension = name.split('.').pop();
    this.imageName =
      name.length > 20 ? `${name.slice(0, 20)}...${extension}` : name;
  }

  async submit() {
    if (this.addEmployeeForm.invalid) {
      this.addEmployeeForm.markAllAsTouched();
      return;
    }
    const payload = this.addEmployeeForm.getRawValue();
    await this.createEmployee(payload);
  }

  async createEmployee(payload: CreateEmployeePayload) {
    await this.loadingService.show();
    const handleResponse = async (response: CreateEmployeeResponse) => {
      await this.loadingService.hide();
      if (response.success) {
        this.addEmployeeForm.reset();
        await this.goBack('/users');
        await this.toastService.show('User created successfully');
        return;
      }
      await this.toastService.show(response.message);
    };
    const handleError = async (error: HttpErrorResponse) => {
      await this.loadingService.hide();
      await this.toastService.show(error.error.message);
    };
    this.employeeService.createEmployee(payload).subscribe({
      next: handleResponse,
      error: handleError,
    });
  }
}
