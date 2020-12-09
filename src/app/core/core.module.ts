import {HeaderComponent} from './dashboard/header/header.component';
import {SharedModule} from '../shared/shared.module';
import {NgModule, Pipe} from '@angular/core';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AthleteModule} from '../athlete/athlete.module';


@NgModule({
  declarations: [DashboardComponent, HeaderComponent],
  exports: [
    DashboardComponent,
    HeaderComponent
  ],
  imports: [
    SharedModule,
    AthleteModule
  ]
})
export class CoreModule {}
