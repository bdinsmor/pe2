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
    
  }

  loginWithGoogle() {
    this.af.auth.login({
      provider: AuthProviders.Google
    });
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
        
        this.user = {};
      }
    });
  }

  loginWithFacebook() {
    this.af.auth.login({
      provider: AuthProviders.Facebook
    });
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
        
        this.user = {};
      }
    });
  }

  logout() {
    this.af.auth.logout();
  }
}
