import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AthleteComponent} from './athlete.component';
import {SharedModule} from '../shared/shared.module';
import {TrainingCalendarComponent} from '../training/training-calendar/training-calendar.component';
import {SegmentSearchComponent} from '../segments/segment-search/segment-search.component';
import {MySegmentsComponent} from '../segments/my-segments/my-segments.component';
import {SegmentExploreComponent} from '../segments/my-segments/segment-explore/segment-explore.component';
import {RoutesComponent} from '../routes/routes.component';
import {WingsForLifeComponent} from '../calculators/wings-for-life/wings-for-life.component';
import {DistanceCalculatorComponent} from '../calculators/distance-calculator/distance-calculator.component';
import {PaceCalculatorComponent} from '../calculators/pace-calculator/pace-calculator.component';
import {MyActivitiesComponent} from '../training/my-activities/my-activities.component';
import {CalendarModule} from 'angular-calendar';

@NgModule({
  declarations: [
    AthleteComponent,
    MyActivitiesComponent,
    SegmentSearchComponent,
    MySegmentsComponent,
    SegmentExploreComponent,
    RoutesComponent,
    WingsForLifeComponent,
    DistanceCalculatorComponent,
    PaceCalculatorComponent,
  ],
  exports: [],
    imports: [
        CommonModule,
        SharedModule,
        CalendarModule
    ]
})
export class AthleteModule {
}
