import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, AuthProviders } from 'angularfire2';
@Component({
  selector: 'qs-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {

  routes: Object[] = [{
      title: 'Dashboard',
      route: '/',
      icon: 'dashboard',
    }, {
      title: 'Manage Lineups',
      route: '/lineups',
      icon: 'calendar',
    }, {
      title: 'Manage Players',
      route: '/players',
      icon: 'people',
    }
  ];

  constructor(private _router: Router, public af:AngularFire) {}

  logout(): void {
    this.af.auth.logout();
    this._router.navigate(['/login']);
  }
}
