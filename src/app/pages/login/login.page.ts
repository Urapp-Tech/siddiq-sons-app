import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  NonNullableFormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { NavController } from '@ionic/angular/standalone';
import { LoadingService } from 'src/app/services/loading.service';
import { LoginService } from 'src/app/services/login.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';
import { LoginUserPayload, LoginUserResponse } from 'src/app/types/login.types';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';

function emailOrPhoneValidator(
  control: AbstractControl<any, any>
): ValidationErrors | null {
  if (control.value.match(/^\d{11}$/)) {
    return null;
  }
  if (control.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
    return null;
  }
  return { emailOrPhone: true };
}

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  standalone: true,
  imports: [IonicSharedModule, SharedModule],
})
export class LoginPage {
  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly loadingService: LoadingService,
    private readonly toastService: ToastService,
    private readonly loginService: LoginService,
    private readonly userService: UserService,
    private readonly navController: NavController
  ) {}

  loginForm = this.formBuilder.group({
    identifier: ['', [Validators.required, emailOrPhoneValidator]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  passwordVisible = false;

  async ionViewWillEnter() {
    const { userData } = this.userService;
    if (userData) {
      await this.navController.navigateRoot('/dashboard');
    }
  }

  async submit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const { identifier, password } = this.loginForm.getRawValue();
    await this.loginUser({ identifier, password });
  }

  controlHasError(control: FormControl) {
    return Boolean(control.touched && control.errors);
  }

  async loginUser(payload: LoginUserPayload) {
    await this.loadingService.show();
    const handleResponse = async (response: LoginUserResponse) => {
      await this.loadingService.hide();
      if (response.success) {
        this.userService.userData = response.data;
        await this.navController.navigateRoot('/dashboard');
        await this.toastService.show(response.message);
        return;
      }
      await this.toastService.show(response.message);
    };
    const handleError = async (error: HttpErrorResponse) => {
      await this.loadingService.hide();
      await this.toastService.show(error.error.message);
    };
    this.loginService.loginUser(payload).subscribe({
      next: handleResponse,
      error: handleError,
    });
  }
}
