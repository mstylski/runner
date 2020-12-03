import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AthleteComponent} from './athlete/athlete.component';
import {DashboardComponent} from './core/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/athlete',
    pathMatch: 'full',
  },
  { path: 'dashboard', component: DashboardComponent,
  children: [{ path: 'athlete', component: AthleteComponent }]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
