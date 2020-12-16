import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ActivityModel} from '../../shared/models/activity-model';
import {ActivityService} from '../../activity.service';
import {AthleteService} from '../../athlete.service';
import {AthleteModel} from '../../shared/models/athlete.model';

@Component({
  selector: 'app-detail-activity',
  templateUrl: './detail-activity.component.html',
  styleUrls: ['./detail-activity.component.scss']
})
export class DetailActivityComponent implements OnInit {
  activity: ActivityModel;
  athlete: AthleteModel;

  constructor(private route: ActivatedRoute,
              private activityService: ActivityService,
              private athleteService: AthleteService,
  ) {
  }

  ngOnInit(): void {
    this.getAthlete();
    this.getActivity();
  }

  getActivity() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.activityService.getActivity(id).subscribe(activity => this.activity = activity);
  }

  getAthlete() {
    this.athleteService.getAthlete().subscribe(athlete => this.athlete = athlete);
  }

  formatTime(seconds: number): string {
    const secondsInOneMinute = 60;
    const minutesInHours = 60;
    const minutes = Math.floor(seconds / secondsInOneMinute);
    const hours = Math.floor(minutes / minutesInHours);
    if (hours >= 60 || minutes >= 60) {
      return hours + ' h : ' + (minutes - hours * secondsInOneMinute).toFixed(0) + ' min';
    } else {
      return minutes + ' min : ' + (seconds - minutes * secondsInOneMinute).toFixed(0) + ' min';
    }
  }

  formattedTime(seconds: number): string {
    const secondsInOneMinute = 60;
    const minutesInHours = 60;
    const minutes = Math.floor(seconds / secondsInOneMinute);
    const hours = Math.floor(minutes / minutesInHours);
    if (hours >= 60 || minutes >= 60) {
      return hours + 'h: ' + (minutes - hours * secondsInOneMinute).toFixed(0) + 'sec';
    } else {
      return minutes + 'min: ' + (seconds - minutes * secondsInOneMinute).toFixed(0) + 'sec';
    }
  }

  getAvgTime(distance: number, movingTime: number) {
    const secondsFor1KM = 1000 / (distance / movingTime);
    return `${this.formattedTime(secondsFor1KM)}/km`;
  }

  getDistance(distance: number) {
    return (distance / 1000).toFixed(1);
  }

  getSpeed(speed: number) {
    const SPEED_FACTOR = 3.6;
    return `${(speed * SPEED_FACTOR).toFixed(1)} km/h`;
  }

  getHeartrate(heartrate: number) {
    return `${(heartrate).toFixed(0)} bpm`;
  }
}
