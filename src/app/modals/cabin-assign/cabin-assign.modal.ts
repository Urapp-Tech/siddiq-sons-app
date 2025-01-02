import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CabinService } from 'src/app/services/cabin.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import { Cabin, GetCabinsResponse } from 'src/app/types/cabin.types';
import { Employee } from 'src/app/types/employee.types';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';

@Component({
  selector: 'app-cabin-assign',
  templateUrl: 'cabin-assign.modal.html',
  styleUrls: ['cabin-assign.modal.scss'],
  standalone: true,
  imports: [IonicSharedModule, SharedModule],
})
export class CabinAssignModal implements OnInit {
  constructor(
    private readonly cabinService: CabinService,
    private readonly loadingService: LoadingService,
    private readonly toastService: ToastService
  ) {}

  @Input({ required: true }) isOpen: boolean = false;
  @Input({ required: true }) employee!: Employee;
  @Output() backdropClicked = new EventEmitter();
  @Output() modelSuccess = new EventEmitter();

  cabins: Array<Cabin> = [];

  selectedCabin: Cabin | null = null;

  ngOnInit() {
    this.getCabins();
  }

  closeModal() {
    this.backdropClicked.emit();
    this.selectedCabin = null;
  }

  submit() {
    this.modelSuccess.emit(this.selectedCabin);
    this.selectedCabin = null;
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
      await this.toastService.show(error.error.message);
    };
    this.cabinService.getCabins(page, size, search).subscribe({
      next: handleResponse,
      error: handleError,
    });
  }
}
