import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular/standalone';
import { UserService } from 'src/app/services/user.service';
import { SubscriptionSink } from 'src/app/utilities/subscription-sink';
import { IonicSharedModule } from 'src/modules/ionic-shared.module';
import { SharedModule } from 'src/modules/shared.module';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
  standalone: true,
  imports: [IonicSharedModule, SharedModule],
})
export class SidebarMenuComponent implements OnInit, OnDestroy {
  constructor(
    private readonly router: Router,
    private readonly navController: NavController,
    private readonly menuController: MenuController,
    private readonly userService: UserService
  ) {}

  subscriptions = new SubscriptionSink();

  userData = this.userService.userData;

  links = [
    {
      path: '/dashboard',
      name: 'Dashboard',
      icon: 'grid-outline',
      iconType: 'NATIVE',
    },
    {
      path: '/users',
      name: 'Users',
      icon: 'people-outline',
      iconType: 'NATIVE',
    },
    {
      path: '/cabins',
      name: 'Cabins',
      icon: 'grid-outline',
      iconType: 'NATIVE',
    },
  ];

  async ngOnInit() {
    this.subscriptions.sink = this.userService.userDataChanged.subscribe(
      async () => {
        this.userData = this.userService.userData;
        await this.menuController.enable(true, 'main-menu');
        await this.menuController.swipeGesture(true, 'main-menu');
        if (!this.userData) {
          await this.menuController.enable(false, 'main-menu');
          await this.menuController.swipeGesture(false, 'main-menu');
        }
      }
    );
  }
  async ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  isRouteActive(route: string) {
    return this.router.isActive(route, {
      paths: 'subset',
      queryParams: 'ignored',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }

  async navigateTo(route: string) {
    await this.navController.navigateForward(route);
    await this.menuController.close();
  }

  async logout() {
    this.userService.logout();
  }
}
