import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { DashboardService } from 'src/app/services/dashboard.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import {
  DashboardActivityData,
  GetDashboardActivityResponse,
} from 'src/app/types/dashboard.types';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
  standalone: true,
  imports: [IonicSharedModule, HeaderComponent],
})
export class DashboardPage {
  constructor(
    private readonly loadingService: LoadingService,
    private readonly toastService: ToastService,
    private readonly dashboardService: DashboardService
  ) {}

  dashboardActivityData: DashboardActivityData | null = null;

  async ionViewWillEnter() {
    await this.getDashboardActivity();
  }

  async getDashboardActivity() {
    await this.loadingService.show();
    const handleResponse = async (response: GetDashboardActivityResponse) => {
      await this.loadingService.hide();
      if (response.success) {
        this.dashboardActivityData = response.data;
        return;
      }
      await this.toastService.show(response.message);
    };
    const handleError = async (error: HttpErrorResponse) => {
      await this.loadingService.hide();
      await this.toastService.show(error.message);
    };
    this.dashboardService.getDashboardActivity().subscribe({
      next: handleResponse,
      error: handleError,
    });
  }
}
