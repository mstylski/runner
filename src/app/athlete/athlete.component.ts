import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {AthleteService} from '../athlete.service';
import {Athlete} from '../shared/models/athlete.model';
import {AthleteStats} from '../shared/models/athlete-stats.model';
import {ActivityService} from '../activity.service';
import {Activities} from '../shared/models/list-activities.model';
import {BehaviorSubject, Subscription} from 'rxjs';
import {debounceTime, switchMap} from 'rxjs/operators';
import {Activity} from '../shared/models/activity.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-athlete',
  templateUrl: './athlete.component.html',
  styleUrls: ['./athlete.component.scss']
})
export class AthleteComponent implements OnInit, OnDestroy {
  listOfActivities: Activities[] = [];
  activitiesId: Activity;
  athlete: Athlete;
  stats: AthleteStats;
  currentPageIndex = 1;
  private readonly subscriptions = new Subscription();
  private readonly pagination$ = new BehaviorSubject<number>(this.currentPageIndex);

  constructor(
    private athleteService: AthleteService,
    private authService: AuthService,
    private activityService: ActivityService,
    private route: ActivatedRoute,
    private router: Router) {
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

  getFormattedTime(seconds: number) {
    const secondsInOneMinute = 60;
    const minutesInHours = 60;
    const minutes = Math.floor(seconds / secondsInOneMinute);
    const hours = Math.floor(minutes / minutesInHours);
    if (hours >= 60 || minutes >= 60) {
      return hours + ':' + (minutes - hours * secondsInOneMinute).toFixed(0);
    } else {
      return minutes + ':' + (seconds - minutes * secondsInOneMinute).toFixed(0);
    }
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

  private getActivities() {
    const subscription = this.pagination$.pipe(
      debounceTime(400),
      switchMap((pageIndex) => this.activityService.getActivitiesWithPagination(pageIndex)),
    )
      .subscribe(activities => this.listOfActivities = activities);

    this.subscriptions.add(subscription);
  }
}
