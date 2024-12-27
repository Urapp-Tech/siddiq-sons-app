import { Component } from '@angular/core';
import { ConnectivityFooterComponent } from 'src/app/components/connectivity-footer/connectivity-footer.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
  standalone: true,
  imports: [IonicSharedModule, HeaderComponent, ConnectivityFooterComponent],
})
export class DashboardPage {}
