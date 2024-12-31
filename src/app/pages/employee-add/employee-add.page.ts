import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ionGoBack } from 'src/app/utilities/ion-go-back';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';

@Component({
  selector: 'app-employee-add',
  templateUrl: 'employee-add.page.html',
  styleUrls: ['employee-add.page.scss'],
  standalone: true,
  imports: [IonicSharedModule, HeaderComponent],
})
export class EmployeeAddPage {
  constructor(private readonly router: Router) {}

  passwordVisible = false;

  imageName = 'Choose Image';

  goBack = ionGoBack();

  setImageName(e: Event) {
    const target = e.target as HTMLInputElement;
    const fileList = target.files;
    if (!fileList) {
      this.imageName = 'Choose Image';
      return;
    }
    const file = fileList[0];
    if (!file) {
      this.imageName = 'Choose Image';
      return;
    }
    const { name } = file;
    const extension = name.split('.').pop();
    this.imageName =
      name.length > 20 ? `${name.slice(0, 20)}...${extension}` : name;
  }
}
