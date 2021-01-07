import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {AthleteService} from '../athlete.service';
import {AthleteModel} from '../shared/models/athlete.model';
import {AthleteStatsModel} from '../shared/models/athlete-stats.model';
import {ActivityService} from '../activity.service';
import {Activities} from '../shared/models/list-activities.model';
import {BehaviorSubject, Subscription} from 'rxjs';
import {debounceTime, switchMap} from 'rxjs/operators';
import {ActivityModel} from '../shared/models/activity.model';
import {ActivatedRoute, Router} from '@angular/router';
import {FormatTimeService} from '../shared/format-time.service';

@Component({
  selector: 'app-athlete',
  templateUrl: './athlete.component.html',
  styleUrls: ['./athlete.component.scss']
})
export class AthleteComponent implements OnInit, OnDestroy {
  listOfActivities: Activities[] = [];
  activitiesId: ActivityModel;
  currentPageIndex = 1;
  athlete: AthleteModel;
  stats: AthleteStatsModel;
  private readonly subscriptions = new Subscription();
  private readonly pagination$ = new BehaviorSubject<number>(this.currentPageIndex);

  constructor(
    private athleteService: AthleteService,
    private authService: AuthService,
    private activityService: ActivityService,
    private route: ActivatedRoute,
    private router: Router,
    private formatTimeService: FormatTimeService) {
  }

  ngOnInit() {
    this.getAthlete();
    this.getStats();
    this.getActivities();
    this.getFilteredDistance();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  pageNext() {
    this.currentPageIndex = this.currentPageIndex + 1;
    this.pagination$.next(this.currentPageIndex);
  }

  pageBefore() {
    this.currentPageIndex = this.currentPageIndex - 1;
    this.pagination$.next(this.currentPageIndex);
  }

  getAthlete() {
    this.athleteService.getAthlete().subscribe(athlete => this.athlete = athlete);
  }

  getStats() {
    this.athleteService.getAthleteStats(this.authService.getLoggedAthlete().id).subscribe(stats => this.stats = stats);
  }

  getActivity() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.activityService.getActivity(id).subscribe(
      activity => {
        this.activitiesId = activity;
      });
  }

  private getActivities() {
    const subscription = this.pagination$.pipe(
      debounceTime(400),
      switchMap((pageIndex) => this.activityService.getActivitiesWithPagination(pageIndex)),
    )
      .subscribe(activities => this.listOfActivities = activities);

    this.subscriptions.add(subscription);
  }

  formattedTime(data: number) {
    this.formatTimeService.formatTime(data);
  }

  getRecentDistance(distance: number) {
    return `${(distance / 1000).toFixed(1)}km`;
  }

  getFilteredDistance() {
    this.listOfActivities.filter((activity) => activity.distance <= 1000);
  }

  navigate(id: number) {
    this.router.navigate([`dashboard/my-activities/${id}`]);
  }
}
