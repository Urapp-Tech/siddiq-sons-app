import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { CabinConfirmDeleteModal } from 'src/app/modals/cabin-confirm-delete/cabin-confirm-delete.modal';
import { CabinEditModal } from 'src/app/modals/cabin-edit/cabin-edit.modal';
import { CabinService } from 'src/app/services/cabin.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import {
  Cabin,
  DeleteCabinResponse,
  EditCabinResponse,
} from 'src/app/types/cabin.types';
import { ionGoBack } from 'src/app/utilities/ion-go-back';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';

@Component({
  selector: 'app-cabin',
  templateUrl: 'cabin.page.html',
  styleUrls: ['cabin.page.scss'],
  standalone: true,
  imports: [
    IonicSharedModule,
    HeaderComponent,
    SharedModule,
    CabinEditModal,
    CabinConfirmDeleteModal,
  ],
})
export class CabinPage implements OnInit {
  constructor(
    private readonly cabinService: CabinService,
    private readonly router: Router,
    private readonly loadingService: LoadingService,
    private readonly toastService: ToastService
  ) {}

  title = 'Cabin';

  cabin!: Cabin;

  isEditCabinModalOpen = false;

  isConfirmDeleteCabinModalOpen = false;

  goBack = ionGoBack();

  async ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (!navigation) {
      this.goBack('/users');
      return;
    }
    const routeState = navigation.extras.state;
    if (!routeState) {
      this.goBack('/users');
      return;
    }
    this.cabin = routeState['data'] as Cabin;

    this.title = `Cabin ${this.cabin.cabinNumber}`;
  }

  async successEditCabinModal(data: { cabinName: string }) {
    this.isEditCabinModalOpen = false;
    await this.editCabin(data.cabinName);
  }

  async successConfirmDeleteCabinModal(confirmation: boolean) {
    this.isConfirmDeleteCabinModalOpen = false;
    if (!confirmation) {
      return;
    }
    await this.deleteCabin();
  }

  async editCabin(cabinName: string) {
    await this.loadingService.show();
    const handleResponse = async (response: EditCabinResponse) => {
      await this.loadingService.hide();
      if (response.success) {
        this.cabin = response.data;
        await this.toastService.show(response.message);
        return;
      }
      await this.toastService.show(response.message);
    };
    const handleError = async (error: HttpErrorResponse) => {
      await this.loadingService.hide();
      await this.toastService.show(error.message);
    };
    this.cabinService.editCabin(this.cabin.id, cabinName).subscribe({
      next: handleResponse,
      error: handleError,
    });
  }

  async deleteCabin() {
    await this.loadingService.show();
    const handleResponse = async (response: DeleteCabinResponse) => {
      await this.loadingService.hide();
      if (response.success) {
        await this.toastService.show(response.message);
        await this.goBack('/cabins');
        return;
      }
      await this.toastService.show(response.message);
    };
    const handleError = async (error: HttpErrorResponse) => {
      await this.loadingService.hide();
      await this.toastService.show(error.message);
    };
    this.cabinService.deleteCabin(this.cabin.id).subscribe({
      next: handleResponse,
      error: handleError,
    });
  }
}
