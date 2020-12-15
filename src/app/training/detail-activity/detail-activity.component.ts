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
      return hours + ' h : ' + (minutes - hours * secondsInOneMinute) + ' min';
    } else {
      return minutes + ' min : ' + (seconds - minutes * secondsInOneMinute) + ' min';
    }
  }

  formatSplits(seconds: number): string {
    const secondsInOneMinute = 60;
    const distance = Math.round(this.activity.distance / 1000);
    const minutes = Math.floor(seconds / secondsInOneMinute);
    if (minutes >= 60) {
      return Math.round(minutes / distance) + ' min : ' + (seconds - minutes * secondsInOneMinute) + ' sec';
    } else {
      return Math.floor(minutes / distance) + ' min : ' + (seconds - minutes * secondsInOneMinute) + ' sec';
    }
    }
}
