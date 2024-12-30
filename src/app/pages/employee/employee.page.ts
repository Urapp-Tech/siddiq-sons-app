import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { CabinAssignModal } from 'src/app/modals/cabin-assign/cabin-assign.modal';
import { CabinConfirmReassignModal } from 'src/app/modals/cabin-confirm-reassign/cabin-confirm-reassign.modal';
import { CabinService } from 'src/app/services/cabin.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import { AssignCabinResponse, Cabin } from 'src/app/types/cabin.types';
import { Employee } from 'src/app/types/users.types';
import { ionGoBack } from 'src/app/utilities/ion-go-back';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';

@Component({
  selector: 'app-employee',
  templateUrl: 'employee.page.html',
  styleUrls: ['employee.page.scss'],
  standalone: true,
  imports: [
    IonicSharedModule,
    HeaderComponent,
    CabinAssignModal,
    CabinConfirmReassignModal,
  ],
})
export class EmployeePage implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly loadingService: LoadingService,
    private readonly toastService: ToastService,
    private readonly cabinService: CabinService
  ) {}

  title = 'Employee';

  employee!: Employee;

  isAssignCabinModalOpen = false;

  isConfirmReassignCabinModalOpen = false;

  selectedCabin: Cabin | null = null;

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
    this.employee = routeState['data'] as Employee;

    this.title = `${this.employee.name}`;
  }

  async successAssignCabinModal(cabin: Cabin) {
    this.isAssignCabinModalOpen = false;
    this.selectedCabin = cabin;
    if (!this.employee.cabin) {
      await this.assignCabin({
        cabin: cabin.id,
        employee: this.employee.id,
      });
      this.selectedCabin = null;
      return;
    }
    this.isConfirmReassignCabinModalOpen = true;
  }

  async successConfirmReassignCabinModal(confirmation: boolean) {
    this.isConfirmReassignCabinModalOpen = false;
    if (!confirmation) {
      this.isAssignCabinModalOpen = true;
      return;
    }
    if (!this.selectedCabin) {
      return;
    }
    await this.assignCabin({
      cabin: this.selectedCabin.id,
      employee: this.employee.id,
    });
  }

  async assignCabin(payload: { cabin: string; employee: string }) {
    await this.loadingService.show();
    const handleResponse = async (response: AssignCabinResponse) => {
      await this.loadingService.hide();
      if (response.success) {
        this.employee.cabin = response.data.cabin;
        this.employee.cabinName = response.data.cabinName;
        return;
      }
      await this.toastService.show(response.message);
    };
    const handleError = async (error: HttpErrorResponse) => {
      await this.loadingService.hide();
      await this.toastService.show(error.message);
    };
    this.cabinService.assignCabin(payload).subscribe({
      next: handleResponse,
      error: handleError,
    });
  }
}
