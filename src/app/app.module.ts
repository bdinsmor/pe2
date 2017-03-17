import { NgModule, Type } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { CovalentCoreModule } from '@covalent/core';
import { CovalentStepsModule } from '@covalent/core';
import { CovalentHttpModule, IHttpInterceptor } from '@covalent/http';
import { CovalentChartsModule } from '@covalent/charts';
import { CovalentExpansionPanelModule } from '@covalent/core';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlayersComponent } from './players/players.component';
import { PlayersFormComponent } from './players/form/form.component';
import { LineupsFormComponent } from './lineups/form/form.component';
import { LineupsComponent } from './lineups/lineups.component';
import { FormComponent } from './form/form.component';
import { LoginComponent } from './login/login.component';
import { appRoutes, appRoutingProviders } from './app.routes';
import { RequestInterceptor } from '../config/interceptors/request.interceptor';
import { Md2Module } from 'md2';
import { DragulaModule } from 'ng2-dragula';
import {ColorPickerModule} from 'angular2-color-picker';

import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';

import { NgxChartsModule } from '@swimlane/ngx-charts';

const httpInterceptorProviders: Type<any>[] = [
  RequestInterceptor,
];

const firebaseConfig = {
  apiKey: 'AIzaSyCiyibrg0xnqehfL7H1wo0VGWBkfY-WE6M',
  authDomain: 'ponytail-express.firebaseapp.com',
  databaseURL: 'https://ponytail-express.firebaseio.com',
  storageBucket: 'ponytail-express.appspot.com',
  messagingSenderId: '835594114971'
};

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DashboardComponent,
    PlayersComponent,
    PlayersFormComponent,
    LineupsComponent,
    LineupsFormComponent,
    FormComponent,
    LoginComponent,
  ], // directives, components, and pipes owned by this NgModule
  imports: [
    BrowserModule,
    DragulaModule,
    ColorPickerModule,
    Md2Module.forRoot(),
    CovalentCoreModule.forRoot(),
    CovalentStepsModule.forRoot(),
    CovalentChartsModule.forRoot(),
    CovalentExpansionPanelModule.forRoot(),
    CovalentHttpModule.forRoot({
      interceptors: [{
        interceptor: RequestInterceptor, paths: ['**'],
      }],
    }),
    AngularFireModule.initializeApp(firebaseConfig, {
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    }),
    appRoutes,
    NgxChartsModule,
  ], // modules needed to run this module
  providers: [
    appRoutingProviders,
    httpInterceptorProviders,
    Title,
  ], // additional providers needed for this module
  entryComponents: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
