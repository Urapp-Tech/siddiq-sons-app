import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';

@Component({
  selector: 'app-add-cabin',
  templateUrl: 'add-cabin.modal.html',
  styleUrls: ['add-cabin.modal.scss'],
  standalone: true,
  imports: [IonicSharedModule, SharedModule],
})
export class AddCabinModal {
  constructor(private readonly formBuilder: NonNullableFormBuilder) {}

  @Input({ required: true }) isOpen: boolean = false;
  @Output() backdropClicked = new EventEmitter();
  @Output() modelSuccess = new EventEmitter();

  addCabinForm = this.formBuilder.group({
    cabinName: ['', [Validators.required]],
  });

  closeModal() {
    this.backdropClicked.emit();
    this.addCabinForm.reset();
  }

  submit() {
    this.modelSuccess.emit(this.addCabinForm.getRawValue());
    this.addCabinForm.reset();
  }
}
