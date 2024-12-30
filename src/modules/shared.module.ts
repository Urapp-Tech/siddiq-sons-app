import {
  DatePipe,
  NgClass,
  NgTemplateOutlet,
  TitleCasePipe,
} from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClickStopPropagationDirective } from 'src/app/directives/click-stop-propagation.directive';
import { ClassNamesDirective } from 'src/app/directives/cn.directive';

const imports = [NgClass, NgTemplateOutlet, ReactiveFormsModule];
const directives = [ClassNamesDirective, ClickStopPropagationDirective];
const pipes = [DatePipe, TitleCasePipe];

@NgModule({
  declarations: [...directives],
  imports: [...imports, ...pipes],
  exports: [...imports, ...directives, ...pipes],
})
export class SharedModule {}
