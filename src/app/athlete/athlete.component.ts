import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {AthleteService} from '../athlete.service';
import {AthleteModel} from '../shared/models/athlete.model';
import {AthleteStatsModel} from '../shared/models/athlete-stats.model';
import {ActivityService} from '../activity.service';
import {Activities} from '../shared/models/list-activities.model';
import {BehaviorSubject, Subscription} from 'rxjs';
import {debounceTime, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-athlete',
  templateUrl: './athlete.component.html',
  styleUrls: ['./athlete.component.scss']
})
export class AthleteComponent implements OnInit, OnDestroy {
  activities: Activities[] = [];
  currentPageIndex = 1;

  athlete: AthleteModel;
  stats: AthleteStatsModel;
  private readonly subscriptions = new Subscription();
  private readonly pagination$ = new BehaviorSubject<number>(this.currentPageIndex);

  constructor(
    private athleteService: AthleteService,
    private authService: AuthService,
    private activityService: ActivityService) {

  }

  ngOnInit() {
    this.getAthlete();
    this.getStats();
    this.getActivities();
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

  private getActivities() {
    const subscription = this.pagination$.pipe(
      debounceTime(400),
      switchMap((pageIndex) => this.activityService.getActivities(pageIndex)),
    )
      .subscribe(activities => this.activities = activities);

    this.subscriptions.add(subscription);
  }

  formatTime(seconds: number): string {
    const secondsInOneMinute = 60;
    const minutesInHours = 60;
    const minutes = Math.floor(seconds / secondsInOneMinute);
    const hours = Math.floor(minutes / minutesInHours);
    if (hours >= 60 || minutes >= 60) {
      return hours + ':' + (minutes - hours * secondsInOneMinute);
    } else {
      return minutes + ':' + (seconds - minutes * secondsInOneMinute);
    }
  }
}
