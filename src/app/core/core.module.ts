import {HeaderComponent} from './header/header.component';
import {SharedModule} from '../shared/shared.module';
import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard/dashboard.component';


@NgModule({
  declarations: [DashboardComponent, HeaderComponent],
  exports: [
    DashboardComponent,
    HeaderComponent
  ],
  imports: [
    SharedModule
  ]
})
export class CoreModule {}
