import { Component, Input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Employee } from 'src/app/types/users.types';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';

@Component({
  selector: 'app-employees',
  templateUrl: 'employees.component.html',
  styleUrls: ['employees.component.scss'],
  standalone: true,
  imports: [IonicSharedModule],
})
export class EmployeesComponent {
  constructor(private readonly router: Router) {}

  @Input() employeesData: { items: Array<Employee> } = {
    items: [],
  };

  async navigateDetailsPage(employee: Employee) {
    const navigationExtras: NavigationExtras = {
      state: {
        data: employee,
      },
    };
    this.router.navigate([`/employee`], navigationExtras);
  }
}
