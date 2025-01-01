import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonDatetime, IonPopover } from '@ionic/angular/standalone';
import { endOfDay, formatISO, set, startOfMonth, sub } from 'date-fns';
import { CustomSelectComponent } from 'src/app/components/custom-select/custom-select.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { CabinService } from 'src/app/services/cabin.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import { Cabin, GetCabinsResponse } from 'src/app/types/cabin.types';
import {
  Employee,
  EmployeeCabinHistoryData,
  GetEmployeeCabinHistoryResponse,
} from 'src/app/types/users.types';
import { ionGoBack } from 'src/app/utilities/ion-go-back';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';

const ALL_CABIN: Cabin = {
  id: 'ALL',
  tenant: '',
  branch: '',
  cabinNumber: 'All',
  isActive: true,
  isDeleted: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

@Component({
  selector: 'app-employee-cabin-history',
  templateUrl: 'employee-cabin-history.page.html',
  styleUrls: ['employee-cabin-history.page.scss'],
  standalone: true,
  imports: [
    IonicSharedModule,
    SharedModule,
    HeaderComponent,
    CustomSelectComponent,
  ],
})
export class EmployeeCabinHistoryPage implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly datePipe: DatePipe,
    private readonly cabinService: CabinService,
    private readonly employeeService: EmployeeService,
    private readonly toastService: ToastService,
    private readonly loadingService: LoadingService
  ) {}

  title = 'Employee Cabin History';

  employee!: Employee;

  startDateValue = formatISO(startOfMonth(new Date()));

  startMinimumDate = formatISO(sub(new Date(), { years: 2 }));

  endDateValue = formatISO(new Date());

  endMinimumDate = this.startDateValue;

  selectedCabin: Cabin = ALL_CABIN;

  cabins: Array<Cabin> = [];

  employeeCabinHistoryData: EmployeeCabinHistoryData | null = null;

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
    this.title =
      this.employee.name.length > 14
        ? `${this.employee.name.slice(0, 14)}... Cabin History`
        : `${this.employee.name} Cabin History`;
  }

  async ionViewWillEnter() {
    await this.getCabins(0, 2147483648);
  }

  async selectCabin(cabin: Cabin) {
    this.getEmployeeCabinHistory(
      cabin.id,
      this.employee.id,
      this.startDateValue,
      this.endDateValue,
      0,
      2147483648
    );
  }

  async startDateChanged(
    ionPopoverRef: IonPopover,
    ionDatetimeRef: IonDatetime
  ) {
    this.startDateValue = ionDatetimeRef.value as string;
    await ionPopoverRef.dismiss();
    const transformedEndDate = this.datePipe.transform(
      this.startDateValue,
      'dd/MM/yyyy'
    ) as string;
    const tempEndDate = transformedEndDate.split('/').map(Number);
    const startDate = formatISO(
      endOfDay(
        set(new Date(), {
          date: tempEndDate[0],
          month: tempEndDate[1] - 1,
          year: tempEndDate[2],
        })
      )
    );
    this.endMinimumDate = startDate;

    await this.getEmployeeCabinHistory(
      this.selectedCabin.id,
      this.employee.id,
      this.startDateValue,
      this.endDateValue,
      0,
      2147483648
    );
  }

  async endDateChanged(ionPopoverRef: IonPopover, ionDatetimeRef: IonDatetime) {
    this.endDateValue = ionDatetimeRef.value as string;
    await ionPopoverRef.dismiss();

    await this.getEmployeeCabinHistory(
      this.selectedCabin.id,
      this.employee.id,
      this.startDateValue,
      this.endDateValue,
      0,
      2147483648
    );
  }

  async getCabins(page = 0, size = 10, search = '') {
    await this.loadingService.show();
    const handleResponse = async (response: GetCabinsResponse) => {
      await this.loadingService.hide();
      if (response.success) {
        this.cabins = response.data.list;
        this.cabins.unshift(ALL_CABIN);
        await this.getEmployeeCabinHistory(
          'ALL',
          this.employee.id,
          this.startDateValue,
          this.endDateValue,
          0,
          2147483648
        );
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

  async getEmployeeCabinHistory(
    cabinId: string,
    employeeId: string,
    startDate: string,
    endDate: string,
    page = 0,
    size = 10
  ) {
    await this.loadingService.show();
    const handleResponse = async (
      response: GetEmployeeCabinHistoryResponse
    ) => {
      await this.loadingService.hide();
      if (response.success) {
        this.employeeCabinHistoryData = response.data;
        this.selectedCabin =
          this.cabins.find((cabin) => cabin.id === cabinId) || ALL_CABIN;
        return;
      }
      await this.toastService.show(response.message);
    };
    const handleError = async (error: HttpErrorResponse) => {
      await this.loadingService.hide();
      await this.toastService.show(error.message);
    };
    this.employeeService
      .getEmployeeCabinHistory(
        cabinId,
        employeeId,
        startDate,
        endDate,
        page,
        size
      )
      .subscribe({
        next: handleResponse,
        error: handleError,
      });
  }
}
