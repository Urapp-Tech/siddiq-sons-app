import { Component } from '@angular/core';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';

@Component({
  selector: 'app-connectivity-footer',
  templateUrl: './connectivity-footer.component.html',
  styleUrls: ['./connectivity-footer.component.scss'],
  standalone: true,
  imports: [IonicSharedModule],
})
export class ConnectivityFooterComponent {}
