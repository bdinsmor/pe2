import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlayersComponent } from './players/players.component';
import { PlayersFormComponent } from './players/form/form.component';
import { LineupsComponent } from './lineups/lineups.component';
import { LineupsFormComponent } from './lineups/form/form.component';
import { LoginComponent } from './login/login.component';
import { FormComponent } from './form/form.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: MainComponent, children: [{
      component: DashboardComponent,
      path: '',
    },
    {path: 'form', component: FormComponent},
    {path: 'players', children: [
      {path: '', component: PlayersComponent},
      {path: 'add', component: PlayersFormComponent},
      {path: ':id/delete', component: PlayersFormComponent},
      {path: ':id/edit', component: PlayersFormComponent},
    ]},
    {path: 'lineups', children: [
      {path: '', component: LineupsComponent},
      {path: 'add', component: LineupsFormComponent},
      {path: ':id/delete', component: LineupsFormComponent},
      {path: ':id/edit', component: LineupsFormComponent},
    ]},
  ]},
];

export const appRoutingProviders: any[] = [

];

export const appRoutes: any = RouterModule.forRoot(routes, { useHash: true });
