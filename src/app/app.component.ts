import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';

@Component({
  selector: 'qs-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(private _iconRegistry: MdIconRegistry,
              private _domSanitizer: DomSanitizer) {
    this._iconRegistry.addSvgIconInNamespace('assets', 'ponytails',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/ponytails.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'facebook',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/facebook.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'facebook-white',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/fb-white.svg'));
      this._iconRegistry.addSvgIconInNamespace('assets', 'facebook-small',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/fb.svg'));
       this._iconRegistry.addSvgIconInNamespace('assets', 'google',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/google.svg'));
        this._iconRegistry.addSvgIconInNamespace('assets', 'google-words',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/g.svg'));
        this._iconRegistry.addSvgIconInNamespace('assets', 'white-logo',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/white.svg'));
  }

}
