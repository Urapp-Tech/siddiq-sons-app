import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';

@Component({
  selector: 'app-cabin-edit',
  templateUrl: 'cabin-edit.modal.html',
  styleUrls: ['cabin-edit.modal.scss'],
  standalone: true,
  imports: [IonicSharedModule, SharedModule],
})
export class CabinEditModal {
  constructor(private readonly formBuilder: NonNullableFormBuilder) {}

  @Input({ required: true }) isOpen: boolean = false;
  @Output() backdropClicked = new EventEmitter();
  @Output() modelSuccess = new EventEmitter();

  editCabinForm = this.formBuilder.group({
    cabinName: ['', [Validators.required]],
  });

  closeModal() {
    this.backdropClicked.emit();
    this.editCabinForm.reset();
  }

  submit() {
    this.modelSuccess.emit(this.editCabinForm.getRawValue());
    this.editCabinForm.reset();
  }
}
