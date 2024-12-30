import { Component, Input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BackOfficeUser } from 'src/app/types/users.types';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';

@Component({
  selector: 'app-admin-users',
  templateUrl: 'admin-users.component.html',
  styleUrls: ['admin-users.component.scss'],
  standalone: true,
  imports: [IonicSharedModule],
})
export class AdminUsersComponent {
  constructor(private readonly router: Router) {}

  @Input() backOfficeUsersData: { items: Array<BackOfficeUser> } = {
    items: [],
  };

  async navigateDetailsPage(backOfficeUser: BackOfficeUser) {
    const navigationExtras: NavigationExtras = {
      state: {
        data: backOfficeUser,
      },
    };
    this.router.navigate([`/admin-user`], navigationExtras);
  }
}
