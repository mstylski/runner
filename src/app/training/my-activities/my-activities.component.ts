import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AthleteService} from '../../athlete.service';
import {WorkoutData} from '../../shared/models/list-activities.model';
import {BehaviorSubject} from 'rxjs';
import {PageEvent} from '@angular/material/paginator';
import {debounceTime, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-my-activities',
  templateUrl: './my-activities.component.html',
  styleUrls: ['./my-activities.component.scss']
})

export class MyActivitiesComponent implements OnInit {
  private readonly pagination$ = new BehaviorSubject<PageEvent>({length: 0, pageIndex: 1, pageSize: 20});
  isLoading = false;
  readonly displayedColumns: string[] = ['name', 'distance', 'moving_time', 'elapsed_time', 'max_speed',
    'total_elevation_gain', 'start_date_local', 'start_latlng', 'timezone', 'location_country'];
  workoutData: WorkoutData[];

  constructor(private athleteService: AthleteService) {
  }

  ngOnInit(): void {
    this.getActivities();
  }

  changePage(event: PageEvent) {
    this.pagination$.next(event);
  }

  private getActivities() {
    this.pagination$.pipe(
      debounceTime(400),
      switchMap((pageEvent) => {
        return this.athleteService.getActivities(pageEvent.pageIndex.toString());
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
