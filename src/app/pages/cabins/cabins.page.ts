import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { CabinAddModal } from 'src/app/modals/cabin-add/cabin-add.modal';
import { CabinService } from 'src/app/services/cabin.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import {
  AddCabinResponse,
  Cabin,
  GetCabinsResponse,
} from 'src/app/types/cabin.types';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';

@Component({
  selector: 'app-cabins',
  templateUrl: 'cabins.page.html',
  styleUrls: ['cabins.page.scss'],
  standalone: true,
  imports: [IonicSharedModule, HeaderComponent, SharedModule, CabinAddModal],
})
export class CabinsPage {
  constructor(
    private readonly cabinService: CabinService,
    private readonly loadingService: LoadingService,
    private readonly toastService: ToastService,
    private readonly router: Router
  ) {}

  cabins: Array<Cabin> = [];

  isAddCabinModalOpen = false;

  async ionViewWillEnter() {
    await this.getCabins(0, 2147483648);
  }

  async getCabins(page = 0, size = 10, search = '') {
    await this.loadingService.show();
    const handleResponse = async (response: GetCabinsResponse) => {
      await this.loadingService.hide();
      if (response.success) {
        this.cabins = response.data.list;
        return;
      }
      await this.toastService.show(response.message);
    };
    const handleError = async (error: HttpErrorResponse) => {
      await this.loadingService.hide();
      await this.toastService.show(error.message);
    };
    this.cabinService.getCabins(page, size, search).subscribe({
      next: handleResponse,
      error: handleError,
    });
  }

  async successAddCabinModal(data: { cabinName: string }) {
    this.isAddCabinModalOpen = false;
    await this.addCabin(data.cabinName);
  }

  async addCabin(cabinName: string) {
    await this.loadingService.show();
    const handleResponse = async (response: AddCabinResponse) => {
      await this.loadingService.hide();
      if (response.success) {
        this.cabins.unshift(response.data);
        await this.toastService.show(response.message);
        return;
      }
      await this.toastService.show(response.message);
    };
    const handleError = async (error: HttpErrorResponse) => {
      await this.loadingService.hide();
      await this.toastService.show(error.message);
    };
    this.cabinService.addCabin(cabinName).subscribe({
      next: handleResponse,
      error: handleError,
    });
  }

  async navigateDetailsPage(cabin: Cabin) {
    const navigationExtras: NavigationExtras = {
      state: {
        data: cabin,
      },
    };
    this.router.navigate([`/cabin`], navigationExtras);
  }
}
