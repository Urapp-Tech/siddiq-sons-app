import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { BackOfficeUser } from 'src/app/types/back-office-user.types';
import { ionGoBack } from 'src/app/utilities/ion-go-back';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';

@Component({
  selector: 'app-admin-user',
  templateUrl: 'admin-user.page.html',
  styleUrls: ['admin-user.page.scss'],
  standalone: true,
  imports: [IonicSharedModule, HeaderComponent],
})
export class AdminUserPage implements OnInit {
  constructor(private readonly router: Router) {}

  title = 'Admin User';

  backOfficeUser!: BackOfficeUser;

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
    this.backOfficeUser = routeState['data'] as BackOfficeUser;
    this.title = `${this.backOfficeUser.firstName} ${this.backOfficeUser.lastName}`;
  }
}
