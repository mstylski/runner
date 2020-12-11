import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AthleteComponent} from './athlete/athlete.component';
import {DashboardComponent} from './core/dashboard/dashboard.component';
import {MyActivitiesComponent} from './training/my-activities/my-activities.component';
import {MySegmentsComponent} from './segments/my-segments/my-segments.component';
import {SegmentSearchComponent} from './segments/segment-search/segment-search.component';
import {SegmentExploreComponent} from './segments/my-segments/segment-explore/segment-explore.component';
import {RoutesComponent} from './routes/routes.component';
import {TrainingCalendarComponent} from './training/training-calendar/training-calendar.component';
import {DistanceCalculatorComponent} from './calculators/distance-calculator/distance-calculator.component';
import {PaceCalculatorComponent} from './calculators/pace-calculator/pace-calculator.component';
import {WingsForLifeComponent} from './calculators/wings-for-life/wings-for-life.component';
import {AthleteResolveService} from './athlete/athlete.resolve.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/athlete',
    pathMatch: 'full',
  },
  {
    path: 'dashboard', component: DashboardComponent,
    children: [{path: 'athlete', component: AthleteComponent},
      {path: 'athlete/:id', component: AthleteComponent, resolve: {athlete: AthleteResolveService}},
      {path: 'my-activities', component: MyActivitiesComponent},
      {path: 'training-calendar', component: TrainingCalendarComponent},
      {path: 'my-segments', component: MySegmentsComponent},
      {path: 'segment-search', component: SegmentSearchComponent},
      {path: 'segment-explore', component: SegmentExploreComponent},
      {path: 'wings-for-life', component: WingsForLifeComponent},
      {path: 'pace-calculator', component: PaceCalculatorComponent},
      {path: 'distance-calculator', component: DistanceCalculatorComponent},
      {path: 'routes', component: RoutesComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes
  )],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
