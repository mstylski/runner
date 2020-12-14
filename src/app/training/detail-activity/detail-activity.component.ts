import { Component, OnInit } from '@angular/core';
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
              ) { }

  ngOnInit(): void {
    this.getAthlete();
  }

  getActivity() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.activityService.getActivity(id).subscribe(activity => this.activity = activity);
  }

  getAthlete() {
    this.athleteService.getAthlete().subscribe(athlete => this.athlete = athlete);
  }
}
