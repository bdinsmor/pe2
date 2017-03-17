import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, AuthProviders } from 'angularfire2';
@Component({
  selector: 'qs-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
 photoURL: string;
 displayName: string;
 user = {};
  routes: Object[] = [{
      title: 'Dashboard',
      route: '/',
      icon: 'dashboard',
    }, {
      title: 'Manage Lineups',
      route: '/lineups',
      icon: 'events',
    }, {
      title: 'Manage Players',
      route: '/players',
      icon: 'people',
    }
  ];

  constructor(private _router: Router, public af: AngularFire) {}

  ngOnInit() {
    this.af.auth.subscribe(user => {
      if (user) {
        // user logged in
        this.user = user;
       // this._loadingService.register();
       this.photoURL = user.auth.photoURL;
       this.displayName = user.auth.displayName;
       // console.log('Mock log in as ' + JSON.stringify(user,null,2));
        
      }
      else {
        this._router.navigate(['/login']);
      }
    });
    
  }

  logout(): void {
    this.af.auth.logout();
    this._router.navigate(['/login']);
  }
}
