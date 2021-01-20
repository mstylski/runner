import {HeaderComponent} from './dashboard/header/header.component';
import {SharedModule} from '../shared/shared.module';
import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AthleteModule} from '../athlete/athlete.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [DashboardComponent, HeaderComponent],
  exports: [
    DashboardComponent,
    HeaderComponent
  ],
    imports: [
        SharedModule,
        AthleteModule,
        TranslateModule
    ]
})
export class CoreModule {}
