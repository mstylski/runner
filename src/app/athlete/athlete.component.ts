import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ActivityModel} from '../shared/models/activity-model';
import {AuthService} from '../auth.service';
import {AthleteService} from '../athlete.service';
import {AthleteModel} from '../shared/models/athlete.model';

@Component({
  selector: 'app-athlete',
  templateUrl: './athlete.component.html',
  styleUrls: ['./athlete.component.scss']
})
export class AthleteComponent implements OnInit {
  readonly code = this.route.snapshot.queryParamMap.get('code') as string;
  activityModel: ActivityModel;
  athlete: AthleteModel;

  constructor(private authService: AuthService,
              private athleteService: AthleteService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (this.code) {
      this.authService.getToken(this.code).subscribe(response => {
        this.authService.setAuthToken(response.access_token, response.refresh_token);
        this.getAthlete();
      });
    }
    this.route.data.subscribe((data) => this.activityModel = data.activityModel);
  }

  getAthlete() {
    this.athleteService.getAthlete().subscribe(athlete => this.athlete = athlete);
  }
}
