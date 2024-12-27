import { Component } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';

export type Tab = 'ADMIN_USERS' | 'EMPLOYEES';

@Component({
  selector: 'app-users',
  templateUrl: 'users.page.html',
  styleUrls: ['users.page.scss'],
  standalone: true,
  imports: [IonicSharedModule, HeaderComponent, SharedModule],
})
export class UsersPage {
  selectedTab: Tab = 'ADMIN_USERS';
}
