import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { BackOfficeUserService } from 'src/app/services/back-office-user.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import {
  CreateBackOfficeUserPayload,
  CreateBackOfficeUserResponse,
} from 'src/app/types/back-office-user.types';
import { ionGoBack } from 'src/app/utilities/ion-go-back';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';

@Component({
  selector: 'app-admin-user-add',
  templateUrl: 'admin-user-add.page.html',
  styleUrls: ['admin-user-add.page.scss'],
  standalone: true,
  imports: [IonicSharedModule, SharedModule, HeaderComponent],
})
export class AdminUserAddPage {
  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly loadingService: LoadingService,
    private readonly toastService: ToastService,
    private readonly backOfficeUserService: BackOfficeUserService
  ) {}

  addBackOfficeUserForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
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
    userType: ['USER', []],
  });

  passwordVisible = false;

  goBack = ionGoBack();

  controlHasError(control: FormControl) {
    return Boolean(control.touched && control.errors);
  }

  async submit() {
    if (this.addBackOfficeUserForm.invalid) {
      this.addBackOfficeUserForm.markAllAsTouched();
      return;
    }
    const payload = this.addBackOfficeUserForm.getRawValue();
    await this.createBackOfficeUser(payload);
  }

  async createBackOfficeUser(payload: CreateBackOfficeUserPayload) {
    await this.loadingService.show();
    const handleResponse = async (response: CreateBackOfficeUserResponse) => {
      await this.loadingService.hide();
      if (response.success) {
        this.addBackOfficeUserForm.reset();
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
    this.backOfficeUserService.createBackOfficeUser(payload).subscribe({
      next: handleResponse,
      error: handleError,
    });
  }
}
