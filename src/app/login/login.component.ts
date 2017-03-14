import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, AuthProviders } from 'angularfire2';
import { TdLoadingService } from '@covalent/core';

@Component({
  selector: 'qs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  user = {};

  constructor(private _router: Router, public af: AngularFire,
    private _loadingService: TdLoadingService) {
    this.af.auth.subscribe(user => {
      if (user) {
        // user logged in
        this.user = user;
       // this._loadingService.register();
       // console.log('Mock log in as ' + JSON.stringify(user,null,2));
        setTimeout(() => {
          this._router.navigate(['/']);
          this._loadingService.resolve();
        }, 2000);
      }
      else {
        // user not logged in
        alert('Not logged in');
        this.user = {};
      }
    });
  }

  login() {
    this.af.auth.login({
      provider: AuthProviders.Google
    });
  }

  logout() {
    this.af.auth.logout();
  }
}
