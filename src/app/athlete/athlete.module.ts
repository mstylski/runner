import {NgModule} from '@angular/core';
import {AthleteComponent} from './athlete.component';
import {SharedModule} from '../shared/shared.module';
import {MySegmentsComponent} from '../segments/my-segments/my-segments.component';
import {RoutesComponent} from '../routes/routes.component';
import {WingsForLifeComponent} from '../calculators/wings-for-life/wings-for-life.component';
import {DistanceCalculatorComponent} from '../calculators/distance-calculator/distance-calculator.component';
import {PaceCalculatorComponent} from '../calculators/pace-calculator/pace-calculator.component';
import {MyActivitiesComponent} from '../training/my-activities/my-activities.component';
import {CalendarModule} from 'angular-calendar';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {MatSliderModule} from '@angular/material/slider';
import {NgxSliderModule} from '@angular-slider/ngx-slider';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [
    AthleteComponent,
    MyActivitiesComponent,
    MySegmentsComponent,
    RoutesComponent,
    WingsForLifeComponent,
    DistanceCalculatorComponent,
    PaceCalculatorComponent,
  ],
  exports: [],
  imports: [
    SharedModule,
    CalendarModule,
    CommonModule,
    BrowserModule,
    MatSliderModule,
    NgxSliderModule,
    TranslateModule
  ]
})
export class AthleteModule {
}
