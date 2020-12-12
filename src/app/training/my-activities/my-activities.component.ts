import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivityService} from '../../activity.service';
import {Activities} from '../../shared/models/list-activities.model';
import {BehaviorSubject, Subscription} from 'rxjs';
import {debounceTime, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-my-activities',
  templateUrl: './my-activities.component.html',
  styleUrls: ['./my-activities.component.scss']
})

export class MyActivitiesComponent implements OnInit, OnDestroy {
  currentPageIndex = 1;
  readonly columns: string[] = [
    'name', 'distance', 'moving_time', 'elapsed_time', 'max_speed',
    'total_elevation_gain', 'start_date_local', 'start_latlng', 'timezone', 'location_country'
  ];
  activities: Activities[] = [];
  private readonly subscriptions = new Subscription();
  private readonly pagination$ = new BehaviorSubject<number>(this.currentPageIndex);

  constructor(private activityService: ActivityService) {}

  ngOnInit() {
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

  formatTime(seconds: number): string {
    const secondsInOneMinute = 60;
    const minutes = Math.floor(seconds / secondsInOneMinute);
    return minutes + ':' + (seconds - minutes * secondsInOneMinute);
  }

  private getActivities() {
    const subscription = this.pagination$.pipe(
      debounceTime(400),
      switchMap((pageIndex) => this.activityService.getActivities(pageIndex)),
    )
    .subscribe(activities => this.activities = activities);

    this.subscriptions.add(subscription);
  }
}
