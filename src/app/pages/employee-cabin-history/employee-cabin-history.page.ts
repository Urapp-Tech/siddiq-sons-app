import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonDatetime, IonPopover } from '@ionic/angular/standalone';
import { endOfDay, formatISO, set } from 'date-fns';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { CabinService } from 'src/app/services/cabin.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import { Cabin } from 'src/app/types/cabin.types';
import { Employee } from 'src/app/types/users.types';
import { ionGoBack } from 'src/app/utilities/ion-go-back';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';

@Component({
  selector: 'app-employee-cabin-history',
  templateUrl: 'employee-cabin-history.page.html',
  styleUrls: ['employee-cabin-history.page.scss'],
  standalone: true,
  imports: [IonicSharedModule, HeaderComponent],
})
export class EmployeeCabinHistoryPage implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly loadingService: LoadingService,
    private readonly toastService: ToastService,
    private readonly cabinService: CabinService
  ) {}

  title = 'Employee Cabin History';

  employee!: Employee;

  startMinimumDate = formatISO(endOfDay(new Date()));

  endMinimumDate = formatISO(endOfDay(new Date()));

  start;

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
    this.title =
      this.employee.name.length > 14
        ? `${this.employee.name.slice(0, 14)}... Cabin History`
        : `${this.employee.name} Cabin History`;
  }

  async fromDateChanged(
    ionPopoverRef: IonPopover,
    ionDatetimeRef: IonDatetime
  ) {
    this.fromDateValue = ionDatetimeRef.value as string;
    await ionPopoverRef.dismiss();
    const transformedToDate = this.datePipe.transform(
      this.fromDateValue,
      'dd/MM/yyyy'
    ) as string;
    const tempToDate = transformedToDate.split('/').map(Number);
    const fromDate = formatISO(
      endOfDay(
        set(new Date(), {
          date: tempToDate[0],
          month: tempToDate[1] - 1,
          year: tempToDate[2],
        })
      )
    );
    this.toMinimumDate = fromDate;
    this.applyForLeaveForm.patchValue({ toDate: '' });
  }
}
