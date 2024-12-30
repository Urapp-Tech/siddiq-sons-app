import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from 'src/app/types/users.types';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';

@Component({
  selector: 'app-cabin-confirm-reassign',
  templateUrl: 'cabin-confirm-reassign.modal.html',
  styleUrls: ['cabin-confirm-reassign.modal.scss'],
  standalone: true,
  imports: [IonicSharedModule, SharedModule],
})
export class CabinConfirmReassignModal {
  @Input({ required: true }) isOpen: boolean = false;
  @Input({ required: true }) employee!: Employee;
  @Output() backdropClicked = new EventEmitter();
  @Output() modelSuccess = new EventEmitter();

  selectedStatus = 'NONE';
}
