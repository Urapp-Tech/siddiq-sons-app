import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ionGoBack } from 'src/app/utilities/ion-go-back';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';

@Component({
  selector: 'app-admin-user-add',
  templateUrl: 'admin-user-add.page.html',
  styleUrls: ['admin-user-add.page.scss'],
  standalone: true,
  imports: [IonicSharedModule, HeaderComponent],
})
export class AdminUserAddPage {
  constructor(private readonly router: Router) {}

  passwordVisible = false;

  goBack = ionGoBack();
}
