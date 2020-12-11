import {Component, OnInit} from '@angular/core';
import {ActivityService} from '../../activity.service';
import {WorkoutData} from '../../shared/models/list-activities.model';
import {BehaviorSubject} from 'rxjs';
import {debounceTime, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-my-activities',
  templateUrl: './my-activities.component.html',
  styleUrls: ['./my-activities.component.scss']
})

export class MyActivitiesComponent implements OnInit {
  private readonly pagination$ = new BehaviorSubject<number>(0);
  pageIndex = 1;
  count = 1;
  isLoading = false;
  readonly displayedColumns: string[] = ['name', 'distance', 'moving_time', 'elapsed_time', 'max_speed',
    'total_elevation_gain', 'start_date_local', 'start_latlng', 'timezone', 'location_country'];
  workoutData: WorkoutData[];

  constructor(private activityService: ActivityService) {
  }

  ngOnInit(): void {
    this.getActivities();
  }

  pageNext() {
    this.count = this.count + 1;
    this.pagination$.next(this.count);
  }

  pageBefore() {
    this.count = this.count - 1;
    this.pagination$.next(this.count);
  }

  private getActivities() {
    this.pagination$.pipe(
      debounceTime(400),
      switchMap(() => {
        return this.activityService.getActivities(this.pageIndex.toString());
      })
    )
      .subscribe(activities => {
        this.workoutData = activities;
      });
  }

  formatTime(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return minutes + ':' + (value - minutes * 60);
  }
}
