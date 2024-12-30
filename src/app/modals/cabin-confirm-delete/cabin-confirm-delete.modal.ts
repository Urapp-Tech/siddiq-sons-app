import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cabin } from 'src/app/types/cabin.types';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';

@Component({
  selector: 'app-cabin-confirm-delete',
  templateUrl: 'cabin-confirm-delete.modal.html',
  styleUrls: ['cabin-confirm-delete.modal.scss'],
  standalone: true,
  imports: [IonicSharedModule, SharedModule],
})
export class CabinConfirmDeleteModal {
  @Input({ required: true }) isOpen: boolean = false;
  @Input({ required: true }) cabin!: Cabin;
  @Output() backdropClicked = new EventEmitter();
  @Output() modelSuccess = new EventEmitter();

  selectedStatus = 'NONE';
}
